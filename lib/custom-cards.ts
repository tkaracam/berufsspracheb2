"use client";

export interface CustomCard {
  id: string;
  term: string;
  meaning: string;
  antonym: string;
  example: string;
  notes: string;
  field: string;
  category: string;
  createdAt: string;
}

const STORAGE_KEY = "bsk-custom-cards";

export function getCustomCards(): CustomCard[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as CustomCard[];
  } catch {
    return [];
  }
}

export function saveCustomCards(cards: CustomCard[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function addCustomCard(card: Omit<CustomCard, "id" | "createdAt">): CustomCard {
  const cards = getCustomCards();
  const newCard: CustomCard = {
    ...card,
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  cards.unshift(newCard);
  saveCustomCards(cards);
  return newCard;
}

export function deleteCustomCard(id: string) {
  const cards = getCustomCards().filter((c) => c.id !== id);
  saveCustomCards(cards);
}

export function updateCustomCard(id: string, patch: Partial<Omit<CustomCard, "id" | "createdAt">>) {
  const cards = getCustomCards().map((c) => (c.id === id ? { ...c, ...patch } : c));
  saveCustomCards(cards);
}
