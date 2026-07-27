"use client";

import Link from "next/link";
import { Heart, ArrowRight, BookmarkX } from "lucide-react";
import { SkeletonList } from "@/components/ui/content-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMounted } from "@/lib/hooks/use-mounted";
import { getDemoFavorites, type DemoFavorite } from "@/lib/demo-storage";
import { useTranslation } from "@/components/layout/language-provider";
import { useMemo } from "react";

const TYPE_LABELS: Record<string, string> = {
  fachwort: "Fachwort",
  nomen_verb: "Nomen-Verb-Verbindung",
};

export interface FavoriteItem {
  id: string;
  type: "fachwort" | "nomen_verb";
  title: string;
  href?: string;
}

interface FavoriteListProps {
  favorites?: FavoriteItem[];
  title?: string;
}

export function FavoriteList({ favorites: serverFavorites, title }: FavoriteListProps) {
  const t = useTranslation();
  const mounted = useMounted();

  const demoFavorites: DemoFavorite[] = useMemo(() => {
    if (!mounted) return [];
    return getDemoFavorites();
  }, [mounted]);

  const favorites = serverFavorites ??
    demoFavorites.map((f) => ({
      id: f.itemId,
      type: f.itemType,
      title: f.title,
    }));

  const displayTitle = title ?? t.dashboard.viewFavorites;

  if (!mounted && !serverFavorites) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            {displayTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <SkeletonList rows={3} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {favorites.length === 0 ? (
          <div className="rounded-lg border bg-muted/30 p-4 text-center space-y-2">
            <BookmarkX className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Noch keine Favoriten vorhanden.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {favorites.slice(0, 5).map((fav) => (
              <li
                key={`${fav.type}-${fav.id}`}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Heart className="h-4 w-4 text-red-500 fill-red-500 shrink-0" />
                  <span className="truncate">{fav.title}</span>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {TYPE_LABELS[fav.type] ?? fav.type}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <Button className="w-full" variant="outline" asChild>
          <Link href="/favoriten">
            {t.dashboard.viewFavorites} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
