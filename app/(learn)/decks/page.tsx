import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Layers,
  MessageSquareQuote,
  Play,
  Sparkles,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getAllFachwoerter, getNomenVerbVerbindungen, getBerufsfelder } from "@/lib/queries";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { grammarQuestions } from "@/lib/grammar-data";
import type { Deck, DeckType } from "@/lib/decks";
import { CustomDeckSection } from "@/components/decks/custom-deck-section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DashboardDeckGrid } from "@/components/dashboard/dashboard-deck-grid";

export const metadata = {
  title: `Decks – ${APP_NAME}`,
};

export default async function DecksPage() {
  const [woerter, nvResult, berufsfelder] = await Promise.all([
    getAllFachwoerter(),
    getNomenVerbVerbindungen(),
    getBerufsfelder(),
  ]);

  const nv = nvResult.data ?? [];
  const fieldMap = new Map(berufsfelder.map((b) => [b.id, b.title]));

  const fachwortGroups = new Map<string, string[]>();
  woerter.forEach((wort) => {
    const title = `Fachwort: ${fieldMap.get(wort.berufsfeld_id) ?? "Allgemein"}`;
    const list = fachwortGroups.get(title) ?? [];
    list.push(wort.id);
    fachwortGroups.set(title, list);
  });

  const nvGroups = new Map<string, string[]>();
  nv.forEach((entry) => {
    const title = entry.kategorie ?? "Nomen-Verb";
    const list = nvGroups.get(title) ?? [];
    list.push(entry.id);
    nvGroups.set(title, list);
  });

  const decks: Deck[] = [
    ...Array.from(fachwortGroups.entries()).map(([title, itemIds]) => ({
      id: title,
      title,
      type: "fachwort" as DeckType,
      itemIds,
    })),
    ...Array.from(nvGroups.entries()).map(([title, itemIds]) => ({
      id: title,
      title,
      type: "nomen_verb" as DeckType,
      itemIds,
    })),
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

  const totalCards = decks.reduce((sum, deck) => sum + deck.itemIds.length, 0);
  const quickDecks = decks.slice(0, 3);

  return (
    <Container size="large">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#e7ddcf] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_52%,rgba(238,248,245,0.98)_100%)] p-6 shadow-[0_30px_90px_-52px_rgba(83,70,54,0.28)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,190,178,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(225,193,145,0.16),transparent_30%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ebe4] bg-white/78 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f4f55]">
                <Sparkles className="h-3.5 w-3.5" />
                Lernen mit klarer Auswahl
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Decks, die direkt
                <span className="mt-2 block text-[#0f4f55]">für den nächsten Lernschritt bereitstehen.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Wählen Sie ein Thema, öffnen Sie ein passendes Deck und wiederholen Sie
                genau die Inhalte, die im Beruf und im Kurs Sicherheit geben.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {quickDecks[0] ? (
                  <Button asChild size="lg" className="rounded-full bg-[#0f4f55] px-6 hover:bg-[#0c4348]">
                    <Link href={`/decks/${encodeURIComponent(quickDecks[0].id)}/learn`}>
                      Direkt starten
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline" size="lg" className="rounded-full border-[#d9ccbc] bg-white/80 px-6 text-slate-700 hover:bg-white">
                  <Link href="/trainer">Zum Trainer</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              <SummaryCard
                icon={<Layers className="h-4 w-4" />}
                label="Decks verfügbar"
                value={String(decks.length)}
                detail="Klar gegliedert nach Inhalt und Lernziel"
              />
              <SummaryCard
                icon={<BookOpen className="h-4 w-4" />}
                label="Karten insgesamt"
                value={String(totalCards)}
                detail="Sofort nutzbar für Wiederholung und Vertiefung"
              />
              <SummaryCard
                icon={<BriefcaseBusiness className="h-4 w-4" />}
                label="Berufsfelder"
                value={String(berufsfelder.length)}
                detail="Fachwortschatz aus echten beruflichen Bereichen"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.8rem] border border-[#eadfce] bg-white/88 p-6 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.22)] sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
              So nutzen Sie die Decks
            </p>
            <div className="mt-5 space-y-4">
              <GuideRow
                icon={<Play className="h-4 w-4" />}
                title="1. Ein Thema öffnen"
                text="Wählen Sie ein Deck, das zu Ihrem aktuellen Berufsbereich oder Lernschwerpunkt passt."
              />
              <GuideRow
                icon={<BookOpen className="h-4 w-4" />}
                title="2. Kurz wiederholen"
                text="Schon wenige Karten helfen, Begriffe und Formulierungen stabiler abzurufen."
              />
              <GuideRow
                icon={<MessageSquareQuote className="h-4 w-4" />}
                title="3. Sicherheit aufbauen"
                text="Regelmäßige Wiederholung stärkt Sprachgefühl, Tempo und berufliche Routine."
              />
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(247,252,250,0.94)_100%)] p-6 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.2)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                  Schnellzugriff
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  Direkt mit einem passenden Deck anfangen
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {quickDecks.map((deck) => (
                <Link
                  key={deck.id}
                  href={`/decks/${encodeURIComponent(deck.id)}/learn`}
                  className="group flex items-center justify-between rounded-[1.2rem] border border-[#ebe2d6] bg-white/84 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-[#d7ebe4] hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{deck.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{deck.itemIds.length} Karten</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55] transition-colors group-hover:bg-[#0f4f55] group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                Alle Decks
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Klar sortiert und direkt startbar
              </h2>
            </div>
            <div className="rounded-full border border-[#e7ddcf] bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600">
              {decks.length} Decks verfügbar
            </div>
          </div>

          <DashboardDeckGrid decks={decks} />
        </section>

        <CustomDeckSection />
      </div>
    </Container>
  );
}

function SummaryCard({
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

function GuideRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[1.2rem] border border-[#efe4d6] bg-[#fffdfa] p-4">
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
