import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  MessageSquare,
  Play,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { HeroVisual } from "@/components/home/hero-visual";
import { SearchHero } from "@/components/home/search-hero";
import { createClient, getSession } from "@/lib/supabase/server";
import { calculateStreak } from "@/lib/streak";

const startAreas = [
  {
    href: "/berufsfelder",
    title: "Fachwortschatz",
    description: "Berufsbezogene Begriffe im echten Kontext lernen.",
    icon: Briefcase,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    href: "/kommunikation",
    title: "Kommunikation",
    description: "E-Mails, Gespräche und typische Arbeitssituationen üben.",
    icon: MessageSquare,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    href: "/pruefungstraining",
    title: "Prüfungstraining",
    description: "Gezielt für B2-Aufgaben und Prüfungssituationen trainieren.",
    icon: GraduationCap,
    tone: "bg-amber-100 text-amber-700",
  },
];

function getFirstName(fullName?: string | null, email?: string | null) {
  if (fullName?.trim()) {
    return fullName.trim().split(/\s+/)[0];
  }
  if (email) {
    return email.split("@")[0];
  }
  return "da";
}

export default async function HomePage() {
  const { user } = await getSession();

  let userSummary:
    | {
        firstName: string;
        todayDone: number;
        streak: number;
        favorites: number;
      }
    | undefined;

  if (user) {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];

    const [{ data: progress }, { count: favoritesCount }, { data: profile }] =
      await Promise.all([
        supabase
          .from("user_progress")
          .select("practiced_at")
          .eq("user_id", user.id)
          .order("practiced_at", { ascending: false }),
        supabase
          .from("favorites")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
      ]);

    const activityDates = new Set(
      (progress ?? []).map((entry) => new Date(entry.practiced_at).toISOString().split("T")[0])
    );

    const todayDone = (progress ?? []).filter(
      (entry) => new Date(entry.practiced_at).toISOString().split("T")[0] === today
    ).length;

    userSummary = {
      firstName: getFirstName(profile?.full_name ?? null, user.email ?? null),
      todayDone,
      streak: calculateStreak(activityDates),
      favorites: favoritesCount ?? 0,
    };
  }

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden px-4 pb-14 pt-10 md:pb-20 md:pt-14">
        <HeroVisual />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white/90 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#73beb2]" />
              Sprache. Kompetenz. Zukunft.
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Sprache öffnet Türen.
              <br />
              <span className="text-[#73beb2]">Wir öffnen sie mit dir.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Lerne Berufsdeutsch in einer ruhigen, freundlichen App mit
              Fachwortschatz, Kommunikation und Prüfungstraining für den echten
              Arbeitsalltag.
            </p>

            <SearchHero />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-2xl bg-[#73beb2] px-7 text-base shadow-[0_18px_40px_-22px_rgba(115,190,178,0.55)] hover:bg-[#64aea3]"
              >
                <Link href={user ? "/dashboard" : "/register"}>
                  {user ? "Weiterlernen" : "Jetzt kostenlos starten"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-2xl border-[#eadfce] bg-white/85 px-7 text-base text-slate-700 hover:bg-white"
              >
                <Link href="/berufsfelder">Berufsfelder ansehen</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Kurze Lerneinheiten",
                "Berufssprache im Kontext",
                "Klar, mobil und fokussiert",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white/88 px-3 py-1.5 text-sm text-slate-600 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#73beb2]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(115,190,178,0.25),_transparent_55%)] blur-3xl" />

            <div className="relative rounded-[2.5rem] border border-white/80 bg-white/80 p-4 shadow-[0_30px_80px_-40px_rgba(115,190,178,0.26)] backdrop-blur">
              <div className="overflow-hidden rounded-[2.1rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fff8f0_0%,#ffffff_28%,#ffffff_100%)]">
                <div className="border-b border-[#eadfce] px-5 pb-5 pt-6">
                  {userSummary ? (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Hallo, {userSummary.firstName}
                          </p>
                          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                            Bereit für die nächste Einheit?
                          </h2>
                          <p className="mt-2 text-sm text-slate-500">
                            Ihr Lernbereich wartet schon auf Sie.
                          </p>
                        </div>
                        <Button
                          asChild
                          className="rounded-2xl bg-[#73beb2] px-4 hover:bg-[#64aea3]"
                        >
                          <Link href="/dashboard">
                            <Play className="mr-2 h-4 w-4" />
                            Öffnen
                          </Link>
                        </Button>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-[1.5rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(32,50,58,0.16)]">
                          <p className="text-2xl font-bold text-slate-900">{userSummary.todayDone}</p>
                          <p className="mt-1 text-sm text-slate-500">Heute gelernt</p>
                        </div>
                        <div className="rounded-[1.5rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(32,50,58,0.16)]">
                          <p className="text-2xl font-bold text-slate-900">{userSummary.streak}</p>
                          <p className="mt-1 text-sm text-slate-500">Streak</p>
                        </div>
                        <div className="rounded-[1.5rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(32,50,58,0.16)]">
                          <p className="text-2xl font-bold text-slate-900">{userSummary.favorites}</p>
                          <p className="mt-1 text-sm text-slate-500">Favoriten</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-slate-500">Ihr schneller Einstieg</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                        Eine ruhige App, ein klarer Start
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Beginnen Sie mit einem Bereich, der sich leicht anfühlt
                        und direkt in den Berufsalltag führt.
                      </p>
                      <div className="mt-5 rounded-[1.8rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(32,50,58,0.16)]">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#73beb2]">
                              Empfohlener Start
                            </p>
                            <h3 className="mt-2 text-xl font-semibold text-slate-900">
                              Kommunikation im Beruf
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              Üben Sie typische Situationen, Formulierungen und
                              kurze Reaktionen für den echten Arbeitsalltag.
                            </p>
                          </div>
                          <div className="rounded-2xl bg-[#edf6ef] px-3 py-2 text-xs font-semibold text-[#4b8074]">
                            5-10 Min.
                          </div>
                        </div>

                        <Button
                          asChild
                          className="mt-4 h-11 w-full rounded-2xl bg-[#73beb2] hover:bg-[#64aea3]"
                        >
                          <Link href="/kommunikation">
                            Jetzt beginnen
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Link
                          href="/berufsfelder"
                          className="rounded-[1.5rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(32,50,58,0.16)] transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <p className="text-sm font-semibold text-slate-900">Fachwörter entdecken</p>
                          <p className="mt-1 text-sm text-slate-500">
                            Begriffe passend zu Ihrem Berufsfeld.
                          </p>
                          <div className="mt-3 flex items-center text-sm font-medium text-[#73beb2]">
                            Öffnen
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </div>
                        </Link>

                        <Link
                          href="/pruefungstraining"
                          className="rounded-[1.5rem] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(32,50,58,0.16)] transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <p className="text-sm font-semibold text-slate-900">B2 gezielt trainieren</p>
                          <p className="mt-1 text-sm text-slate-500">
                            Ruhig und fokussiert für Prüfungssituationen.
                          </p>
                          <div className="mt-3 flex items-center text-sm font-medium text-[#73beb2]">
                            Öffnen
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="px-5 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Direkt loslegen</h3>
                    <Link href="/berufsfelder" className="text-sm font-medium text-sky-600">
                      Alles ansehen
                    </Link>
                  </div>

                  <div className="grid gap-3">
                    {startAreas.map((area) => {
                      const Icon = area.icon;
                      return (
                        <Link key={area.title} href={area.href}>
                          <div className="flex items-center gap-4 rounded-[1.6rem] border border-[#f1e6d9] bg-white px-4 py-4 shadow-[0_12px_30px_-24px_rgba(32,50,58,0.16)] transition-transform duration-200 hover:-translate-y-0.5">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${area.tone}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-slate-900">{area.title}</p>
                              <p className="mt-1 text-sm text-slate-500">{area.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-300" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">Wählen Sie Ihren Lernweg</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Drei klare Wege ins Lernen
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Fachwortschatz",
                text: "Wichtige Begriffe passend zu Ihrem Berufsfeld lernen.",
                icon: Briefcase,
                href: "/berufsfelder",
              },
              {
                title: "Kommunikation",
                text: "Gespräche, E-Mails und typische Situationen trainieren.",
                icon: MessageSquare,
                href: "/kommunikation",
              },
              {
                title: "Prüfungstraining",
                text: "Mit B2-Aufgaben gezielt und ruhig vorbereiten.",
                icon: Target,
                href: "/pruefungstraining",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="rounded-[1.9rem] border border-[#eadfce] bg-white/88 shadow-[0_20px_50px_-34px_rgba(115,190,178,0.16)]"
                >
                  <CardContent className="p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef6ef] text-[#73beb2]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    <Button
                      asChild
                      variant="ghost"
                      className="mt-4 h-auto px-0 text-[#73beb2] hover:bg-transparent hover:text-[#64aea3]"
                    >
                      <Link href={item.href}>
                        Öffnen <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
