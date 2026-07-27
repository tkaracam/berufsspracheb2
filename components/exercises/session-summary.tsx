"use client";

import Link from "next/link";
import { CheckCircle2, Clock, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionSummaryProps {
  stats: {
    new: number;
    review: number;
    again: number;
    hard: number;
    good: number;
    easy: number;
  };
  durationMinutes: number;
  onRestart: () => void;
  onFinish?: () => void;
}

export function SessionSummary({
  stats,
  durationMinutes,
  onRestart,
  onFinish,
}: SessionSummaryProps) {
  const total = stats.again + stats.hard + stats.good + stats.easy;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold">Geschafft!</h2>
        <p className="text-muted-foreground">
          Du hast {total} Karten in {durationMinutes} Minute{nText(durationMinutes)} gelernt.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Neu" value={stats.new} />
        <StatCard label="Wiederholt" value={stats.review} />
        <StatCard label="Gut/Einfach" value={stats.good + stats.easy} variant="good" />
        <StatCard label="Nochmal/Schwer" value={stats.again + stats.hard} variant="again" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Dauer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{durationMinutes} Min.</p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 gap-2" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          Nochmal lernen
        </Button>
        <Button variant="outline" className="flex-1 gap-2" asChild onClick={onFinish}>
          <Link href="/dashboard">
            <Home className="h-4 w-4" />
            Zum Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant?: "good" | "again";
}) {
  return (
    <Card>
      <CardContent className="p-4 text-center space-y-1">
        <div
          className={`text-2xl font-bold ${
            variant === "good"
              ? "text-[var(--anki-good)]"
              : variant === "again"
              ? "text-[var(--anki-again)]"
              : ""
          }`}
        >
          {value}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

function nText(n: number): string {
  return n === 1 ? "" : "n";
}
