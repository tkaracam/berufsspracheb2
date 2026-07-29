import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  MessageCircle,
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
    title: "Lernen mit erkennbarem Berufsbezug",
    text: "Begriffe, Situationen und Redemittel greifen typische Abläufe aus dem Arbeitsalltag auf.",
    icon: Briefcase,
  },
  {
    title: "Kommunikation klarer aufbauen",
    text: "Gespräche, Rückfragen und Formulierungen werden so trainiert, dass sie im Beruf sicher nutzbar sind.",
    icon: MessageCircle,
  },
  {
    title: "Strukturiert auf B2 hinarbeiten",
    text: "Kurze Wege, klare Schwerpunkte und ein Aufbau, der sich auch langfristig gut tragen lässt.",
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
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8f6d47]">
                Klar. Hochwertig. Berufsnah.
              </p>
              <p className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                Sprache lernen mit Struktur, Fokus und echter Berufspraxis.
              </p>
            </div>

            <div className="editorial-shell relative overflow-hidden p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-0 editorial-grid opacity-25" />
              <div className="grid gap-4">
                <div className="relative overflow-hidden rounded-[1.7rem] border border-[#eadfce] bg-white">
                  <Image
                    src="/images/professions/office.png"
                    alt="Beruflicher Erfolg"
                    width={1600}
                    height={1000}
                    className="h-[18rem] w-full object-cover sm:h-[24rem] lg:h-[32rem]"
                  />
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
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Warum diese Lernumgebung</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Weniger Ablenkung. Mehr sprachliche Sicherheit.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Die Plattform ist so aufgebaut, dass Inhalte schnell greifbar werden,
              Lernwege verständlich bleiben und der Fokus auf Sprache im Beruf liegt
              statt auf unnötiger Komplexität.
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
