import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getDictionaryFromCookie } from "@/lib/i18n/server";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { calculateStreak } from "@/lib/streak";
import { getFavorites } from "@/lib/actions/favorites";
import { FavoriteList, type FavoriteItem } from "@/components/dashboard/favorite-list";
import { StudyHeatmap } from "@/components/dashboard/study-heatmap";
import { Forecast } from "@/components/dashboard/forecast";
import { TodayHeroClient } from "@/components/dashboard/today-hero-client";
import { DashboardDeckGrid } from "@/components/dashboard/dashboard-deck-grid";
import { CustomDeckSection } from "@/components/decks/custom-deck-section";
import { GamificationCard } from "@/components/dashboard/gamification-card";
import { RecentActivityCard } from "@/components/dashboard/recent-activity-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Deck, DeckType } from "@/lib/decks";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";

export const metadata = {
  title: `Dashboard – ${APP_NAME}`,
};

export default async function LearnerDashboardPage() {
  const t = await getDictionaryFromCookie();

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
  ].filter((d) => d.itemIds.length > 0);

  let favoriteItems: FavoriteItem[] = [];
  let todayDone = 0;
  let streak = 0;

  if (!isMockMode()) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: progress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user?.id ?? "")
      .order("practiced_at", { ascending: false });

    favoriteItems = await getFavorites();

    const activityDates = new Set(
      (progress ?? []).map((p) => new Date(p.practiced_at).toISOString().split("T")[0])
    );
    streak = calculateStreak(activityDates);

    const today = new Date().toISOString().split("T")[0];
    todayDone = (progress ?? []).filter(
      (p) => new Date(p.practiced_at).toISOString().split("T")[0] === today
    ).length;
  }

  const firstDueDeck = decks[0]?.id;
  const dailyGoal = 20;
  const dueCount = decks.reduce((sum, d) => sum + d.itemIds.length, 0);

  return (
    <div className="space-y-10 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.welcomeBack}</h1>
        <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
      </div>

      <TodayHeroClient
        dueCount={dueCount}
        dailyGoal={dailyGoal}
        initialTodayDone={todayDone}
        initialStreak={streak}
        firstDeckId={firstDueDeck}
      />

      <section className="space-y-4">
        <SectionHeading title="Deine Decks" centered={false} />
        <DashboardDeckGrid decks={decks} />
      </section>

      <CustomDeckSection />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lernaktivität</CardTitle>
            <CardDescription>Letzte 16 Wochen</CardDescription>
          </CardHeader>
          <CardContent>
            <StudyHeatmap days={112} />
          </CardContent>
        </Card>

        <Forecast itemIds={decks.flatMap((d) => d.itemIds)} days={7} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FavoriteList favorites={favoriteItems.length > 0 ? favoriteItems : undefined} />
        <GamificationCard />
      </div>

      <RecentActivityCard />
    </div>
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

function groupNomenVerbDecks(nv: Awaited<ReturnType<typeof getNomenVerbVerbindungen>>["data"]) {
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
