"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorite, type FavoriteItemType } from "@/lib/hooks/use-favorite";

interface Props {
  itemType: FavoriteItemType;
  itemId: string;
  title: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "outline" | "ghost" | "secondary";
  initialFavorited?: boolean;
}

export function FavoriteButton({
  itemType,
  itemId,
  title,
  size = "icon",
  variant = "ghost",
  initialFavorited = false,
}: Props) {
  const { favorited, toggle, isPending } = useFavorite(
    itemType,
    itemId,
    initialFavorited
  );

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => toggle(title)}
      disabled={isPending}
      aria-label={favorited ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
      title={favorited ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          favorited ? "fill-red-500 text-red-500" : "text-muted-foreground"
        }`}
      />
    </Button>
  );
}
