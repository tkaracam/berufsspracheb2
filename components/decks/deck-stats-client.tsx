"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getDeckStats, type Deck } from "@/lib/decks";

interface Props {
  deck: Deck;
}

export function DeckStatsClient({ deck }: Props) {
  const stats = useMemo(() => getDeckStats(deck), [deck]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 space-y-1">
          <div className="text-sm text-muted-foreground">Gesamt</div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 space-y-1">
          <div className="text-sm text-muted-foreground">Neu</div>
          <div className="text-3xl font-bold text-[var(--anki-again)]">{stats.new}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 space-y-1">
          <div className="text-sm text-muted-foreground">Fällig</div>
          <div className="text-3xl font-bold text-[var(--anki-good)]">{stats.review}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 space-y-1">
          <div className="text-sm text-muted-foreground">Gelernt</div>
          <div className="text-3xl font-bold">{stats.learned}</div>
        </CardContent>
      </Card>
    </div>
  );
}
