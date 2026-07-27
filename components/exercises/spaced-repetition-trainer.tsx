"use client";

import { useState, useSyncExternalStore, useReducer, useMemo, useEffect, useCallback } from "react";
import { RotateCcw, Brain, Eye, ArrowLeft } from "lucide-react";
import { getSRSSettings, type SRSSettings } from "@/lib/srs-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkeletonStatCards, SkeletonCardHeader } from "@/components/ui/content-skeletons";
import { AudioPlayer } from "./audio-player";
import {
  type SRSItem,
  type SRSRating,
  getDueItems,
  getSRSStats,
  getSRSCards,
  reviewItem,
  resetSRS,
} from "@/lib/spaced-repetition";
import { getCustomCards } from "@/lib/custom-cards";
import { DeckSelector, type Deck } from "./deck-selector";
import { SRSRatingButtons } from "./srs-rating-buttons";
import { SRSCardDetails } from "./srs-card-details";
import { SRSSettingsDialog } from "./srs-settings-dialog";

interface Props {
  items: SRSItem[];
}

type StudyState = "front" | "back";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function customCardsToSRSItems(): SRSItem[] {
  if (typeof window === "undefined") return [];
  return getCustomCards().map((c) => ({
    id: c.id,
    type: c.category || "Eigene Karte",
    front: c.term,
    back: `${c.meaning}${c.antonym ? ` – Antonym: ${c.antonym}` : ""}${c.example ? `\n„${c.example}“` : ""}`,
    extra: c.notes || undefined,
  }));
}

export function SpacedRepetitionTrainer({ items }: Props) {
  const mounted = useMounted();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<StudyState>("front");
  const [completed, setCompleted] = useState(0);
  const [customItems] = useState<SRSItem[]>(() => customCardsToSRSItems());
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [settings, setSettings] = useState<SRSSettings>(() => getSRSSettings());
  const allItems = useMemo(() => [...items, ...customItems], [items, customItems]);

  const decks = useMemo<Deck[]>(() => {
    const groups = new Map<string, SRSItem[]>();
    allItems.forEach((item) => {
      const key = item.category ?? item.type;
      const list = groups.get(key) ?? [];
      list.push(item);
      groups.set(key, list);
    });
    const cards = getSRSCards();
    return Array.from(groups.entries()).map(([title, list]) => {
      const known = list.filter((i) => {
        const card = cards[i.id];
        return card && card.repetition > 0;
      }).length;
      return { id: title, title, count: list.length, known };
    });
  }, [allItems]);

  const deckItems = useMemo(
    () => (selectedDeck ? allItems.filter((i) => (i.category ?? i.type) === selectedDeck) : allItems),
    [allItems, selectedDeck]
  );

  const dueItems = useMemo(() => getDueItems(deckItems, settings), [deckItems, settings]);
  const stats = useMemo(() => getSRSStats(deckItems), [deckItems]);
  const current = dueItems[index];

  const reveal = useCallback(() => setState("back"), []);

  const rate = useCallback(
    (rating: SRSRating) => {
      if (!current) return;
      reviewItem(current.id, rating, settings);
      setCompleted((c) => c + 1);
      setState("front");
      if (index + 1 >= dueItems.length) {
        setIndex(0);
      } else {
        setIndex((i) => i + 1);
      }
    },
    [current, dueItems.length, index, settings]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (!current) return;
      if (state === "front") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          reveal();
        }
        return;
      }
      switch (e.key) {
        case "1":
          e.preventDefault();
          rate(0);
          break;
        case "2":
          e.preventDefault();
          rate(1);
          break;
        case "3":
          e.preventDefault();
          rate(3);
          break;
        case "4":
          e.preventDefault();
          rate(5);
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, reveal, rate, current]);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <SkeletonStatCards count={3} />
        <SkeletonCardHeader rows={2} />
      </div>
    );
  }

  if (selectedDeck === null) {
    return <DeckSelector decks={decks} onSelect={setSelectedDeck} />;
  }

  if (dueItems.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-4">
          <Brain className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Keine Karten fällig</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Super! Alle {stats.total} Karten sind aktuell gelernt. Kommen Sie morgen wieder, um die nächste Runde zu wiederholen.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={forceUpdate}>
              <RotateCcw className="mr-2 h-4 w-4" /> Aktualisieren
            </Button>
            <Button variant="secondary" onClick={() => { resetSRS(); forceUpdate(); }}>
              Wiederholungsstand zurücksetzen
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((completed) / (dueItems.length + completed)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="outline" onClick={() => setSelectedDeck(null)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Decks
        </Button>
        <SRSSettingsDialog onChange={() => setSettings(getSRSSettings())} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">Fällig</p>
            <p className="text-2xl font-bold text-primary">{stats.due}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">Gelernt</p>
            <p className="text-2xl font-bold text-primary">{stats.learned}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">Neu</p>
            <p className="text-2xl font-bold text-primary">{stats.newCards}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Karte {Math.min(index + 1, dueItems.length)} / {dueItems.length + completed}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{current.type === "fachwort" ? "Fachwort" : "Nomen-Verb"}</Badge>
              <SRSCardDetails itemId={current.id} onChange={() => setSettings(getSRSSettings())} />
            </div>
          </div>
          <Progress value={progress} />
          <div className="flex items-center justify-center gap-3 mt-6">
            <CardTitle className="text-3xl text-center">{current.front}</CardTitle>
            {current.audioPath && (
              <AudioPlayer path={current.audioPath} text={current.front} />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          {state === "front" ? (
            <Button variant="outline" onClick={reveal} className="mx-auto min-h-12 px-6">
              <Eye className="mr-2 h-4 w-4" /> Lösung aufdecken
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-6 space-y-2 text-left">
                <p className="text-2xl font-bold">{current.back}</p>
                {current.extra && <p className="italic text-muted-foreground">{current.extra}</p>}
              </div>

              <SRSRatingButtons
                itemId={current.id}
                onRate={rate}
                settings={settings}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
