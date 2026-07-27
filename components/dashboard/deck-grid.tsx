"use client";

import Link from "next/link";
import { Play, Layers, BookOpen, MessageSquare, GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import type { Deck, DeckStats, DeckType } from "@/lib/decks";

interface DeckGridProps {
  decks: Deck[];
  stats: Record<string, DeckStats>;
}

const deckMeta: Record<DeckType, { icon: typeof Layers; color: string; label: string }> = {
  fachwort: { icon: Briefcase, color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300", label: "Fachwort" },
  nomen_verb: { icon: MessageSquare, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", label: "Nomen-Verb" },
  redemittel: { icon: BookOpen, color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", label: "Redemittel" },
  grammatik: { icon: GraduationCap, color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300", label: "Grammatik" },
  custom: { icon: Layers, color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300", label: "Eigener Stapel" },
};

function learnHref(deck: Deck): string {
  if (deck.type === "custom") {
    return `/decks/custom/${encodeURIComponent(deck.id.replace("custom-", ""))}/learn`;
  }
  return `/decks/${encodeURIComponent(deck.id)}/learn`;
}

export function DeckGrid({ decks, stats }: DeckGridProps) {
  if (decks.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Noch keine Decks verfügbar.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => {
        const s = stats[deck.id] ?? {
          total: 0,
          new: 0,
          review: 0,
          learned: 0,
          hidden: 0,
        };
        const hasDue = s.review > 0;
        const meta = deckMeta[deck.type];
        const Icon = meta.icon;
        const completion = s.total > 0 ? Math.round((s.learned / s.total) * 100) : 0;

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
                <ProgressRing
                  value={completion}
                  size={44}
                  strokeWidth={4}
                  label={<span className="text-[9px] font-bold">{completion}%</span>}
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-lg font-bold text-[var(--anki-again)]">{s.new}</div>
                  <div className="text-xs text-muted-foreground">Neu</div>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-lg font-bold text-[var(--anki-good)]">{s.review}</div>
                  <div className="text-xs text-muted-foreground">Fällig</div>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-lg font-bold">{s.learned}</div>
                  <div className="text-xs text-muted-foreground">Gelernt</div>
                </div>
              </div>

              <Button className="mt-auto w-full gap-2" asChild>
                <Link href={learnHref(deck)}>
                  <Play className="h-4 w-4" />
                  {hasDue ? "Jetzt lernen" : "Wiederholen"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
