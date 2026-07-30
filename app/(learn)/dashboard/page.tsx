import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Play,
  Sparkles,
  Target,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { calculateStreak } from "@/lib/streak";
import { DashboardDeckGrid } from "@/components/dashboard/dashboard-deck-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import type { Deck, DeckType } from "@/lib/decks";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";

export const metadata = { title: `Dashboard – ${APP_NAME}` };

function getFirstName(fullName?: string | null, email?: string | null) {
  if (fullName?.trim()) return fullName.trim().split(/\s+/)[0];
  if (email) return email.split("@")[0];
  return "Samira";
}

export default async function LearnerDashboardPage() {
  const [woerter, nvResult, berufsfelder] = await Promise.all([
    getAllFachwoerter(),
    getNomenVerbVerbindungen(),
    getBerufsfelder(),
  ]);

  const nv = nvResult.data ?? [];
  const fieldMap = new Map(berufsfelder.map((b) => [b.id, b.title]));
  const decks: Deck[] = [
    ...groupFachwortDecks(woerter, fieldMap),
    ...groupNomenVerbDecks(nv),
    {
      id: "redemittel",
      title: "Redemittel",
      type: "redemittel" as DeckType,
      itemIds: redemittelQuestions.map((q) => q.id),
    },
    {
      id: "grammatik",
      title: "Grammatik",
      type: "grammatik" as DeckType,
      itemIds: grammarQuestions.map((q) => q.id),
    },
  ].filter((deck) => deck.itemIds.length > 0);

  let todayDone = 0;
  let name = "Samira";
  let weeklyActiveDays = 0;

  if (!isMockMode()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const [{ data: progress }, { data: profile }] = await Promise.all([
      supabase
        .from("user_progress")
        .select("practiced_at")
        .eq("user_id", user?.id ?? "")
        .order("practiced_at", { ascending: false }),
      supabase.from("profiles").select("full_name").eq("id", user?.id ?? "").maybeSingle(),
    ]);

    const activityDates = new Set(
      (progress ?? []).map((entry) => new Date(entry.practiced_at).toISOString().split("T")[0])
    );

    calculateStreak(activityDates);

    const today = new Date().toISOString().split("T")[0];
    todayDone = (progress ?? []).filter(
      (entry) => new Date(entry.practiced_at).toISOString().split("T")[0] === today
    ).length;

    const last7Days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date.toISOString().split("T")[0];
    });

    weeklyActiveDays = last7Days.filter((date) => activityDates.has(date)).length;
    name = getFirstName(profile?.full_name ?? null, user?.email ?? null);
  }

  const featuredDeck = decks[0] ?? null;
  const dailyGoalMinutes = 45;
  const learnedMinutes = Math.min(todayDone * 5, dailyGoalMinutes);
  const completionPercent = Math.min(
    Math.round((learnedMinutes / dailyGoalMinutes) * 100),
    100
  );
  const totalCards = decks.reduce((sum, deck) => sum + deck.itemIds.length, 0);

  return (
    <Container size="large">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#e7ddcf] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_52%,rgba(238,248,245,0.98)_100%)] p-6 shadow-[0_30px_90px_-52px_rgba(83,70,54,0.28)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,190,178,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(225,193,145,0.16),transparent_30%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ebe4] bg-white/78 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f4f55]">
                <Sparkles className="h-3.5 w-3.5" />
                Persönlicher Lernbereich
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Hallo, {name}.
                <span className="mt-2 block text-[#0f4f55]">Lernen Sie heute ruhig und fokussiert weiter.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Ihr Bereich zeigt nur das Wesentliche: Fortschritt, Lernrhythmus und
                den direkt passenden Einstieg in Ihre nächsten Decks.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {featuredDeck ? (
                  <Button asChild size="lg" className="rounded-full bg-[#0f4f55] px-6 hover:bg-[#0c4348]">
                    <Link href={`/decks/${encodeURIComponent(featuredDeck.id)}/learn`}>
                      Jetzt weiterlernen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline" size="lg" className="rounded-full border-[#d9ccbc] bg-white/80 px-6 text-slate-700 hover:bg-white">
                  <Link href="/decks">Alle Decks ansehen</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              <MetricCard
                icon={<Target className="h-4 w-4" />}
                label="Heute gelernt"
                value={`${learnedMinutes} Min.`}
                detail={`${completionPercent}% des Tagesziels erreicht`}
              />
              <MetricCard
                icon={<CalendarDays className="h-4 w-4" />}
                label="Aktive Tage"
                value={`${weeklyActiveDays} / 7`}
                detail="Aktivität in den letzten sieben Tagen"
              />
              <MetricCard
                icon={<BookOpen className="h-4 w-4" />}
                label="Verfügbare Karten"
                value={String(totalCards)}
                detail={`${decks.length} Decks in Ihrem Lernbereich`}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[1.8rem] border-[#eadfce] bg-white/88 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.22)]">
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                    Fokus für heute
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {featuredDeck ? featuredDeck.title : "Ihr nächster Lernschritt"}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    {featuredDeck
                      ? `${featuredDeck.itemIds.length} Karten stehen bereit. Ein kurzer, klarer Durchgang reicht, um im Thema zu bleiben.`
                      : "Sobald Inhalte verfügbar sind, erscheint hier Ihr direkt passender Einstieg."}
                  </p>
                </div>
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ecf7f4] text-[#0f4f55] sm:flex">
                  <Play className="h-5 w-5" />
                </div>
              </div>

              {featuredDeck ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full bg-[#0f4f55] px-5 hover:bg-[#0c4348]">
                    <Link href={`/decks/${encodeURIComponent(featuredDeck.id)}/learn`}>
                      Deck öffnen
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-[#d9ccbc] bg-transparent px-5 text-slate-700">
                    <Link href={`/decks/${encodeURIComponent(featuredDeck.id)}`}>
                      Details ansehen
                    </Link>
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,250,244,0.94)_0%,rgba(255,255,255,0.92)_100%)] shadow-[0_24px_70px_-52px_rgba(60,44,26,0.2)]">
            <CardContent className="p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                Lernstruktur
              </p>

              <div className="mt-5 space-y-4">
                <MiniRow
                  icon={<BriefcaseBusiness className="h-4 w-4" />}
                  title="Berufsfelder"
                  text={`${berufsfelder.length} Bereiche mit berufsnahem Wortschatz`}
                />
                <MiniRow
                  icon={<BookOpen className="h-4 w-4" />}
                  title="Decks"
                  text={`${decks.length} kuratierte Stapel für Wiederholung und Aufbau`}
                />
                <MiniRow
                  icon={<Target className="h-4 w-4" />}
                  title="Rhythmus"
                  text="Kurze Einheiten, damit Lernen leicht in den Alltag passt"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                Ihre Decks
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Klar organisiert und direkt startbar
              </h2>
            </div>
            <div className="rounded-full border border-[#e7ddcf] bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600">
              {decks.length} Decks verfügbar
            </div>
          </div>

          <DashboardDeckGrid decks={decks} />
        </section>
      </div>
    </Container>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-[#e3efe9] bg-white/82 p-4 shadow-[0_18px_40px_-34px_rgba(15,79,85,0.24)]">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f4f55]">
        {icon}
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{value}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}

function MiniRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[1.2rem] border border-[#efe4d6] bg-white/76 p-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function groupFachwortDecks(
  woerter: Awaited<ReturnType<typeof getAllFachwoerter>>,
  fieldMap: Map<string, string>
) {
  const groups = new Map<string, string[]>();
  woerter.forEach((wort) => {
    const title = `Fachwort: ${fieldMap.get(wort.berufsfeld_id) ?? "Allgemein"}`;
    const list = groups.get(title) ?? [];
    list.push(wort.id);
    groups.set(title, list);
  });

  return Array.from(groups.entries()).map(([title, itemIds]) => ({
    id: title,
    title,
    type: "fachwort" as const,
    itemIds,
  }));
}

function groupNomenVerbDecks(
  nv: Awaited<ReturnType<typeof getNomenVerbVerbindungen>>["data"]
) {
  const groups = new Map<string, string[]>();
  nv.forEach((entry) => {
    const title = entry.kategorie ?? "Nomen-Verb";
    const list = groups.get(title) ?? [];
    list.push(entry.id);
    groups.set(title, list);
  });

  return Array.from(groups.entries()).map(([title, itemIds]) => ({
    id: title,
    title,
    type: "nomen_verb" as const,
    itemIds,
  }));
}
