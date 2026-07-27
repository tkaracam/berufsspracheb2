"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, BookOpen, List } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StickyMobileAction } from "@/components/ui/sticky-action";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { addDemoProgress } from "@/lib/demo-storage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ReadingMatchingTask } from "@/lib/reading-matching-data";

interface Props {
  tasks: ReadingMatchingTask[];
}

export function ReadingMatchingTrainer({ tasks }: Props) {
  const [index, setIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = tasks[index];

  const usedArticles = useMemo(
    () => new Set(Object.values(selections)),
    [selections]
  );

  const score = useMemo(() => {
    let s = 0;
    for (const [personId, articleId] of Object.entries(current.matches)) {
      if (selections[personId] === articleId) s++;
    }
    return s;
  }, [selections, current]);

  const allSelected = Object.keys(selections).length === current.people.length;

  const check = () => {
    if (checked || !allSelected) return;
    setChecked(true);
    toast.info(`Punkte: ${score} / ${current.people.length}`);
    if (index + 1 >= tasks.length) {
      addDemoProgress({
        itemType: "reading_quiz",
        itemId: current.id,
        score: Math.round((score / current.people.length) * 100),
        practicedAt: new Date().toISOString(),
      });
    }
  };

  const next = () => {
    if (index + 1 >= tasks.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelections({});
      setChecked(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelections({});
    setChecked(false);
    setFinished(false);
  };

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<List className="h-7 w-7" />}
        title="Keine Zuordnungsaufgaben"
        description="Hier gibt es aktuell keine Lesen-Teil-1-Aufgaben."
      />
    );
  }

  if (finished) {
    return (
      <Card className="overflow-hidden border-t-4 border-t-primary text-center shadow-lg">
        <CardContent className="space-y-5 py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Übung beendet!</h2>
            <p className="mt-1 text-muted-foreground">
              Sie haben alle Zuordnungsaufgaben bearbeitet.
            </p>
          </div>
          <Button onClick={restart} size="lg">
            <RotateCcw className="mr-2 h-4 w-4" /> Noch einmal üben
          </Button>
        </CardContent>
      </Card>
    );
  }

  const taskProgress = (index / tasks.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Aufgabe {index + 1} von {tasks.length}
          </p>
          <h2 className="text-xl font-bold">Lesen Teil 1 – Zuordnung</h2>
        </div>
        <Badge variant="outline" className="w-fit gap-1.5 text-base">
          <BookOpen className="h-4 w-4" />
          Punkte: {checked ? score : "-"} / {current.people.length}
        </Badge>
      </div>

      <Progress value={taskProgress} className="h-2" />

      <Card className="overflow-hidden border-l-4 border-l-blue-500 bg-blue-50/40 dark:bg-blue-950/20">
        <CardContent className="p-4 text-sm leading-relaxed">
          {current.introText}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {current.articles.map((article) => {
          const isUsed = usedArticles.has(article.id);
          return (
            <Card
              key={article.id}
              className={cn(
                "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]",
                isUsed
                  ? "border-l-4 border-l-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20"
                  : "border-l-4 border-l-slate-200 dark:border-l-slate-800"
              )}
            >
              <CardContent className="p-4 text-sm leading-relaxed">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted font-bold text-xs mr-2">
                  {article.id}
                </span>
                {article.text}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        {current.people.map((person) => {
          const selected = selections[person.id];
          const correctArticle = current.matches[person.id];
          const isCorrect = checked && selected === correctArticle;
          const isWrong = checked && selected && selected !== correctArticle;

          return (
            <Card
              key={person.id}
              className={cn(
                "overflow-hidden transition-all duration-200 active:scale-[0.99]",
                isCorrect && "border-l-4 border-l-emerald-500",
                isWrong && "border-l-4 border-l-destructive"
              )}
            >
              <CardContent className="p-4 space-y-3">
                <p className="text-sm leading-relaxed">{person.text}</p>
                <Select
                  value={selected || ""}
                  onValueChange={(value) => {
                    if (checked || !value) return;
                    setSelections((prev) => ({ ...prev, [person.id]: value }));
                  }}
                  disabled={checked}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Artikel a – h auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {current.articles.map((article) => {
                      const usedByOther =
                        usedArticles.has(article.id) && selected !== article.id;
                      return (
                        <SelectItem
                          key={article.id}
                          value={article.id}
                          disabled={usedByOther}
                        >
                          {article.id.toUpperCase()} – {article.text}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                {checked && (
                  <div className="text-sm">
                    {isCorrect ? (
                      <div className="flex items-center gap-2 text-emerald-600 font-medium dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 motion-safe:animate-in motion-safe:zoom-in duration-200" />
                        Richtig: Artikel {correctArticle.toUpperCase()}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-destructive font-medium">
                          <XCircle className="h-4 w-4 motion-safe:animate-in motion-safe:zoom-in duration-200" />
                          Leider falsch. Richtig wäre Artikel{" "}
                          {correctArticle.toUpperCase()}.
                        </div>
                        <p className="text-muted-foreground">
                          {current.explanations[person.id]}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <StickyMobileAction>
        {!checked ? (
          <Button onClick={check} disabled={!allSelected} size="lg" className="w-full sm:w-auto">
            Prüfen
          </Button>
        ) : (
          <Button onClick={next} size="lg" className="w-full sm:w-auto">
            {index + 1 >= tasks.length ? "Abschließen" : "Weiter"}
          </Button>
        )}
      </StickyMobileAction>
    </div>
  );
}
