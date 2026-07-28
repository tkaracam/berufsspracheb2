import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  CirclePlay,
  GraduationCap,
  Headphones,
  MessageSquare,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { FaqSection } from "@/components/home/faq-section";
import { HeroVisual } from "@/components/home/hero-visual";
import { SearchHero } from "@/components/home/search-hero";
import { SectionHeading } from "@/components/ui/section-heading";

const learningAreas = [
  {
    href: "/berufsfelder",
    title: "Fachwortschatz",
    description: "Begriffe im Kontext lernen",
    icon: Briefcase,
    progress: "80%",
    tone: "bg-sky-100 text-sky-700",
  },
  {
    href: "/kommunikation",
    title: "Kommunikation",
    description: "Dialoge, E-Mails und Meetings",
    icon: MessageSquare,
    progress: "65%",
    tone: "bg-cyan-100 text-cyan-700",
  },
  {
    href: "/pruefungstraining",
    title: "Prüfungstraining",
    description: "B2-Aufgaben mit Fokus üben",
    icon: GraduationCap,
    progress: "48%",
    tone: "bg-amber-100 text-amber-700",
  },
];

const sessionCards = [
  {
    icon: Headphones,
    label: "Hörverstehen",
    title: "Kundengespräch verstehen",
    meta: "15 Min.",
  },
  {
    icon: BookOpen,
    label: "Wortschatz",
    title: "Projektplanung im Büro",
    meta: "24 Wörter",
  },
  {
    icon: Target,
    label: "Sicher anwenden",
    title: "Sprechen im Teammeeting",
    meta: "8 Aufgaben",
  },
];

const quickFacts = [
  { value: "68%", label: "B2 Niveau" },
  { value: "112", label: "Wörter gelernt" },
  { value: "16", label: "Streak (Tage)" },
];

