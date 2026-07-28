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
  Allgemein: "bg-[#f4efe8] text-[#6f7e80]",
  Kommunikation: "bg-[#eef6ef] text-[#5a8d7d]",
  Zeit: "bg-[#fbf0de] text-[#c49a63]",
  Umgang: "bg-[#eef6ef] text-[#5a8d7d]",
  Behörde: "bg-[#f5efe6] text-[#8b7964]",
  Konflikt: "bg-[#fbe8e3] text-[#c96f63]",
  Bewerbung: "bg-[#edf5f1] text-[#4f8c86]",
  Produktion: "bg-[#f8eddc] text-[#c38b58]",
  Bildung: "bg-[#edf1f5] text-[#6f8098]",
  Arbeitsrecht: "bg-[#fbe8e3] text-[#c96f63]",
  Logistik: "bg-[#edf5f1] text-[#4f8c86]",
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
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(237,246,239,0.82),_transparent_58%)]" />
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#f5e7d6]/50 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#eef6ef]/60 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
      <div className="mx-auto mb-12 max-w-5xl">
        <div className="rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff5eb_55%,#f4fbf6_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(115,190,178,0.16)] md:p-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[#eadfce] bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              Berufliche Wendungen sicher anwenden
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Nomen-Verb-Verbindungen
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-600">
              Feste Verbindungen für Gespräche, E-Mails und Texte im
              Berufsalltag. Mit Synonymen, Beispielsätzen und Audio.
            </p>
            <Button asChild className="mt-6 rounded-2xl bg-[#73beb2] hover:bg-[#64aea3]">
              <Link href="/trainer/nomen-verb">
                <Dumbbell className="mr-2 h-4 w-4" /> Interaktiv üben
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        <form action="/nomen-verb" className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            name="q"
            defaultValue={q}
            placeholder="Nach Verbindung oder Synonym suchen..."
            className="h-12 rounded-2xl border-[#eadfce] bg-white/88 pl-11 pr-10 shadow-[0_18px_40px_-28px_rgba(32,50,58,0.16)]"
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
            className={!kategorie ? "rounded-full bg-[#73beb2] hover:bg-[#64aea3]" : "rounded-full border-[#eadfce] bg-white"}
            asChild
          >
            <Link href="/nomen-verb">Alle</Link>
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={kategorie === cat ? "default" : "outline"}
              size="sm"
              className={kategorie === cat ? "rounded-full bg-[#73beb2] hover:bg-[#64aea3]" : "rounded-full border-[#eadfce] bg-white"}
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
            <Card key={entry.id} className="group flex flex-col rounded-[1.6rem] border border-[#eadfce] bg-white/88 shadow-[0_18px_40px_-30px_rgba(115,190,178,0.14)]">
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
                          "mt-2 rounded-full font-normal",
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
          <p className="py-12 text-center text-slate-500">
            Keine Verbindungen gefunden.
          </p>
        )}
      </div>
      </div>
    </div>
  );
}
