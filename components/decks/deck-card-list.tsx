"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AudioPlayer } from "@/components/exercises/audio-player";
import type { DeckCard } from "@/lib/actions/decks";

interface Props {
  cards: DeckCard[];
}

export function DeckCardList({ cards }: Props) {
  if (cards.length === 0) {
    return (
      <p className="text-center py-8 text-muted-foreground">
        Keine Karten in diesem Deck.
      </p>
    );
  }

  return (
    <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
      {cards.map((card) => (
        <li key={card.id}>
          <Card>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <p className="font-medium truncate">{card.front}</p>
                <p className="text-sm text-muted-foreground truncate">{card.back}</p>
                {card.extra && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {card.extra}
                  </p>
                )}
              </div>
              {card.audioPath && (
                <AudioPlayer path={card.audioPath} text={card.front} />
              )}
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
