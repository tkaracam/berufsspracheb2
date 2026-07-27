"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type SRSRating,
  getSRSCard,
  previewReview,
  formatInterval,
} from "@/lib/spaced-repetition";
import { type SRSSettings } from "@/lib/srs-settings";

interface SRSRatingButtonsProps {
  itemId: string;
  onRate: (rating: SRSRating) => void;
  settings?: SRSSettings;
  labels?: {
    again: string;
    hard: string;
    good: string;
    easy: string;
  };
}

const DEFAULT_LABELS = {
  again: "Nochmal",
  hard: "Schwer",
  good: "Gut",
  easy: "Einfach",
};

export function SRSRatingButtons({
  itemId,
  onRate,
  settings,
  labels = DEFAULT_LABELS,
}: SRSRatingButtonsProps) {
  const card = typeof window !== "undefined" ? getSRSCard(itemId) : undefined;

  const options: {
    rating: SRSRating;
    label: string;
    shortcut: string;
    className: string;
  }[] = [
    {
      rating: 0,
      label: labels.again,
      shortcut: "1",
      className:
        "bg-anki-again text-white hover:bg-anki-again/90 border-anki-again",
    },
    {
      rating: 1,
      label: labels.hard,
      shortcut: "2",
      className:
        "bg-anki-hard text-white hover:bg-anki-hard/90 border-anki-hard",
    },
    {
      rating: 3,
      label: labels.good,
      shortcut: "3",
      className:
        "bg-anki-good text-white hover:bg-anki-good/90 border-anki-good",
    },
    {
      rating: 5,
      label: labels.easy,
      shortcut: "4",
      className:
        "bg-anki-easy text-white hover:bg-anki-easy/90 border-anki-easy",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map((opt) => {
        const preview = previewReview(card, opt.rating, settings);
        return (
          <Button
            key={opt.rating}
            onClick={() => onRate(opt.rating)}
            aria-keyshortcuts={opt.shortcut}
            className={cn(
              "min-h-12 flex-col gap-0.5 py-2",
              opt.className
            )}
          >
            <span className="flex items-center gap-1.5">
              {opt.label}
              <span className="text-xs tracking-widest opacity-80">
                {opt.shortcut}
              </span>
            </span>
            <span className="text-[10px] opacity-80 font-normal">
              {formatInterval(preview.interval)}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
