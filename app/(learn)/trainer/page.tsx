import Link from "next/link";
import { CalendarDays, Heart, MessageCircle, Mic, Settings2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MobileTabs } from "@/components/concept27/mobile-tabs";

export const metadata = { title: `Trainer – ${APP_NAME}` };

const trainerActions = [
  {
    title: "Termin vereinbaren",
    text: "Buche dein nächstes Gespräch.",
    icon: CalendarDays,
    href: "/trainer/fachwortschatz",
    tone: "sage",
  },
  {
    title: "Nachricht schreiben",
    text: "Stelle Fragen oder teile etwas.",
    icon: MessageCircle,
    href: "/trainer/sprechen",
    tone: "peach",
  },
  {
    title: "Feedback erhalten",
    text: "Ich prüfe deine letzte Aufgabe.",
    icon: Settings2,
    href: "/trainer/grammatik",
    tone: "sand",
  },
];

export default function TrainerPage() {
  return (
    <div className="mx-auto w-full max-w-[380px] rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffefb_0%,#fffaf5_100%)] px-5 pb-5 pt-4 shadow-[0_28px_60px_-38px_rgba(101,79,50,0.22)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[2rem] text-slate-900 [font-family:Georgia,serif]">Dein Trainer</p>
          <p className="mt-3 max-w-[220px] text-sm leading-6 text-slate-500">
            Persönliche Unterstützung für deinen Lernerfolg.
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#eadfce] bg-white shadow-sm">
          <MessageCircle className="h-4 w-4 text-slate-500" />
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(180deg,#eef7f4_0%,#fff2e8_100%)] text-lg font-semibold text-[#5c9c88] shadow-sm">
            LH
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[1.45rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
              Lea Hoffmann
            </p>
            <p className="mt-1 text-sm text-slate-500">Deine Sprachtrainerin</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5c9c88]" />
              <span className="text-xs text-slate-500">Online</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              „Weiter so! Du machst großartige Fortschritte. Ich begleite dich
              auf deinem Weg zu mehr Sicherheit.“
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {trainerActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-4 rounded-[1.35rem] border border-[#f0e5d8] bg-white px-4 py-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  action.tone === "peach"
                    ? "bg-[#fff1e8] text-[#d69061]"
                    : action.tone === "sand"
                      ? "bg-[#faf1df] text-[#b88a4a]"
                      : "bg-[#eef7f4] text-[#5c9c88]"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">{action.title}</p>
                <p className="text-sm leading-6 text-slate-500">{action.text}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3">
        <Link href="/trainer/nomen-verb" className="rounded-[1.35rem] border border-[#eadfce] bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5">
          <p className="text-sm font-medium text-slate-900">Nomen-Verb</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Trainiere feste Wendungen für Beruf und Prüfung.
          </p>
        </Link>
        <Link href="/trainer/fachwortschatz" className="rounded-[1.35rem] border border-[#eadfce] bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5">
          <p className="text-sm font-medium text-slate-900">Fachwortschatz</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Lerne relevante Begriffe direkt im Kontext.
          </p>
        </Link>
      </div>

      <Button asChild className="mt-5 h-11 w-full rounded-[1rem] bg-[#5c9c88] text-base text-white hover:bg-[#538d7a]">
        <Link href="/trainer/sprechen">
          Nachricht schreiben
          <Mic className="ml-2 h-4 w-4" />
        </Link>
      </Button>

      <div className="mt-4 rounded-[1.35rem] border border-[#f0e5d8] bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdf2ea] text-[#d69061]">
            <Heart className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm text-slate-900">Motivation & Tipps</p>
            <p className="text-xs text-slate-500">Wir sind für dich da, bei jedem Schritt.</p>
          </div>
        </div>
      </div>

      <MobileTabs active="trainer" />
    </div>
  );
}
