"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowLeft, Volume2, VolumeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AudioPlayer } from "./audio-player";
import { useSwipe } from "@/lib/hooks/use-swipe";
import {
  reviewItem,
  type SRSRating,
  getSRSCards,
  buryItem,
  suspendItem,
} from "@/lib/spaced-repetition";
import { getSRSSettings } from "@/lib/srs-settings";
import { SRSRatingButtons } from "./srs-rating-buttons";
import { SessionSummary } from "./session-summary";
import { recordReview, type ReviewableItemType } from "@/lib/progress";
import type { DeckCard } from "@/lib/actions/decks";

type StudyItemType = Extract<ReviewableItemType, "fachwort" | "nomen_verb" | "uebung">;

interface StudySessionProps {
  cards: DeckCard[];
  deckTitle: string;
  itemType: StudyItemType;
  onFinish?: () => void;
}

interface SessionStats {
  new: number;
  review: number;
  again: number;
  hard: number;
  good: number;
  easy: number;
}

export function StudySession({
  cards,
  deckTitle,
  itemType,
  onFinish,
}: StudySessionProps) {
  const [startedAt] = useState(() => Date.now());
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState(1);
  const [stats, setStats] = useState<SessionStats>({
    new: 0,
    review: 0,
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });
  const autoPlay = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const handler = () => callback();
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    () => {
      try {
        return localStorage.getItem("bsk-study-autoplay") === "true";
      } catch {
        return false;
      }
    },
    () => false
  );

  const toggleAutoPlay = useCallback(() => {
    const next = !autoPlay;
    if (typeof window !== "undefined") {
      localStorage.setItem("bsk-study-autoplay", String(next));
    }
    window.dispatchEvent(new StorageEvent("storage", { key: "bsk-study-autoplay" }));
  }, [autoPlay]);

  const orderedCards = useMemo(() => {
    const srsCards = getSRSCards();
    const settings = getSRSSettings();
    const today = new Date().toISOString().split("T")[0];

    const sorted = [...cards].sort((a, b) => {
      const ca = srsCards[a.id];
      const cb = srsCards[b.id];

      const scoreA = !ca ? 2 : ca.dueDate <= today ? 1 : 0;
      const scoreB = !cb ? 2 : cb.dueDate <= today ? 1 : 0;

      return scoreB - scoreA;
    });

    return settings.sessionLimit > 0 ? sorted.slice(0, settings.sessionLimit) : sorted;
  }, [cards]);

  const current = orderedCards[index];
  const progress = orderedCards.length > 0 ? (index / orderedCards.length) * 100 : 100;

  useSwipe({
    enabled: !finished && !!current,
    onSwipe: (direction) => {
      if (!flipped) {
        handleFlip();
        return;
      }
      switch (direction) {
        case "left":
          handleRate(0);
          break;
        case "up":
          handleRate(1);
          break;
        case "right":
          handleRate(3);
          break;
        case "down":
          handleRate(5);
          break;
      }
    },
  });

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const handleSkip = useCallback(
    (itemId: string, mode: "bury" | "suspend") => {
      if (mode === "bury") {
        buryItem(itemId);
      } else {
        suspendItem(itemId, 7);
      }

      setFlipped(false);
      if (index + 1 >= orderedCards.length) {
        setDurationMinutes(Math.max(1, Math.round((Date.now() - startedAt) / 60000)));
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
      }
    },
    [index, orderedCards.length, startedAt]
  );

  const handleRate = useCallback(
    (rating: SRSRating) => {
      if (!current) return;

      const srsCards = getSRSCards();
      const card = srsCards[current.id];
      const isNew = !card;
      const wasDue = card ? card.dueDate <= new Date().toISOString().split("T")[0] : true;

      reviewItem(current.id, rating);
      recordReview(itemType, current.id, rating);

      setStats((s) => ({
        ...s,
        new: s.new + (isNew ? 1 : 0),
        review: s.review + (wasDue && !isNew ? 1 : 0),
        again: s.again + (rating === 0 ? 1 : 0),
        hard: s.hard + (rating === 1 ? 1 : 0),
        good: s.good + (rating === 3 ? 1 : 0),
        easy: s.easy + (rating === 5 ? 1 : 0),
      }));

      setFlipped(false);
      if (index + 1 >= orderedCards.length) {
        setDurationMinutes(Math.max(1, Math.round((Date.now() - startedAt) / 60000)));
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
      }
    },
    [current, index, orderedCards.length, itemType, startedAt]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (finished) return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleFlip();
        return;
      }

      if (!flipped) return;

      if (e.key === "1") handleRate(0);
      if (e.key === "2") handleRate(1);
      if (e.key === "3") handleRate(3);
      if (e.key === "4") handleRate(5);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finished, flipped, handleFlip, handleRate]);

  if (finished) {
    return (
      <SessionSummary
        stats={stats}
        durationMinutes={durationMinutes}
        onRestart={() => {
          setIndex(0);
          setFlipped(false);
          setFinished(false);
          setStats({ new: 0, review: 0, again: 0, hard: 0, good: 0, easy: 0 });
        }}
        onFinish={onFinish}
      />
    );
  }

  if (!current) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        Keine Karten verfügbar.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onFinish}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Beenden
        </Button>
        <div className="text-sm font-medium">{deckTitle}</div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAutoPlay}
            title={autoPlay ? "Automatische Wiedergabe aktiv" : "Automatische Wiedergabe deaktiviert"}
            aria-pressed={autoPlay}
          >
            {autoPlay ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeOff className="h-4 w-4" />
            )}
            <span className="sr-only">Autoplay</span>
          </Button>
          <div className="text-sm text-muted-foreground">
            {index + 1} / {orderedCards.length}
          </div>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <div
        className="relative cursor-pointer perspective-1000 select-none"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleFlip();
        }}
        aria-label="Karte umdrehen"
      >
        <Card className="min-h-[320px]">
          <CardContent className="flex flex-col items-center justify-center min-h-[320px] p-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {flipped ? "Antwort" : "Frage"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">{flipped ? current.back : current.front}</h2>
            {current.audioPath && <AudioPlayer path={current.audioPath} text={current.front} autoPlay={autoPlay && !flipped} />}
            {flipped && current.extra && (
              <p className="text-muted-foreground max-w-lg">{current.extra}</p>
            )}
            {!flipped && (
              <p className="text-sm text-muted-foreground">
                Klicken oder Enter zum Aufdecken
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {flipped ? (
        <>
          <SRSRatingButtons
            itemId={current.id}
            onRate={handleRate}
            settings={getSRSSettings()}
            labels={{ again: "Nochmal", hard: "Schwer", good: "Gut", easy: "Einfach" }}
          />
          <div className="flex justify-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleSkip(current.id, "bury")}>
              Morgen
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSkip(current.id, "suspend")}>
              1 Woche
            </Button>
          </div>
          <div className="sm:hidden flex justify-center gap-4 text-xs text-muted-foreground">
            <span>← Nochmal</span>
            <span>↑ Schwer</span>
            <span>→ Gut</span>
            <span>↓ Einfach</span>
          </div>
        </>
      ) : (
        <Button size="lg" className="w-full" onClick={handleFlip}>
          Antwort aufdecken
        </Button>
      )}
    </div>
  );
}
