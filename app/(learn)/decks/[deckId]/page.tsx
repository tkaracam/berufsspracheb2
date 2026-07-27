import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Layers, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { getDeckById, getDeckCards } from "@/lib/actions/decks";
import { DeckStatsClient } from "@/components/decks/deck-stats-client";
import { DeckCardList } from "@/components/decks/deck-card-list";
import { ResetDeckButton } from "@/components/decks/reset-deck-button";

interface Props {
  params: Promise<{ deckId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);
  return {
    title: deck ? `${deck.title} – ${APP_NAME}` : `Deck – ${APP_NAME}`,
  };
}

export default async function DeckDetailPage({ params }: Props) {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);
  if (!deck) return notFound();

  const cards = await getDeckCards(deck);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7" />
            {deck.title}
          </h1>
          <p className="text-muted-foreground">{cards.length} Karten</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/decks/${deckId}/settings`}>
              <Settings className="mr-2 h-4 w-4" />
              Einstellungen
            </Link>
          </Button>
          <Button size="lg" className="gap-2" asChild>
            <Link href={`/decks/${deckId}/learn`}>
              <Play className="h-5 w-5" />
              Lernen
            </Link>
          </Button>
        </div>
      </div>

      <DeckStatsClient deck={deck} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Karten</CardTitle>
          </CardHeader>
          <CardContent>
            <DeckCardList cards={cards} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktionen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full gap-2" asChild>
              <Link href={`/decks/${deckId}/learn`}>
                <Play className="h-4 w-4" />
                Jetzt lernen
              </Link>
            </Button>
            <ResetDeckButton deck={deck} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
