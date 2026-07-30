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
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
          Eigene Decks
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          Persönlich zusammengestellte Karten
        </h2>
      </div>
      <DeckGrid decks={decks} stats={stats} />
    </section>
  );
}
