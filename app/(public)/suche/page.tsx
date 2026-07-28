"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, BookOpen, Shuffle, MessageCircle, Brain, Eye, Headphones, Pencil, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BERUFSFELDER } from "@/lib/constants";
import { mockFachwoerter, mockNomenVerbVerbindungen } from "@/lib/mock-data";
import { grammarQuestions } from "@/lib/grammar-data";
import { communicationModules } from "@/lib/communication-data";
import { readingTexts } from "@/lib/reading-data";
import { listeningTasks } from "@/lib/listening-data";

const feldMap = new Map<string, string>(BERUFSFELDER.map((f) => [f.id, f.title]));

type Result = {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  href?: string;
};

function useSearchResults(query: string): Result[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Result[] = [];

    mockFachwoerter.forEach((w) => {
      if (
        w.begriff.toLowerCase().includes(q) ||
        (w.synonym?.toLowerCase().includes(q) ?? false) ||
        (w.beispielsatz?.toLowerCase().includes(q) ?? false)
      ) {
        results.push({
          id: `fw-${w.id}`,
          type: "Fachwort",
          title: `${w.artikel} ${w.begriff}`,
          subtitle: feldMap.get(w.berufsfeld_id) ?? "",
          href: "/trainer/fachwortschatz",
        });
      }
    });

    mockNomenVerbVerbindungen.forEach((nv) => {
      if (
        nv.phrase.toLowerCase().includes(q) ||
        (nv.synonym?.toLowerCase().includes(q) ?? false) ||
        (nv.beispielsatz?.toLowerCase().includes(q) ?? false)
      ) {
        results.push({
          id: `nv-${nv.id}`,
          type: "Nomen-Verb",
          title: nv.phrase,
          subtitle: nv.kategorie,
          href: "/nomen-verb",
        });
      }
    });

    grammarQuestions.forEach((g) => {
      if (
        g.question.toLowerCase().includes(q) ||
        g.topic.toLowerCase().includes(q) ||
        g.explanation.toLowerCase().includes(q)
      ) {
        results.push({
          id: `g-${g.id}`,
          type: "Grammatik",
          title: g.question,
          subtitle: g.topic,
          href: "/trainer/grammatik",
        });
      }
    });

    communicationModules.forEach((m) => {
      m.redemittel.forEach((phrase, i) => {
        if (phrase.toLowerCase().includes(q) || m.title.toLowerCase().includes(q)) {
          results.push({
            id: `rd-${m.id}-${i}`,
            type: "Redemittel",
            title: phrase,
            subtitle: m.title,
            href: "/redemittel",
          });
        }
      });
    });

    readingTexts.forEach((t) => {
      if (t.title.toLowerCase().includes(q) || t.text.toLowerCase().includes(q)) {
        results.push({
          id: `rt-${t.id}`,
          type: "Lesen",
          title: t.title,
          href: "/lesen",
        });
      }
    });

    listeningTasks.forEach((t) => {
      if (t.title.toLowerCase().includes(q) || t.transcript.toLowerCase().includes(q)) {
        results.push({
          id: `lt-${t.id}`,
          type: "Hören",
          title: t.title,
          href: "/hoeren",
        });
      }
    });

    return results.slice(0, 50);
  }, [query]);
}

const typeIcons: Record<string, React.ReactNode> = {
  Fachwort: <BookOpen className="h-4 w-4" />,
  "Nomen-Verb": <Shuffle className="h-4 w-4" />,
  Grammatik: <Brain className="h-4 w-4" />,
  Redemittel: <MessageCircle className="h-4 w-4" />,
  Lesen: <Eye className="h-4 w-4" />,
  Hören: <Headphones className="h-4 w-4" />,
  Schreiben: <Pencil className="h-4 w-4" />,
  Sprechen: <Mic className="h-4 w-4" />,
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const results = useSearchResults(submittedQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query);
  };

  return (
    <div className="container mx-auto flex-1 px-4 py-12">
      <div className="mx-auto mb-10 max-w-5xl">
        <div className="rounded-[2rem] border border-sky-100 bg-[linear-gradient(135deg,#ffffff_0%,#f4faff_55%,#eef8ff_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(59,130,246,0.24)] md:p-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-sky-100 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              Inhalte schnell finden
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Suche
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-600">
              Durchsuchen Sie Fachwörter, Nomen-Verb-Verbindungen, Grammatik,
              Redemittel und weitere Lerninhalte.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-10 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchbegriff eingeben ..."
            className="h-14 rounded-2xl border-sky-100 bg-white/88 pl-12 pr-28 text-lg shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)]"
          />
          <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-sky-500 hover:bg-sky-600">
            Suchen
          </Button>
        </div>
      </form>

      <div className="max-w-3xl mx-auto">
        {submittedQuery && (
          <p className="text-sm text-muted-foreground mb-4">
            {results.length} Ergebnis{results.length !== 1 ? "se" : ""} für „{submittedQuery}“
          </p>
        )}

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((r) => (
              <Card key={r.id} className="rounded-[1.6rem] border border-sky-100 bg-white/88 shadow-[0_18px_40px_-30px_rgba(59,130,246,0.2)]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="shrink-0 gap-1 rounded-full border-sky-100 bg-sky-50 text-sky-700">
                      {typeIcons[r.type] ?? null}
                      {r.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900">{r.title}</p>
                      {r.subtitle && (
                        <p className="text-sm text-slate-500">{r.subtitle}</p>
                      )}
                    </div>
                    {r.href && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={r.href}>Öffnen</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : submittedQuery ? (
          <Card className="rounded-[1.6rem] border border-sky-100 bg-white/88">
            <CardContent className="py-12 text-center text-slate-500">
              Keine Ergebnisse gefunden.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto flex-1 px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Suche</h1>
            <p className="text-muted-foreground">Suche wird geladen ...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
