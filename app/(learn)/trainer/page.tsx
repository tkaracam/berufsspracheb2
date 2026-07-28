import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Mic, Settings2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata = { title: `Trainer – ${APP_NAME}` };

const trainerActions = [
  { title: "Persönliche Unterstützung", text: "Individuelles Feedback für deine Fortschritte.", icon: MessageCircle, href: "/trainer/fachwortschatz" },
  { title: "Lernplan anpassen", text: "Wir passen deinen Plan an deine Ziele an.", icon: Settings2, href: "/dashboard" },
  { title: "Motivation & Tipps", text: "Wir sind für dich da – bei jedem Schritt.", icon: Heart, href: "/trainer/grammatik" },
];

export default function TrainerPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2.2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff6eb_55%,#f5fbf6_100%)] p-6 shadow-[0_24px_60px_-34px_rgba(138,116,83,0.18)] md:p-8">
        <p className="text-[2.2rem] text-slate-900 [font-family:Georgia,serif]">Dein Trainer</p>
        <p className="mt-2 max-w-md text-slate-600">Wir begleiten dich auf deinem Lernweg.</p>

        <div className="mt-6 rounded-[1.6rem] border border-[#f0e5d8] bg-white p-5 shadow-sm">
          <div className="flex gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#f6eee3]">
              <Image src="/concept27/trainer-lea.png" alt="Trainerin Lea Schneider" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400">Deine Trainerin</p>
              <p className="text-[1.45rem] text-slate-900 [font-family:Georgia,serif]">Lea Schneider</p>
              <p className="text-sm text-slate-500">DaF-Expertin · B2-Spezialistin</p>
              <p className="mt-3 text-sm text-[#f19a4f]">★ 4,9 · 128 Bewertungen</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {trainerActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href} className="flex items-center gap-4 rounded-[1.35rem] border border-[#f0e5d8] bg-white px-4 py-4 shadow-sm transition-transform hover:-translate-y-0.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5ef] text-[#73beb2]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{action.title}</p>
                  <p className="text-sm leading-6 text-slate-500">{action.text}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <Button asChild className="mt-6 h-12 w-full rounded-[1rem] bg-[#73beb2] text-base hover:bg-[#64aea3]">
          <Link href="/trainer/sprechen">
            Nachricht schreiben
            <Mic className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section className="rounded-[2.2rem] border border-[#eadfce] bg-white p-6 shadow-[0_20px_50px_-34px_rgba(138,116,83,0.14)] md:p-8">
        <h2 className="text-xl text-slate-900 [font-family:Georgia,serif]">Schneller Einstieg</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Link href="/trainer/fachwortschatz" className="rounded-[1.4rem] border border-[#eadfce] bg-[#fffdf9] p-5 shadow-sm transition-transform hover:-translate-y-0.5">
            <p className="text-base font-medium text-slate-900">Fachwortschatz</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Lerne relevante Begriffe direkt im Kontext.</p>
          </Link>
          <Link href="/trainer/nomen-verb" className="rounded-[1.4rem] border border-[#eadfce] bg-[#fffdf9] p-5 shadow-sm transition-transform hover:-translate-y-0.5">
            <p className="text-base font-medium text-slate-900">Nomen-Verb</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Trainiere feste Wendungen für Beruf und Prüfung.</p>
          </Link>
          <Link href="/trainer/grammatik" className="rounded-[1.4rem] border border-[#eadfce] bg-[#fffdf9] p-5 shadow-sm transition-transform hover:-translate-y-0.5">
            <p className="text-base font-medium text-slate-900">Grammatik</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Wichtige Strukturen sicher und klar anwenden.</p>
          </Link>
          <Link href="/trainer/sprechen" className="rounded-[1.4rem] border border-[#eadfce] bg-[#fffdf9] p-5 shadow-sm transition-transform hover:-translate-y-0.5">
            <p className="text-base font-medium text-slate-900">Sprechen</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Übe Antworten, Reaktionen und Alltagssituationen.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
