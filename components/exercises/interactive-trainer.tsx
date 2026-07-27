"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Eye, Headphones, BookOpen, Keyboard } from "lucide-react";
import { toast } from "sonner";
import { ProgressRing } from "@/components/ui/progress-ring";
import { EmptyState } from "@/components/ui/empty-state";
import { StickyMobileAction } from "@/components/ui/sticky-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { addDemoProgress } from "@/lib/demo-storage";
import { AudioPlayer } from "./audio-player";

export type ExerciseItem = {
  id: string;
  topic: string;
  context?: string;
  audioPath?: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  answer: string;
  explanation: string;
};

interface Props {
  title: string;
  description: string;
  items: ExerciseItem[];
  itemType: "grammar_quiz" | "reading_quiz" | "listening_quiz" | "redemittel_quiz";
  maxPoints?: number;
  shuffleItems?: boolean;
  hideContextInitially?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function InteractiveTrainer({
  title,
  description,
  items,
  itemType,
  maxPoints,
  shuffleItems = true,
  hideContextInitially = false,
}: Props) {
  const [order] = useState(() => (shuffleItems ? shuffle(items) : items));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showContext, setShowContext] = useState(!hideContextInitially);

  const current = order[index];
  const isMultipleChoice = current.options && current.correctIndex !== undefined;

  const isCorrect = useMemo(() => {
    if (!checked) return false;
    if (isMultipleChoice) {
      return selected === current.correctIndex;
    }
    return input.trim().toLowerCase() === current.answer.trim().toLowerCase();
  }, [checked, isMultipleChoice, selected, input, current]);