const benefits = [
  "Kurze Lerneinheiten für den Alltag",
  "Fachsprache mit echtem Berufsbezug",
  "Auf Mobilgeräten besonders angenehm",
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden px-4 pb-14 pt-10 md:pb-20 md:pt-14">
        <HeroVisual />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Für Berufssprachkurs B2 und echten Arbeitsalltag
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Deutsch für den Beruf.
              <br />
              <span className="text-sky-600">Klar lernen. Sicher anwenden.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              {APP_NAME} verbindet Fachwortschatz, Kommunikation und prüfungsnahe
              Übungen in einer ruhigen Lernoberfläche, die Orientierung gibt und
              sich leicht anfühlt.
            </p>

            <SearchHero />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-2xl bg-sky-500 px-7 text-base shadow-[0_18px_40px_-22px_rgba(59,130,246,0.75)] hover:bg-sky-600"
              >
                <Link href="/register">
                  Jetzt kostenlos lernen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-2xl border-sky-100 bg-white/80 px-7 text-base text-slate-700 hover:bg-white"
              >
                <Link href="/berufsfelder">Lernbereiche entdecken</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/88 px-3 py-1.5 text-sm text-slate-600 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(147,197,253,0.4),_transparent_55%)] blur-3xl" />

            <div className="relative rounded-[2.5rem] border border-white/80 bg-white/75 p-4 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.35)] backdrop-blur">
              <div className="overflow-hidden rounded-[2.1rem] border border-sky-100/80 bg-[linear-gradient(180deg,#eff7ff_0%,#ffffff_28%,#ffffff_100%)]">
                <div className="border-b border-sky-100/80 px-5 pb-5 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Dein Fortschritt</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                        Heute weiter
                      </h2>
                    </div>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-sky-400/20 border-t-sky-500 bg-white text-center shadow-sm">
                      <div>
                        <div className="text-2xl font-bold text-sky-600">68%</div>
                        <div className="text-[11px] text-slate-500">B2 Niveau</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.8rem] bg-[linear-gradient(180deg,#f7fbff_0%,#f3f9ff_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-500">
                          Heute für dich
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                          Projektplanung
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                          Hören · Wortschatz · Schreiben
                        </p>
                      </div>
                      <div className="rounded-full bg-white p-3 shadow-sm">
                        <CirclePlay className="h-6 w-6 text-sky-500" />
                      </div>
                    </div>

                    <div className="mt-5 h-2 rounded-full bg-sky-100">
                      <div className="h-2 w-[72%] rounded-full bg-sky-500" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 border-b border-sky-100/80 px-5 py-5 sm:grid-cols-3">
                  {quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-[1.5rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.4)]"
                    >
                      <p className="text-2xl font-bold text-slate-900">{fact.value}</p>
                      <p className="mt-1 text-sm text-slate-500">{fact.label}</p>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Deine Module</h3>
                    <Link href="/berufsfelder" className="text-sm font-medium text-sky-600">
                      Alle anzeigen
                    </Link>
                  </div>

                  <div className="grid gap-3">
                    {learningAreas.map((area) => {
                      const Icon = area.icon;
                      return (
                        <Link key={area.title} href={area.href}>
                          <div className="flex items-center gap-4 rounded-[1.6rem] border border-sky-50 bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:-translate-y-0.5">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${area.tone}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-semibold text-slate-900">{area.title}</p>
                                <span className="text-sm font-medium text-slate-500">{area.progress}</span>
                              </div>
                              <p className="mt-1 text-sm text-slate-500">{area.description}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center">
            <SectionHeading
              title="Heute lernen ohne Reizüberflutung"
              subtitle="Die Startseite ist wie eine gute App aufgebaut: ein klarer Fokus, kurze Wege und ruhige Flächen statt voller Landingpage-Blöcke."
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="rounded-[2rem] border border-sky-100 bg-white/85 shadow-[0_22px_60px_-38px_rgba(59,130,246,0.28)]">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Nächste Einheiten</p>
                    <h3 className="mt-1 text-xl font-semibold text-slate-900">
                      Empfohlene Sessions
                    </h3>
                  </div>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                    3 heute
                  </span>
                </div>

                <div className="grid gap-3">
                  {sessionCards.map((session) => {
                    const Icon = session.icon;
                    return (
                      <div
                        key={session.title}
                        className="flex items-center gap-4 rounded-[1.5rem] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)]"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                            {session.label}
                          </p>
                          <p className="mt-1 font-semibold text-slate-900">{session.title}</p>
                        </div>
                        <span className="text-sm text-slate-500">{session.meta}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-sky-100 bg-[linear-gradient(180deg,#fafdff_0%,#eef7ff_100%)] shadow-[0_22px_60px_-38px_rgba(59,130,246,0.28)]">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-500">Warum es leichter wirkt</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">
                  Mehr Ruhe, mehr Orientierung
                </h3>

                <div className="mt-5 space-y-3">
                  {[
                    "Helle Flächen und klare Abstände für weniger Stress beim Lernen",
                    "Ein zentrales Tagesziel statt zu vieler konkurrierender Bereiche",
                    "Module und Übungen wie in einer mobilen Lern-App strukturiert",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-[1.4rem] bg-white/90 px-4 py-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      <p className="text-sm leading-6 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.6rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.3)]">
                  <p className="text-sm text-slate-500">Nächster Schritt</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    Berufsfelder öffnen und den passenden Lernpfad wählen
                  </p>
                  <Button asChild className="mt-4 rounded-2xl bg-sky-500 hover:bg-sky-600">
                    <Link href="/berufsfelder">
                      Lernpfad wählen <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="px-4 pb-16 pt-4">
        <div className="mx-auto max-w-4xl">
          <Card className="rounded-[2.4rem] border border-sky-100 bg-[linear-gradient(135deg,#ffffff_0%,#f2faff_55%,#edf8f5_100%)] shadow-[0_28px_70px_-40px_rgba(59,130,246,0.3)]">
            <CardContent className="px-6 py-10 text-center md:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-500">
                {APP_NAME}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Lernsprache, die sich leichter anfühlt
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Starten Sie mit einer klaren Oberfläche, kurzen Übungen und berufsnahen
                Inhalten, die nicht überfordern.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild className="rounded-2xl bg-sky-500 hover:bg-sky-600">
                  <Link href="/register">
                    Jetzt kostenlos testen <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-2xl border-sky-100 bg-white/85 text-slate-700 hover:bg-white"
                >
                  <Link href="/kommunikation">Kommunikation ansehen</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
