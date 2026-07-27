"use client";

import { getDemoProgress } from "./demo-storage";
import { getSRSCards } from "./spaced-repetition";
import { calculateStreak } from "./streak";

export interface DayActivity {
  date: string; // YYYY-MM-DD
  count: number;
}

function toDateKey(iso: string): string {
  return iso.split("T")[0];
}

export function getStudyActivityDays(): Set<string> {
  const days = new Set<string>();

  // From demo progress (all trainers)
  const progress = getDemoProgress();
  progress.forEach((p) => days.add(toDateKey(p.practicedAt)));

  // From spaced repetition reviews
  const srsCards = getSRSCards();
  Object.values(srsCards).forEach((card) => {
    if (card.lastReviewed) {
      days.add(toDateKey(card.lastReviewed));
    }
  });

  return days;
}

export function getActivityCounts(): Record<string, number> {
  const counts: Record<string, number> = {};

  const progress = getDemoProgress();
  progress.forEach((p) => {
    const day = toDateKey(p.practicedAt);
    counts[day] = (counts[day] ?? 0) + 1;
  });

  const srsCards = getSRSCards();
  Object.values(srsCards).forEach((card) => {
    if (card.lastReviewed) {
      const day = toDateKey(card.lastReviewed);
      counts[day] = (counts[day] ?? 0) + 1;
    }
  });

  return counts;
}

export function getCurrentStreak(): number {
  return calculateStreak(getStudyActivityDays());
}

export function getLongestStreak(): number {
  const days = Array.from(getStudyActivityDays()).sort();
  if (days.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);
    prev.setDate(prev.getDate() + 1);
    if (prev.toISOString().split("T")[0] === curr.toISOString().split("T")[0]) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export function getHeatmapData(days: number): DayActivity[] {
  const counts = getActivityCounts();
  const result: DayActivity[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    result.push({ date: key, count: counts[key] ?? 0 });
  }

  return result;
}
