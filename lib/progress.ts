"use client";

import { reviewItem, type SRSRating } from "./spaced-repetition";
import { addDemoProgress, getDemoProgress, type DemoProgress } from "./demo-storage";

const DAILY_GOAL_KEY = "bsk-daily-goal";
const DEFAULT_DAILY_GOAL = 20;

export function getDailyGoal(): number {
  if (typeof window === "undefined") return DEFAULT_DAILY_GOAL;
  const raw = localStorage.getItem(DAILY_GOAL_KEY);
  if (!raw) return DEFAULT_DAILY_GOAL;
  const n = Number.parseInt(raw, 10);
  return Number.isNaN(n) ? DEFAULT_DAILY_GOAL : n;
}

export function setDailyGoal(goal: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DAILY_GOAL_KEY, String(goal));
}

export type ReviewableItemType = DemoProgress["itemType"] | "uebung";

export function recordReview(
  itemType: ReviewableItemType,
  itemId: string,
  rating: SRSRating
) {
  // SRS scheduling
  reviewItem(itemId, rating);

  // Demo progress for daily goal / streak
  addDemoProgress({
    itemType: itemType as DemoProgress["itemType"],
    itemId,
    score: rating >= 3 ? 100 : 0,
    practicedAt: new Date().toISOString(),
  });
}

export function getTodayReviewCount(): number {
  if (typeof window === "undefined") return 0;
  const today = new Date();
  return getDemoProgress().filter((p: DemoProgress) => {
    const practiced = new Date(p.practicedAt);
    return (
      practiced.getDate() === today.getDate() &&
      practiced.getMonth() === today.getMonth() &&
      practiced.getFullYear() === today.getFullYear()
    );
  }).length;
}

export function getCompletedCount(): number {
  if (typeof window === "undefined") return 0;
  return getDemoProgress().filter((p) => p.score >= 80).length;
}
