import Link from "next/link";
import { Bell, Flame, Play, Target, TrendingUp, CalendarDays } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { calculateStreak } from "@/lib/streak";
import { DashboardDeckGrid } from "@/components/dashboard/dashboard-deck-grid";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
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
    { id: "redemittel", title: "Redemittel", type: "redemittel" as DeckType, itemIds: redemittelQuestions.map((q) => q.id) },
    { id: "grammatik", title: "Grammatik", type: "grammatik" as DeckType, itemIds: grammarQuestions.map((q) => q.id) },
  ].filter((d) => d.itemIds.length > 0);

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
      (progress ?? []).map((p) => new Date(p.practiced_at).toISOString().split("T")[0])
    );
    calculateStreak(activityDates);
    const today = new Date().toISOString().split("T")[0];
    todayDone = (progress ?? []).filter(
      (p) => new Date(p.practiced_at).toISOString().split("T")[0] === today
    ).length;
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });
    weeklyActiveDays = last7.filter((date) => activityDates.has(date)).length;
    name = getFirstName(profile?.full_name ?? null, user?.email ?? null);
  }

  const percent = Math.min(Math.round((todayDone / 20) * 100), 100);
  const featuredDeck = decks[0];
  const dailyGoal = 45;
  const dailyDone = Math.min(todayDone * 5, dailyGoal);
  const weekdayLabels = ["M", "D", "M", "D", "F", "S", "S"];

  return (
    <Container size="large">
      <PageHeader
        title={`Hallo, ${name}! 👋`}
        description="Weiterlernen. Weiterkommen."
      >
        <Button variant="outline" size="icon" className="rounded-xl">
          <Bell className="h-4 w-4" />
        </Button>
      </PageHeader>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dein Fortschritt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-5">
              <ProgressRing
                value={percent || 72}
                size={96}
                strokeWidth={8}
                indicatorClassName="text-primary"
                trackClassName="text-muted"
                label={<span className="text-2xl font-extrabold text-foreground">{percent || 72}%</span>}
              />
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-foreground">{dailyDone}</p>
                <p className="text-sm text-muted-foreground">Minuten gelernt</p>
                <p className="text-xs text-muted-foreground">{weeklyActiveDays} von 7 Tagen aktiv</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              {weekdayLabels.map((label, index) => {
                const active = index < Math.max(weeklyActiveDays, 1);
                return (
                  <div key={`${label}-${index}`} className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-bold ${
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Daily Goal Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tagesziel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-extrabold text-foreground">{dailyGoal} Minuten</p>
                <p className="text-sm text-muted-foreground">Heute lernen</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-sm">
                <Flame className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.max(10, Math.min((dailyDone / dailyGoal) * 100, 100))}%` }}
                />
              </div>
              <p className="text-right text-xs font-semibold text-muted-foreground">
                {dailyDone} / {dailyGoal} Min.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Featured Deck Card */}
        {featuredDeck ? (
          <Card className="bg-gradient-to-br from-primary/10 to-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-primary-foreground/80">Weiterlernen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-extrabold text-foreground">{featuredDeck.title}</p>
              <p className="text-sm text-muted-foreground">{featuredDeck.itemIds.length} Karten</p>
              <Button asChild className="mt-5 w-full gap-2 rounded-xl">
                <Link href={`/decks/${encodeURIComponent(featuredDeck.id)}/learn`}>
                  <Play className="h-4 w-4" /> Fortsetzen
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Deine Decks</h2>
          <Badge variant="secondary" className="rounded-full">{decks.length} Decks</Badge>
        </div>
        <DashboardDeckGrid decks={decks} />
      </div>
    </Container>
  );
}

function groupFachwortDecks(
  woerter: Awaited<ReturnType<typeof getAllFachwoerter>>,
  fieldMap: Map<string, string>
) {
  const groups = new Map<string, string[]>();
  woerter.forEach((w) => {
    const title = `Fachwort: ${fieldMap.get(w.berufsfeld_id) ?? "Allgemein"}`;
    const list = groups.get(title) ?? [];
    list.push(w.id);
    groups.set(title, list);
  });
  return Array.from(groups.entries()).map(([title, itemIds]) => ({
    id: encodeURIComponent(title),
    title,
    type: "fachwort" as const,
    itemIds,
  }));
}

function groupNomenVerbDecks(
  nv: Awaited<ReturnType<typeof getNomenVerbVerbindungen>>["data"]
) {
  const groups = new Map<string, string[]>();
  nv.forEach((n) => {
    const title = n.kategorie ?? "Nomen-Verb";
    const list = groups.get(title) ?? [];
    list.push(n.id);
    groups.set(title, list);
  });
  return Array.from(groups.entries()).map(([title, itemIds]) => ({
    id: encodeURIComponent(title),
    title,
    type: "nomen_verb" as const,
    itemIds,
  }));
}
