"use client";

import { getSRSCards, saveSRSCards, type SRSCard } from "./spaced-repetition";
import { type CustomCard } from "./custom-cards";
import { type Fachwort } from "./queries";
import { type NomenVerbVerbindung } from "./queries";
import { redemittelQuestions } from "./redemittel-quiz-data";
import { grammarQuestions } from "./grammar-data";

export type DeckType =
  | "fachwort"
  | "nomen_verb"
  | "redemittel"
  | "grammatik"
  | "custom";

export interface Deck {
  id: string;
  title: string;
  type: DeckType;
  itemIds: string[];
  icon?: string;
  description?: string;
}

export interface DeckStats {
  total: number;
  new: number;
  review: number;
  learned: number;
  hidden: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildFachwortDecks(
  woerter: Fachwort[],
  fieldMap: Map<string, string>
): Deck[] {
  const groups = new Map<string, string[]>();
  woerter.forEach((w) => {
    const fieldTitle = fieldMap.get(w.berufsfeld_id) ?? "Allgemein";
    const key = `Fachwort: ${fieldTitle}`;
    const list = groups.get(key) ?? [];
    list.push(w.id);
    groups.set(key, list);
  });

  return Array.from(groups.entries()).map(([title, itemIds]) => ({
    id: `fachwort-${slugify(title.replace("Fachwort: ", ""))}`,
    title,
    type: "fachwort" as DeckType,
    itemIds,
  }));
}

export function buildNomenVerbDecks(
  nv: NomenVerbVerbindung[]
): Deck[] {
  const groups = new Map<string, string[]>();
  nv.forEach((n) => {
    const key = n.kategorie ?? "Nomen-Verb";
    const list = groups.get(key) ?? [];
    list.push(n.id);
    groups.set(key, list);
  });

  return Array.from(groups.entries()).map(([title, itemIds]) => ({
    id: `nomen-verb-${slugify(title)}`,
    title,
    type: "nomen_verb" as DeckType,
    itemIds,
  }));
}

export function buildRedemittelDeck(): Deck {
  return {
    id: "redemittel",
    title: "Redemittel",
    type: "redemittel",
    itemIds: redemittelQuestions.map((q) => q.id),
  };
}

export function buildGrammatikDeck(): Deck {
  return {
    id: "grammatik",
    title: "Grammatik",
    type: "grammatik",
    itemIds: grammarQuestions.map((q) => q.id),
  };
}

export function buildCustomDecks(cards: CustomCard[]): Deck[] {
  const groups = new Map<string, string[]>();
  cards.forEach((c) => {
    const key = c.category || "Eigene Karte";
    const list = groups.get(key) ?? [];
    list.push(c.id);
    groups.set(key, list);
  });

  return Array.from(groups.entries()).map(([title, itemIds]) => ({
    id: `custom-${slugify(title)}`,
    title,
    type: "custom" as DeckType,
    itemIds,
  }));
}

export function buildDecks(
  woerter: Fachwort[],
  nv: NomenVerbVerbindung[],
  fieldMap: Map<string, string>,
  customCards?: CustomCard[]
): Deck[] {
  return [
    ...buildFachwortDecks(woerter, fieldMap),
    ...buildNomenVerbDecks(nv),
    buildRedemittelDeck(),
    buildGrammatikDeck(),
    ...(customCards ? buildCustomDecks(customCards) : []),
  ].filter((d) => d.itemIds.length > 0);
}

function isDue(card: SRSCard | undefined): boolean {
  if (!card) return true; // new card
  const today = new Date().toISOString().split("T")[0];
  return card.dueDate <= today;
}

function isHidden(card: SRSCard | undefined): boolean {
  if (!card) return false;
  const today = new Date().toISOString().split("T")[0];
  return (
    (!!card.suspendedUntil && card.suspendedUntil >= today) ||
    (!!card.buriedUntil && card.buriedUntil >= today)
  );
}

export function getDeckStats(deck: Deck): DeckStats {
  const srsCards = getSRSCards();
  let total = 0;
  let newCount = 0;
  let reviewCount = 0;
  let learned = 0;
  let hidden = 0;

  deck.itemIds.forEach((id) => {
    const card = srsCards[id];
    if (isHidden(card)) {
      hidden++;
      return;
    }
    total++;
    if (!card) {
      newCount++;
    } else {
      if (card.repetition > 0) learned++;
      if (isDue(card)) reviewCount++;
    }
  });

  return { total, new: newCount, review: reviewCount, learned, hidden };
}

export function getTotalDue(decks: Deck[]): number {
  return decks.reduce((sum, deck) => sum + getDeckStats(deck).review, 0);
}

const FLASHCARD_PROGRESS_KEY = "bsk-flashcard-progress";

function readFlashcardProgress(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(FLASHCARD_PROGRESS_KEY) || "[]") as string[]);
  } catch {
    return new Set();
  }
}

function saveFlashcardProgress(ids: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FLASHCARD_PROGRESS_KEY, JSON.stringify(Array.from(ids)));
}

export function resetDeckProgress(deck: Deck): void {
  if (typeof window === "undefined") return;

  // Remove SRS cards
  const srsCards = getSRSCards();
  deck.itemIds.forEach((id) => delete srsCards[id]);
  saveSRSCards(srsCards);

  // Remove flashcard known flag
  const known = readFlashcardProgress();
  deck.itemIds.forEach((id) => known.delete(id));
  saveFlashcardProgress(known);
}
