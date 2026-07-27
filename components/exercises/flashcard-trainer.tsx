"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Shuffle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Layers,
  Heart,
  Maximize2,
  Minimize2,
  BarChart3,
  Volume2,
  Brain,
  Repeat,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkeletonFlashcard } from "@/components/ui/content-skeletons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  type SRSItem,
  getDueItems,
  getSRSStats,
  reviewItem,
  resetSRS,
} from "@/lib/spaced-repetition";
import { getSRSSettings, type SRSSettings } from "@/lib/srs-settings";
import { AudioPlayer } from "./audio-player";
import { getCustomCards } from "@/lib/custom-cards";
import { DeckSelector, type Deck } from "./deck-selector";
import { SRSRatingButtons } from "./srs-rating-buttons";
import { SRSCardDetails } from "./srs-card-details";
import { SRSSettingsDialog } from "./srs-settings-dialog";

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  audioPath?: string;
  extra?: string;
}

interface Props {
  cards: Flashcard[];
  title?: string;
  description?: string;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const CONFETTI_COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#f97316"];

function Confetti({ active, seed, onDone }: { active: boolean; seed: number; onDone?: () => void }) {
  const pieces = useMemo(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: rand() * 100,
      color: CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)],
      delay: rand() * 0.5,
      duration: 1.5 + rand() * 1,
    }));
  }, [seed]);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => onDone?.(), 3000);
    return () => clearTimeout(timer);
  }, [active, onDone]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 w-2 h-2 rounded-sm animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

const STORAGE_KEY = "bsk-flashcard-progress";
const FAVORITES_KEY = "bsk-flashcard-favorites";
const DAILY_KEY = "bsk-flashcard-daily";
const EMPTY_SET = new Set<string>();

function createSyncedSet(key: string) {
  let cache: Set<string> | null = null;

  function read(): Set<string> {
    if (typeof window === "undefined") return EMPTY_SET;
    try {
      const raw = localStorage.getItem(key);
      cache = raw ? new Set(JSON.parse(raw) as string[]) : new Set<string>();
      return cache;
    } catch {
      cache = EMPTY_SET;
      return EMPTY_SET;
    }
  }

  function write(next: Set<string>) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(Array.from(next)));
    cache = next;
  }

  return { read, write, getCache: () => cache };
}

const knownSet = createSyncedSet(STORAGE_KEY);
const favoriteSet = createSyncedSet(FAVORITES_KEY);
const dailySet = createSyncedSet(DAILY_KEY);

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function customCardsToFlashcards(): Flashcard[] {
  if (typeof window === "undefined") return [];
  return getCustomCards().map((c) => ({
    id: c.id,
    category: c.category || "Eigene Karte",
    front: c.term,
    back: `${c.meaning}${c.antonym ? ` – Antonym: ${c.antonym}` : ""}${c.example ? `\n„${c.example}“` : ""}`,
    extra: c.notes || undefined,
  }));
}

