"use client";

import { useMemo } from "react";
import { getCustomCards } from "@/lib/custom-cards";
import { buildCustomDecks } from "@/lib/decks";
import { DeckGrid } from "@/components/dashboard/deck-grid";
import { getDeckStats } from "@/lib/decks";
import { useMounted } from "@/lib/hooks/use-mounted";

export function CustomDeckSection() {
  const mounted = useMounted();

  const decks = useMemo(() => {
    if (!mounted) return [];
    return buildCustomDecks(getCustomCards());
  }, [mounted]);

  const stats = useMemo(() => {
    const result: Record<string, ReturnType<typeof getDeckStats>> = {};
    decks.forEach((deck) => {
      result[deck.id] = getDeckStats(deck);
    });
    return result;
  }, [decks]);

  if (decks.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Eigene Decks</h2>
      <DeckGrid decks={decks} stats={stats} />
    </section>
  );
}
