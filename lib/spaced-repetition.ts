import { type SRSSettings, getSRSSettings } from "./srs-settings";

export type SRSRating = 0 | 1 | 3 | 5;

export interface SRSItem {
  id: string;
  type: string;
  front: string;
  back: string;
  audioPath?: string;
  extra?: string;
  category?: string;
}

export interface SRSCard {
  itemId: string;
  interval: number; // Tage
  repetition: number;
  ease: number;
  dueDate: string; // ISO-Datum
  lastReviewed?: string;
  suspendedUntil?: string;
  buriedUntil?: string;
}

const STORAGE_KEY = "bsk-spaced-repetition";

function nowDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function getSRSCards(): Record<string, SRSCard> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Record<string, SRSCard>;
  } catch {
    return {};
  }
}

export function saveSRSCards(cards: Record<string, SRSCard>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function getSRSCard(itemId: string): SRSCard | undefined {
  return getSRSCards()[itemId];
}

function isHidden(card: SRSCard | undefined): boolean {
  if (!card) return false;
  const today = nowDate();
  return (
    (!!card.suspendedUntil && card.suspendedUntil >= today) ||
    (!!card.buriedUntil && card.buriedUntil >= today)
  );
}

export function getDueItems(items: SRSItem[], settings?: SRSSettings): SRSItem[] {
  const s = settings ?? getSRSSettings();
  const today = nowDate();
  const cards = getSRSCards();

  let newCount = 0;
  let reviewCount = 0;

  return items.filter((item) => {
    const card = cards[item.id];
    if (isHidden(card)) return false;
    const isDue = !card || card.dueDate <= today;
    if (!isDue) return false;

    if (!card) {
      if (newCount >= s.newCardsPerDay) return false;
      newCount++;
      return true;
    }

    if (reviewCount >= s.reviewLimit) return false;
    reviewCount++;
    return true;
  });
}

export function getSRSStats(items: SRSItem[]) {
  const today = nowDate();
  const cards = getSRSCards();
  let due = 0;
  let newCards = 0;
  let learned = 0;
  let hidden = 0;
  items.forEach((item) => {
    const card = cards[item.id];
    if (isHidden(card)) {
      hidden++;
      return;
    }
    if (!card) {
      newCards++;
      due++;
    } else if (card.dueDate <= today) {
      due++;
      if (card.repetition > 0) learned++;
    } else if (card.repetition > 0) {
      learned++;
    }
  });
  return { due, newCards, learned, total: items.length, hidden };
}

export function previewReview(
  card: SRSCard | undefined,
  rating: SRSRating,
  settings?: SRSSettings
): SRSCard {
  const s = settings ?? getSRSSettings();
  const base = card ?? {
    itemId: "preview",
    interval: 0,
    repetition: 0,
    ease: s.startingEase,
    dueDate: nowDate(),
  };

  let { interval, repetition, ease } = base;

  if (rating < 3) {
    repetition = 0;
    interval = 1;
  } else {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
    repetition += 1;

    ease = ease + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    if (ease < 1.3) ease = 1.3;

    if (rating === 5) {
      interval = Math.round(interval * s.easyBonus);
    }
  }

  if (interval > s.maxInterval) interval = s.maxInterval;

  return {
    ...base,
    interval,
    repetition,
    ease: Math.round(ease * 10) / 10,
    dueDate: addDays(nowDate(), interval),
    lastReviewed: new Date().toISOString(),
  };
}

export function reviewItem(itemId: string, rating: SRSRating, settings?: SRSSettings) {
  const cards = getSRSCards();
  const card = cards[itemId];
  const next = previewReview(card, rating, settings);
  cards[itemId] = { ...next, itemId };
  saveSRSCards(cards);
}

export function formatInterval(days: number): string {
  if (days < 1) return "<1d";
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}y`;
}

export function formatDueDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function suspendItem(itemId: string, days: number) {
  const cards = getSRSCards();
  const card = cards[itemId] ?? {
    itemId,
    interval: 0,
    repetition: 0,
    ease: getSRSSettings().startingEase,
    dueDate: nowDate(),
  };
  card.suspendedUntil = addDays(nowDate(), days);
  cards[itemId] = card;
  saveSRSCards(cards);
}

export function buryItem(itemId: string) {
  const cards = getSRSCards();
  const card = cards[itemId] ?? {
    itemId,
    interval: 0,
    repetition: 0,
    ease: getSRSSettings().startingEase,
    dueDate: nowDate(),
  };
  card.buriedUntil = addDays(nowDate(), 1);
  cards[itemId] = card;
  saveSRSCards(cards);
}

export function unsuspendItem(itemId: string) {
  const cards = getSRSCards();
  const card = cards[itemId];
  if (!card) return;
  delete card.suspendedUntil;
  delete card.buriedUntil;
  cards[itemId] = card;
  saveSRSCards(cards);
}

export function resetSRS() {
  saveSRSCards({});
}
