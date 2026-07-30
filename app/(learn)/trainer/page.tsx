import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  MessageCircle,
  Mic,
  PenSquare,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export const metadata = { title: `Trainer – ${APP_NAME}` };

const trainerActions = [
  {
    title: "Fachwortschatz vertiefen",
    text: "Berufsbezogene Begriffe gezielt und ruhig wiederholen.",
    icon: BriefcaseBusiness,
    href: "/trainer/fachwortschatz",
  },
  {
    title: "Sprechen trainieren",
    text: "Sicherer formulieren, antworten und nachfragen.",
    icon: Mic,
    href: "/trainer/sprechen",
  },
  {
    title: "Grammatik festigen",
    text: "Wichtige Strukturen für B2 sauber und klar anwenden.",
    icon: CheckCircle2,
    href: "/trainer/grammatik",
  },
];

const trainingAreas = [
  {
    title: "Fachwortschatz",
    href: "/trainer/fachwortschatz",
    description: "Begriffe aus dem Berufsalltag direkt im passenden Kontext lernen.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Nomen-Verb",
    href: "/trainer/nomen-verb",
    description: "Feste Wendungen sicher erkennen und korrekt verwenden.",
    icon: Workflow,
  },
  {
    title: "Redemittel",
    href: "/trainer/redemittel",
    description: "Passende Formulierungen für Gespräche, Diskussionen und Berufssituationen.",
    icon: MessageCircle,
  },
  {
    title: "Grammatik",
    href: "/trainer/grammatik",
    description: "Zentrale B2-Strukturen mit klaren Übungen vertiefen.",
    icon: CheckCircle2,
  },
  {
    title: "Lesen",
    href: "/trainer/lesen",
    description: "Berufsnahe Texte schneller erfassen und gezielt verstehen.",
    icon: BookOpen,
  },
  {
    title: "Hören",
    href: "/trainer/hoeren",
    description: "Gespräche, Informationen und Aufgaben sicherer verstehen.",
    icon: AudioLines,
  },
  {
    title: "Schreiben",
    href: "/trainer/schreiben",
    description: "Texte, E-Mails und Antworten strukturierter formulieren.",
    icon: PenSquare,
  },
  {
    title: "Wiederholung",
    href: "/trainer/wiederholung",
    description: "Bereits gelernte Inhalte ruhig auffrischen und stabilisieren.",
    icon: Target,
  },
];

export default function TrainerPage() {
  return (
    <Container size="large">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#e7ddcf] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_52%,rgba(238,248,245,0.98)_100%)] p-6 shadow-[0_30px_90px_-52px_rgba(83,70,54,0.28)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,190,178,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(225,193,145,0.16),transparent_30%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ebe4] bg-white/78 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f4f55]">
                <Sparkles className="h-3.5 w-3.5" />
                Klar begleitet lernen
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Trainieren Sie genau die Bereiche,
                <span className="mt-2 block text-[#0f4f55]">die im Beruf wirklich Sicherheit geben.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Der Trainer bündelt alle wichtigen Übungen an einem Ort. Wählen Sie
                gezielt ein Sprachfeld und arbeiten Sie strukturiert weiter.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-[#0f4f55] px-6 hover:bg-[#0c4348]">
                  <Link href="/trainer/fachwortschatz">
                    Direkt anfangen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-[#d9ccbc] bg-white/80 px-6 text-slate-700 hover:bg-white">
                  <Link href="/decks">Zu den Decks</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {trainerActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group rounded-[1.4rem] border border-[#e3efe9] bg-white/82 p-4 shadow-[0_18px_40px_-34px_rgba(15,79,85,0.24)] transition-all hover:-translate-y-0.5 hover:bg-white"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55] transition-colors group-hover:bg-[#0f4f55] group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-950">{action.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{action.text}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[#0f4f55]" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="rounded-[1.8rem] border-[#eadfce] bg-white/88 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.22)]">
            <CardContent className="p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                So nutzen Sie den Trainer
              </p>
              <div className="mt-5 space-y-4">
                <GuideRow
                  icon={<Target className="h-4 w-4" />}
                  title="1. Einen klaren Bereich wählen"
                  text="Starten Sie mit genau dem Sprachfeld, das im Moment den größten Nutzen bringt."
                />
                <GuideRow
                  icon={<BookOpen className="h-4 w-4" />}
                  title="2. Kurz und regelmäßig üben"
                  text="Mehrere ruhige, kurze Einheiten sind wirksamer als seltene lange Lernsessions."
                />
                <GuideRow
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  title="3. Schrittweise Sicherheit aufbauen"
                  text="Mit jeder Wiederholung werden Begriffe, Strukturen und Reaktionen verlässlicher."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(247,252,250,0.94)_100%)] shadow-[0_24px_70px_-52px_rgba(60,44,26,0.2)]">
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                    Schnellzugriff
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    Direkt in wichtige Trainingsfelder
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {trainingAreas.slice(0, 4).map((area) => {
                  const Icon = area.icon;
                  return (
                    <Link
                      key={area.title}
                      href={area.href}
                      className="group flex items-center justify-between rounded-[1.2rem] border border-[#ebe2d6] bg-white/84 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-[#d7ebe4] hover:bg-white"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55] transition-colors group-hover:bg-[#0f4f55] group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-950">{area.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-500">{area.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[#0f4f55]" />
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                Alle Trainingsbereiche
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Klar strukturiert und direkt zugänglich
              </h2>
            </div>
            <div className="rounded-full border border-[#e7ddcf] bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600">
              {trainingAreas.length} Bereiche
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {trainingAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Link
                  key={area.title}
                  href={area.href}
                  className="group rounded-[1.6rem] border border-[#eadfce] bg-white/88 p-5 shadow-[0_20px_56px_-40px_rgba(60,44,26,0.18)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-38px_rgba(15,79,85,0.22)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55] transition-colors group-hover:bg-[#0f4f55] group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-5 text-base font-semibold text-slate-950">{area.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{area.description}</p>
                  <div className="mt-5 flex items-center text-sm font-semibold text-[#0f4f55]">
                    Öffnen <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Container>
  );
}

function GuideRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[1.2rem] border border-[#efe4d6] bg-[#fffdfa] p-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}
