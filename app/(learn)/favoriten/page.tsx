"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import {
  ArrowRight,
  BookmarkX,
  Heart,
  Sparkles,
  Trash2,
} from "lucide-react";
import { SkeletonList } from "@/components/ui/content-skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
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
        (favorite) => !(favorite.itemType === itemType && favorite.itemId === itemId)
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
      <Container size="large">
        <SkeletonList rows={4} />
      </Container>
    );
  }

  return (
    <Container size="large">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#e7ddcf] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_52%,rgba(238,248,245,0.98)_100%)] p-6 shadow-[0_30px_90px_-52px_rgba(83,70,54,0.28)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,190,178,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(225,193,145,0.16),transparent_30%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ebe4] bg-white/78 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f4f55]">
                <Heart className="h-3.5 w-3.5 fill-[#0f4f55] text-[#0f4f55]" />
                Persönliche Merkliste
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Gespeicherte Inhalte
                <span className="mt-2 block text-[#0f4f55]">schnell wiederfinden und gezielt vertiefen.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Hier liegen Ihre gemerkten Fachwörter und Nomen-Verb-Verbindungen für
                spätere Wiederholung, schnelles Nachsehen und ruhiges Vertiefen.
              </p>
            </div>

            <div className="grid gap-3">
              <StatsCard label="Favoriten gesamt" value={String(favorites.length)} />
              <StatsCard
                label="Fachwörter"
                value={String(favorites.filter((favorite) => (mock ? (favorite as DemoFavorite).itemType : (favorite as FavoriteItem).type) === "fachwort").length)}
              />
              <StatsCard
                label="Nomen-Verb"
                value={String(favorites.filter((favorite) => (mock ? (favorite as DemoFavorite).itemType : (favorite as FavoriteItem).type) === "nomen_verb").length)}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {favorites.map((favorite) => {
            const type = mock
              ? (favorite as DemoFavorite).itemType
              : (favorite as FavoriteItem).type;
            const id = mock
              ? (favorite as DemoFavorite).itemId
              : (favorite as FavoriteItem).id;
            const title = favorite.title;

            return (
              <Card
                key={`${type}-${id}`}
                className="rounded-[1.6rem] border-[#eadfce] bg-white/88 shadow-[0_20px_56px_-42px_rgba(60,44,26,0.18)]"
              >
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      <p className="text-base font-semibold text-slate-950">{title}</p>
                      <Badge variant="secondary" className="rounded-full">
                        {TYPE_LABELS[type] ?? type}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Gespeichert für spätere Wiederholung und schnellen Zugriff.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" className="rounded-full border-[#d9ccbc]">
                      <Link href={type === "fachwort" ? "/trainer/fachwortschatz" : "/trainer/nomen-verb"}>
                        Öffnen
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => remove(type, id)}
                      disabled={isPending}
                      className="rounded-full border-[#efd9d7] text-[#a14f46] hover:bg-[#fff4f3]"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Entfernen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {favorites.length === 0 ? (
            <Card className="rounded-[1.8rem] border-[#eadfce] bg-white/90 py-12 text-center shadow-[0_24px_70px_-52px_rgba(60,44,26,0.18)]">
              <CardContent className="space-y-4">
                <BookmarkX className="mx-auto h-12 w-12 text-slate-400" />
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">
                    Noch keine Favoriten gespeichert
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Markieren Sie wichtige Fachwörter oder Nomen-Verb-Verbindungen,
                    damit Sie sie hier gesammelt und schneller wiederfinden.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button asChild className="rounded-full bg-[#0f4f55] px-6 hover:bg-[#0c4348]">
                    <Link href="/trainer/fachwortschatz">
                      Inhalte entdecken
                      <Sparkles className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </section>
      </div>
    </Container>
  );
}

function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-[#e3efe9] bg-white/82 p-4 shadow-[0_18px_40px_-34px_rgba(15,79,85,0.24)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f4f55]">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{value}</p>
    </div>
  );
}
