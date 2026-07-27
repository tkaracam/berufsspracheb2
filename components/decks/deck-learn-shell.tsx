"use client";

import { useState } from "react";
import { StudySession } from "@/components/exercises/study-session";
import { DeckOverview } from "./deck-overview";
import type { Deck } from "@/lib/decks";
import type { DeckCard } from "@/lib/actions/decks";
import type { ReviewableItemType } from "@/lib/progress";

interface Props {
  deck: Deck;
  cards: DeckCard[];
  itemType: ReviewableItemType;
}

export function DeckLearnShell({ deck, cards, itemType }: Props) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="py-8">
        <DeckOverview deck={deck} onStart={() => setStarted(true)} />
      </div>
    );
  }

  return <StudySession cards={cards} deckTitle={deck.title} itemType={itemType as "fachwort" | "nomen_verb" | "uebung"} />;
}
