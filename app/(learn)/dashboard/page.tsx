import Link from "next/link";
import { Bell, Flame } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { calculateStreak } from "@/lib/streak";
import { DashboardDeckGrid } from "@/components/dashboard/dashboard-deck-grid";
import { ProgressRing } from "@/components/ui/progress-ring";
import type { Deck, DeckType } from "@/lib/decks";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";

export const metadata = { title: `Dashboard – ${APP_NAME}` };

function getFirstName(fullName?: string | null, email?: string | null) {
  if (fullName?.trim()) return fullName.trim().split(/\s+/)[0];
  if (email) return email.split("@")[0];
  return "Anna";
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
  let streak = 0;
  let name = "Anna";
  if (!isMockMode()) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const [{ data: progress }, { data: profile }] = await Promise.all([
      supabase.from("user_progress").select("practiced_at").eq("user_id", user?.id ?? "").order("practiced_at", { ascending: false }),
      supabase.from("profiles").select("full_name").eq("id", user?.id ?? "").maybeSingle(),
    ]);
    const activityDates = new Set((progress ?? []).map((p) => new Date(p.practiced_at).toISOString().split("T")[0]));
    streak = calculateStreak(activityDates);
    const today = new Date().toISOString().split("T")[0];
    todayDone = (progress ?? []).filter((p) => new Date(p.practiced_at).toISOString().split("T")[0] === today).length;
    name = getFirstName(profile?.full_name ?? null, user?.email ?? null);
  }

  const percent = Math.min(Math.round((todayDone / 20) * 100), 100);
  const featuredDecks = decks.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff6eb_55%,#f5fbf6_100%)] p-6 shadow-[0_24px_60px_-34px_rgba(138,116,83,0.18)] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[2rem] text-slate-900 [font-family:Georgia,serif]">Hallo, {name}! 👋</p>
                <p className="mt-2 text-slate-600">Weiter so! Du bist auf einem guten Weg.</p>
              </div>
              <Bell className="h-5 w-5 text-slate-500" />
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-[#f0e5d8] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-5">
                <ProgressRing value={percent || 72} size={112} strokeWidth={10} trackClassName="text-[#e7ece7]" indicatorClassName="text-[#73beb2]" label={<span className="text-3xl font-semibold text-slate-900">{percent || 72}</span>} />
                <div className="space-y-3 text-sm text-slate-600">
                  <div><p className="text-xs text-slate-400">Aktuelles Level</p><p>Fortgeschritten B2</p></div>
                  <div><p className="text-xs text-slate-400">Nächstes Ziel</p><p>Komplexe Gespräche sicher führen</p></div>
                  <Link href="/trainer" className="inline-block text-[#73beb2] hover:underline">Fortschritt ansehen</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredDecks.map((deck, index) => (
              <div key={deck.id} className="rounded-[1.45rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-400">Modul {index + 1}</p>
                <p className="mt-2 text-base font-medium text-slate-900">{deck.title}</p>
                <div className="mt-4 h-2 rounded-full bg-[#edf0ec]">
                  <div className="h-2 rounded-full bg-[#73beb2]" style={{ width: `${Math.max(36, 72 - index * 14)}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{deck.itemIds.length} Karten</span>
                  <Link href={`/decks/${encodeURIComponent(deck.id)}/learn`} className="text-[#73beb2] hover:underline">Öffnen</Link>
                </div>
              </div>
            ))}
            <div className="rounded-[1.45rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Tägliche Übung</p>
                  <p className="mt-1 text-sm text-slate-900">15 Minuten üben</p>
                  <p className="text-xs text-slate-400">{todayDone} / 15 Min.</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3e8] text-[#f19a4f]">
                  <Flame className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-slate-900 [font-family:Georgia,serif]">Alle Decks</h2>
          <Link href="/trainer" className="text-sm text-[#73beb2] hover:underline">Trainer öffnen</Link>
        </div>
        <DashboardDeckGrid decks={decks} />
      </section>
    </div>
  );
}

function groupFachwortDecks(woerter: Awaited<ReturnType<typeof getAllFachwoerter>>, fieldMap: Map<string, string>) {
  const groups = new Map<string, string[]>();
  woerter.forEach((w) => {
    const title = `Fachwort: ${fieldMap.get(w.berufsfeld_id) ?? "Allgemein"}`;
    const list = groups.get(title) ?? [];
    list.push(w.id);
    groups.set(title, list);
  });
  return Array.from(groups.entries()).map(([title, itemIds]) => ({ id: encodeURIComponent(title), title, type: "fachwort" as const, itemIds }));
}

function groupNomenVerbDecks(nv: Awaited<ReturnType<typeof getNomenVerbVerbindungen>>["data"]) {
  const groups = new Map<string, string[]>();
  nv.forEach((n) => {
    const title = n.kategorie ?? "Nomen-Verb";
    const list = groups.get(title) ?? [];
    list.push(n.id);
    groups.set(title, list);
  });
  return Array.from(groups.entries()).map(([title, itemIds]) => ({ id: encodeURIComponent(title), title, type: "nomen_verb" as const, itemIds }));
}
