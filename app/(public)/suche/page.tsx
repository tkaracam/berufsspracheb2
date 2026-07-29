"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, BookOpen, Shuffle, MessageCircle, Brain, Eye, Headphones, Pencil, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
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
    <div className="section-padding">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/20 p-6 shadow-lg shadow-slate-900/5 sm:p-10">
          <div className="relative z-10 max-w-3xl">
            <Badge variant="default" className="mb-4">
              Inhalte schnell finden
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Suche
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Durchsuchen Sie Fachwörter, Nomen-Verb-Verbindungen, Grammatik,
              Redemittel und weitere Lerninhalte.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Suchbegriff eingeben ..."
              className="h-14 pl-12 pr-28 text-base"
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg">
              Suchen
            </Button>
          </div>
        </form>

        <div className="mx-auto mt-8 max-w-3xl">
          {submittedQuery && (
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} Ergebnis{results.length !== 1 ? "se" : ""} für „{submittedQuery}“
            </p>
          )}

          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="shrink-0 gap-1 rounded-full">
                        {typeIcons[r.type] ?? null}
                        {r.type}
                      </Badge>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground">{r.title}</p>
                        {r.subtitle && (
                          <p className="text-sm text-muted-foreground">{r.subtitle}</p>
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
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Keine Ergebnisse gefunden.
              </CardContent>
            </Card>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="section-padding">
          <Container>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Suche</h1>
              <p className="mt-2 text-muted-foreground">Suche wird geladen ...</p>
            </div>
          </Container>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
