import Link from "next/link";
import { Play, Layers, BookOpen, MessageSquare, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "@/lib/constants";
import { getDictionaryFromCookie } from "@/lib/i18n/server";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";
import { DeckStatsClient } from "@/components/decks/deck-stats-client";
import { CustomDeckSection } from "@/components/decks/custom-deck-section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Deck, DeckType } from "@/lib/decks";

export const metadata = {
  title: `Lernen – ${APP_NAME}`,
};

const deckMeta: Record<DeckType, { icon: typeof Layers; color: string }> = {
  fachwort: { icon: Briefcase, color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  nomen_verb: { icon: MessageSquare, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  redemittel: { icon: BookOpen, color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  grammatik: { icon: GraduationCap, color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" },
  custom: { icon: Layers, color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
};

export default async function TrainerPage() {
  const t = await getDictionaryFromCookie();

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
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.nav.trainer}</h1>
        <p className="text-muted-foreground">
          Wähle ein Deck, um mit dem Lernen zu starten.
        </p>
      </div>

      <section className="space-y-4">
        <SectionHeading title="Verfügbare Decks" centered={false} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => {
            const meta = deckMeta[deck.type];
            const Icon = meta.icon;
            return (
              <Card key={deck.id} className="flex flex-col border-t-4 border-t-primary/30 transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="flex items-start gap-3 text-base">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="line-clamp-2 pt-1">{deck.title}</span>
                    </CardTitle>
                    <Badge variant="secondary">{deck.itemIds.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <DeckStatsClient deck={deck} />
                  <Button className="w-full gap-2 mt-auto" asChild>
                    <Link href={`/decks/${deck.id}/learn`}>
                      <Play className="h-4 w-4" />
                      {t.common.start}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <CustomDeckSection />
    </div>
  );
}
