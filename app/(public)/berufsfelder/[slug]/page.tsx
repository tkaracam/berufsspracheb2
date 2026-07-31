import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Users, Dumbbell, PenTool, Mic, RotateCcw, Target } from "lucide-react";
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
import {
  BERUFSFELD_VISUALS,
  DEFAULT_BERUFSFELD_VISUAL,
  getBerufVisual,
} from "@/lib/berufsfeld-visuals";
import { APP_NAME } from "@/lib/constants";
import {
  getBerufsfeldById,
  getBerufeByFeld,
  getFachwoerterByFeld,
} from "@/lib/queries";
import { getBerufsfeldPracticeContent } from "@/lib/berufsfeld-practice-content";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const difficultyColors: Record<string, string> = {
  leicht: "bg-[#eef6ef] text-[#5a8d7d]",
  mittel: "bg-[#fbf0de] text-[#c49a63]",
  schwer: "bg-[#fbe8e3] text-[#c96f63]",
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
  const visual = BERUFSFELD_VISUALS[slug] ?? DEFAULT_BERUFSFELD_VISUAL;
  const practiceContent = getBerufsfeldPracticeContent(
    slug,
    feld.title,
    feld.description ?? ""
  );

  return (
    <div className="container mx-auto flex-1 px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6 rounded-xl">
        <Link href="/berufsfelder">
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>
      </Button>

      <div className="mb-10 max-w-5xl">
        <div className="rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff5eb_55%,#f4fbf6_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(115,190,178,0.16)] md:p-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[#eadfce] bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              Berufsfeld
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">{feld.title}</h1>
            <p className="mt-4 text-lg leading-7 text-slate-600">{feld.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[1.8rem] border border-[#eadfce] bg-white/88 shadow-[0_20px_50px_-34px_rgba(115,190,178,0.14)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Typische Berufe
              </CardTitle>
              <CardDescription>
                Alle Berufe aus diesem Bereich mit einer passenden visuellen
                Einordnung.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {berufe.map((beruf) => (
                  (() => {
                    const berufVisual = getBerufVisual(slug, beruf.title);
                    return (
                      <article
                        key={beruf.id}
                        className="group overflow-hidden rounded-[1.6rem] border border-[#eadfce] bg-white shadow-[0_18px_42px_-32px_rgba(115,190,178,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d6c4ac] hover:shadow-[0_28px_58px_-34px_rgba(115,190,178,0.24)]"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f2ea]">
                          <Image
                            src={berufVisual.image}
                            alt={beruf.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/5 to-transparent" />
                          <div className="absolute left-3 top-3">
                            <span className="rounded-full border border-white/70 bg-white/88 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur">
                              {berufVisual.eyebrow}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 p-4">
                          <h3 className="text-base font-semibold leading-snug text-slate-900">
                            {beruf.title}
                          </h3>
                          <p className="text-sm leading-6 text-slate-600">
                            Sprachpraxis und Fachwortschatz im Bereich {feld.title}.
                          </p>
                        </div>
                      </article>
                    );
                  })()
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border border-[#eadfce] bg-white/88 shadow-[0_20px_50px_-34px_rgba(115,190,178,0.14)]">
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
                    className="group relative flex flex-col gap-2 rounded-[1.4rem] border border-[#eadfce] bg-white p-4 transition-colors hover:border-[#d9c9b3] hover:bg-[#fffaf4]"
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

          <Card className="rounded-[1.8rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffefb_0%,#f7fcf9_100%)] shadow-[0_20px_50px_-34px_rgba(115,190,178,0.14)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                B2-Praxis für dieses Berufsfeld
              </CardTitle>
              <CardDescription>{practiceContent.intro}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 xl:grid-cols-3">
                {practiceContent.tasks.map((task) => {
                  const Icon =
                    task.mode === "Schreiben"
                      ? PenTool
                      : task.mode === "Sprechen"
                        ? Mic
                        : Target;
                  return (
                    <article
                      key={task.title}
                      className="rounded-[1.4rem] border border-[#eadfce] bg-white/90 p-5 shadow-[0_16px_34px_-30px_rgba(115,190,178,0.18)]"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef6ef] text-[#5a8d7d]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-500">{task.mode}</p>
                          <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-slate-700">{task.prompt}</p>
                      <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-[#5a8d7d]">
                        {task.output}
                      </p>
                    </article>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[1.8rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdf9_0%,#fff5eb_100%)] shadow-[0_20px_50px_-34px_rgba(115,190,178,0.14)]">
            <CardHeader>
              <CardTitle>Jetzt üben</CardTitle>
              <CardDescription>
                Gezielt Fachwörter aus diesem Berufsfeld lernen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full rounded-2xl bg-[#73beb2] hover:bg-[#64aea3]" asChild>
                <Link href="/register">Kostenlos registrieren</Link>
              </Button>
              <Button variant="outline" className="w-full rounded-2xl border-[#eadfce] bg-white text-slate-700 hover:bg-white" asChild>
                <Link href="/trainer/fachwortschatz">
                  <Dumbbell className="mr-2 h-4 w-4" /> Fachwortschatz üben
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border border-[#eadfce] bg-white/92 shadow-[0_20px_50px_-34px_rgba(115,190,178,0.14)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Wiederholen in 3 Stufen
              </CardTitle>
              <CardDescription>
                So wird aus Fachwortschatz echte B2-Handlungssicherheit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {practiceContent.repetition.map((stage) => (
                <div
                  key={stage.level}
                  className="rounded-[1.2rem] border border-[#eadfce] bg-[#fffdfa] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5a8d7d]">
                    {stage.level}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {stage.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border border-[#eadfce] bg-white/92 shadow-[0_20px_50px_-34px_rgba(115,190,178,0.14)]">
            <CardHeader>
              <CardTitle>B2-Prüfungsbezug</CardTitle>
              <CardDescription>
                Dieses Berufsfeld direkt mit Schreiben, Sprechen und Prüfungstraining verbinden.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {practiceContent.examBridge.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block rounded-[1.2rem] border border-[#eadfce] bg-[#fffdfa] p-4 transition-colors hover:border-[#d7c7b1] hover:bg-white"
                >
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
