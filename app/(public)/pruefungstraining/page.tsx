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
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

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
    <div className="section-padding">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/30 via-background to-primary/10 p-6 shadow-lg shadow-slate-900/5 sm:p-10 lg:p-12">
          <div className="relative z-10 max-w-3xl">
            <Badge variant="accent" className="mb-4">
              DTB B2 Vorbereitung
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Prüfungstraining
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Bereiten Sie sich gezielt auf Lesen, Hören, Schreiben und
              Sprechen im Deutsch-Test für den Beruf B2 vor.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Target, value: `${examInfo.totalPoints}`, label: "Punkte gesamt" },
            { icon: CheckCircle, value: `${passPoints}`, label: `Bestehen ab` },
            { icon: Clock, value: `${examInfo.writtenDurationMinutes}`, label: "Min. Schriftlich" },
            { icon: Mic, value: `${examInfo.oralDurationMinutes}`, label: "Min. Mündlich" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="p-5">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-center text-sm text-muted-foreground shadow-sm">
          In mindestens 3 der 4 Fertigkeiten müssen {examInfo.minSkillPoints} Punkte erreicht werden.
          Eine Fertigkeit kann zwischen {examInfo.compensableMinPercentage}% und 60% liegen.
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
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

        <div className="mt-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
            Schnellstart
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {START_MODULES.map((m) => (
              <Link key={m.title} href={m.href} className="group block">
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{m.title}</p>
                    </div>
                    <Play className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
