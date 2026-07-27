import { notFound, redirect } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { getDeckById, getDeckCards } from "@/lib/actions/decks";
import { DeckLearnShell } from "@/components/decks/deck-learn-shell";

interface Props {
  params: Promise<{ deckId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);
  return {
    title: deck ? `${deck.title} lernen – ${APP_NAME}` : `Lernen – ${APP_NAME}`,
  };
}

export default async function DeckLearnPage({ params }: Props) {
  const { deckId } = await params;
  const deck = await getDeckById(deckId);
  if (!deck) return notFound();

  const cards = await getDeckCards(deck);
  if (cards.length === 0) {
    redirect(`/decks/${deckId}`);
  }

  return (
    <div className="py-4">
      <DeckLearnShell
        deck={deck}
        cards={cards}
        itemType={
          deck.type === "nomen_verb"
            ? "nomen_verb"
            : deck.type === "fachwort"
            ? "fachwort"
            : "uebung"
        }
      />
    </div>
  );
}
