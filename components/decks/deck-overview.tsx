"use client";

import { useMemo } from "react";
import { Play, Layers, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDeckStats, type Deck } from "@/lib/decks";

interface DeckOverviewProps {
  deck: Deck;
  onStart: () => void;
}

export function DeckOverview({ deck, onStart }: DeckOverviewProps) {
  const stats = useMemo(() => getDeckStats(deck), [deck]);
  const hasCards = stats.total > 0;
  const hasDue = stats.review > 0 || stats.new > 0;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Layers className="h-7 w-7" />
          {deck.title}
        </h1>
        <p className="text-muted-foreground">Bereit zum Lernen?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center space-y-1">
            <div className="text-3xl font-bold text-[var(--anki-again)]">{stats.new}</div>
            <div className="text-sm text-muted-foreground">Neu</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center space-y-1">
            <div className="text-3xl font-bold text-[var(--anki-good)]">{stats.review}</div>
            <div className="text-sm text-muted-foreground">Wiederholen</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center space-y-1">
            <div className="text-3xl font-bold">{stats.learned}</div>
            <div className="text-sm text-muted-foreground">Gelernt</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Infos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Gesamtkarten</span>
            <Badge variant="secondary">{stats.total}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Ausgeblendet</span>
            <Badge variant="secondary">{stats.hidden}</Badge>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Clock className="h-4 w-4" />
            Geschätzte Dauer: {Math.max(1, Math.round(stats.review * 0.5 + stats.new * 1))} Min.
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <Button size="lg" className="w-full gap-2" onClick={onStart} disabled={!hasCards}>
          <Play className="h-5 w-5" />
          {hasDue ? "Jetzt lernen" : "Deck wiederholen"}
        </Button>
        {!hasDue && hasCards && (
          <p className="text-center text-sm text-muted-foreground">
            Keine Karten fällig. Du kannst das Deck trotzdem wiederholen.
          </p>
        )}
      </div>
    </div>
  );
}
