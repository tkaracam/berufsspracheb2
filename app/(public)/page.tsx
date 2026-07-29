import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";
import { getBerufsfelder } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { communicationModules } from "@/lib/communication-data";
import { examModules } from "@/lib/exam-data";

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

export default async function HomePage() {
  const [{ user }, berufsfelder] = await Promise.all([getSession(), getBerufsfelder()]);
  const primaryHref = user ? "/dashboard" : "/register";
  const primaryLabel = user ? "Zum Dashboard" : "Jetzt kostenlos starten";
  const stats = [
    { value: `${berufsfelder.length}`, label: "Berufsfelder", icon: Briefcase },
    { value: `${communicationModules.length}`, label: "Kommunikationsmodule", icon: MessageCircle },
    { value: `${examModules.length}`, label: "Prüfungsmodule", icon: Trophy },
    { value: "Desktop + Mobil", label: "Responsives Lernen", icon: Users },
  ];

  return (
    <div className="relative overflow-hidden">
      <section className="px-4 pb-18 pt-20 sm:pt-24 lg:pb-28 lg:pt-32">
        <Container>
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.02fr]">
            <div className="animate-fade-in-up">
              <div className="editorial-badge">
                <Sparkles className="h-4 w-4" />
                Deutsch B2 für Beruf, Kurs und Prüfung
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[4.5rem] lg:leading-[0.98]">
                Sprache für
                <br />
                Ihren Beruf.
                <br />
                <span className="text-[#73beb2]">
                  Klar. Sicher.
                </span>
                <br />
                Wirksam.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {APP_NAME} verbindet Fachwortschatz, Kommunikation und
                prüfungsnahe Inhalte in einer hochwertigen Weboberfläche, die
                ruhig wirkt und direkt in die passenden Lernbereiche führt.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full bg-[#0f4f55] px-7 text-base hover:bg-[#0c4348]">
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7 text-base">
                  <Link href="/berufsfelder">Berufsfelder entdecken</Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="glass-panel rounded-[1.5rem] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Kurze Lerneinheiten</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Direkt startbar und leicht in den Alltag integrierbar.</p>
                  </div>
                </div>
                <div className="glass-panel rounded-[1.5rem] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Beruflich relevant</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Inhalte für reale Situationen im Beruf und im Kurs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="editorial-shell relative overflow-hidden p-5">
                <div className="pointer-events-none absolute inset-0 editorial-grid opacity-25" />
                <div className="grid gap-4">
                  <div className="relative overflow-hidden rounded-[1.7rem] border border-[#eadfce] bg-white">
                    <div className="absolute inset-y-0 left-0 w-[42%] bg-[linear-gradient(90deg,rgba(255,252,247,0.98)_0%,rgba(255,252,247,0.76)_65%,transparent_100%)]" />
                    <Image
                      src="/images/professions/office.png"
                      alt="Beruflicher Erfolg"
                      width={1600}
                      height={1000}
                      className="h-[18rem] w-full object-cover sm:h-[22rem] lg:h-[28rem]"
                    />
                    <div className="absolute left-6 top-6 max-w-xs">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f6d47]">
                        Editorial Einstieg
                      </p>
                      <p className="mt-3 max-w-[13rem] text-2xl font-semibold leading-tight text-foreground sm:max-w-xs sm:text-3xl">
                        Lernen mit Struktur und beruflicher Relevanz.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        title: "Gesundheit & Pflege",
                        text: "Sprache für Betreuung und Patientenkommunikation.",
                        image: "/images/professions/healthcare.png",
                      },
                      {
                        title: "Büro & Verwaltung",
                        text: "E-Mails, Telefonate und Arbeitsabläufe sicher nutzen.",
                        image: "/images/professions/office.png",
                      },
                      {
                        title: "Handel & Logistik",
                        text: "Praxisnahe Begriffe für Lager, Kundenkontakt und Prozesse.",
                        image: "/images/professions/logistics.png",
                      },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href="/berufsfelder"
                        className="group editorial-card overflow-hidden p-0 transition-all hover:-translate-y-1"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={1200}
                          height={900}
                          className="h-36 w-full object-cover sm:h-40"
                        />
                        <div className="p-4">
                          <p className="text-base font-semibold text-foreground">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                        </div>
                      </Link>
                    ))}
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
              Ruhige Technologie statt visuellem Lärm.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Die Oberfläche setzt auf Ruhe, klare Wege und berufliche Praxis.
              So fühlt sich Lernen wertiger an und der Einstieg wird deutlich leichter.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="editorial-card p-6 transition-all hover:-translate-y-1"
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

      <section className="section-padding">
        <Container>
          <div className="editorial-shell p-8 sm:p-10">
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
                <Button asChild size="lg" className="rounded-full">
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
                    className="group editorial-card p-5 transition-all hover:-translate-y-1"
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
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="editorial-shell p-6 sm:p-10">
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
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f4f55_0%,#2f7c78_44%,#73beb2_100%)] p-8 text-primary-foreground shadow-[0_30px_90px_-40px_rgba(15,79,85,0.46)] sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0 editorial-grid opacity-10" />
            <div className="pointer-events-none absolute right-[-8%] top-[-18%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16)_0%,transparent_72%)] blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="mt-4 text-base opacity-90 sm:text-lg">
                Starte jetzt kostenlos und entdecke, wie schnell du dich im Berufsalltag sicherer fühlst.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-8 text-base">
                  <Link href={primaryHref}>{primaryLabel}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-primary-foreground/30 bg-white/8 px-8 text-base text-primary-foreground hover:bg-white/12">
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
