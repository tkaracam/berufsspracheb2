"use client";

import { useEffect, useState } from "react";
import { Mic, RotateCcw, Eye, EyeOff, Play, Square, Lightbulb, Focus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StickyMobileAction } from "@/components/ui/sticky-action";
import { useFocusMode } from "@/components/layout/focus-mode-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { addDemoProgress } from "@/lib/demo-storage";
import type { SpeakingTask } from "@/lib/speaking-data";

interface Props {
  tasks: SpeakingTask[];
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function SpeakingTrainer({ tasks }: Props) {
  const { focusMode, toggleFocusMode } = useFocusMode();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "prep" | "speak" | "review">("idle");
  const [remaining, setRemaining] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = tasks[index];

  useEffect(() => {
    if (phase === "idle" || phase === "review") return;
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          if (phase === "prep") {
            setPhase("speak");
            return current.speakingTimeSeconds;
          }
          if (phase === "speak") {
            setPhase("review");
            addDemoProgress({
              itemType: "speaking_quiz",
              itemId: current.id,
              score: 100,
              practicedAt: new Date().toISOString(),
            });
            return 0;
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, current]);

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<Mic className="h-7 w-7" />}
        title="Keine Sprechaufgaben"
        description="Hier gibt es aktuell keine Sprechaufgaben."
      />
    );
  }

  const startPrep = () => {
    setPhase("prep");
    setRemaining(current.preparationTimeSeconds);
    toast.info("Vorbereitungszeit läuft …");
  };

  const stopSpeaking = () => {
    setPhase("review");
    setRemaining(0);
    toast.success("Sprechzeit beendet – hier ist die Musterlösung.");
    addDemoProgress({
      itemType: "speaking_quiz",
      itemId: current.id,
      score: 100,
      practicedAt: new Date().toISOString(),
    });
  };

  const next = () => {
    if (index + 1 >= tasks.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setPhase("idle");
      setRemaining(0);
      setShowModel(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setPhase("idle");
    setRemaining(0);
    setShowModel(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <Card className="overflow-hidden border-t-4 border-t-primary text-center shadow-lg">
        <CardContent className="space-y-5 py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
            <Mic className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Sprechtraining beendet!</h2>
            <p className="mt-1 text-muted-foreground">
              Sie haben alle Sprechaufgaben bearbeitet.
            </p>
          </div>
          <Button onClick={restart} size="lg">
            <RotateCcw className="mr-2 h-4 w-4" /> Von vorne beginnen
          </Button>
        </CardContent>
      </Card>
    );
  }

  const totalTime =
    phase === "prep"
      ? current.preparationTimeSeconds
      : phase === "speak"
      ? current.speakingTimeSeconds
      : 1;
  const progress =
    phase === "idle" || phase === "review"
      ? 0
      : ((totalTime - remaining) / totalTime) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Aufgabe {index + 1} von {tasks.length}
          </p>
          <h2 className="text-xl font-bold">Sprechtrainer</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="w-fit gap-1.5">
            <Mic className="h-3.5 w-3.5" />
            {current.type}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => { toggleFocusMode(); toast(focusMode ? "Fokusmodus beendet" : "Fokusmodus aktiviert"); }} className="gap-1.5">
            <Focus className="h-4 w-4" />
            <span className="hidden sm:inline">
              {focusMode ? "Fokus beenden" : "Fokusmodus"}
            </span>
          </Button>
        </div>
      </div>

      <Progress value={(index / tasks.length) * 100} className="h-2" />

      <Card className="overflow-hidden border-t-4 border-t-rose-500 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">{current.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h4 className="font-semibold mb-2">Aufgabenstellung</h4>
            <p className="text-sm leading-relaxed">{current.task}</p>
          </div>

          {phase === "idle" && (
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-l-amber-500 bg-amber-50/40 p-4 dark:bg-amber-950/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  Tipps
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {current.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
              <StickyMobileAction>
                <Button onClick={startPrep} size="lg" className="w-full sm:w-auto">
                  <Play className="mr-2 h-4 w-4" /> Vorbereitungszeit starten
                </Button>
              </StickyMobileAction>
            </div>
          )}

          {(phase === "prep" || phase === "speak") && (
            <div className="text-center space-y-5 rounded-xl bg-muted/40 p-6">
              <div className="text-5xl font-bold tabular-nums text-primary">
                {formatTime(remaining)}
              </div>
              <Progress value={progress} className="h-2.5" />
              <p className="text-muted-foreground">
                {phase === "prep"
                  ? "Vorbereitungszeit läuft …"
                  : "Sprechzeit läuft – sprechen Sie jetzt!"}
              </p>
              {phase === "speak" && (
                <StickyMobileAction>
                  <Button variant="outline" onClick={stopSpeaking} size="lg" className="w-full sm:w-auto">
                    <Square className="mr-2 h-4 w-4" /> Sprechzeit beenden
                  </Button>
                </StickyMobileAction>
              )}
            </div>
          )}

          {phase === "review" && (
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setShowModel((s) => !s)}
              >
                {showModel ? (
                  <EyeOff className="mr-2 h-4 w-4" />
                ) : (
                  <Eye className="mr-2 h-4 w-4" />
                )}
                {showModel ? "Musterlösung verbergen" : "Musterlösung anzeigen"}
              </Button>

              {showModel && (
                <div className="rounded-lg border-l-4 border-l-primary bg-muted p-4">
                  <h4 className="font-semibold mb-2">Musterlösung</h4>
                  <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                    {current.modelAnswer}
                  </pre>
                </div>
              )}

              <StickyMobileAction>
                <Button onClick={next} size="lg" className="w-full sm:w-auto">
                  {index + 1 >= tasks.length ? "Abschließen" : "Nächste Aufgabe"}
                </Button>
              </StickyMobileAction>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
