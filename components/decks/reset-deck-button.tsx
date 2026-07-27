"use client";

import { useTransition } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resetDeckProgress, type Deck } from "@/lib/decks";

interface Props {
  deck: Deck;
  onReset?: () => void;
}

export function ResetDeckButton({ deck, onReset }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    if (!confirm("Möchtest du den Fortschritt dieses Decks wirklich zurücksetzen?")) {
      return;
    }

    startTransition(() => {
      resetDeckProgress(deck);
      onReset?.();
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      onClick={handleReset}
      disabled={isPending}
    >
      <RotateCcw className="h-4 w-4" />
      {isPending ? "Wird zurückgesetzt …" : "Fortschritt zurücksetzen"}
    </Button>
  );
}
