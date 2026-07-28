import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, MessageCircle, Sparkles, UserRound } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";
import { PhoneFrame } from "@/components/concept27/phone-frame";
import { MobileTabs } from "@/components/concept27/mobile-tabs";
import { BrandMark } from "@/components/concept27/brand-mark";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

const highlights = [
  {
    title: "Klar anfangen",
    text: "Kurze Einheiten, ruhige Führung und ein direkter Einstieg ohne Ablenkung.",
    icon: Sparkles,
  },
  {
    title: "Beruflich lernen",
    text: "Fachwortschatz, Redemittel und Situationen aus dem echten Arbeitsalltag.",
    icon: Briefcase,
  },
  {
    title: "Sicher anwenden",
    text: "Trainiere so, dass du im Kurs, im Gespräch und im Beruf souverän bleibst.",
    icon: MessageCircle,
  },
];

export default async function HomePage() {
  const { user } = await getSession();
  const primaryHref = user ? "/dashboard" : "/register";
  const primaryLabel = user ? "Weiterlernen" : "Jetzt starten";

  return (
    <div className="relative overflow-hidden px-4 pb-16 pt-8 md:px-6 md:pb-24 md:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.82),transparent_28%),radial-gradient(circle_at_top_right,rgba(229,244,239,0.8),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff9f3_52%,#f8fbf8_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(220,206,186,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(220,206,186,0.12)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="pointer-events-none absolute left-[-6rem] top-[-2rem] -z-10 h-72 w-72 rounded-full bg-[#f4e6d6]/70 blur-3xl" />
      <div className="pointer-events-none absolute right-[-5rem] top-10 -z-10 h-80 w-80 rounded-full bg-[#dff1ea]/80 blur-3xl" />

      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <BrandMark className="justify-center" />
          <p className="mt-5 text-[1.9rem] text-[#73beb2] [font-family:'Snell_Roundhand',cursive] md:text-[2.9rem]">
            Dein Weg zu beruflichem Erfolg.
          </p>
          <div className="mx-auto mt-1 h-px w-40 bg-[#73beb2]/60 md:w-52" />
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,380px)] lg:gap-16">
          <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-[0_18px_40px_-34px_rgba(57,73,84,0.42)]">
              <Sparkles className="h-4 w-4 text-[#73beb2]" />
              Lern-App für Berufssprache B2
            </div>

            <h1 className="mt-6 text-[3rem] leading-[0.95] text-slate-900 md:text-[4.6rem] [font-family:Georgia,serif]">
              Deutsch lernen.
              <br />
              Im Beruf sicher
              <br />
              <span className="text-[#73beb2]">handeln.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              {APP_NAME} verbindet Fachwortschatz, Kommunikation und B2-Training
              in einer klaren, ruhigen Oberfläche. Alles fühlt sich wie eine
              moderne App an und führt direkt in den nächsten sinnvollen Schritt.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
              <Button asChild className="h-12 rounded-[1rem] bg-[#73beb2] px-7 text-base text-white hover:bg-[#64aea3]">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-[1rem] border-[#eadfce] bg-white/90 px-7 text-base text-slate-700 hover:bg-white">
                <Link href="/berufsfelder">Berufsfelder ansehen</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[1.45rem] border border-[#eadfce] bg-white/82 p-4 text-left shadow-[0_24px_44px_-36px_rgba(57,73,84,0.45)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef7f4] text-[#73beb2]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-4 text-base text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[360px]">
            <PhoneFrame className="max-w-[360px]">
              <div className="flex items-center justify-between">
                <div className="scale-[0.8] origin-left">
                  <BrandMark compact />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>09:41</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[2.45rem] leading-[0.95] text-slate-900 [font-family:Georgia,serif]">
                  Sprache öffnet
                  <br />
                  Türen.
                  <br />
                  <span className="text-[#73beb2]">Wir öffnen sie</span>
                  <br />
                  <span className="text-[#73beb2]">mit dir.</span>
                </p>
                <p className="mt-5 max-w-[15rem] text-sm leading-7 text-slate-600">
                  Gezielter Wortschatz, sichere Kommunikation und ein Lernweg,
                  der sich leicht anfühlt.
                </p>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#eef6ef_0%,#fdf5ea_100%)] p-4">
                <div className="absolute bottom-0 left-[-0.5rem] h-40 w-40 rounded-full bg-[#dceee7]" />
                <div className="absolute bottom-4 right-4 h-24 w-24 rounded-[1.7rem] border border-[#e4d3bf] bg-white/35" />
                <Image
                  src="/concept27/home-hero-woman.png"
                  alt="Berufssprache B2"
                  width={920}
                  height={1600}
                  className="relative z-10 h-[280px] w-full object-contain object-bottom"
                />
              </div>

              <div className="mt-5 grid gap-3">
                <Button asChild className="h-12 rounded-[1rem] bg-[#73beb2] text-base text-white hover:bg-[#64aea3]">
                  <Link href={primaryHref}>{primaryLabel}</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-[1rem] border-[#eadfce] bg-white text-base text-slate-700 hover:bg-white">
                  <Link href="/login">Anmelden</Link>
                </Button>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-[1.25rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef7f4] text-[#73beb2]">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">Kurze Lerneinheiten</p>
                      <p className="text-xs text-slate-500">Ruhig, klar und direkt startbar</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3e8] text-[#d39b54]">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">Berufssprache im Kontext</p>
                      <p className="text-xs text-slate-500">Praxisnah für Alltag, Kurs und Arbeit</p>
                    </div>
                  </div>
                </div>
              </div>

              <MobileTabs active="home" />
            </PhoneFrame>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <AppRouteCard
            href="/login"
            title="Login"
            text="Schnell anmelden und genau dort weitermachen, wo du zuletzt warst."
            icon={UserRound}
          />
          <AppRouteCard
            href="/berufsfelder"
            title="Berufsfelder"
            text="Lerne gezielt für Pflege, Büro, Technik, Gastronomie und mehr."
            icon={Briefcase}
          />
          <AppRouteCard
            href="/trainer"
            title="Trainer"
            text="Persönliche Unterstützung, Motivation und strukturierte Begleitung."
            icon={MessageCircle}
          />
        </div>
      </section>
    </div>
  );
}

function AppRouteCard({
  href,
  title,
  text,
  icon: Icon,
}: {
  href: string;
  title: string;
  text: string;
  icon: typeof Sparkles;
}) {
  return (
    <Link
      href={href}
      className="rounded-[1.6rem] border border-[#eadfce] bg-white/82 p-5 shadow-[0_24px_48px_-36px_rgba(57,73,84,0.42)] transition-transform hover:-translate-y-0.5"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef7f4] text-[#73beb2]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-xl text-slate-900 [font-family:Georgia,serif]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </Link>
  );
}
