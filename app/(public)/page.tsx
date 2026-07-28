import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  HeartPulse,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

const featureHighlights = [
  {
    title: "Persönlich lernen",
    text: "Klare Wege, ruhige Oberflächen und ein moderner Lernfluss ohne Überladung.",
    icon: UserRound,
  },
  {
    title: "Berufsfelder im Fokus",
    text: "Sprache gezielt nach Arbeitsalltag, Branche und konkreter Situation trainieren.",
    icon: Briefcase,
  },
  {
    title: "Fortschritt sehen",
    text: "Lernen mit Orientierung statt Chaos: Fortschritt, Module und nächste Schritte im Blick.",
    icon: BarChart3,
  },
];

const fieldCards = [
  {
    title: "Gesundheit & Pflege",
    text: "Kommunikation mit Menschen im Fokus",
    image: "/concept27/beruf-healthcare.png",
    icon: HeartPulse,
  },
  {
    title: "Wirtschaft & Verwaltung",
    text: "Professionell in Organisation und Büro",
    image: "/concept27/beruf-office.png",
    icon: Briefcase,
  },
  {
    title: "Technik & Handwerk",
    text: "Klare Sprache für technische Berufe",
    image: "/concept27/beruf-technical.png",
    icon: Briefcase,
  },
];

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <div className="relative overflow-hidden px-4 pb-16 pt-8 md:pb-24 md:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(242,228,208,0.65),transparent_28%),radial-gradient(circle_at_top_right,rgba(226,243,236,0.6),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff8f2_55%,#fbf8f2_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(220,206,186,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(220,206,186,0.16)_1px,transparent_1px)] [background-size:56px_56px]" />

      <section className="mx-auto max-w-7xl">
        <header className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#e8dccb] bg-white/78 px-4 py-3 shadow-[0_18px_30px_-24px_rgba(138,116,83,0.32)] backdrop-blur md:px-6">
          <Link href="/" className="flex items-center gap-3 text-slate-900">
            <div className="relative flex h-11 w-11 items-center justify-center text-[#73beb2]">
              <div className="absolute inset-0 rounded-full border-[2px] border-current/90" />
              <div className="absolute bottom-[4px] left-[4px] h-2.5 w-2.5 rotate-12 rounded-bl-md border-b-[2px] border-l-[2px] border-current/90" />
              <span className="relative text-[1.4rem] [font-family:Georgia,serif]">B2</span>
            </div>
            <div className="leading-none">
              <p className="text-[1.65rem] [font-family:Georgia,serif] md:text-[2rem]">
                {APP_NAME}
              </p>
              <p className="hidden pt-1 text-[0.66rem] uppercase tracking-[0.32em] text-slate-500 md:block">
                Sprache. Kompetenz. Zukunft.
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="hidden rounded-full px-4 text-slate-700 md:inline-flex"
            >
              <Link href="/login">Anmelden</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-[#73beb2] px-5 text-white hover:bg-[#64aea3]"
            >
              <Link href={user ? "/dashboard" : "/register"}>
                {user ? "Weiterlernen" : "Registrieren"}
              </Link>
            </Button>
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-5xl text-center">
          <p className="text-[2rem] text-[#73beb2] [font-family:'Snell_Roundhand',cursive] md:text-[3rem]">
            Dein Weg zu beruflichem Erfolg.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-xl">
            <h1 className="text-[3.5rem] leading-[0.92] text-slate-900 md:text-[5.3rem] [font-family:Georgia,serif]">
              Sprache öffnet Türen.
              <br />
              <span className="text-[#73beb2]">Wir öffnen sie mit dir.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 md:text-xl">
              Berufssprache B2 verbindet Fachwortschatz, Kommunikation und
              berufliche Sicherheit in einer Lernoberfläche, die sich wie eine
              moderne App anfühlt.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-[1.1rem] bg-[#73beb2] px-7 text-base text-white hover:bg-[#64aea3]"
              >
                <Link href={user ? "/dashboard" : "/register"}>
                  {user ? "Weiterlernen" : "Jetzt starten"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-[1.1rem] border-[#e8dccb] bg-white/85 px-7 text-base hover:bg-white"
              >
                <Link href="/berufsfelder">Berufsfelder ansehen</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <BadgeLine text="Ruhige App-Optik" />
              <BadgeLine text="Beruflicher Fokus" />
              <BadgeLine text="Klarer Lernfluss" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-[#e6f4ef]" />
            <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-[2rem] border border-[#e4d6c2] bg-white/55 backdrop-blur" />

            <div className="relative rounded-[2.6rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdf9_0%,#fff6ee_100%)] p-4 shadow-[0_34px_70px_-36px_rgba(138,116,83,0.32)]">
              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#eef6ef_0%,#fbf3e8_100%)] p-4">
                  <div className="relative overflow-hidden rounded-[1.7rem] bg-[#fffaf4]">
                    <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#d8ece4]" />
                    <div className="absolute bottom-4 right-4 h-24 w-24 rounded-[1.8rem] border border-[#ddcdb7] bg-white/40" />
                    <Image
                      src="/concept27/home-hero-woman.png"
                      alt="Lernende Frau"
                      width={920}
                      height={1600}
                      className="relative z-10 mx-auto h-[26rem] w-full object-contain object-bottom"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.6rem] border border-[#eadfce] bg-white/90 p-5 shadow-sm">
                    <p className="text-[2rem] leading-none text-slate-900 [font-family:Georgia,serif]">
                      Hallo, Anna! <span className="text-base">👋</span>
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Weiter so! Du bist auf einem guten Weg.
                    </p>

                    <div className="mt-5 flex items-center gap-4 rounded-[1.3rem] border border-[#f0e5d8] bg-[#fffdf9] p-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-[#73beb2] border-r-[#e9eeea] border-t-[#e9eeea]">
                        <span className="text-2xl font-semibold text-slate-900">
                          72%
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div>
                          <p className="text-xs text-slate-400">Aktuelles Level</p>
                          <p>Fortgeschritten B2</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Nächstes Ziel</p>
                          <p>Komplexe Gespräche sicher führen</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-[#eadfce] bg-white/90 p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Weiterlernen</p>
                    <p className="mt-2 text-base font-medium text-slate-900">
                      Modul 4 · Einheit 12
                    </p>
                    <p className="text-base text-slate-900">
                      Besprechungen leiten
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-[#edf0ec]">
                      <div className="h-2 w-[64%] rounded-full bg-[#73beb2]" />
                    </div>
                    <Button
                      asChild
                      className="mt-5 h-11 w-full rounded-[1rem] bg-[#73beb2] text-white hover:bg-[#64aea3]"
                    >
                      <Link href="/dashboard">Weiterlernen</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
          {featureHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[1.7rem] border border-[#eadfce] bg-white/85 p-5 shadow-[0_20px_40px_-32px_rgba(138,116,83,0.3)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f4ef] text-[#73beb2]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[1.6rem] text-slate-900 [font-family:Georgia,serif]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-[2.2rem] border border-[#eadfce] bg-white/88 p-6 shadow-[0_24px_50px_-34px_rgba(138,116,83,0.28)] md:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[2.25rem] text-slate-900 [font-family:Georgia,serif]">
                  Berufsfelder
                </p>
                <p className="mt-2 max-w-xl text-slate-600">
                  Lerne gezielt Sprache, die du im Berufsalltag wirklich
                  brauchst.
                </p>
              </div>
              <Link
                href="/berufsfelder"
                className="hidden items-center gap-2 text-sm text-[#73beb2] md:inline-flex"
              >
                Alle ansehen
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {fieldCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href="/berufsfelder"
                    className="group relative block overflow-hidden rounded-[1.55rem] border border-[#eadfce] bg-[#fbf4ea] shadow-sm"
                  >
                    <div className="absolute inset-y-0 left-0 z-10 w-[56%] bg-[linear-gradient(90deg,rgba(251,244,234,0.98),rgba(251,244,234,0.92),rgba(251,244,234,0))]" />
                    <div className="relative z-20 flex min-h-[8.4rem] items-center gap-4 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-[#c49553] shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="max-w-[14rem]">
                        <p className="text-[1.35rem] leading-6 text-slate-900 [font-family:Georgia,serif]">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.text}
                        </p>
                      </div>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1400}
                      height={700}
                      className="absolute inset-y-0 right-0 h-full w-[52%] object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2.2rem] border border-[#eadfce] bg-white/88 p-6 shadow-[0_24px_50px_-34px_rgba(138,116,83,0.28)] md:p-7">
            <p className="text-[2.25rem] text-slate-900 [font-family:Georgia,serif]">
              Dein Trainer
            </p>
            <p className="mt-2 text-slate-600">
              Persönliche Begleitung, klare Rückmeldungen und Motivation für
              deinen Weg.
            </p>

            <div className="mt-6 rounded-[1.6rem] border border-[#f0e5d8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#f6eee3]">
                  <Image
                    src="/concept27/trainer-lea.png"
                    alt="Trainerin Lea Schneider"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Deine Trainerin</p>
                  <p className="text-[1.55rem] text-slate-900 [font-family:Georgia,serif]">
                    Lea Schneider
                  </p>
                  <p className="text-sm text-slate-500">
                    DaF-Expertin · B2-Spezialistin
                  </p>
                  <p className="mt-2 text-sm text-[#f19a4f]">
                    ★ 4,9 · 128 Bewertungen
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <TrainerMiniCard
                title="Persönliche Unterstützung"
                text="Individuelles Feedback für deine Fortschritte."
              />
              <TrainerMiniCard
                title="Lernplan anpassen"
                text="Wir passen deinen Plan an deine Ziele an."
              />
              <TrainerMiniCard
                title="Motivation & Tipps"
                text="Wir begleiten dich Schritt für Schritt."
              />
            </div>

            <Button
              asChild
              className="mt-6 h-12 w-full rounded-[1rem] bg-[#73beb2] text-white hover:bg-[#64aea3]"
            >
              <Link href="/trainer">
                Trainer öffnen
                <MessageCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </section>
    </div>
  );
}

function BadgeLine({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-[#eadfce] bg-white/75 px-4 py-2 text-center shadow-sm">
      {text}
    </div>
  );
}

function TrainerMiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[1.3rem] border border-[#f0e5d8] bg-white px-4 py-4 shadow-sm">
      <div className="mt-1 h-10 w-10 rounded-full bg-[#eef6ef]" />
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}
