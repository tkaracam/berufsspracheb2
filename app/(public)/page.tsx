import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

const features = [
  {
    title: "Fachwortschatz mit Berufsbezug",
    text: "Lerne relevante Begriffe nicht isoliert, sondern direkt im beruflichen Kontext.",
    icon: Briefcase,
  },
  {
    title: "Kommunikation, die ankommt",
    text: "Trainiere Redemittel und typische Situationen für Gespräche im Alltag und im Beruf.",
    icon: MessageCircle,
  },
  {
    title: "Strukturiertes B2-Training",
    text: "Arbeite mit klaren Lernwegen, kurzen Einheiten und sichtbarem Fortschritt.",
    icon: GraduationCap,
  },
];

const pathways = [
  {
    title: "Berufsfelder",
    text: "Pflege, Verwaltung, Technik, Gastronomie und weitere Bereiche.",
    href: "/berufsfelder",
  },
  {
    title: "Lernbereiche",
    text: "Grammatik, Redemittel, Lesen, Schreiben, Hören und Sprechen.",
    href: "/kommunikation",
  },
  {
    title: "Prüfungstraining",
    text: "Übe gezielt für berufssprachliche Aufgaben und B2-nahe Formate.",
    href: "/pruefungstraining",
  },
];

export default async function HomePage() {
  const { user } = await getSession();
  const primaryHref = user ? "/dashboard" : "/register";
  const primaryLabel = user ? "Zum Dashboard" : "Jetzt kostenlos starten";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.82),transparent_28%),radial-gradient(circle_at_top_right,rgba(229,244,239,0.76),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff9f3_52%,#f8fbf8_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(220,206,186,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(220,206,186,0.12)_1px,transparent_1px)] [background-size:58px_58px]" />

      <section className="px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white/88 px-4 py-2 text-sm text-slate-600 shadow-[0_18px_40px_-34px_rgba(57,73,84,0.42)]">
              <Sparkles className="h-4 w-4 text-[#5c9c88]" />
              Deutsch für den Beruf. Sicher. Klar. Kompetent.
            </div>

            <h1 className="mt-6 text-[3rem] leading-[0.92] text-slate-900 md:text-[4.6rem] [font-family:Georgia,serif]">
              Sprache für
              <br />
              Beruf, Kurs
              <br />
              und Zukunft.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {APP_NAME} ist eine moderne Lernplattform für Berufssprache B2.
              Trainiere Fachwortschatz, Kommunikation und prüfungsnahe Inhalte
              in einer klaren, ruhigen und vollständig responsiven Weboberfläche.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-[1rem] bg-[#5c9c88] px-6 text-base text-white hover:bg-[#538d7a]">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-[1rem] border-[#eadfce] bg-white/90 px-6 text-base text-slate-700 hover:bg-white">
                <Link href="/berufsfelder">Berufsfelder entdecken</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-[1.3rem] border border-[#eadfce] bg-white/82 px-4 py-4 shadow-[0_20px_40px_-34px_rgba(57,73,84,0.38)]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#5c9c88]" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Kurze Lerneinheiten</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Direkt startbar und leicht in den Alltag integrierbar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[1.3rem] border border-[#eadfce] bg-white/82 px-4 py-4 shadow-[0_20px_40px_-34px_rgba(57,73,84,0.38)]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#d69061]" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Beruflich relevant</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Inhalte für reale Situationen im Beruf und im Kurs.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-[#eadfce] bg-white/84 p-5 shadow-[0_36px_80px_-44px_rgba(118,94,63,0.3)] backdrop-blur-sm">
              <div className="grid gap-4">
                <div className="rounded-[1.6rem] bg-[linear-gradient(180deg,#f3f8f2_0%,#fbf1e6_100%)] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Berufssprache B2
                  </p>
                  <p className="mt-3 text-[2rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                    Klar lernen.
                    <br />
                    Sicher kommunizieren.
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
                    Eine ruhige Lernumgebung mit klaren Wegen durch Fachwortschatz,
                    Berufsfelder und B2-Training.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-[#eadfce] bg-white p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef7f4] text-[#5c9c88]">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-[1.35rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                      Fachwortschatz
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Begriffe, die du im beruflichen Alltag wirklich brauchst.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[#eadfce] bg-white p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1e8] text-[#d69061]">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-[1.35rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                      Lernwege
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Strukturierte Inhalte für Kurs, Prüfung und Beruf.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-[#5c9c88]">Warum diese Plattform</p>
            <h2 className="mt-4 text-[2.3rem] leading-tight text-slate-900 md:text-[3.2rem] [font-family:Georgia,serif]">
              Eine responsive Website, die sich auf jedem Gerät gut anfühlt.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Keine App-Mockups, keine künstliche Handy-Ansicht. Stattdessen eine
              echte Webplattform, die auf Desktop, Tablet und Mobil sauber,
              lesbar und ruhig funktioniert.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-[1.8rem] border border-[#eadfce] bg-white/82 p-6 shadow-[0_24px_48px_-36px_rgba(57,73,84,0.42)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7f4] text-[#5c9c88]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-[1.45rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                    {feature.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#eadfce] bg-white/80 p-6 shadow-[0_28px_54px_-38px_rgba(57,73,84,0.24)] md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#5c9c88]">Schneller Einstieg</p>
              <h2 className="mt-4 text-[2.2rem] leading-tight text-slate-900 md:text-[3rem] [font-family:Georgia,serif]">
                Finde deinen passenden Lernweg.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Starte über Berufsfelder, gehe direkt in Lernbereiche oder trainiere
                gezielt für berufssprachliche Prüfungsformate.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pathways.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.5rem] border border-[#eadfce] bg-[#fffdf9] p-5 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-[1.35rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
