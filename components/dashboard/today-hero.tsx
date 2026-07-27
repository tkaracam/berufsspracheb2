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
    <div className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-primary via-primary/90 to-amber-600 p-6 text-primary-foreground shadow-lg sm:p-8 dark:from-primary dark:via-primary/90 dark:to-amber-700">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,white/10,transparent_40%)]" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5" />
            Tagesübersicht
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dueCount > 0
              ? `${dueCount} Karten fällig`
              : "Alles erledigt für heute"}
          </h2>
          <p className="text-primary-foreground/80">
            {dueCount > 0
              ? "Starte jetzt deine Lernsession und bleib dran."
              : "Super! Komm morgen wieder, um deine Wiederholungen zu machen."}
          </p>
        </div>
        {dueCount > 0 && firstDeckId && (
          <Button size="lg" variant="secondary" className="gap-2 text-base shrink-0" asChild>
            <Link href={`/decks/${firstDeckId}/learn`}>
              <Play className="h-5 w-5" />
              Jetzt lernen
            </Link>
          </Button>
        )}
      </div>

      <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
              <Target className="h-4 w-4" />
              Tagesziel
            </div>
            <div className="text-2xl font-bold">
              {todayDone} / {dailyGoal}
            </div>
            <p className="text-xs text-primary-foreground/70">
              {Math.round(progress)} % erreicht
            </p>
          </div>
          <ProgressRing
            value={progress}
            size={72}
            strokeWidth={6}
            trackClassName="text-white/20"
            indicatorClassName="text-white"
            label={`${Math.round(progress)}%`}
          />
        </div>

        <div className="space-y-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
            <Flame className="h-4 w-4" />
            Streak
          </div>
          <div className="text-2xl font-bold">{streak} Tage</div>
        </div>
      </div>
    </div>
  );
}
