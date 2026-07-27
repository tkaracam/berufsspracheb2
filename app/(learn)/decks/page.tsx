import Link from "next/link";
import { Play, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "@/lib/constants";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";
import type { Deck, DeckType } from "@/lib/decks";
import { CustomDeckSection } from "@/components/decks/custom-deck-section";

export const metadata = {
  title: `Decks – ${APP_NAME}`,
};

export default async function DecksPage() {
  const [woerter, nvResult, berufsfelder] = await Promise.all([
    getAllFachwoerter(),
    getNomenVerbVerbindungen(),
    getBerufsfelder(),
  ]);

  const nv = nvResult.data ?? [];
  const fieldMap = new Map(berufsfelder.map((b) => [b.id, b.title]));

  const fachwortGroups = new Map<string, string[]>();
  woerter.forEach((w) => {
    const title = `Fachwort: ${fieldMap.get(w.berufsfeld_id) ?? "Allgemein"}`;
    const list = fachwortGroups.get(title) ?? [];
    list.push(w.id);
    fachwortGroups.set(title, list);
  });

  const nvGroups = new Map<string, string[]>();
  nv.forEach((n) => {
    const title = n.kategorie ?? "Nomen-Verb";
    const list = nvGroups.get(title) ?? [];
    list.push(n.id);
    nvGroups.set(title, list);
  });

  const decks: Deck[] = [
    ...Array.from(fachwortGroups.entries()).map(([title, itemIds]) => ({
      id: encodeURIComponent(title),
      title,
      type: "fachwort" as DeckType,
      itemIds,
    })),
    ...Array.from(nvGroups.entries()).map(([title, itemIds]) => ({
      id: encodeURIComponent(title),
      title,
      type: "nomen_verb" as DeckType,
      itemIds,
    })),
    {
      id: "redemittel",
      title: "Redemittel",
      type: "redemittel" as DeckType,
      itemIds: redemittelQuestions.map((q) => q.id),
    },
    {
      id: "grammatik",
      title: "Grammatik",
      type: "grammatik" as DeckType,
      itemIds: grammarQuestions.map((q) => q.id),
    },
  ].filter((d) => d.itemIds.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Decks</h1>
        <p className="text-muted-foreground">
          Wähle ein Deck, um zu lernen oder den Fortschritt zu sehen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <Card key={deck.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layers className="h-4 w-4" />
                  <span className="line-clamp-2">{deck.title}</span>
                </CardTitle>
                <Badge variant="secondary">{deck.itemIds.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button className="w-full gap-2" asChild>
                <Link href={`/decks/${deck.id}/learn`}>
                  <Play className="h-4 w-4" />
                  Lernen
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <CustomDeckSection />
    </div>
  );
}
