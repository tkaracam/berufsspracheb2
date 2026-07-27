"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, RotateCcw, Pencil, Eye, EyeOff, ListChecks, Focus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StickyMobileAction } from "@/components/ui/sticky-action";
import { useFocusMode } from "@/components/layout/focus-mode-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { addDemoProgress } from "@/lib/demo-storage";
import { cn } from "@/lib/utils";
import type { WritingTask } from "@/lib/writing-data";

interface Props {
  tasks: WritingTask[];
}

export function WritingTrainer({ tasks }: Props) {
  const { focusMode, toggleFocusMode } = useFocusMode();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = tasks[index];
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / current.checklist.length) * 100);

  useEffect(() => {
    if (finished) {
      addDemoProgress({
        itemType: "writing_quiz",
        itemId: current.id,
        score,
        practicedAt: new Date().toISOString(),
      });
    }
  }, [finished, score, current.id]);

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<Pencil className="h-7 w-7" />}
        title="Keine Schreibaufgaben"
        description="Für diesen Bereich sind noch keine Schreibaufgaben hinterlegt."
      />
    );
  }

  const submit = () => {
    if (submitted) return;
    const percentage = Math.round((checkedCount / current.checklist.length) * 100);
    setScore(percentage);
    setSubmitted(true);
    toast.success("Eingereicht – vergleichen Sie sich mit der Musterlösung.");
  };

  const next = () => {
    if (index + 1 >= tasks.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setText("");
      setChecked({});
      setSubmitted(false);
      setShowModel(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setText("");
    setChecked({});
    setSubmitted(false);
    setShowModel(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <Card className="overflow-hidden border-t-4 border-t-primary text-center shadow-lg">
        <CardContent className="space-y-5 py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
            <Pencil className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Schreibtraining beendet!</h2>
            <p className="mt-1 text-muted-foreground">
              Sie haben alle Aufgaben bearbeitet.
            </p>
          </div>
          <Button onClick={restart} size="lg">
            <RotateCcw className="mr-2 h-4 w-4" /> Von vorne beginnen
          </Button>
        </CardContent>
      </Card>
    );
  }

  const accentByType: Record<string, string> = {
    "E-Mail": "border-l-4 border-l-violet-500",
    "Brief": "border-l-4 border-l-amber-500",
    "Zusammenfassung": "border-l-4 border-l-emerald-500",
  };
  const accent = accentByType[current.type] ?? "border-l-4 border-l-slate-300";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Aufgabe {index + 1} von {tasks.length}
          </p>
          <h2 className="text-xl font-bold">Schreibtrainer</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="w-fit gap-1.5">
            <Pencil className="h-3.5 w-3.5" />
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

      <Card className={cn("overflow-hidden shadow-md", accent)}>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">{current.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              Aufgabenstellung
            </h4>
            <p className="text-sm leading-relaxed">{current.situation}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Zu bearbeitende Punkte</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {current.requiredPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Ihr Text</h4>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Schreiben Sie hier Ihren Text ..."
              rows={8}
              disabled={submitted}
              className="resize-y"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-3">Selbstkontrolle</h4>
            <div className="space-y-2">
              {current.checklist.map((item, i) => (
                <label
                  key={i}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 text-sm cursor-pointer transition-colors",
                    submitted ? "bg-muted/30" : "hover:bg-muted/50"
                  )}
                >
                  <Checkbox
                    checked={checked[i] ?? false}
                    onCheckedChange={(val) =>
                      setChecked((prev) => ({ ...prev, [i]: val === true }))
                    }
                    disabled={submitted}
                    className="mt-0.5"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {!submitted ? (
            <StickyMobileAction>
              <Button onClick={submit} className="w-full sm:w-auto" size="lg">
                Einreichen
              </Button>
            </StickyMobileAction>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-medium text-primary">
                <CheckCircle2 className="h-5 w-5" />
                Selbstbewertung: {checkedCount} von {current.checklist.length} Punkten ({progress}%)
              </div>

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
