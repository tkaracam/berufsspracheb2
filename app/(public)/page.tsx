import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Briefcase,
  Flame,
  GraduationCap,
  Heart,
  HeartPulse,
  Home,
  Menu,
  MessageCircle,
  Mic,
  Settings2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

const homeBullets = [
  "Gezielt Deutsch lernen.",
  "Sicher im Beruf kommunizieren.",
  "Selbstbewusst wachsen.",
];

const featureCaptions = [
  {
    title: "Home",
    text: "Einladend und motivierend. Starte jetzt deinen Weg.",
    icon: Home,
    tone: "mint" as const,
  },
  {
    title: "Login",
    text: "Einfach, sicher und schnell anmelden.",
    icon: UserRound,
    tone: "mint" as const,
  },
  {
    title: "Dashboard",
    text: "Dein Fortschritt im Blick. Persönlich und ermutigend.",
    icon: GraduationCap,
    tone: "mint" as const,
  },
  {
    title: "Berufsfelder",
    text: "Lerne gezielt für deinen Beruf. Praxisnah und relevant.",
    icon: Briefcase,
    tone: "gold" as const,
  },
  {
    title: "Trainer",
    text: "Persönliche Begleitung, die dich weiterbringt.",
    icon: UserRound,
    tone: "mint" as const,
  },
];

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <div className="relative overflow-hidden px-4 pb-16 pt-8 md:pb-24 md:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.75),transparent_30%),radial-gradient(circle_at_top_right,rgba(235,247,242,0.72),transparent_26%),linear-gradient(180deg,#fffdf9_0%,#fff8f2_52%,#fbf7f0_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(220,206,186,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(220,206,186,0.13)_1px,transparent_1px)] [background-size:58px_58px]" />

      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-72 w-72 bg-[radial-gradient(circle,rgba(233,218,197,0.7),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-80 w-80 bg-[radial-gradient(circle,rgba(226,243,236,0.72),transparent_70%)] blur-3xl" />

      <section className="mx-auto max-w-[1440px]">
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

        <div className="mt-10 overflow-x-auto pb-6">
          <div className="mx-auto flex w-max min-w-full items-start justify-center gap-7 px-1">
            <PhoneShell className="w-[268px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900">
                  <MiniBubble />
                  <span className="text-[0.92rem] [font-family:Georgia,serif]">{APP_NAME}</span>
                </div>
                <Menu className="h-4 w-4 text-slate-500" />
              </div>

              <div className="mt-7">
                <h1 className="text-[2.3rem] leading-[0.98] text-slate-900 [font-family:Georgia,serif]">
                  Sprache
                  <br />
                  öffnet Türen.
                  <br />
                  <span className="text-[#73beb2]">Wir öffnen sie</span>
                  <br />
                  <span className="text-[#73beb2]">mit dir.</span>
                </h1>
                <div className="mt-6 space-y-1 text-[0.93rem] leading-7 text-slate-600">
                  {homeBullets.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[1.9rem] bg-[linear-gradient(180deg,#edf6ef_0%,#fbf4e8_100%)] p-3">
                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#d8ece4]" />
                <div className="absolute bottom-4 right-4 h-24 w-24 rounded-[1.8rem] border border-[#e0cfba] bg-white/35" />
                <Image
                  src="/concept27/home-hero-woman.png"
                  alt="Lernende Frau"
                  width={920}
                  height={1600}
                  className="relative z-10 h-[285px] w-full object-contain object-bottom"
                />
              </div>

              <div className="mt-5 space-y-3">
                <Button asChild className="h-11 w-full rounded-[1rem] bg-[#73beb2] text-base text-white hover:bg-[#64aea3]">
                  <Link href={user ? "/dashboard" : "/register"}>
                    {user ? "Weiterlernen" : "Jetzt starten"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 w-full rounded-[1rem] border-[#eadfce] bg-white text-base hover:bg-white">
                  <Link href="/berufsfelder">Mehr erfahren</Link>
                </Button>
              </div>
            </PhoneShell>

            <PhoneShell className="w-[268px]">
              <div className="flex items-center justify-between">
                <ArrowLeft className="h-4 w-4 text-slate-500" />
                <MiniBubble large />
                <span className="w-4" />
              </div>

              <div className="mt-7 text-center">
                <p className="text-[1.8rem] text-slate-900 [font-family:Georgia,serif]">{APP_NAME}</p>
                <p className="mt-8 text-[2.05rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                  Willkommen zurück!
                </p>
                <p className="mt-2 text-sm text-slate-500">Schön, dass du da bist.</p>
              </div>

              <div className="mt-8 space-y-4">
                <FormField label="E-Mail-Adresse" placeholder="Deine E-Mail-Adresse" />
                <FormField label="Passwort" placeholder="Dein Passwort" />
                <div className="text-right text-xs text-[#73beb2]">Passwort vergessen?</div>
                <div className="flex h-11 items-center justify-center rounded-[1rem] bg-[#73beb2] text-base font-medium text-white">
                  Anmelden
                </div>
              </div>

              <div className="mt-6 text-center text-xs text-slate-400">oder weiter mit</div>
              <div className="mt-5 flex items-center justify-center gap-4">
                <SocialSquare label="G" />
                <SocialSquare label="" />
              </div>
              <p className="mt-8 text-center text-sm text-slate-500">
                Noch kein Konto? <span className="text-[#73beb2]">Konto erstellen</span>
              </p>
            </PhoneShell>

            <PhoneShell className="w-[288px]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[2rem] leading-none text-slate-900 [font-family:Georgia,serif]">
                    Hallo, Anna! <span className="text-base">👋</span>
                  </p>
                  <p className="mt-3 max-w-[180px] text-sm leading-6 text-slate-500">
                    Weiter so! Du bist auf einem guten Weg.
                  </p>
                </div>
                <Bell className="mt-1 h-4 w-4 text-slate-500" />
              </div>

              <Panel>
                <p className="text-sm text-slate-700">Dein Fortschritt</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-[8px] border-[#73beb2] border-r-[#e8efea] border-t-[#e8efea]">
                    <span className="text-[2rem] font-semibold text-slate-900">72%</span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div>
                      <p className="text-xs text-slate-400">Aktuelles Level</p>
                      <p>Fortgeschritten B2</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Nächstes Ziel</p>
                      <p>Komplexe Gespräche sicher führen</p>
                    </div>
                    <p className="text-[#73beb2]">Fortschritt ansehen</p>
                  </div>
                </div>
              </Panel>

              <Panel className="mt-4">
                <p className="text-sm text-slate-600">Weiterlernen</p>
                <p className="mt-2 text-sm font-medium text-slate-900">Modul 4 · Einheit 12</p>
                <p className="text-sm text-slate-900">Besprechungen leiten</p>
                <div className="mt-4 h-2 rounded-full bg-[#edf0ec]">
                  <div className="h-2 w-[60%] rounded-full bg-[#73beb2]" />
                </div>
                <div className="mt-4 flex h-10 items-center justify-center rounded-[1rem] bg-[#73beb2] text-sm font-medium text-white">
                  Weiterlernen
                </div>
              </Panel>

              <Panel className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-700">Tägliche Übung</p>
                  <p className="mt-1 text-xs text-slate-500">15 Minuten üben</p>
                  <p className="text-xs text-slate-400">5 / 15 Min.</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3e8] text-[#f19a4f]">
                  <Flame className="h-5 w-5" />
                </div>
              </Panel>

              <BottomTabs
                items={[
                  { label: "Übersicht", icon: Home, active: false },
                  { label: "Lernen", icon: BookOpen, active: false },
                  { label: "Berufsfelder", icon: Briefcase, active: true },
                  { label: "Trainer", icon: MessageCircle, active: false },
                  { label: "Profil", icon: UserRound, active: false },
                ]}
              />
            </PhoneShell>

            <PhoneShell className="w-[288px]">
              <div className="flex items-center justify-between">
                <ArrowLeft className="h-4 w-4 text-slate-500" />
                <span className="w-4" />
              </div>
              <p className="mt-4 text-[2rem] text-slate-900 [font-family:Georgia,serif]">Berufsfelder</p>
              <p className="mt-3 max-w-[220px] text-sm leading-6 text-slate-500">
                Wähle dein Berufsfeld und lerne gezielt die Sprache, die du brauchst.
              </p>

              <div className="mt-5 space-y-3">
                <FieldCard
                  title="Gesundheit & Pflege"
                  text="Kommunikation mit Menschen im Fokus"
                  image="/concept27/beruf-healthcare.png"
                  icon={HeartPulse}
                />
                <FieldCard
                  title="Wirtschaft & Verwaltung"
                  text="Professionell in Organisation und Büro"
                  image="/concept27/beruf-office.png"
                  icon={Briefcase}
                />
                <FieldCard
                  title="Technik & Handwerk"
                  text="Klare Sprache für technische Berufe"
                  image="/concept27/beruf-technical.png"
                  icon={Settings2}
                />
                <FieldCard
                  title="Gastronomie & Hotel"
                  text="Gastfreundlich kommunizieren"
                  image="/concept27/beruf-hospitality.png"
                  icon={Briefcase}
                />
              </div>

              <BottomTabs
                items={[
                  { label: "Übersicht", icon: Home, active: false },
                  { label: "Lernen", icon: BookOpen, active: false },
                  { label: "Berufsfelder", icon: Briefcase, active: true },
                  { label: "Trainer", icon: MessageCircle, active: false },
                  { label: "Profil", icon: UserRound, active: false },
                ]}
              />
            </PhoneShell>

            <PhoneShell className="w-[288px]">
              <div className="flex items-center justify-between">
                <ArrowLeft className="h-4 w-4 text-slate-500" />
                <span className="w-4" />
              </div>
              <p className="mt-4 text-[2rem] text-slate-900 [font-family:Georgia,serif]">Dein Trainer</p>
              <p className="mt-3 max-w-[220px] text-sm leading-6 text-slate-500">
                Wir begleiten dich auf deinem Lernweg.
              </p>

              <Panel className="mt-5">
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
                    <p className="text-[1.45rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                      Lea Schneider
                    </p>
                    <p className="text-sm text-slate-500">DaF-Expertin · B2-Spezialistin</p>
                    <p className="mt-2 text-sm text-[#f19a4f]">★ 4,9 · 128 Bewertungen</p>
                  </div>
                </div>
              </Panel>

              <div className="mt-4 space-y-3">
                <TrainerCard
                  title="Persönliche Unterstützung"
                  text="Individuelles Feedback für deine Fortschritte."
                  icon={MessageCircle}
                />
                <TrainerCard
                  title="Lernplan anpassen"
                  text="Wir passen deinen Plan an deine Ziele an."
                  icon={Settings2}
                />
                <TrainerCard
                  title="Motivation & Tipps"
                  text="Wir sind für dich da – bei jedem Schritt."
                  icon={Heart}
                />
              </div>

              <Button asChild className="mt-5 h-11 w-full rounded-[1rem] bg-[#73beb2] text-base text-white hover:bg-[#64aea3]">
                <Link href={user ? "/trainer" : "/register"}>
                  Nachricht schreiben
                  <Mic className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <BottomTabs
                items={[
                  { label: "Übersicht", icon: Home, active: false },
                  { label: "Lernen", icon: BookOpen, active: false },
                  { label: "Berufsfelder", icon: Briefcase, active: false },
                  { label: "Trainer", icon: MessageCircle, active: true },
                  { label: "Profil", icon: UserRound, active: false },
                ]}
              />
            </PhoneShell>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1320px] gap-6 md:grid-cols-5">
          {featureCaptions.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                    item.tone === "gold"
                      ? "bg-[#ecd4a8] text-[#7e6032]"
                      : "bg-[#86c8be] text-white"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-[2rem] text-slate-900 [font-family:Georgia,serif]">
                  {item.title}
                </p>
                <p className="mx-auto mt-3 max-w-[180px] text-base leading-7 text-slate-600">
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

function BrandBubble() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center text-[#73beb2] md:h-20 md:w-20">
      <div className="absolute inset-0 rounded-full border-[2.5px] border-current/90" />
      <div className="absolute bottom-[5px] left-[5px] h-3 w-3 rotate-12 rounded-bl-md border-b-[2.5px] border-l-[2.5px] border-current/90 md:bottom-[8px] md:left-[8px] md:h-4 md:w-4" />
      <span className="relative text-[2rem] [font-family:Georgia,serif] md:text-[2.5rem]">B2</span>
    </div>
  );
}

function MiniBubble({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center text-[#73beb2] ${
        large ? "h-16 w-16" : "h-7 w-7"
      }`}
    >
      <div className="absolute inset-0 rounded-full border-[2px] border-current/85" />
      <div
        className={`absolute rotate-12 rounded-bl-md border-b-[2px] border-l-[2px] border-current/85 ${
          large ? "bottom-[4px] left-[4px] h-3 w-3" : "bottom-[1px] left-[1px] h-1.5 w-1.5"
        }`}
      />
      <span className={`relative [font-family:Georgia,serif] ${large ? "text-[1.8rem]" : "text-[0.9rem]"}`}>B2</span>
    </div>
  );
}

function PhoneShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[2.65rem] border border-[#e7d9c7] bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_100%)] p-[6px] shadow-[0_28px_64px_-36px_rgba(138,116,83,0.36)] ${className ?? ""}`}>
      <div className="rounded-[2.3rem] border border-[#eadfce] bg-white px-5 pb-5 pt-4">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#243042]" />
        {children}
      </div>
    </div>
  );
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-5 rounded-[1.45rem] border border-[#f0e5d8] bg-white p-4 shadow-sm ${className ?? ""}`}>
      {children}
    </div>
  );
}

function FormField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs text-slate-500">{label}</p>
      <div className="flex h-11 items-center rounded-[1rem] border border-[#eadfce] bg-[#fffdf9] px-4 text-sm text-slate-400">
        {placeholder}
      </div>
    </div>
  );
}

function SocialSquare({ label }: { label: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[#eadfce] bg-white text-lg shadow-sm">
      {label}
    </div>
  );
}

function FieldCard({
  title,
  text,
  image,
  icon: Icon,
}: {
  title: string;
  text: string;
  image: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.35rem] border border-[#eadfce] bg-[#fbf4ea] shadow-sm">
      <div className="absolute inset-y-0 left-0 z-10 w-[58%] bg-[linear-gradient(90deg,rgba(251,244,234,0.98),rgba(251,244,234,0.92),rgba(251,244,234,0))]" />
      <div className="relative z-20 flex min-h-[92px] items-center gap-3 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#c49553] shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        <div className="max-w-[150px]">
          <p className="text-[1rem] leading-5 text-slate-900 [font-family:Georgia,serif]">
            {title}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        width={1400}
        height={700}
        className="absolute inset-y-0 right-0 h-full w-[58%] object-cover object-center"
      />
    </div>
  );
}

function TrainerCard({
  title,
  text,
  icon: Icon,
}: {
  title: string;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[1.3rem] border border-[#f0e5d8] bg-white px-4 py-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef6ef] text-[#73beb2]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function BottomTabs({
  items,
}: {
  items: { label: string; icon: LucideIcon; active: boolean }[];
}) {
  return (
    <div className="mt-5 flex items-center justify-between border-t border-[#f0e5d8] pt-3 text-[0.68rem] text-slate-400">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-1 ${
              item.active ? "text-[#73beb2]" : ""
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
