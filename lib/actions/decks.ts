"use server";

import {
  getAllFachwoerter,
  getNomenVerbVerbindungen,
  getBerufsfelder,
} from "@/lib/queries";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";
import type { Deck, DeckType } from "@/lib/decks";

export interface DeckCard {
  id: string;
  front: string;
  back: string;
  audioPath?: string;
  extra?: string;
}

function normalizeDeckId(deckId: string) {
  let current = deckId;

  for (let i = 0; i < 3; i += 1) {
    const decoded = decodeURIComponent(current);
    if (decoded === current) {
      return decoded;
    }
    current = decoded;
  }

  return current;
}

export async function getDeckById(deckId: string): Promise<Deck | null> {
  const [woerter, nvResult, berufsfelder] = await Promise.all([
    getAllFachwoerter(),
    getNomenVerbVerbindungen(),
    getBerufsfelder(),
  ]);

  const nv = nvResult.data ?? [];
  const fieldMap = new Map(berufsfelder.map((b) => [b.id, b.title]));

  const fachwortGroups = new Map<string, string[]>();
  woerter.forEach((w) => {
    const title = `Fachwort: ${fieldMap.get(w.berufsfeld_id) ?? "Allgemein"}`;
    const list = fachwortGroups.get(title) ?? [];
    list.push(w.id);
    fachwortGroups.set(title, list);
  });

  const nvGroups = new Map<string, string[]>();
  nv.forEach((n) => {
    const title = n.kategorie ?? "Nomen-Verb";
    const list = nvGroups.get(title) ?? [];
    list.push(n.id);
    nvGroups.set(title, list);
  });

  const decks: Deck[] = [
    ...Array.from(fachwortGroups.entries()).map(([title, itemIds]) => ({
      id: title,
      title,
      type: "fachwort" as DeckType,
      itemIds,
    })),
    ...Array.from(nvGroups.entries()).map(([title, itemIds]) => ({
      id: title,
      title,
      type: "nomen_verb" as DeckType,
      itemIds,
    })),
    {
      id: "redemittel",
      title: "Redemittel",
      type: "redemittel" as DeckType,
      itemIds: redemittelQuestions.map((q) => q.id),
    },
    {
      id: "grammatik",
      title: "Grammatik",
      type: "grammatik" as DeckType,
      itemIds: grammarQuestions.map((q) => q.id),
    },
  ].filter((d) => d.itemIds.length > 0);

  const normalizedDeckId = normalizeDeckId(deckId);
  return decks.find((d) => d.id === normalizedDeckId) ?? null;
}

export async function getDeckCards(deck: Deck): Promise<DeckCard[]> {
  const [woerter, nvResult] = await Promise.all([
    getAllFachwoerter(),
    getNomenVerbVerbindungen(),
  ]);

  const nv = nvResult.data ?? [];
  const woerterMap = new Map(woerter.map((w) => [w.id, w]));
  const nvMap = new Map(nv.map((n) => [n.id, n]));

  return deck.itemIds
    .map((id) => {
      const fw = woerterMap.get(id);
      if (fw) {
        return {
          id: fw.id,
          front: `${fw.artikel} ${fw.begriff}`,
          back: fw.synonym ?? "",
          audioPath: fw.audio_path ?? undefined,
          extra: fw.beispielsatz ?? undefined,
        };
      }

      const n = nvMap.get(id);
      if (n) {
        return {
          id: n.id,
          front: n.phrase,
          back: n.synonym ?? "",
          audioPath: n.audio_path ?? undefined,
          extra: n.beispielsatz ?? undefined,
        };
      }

      const rm = redemittelQuestions.find((q) => q.id === id);
      if (rm) {
        return {
          id: rm.id,
          front: rm.question,
          back: rm.options[rm.correctIndex],
          extra: rm.explanation,
        };
      }

      const gr = grammarQuestions.find((q) => q.id === id);
      if (gr) {
        return {
          id: gr.id,
          front: gr.question,
          back: gr.options[gr.correctIndex],
          extra: gr.explanation,
        };
      }

      return null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);
}
