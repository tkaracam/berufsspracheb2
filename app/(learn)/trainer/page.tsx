import Link from "next/link";
import { CalendarDays, Heart, MessageCircle, Mic, ArrowRight, Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: `Trainer – ${APP_NAME}` };

const trainerActions = [
  {
    title: "Termin vereinbaren",
    text: "Buche dein nächstes Gespräch.",
    icon: CalendarDays,
    href: "/trainer/fachwortschatz",
  },
  {
    title: "Nachricht schreiben",
    text: "Stelle Fragen oder teile etwas.",
    icon: MessageCircle,
    href: "/trainer/sprechen",
  },
  {
    title: "Feedback erhalten",
    text: "Ich prüfe deine letzte Aufgabe.",
    icon: Sparkles,
    href: "/trainer/grammatik",
  },
];

const trainingAreas = [
  {
    title: "Nomen-Verb",
    href: "/trainer/nomen-verb",
    description: "Trainiere feste Wendungen für Beruf und Prüfung.",
  },
  {
    title: "Fachwortschatz",
    href: "/trainer/fachwortschatz",
    description: "Lerne relevante Begriffe direkt im Kontext.",
  },
  {
    title: "Redemittel",
    href: "/trainer/redemittel",
    description: "Feste Wendungen für Diskussionen und Präsentationen.",
  },
  {
    title: "Grammatik",
    href: "/trainer/grammatik",
    description: "Wichtige Strukturen für B2 gezielt üben.",
  },
];

export default function TrainerPage() {
  return (
    <Container size="large">
      <PageHeader
        title="Dein Trainer"
        description="Persönliche Unterstützung für deinen Lernerfolg."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Trainer Profile */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/20 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-lg font-bold text-primary-foreground shadow-md shadow-primary/20">
                LH
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-extrabold text-foreground">Lea Hoffmann</p>
                <p className="text-sm text-muted-foreground">Deine Sprachtrainerin</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              „Weiter so! Du machst großartige Fortschritte. Ich begleite dich
              auf deinem Weg zu mehr Sicherheit."
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3 lg:col-span-2">
          {trainerActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-foreground">{action.title}</p>
                  <p className="text-sm text-muted-foreground">{action.text}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-foreground">Trainingsbereiche</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trainingAreas.map((area) => (
            <Link
              key={area.title}
              href={area.href}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-bold text-foreground">{area.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
              <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Starten <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-foreground">Motivation & Tipps</p>
            <p className="text-sm text-muted-foreground">Wir sind für dich da, bei jedem Schritt.</p>
          </div>
          <Button asChild className="ml-auto gap-2 rounded-xl">
            <Link href="/trainer/sprechen">
              Nachricht <Mic className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
