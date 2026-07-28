import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
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

const cards = [
  {
    title: "Berufsfelder",
    text: "Lerne gezielt Sprache für Gesundheit, Büro, Technik und Alltag im Beruf.",
    icon: Briefcase,
    href: "/berufsfelder",
  },
  {
    title: "Fortschritt",
    text: "Übersichtliche Lernwege, klare Module und sichtbare nächste Schritte.",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    title: "Trainer",
    text: "Persönliche Begleitung, ruhige Rückmeldungen und Motivation beim Lernen.",
    icon: MessageCircle,
    href: "/trainer",
  },
];

const fieldHighlights = [
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
];

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <div className="relative overflow-hidden px-4 pb-20 pt-8 md:pb-28 md:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.78),transparent_28%),radial-gradient(circle_at_top_right,rgba(231,245,240,0.76),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff8f2_54%,#fbf7f0_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(220,206,186,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(220,206,186,0.13)_1px,transparent_1px)] [background-size:58px_58px]" />

      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-4">
            <BrandBubble />
            <div className="text-left">
              <p className="text-[2.8rem] leading-none text-slate-900 md:text-[4.5rem] [font-family:Georgia,serif]">
                {APP_NAME}
              </p>
              <p className="pt-3 text-[0.72rem] uppercase tracking-[0.38em] text-slate-500 md:text-[1.05rem]">
                Sprache. Kompetenz. Zukunft.
              </p>
            </div>
          </div>

          <p className="mt-6 text-[1.9rem] text-[#73beb2] [font-family:'Snell_Roundhand',cursive] md:text-[3rem]">
            Dein Weg zu beruflichem Erfolg.
          </p>
          <div className="mx-auto mt-1 h-px w-40 bg-[#73beb2]/60 md:w-52" />
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
              App-Gefühl statt klassische Website
            </p>
            <h1 className="mt-6 text-[3.6rem] leading-[0.92] text-slate-900 md:text-[5.6rem] [font-family:Georgia,serif]">
              Sprache öffnet Türen.
              <br />
              <span className="text-[#73beb2]">Wir öffnen sie mit dir.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 md:text-xl">
              Berufssprache B2 verbindet Fachwortschatz, Kommunikation und
              Sicherheit im Berufsalltag in einer ruhigen Lernoberfläche, die
              sich klar, modern und leicht anfühlt.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-[1rem] bg-[#73beb2] px-7 text-base text-white hover:bg-[#64aea3]"
              >
                <Link href={user ? "/dashboard" : "/register"}>
                  {user ? "Weiterlernen" : "Jetzt starten"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-[1rem] border-[#eadfce] bg-white/85 px-7 text-base hover:bg-white"
              >
                <Link href="/berufsfelder">Berufsfelder ansehen</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <SoftPill text="Ruhige App-Optik" />
              <SoftPill text="Beruflicher Fokus" />
              <SoftPill text="Klarer Lernfluss" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-[#e2f1eb]" />
            <div className="absolute -right-5 bottom-10 h-24 w-24 rounded-[2rem] border border-[#e3d4bf] bg-white/50 backdrop-blur" />

            <div className="rounded-[2.5rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdf9_0%,#fff6ee_100%)] p-4 shadow-[0_32px_70px_-34px_rgba(138,116,83,0.3)]">
              <div className="grid gap-4 md:grid-cols-[1.02fr_0.98fr]">
                <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#eef6ef_0%,#fbf3e8_100%)] p-4">
                  <div className="relative overflow-hidden rounded-[1.7rem] bg-[#fffaf4]">
                    <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#d8ece4]" />
                    <div className="absolute bottom-4 right-4 h-24 w-24 rounded-[1.8rem] border border-[#decdb8] bg-white/40" />
                    <Image
                      src="/concept27/home-hero-woman.png"
                      alt="Lernende Frau"
                      width={920}
                      height={1600}
                      className="relative z-10 mx-auto h-[25rem] w-full object-contain object-bottom"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <GlassCard>
                    <p className="text-[2rem] leading-none text-slate-900 [font-family:Georgia,serif]">
                      Hallo, Anna! <span className="text-base">👋</span>
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Weiter so! Du bist auf einem guten Weg.
                    </p>
                    <div className="mt-5 flex items-center gap-4 rounded-[1.3rem] border border-[#f0e5d8] bg-[#fffdf9] p-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-[#73beb2] border-r-[#e8efea] border-t-[#e8efea]">
                        <span className="text-2xl font-semibold text-slate-900">72%</span>
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
                  </GlassCard>

                  <GlassCard>
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
                  </GlassCard>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-[1.7rem] border border-[#eadfce] bg-white/82 p-5 shadow-[0_20px_40px_-32px_rgba(138,116,83,0.28)] transition-transform hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f4ef] text-[#73beb2]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[1.6rem] text-slate-900 [font-family:Georgia,serif]">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {card.text}
                </p>
              </Link>
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
                  Lerne gezielt Sprache, die du im Berufsalltag wirklich brauchst.
                </p>
              </div>
              <Link href="/berufsfelder" className="hidden text-sm text-[#73beb2] md:inline-flex">
                Alle ansehen
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {fieldHighlights.map((item) => {
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
              Persönliche Begleitung, klare Rückmeldungen und Motivation für deinen Weg.
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
                  <p className="mt-2 text-sm text-[#f19a4f]">★ 4,9 · 128 Bewertungen</p>
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
              <Link href="/trainer">Trainer öffnen</Link>
            </Button>
          </section>
        </div>
      </section>
    </div>
  );
}

function SoftPill({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-[#eadfce] bg-white/75 px-4 py-2 text-center text-sm text-slate-600 shadow-sm">
      {text}
    </div>
  );
}

function BrandBubble() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center text-[#73beb2] md:h-20 md:w-20">
      <div className="absolute inset-0 rounded-full border-[2.5px] border-current/90" />
      <div className="absolute bottom-[5px] left-[5px] h-3 w-3 rotate-12 rounded-bl-md border-b-[2.5px] border-l-[2.5px] border-current/90 md:bottom-[8px] md:left-[8px] md:h-4 md:w-4" />
      <span className="relative text-[2rem] [font-family:Georgia,serif] md:text-[2.5rem]">B2</span>
    </div>
  );
}

function GlassCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.6rem] border border-[#eadfce] bg-white/90 p-5 shadow-sm">
      {children}
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
