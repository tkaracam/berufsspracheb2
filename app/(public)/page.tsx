import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowRight, BarChart3, Briefcase, HeartPulse, Home, Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

const previewLabels = [
  { title: "Home", text: "Einladend und motivierend. Starte jetzt deinen Weg.", icon: Home, tone: "mint" as const },
  { title: "Login", text: "Einfach, sicher und schnell anmelden.", icon: UserRound, tone: "mint" as const },
  { title: "Dashboard", text: "Dein Fortschritt im Blick. Persönlich und ermutigend.", icon: BarChart3, tone: "mint" as const },
  { title: "Berufsfelder", text: "Lerne gezielt für deinen Beruf. Praxisnah und relevant.", icon: Briefcase, tone: "gold" as const },
  { title: "Trainer", text: "Persönliche Begleitung, die dich weiterbringt.", icon: UserRound, tone: "mint" as const },
];

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-8 md:pb-20 md:pt-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(240,225,204,0.52),transparent_32%),radial-gradient(circle_at_top_right,rgba(224,243,236,0.55),transparent_28%),linear-gradient(180deg,#fffdf9_0%,#fff8f2_52%,#fbf7f1_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(217,205,186,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(217,205,186,0.22)_1px,transparent_1px)] [background-size:54px_54px]" />

      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mx-auto flex w-fit items-center gap-4 rounded-full border border-[#d5ddd7] bg-white/72 px-5 py-3 shadow-[0_18px_30px_-24px_rgba(138,116,83,0.35)] backdrop-blur">
            <div className="relative flex h-14 w-14 items-center justify-center text-[#73beb2]">
              <div className="absolute inset-0 rounded-full border-[2.2px] border-current/90" />
              <div className="absolute bottom-[5px] left-[5px] h-3 w-3 rotate-12 rounded-bl-md border-b-[2.2px] border-l-[2.2px] border-current/90" />
              <span className="relative text-[1.9rem] [font-family:Georgia,serif]">B2</span>
            </div>
            <div className="text-left">
              <p className="text-[2.4rem] leading-none text-slate-900 [font-family:Georgia,serif] md:text-[3.6rem]">
                {APP_NAME}
              </p>
              <p className="pt-2 text-[0.72rem] uppercase tracking-[0.52em] text-slate-500 md:text-[0.95rem]">
                Sprache. Kompetenz. Zukunft.
              </p>
            </div>
          </div>

          <p className="mt-7 text-[1.8rem] text-[#73beb2] [font-family:'Snell_Roundhand',cursive] md:text-[2.7rem]">
            Dein Weg zu beruflichem Erfolg.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-4">
          <div className="mx-auto flex w-max min-w-full gap-5 px-1 lg:grid lg:w-full lg:grid-cols-5 lg:gap-6">
            <PreviewPhone className="w-[18.5rem] lg:w-auto">
              <div className="flex items-center justify-between text-slate-800">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-7 w-7 items-center justify-center text-[#73beb2]">
                    <div className="absolute inset-0 rounded-full border border-current/80" />
                    <div className="absolute bottom-[2px] left-[2px] h-1.5 w-1.5 rotate-12 rounded-bl-sm border-b border-l border-current/80" />
                    <span className="relative text-[0.9rem] [font-family:Georgia,serif]">B2</span>
                  </div>
                  <span className="text-[0.95rem] [font-family:Georgia,serif]">{APP_NAME}</span>
                </div>
                <Menu className="h-4 w-4 text-slate-500" />
              </div>

              <div className="mt-7">
                <h1 className="text-[2.28rem] leading-[0.98] text-slate-900 [font-family:Georgia,serif]">
                  Sprache
                  <br />
                  öffnet Türen.
                  <br />
                  <span className="text-[#73beb2]">Wir öffnen sie</span>
                  <br />
                  <span className="text-[#73beb2]">mit dir.</span>
                </h1>
                <p className="mt-5 max-w-[13rem] text-[0.95rem] leading-6 text-slate-600">
                  Gezielt Deutsch lernen. Sicher im Beruf kommunizieren. Selbstbewusst wachsen.
                </p>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#eef6ef_0%,#fbf3e8_100%)] px-2 pt-4">
                <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#d8ece4]" />
                <div className="absolute bottom-4 right-4 h-24 w-24 rounded-[1.8rem] border border-[#d8cdbb] bg-white/35" />
                <Image
                  src="/concept27/home-hero-woman.png"
                  alt="Lernende Frau"
                  width={920}
                  height={1600}
                  className="relative z-10 h-[19rem] w-full object-contain object-bottom"
                />
              </div>

              <div className="mt-4 space-y-3">
                <Button asChild className="h-12 w-full rounded-[1.2rem] bg-[#73beb2] text-base hover:bg-[#64aea3]">
                  <Link href={user ? "/dashboard" : "/register"}>{user ? "Weiterlernen" : "Jetzt starten"}</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 w-full rounded-[1.2rem] border-[#eadfce] bg-white text-slate-700 hover:bg-white">
                  <Link href="/berufsfelder">Mehr erfahren</Link>
                </Button>
              </div>
            </PreviewPhone>

            <PreviewPhone className="w-[18.5rem] lg:w-auto">
              <div className="flex justify-center pt-10">
                <div className="relative flex h-16 w-16 items-center justify-center text-[#73beb2]">
                  <div className="absolute inset-0 rounded-full border-[2px] border-current/85" />
                  <div className="absolute bottom-[5px] left-[5px] h-3 w-3 rotate-12 rounded-bl-md border-b-[2px] border-l-[2px] border-current/85" />
                  <span className="relative text-[1.9rem] [font-family:Georgia,serif]">B2</span>
                </div>
              </div>
              <div className="mt-7 text-center">
                <p className="text-[1.8rem] text-slate-900 [font-family:Georgia,serif]">{APP_NAME}</p>
                <p className="mt-7 text-[2rem] text-slate-900 [font-family:Georgia,serif]">Willkommen zurück!</p>
                <p className="mt-2 text-sm text-slate-500">Schön, dass du da bist.</p>
              </div>
              <div className="mt-8 space-y-4">
                <InputMock label="E-Mail-Adresse" value="Deine E-Mail-Adresse" />
                <InputMock label="Passwort" value="Dein Passwort" />
                <div className="pt-1 text-right text-xs text-[#73beb2]">Passwort vergessen?</div>
                <div className="flex h-12 items-center justify-center rounded-[1rem] bg-[#73beb2] text-base font-medium text-white">
                  Anmelden
                </div>
              </div>
              <div className="mt-6 text-center text-xs text-slate-400">oder weiter mit</div>
              <div className="mt-5 flex justify-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[#eadfce] bg-white text-lg shadow-sm">G</div>
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[#eadfce] bg-white text-lg shadow-sm"></div>
              </div>
              <p className="mt-8 text-center text-sm text-slate-500">
                Noch kein Konto? <span className="text-[#73beb2]">Konto erstellen</span>
              </p>
            </PreviewPhone>

            <PreviewPhone className="w-[18.5rem] lg:w-auto">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[1.95rem] leading-none text-slate-900 [font-family:Georgia,serif]">
                    Hallo, Anna! <span className="text-base">👋</span>
                  </p>
                  <p className="mt-3 text-sm leading-5 text-slate-500">
                    Weiter so! Du bist auf einem guten Weg.
                  </p>
                </div>
                <div className="h-5 w-5 rounded-full border border-[#eadfce]" />
              </div>

              <div className="mt-6 rounded-[1.45rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-700">Dein Fortschritt</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-[#73beb2]/85 border-r-[#e7ece7] border-t-[#e7ece7]">
                    <span className="text-[2rem] font-semibold text-slate-900">72%</span>
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

              <div className="mt-5 rounded-[1.45rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-600">Weiterlernen</p>
                <p className="mt-2 text-sm font-medium text-slate-900">Modul 4 · Einheit 12</p>
                <p className="text-sm text-slate-900">Besprechungen leiten</p>
                <div className="mt-4 h-2 rounded-full bg-[#edf0ec]">
                  <div className="h-2 w-[60%] rounded-full bg-[#73beb2]" />
                </div>
                <div className="mt-4 flex h-11 items-center justify-center rounded-[1rem] bg-[#73beb2] text-sm font-medium text-white">
                  Weiterlernen
                </div>
              </div>
            </PreviewPhone>

            <PreviewPhone className="w-[18.5rem] lg:w-auto">
              <p className="text-[2rem] text-slate-900 [font-family:Georgia,serif]">Berufsfelder</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Wähle dein Berufsfeld und lerne gezielt die Sprache, die du brauchst.
              </p>
              <div className="mt-5 space-y-3">
                <ProfessionCard title="Gesundheit & Pflege" subtitle="Kommunikation mit Menschen im Fokus" image="/concept27/beruf-healthcare.png" icon={HeartPulse} />
                <ProfessionCard title="Wirtschaft & Verwaltung" subtitle="Professionell in Organisation und Büro" image="/concept27/beruf-office.png" icon={Briefcase} />
                <ProfessionCard title="Technik & Handwerk" subtitle="Klare Sprache für technische Berufe" image="/concept27/beruf-technical.png" icon={Briefcase} />
                <ProfessionCard title="Gastronomie & Hotel" subtitle="Gastfreundlich kommunizieren" image="/concept27/beruf-hospitality.png" icon={Briefcase} />
              </div>
            </PreviewPhone>

            <PreviewPhone className="w-[18.5rem] lg:w-auto">
              <p className="text-[2rem] text-slate-900 [font-family:Georgia,serif]">Dein Trainer</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Wir begleiten dich auf deinem Lernweg.
              </p>
              <div className="mt-5 rounded-[1.45rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#f6eee3]">
                    <Image src="/concept27/trainer-lea.png" alt="Trainerin Lea Schneider" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Deine Trainerin</p>
                    <p className="text-[1.35rem] text-slate-900 [font-family:Georgia,serif]">Lea Schneider</p>
                    <p className="text-sm text-slate-500">DaF-Expertin · B2-Spezialistin</p>
                    <p className="mt-2 text-sm text-[#f19a4f]">★ 4,9 · 128 Bewertungen</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <TrainerLine title="Persönliche Unterstützung" text="Individuelles Feedback für deine Fortschritte." />
                <TrainerLine title="Lernplan anpassen" text="Wir passen deinen Plan an deine Ziele an." />
                <TrainerLine title="Motivation & Tipps" text="Wir sind für dich da, bei jedem Schritt." />
              </div>
              <div className="mt-5 flex h-12 items-center justify-center rounded-[1rem] bg-[#73beb2] text-base font-medium text-white">
                Nachricht schreiben
              </div>
            </PreviewPhone>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-5">
          {previewLabels.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${item.tone === "gold" ? "bg-[#ecd4a8] text-[#7f6130]" : "bg-[#86c8be] text-white"}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-[2rem] text-slate-900 [font-family:Georgia,serif]">{item.title}</p>
                <p className="mx-auto mt-3 max-w-[12rem] text-base leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function PreviewPhone({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[2.6rem] border border-[#e5d8c8] bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f2_100%)] p-[0.38rem] shadow-[0_28px_60px_-34px_rgba(138,116,83,0.38)] ${className}`}>
      <div className="rounded-[2.25rem] border border-[#eadfce] bg-white px-5 pb-5 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#1f2937]" />
        {children}
      </div>
    </div>
  );
}

function InputMock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-xs text-slate-500">{label}</p>
      <div className="flex h-12 items-center rounded-[1rem] border border-[#eadfce] bg-[#fffdf9] px-4 text-sm text-slate-400">
        {value}
      </div>
    </div>
  );
}

function ProfessionCard({
  title,
  subtitle,
  image,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  image: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.35rem] border border-[#eadfce] bg-[#fbf4ea] shadow-sm">
      <div className="absolute inset-y-0 left-0 z-10 w-[58%] bg-[linear-gradient(90deg,rgba(251,244,234,0.98),rgba(251,244,234,0.92),rgba(251,244,234,0))]" />
      <div className="relative z-20 flex min-h-[6.2rem] items-center gap-3 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#c49553] shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        <div className="max-w-[10rem]">
          <p className="text-[1rem] leading-5 text-slate-900 [font-family:Georgia,serif]">{title}</p>
          <p className="mt-1 text-xs leading-4 text-slate-500">{subtitle}</p>
        </div>
      </div>
      <Image src={image} alt={title} width={1400} height={700} className="absolute inset-y-0 right-0 h-full w-[58%] object-cover object-center transition-transform duration-300 group-hover:scale-105" />
    </div>
  );
}

function TrainerLine({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[1.2rem] border border-[#f0e5d8] bg-white px-4 py-3 shadow-sm">
      <div className="mt-1 h-9 w-9 rounded-full bg-[#eef6ef]" />
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
      </div>
    </div>
  );
}
