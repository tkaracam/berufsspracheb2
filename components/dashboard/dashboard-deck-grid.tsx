"use client";

import { useMemo, useState } from "react";
import { DeckGrid } from "./deck-grid";
import { DeckFilter } from "./deck-filter";
import { getDeckStats, type Deck, type DeckType, type DeckStats } from "@/lib/decks";

interface Props {
  decks: Deck[];
}

type FilterKey = DeckType | "all" | "due";

function useClientStats(decks: Deck[]): Record<string, DeckStats> {
  return useMemo(() => {
    // Während SSR liefern wir leere Stats, damit Server und Client übereinstimmen.
    if (typeof window === "undefined") {
      const result: Record<string, DeckStats> = {};
      decks.forEach((deck) => {
        result[deck.id] = { total: 0, new: 0, review: 0, learned: 0, hidden: 0 };
      });
      return result;
    }

    const result: Record<string, DeckStats> = {};
    decks.forEach((deck) => {
      result[deck.id] = getDeckStats(deck);
    });
    return result;
  }, [decks]);
}

export function DashboardDeckGrid({ decks }: Props) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const stats = useClientStats(decks);

  const filteredDecks = useMemo(() => {
    if (filter === "all") return decks;
    if (filter === "due") return decks.filter((d) => (stats[d.id]?.review ?? 0) > 0);
    return decks.filter((d) => d.type === filter);
  }, [decks, filter, stats]);

  return (
    <div className="space-y-4">
      <DeckFilter decks={decks} stats={stats} value={filter} onChange={setFilter} />
      <DeckGrid decks={filteredDecks} stats={stats} />
    </div>
  );
}
