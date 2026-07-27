"use client";

import { useEffect, useState } from "react";
import { Clock, AlertCircle, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Stepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface Props {
  title: string;
  durationMinutes: number;
  strategy: string[];
  children: React.ReactNode;
  step?: number;
}

export function ExamShell({ title, durationMinutes, strategy, children, step = 1 }: Props) {
  const [remaining, setRemaining] = useState(durationMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(interval);
          return 0;
        }
        return r - 1;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [durationMinutes]);

  const progress = Math.max(0, Math.min(100, (remaining / (durationMinutes * 60)) * 100));
  const isLow = remaining < 5 * 60;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="relative bg-gradient-to-br from-rose-600 via-rose-500 to-orange-500 p-6 text-white dark:from-rose-700 dark:via-rose-600 dark:to-orange-600">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,white/10,transparent_40%)]" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                <Target className="h-3.5 w-3.5" />
                Prüfungstraining
              </div>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <Badge
                variant="secondary"
                className={cn(
                  "gap-2 text-base border-0",
                  isLow
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-white/20 text-white hover:bg-white/30"
                )}
              >
                <Clock className="h-4 w-4" />
                {formatTime(remaining)}
              </Badge>
              <Progress
                value={progress}
                className="h-1.5 w-32 bg-white/20"
              />
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="border-b bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Strategie</h3>
                <ul className="mt-1 list-disc list-inside space-y-0.5 text-sm text-muted-foreground">
                  {strategy.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <Stepper
                    steps={["Vorbereitung", "Bearbeitung", "Überprüfung", "Ergebnis"]}
                    current={step}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {children}
    </div>
  );
}
