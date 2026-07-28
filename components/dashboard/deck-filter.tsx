"use client";

import { cn } from "@/lib/utils";
import type { Deck, DeckType } from "@/lib/decks";
import type { DeckStats } from "@/lib/decks";

type FilterKey = DeckType | "all" | "due";

interface DeckFilterProps {
  decks: Deck[];
  stats: Record<string, DeckStats>;
  value: FilterKey;
  onChange: (value: FilterKey) => void;
}

const options: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Alle" },
  { key: "fachwort", label: "Fachwörter" },
  { key: "nomen_verb", label: "Nomen-Verb" },
  { key: "redemittel", label: "Redemittel" },
  { key: "grammatik", label: "Grammatik" },
  { key: "custom", label: "Eigene" },
  { key: "due", label: "Fällig" },
];

export function DeckFilter({ decks, stats, value, onChange }: DeckFilterProps) {
  const counts = useFilterCounts(decks, stats);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
            value === opt.key
              ? "border-sky-500 bg-sky-500 text-white shadow-[0_14px_30px_-20px_rgba(59,130,246,0.75)]"
              : "border-sky-100 bg-white/85 text-slate-600 hover:bg-white"
          )}
        >
          {opt.label}
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-xs",
              value === opt.key ? "bg-white/20" : "bg-sky-50 text-slate-500"
            )}
          >
            {counts[opt.key]}
          </span>
        </button>
      ))}
    </div>
  );
}

function useFilterCounts(decks: Deck[], stats: Record<string, DeckStats>): Record<FilterKey, number> {
  const counts: Record<FilterKey, number> = {
    all: decks.length,
    fachwort: 0,
    nomen_verb: 0,
    redemittel: 0,
    grammatik: 0,
    custom: 0,
    due: 0,
  };

  decks.forEach((deck) => {
    const s = stats[deck.id];
    if (deck.type === "fachwort") counts.fachwort++;
    if (deck.type === "nomen_verb") counts.nomen_verb++;
    if (deck.type === "redemittel") counts.redemittel++;
    if (deck.type === "grammatik") counts.grammatik++;
    if (deck.type === "custom") counts.custom++;
    if (s && s.review > 0) counts.due++;
  });

  return counts;
}
