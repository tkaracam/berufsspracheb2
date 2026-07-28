import Link from "next/link";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Puzzle,
  MessageCircle,
  Play,
  Target,
  Clock,
  CheckCircle,
  ClipboardList,
  List,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { examModules, examInfo } from "@/lib/exam-data";
import { ExamModuleCard } from "@/components/exam-module-card";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: `Prüfungstraining DTB B2 – ${APP_NAME}`,
};

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Puzzle,
  MessageCircle,
};

const START_MODULES = [
  { title: "Lesen Teil 1", href: "/pruefungstraining/lesen/teil-1", icon: List },
  { title: "Lesen Teil 2–4", href: "/pruefungstraining/lesen", icon: BookOpen },
  { title: "Hören", href: "/pruefungstraining/hoeren", icon: Headphones },
  {
    title: "Hören und Schreiben",
    href: "/pruefungstraining/hoeren-schreiben",
    icon: ClipboardList,
  },
  {
    title: "Sprachbausteine",
    href: "/pruefungstraining/sprachbausteine",
    icon: Puzzle,
  },
  { title: "Schreiben", href: "/pruefungstraining/schreiben", icon: PenTool },
  { title: "Sprechen", href: "/pruefungstraining/sprechen", icon: Mic },
];

export default function PruefungstrainingPage() {
  const passPoints = Math.round(examInfo.totalPoints * (examInfo.passPercentage / 100));

  return (
    <div className="relative flex-1 overflow-hidden py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(237,246,239,0.82),_transparent_58%)]" />
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#f5e7d6]/50 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#eef6ef]/60 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-5xl">
          <div className="rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff5eb_55%,#f4fbf6_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(115,190,178,0.16)] md:p-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-[#eadfce] bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                DTB B2 Vorbereitung
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Prüfungstraining
              </h1>
              <p className="mt-4 text-lg leading-7 text-slate-600">
                Bereiten Sie sich gezielt auf Lesen, Hören, Schreiben und
                Sprechen im Deutsch-Test für den Beruf B2 vor.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Target, value: `${examInfo.totalPoints}`, label: "Punkte gesamt" },
            { icon: CheckCircle, value: `${passPoints}`, label: `Bestehen ab` },
            { icon: Clock, value: `${examInfo.writtenDurationMinutes}`, label: "Min. Schriftlich" },
            { icon: Mic, value: `${examInfo.oralDurationMinutes}`, label: "Min. Mündlich" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="rounded-[1.6rem] border border-[#eadfce] bg-white/88 text-center transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-[#73beb2]" />
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mb-12 max-w-3xl rounded-[1.6rem] border border-[#eadfce] bg-white/85 p-5 text-center text-sm text-slate-500 shadow-[0_16px_35px_-26px_rgba(32,50,58,0.16)]">
          In mindestens 3 der 4 Fertigkeiten müssen {examInfo.minSkillPoints} Punkte erreicht werden.
          Eine Fertigkeit kann zwischen {examInfo.compensableMinPercentage}% und 60% liegen.
        </div>

        <div className="mx-auto mb-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {examModules.map((m) => {
            const Icon = ICON_MAP[m.icon] ?? BookOpen;
            return (
              <ExamModuleCard
                key={m.id}
                module={m}
                icon={<Icon className="h-6 w-6" />}
              />
            );
          })}
        </div>

        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Schnellstart
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {START_MODULES.map((m) => (
              <Link key={m.title} href={m.href} className="group block">
                <Card className="h-full rounded-[1.6rem] border border-[#eadfce] bg-white/88 transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#d9c9b3]">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef6ef] text-[#73beb2] transition-colors group-hover:bg-[#73beb2] group-hover:text-white">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{m.title}</p>
                    </div>
                    <Play className="h-4 w-4 text-slate-400 transition-colors group-hover:text-[#73beb2]" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
