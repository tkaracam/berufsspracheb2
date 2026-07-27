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
import { FaqSection } from "@/components/home/faq-section";

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

const examFaqs = [
  {
    question: "Wie ist der Aufbau der DTB B2-Prüfung?",
    answer:
      "Die Prüfung besteht aus den vier Teilen Lesen, Hören, Schreiben und Sprechen. Der schriftliche Teil wird in einem Block absolviert, der mündliche Teil meist an einem separaten Termin.",
  },
  {
    question: "Wie viele Punkte brauche ich zum Bestehen?",
    answer: `Insgesamt gibt es ${examInfo.totalPoints} Punkte. Zum Bestehen benötigen Sie mindestens ${Math.round(examInfo.totalPoints * (examInfo.passPercentage / 100))} Punkte. Außerdem müssen in mindestens 3 der 4 Fertigkeiten jeweils ${examInfo.minSkillPoints} Punkte erreicht werden.`,
  },
  {
    question: "Was passiert, wenn ich in einer Fertigkeit durchfalle?",
    answer:
      "Eine Fertigkeit kann zwischen 45 % und 60 % liegen, wenn die anderen Fertigkeiten und die Gesamtpunktzahl ausreichend sind. Dies wird als Ausgleichsregelung bezeichnet.",
  },
  {
    question: "Wie lange dauert die schriftliche Prüfung?",
    answer: `Der schriftliche Teil dauert ${examInfo.writtenDurationMinutes} Minuten. Der mündliche Teil dauert etwa ${examInfo.oralDurationMinutes} Minuten.`,
  },
];

export default function PruefungstrainingPage() {
  const passPoints = Math.round(examInfo.totalPoints * (examInfo.passPercentage / 100));

  return (
    <div className="relative flex-1 overflow-hidden py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-rose-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">
            DTB B2 – Prüfungstraining
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Zielgerichtet auf den Deutsch-Test für den Beruf B2 vorbereiten:
            Lesen, Hören, Schreiben und Sprechen.
          </p>
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
              <Card key={stat.label} className="text-center transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mb-12 max-w-3xl rounded-xl border bg-muted/30 p-5 text-center text-sm text-muted-foreground">
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
          <h2 className="mb-6 text-center text-2xl font-bold">
            Schnellstart
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {START_MODULES.map((m) => (
              <Link key={m.title} href={m.href} className="group block">
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/40">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{m.title}</p>
                    </div>
                    <Play className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FaqSection faqs={examFaqs} title="Fragen zur Prüfung" subtitle="Wichtige Antworten zum DTB B2." />
    </div>
  );
}
