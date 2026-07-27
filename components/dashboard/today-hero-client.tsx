"use client";

import { useMemo } from "react";
import { TodayHero } from "./today-hero";
import { useMounted } from "@/lib/hooks/use-mounted";
import { getTodayReviewCount } from "@/lib/progress";
import { getCurrentStreak } from "@/lib/study-activity";

interface Props {
  dueCount: number;
  dailyGoal: number;
  initialTodayDone?: number;
  initialStreak?: number;
  firstDeckId?: string;
}

export function TodayHeroClient({
  dueCount,
  dailyGoal,
  initialTodayDone = 0,
  initialStreak = 0,
  firstDeckId,
}: Props) {
  const mounted = useMounted();

  // Während SSR/Hydration werden die serverseitigen Initialwerte verwendet,
  // damit Server und Client identisch rendern. Erst nach der Hydration
  // werden die Werte aus dem lokalen Speicher gelesen.
  const todayDone = useMemo(() => {
    if (!mounted) return initialTodayDone;
    return getTodayReviewCount();
  }, [mounted, initialTodayDone]);

  const streak = useMemo(() => {
    if (!mounted) return initialStreak;
    return getCurrentStreak();
  }, [mounted, initialStreak]);

  return (
    <TodayHero
      dueCount={dueCount}
      dailyGoal={dailyGoal}
      todayDone={todayDone}
      streak={streak}
      firstDeckId={firstDeckId}
    />
  );
}
