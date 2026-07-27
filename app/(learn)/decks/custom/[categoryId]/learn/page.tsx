"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getCustomCards, type CustomCard } from "@/lib/custom-cards";
import { buildCustomDecks } from "@/lib/decks";
import { StudySession } from "@/components/exercises/study-session";
import { DeckOverview } from "@/components/decks/deck-overview";
import type { Deck } from "@/lib/decks";
import type { DeckCard } from "@/lib/actions/decks";

export default function CustomDeckLearnPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = decodeURIComponent(categoryId);
  const [started, setStarted] = useState(false);

  const { deck, cards }: { deck: Deck | null; cards: DeckCard[] } = useMemo(() => {
    if (typeof window === "undefined") return { deck: null, cards: [] };
    const allDecks = buildCustomDecks(getCustomCards());
    const found = allDecks.find(
      (d) => d.title === category || d.id === `custom-${category}`
    );
    if (!found) return { deck: null, cards: [] };

    const customCards = getCustomCards().filter((c: CustomCard) =>
      found.itemIds.includes(c.id)
    );

    return {
      deck: found,
      cards: customCards.map((c) => ({
        id: c.id,
        front: c.term,
        back: c.meaning,
        extra: [c.example, c.notes].filter(Boolean).join("\n\n"),
      })),
    };
  }, [category]);

  if (!deck) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        Keine eigenen Karten in diesem Deck.
      </div>
    );
  }

  if (!started) {
    return (
      <div className="py-8">
        <DeckOverview deck={deck} onStart={() => setStarted(true)} />
      </div>
    );
  }

  return (
    <div className="py-4">
      <StudySession cards={cards} deckTitle={deck.title} itemType="uebung" />
    </div>
  );
}