export function FlashcardTrainer({ cards, title, description }: Props) {
  const mounted = useMounted();
  const [customCards] = useState<Flashcard[]>(() => customCardsToFlashcards());
  const allCards = useMemo(() => [...cards, ...customCards], [cards, customCards]);
  const categories = useMemo(
    () => Array.from(new Set(allCards.map((c) => c.category))),
    [allCards]
  );

  const fachwortFields = useMemo(
    () =>
      categories
        .filter((c) => c.startsWith("Fachwort: "))
        .map((c) => c.replace("Fachwort: ", "")),
    [categories]
  );

  const mainOptions = useMemo(
    () => [
      { value: "all", label: "Alle Kategorien" },
      { value: "fachwort", label: "Fachwörter" },
      { value: "nomen-verb", label: "Nomen-Verb" },
      { value: "redemittel", label: "Redemittel" },
      { value: "grammatik", label: "Grammatik" },
    ],
    []
  );

  const [mainFilter, setMainFilter] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [order, setOrder] = useState<Flashcard[]>(() => shuffle([...cards, ...customCardsToFlashcards()]));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [onlyUnknown, setOnlyUnknown] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [srsMode, setSrsMode] = useState(false);
  const [srsSettings, setSrsSettings] = useState<SRSSettings>(() => getSRSSettings());
  const [celebrateGoal, setCelebrateGoal] = useState(false);
  const [goalCelebrated, setGoalCelebrated] = useState(false);
  const [celebrateCategory, setCelebrateCategory] = useState<string | null>(null);
  const [celebratedCategories, setCelebratedCategories] = useState<Set<string>>(new Set());
  const [confettiSeed, setConfettiSeed] = useState(1);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const searchParams = useSearchParams();
  const deckParam = searchParams.get("deck");
  const [selectedDeck, setSelectedDeck] = useState<string | null>(deckParam);
  const DAILY_GOAL = 20;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const known = useSyncExternalStore(
    (callback) => {
      const handler = () => {
        knownSet.getCache();
        callback();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    () => knownSet.getCache() ?? knownSet.read(),
    () => EMPTY_SET
  );

  const [, favoriteForceUpdate] = useReducer((x) => x + 1, 0);
  const favorites = useSyncExternalStore(
    (callback) => {
      const handler = () => {
        favoriteSet.getCache();
        callback();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    () => favoriteSet.getCache() ?? favoriteSet.read(),
    () => EMPTY_SET
  );

  const activeCategories = useMemo(() => {
    if (selectedDeck) return [selectedDeck];
    if (mainFilter === "all") return categories;
    if (mainFilter === "fachwort") {
      if (fieldFilter === "all") {
        return categories.filter((c) => c.startsWith("Fachwort: "));
      }
      return [`Fachwort: ${fieldFilter}`];
    }
    return mainOptions
      .filter((o) => o.value === mainFilter)
      .map((o) => o.label);
  }, [categories, mainFilter, fieldFilter, mainOptions, selectedDeck]);

  const filtered = useMemo(() => {
    let result = order.filter(
      (c) =>
        activeCategories.includes(c.category) &&
        (!onlyUnknown || !known.has(c.id)) &&
        (!onlyFavorites || favorites.has(c.id))
    );
    if (srsMode) {
      const srsItems: SRSItem[] = result.map((c) => ({ ...c, type: c.category }));
      const due = getDueItems(srsItems, srsSettings);
      const dueIds = new Set(due.map((d) => d.id));
      result = result.filter((c) => dueIds.has(c.id));
    }
    return result;
  }, [order, activeCategories, onlyUnknown, onlyFavorites, known, favorites, srsMode, srsSettings]);

  const decks = useMemo<Deck[]>(() => {
    return categories.map((cat) => {
      const catCards = allCards.filter((c) => c.category === cat);
      const knownCount = catCards.filter((c) => known.has(c.id)).length;
      return {
        id: cat,
        title: cat,
        count: catCards.length,
        known: knownCount,
      };
    });
  }, [categories, allCards, known]);

  const statsByCategory = useMemo(() => {
    return activeCategories.map((cat) => {
      const catCards = allCards.filter((c) => c.category === cat);
      const knownCount = catCards.filter((c) => known.has(c.id)).length;
      return {
        category: cat,
        total: catCards.length,
        known: knownCount,
        percentage: catCards.length > 0 ? Math.round((knownCount / catCards.length) * 100) : 0,
      };
    });
  }, [allCards, activeCategories, known]);

  const srsStats = useMemo(() => {
    const srsItems: SRSItem[] = allCards.map((c) => ({ ...c, type: c.category }));
    return getSRSStats(srsItems);
  }, [allCards]);

  const current = filtered[index];
  const quizOptions = useMemo(() => {
    if (!quizMode || !current) return [];
    const others = allCards
      .filter((c) => c.id !== current.id)
      .map((c) => c.back);
    const wrong = shuffle(others).slice(0, 3);
    return shuffle([current.back, ...wrong]);
  }, [quizMode, current, allCards]);
  const progress = filtered.length > 0 ? Math.round((index / filtered.length) * 100) : 0;
  const knownCount = useMemo(
    () => filtered.filter((c) => known.has(c.id)).length,
    [filtered, known]
  );

  const handleMainFilterChange = (value: string | null) => {
    if (!value) return;
    setMainFilter(value);
    setFieldFilter("all");
    setIndex(0);
    setFlipped(false);
  };

  const handleFieldFilterChange = (value: string | null) => {
    if (!value) return;
    setFieldFilter(value);
    setIndex(0);
    setFlipped(false);
  };

  const toggleOnlyUnknown = () => {
    setOnlyUnknown((prev) => !prev);
    setIndex(0);
    setFlipped(false);
  };

  const toggleOnlyFavorites = () => {
    setOnlyFavorites((prev) => !prev);
    setIndex(0);
    setFlipped(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const currentAudioPath = current?.audioPath;
  const currentFront = current?.front;
  const currentId = current?.id;
  useEffect(() => {
    if (!autoPlay || !currentId) return;
    if (currentAudioPath) {
      const a = new Audio(currentAudioPath);
      a.play().catch(() => {});
      return () => {
        a.pause();
      };
    }
    if (typeof window !== "undefined" && window.speechSynthesis && currentFront) {
      const utterance = new SpeechSynthesisUtterance(currentFront);
      utterance.lang = "de-DE";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [autoPlay, currentId, currentAudioPath, currentFront]);

  const [, dailyForceUpdate] = useReducer((x) => x + 1, 0);
  const dailyIdsAll = useSyncExternalStore(
    (callback) => {
      const handler = () => {
        dailySet.getCache();
        callback();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    () => dailySet.getCache() ?? dailySet.read(),
    () => EMPTY_SET
  );
  const todayStr = new Date().toISOString().split("T")[0];
  const todayDailyIds = useMemo(
    () => new Set(Array.from(dailyIdsAll).filter((id) => id.startsWith(`${todayStr}:`))),
    [dailyIdsAll, todayStr]
  );
  const dailyCount = todayDailyIds.size;

  const history = useMemo(() => {
    const days: { date: string; label: string; count: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = Array.from(dailyIdsAll).filter((id) =>
        id.startsWith(`${dateStr}:`)
      ).length;
      days.push({
        date: dateStr,
        label: d.toLocaleDateString("de-DE", { weekday: "short" }),
        count,
      });
    }
    return days;
  }, [dailyIdsAll]);

  const addToDailyGoal = useCallback((id: string) => {
    const dateStr = new Date().toISOString().split("T")[0];
    const next = new Set(dailySet.getCache() ?? dailySet.read());
    next.add(`${dateStr}:${id}`);
    dailySet.write(next);
    dailyForceUpdate();
    const count = Array.from(next).filter((i) => i.startsWith(`${dateStr}:`)).length;
    if (count >= DAILY_GOAL && !goalCelebrated) {
      setCelebrateGoal(true);
      setGoalCelebrated(true);
      setConfettiSeed((s) => s + 1);
    }
  }, [goalCelebrated]);

  const goNext = useCallback(() => {
    setIndex((i) => {
      const nextIndex = i + 1 < filtered.length ? i + 1 : i;
      return nextIndex;
    });
    setFlipped(false);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
    setFlipped(false);
  }, []);

  const shuffleCards = () => {
    setOrder(shuffle(allCards));
    setIndex(0);
    setFlipped(false);
  };

  const markKnown = useCallback(
    (isKnown: boolean) => {
      const card = filtered[index];
      if (!card) return;
      const wasKnown = known.has(card.id);
      const next = new Set(known);
      if (isKnown) {
        next.add(card.id);
        if (!wasKnown) {
          addToDailyGoal(card.id);
        }
      } else {
        next.delete(card.id);
      }
      knownSet.write(next);
      forceUpdate();

      const cat = card.category;
      const catCards = allCards.filter((c) => c.category === cat);
      const catKnownCount = catCards.filter((c) => next.has(c.id)).length;
      if (catKnownCount === catCards.length && catCards.length > 0 && !celebratedCategories.has(cat)) {
        setCelebrateCategory(cat);
        setCelebratedCategories((prev) => new Set(prev).add(cat));
        setConfettiSeed((s) => s + 1);
      }

      setIndex((i) => (i + 1 < filtered.length ? i + 1 : i));
      setFlipped(false);
    },
    [filtered, index, known, addToDailyGoal, allCards, celebratedCategories]
  );

  const SWIPE_THRESHOLD = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragStart.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      setIsDragging(true);
      setDragX(dx);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!dragStart.current) return;
    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      didSwipe.current = true;
      if (dragX > 0) {
        markKnown(true);
      } else {
        markKnown(false);
      }
    }
    dragStart.current = null;
    setDragX(0);
    setIsDragging(false);
  }, [dragX, markKnown]);

  const handleCardClick = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    setFlipped((f) => !f);
  };

  const toggleQuizMode = () => {
    setQuizMode((prev) => !prev);
    setQuizSelected(null);
    setQuizChecked(false);
    setIndex(0);
    setFlipped(false);
  };

  const toggleSrsMode = () => {
    setSrsMode((prev) => !prev);
    setIndex(0);
    setFlipped(false);
    setSrsSettings(getSRSSettings());
  };

  const reviewCurrent = useCallback(
    (rating: 0 | 1 | 3 | 5) => {
      if (!current) return;
      reviewItem(current.id, rating, srsSettings);
      setIndex((i) => (i + 1 < filtered.length ? i + 1 : i));
      setFlipped(false);
    },
    [current, filtered.length, srsSettings]
  );

  const selectQuizOption = (i: number) => {
    if (quizChecked) return;
    setQuizSelected(i);
  };

  const checkQuizAnswer = () => {
    if (quizSelected === null || !current) return;
    const isCorrect = quizOptions[quizSelected] === current.back;
    setQuizChecked(true);
    setQuizScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    if (isCorrect) {
      markKnown(true);
      setQuizSelected(null);
      setQuizChecked(false);
    }
  };

  const nextQuizCard = () => {
    markKnown(false);
    setQuizSelected(null);
    setQuizChecked(false);
  };

  const resetProgress = () => {
    knownSet.write(new Set<string>());
    forceUpdate();
    setIndex(0);
    setFlipped(false);
    dailySet.write(new Set<string>());
    dailyForceUpdate();
    setCelebrateGoal(false);
    setCelebrateCategory(null);
    setGoalCelebrated(false);
    setCelebratedCategories(new Set());
    setConfettiSeed(1);
    resetSRS();
  };

  const toggleFavorite = useCallback(() => {
    const card = filtered[index];
    if (!card) return;
    const next = new Set(favorites);
    if (next.has(card.id)) {
      next.delete(card.id);
    } else {
      next.add(card.id);
    }
    favoriteSet.write(next);
    favoriteForceUpdate();
  }, [filtered, index, favorites]);

  const handleNormalRating = useCallback(
    (rating: 1 | 2 | 3 | 4) => {
      markKnown(rating >= 3);
    },
    [markKnown]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          setFlipped((f) => !f);
          break;
        case "1":
          e.preventDefault();
          if (srsMode) {
            reviewCurrent(0);
          } else {
            handleNormalRating(1);
          }
          break;
        case "2":
          e.preventDefault();
          if (srsMode) {
            reviewCurrent(1);
          } else {
            handleNormalRating(2);
          }
          break;
        case "3":
          e.preventDefault();
          if (srsMode) {
            reviewCurrent(3);
          } else {
            handleNormalRating(3);
          }
          break;
        case "4":
          e.preventDefault();
          if (srsMode) {
            reviewCurrent(5);
          } else {
            handleNormalRating(4);
          }
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFavorite();
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, markKnown, toggleFavorite, srsMode, reviewCurrent, handleNormalRating]);

  if (!mounted) {
    return <SkeletonFlashcard />;
  }

  if (allCards.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Keine Karteikarten vorhanden.
        </CardContent>
      </Card>
    );
  }

  if (selectedDeck === null) {
    return <DeckSelector decks={decks} onSelect={setSelectedDeck} />;
  }

  if (filtered.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-4">
          <Layers className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Keine Karteikarten ausgewählt</h2>
          <p className="text-muted-foreground">
            Bitte wählen Sie mindestens eine Kategorie aus.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isCelebrating = celebrateGoal || celebrateCategory !== null;

  return (
    <div className="space-y-6">
      <Confetti
        active={isCelebrating}
        seed={confettiSeed}
        onDone={() => {
          setCelebrateGoal(false);
          setCelebrateCategory(null);
        }}
      />
      {isCelebrating && (
        <div className="rounded-lg bg-primary text-primary-foreground p-4 text-center font-medium animate-bounce">
          {celebrateGoal && celebrateCategory
            ? `Tagesziel erreicht und ${celebrateCategory} zu 100 % gelernt! 🎉`
            : celebrateGoal
              ? "Tagesziel erreicht! 🎉"
              : `${celebrateCategory} zu 100 % gelernt! 🎉`}
        </div>
      )}
      <div className="space-y-2">
        {title && <h1 className="text-3xl font-bold">{title}</h1>}
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Select value={mainFilter} onValueChange={handleMainFilterChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Kategorie wählen" />
          </SelectTrigger>
          <SelectContent>
            {mainOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {mainFilter === "fachwort" && (
          <Select value={fieldFilter} onValueChange={handleFieldFilterChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Berufsfeld wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Berufsfelder</SelectItem>
              {fachwortFields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button
          variant="outline"
          onClick={() => setSelectedDeck(null)}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Decks
        </Button>

        {/* Desktop: alle sekundären Aktionen direkt sichtbar */}
        <div className="hidden md:flex flex-wrap gap-3">
          <Button
            variant={onlyUnknown ? "default" : "outline"}
            onClick={toggleOnlyUnknown}
          >
            Nur Unbekannte
          </Button>
          <Button
            variant={onlyFavorites ? "default" : "outline"}
            onClick={toggleOnlyFavorites}
          >
            <Heart className={cn("mr-2 h-4 w-4", onlyFavorites && "fill-current")} />
            Nur Favoriten
          </Button>
          <Button
            variant={autoPlay ? "default" : "outline"}
            onClick={() => setAutoPlay((a) => !a)}
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Auto-Audio
          </Button>
          <Button
            variant={quizMode ? "default" : "outline"}
            onClick={toggleQuizMode}
          >
            <Brain className="mr-2 h-4 w-4" />
            Quiz-Modus
          </Button>
          <Button
            variant={srsMode ? "default" : "outline"}
            onClick={toggleSrsMode}
          >
            <Repeat className="mr-2 h-4 w-4" />
            SRS-Modus
          </Button>
          <Button
            variant={showStats ? "default" : "outline"}
            onClick={() => setShowStats((s) => !s)}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Statistik
          </Button>
          <Button variant="outline" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="mr-2 h-4 w-4" />
            ) : (
              <Maximize2 className="mr-2 h-4 w-4" />
            )}
            {isFullscreen ? "Vollbild beenden" : "Vollbild"}
          </Button>
        </div>

        {/* Mobile: sekundäre Aktionen im Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" className="w-full">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  Weitere Optionen
                </Button>
              }
            />
            <SheetContent side="bottom" className="h-auto max-h-[80vh]">
              <SheetHeader>
                <SheetTitle>Optionen</SheetTitle>
                <SheetDescription>
                  Filter und Anzeigeoptionen für den Karteikarten-Trainer.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-3 py-6">
                <Button
                  variant={onlyUnknown ? "default" : "outline"}
                  onClick={toggleOnlyUnknown}
                  className="w-full justify-start"
                >
                  Nur Unbekannte
                </Button>
                <Button
                  variant={onlyFavorites ? "default" : "outline"}
                  onClick={toggleOnlyFavorites}
                  className="w-full justify-start"
                >
                  <Heart className={cn("mr-2 h-4 w-4", onlyFavorites && "fill-current")} />
                  Nur Favoriten
                </Button>
                <Button
                  variant={autoPlay ? "default" : "outline"}
                  onClick={() => setAutoPlay((a) => !a)}
                  className="w-full justify-start"
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  Auto-Audio
                </Button>
                <Button
                  variant={quizMode ? "default" : "outline"}
                  onClick={toggleQuizMode}
                  className="w-full justify-start"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Quiz-Modus
                </Button>
                <Button
                  variant={srsMode ? "default" : "outline"}
                  onClick={toggleSrsMode}
                  className="w-full justify-start"
                >
                  <Repeat className="mr-2 h-4 w-4" />
                  SRS-Modus
                </Button>
                <Button
                  variant={showStats ? "default" : "outline"}
                  onClick={() => setShowStats((s) => !s)}
                  className="w-full justify-start"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Statistik
                </Button>
                <Button
                  variant="outline"
                  onClick={toggleFullscreen}
                  className="w-full justify-start"
                >
                  {isFullscreen ? (
                    <Minimize2 className="mr-2 h-4 w-4" />
                  ) : (
                    <Maximize2 className="mr-2 h-4 w-4" />
                  )}
                  {isFullscreen ? "Vollbild beenden" : "Vollbild"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {showStats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fortschritt pro Kategorie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {statsByCategory.map((s) => (
              <div key={s.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.category}</span>
                  <span className="text-muted-foreground">
                    {s.known} / {s.total} ({s.percentage}%)
                  </span>
                </div>
                <Progress value={s.percentage} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {showStats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lernhistorie (7 Tage)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-40">
              {history.map((day) => {
                const max = Math.max(...history.map((d) => d.count), DAILY_GOAL);
                const height = max > 0 ? (day.count / max) * 100 : 0;
                return (
                  <div
                    key={day.date}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div className="w-full flex items-end justify-center h-24">
                      <div
                        className="w-full max-w-[40px] rounded-t-md bg-primary transition-all"
                        style={{ height: `${height}%` }}
                        title={`${day.date}: ${day.count} Karten`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {day.label}
                    </span>
                    <span className="text-xs font-medium">{day.count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {srsMode ? "Fällig" : "Karten"}
            </p>
            <p className="text-2xl font-bold text-primary">{filtered.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {srsMode ? "Gelernt" : "Gewusst"}
            </p>
            <p className="text-2xl font-bold text-primary">
              {srsMode ? srsStats.learned : knownCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {srsMode ? "Neu" : "Noch offen"}
            </p>
            <p className="text-2xl font-bold text-primary">
              {srsMode ? srsStats.newCards : filtered.length - knownCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">Tagesziel</p>
            <p className="text-2xl font-bold text-primary">
              {dailyCount} / {DAILY_GOAL}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{current.category}</Badge>
            <div className="flex items-center gap-2">
              {known.has(current.id) && !srsMode && (
                <Badge variant="outline" className="text-primary">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Gewusst
                </Badge>
              )}
              {srsMode && current && (
                <>
                  <SRSSettingsDialog onChange={() => setSrsSettings(getSRSSettings())} />
                  <SRSCardDetails itemId={current.id} onChange={() => setSrsSettings(getSRSSettings())} />
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                aria-label={favorites.has(current.id) ? "Favorit entfernen" : "Als Favorit markieren"}
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    favorites.has(current.id)
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground"
                  )}
                />
              </Button>
              {current.audioPath && (
                <AudioPlayer path={current.audioPath} text={current.front} />
              )}
            </div>
          </div>
          <Progress value={progress} />
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="relative min-h-[320px] cursor-pointer perspective-1000 select-none"
            onClick={handleCardClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setFlipped((f) => !f);
              }
            }}
            aria-label="Karte umdrehen"
          >
            {isDragging && dragX > SWIPE_THRESHOLD && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-[var(--anki-good)] font-bold">
                Gewusst
              </div>
            )}
            {isDragging && dragX < -SWIPE_THRESHOLD && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[var(--anki-again)] font-bold">
                Noch lernen
              </div>
            )}
            <div
              className={cn(
                "relative w-full h-full min-h-[320px] transition-transform duration-500 transform-style-3d",
                !flipped && isDragging && "transition-none"
              )}
              style={{
                transformStyle: "preserve-3d",
                transform: flipped
                  ? "rotateY(180deg)"
                  : `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border bg-card p-6 text-center backface-hidden overflow-y-auto"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                  Vorderseite
                </span>
                <CardTitle
                  className={cn(
                    "leading-relaxed font-normal break-words",
                    current.front.length > 120
                      ? "text-lg"
                      : current.front.length > 70
                        ? "text-xl"
                        : "text-3xl"
                  )}
                >
                  {current.front}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-6">
                  Tippen, um die Rückseite anzuzeigen
                </p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border bg-muted p-6 text-center rotate-y-180 backface-hidden overflow-y-auto"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                  Rückseite
                </span>
                <p
                  className={cn(
                    "font-bold break-words",
                    current.back.length > 120
                      ? "text-lg"
                      : current.back.length > 70
                        ? "text-xl"
                        : "text-2xl"
                  )}
                >
                  {current.back}
                </p>
                {current.extra && (
                  <p className="mt-4 italic text-muted-foreground max-w-lg text-sm">
                    {current.extra}
                  </p>
                )}
              </div>
            </div>
          </div>

          {quizMode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Quiz-Score: {quizScore.correct} / {quizScore.total}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizOptions.map((option, i) => {
                  const isSelected = quizSelected === i;
                  const isCorrect = option === current.back;
                  const showCorrect = quizChecked && isCorrect;
                  const showWrong = quizChecked && isSelected && !isCorrect;
                  return (
                    <Button
                      key={`${current.id}-${option}-${i}`}
                      variant={
                        showCorrect
                          ? "default"
                          : showWrong
                            ? "destructive"
                            : isSelected
                              ? "secondary"
                              : "outline"
                      }
                      className="h-auto py-3 px-4 text-left justify-start whitespace-normal"
                      onClick={() => selectQuizOption(i)}
                      disabled={quizChecked}
                    >
                      {showCorrect && <CheckCircle2 className="mr-2 h-4 w-4 shrink-0" />}
                      {showWrong && <XCircle className="mr-2 h-4 w-4 shrink-0" />}
                      <span className="break-words">{option}</span>
                    </Button>
                  );
                })}
              </div>
              {!quizChecked ? (
                <Button
                  onClick={checkQuizAnswer}
                  disabled={quizSelected === null}
                  className="w-full"
                >
                  Prüfen
                </Button>
              ) : quizSelected !== null && quizOptions[quizSelected] !== current.back ? (
                <Button onClick={nextQuizCard} className="w-full">
                  Weiter
                </Button>
              ) : null}
            </div>
          ) : srsMode ? (
            <div className="space-y-4">
              <SRSRatingButtons
                itemId={current.id}
                onRate={reviewCurrent}
                settings={srsSettings}
              />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="outline" onClick={goPrev} disabled={index === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
                </Button>
                <Button variant="outline" onClick={() => setFlipped((f) => !f)}>
                  {flipped ? (
                    <EyeOff className="mr-2 h-4 w-4" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  {flipped ? "Verbergen" : "Aufdecken"}
                </Button>
                <Button variant="outline" onClick={shuffleCards}>
                  <Shuffle className="mr-2 h-4 w-4" /> Mischen
                </Button>
                <Button
                  variant="outline"
                  onClick={goNext}
                  disabled={index + 1 >= filtered.length}
                >
                  Weiter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button
                  onClick={() => handleNormalRating(1)}
                  aria-keyshortcuts="1"
                  className="bg-anki-again text-white hover:bg-anki-again/90"
                >
                  <span>Nochmal</span>
                  <span className="ml-2 text-xs tracking-widest opacity-80">1</span>
                </Button>
                <Button
                  onClick={() => handleNormalRating(2)}
                  aria-keyshortcuts="2"
                  className="bg-anki-hard text-white hover:bg-anki-hard/90"
                >
                  <span>Schwer</span>
                  <span className="ml-2 text-xs tracking-widest opacity-80">2</span>
                </Button>
                <Button
                  onClick={() => handleNormalRating(3)}
                  aria-keyshortcuts="3"
                  className="bg-anki-good text-white hover:bg-anki-good/90"
                >
                  <span>Gut</span>
                  <span className="ml-2 text-xs tracking-widest opacity-80">3</span>
                </Button>
                <Button
                  onClick={() => handleNormalRating(4)}
                  aria-keyshortcuts="4"
                  className="bg-anki-easy text-white hover:bg-anki-easy/90"
                >
                  <span>Einfach</span>
                  <span className="ml-2 text-xs tracking-widest opacity-80">4</span>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="secondary" onClick={resetProgress}>
          <RotateCcw className="mr-2 h-4 w-4" /> Fortschritt zurücksetzen
        </Button>
      </div>

      <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        <p className="font-medium mb-2">Tastatur-Shortcuts</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <span>← / → : Vor/Zurück</span>
          <span>Leertaste / Enter : Umdrehen</span>
          <span>1 : Nochmal</span>
          <span>2 : Schwer</span>
          <span>3 : Gut</span>
          <span>4 : Einfach</span>
          <span>F : Favorit</span>
        </div>
      </div>
    </div>
  );
}
