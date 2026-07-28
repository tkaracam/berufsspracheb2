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
      <Card className="rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
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
    <Card className="rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {favorites.length === 0 ? (
          <div className="space-y-2 rounded-[1.4rem] border border-sky-100 bg-slate-50/80 p-4 text-center">
            <BookmarkX className="mx-auto h-8 w-8 text-slate-400" />
            <p className="text-sm text-slate-500">Noch keine Favoriten vorhanden.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {favorites.slice(0, 5).map((fav) => (
              <li
                key={`${fav.type}-${fav.id}`}
                className="flex items-center justify-between rounded-[1.4rem] border border-sky-100 bg-white px-4 py-3 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.24)]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Heart className="h-4 w-4 text-red-500 fill-red-500 shrink-0" />
                  <span className="truncate text-slate-900">{fav.title}</span>
                </div>
                <Badge variant="secondary" className="shrink-0 rounded-full bg-sky-50 text-sky-700">
                  {TYPE_LABELS[fav.type] ?? fav.type}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <Button className="w-full rounded-2xl border-sky-100 bg-white text-slate-700 hover:bg-white" variant="outline" asChild>
          <Link href="/favoriten">
            {t.dashboard.viewFavorites} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
