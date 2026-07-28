import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Users, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/exercises/audio-player";
import { FavoriteButton } from "@/components/favorite-button";
import { APP_NAME } from "@/lib/constants";
import {
  getBerufsfeldById,
  getBerufeByFeld,
  getFachwoerterByFeld,
} from "@/lib/queries";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const difficultyColors: Record<string, string> = {
  leicht: "bg-green-100 text-green-700",
  mittel: "bg-amber-100 text-amber-700",
  schwer: "bg-red-100 text-red-700",
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const feld = await getBerufsfeldById(slug);

  return {
    title: `${feld?.title ?? "Berufsfeld"} – ${APP_NAME}`,
  };
}

export default async function BerufsfeldDetailPage({ params }: Props) {
  const { slug } = await params;
  const feld = await getBerufsfeldById(slug);

  if (!feld) return notFound();

  const berufe = await getBerufeByFeld(slug);
  const fachwoerter = await getFachwoerterByFeld(slug);

  return (
    <div className="container mx-auto flex-1 px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6 rounded-xl">
        <Link href="/berufsfelder">
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>
      </Button>

      <div className="mb-10 max-w-5xl">
        <div className="rounded-[2rem] border border-sky-100 bg-[linear-gradient(135deg,#ffffff_0%,#f4faff_55%,#eef8ff_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(59,130,246,0.24)] md:p-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-sky-100 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              Berufsfeld
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{feld.title}</h1>
            <p className="mt-4 text-lg leading-7 text-slate-600">{feld.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Typische Berufe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {berufe.map((beruf) => (
                  <Badge
                    key={beruf.id}
                    variant="secondary"
                    className="px-3 py-1 text-sm font-normal"
                  >
                    {beruf.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border border-sky-100 bg-white/88 shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Fachwortschatz
              </CardTitle>
              <CardDescription>
                {fachwoerter.length} Begriffe mit Artikel, Synonym und
                Beispielsatz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {fachwoerter.map((wort) => (
                  <div
                    key={wort.id}
                    className="group relative flex flex-col gap-2 rounded-[1.4rem] border border-sky-100 bg-white p-4 transition-colors hover:border-sky-200 hover:bg-sky-50/30"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-lg font-semibold">
                          {wort.artikel} {wort.begriff}
                        </p>
                        {wort.synonym && (
                          <p className="text-sm text-muted-foreground">
                            {wort.synonym}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                        <AudioPlayer
                          path={wort.audio_path}
                          text={`${wort.artikel} ${wort.begriff}`}
                          variant="icon"
                        />
                        <FavoriteButton
                          itemType="fachwort"
                          itemId={wort.id}
                          title={`${wort.artikel} ${wort.begriff}`}
                        />
                      </div>
                    </div>

                    {wort.beispielsatz && (
                      <p className="text-sm italic text-muted-foreground">
                        „{wort.beispielsatz}“
                      </p>
                    )}

                    <Badge
                      variant="secondary"
                      className={cn(
                        "w-fit text-xs font-normal",
                        difficultyColors[wort.schwierigkeit]
                      )}
                    >
                      {wort.schwierigkeit}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[1.8rem] border border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f4faff_100%)] shadow-[0_20px_50px_-34px_rgba(59,130,246,0.2)]">
            <CardHeader>
              <CardTitle>Jetzt üben</CardTitle>
              <CardDescription>
                Gezielt Fachwörter aus diesem Berufsfeld lernen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full rounded-2xl bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/register">Kostenlos registrieren</Link>
              </Button>
              <Button variant="outline" className="w-full rounded-2xl border-sky-100 bg-white text-slate-700 hover:bg-white" asChild>
                <Link href="/trainer/fachwortschatz">
                  <Dumbbell className="mr-2 h-4 w-4" /> Fachwortschatz üben
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
