import Link from "next/link";
import { Bell, Flame } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { calculateStreak } from "@/lib/streak";
import { DashboardDeckGrid } from "@/components/dashboard/dashboard-deck-grid";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Button } from "@/components/ui/button";
import type { Deck, DeckType } from "@/lib/decks";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";
import { PhoneFrame } from "@/components/concept27/phone-frame";
import { MobileTabs } from "@/components/concept27/mobile-tabs";

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
    <PhoneFrame className="max-w-[380px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[2rem] leading-none text-slate-900 [font-family:Georgia,serif]">
            Hallo, {name}! 👋
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Weiterlernen. Weiterkommen.
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#eadfce] bg-white shadow-sm">
          <Bell className="h-4 w-4 text-slate-500" />
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate-700">Dein Fortschritt</p>
          <p className="text-xs text-slate-400">Diese Woche</p>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <ProgressRing
            value={percent || 72}
            size={92}
            strokeWidth={8}
            trackClassName="text-[#e8ece6]"
            indicatorClassName="text-[#5c9c88]"
            label={<span className="text-[1.95rem] font-semibold text-slate-900">{percent || 72}%</span>}
          />
          <div className="space-y-2 text-sm text-slate-600">
            <div>
              <p className="text-[1.75rem] leading-none text-slate-900 [font-family:Georgia,serif]">
                {dailyDone}
              </p>
              <p className="mt-1 text-sm text-slate-600">Minuten gelernt</p>
            </div>
            <p className="text-xs text-slate-400">
              {weeklyActiveDays} von 7 Tagen aktiv
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {weekdayLabels.map((label, index) => {
            const active = index < Math.max(weeklyActiveDays, 1);
            return (
              <div key={`${label}-${index}`} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.6rem] ${
                    active ? "bg-[#5c9c88] text-white" : "bg-[#f4f1eb] text-slate-400"
                  }`}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-700">Tagesziel</p>
            <p className="mt-1 text-[1.2rem] text-slate-900 [font-family:Georgia,serif]">
              {dailyGoal} Minuten lernen
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1e8] text-[#d69061]">
            <Flame className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-[#eceee9]">
          <div
            className="h-2 rounded-full bg-[#5c9c88]"
            style={{ width: `${Math.max(10, Math.min((dailyDone / dailyGoal) * 100, 100))}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-slate-400">
          {dailyDone} / {dailyGoal} Min.
        </p>
      </div>

      {featuredDeck ? (
        <div className="mt-4 rounded-[1.5rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
          <p className="text-[1.45rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
            Weiterlernen
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-20 w-20 rounded-[1.2rem] bg-[linear-gradient(180deg,#edf5ef_0%,#fbf0e4_100%)]" />
            <div className="min-w-0 flex-1">
              <p className="text-base leading-6 text-slate-900 [font-family:Georgia,serif]">
                {featuredDeck.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {featuredDeck.itemIds.length} Karten
              </p>
              <Button asChild className="mt-3 h-9 rounded-[0.9rem] bg-[#5c9c88] px-4 text-sm text-white hover:bg-[#538d7a]">
                <Link href={`/decks/${encodeURIComponent(featuredDeck.id)}/learn`}>
                  Fortsetzen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-5">
        <DashboardDeckGrid decks={decks} />
      </div>

      <MobileTabs active="lernen" />
    </PhoneFrame>
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
