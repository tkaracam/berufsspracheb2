"use client";

import Link from "next/link";
import { Play, Flame, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";

interface TodayHeroProps {
  dueCount: number;
  dailyGoal: number;
  todayDone: number;
  streak: number;
  firstDeckId?: string;
}

export function TodayHero({
  dueCount,
  dailyGoal,
  todayDone,
  streak,
  firstDeckId,
}: TodayHeroProps) {
  const progress = Math.min((todayDone / dailyGoal) * 100, 100);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-[linear-gradient(135deg,#ffffff_0%,#f3faff_48%,#ecf8ff_100%)] p-6 text-slate-900 shadow-[0_24px_60px_-38px_rgba(59,130,246,0.28)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(186,230,253,0.55),transparent_42%)]" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-sky-500" />
            Tagesübersicht
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {dueCount > 0
              ? `${dueCount} Karten fällig`
              : "Alles erledigt für heute"}
          </h2>
          <p className="text-slate-600">
            {dueCount > 0
              ? "Starte jetzt deine Lernsession und bleib dran."
              : "Super! Komm morgen wieder, um deine Wiederholungen zu machen."}
          </p>
        </div>
        {dueCount > 0 && firstDeckId && (
          <Button size="lg" className="shrink-0 gap-2 rounded-2xl bg-sky-500 text-base hover:bg-sky-600" asChild>
            <Link href={`/decks/${encodeURIComponent(firstDeckId)}/learn`}>
              <Play className="h-5 w-5" />
              Jetzt lernen
            </Link>
          </Button>
        )}
      </div>

      <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between gap-4 rounded-[1.6rem] border border-sky-100 bg-white/92 p-4 shadow-[0_16px_35px_-26px_rgba(15,23,42,0.24)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Target className="h-4 w-4 text-sky-500" />
              Tagesziel
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {todayDone} / {dailyGoal}
            </div>
            <p className="text-xs text-slate-500">
              {Math.round(progress)} % erreicht
            </p>
          </div>
          <ProgressRing
            value={progress}
            size={72}
            strokeWidth={6}
            trackClassName="text-sky-100"
            indicatorClassName="text-sky-500"
            label={`${Math.round(progress)}%`}
          />
        </div>

        <div className="space-y-2 rounded-[1.6rem] border border-sky-100 bg-white/92 p-4 shadow-[0_16px_35px_-26px_rgba(15,23,42,0.24)]">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Flame className="h-4 w-4 text-orange-500" />
            Streak
          </div>
          <div className="text-2xl font-bold text-slate-900">{streak} Tage</div>
          <p className="text-xs text-slate-500">Jede kurze Session zahlt auf Ihre Routine ein.</p>
        </div>
      </div>
    </div>
  );
}
