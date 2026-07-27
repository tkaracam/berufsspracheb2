"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const question = {
  text: "Welche Verbindung passt? \"eine ___ stellen\"",
  options: [
    { label: "Frage", correct: true },
    { label: "Antwort", correct: false },
    { label: "Gespräch", correct: false },
  ],
  explanation: "Richtig ist \"eine Frage stellen\". Eine feste Nomen-Verb-Verbindung.",
};

export function MiniQuiz() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
  };

  const reset = () => {
    setSelected(null);
    setShowResult(false);
  };

  const isCorrect = selected !== null && question.options[selected].correct;

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader>
        <CardTitle className="text-lg">Teste dein Wissen</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 font-medium">{question.text}</p>
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const state =
              showResult && index === selected
                ? option.correct
                  ? "correct"
                  : "wrong"
                : showResult && option.correct
                  ? "correct"
                  : "default";

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  state === "correct" && "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100",
                  state === "wrong" && "border-destructive bg-destructive/10 text-destructive",
                  state === "default" && "hover:bg-muted"
                )}
              >
                {option.label}
                {state === "correct" && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                {state === "wrong" && <XCircle className="h-4 w-4 text-destructive" />}
              </button>
            );
          })}
        </div>
        {showResult && (
          <div className="mt-4 space-y-3">
            <p
              className={cn(
                "text-sm font-medium",
                isCorrect ? "text-emerald-600" : "text-destructive"
              )}
            >
              {isCorrect ? "Richtig!" : "Leider falsch."}
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Nochmal versuchen
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
