"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  RotateCcw,
  Search,
  Shuffle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { AudioPlayer } from "./audio-player";
import { FavoriteButton } from "@/components/favorite-button";
import { addDemoProgress } from "@/lib/demo-storage";
import { cn } from "@/lib/utils";

type Entry = {
  id: string;
  begriff: string;
  artikel: string;
  synonym: string | null;
  beispielsatz: string | null;
  schwierigkeit: string;
  audio_path: string | null;
  berufsfelder: { title: string } | null;
};

type Field = {
  id: string;
  title: string;
};

interface Props {
  entries: Entry[];
  fields?: Field[];
}

const difficultyColors: Record<string, string> = {
  leicht: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  mittel: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  schwer: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

export function FachwortschatzTrainer({ entries, fields }: Props) {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesSearch =
        !q ||
        e.begriff.toLowerCase().includes(q) ||
        (e.synonym?.toLowerCase().includes(q) ?? false) ||
        (e.beispielsatz?.toLowerCase().includes(q) ?? false);
      const matchesField =
        fieldFilter === "all" || e.berufsfelder?.title === fieldFilter;
      const matchesDifficulty =
        difficultyFilter === "all" || e.schwierigkeit === difficultyFilter;
      return matchesSearch && matchesField && matchesDifficulty;
    });
  }, [entries, search, fieldFilter, difficultyFilter]);

  const resetView = () => {
    setIndex(0);
    setShowAnswer(false);
  };

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Keine Fachbegriffe vorhanden.
        </CardContent>
      </Card>
    );
  }

  if (filtered.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Keine Fachbegriffe passen zu Ihren Filtern.
        </CardContent>
      </Card>
    );
  }

  const safeIndex = Math.min(index, filtered.length - 1);
  const current = filtered[safeIndex];
  const progress = ((safeIndex + 1) / filtered.length) * 100;

  const next = () => {
    setIndex((i) => (i + 1 >= filtered.length ? 0 : i + 1));
    setShowAnswer(false);
  };

  const prev = () => {
    setIndex((i) => (i - 1 < 0 ? filtered.length - 1 : i - 1));
    setShowAnswer(false);
  };

  const shuffleFiltered = () => {
    setIndex(Math.floor(Math.random() * filtered.length));
    setShowAnswer(false);
  };

  const markKnown = () => {
    setKnownCount((c) => c + 1);
    addDemoProgress({
      itemType: "fachwort",
      itemId: current.id,
      score: 100,
      practicedAt: new Date().toISOString(),
    });
    next();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Fachbegriff, Synonym oder Beispiel suchen ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetView();
            }}
            className="pl-9 pr-9"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => {
                setSearch("");
                resetView();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-1">Berufsfeld:</span>
          <Button
            variant={fieldFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFieldFilter("all");
              resetView();
            }}
          >
            Alle
          </Button>
          {fields?.map((f) => (
            <Button
              key={f.id}
              variant={fieldFilter === f.title ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFieldFilter(f.title);
                resetView();
              }}
            >
              {f.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-1">Schwierigkeit:</span>
          {["all", "leicht", "mittel", "schwer"].map((level) => (
            <Button
              key={level}
              variant={difficultyFilter === level ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setDifficultyFilter(level);
                resetView();
              }}
            >
              {level === "all" ? "Alle" : level}
            </Button>
          ))}
        </div>
      </div>

      {/* Card */}
      <Card className="overflow-hidden border-t-4 border-t-blue-500 bg-card text-card-foreground shadow-lg">
        <CardContent className="p-0">
          <div className="border-b bg-muted/40 p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Karte {safeIndex + 1} von {filtered.length}
              </span>
              <div className="flex items-center gap-2">
                {current.berufsfelder?.title && (
                  <Badge variant="secondary">{current.berufsfelder.title}</Badge>
                )}
                <Badge
                  variant="secondary"
                  className={cn(difficultyColors[current.schwierigkeit])}
                >
                  {current.schwierigkeit}
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex flex-col items-center gap-6 p-8 text-center md:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold md:text-5xl">
                {current.begriff}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <AudioPlayer
                path={current.audio_path}
                text={`${current.artikel} ${current.begriff}`}
                variant="button"
              />
              <FavoriteButton
                itemType="fachwort"
                itemId={current.id}
                title={`${current.artikel} ${current.begriff}`}
              />
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAnswer((s) => !s)}
            >
              {showAnswer ? (
                <EyeOff className="mr-2 h-4 w-4" />
              ) : (
                <Eye className="mr-2 h-4 w-4" />
              )}
              {showAnswer ? "Lösung verbergen" : "Lösung anzeigen"}
            </Button>

            <div
              className={cn(
                "w-full max-w-lg rounded-xl border bg-muted/50 p-6 text-left transition-all",
                showAnswer
                  ? "visible opacity-100"
                  : "invisible h-0 overflow-hidden py-0 opacity-0"
              )}
            >
              <p className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                {current.artikel} {current.begriff}
              </p>
              {current.synonym && (
                <p className="mb-3 text-muted-foreground">
                  <span className="font-medium text-foreground">Synonym:</span>{" "}
                  {current.synonym}
                </p>
              )}
              {current.beispielsatz && (
                <p className="italic text-muted-foreground">
                  „{current.beispielsatz}“
                </p>
              )}
            </div>
          </div>

          <div className="border-t bg-muted/40 p-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={prev}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Zurück
              </Button>
              <Button variant="outline" onClick={shuffleFiltered}>
                <Shuffle className="mr-2 h-4 w-4" /> Zufällig
              </Button>
              <Button variant="outline" onClick={next}>
                Weiter <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {showAnswer && (
              <div className="mt-4 flex justify-center gap-3">
                <Button variant="secondary" onClick={markKnown}>
                  Gewusst ✓
                </Button>
                <Button variant="outline" onClick={next}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Nochmal üben
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        {knownCount} Begriffe als gewusst markiert
      </p>
    </div>
  );
}