  useEffect(() => {
    if (finished) {
      const percentage = Math.round((score / order.length) * 100);
      const passed = percentage >= 60;
      toast.success(`Übung beendet: ${percentage}% ${passed ? "– Bestanden" : ""}`);
      addDemoProgress({
        itemType,
        itemId: current.id,
        score: percentage,
        practicedAt: new Date().toISOString(),
      });
    }
  }, [finished, score, order.length, itemType, current.id]);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen className="h-7 w-7" />}
        title="Keine Aufgaben vorhanden"
        description="Für diesen Bereich sind noch keine Übungen hinterlegt. Schauen Sie später wieder vorbei."
      />
    );
  }

  const check = () => {
    if (checked) return;
    if (isMultipleChoice && selected === null) return;
    if (!isMultipleChoice && !input.trim()) return;
    const correct = isMultipleChoice
      ? selected === current.correctIndex
      : input.trim().toLowerCase() === current.answer.trim().toLowerCase();
    if (correct) {
      setScore((s) => s + 1);
      toast.success("Richtig!");
    } else {
      toast.error("Leider falsch.");
    }
    setChecked(true);
    if (hideContextInitially) setShowContext(true);
  };

  const next = () => {
    if (index + 1 >= order.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setInput("");
      setChecked(false);
      setShowContext(!hideContextInitially);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setInput("");
    setChecked(false);
    setScore(0);
    setFinished(false);
    setShowContext(!hideContextInitially);
  };

  if (finished) {
    const percentage = Math.round((score / order.length) * 100);
    const points = maxPoints ? Math.round((score / order.length) * maxPoints) : null;
    const passed = percentage >= 60;
    return (
      <Card className="overflow-hidden border-t-4 border-t-primary text-center shadow-lg">
        <CardContent className="space-y-5 py-12">
          <ProgressRing
            value={percentage}
            size={96}
            strokeWidth={8}
            className="mx-auto"
            label={`${percentage}%`}
            sublabel={passed ? "Bestanden" : "Nicht bestanden"}
          />
          <div>
            <h2 className="text-2xl font-bold">Übung beendet!</h2>
            <p className="mt-1 text-muted-foreground">
              Sie haben {score} von {order.length} richtig beantwortet.
            </p>
          </div>
          {points !== null && (
            <div className="space-y-1">
              <p className="text-lg font-medium">
                Geschätzte Punkte: {points} / {maxPoints}
              </p>
              <p
                className={cn(
                  "text-sm font-medium",
                  passed ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}
              >
                {passed ? "Bestanden (≥ 60 %)" : "Nicht bestanden (< 60 %)"}
              </p>
            </div>
          )}
          <Progress value={percentage} className="mx-auto h-2.5 w-full max-w-md" />
          <Button onClick={restart} size="lg">
            <RotateCcw className="mr-2 h-4 w-4" /> Noch einmal üben
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card className="overflow-hidden border-t-4 border-t-amber-500 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Aufgabe {index + 1} von {order.length}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{current.topic}</Badge>
              <span className="text-sm font-medium text-muted-foreground">
                Punkte: {score}
              </span>
            </div>
          </div>
          <Progress value={(index / order.length) * 100} className="h-2" />
          {current.context && (
            <div className="mt-4 rounded-lg bg-muted/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {itemType === "listening_quiz" ? "Hörtext" : "Text"}
                </span>
                <AudioPlayer
                  path={current.audioPath}
                  text={current.context}
                  label={itemType === "listening_quiz" ? "Hörtext anhören" : "Text vorlesen"}
                />
              </div>
              {hideContextInitially && !showContext ? (
                <div className="py-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hören Sie den Text zuerst, bevor Sie die Frage beantworten.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <AudioPlayer
                      path={current.audioPath}
                      text={current.context}
                      label="Hörtext abspielen"
                      variant="button"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="default"
                      onClick={() => setShowContext(true)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Transkript einblenden
                    </Button>
                  </div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {current.context}
                </pre>
              )}
            </div>
          )}
          <CardTitle className="text-xl leading-relaxed font-normal mt-4">
            {current.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isMultipleChoice ? (
            <div className="grid gap-3">
              {current.options!.map((option, i) => {
                const isSelected = selected === i;
                const isCorrectOption = i === current.correctIndex;
                return (
                  <Button
                    key={i}
                    variant={isSelected ? (isCorrectOption ? "default" : "destructive") : "outline"}
                    className={cn(
                      "justify-start h-auto py-3 px-4 text-left transition-all duration-200 active:scale-[0.98]",
                      checked && isCorrectOption && "border-primary"
                    )}
                    onClick={() => !checked && setSelected(i)}
                    disabled={checked}
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
          ) : (
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ihre Antwort eingeben …"
              disabled={checked}
              onKeyDown={(e) => e.key === "Enter" && check()}
            />
          )}

          {!checked ? (
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Keyboard className="h-3.5 w-3.5" />
                {isMultipleChoice && (current.options?.length ?? 0) <= 4
                  ? "Enter zum Prüfen, 1–4 zur Auswahl"
                  : "Enter zum Prüfen"}
              </p>
              <StickyMobileAction>
                <Button onClick={check} className="w-full sm:w-auto" size="lg">
                  Prüfen
                </Button>
              </StickyMobileAction>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                className={`flex items-center gap-2 font-medium ${
                  isCorrect ? "text-primary" : "text-destructive"
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 motion-safe:animate-in motion-safe:zoom-in duration-200" />
                ) : (
                  <XCircle className="h-5 w-5 motion-safe:animate-in motion-safe:zoom-in duration-200" />
                )}
                {isCorrect ? "Richtig!" : "Leider falsch."}
              </div>
              <div className="rounded-lg bg-muted p-4 text-sm space-y-1">
                <p>
                  <span className="font-medium">Richtige Antwort:</span>{" "}
                  {isMultipleChoice
                    ? current.options![current.correctIndex!]
                    : current.answer}
                </p>
                <p className="text-muted-foreground">
                  {current.explanation}
                </p>
              </div>
              <StickyMobileAction>
                <Button onClick={next} size="lg">
                  {index + 1 >= order.length ? "Abschließen" : "Weiter"}
                </Button>
              </StickyMobileAction>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
