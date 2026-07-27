import Link from "next/link";
import { Dumbbell, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AudioPlayer } from "@/components/exercises/audio-player";
import { FavoriteButton } from "@/components/favorite-button";
import { APP_NAME } from "@/lib/constants";
import { getNomenVerbVerbindungen } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const metadata = {
  title: `Nomen-Verb-Verbindungen – ${APP_NAME}`,
};

const categoryColors: Record<string, string> = {
  Allgemein: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  Kommunikation: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Zeit: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Umgang: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Behörde: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Konflikt: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  Bewerbung: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  Produktion: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  Bildung: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  Arbeitsrecht: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  Logistik: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
};

export default async function NomenVerbPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategorie?: string }>;
}) {
  const { q, kategorie } = await searchParams;
  const { data: allData, count: allCount } = await getNomenVerbVerbindungen(q);

  const categories = Array.from(
    new Set(allData.map((d) => d.kategorie).filter(Boolean))
  ).sort() as string[];

  const data = kategorie
    ? allData.filter((d) => d.kategorie === kategorie)
    : allData;

  return (
    <div className="relative flex-1 overflow-hidden py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Nomen-Verb-Verbindungen
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Feste Verbindungen für berufliche Gespräche und Texte. Mit einfachen
          Synonymen und Beispielsätzen aus dem Berufsleben.
        </p>
        <Button asChild>
          <Link href="/trainer/nomen-verb">
            <Dumbbell className="mr-2 h-4 w-4" /> Interaktiv üben
          </Link>
        </Button>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Search */}
        <form action="/nomen-verb" className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={q}
            placeholder="Nach Verbindung oder Synonym suchen..."
            className="pl-10 pr-10"
          />
          {q && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              asChild
            >
              <Link href="/nomen-verb">
                <X className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </form>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={!kategorie ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link href="/nomen-verb">Alle</Link>
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={kategorie === cat ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={`/nomen-verb?kategorie=${encodeURIComponent(cat)}`}>
                {cat}
              </Link>
            </Button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {data.length} von {allCount} Verbindungen
          {kategorie && ` in „${kategorie}“`}
        </p>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((entry) => (
            <Card key={entry.id} className="group flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold leading-snug">
                      {entry.phrase}
                    </h3>
                    {entry.kategorie && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "mt-2 font-normal",
                          categoryColors[entry.kategorie]
                        )}
                      >
                        {entry.kategorie}
                      </Badge>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <AudioPlayer
                      path={entry.audio_path}
                      text={entry.phrase}
                      variant="icon"
                    />
                    <FavoriteButton
                      itemType="nomen_verb"
                      itemId={entry.id}
                      title={entry.phrase}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                {entry.synonym && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Synonym:</span>{" "}
                    {entry.synonym}
                  </p>
                )}
                {entry.beispielsatz && (
                  <p className="text-sm italic text-muted-foreground">
                    „{entry.beispielsatz}“
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {data.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Keine Verbindungen gefunden.
          </p>
        )}
      </div>
      </div>
    </div>
  );
}
