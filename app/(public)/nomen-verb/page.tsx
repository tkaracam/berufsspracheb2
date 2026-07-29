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
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

export const metadata = {
  title: `Nomen-Verb-Verbindungen – ${APP_NAME}`,
};

const categoryStyles: Record<string, string> = {
  Allgemein: "bg-slate-100 text-slate-700",
  Kommunikation: "bg-emerald-100 text-emerald-700",
  Zeit: "bg-amber-100 text-amber-700",
  Umgang: "bg-emerald-100 text-emerald-700",
  Behörde: "bg-stone-100 text-stone-700",
  Konflikt: "bg-rose-100 text-rose-700",
  Bewerbung: "bg-teal-100 text-teal-700",
  Produktion: "bg-orange-100 text-orange-700",
  Bildung: "bg-sky-100 text-sky-700",
  Arbeitsrecht: "bg-rose-100 text-rose-700",
  Logistik: "bg-teal-100 text-teal-700",
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
    <div className="section-padding">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/20 p-6 shadow-lg shadow-slate-900/5 sm:p-10">
          <div className="relative z-10 max-w-3xl">
            <Badge variant="default" className="mb-4">
              Berufliche Wendungen sicher anwenden
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Nomen-Verb-Verbindungen
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Feste Verbindungen für Gespräche, E-Mails und Texte im
              Berufsalltag. Mit Synonymen, Beispielsätzen und Audio.
            </p>
            <Button asChild className="mt-6">
              <Link href="/trainer/nomen-verb">
                <Dumbbell className="mr-2 h-4 w-4" /> Interaktiv üben
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 max-w-5xl space-y-6">
          <form action="/nomen-verb" className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={q}
              placeholder="Nach Verbindung oder Synonym suchen..."
              className="h-12 pl-11 pr-10"
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

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={!kategorie ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              asChild
            >
              <Link href="/nomen-verb">Alle</Link>
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={kategorie === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full"
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((entry) => (
              <Card key={entry.id} className="group flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold leading-snug text-foreground">
                        {entry.phrase}
                      </h3>
                      {entry.kategorie && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "mt-2 rounded-full font-normal",
                            categoryStyles[entry.kategorie] ?? "bg-muted text-muted-foreground"
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
                      <span className="font-semibold text-foreground">Synonym:</span>{" "}
                      {entry.synonym}
                    </p>
                  )}
                  {entry.beispielsatz && (
                    <p className="text-sm italic text-muted-foreground">
                      „{entry.beispielsatz}"
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {data.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              Keine Verbindungen gefunden.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
