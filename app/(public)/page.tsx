import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Users,
  Trophy,
  Target,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

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
    icon: Briefcase,
  },
  {
    title: "Lernbereiche",
    text: "Grammatik, Redemittel, Lesen, Schreiben, Hören und Sprechen.",
    href: "/kommunikation",
    icon: BookOpen,
  },
  {
    title: "Prüfungstraining",
    text: "Übe gezielt für berufssprachliche Aufgaben und B2-nahe Formate.",
    href: "/pruefungstraining",
    icon: Trophy,
  },
];

const stats = [
  { value: "1.200+", label: "Lerninhalte", icon: BookOpen },
  { value: "6", label: "Berufsfelder", icon: Briefcase },
  { value: "4", label: "Fertigkeiten", icon: Target },
  { value: "100%", label: "Responsiv", icon: Users },
];

export default async function HomePage() {
  const { user } = await getSession();
  const primaryHref = user ? "/dashboard" : "/register";
  const primaryLabel = user ? "Zum Dashboard" : "Jetzt kostenlos starten";

  return (
    <div className="relative overflow-hidden">
      <section className="px-4 pb-16 pt-20 sm:pt-24 lg:pb-24 lg:pt-32">
        <Container>
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Deutsch für den Beruf. Sicher. Klar. Kompetent.
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Sprache für{" "}
                <span className="text-primary">Beruf, Kurs</span> und Zukunft.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {APP_NAME} ist eine moderne Lernplattform für Berufssprache B2.
                Trainiere Fachwortschatz, Kommunikation und prüfungsnahe Inhalte
                in einer klaren, ruhigen und vollständig responsiven Weboberfläche.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6 text-base">
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6 text-base">
                  <Link href="/berufsfelder">Berufsfelder entdecken</Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Kurze Lerneinheiten</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Direkt startbar und leicht in den Alltag integrierbar.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Beruflich relevant</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Inhalte für reale Situationen im Beruf und im Kurs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-slate-900/5">
                <div className="grid gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Berufssprache B2
                    </p>
                    <p className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">
                      Klar lernen.
                      <br />
                      Sicher kommunizieren.
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                      Eine ruhige Lernumgebung mit klaren Wegen durch Fachwortschatz,
                      Berufsfelder und B2-Training.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-lg font-bold text-foreground">
                        Fachwortschatz
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Begriffe, die du im beruflichen Alltag wirklich brauchst.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-lg font-bold text-foreground">
                        Lernwege
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Strukturierte Inhalte für Kurs, Prüfung und Beruf.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Warum diese Plattform</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Eine responsive Website, die sich auf jedem Gerät gut anfühlt.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Keine App-Mockups, keine künstliche Handy-Ansicht. Stattdessen eine
              echte Webplattform, die auf Desktop, Tablet und Mobil sauber,
              lesbar und ruhig funktioniert.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-lg font-bold text-foreground">
                    {feature.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-primary/[0.03]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Schneller Einstieg</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Finde deinen passenden Lernweg.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Starte über Berufsfelder, gehe direkt in Lernbereiche oder trainiere
                gezielt für berufssprachliche Prüfungsformate.
              </p>
              <div className="mt-8 hidden lg:block">
                <Button asChild size="lg">
                  <Link href="/register">
                    Kostenlos registrieren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {pathways.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-lg font-bold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-slate-900/5 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/90 p-8 text-primary-foreground shadow-xl shadow-primary/20 sm:p-12 lg:p-16">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="mt-4 text-base opacity-90 sm:text-lg">
                Starte jetzt kostenlos und entdecke, wie schnell du dich im Berufsalltag sicherer fühlst.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href={primaryHref}>{primaryLabel}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/berufsfelder">Berufsfelder entdecken</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
