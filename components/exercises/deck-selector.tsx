"use client";

import { useMemo } from "react";
import { Layers, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export interface Deck {
  id: string;
  title: string;
  count: number;
  known: number;
}

interface DeckSelectorProps {
  decks: Deck[];
  onSelect: (deckId: string | null) => void;
}

export function DeckSelector({ decks, onSelect }: DeckSelectorProps) {
  const sorted = useMemo(
    () => [...decks].sort((a, b) => b.count - a.count),
    [decks]
  );

  const totalCount = useMemo(
    () => decks.reduce((sum, d) => sum + d.count, 0),
    [decks]
  );

  const totalKnown = useMemo(
    () => decks.reduce((sum, d) => sum + d.known, 0),
    [decks]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Card
          className="flex-1 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelect(null)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5" />
                Alle Karten
              </CardTitle>
              <Badge variant="secondary">{totalCount}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={totalCount > 0 ? (totalKnown / totalCount) * 100 : 0} />
            <p className="text-sm text-muted-foreground">
              {totalKnown} von {totalCount} als gewusst markiert
            </p>
            <Button className="w-full" onClick={() => onSelect(null)}>
              Alle lernen <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((deck) => (
          <Card
            key={deck.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(deck.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layers className="h-4 w-4" />
                  {deck.title}
                </CardTitle>
                <Badge variant="secondary">{deck.count}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={deck.count > 0 ? (deck.known / deck.count) * 100 : 0} />
              <p className="text-sm text-muted-foreground">
                {deck.known} von {deck.count} als gewusst markiert
              </p>
              <Button variant="outline" className="w-full" onClick={() => onSelect(deck.id)}>
                Deck lernen <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
