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
  fachwort: { icon: Briefcase, color: "bg-sky-100 text-sky-700", label: "Fachwort" },
  nomen_verb: { icon: MessageSquare, color: "bg-emerald-100 text-emerald-700", label: "Nomen-Verb" },
  redemittel: { icon: BookOpen, color: "bg-amber-100 text-amber-700", label: "Redemittel" },
  grammatik: { icon: GraduationCap, color: "bg-rose-100 text-rose-700", label: "Grammatik" },
  custom: { icon: Layers, color: "bg-violet-100 text-violet-700", label: "Eigener Stapel" },
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
      <Card className="rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
        <CardContent className="py-12 text-center text-slate-500">
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
          <Card key={deck.id} className="flex flex-col rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.22)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_55px_-32px_rgba(59,130,246,0.28)]">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="flex items-start gap-3 text-base">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${meta.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <p className="line-clamp-2 text-slate-900">{deck.title}</p>
                    <p className="mt-1 text-xs font-medium text-slate-400">{meta.label}</p>
                  </div>
                </CardTitle>
                <ProgressRing
                  value={completion}
                  size={44}
                  strokeWidth={4}
                  trackClassName="text-sky-100"
                  indicatorClassName="text-sky-500"
                  label={<span className="text-[9px] font-bold">{completion}%</span>}
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-sky-50/80 p-3">
                  <div className="text-lg font-bold text-[var(--anki-again)]">{s.new}</div>
                  <div className="text-xs text-slate-500">Neu</div>
                </div>
                <div className="rounded-2xl bg-emerald-50/80 p-3">
                  <div className="text-lg font-bold text-[var(--anki-good)]">{s.review}</div>
                  <div className="text-xs text-slate-500">Fällig</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-lg font-bold text-slate-900">{s.learned}</div>
                  <div className="text-xs text-slate-500">Gelernt</div>
                </div>
              </div>

              <Button className="mt-auto w-full gap-2 rounded-2xl bg-sky-500 hover:bg-sky-600" asChild>
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
