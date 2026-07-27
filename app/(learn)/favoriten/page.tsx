"use client";

import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { Heart, Trash2, BookmarkX } from "lucide-react";
import { SkeletonList } from "@/components/ui/content-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMounted } from "@/lib/hooks/use-mounted";
import { isMockMode } from "@/lib/is-mock-mode";
import {
  getDemoFavorites,
  saveDemoFavorites,
  type DemoFavorite,
} from "@/lib/demo-storage";
import {
  getFavorites,
  removeFavorite,
  type FavoriteItem,
  type FavoriteItemType,
} from "@/lib/actions/favorites";

const TYPE_LABELS: Record<string, string> = {
  fachwort: "Fachwort",
  nomen_verb: "Nomen-Verb-Verbindung",
};

export default function FavoritenPage() {
  const mounted = useMounted();
  const [isPending, startTransition] = useTransition();
  const [demoFavorites, setDemoFavorites] = useState<DemoFavorite[]>(() =>
    typeof window === "undefined" ? [] : getDemoFavorites()
  );
  const [authFavorites, setAuthFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (isMockMode()) return;
    startTransition(async () => {
      setAuthFavorites(await getFavorites());
    });
  }, []);

  const mock = isMockMode();
  const favorites = mock ? demoFavorites : authFavorites;

  const remove = (itemType: string, itemId: string) => {
    if (mock) {
      const next = demoFavorites.filter(
        (f) => !(f.itemType === itemType && f.itemId === itemId)
      );
      setDemoFavorites(next);
      saveDemoFavorites(next);
      return;
    }

    startTransition(async () => {
      await removeFavorite(itemType as FavoriteItemType, itemId);
      setAuthFavorites(await getFavorites());
    });
  };

  if (!mounted) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Meine Favoriten</h1>
        <SkeletonList rows={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meine Favoriten</h1>
        <p className="text-muted-foreground">
          Ihre gespeicherten Fachbegriffe und Nomen-Verb-Verbindungen.
        </p>
      </div>

      <div className="grid gap-4">
        {favorites.map((fav) => {
          const type = mock
            ? (fav as DemoFavorite).itemType
            : (fav as FavoriteItem).type;
          const id = mock
            ? (fav as DemoFavorite).itemId
            : (fav as FavoriteItem).id;
          const title = fav.title;

          return (
            <Card key={`${type}-${id}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  {title}
                  <Badge variant="secondary">
                    {TYPE_LABELS[type] ?? type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => remove(type, id)}
                  disabled={isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Entfernen
                </Button>
              </CardContent>
            </Card>
          );
        })}
        {favorites.length === 0 && (
          <Card className="text-center py-12 border-t-4 border-t-slate-300">
            <CardContent className="space-y-4">
              <BookmarkX className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <h2 className="text-xl font-bold">Noch keine Favoriten</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Speichern Sie Fachwörter und Nomen-Verb-Verbindungen, um sie hier schnell wiederzufinden.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/trainer/fachwortschatz">Fachwortschatz entdecken</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
