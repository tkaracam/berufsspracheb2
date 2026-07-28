import Link from "next/link";
import {
  Briefcase,
  BookOpen,
  MessageSquare,
  GraduationCap,
  ArrowRight,
  Headphones,
  Target,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Volume2,
  Award,
  Euro,
  Users,
  Quote,
  Star,
  CheckCircle2,
  Clock3,
  Flame,
  Layers3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { SearchHero } from "@/components/home/search-hero";
import { HeroVisual } from "@/components/home/hero-visual";
import { FaqSection } from "@/components/home/faq-section";
import { SectionHeading } from "@/components/ui/section-heading";

const areas = [
  {
    href: "/berufsfelder",
    icon: Briefcase,
    title: "Fachwortschatz",
    description: "Berufsbezogene Begriffe mit Audio und Beispielsätzen lernen.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    border: "border-t-blue-500",
  },
  {
    href: "/nomen-verb",
    icon: MessageSquare,
    title: "Nomen-Verb-Verbindungen",
    description: "Feste Wendungen für Gespräche und Schriftstücke üben.",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    border: "border-t-emerald-500",
  },
  {
    href: "/kommunikation",
    icon: BookOpen,
    title: "Kommunikation",
    description: "E-Mails, Telefonate, Meetings und Beschwerden sicher meistern.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    border: "border-t-amber-500",
  },
  {
    href: "/pruefungstraining",
    icon: GraduationCap,
    title: "Prüfungstraining",
    description: "Lesen, Hören, Schreiben und Sprechen gezielt trainieren.",
    color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    border: "border-t-rose-500",
  },
];

const stats = [
  { value: "38", label: "Berufsfelder", icon: Briefcase, color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  { value: "197", label: "Berufe", icon: Users, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  { value: "627", label: "Fachwörter", icon: BookOpen, color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  { value: "17", label: "Kommunikationsmodule", icon: MessageSquare, color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" },
];

const features = [
  {
    icon: Headphones,
    title: "Audio-Unterstützung",
    description: "Hören Sie Fachbegriffe und Redemittel in authentischer Aussprache.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Prüfungsorientiert",
    description: "Inhalte passgenau für den Berufssprachkurs B2 aufbereitet.",
    color: "from-rose-500 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "Mobil nutzbar",
    description: "Lernen Sie unterwegs – auf Smartphone, Tablet oder Desktop.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Fortschritt sichern",
    description: "Behalten Sie Ihren Lernfortschritt und Ihre Favoriten im Blick.",
    color: "from-violet-500 to-purple-500",
  },
];

const appHighlights = [
  {
    icon: Flame,
    label: "7 Tage Lernserie",
    tone: "from-orange-400 to-rose-500",
  },
  {
    icon: CheckCircle2,
    label: "Echte Berufssprache",
    tone: "from-emerald-400 to-teal-500",
  },
  {
    icon: Clock3,
    label: "10 Minuten pro Session",
    tone: "from-sky-400 to-blue-600",
  },
];

const dailyFlow = [
  {
    title: "Warm-up",
    detail: "5 neue Begriffe mit Artikel und Audio",
    accent: "bg-sky-500",
  },
  {
    title: "Anwenden",
    detail: "Redemittel und typische Berufssituationen",
    accent: "bg-emerald-500",
  },
  {
    title: "Prüfen",
    detail: "Mini-Quiz mit sofortigem Feedback",
    accent: "bg-amber-500",
  },
];

const trustBadges = [
  { icon: Award, label: "CEFR B2", color: "text-amber-500" },
  { icon: Euro, label: "Kostenlos starten", color: "text-emerald-500" },
  { icon: Volume2, label: "Audio-Unterstützung", color: "text-blue-500" },
  { icon: Smartphone, label: "Mobil optimiert", color: "text-violet-500" },
  { icon: ShieldCheck, label: "DSGVO-konform", color: "text-rose-500" },
];

const testimonials = [
  {
    quote: "Die Fachwörter mit Audio haben mir sehr geholfen. Endlich spreche ich im Gespräch mit Kollegen sicherer.",
    name: "Maria K.",
    role: "Krankenpflegerin",
    stars: 5,
  },
  {
    quote: "Besonders das Prüfungstraining ist top. Die Aufgaben sind genau wie im echten B2-Kurs.",
    name: "Ahmet Y.",
    role: "Logistikmitarbeiter",
    stars: 5,
  },
  {
    quote: "Ich kann zwischendurch auf dem Handy lernen. Die Nomen-Verb-Verbindungen sind jetzt kein Problem mehr.",
    name: "Olga S.",
    role: "Erzieherin",
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      <section className="relative overflow-hidden px-4 pb-16 pt-12 md:pb-24 md:pt-18">
        <HeroVisual />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-sky-100/60 via-background to-background dark:from-sky-950/20" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-left">
            <span className="animate-in fade-in zoom-in-95 inline-flex items-center rounded-full border border-sky-200/70 bg-white/80 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur dark:border-sky-800 dark:bg-slate-950/60 dark:text-sky-300">
              Berufssprachkurs B2 als moderne Lern-App
            </span>

            <h1 className="animate-in fade-in slide-in-from-bottom-4 mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Deutsch lernen wie in einer
              {" "}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
                starken Lern-App
              </span>
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-4 delay-150 mt-5 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              {APP_DESCRIPTION} Klar strukturiert, mobil gedacht und professionell genug
              für echte Berufssituationen.
            </p>

            <div className="mt-8">
              <SearchHero />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-2xl bg-sky-600 px-7 text-base shadow-[0_14px_35px_-18px_rgba(2,132,199,0.9)] hover:bg-sky-700"
              >
                <Link href="/register">
                  Kostenlos starten <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-12 rounded-2xl border-slate-300 bg-white/70 px-7 text-base backdrop-blur hover:bg-white dark:border-slate-800 dark:bg-slate-950/40"
              >
                <Link href="/berufsfelder">Berufsfelder ansehen</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {appHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-card/85 px-4 py-2 shadow-sm backdrop-blur"
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${item.tone} text-white`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
                  >
                    <Icon className={`h-3.5 w-3.5 ${badge.color}`} />
                    {badge.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-6 relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-400/20 via-emerald-300/10 to-amber-300/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/60 bg-white/75 p-4 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)] backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70">
              <div className="rounded-[1.6rem] bg-slate-950 p-4 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-200/80">
                      Heute lernen
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      B2 Sprint
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
                    <p className="text-xs text-slate-300">Fortschritt</p>
                    <p className="text-lg font-semibold">68%</p>
                  </div>
                </div>

                <div className="mt-5 h-3 rounded-full bg-white/10">
                  <div className="h-3 w-[68%] rounded-full bg-gradient-to-r from-sky-400 via-blue-400 to-emerald-400" />
                </div>

                <div className="mt-6 grid gap-3">
                  {dailyFlow.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <span className={`h-10 w-1 rounded-full ${item.accent}`} />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-slate-300">{item.detail}</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                      Streak
                    </p>
                    <p className="mt-2 text-3xl font-semibold">12</p>
                    <p className="text-sm text-slate-300">Tage am Stück</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                      Fokus
                    </p>
                    <p className="mt-2 text-3xl font-semibold">Büro</p>
                    <p className="text-sm text-slate-300">37 neue Wörter</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500/20 to-emerald-500/20 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">Nächste Session</p>
                      <p className="mt-1 text-sm text-slate-200/80">
                        Kommunikation im Arbeitsalltag mit Audio und Sofort-Feedback
                      </p>
                    </div>
                    <Layers3 className="h-5 w-5 text-sky-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-gradient-to-r from-slate-50 via-white to-sky-50/50 px-4 py-10 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-sky-950/10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="animate-in fade-in zoom-in-95 fill-mode-backwards rounded-3xl border border-white/80 bg-white/80 text-center shadow-[0_18px_50px_-32px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70"
                  style={{ animationDelay: `${100 * (index + 1)}ms` }}
                >
                  <CardContent className="p-5">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold text-foreground md:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex justify-center">
            <SectionHeading
              title="Ihr Lernhub für den Berufsalltag"
              subtitle="Vier klar gebaute Trainingsbereiche, damit Sie wie in einer guten App direkt in die passende Session springen können."
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {areas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Link
                  key={area.href}
                  href={area.href}
                  className="group block animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-backwards"
                  style={{ animationDelay: `${150 * (index + 1)}ms` }}
                >
                  <Card className={`h-full rounded-[1.75rem] border border-slate-200/70 bg-white/85 ${area.border} shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_24px_55px_-28px_rgba(15,23,42,0.45)] dark:border-slate-800/80 dark:bg-slate-950/70`}>
                    <CardHeader>
                      <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${area.color} transition-transform duration-200 group-hover:scale-110`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="flex items-center justify-between gap-2">
                        {area.title}
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </CardTitle>
                      <CardDescription>{area.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-1">
                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900/80">
                        <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">
                          Jetzt starten
                        </span>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm dark:bg-slate-950">
                          App-Flow
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex justify-center">
            <SectionHeading
              title={`Warum ${APP_NAME}?`}
              subtitle="Weniger wie ein klassisches Portal, mehr wie eine fokussierte Lernumgebung mit Struktur, Motivation und Klarheit."
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards rounded-[1.6rem] border border-slate-200/70 bg-white/85 text-center shadow-[0_14px_40px_-28px_rgba(15,23,42,0.45)] dark:border-slate-800 dark:bg-slate-950/70"
                  style={{ animationDelay: `${100 * (index + 1)}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${feature.color} text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex justify-center">
            <SectionHeading
              title="Das sagen Lernende"
              subtitle="Erfahrungen aus dem beruflichen Alltag."
            />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards rounded-[1.6rem] border border-slate-200/70 bg-white/90 shadow-[0_20px_48px_-32px_rgba(15,23,42,0.45)] dark:border-slate-800 dark:bg-slate-950/70"
                style={{ animationDelay: `${100 * (index + 1)}ms` }}
              >
                <CardContent className="pt-6">
                  <Quote className="mb-3 h-6 w-6 text-primary/40" />
                  <p className="text-sm leading-relaxed text-foreground">
                    {testimonial.quote}
                  </p>
                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="border-t bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-sky-600 via-blue-600 to-emerald-500 text-white shadow-[0_35px_80px_-36px_rgba(14,116,144,0.8)]">
            <CardContent className="px-6 py-10 text-center md:px-12">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Bereit für Ihren nächsten Lern-Run?
              </h2>
              <p className="mt-3 text-white/80">
                Starten Sie jetzt kostenlos und lernen Sie in kurzen, klaren Sessions genau dort weiter, wo Ihr Berufsalltag Unterstützung braucht.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild className="rounded-2xl bg-white text-sky-700 hover:bg-white/90">
                  <Link href="/register">
                    Kostenlos registrieren <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-2xl border-white/40 bg-white/10 text-white hover:bg-white/15">
                  <Link href="/pruefungstraining">Prüfungstraining entdecken</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
