"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Dices, Filter, MessageSquare, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AudioPlayer } from "./audio-player";
import { FavoriteButton } from "@/components/favorite-button";
import { addDemoProgress } from "@/lib/demo-storage";
import type { Database } from "@/types/database";

type Entry = Database["public"]["Tables"]["nomen_verb_verbindungen"]["Row"];

interface Props {
  entries: Entry[];
}

const categoryColors: Record<string, string> = {
  Allgemein: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  Kommunikation: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Zeit: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Umgang: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Behörde: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Konflikt: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  Bewerbung: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  Produktion: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  Bildung: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  Arbeitsrecht: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  Logistik: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  let h = hash >>> 0;
  for (let i = result.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) % 2 ** 32;
    const j = h % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function NomenVerbTrainer({ entries }: Props) {
  const [setup, setSetup] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [sessionEntries, setSessionEntries] = useState<Entry[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const categories = useMemo(
    () =>
      Array.from(new Set(entries.map((e) => e.kategorie).filter(Boolean))).sort() as string[],
    [entries]
  );

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Keine Nomen-Verb-Verbindungen vorhanden.
        </CardContent>
      </Card>
    );
  }

  const startSession = (shuffleEntries = false) => {
    let pool =
      selectedCategory === "all"
        ? entries
        : entries.filter((e) => e.kategorie === selectedCategory);
    if (shuffleEntries) pool = shuffle(pool);
    setSessionEntries(pool);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setSetup(false);
  };

  const restart = () => {
    setSetup(true);
    setSessionEntries([]);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (setup) {
    return (
      <Card className="overflow-hidden border-t-4 border-t-emerald-500 shadow-lg">
        <CardHeader className="bg-muted/40">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <Filter className="h-5 w-5" />
            </div>
            Übung konfigurieren
          </CardTitle>
          <CardDescription>
            Wählen Sie eine Kategorie und starten Sie die Übung.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 py-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              Alle Kategorien ({entries.length})
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({entries.filter((e) => e.kategorie === cat).length})
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => startSession(false)} className="flex-1">
              Übung starten
            </Button>
            <Button
              variant="secondary"
              onClick={() => startSession(true)}
              className="flex-1"
            >
              <Dices className="mr-2 h-4 w-4" /> Zufällige Reihenfolge
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (finished) {
    const percentage = Math.round((score / sessionEntries.length) * 100);
    return (
      <Card className="overflow-hidden border-t-4 border-t-primary text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Übung beendet!</CardTitle>
          <CardDescription>
            Sie haben {score} von {sessionEntries.length} Verbindungen richtig
            beantwortet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {percentage}%
          </div>
          <Progress value={percentage} className="mx-auto h-3 w-full max-w-md" />
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button onClick={() => startSession(true)} variant="default">
              <RotateCcw className="mr-2 h-4 w-4" /> Noch einmal üben
            </Button>
            <Button onClick={restart} variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Andere Kategorie wählen
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const current = sessionEntries[index];
  const correctAnswer = current.synonym ?? current.phrase;

  const distractors = seededShuffle(
    entries.filter((e) => e.id !== current.id),
    current.id
  )
    .slice(0, 3)
    .map((e) => e.synonym ?? e.phrase);
  const options = seededShuffle(
    [correctAnswer, ...distractors],
    `${current.id}-options`
  );

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (index + 1 >= sessionEntries.length) {
      const percentage = Math.round((score / sessionEntries.length) * 100);
      addDemoProgress({
        itemType: "nomen_verb_quiz",
        itemId: current.id,
        score: percentage,
        practicedAt: new Date().toISOString(),
      });
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const isCorrect = selected === correctAnswer;

  return (
    <Card className="overflow-hidden border-t-4 border-t-emerald-500 shadow-lg">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Frage {index + 1} von {sessionEntries.length}
          </span>
          <span>Stand: {score} richtig</span>
        </div>
        <Progress value={(index / sessionEntries.length) * 100} className="h-2" />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <MessageSquare className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl">{current.phrase}</CardTitle>
            <AudioPlayer
              path={current.audio_path}
              text={current.phrase}
              variant="icon"
            />
            <FavoriteButton
              itemType="nomen_verb"
              itemId={current.id}
              title={current.phrase}
            />
          </div>
          {current.kategorie && (
            <Badge
              variant="secondary"
              className={cn(
                "w-fit font-normal",
                categoryColors[current.kategorie]
              )}
            >
              {current.kategorie}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Wählen Sie das passende Synonym oder die einfache Verbform:
        </p>
        <div className="grid gap-3">
          {options.map((option) => {
            const isSelected = selected === option;
            const isCorrectOption = option === correctAnswer;
            return (
              <Button
                key={option}
                variant={
                  isSelected
                    ? isCorrectOption
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className={cn(
                  "h-auto justify-start px-4 py-3 text-left transition-colors",
                  selected &&
                    !isSelected &&
                    isCorrectOption &&
                    "border-primary bg-primary/10 text-primary hover:bg-primary/10"
                )}
                onClick={() => handleAnswer(option)}
                disabled={selected !== null}
              >
                {isSelected && isCorrectOption && (
                  <CheckCircle2 className="mr-2 h-4 w-4 shrink-0" />
                )}
                {isSelected && !isCorrectOption && (
                  <XCircle className="mr-2 h-4 w-4 shrink-0" />
                )}
                {option}
              </Button>
            );
          })}
        </div>

        {selected && (
          <div
            className={cn(
              "space-y-3 rounded-xl border p-4",
              isCorrect
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                : "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30"
            )}
          >
            <p
              className={cn(
                "font-medium",
                isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
              )}
            >
              {isCorrect ? "Richtig!" : `Leider falsch. Richtig wäre: ${correctAnswer}`}
            </p>
            {current.beispielsatz && (
              <p className="text-sm italic text-muted-foreground">
                „{current.beispielsatz}“
              </p>
            )}
            <Button onClick={next} className="w-full">
              {index + 1 >= sessionEntries.length ? "Ergebnis anzeigen" : "Weiter"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
