"use client";

import { useMemo } from "react";
import {
  BookOpen,
  Headphones,
  Pencil,
  Mic,
  MessageCircle,
  Puzzle,
  Briefcase,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useTranslation } from "@/components/layout/language-provider";
import { SkeletonList } from "@/components/ui/content-skeletons";
import { EmptyState } from "@/components/ui/empty-state";
import { getDemoProgress, type DemoProgress } from "@/lib/demo-storage";
import { grammarQuestions } from "@/lib/grammar-data";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { readingTexts } from "@/lib/reading-data";
import { listeningTasks } from "@/lib/listening-data";
import { writingTasks } from "@/lib/writing-data";
import { speakingTasks } from "@/lib/speaking-data";

const TYPE_META: Record<
  DemoProgress["itemType"],
  { label: string; icon: LucideIcon }
> = {
  fachwort: { label: "Fachwort", icon: Briefcase },
  nomen_verb: { label: "Nomen-Verb", icon: Puzzle },
  nomen_verb_quiz: { label: "Nomen-Verb", icon: Puzzle },
  lueckentext: { label: "Lückentext", icon: Puzzle },
  grammar_quiz: { label: "Grammatik", icon: BookOpen },
  reading_quiz: { label: "Lesen", icon: BookOpen },
  listening_quiz: { label: "Hören", icon: Headphones },
  writing_quiz: { label: "Schreiben", icon: Pencil },
  speaking_quiz: { label: "Sprechen", icon: Mic },
  redemittel_quiz: { label: "Redemittel", icon: MessageCircle },
};

const TITLE_LOOKUP: Record<string, Record<string, string>> = {
  grammar_quiz: Object.fromEntries(grammarQuestions.map((q) => [q.id, q.question])),
  redemittel_quiz: Object.fromEntries(redemittelQuestions.map((q) => [q.id, q.question])),
  writing_quiz: Object.fromEntries(writingTasks.map((t) => [t.id, t.title])),
  speaking_quiz: Object.fromEntries(speakingTasks.map((t) => [t.id, t.title])),
  reading_quiz: Object.fromEntries(
    readingTexts.flatMap((t) =>
      t.questions.map((q, idx) => [`${t.id}-${idx}`, t.title])
    )
  ),
  listening_quiz: Object.fromEntries(
    listeningTasks.flatMap((t) =>
      t.questions.map((q, idx) => [`${t.id}-${idx}`, t.title])
    )
  ),
};

function resolveTitle(entry: DemoProgress): string {
  const lookup = TITLE_LOOKUP[entry.itemType];
  if (lookup?.[entry.itemId]) return lookup[entry.itemId];
  return TYPE_META[entry.itemType].label;
}

function relativeTime(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "gerade eben";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `vor ${minutes} Min.`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  const days = Math.round(hours / 24);
  return `vor ${days} T.`;
}

export function RecentActivityCard() {
  const t = useTranslation();
  const mounted = useMounted();

  const entries = useMemo(() => {
    if (!mounted) return [];
    return getDemoProgress().slice(0, 6);
  }, [mounted]);

  if (!mounted) {
    return (
      <Card className="rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
        <CardHeader>
          <CardTitle>{t.dashboard.recentActivity}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <SkeletonList rows={4} />
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        icon={<Layers className="h-7 w-7" />}
        title="Noch keine Aktivitäten"
        description="Sobald Sie lernen, erscheinen hier Ihre letzten Übungen."
      />
    );
  }

  return (
    <Card className="rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
      <CardHeader>
        <CardTitle>{t.dashboard.recentActivity}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry, idx) => {
          const meta = TYPE_META[entry.itemType];
          const Icon = meta.icon;
          return (
            <div
              key={`${entry.itemId}-${idx}`}
              className="flex items-center justify-between gap-3 rounded-[1.4rem] border border-sky-100 bg-white px-4 py-3 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.24)]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">{resolveTitle(entry)}</p>
                  <p className="text-xs text-slate-500">{meta.label}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge className={entry.score >= 60 ? "bg-sky-500 hover:bg-sky-500" : "bg-slate-100 text-slate-600 hover:bg-slate-100"}>
                  {entry.score}%
                </Badge>
                <span className="text-[10px] text-slate-400">
                  {relativeTime(new Date(entry.practicedAt))}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
