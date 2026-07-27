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
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:py-28">
        <HeroVisual />

        <span className="animate-in fade-in zoom-in-95 duration-700 inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          Berufssprachkurs B2
        </span>

        <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-primary via-primary to-amber-500 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </h1>
        <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 mt-4 max-w-xl text-lg text-muted-foreground">
          {APP_DESCRIPTION}
        </p>

        <SearchHero />

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 mt-10 flex flex-wrap items-center justify-center gap-2">
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
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="animate-in fade-in zoom-in-95 duration-700 fill-mode-backwards text-center"
                  style={{ animationDelay: `${100 * (index + 1)}ms` }}
                >
                  <CardContent className="p-5">
                    <div className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
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

      {/* Areas */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex justify-center">
            <SectionHeading
              title="Was möchten Sie lernen?"
              subtitle="Vier Bereiche, die gezielt auf den Berufssprachkurs B2 vorbereiten."
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
                  <Card className={`h-full border-t-4 ${area.border} transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}>
                    <CardHeader>
                      <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${area.color} transition-transform duration-200 group-hover:scale-110`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="flex items-center justify-between gap-2">
                        {area.title}
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </CardTitle>
                      <CardDescription>{area.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        Jetzt starten
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex justify-center">
            <SectionHeading
              title={`Warum ${APP_NAME}?`}
              subtitle="Alles, was Sie brauchen, um den B2-Kurs erfolgreich zu bestehen."
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards text-center"
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

      {/* Testimonials */}
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
                className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-backwards"
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

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section className="border-t bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border-l-4 border-l-primary bg-card text-card-foreground shadow-sm">
            <CardContent className="px-6 py-10 text-center md:px-12">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Bereit für den B2-Kurs?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Starten Sie jetzt kostenlos und üben Sie dort, wo Sie gerade am meisten Unterstützung brauchen.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Kostenlos registrieren <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
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
