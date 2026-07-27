"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMounted } from "@/lib/hooks/use-mounted";
import { getSRSCards } from "@/lib/spaced-repetition";

interface ForecastProps {
  itemIds: string[];
  days?: number;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function ForecastSkeleton({ days }: { days: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: days }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-16 h-4 bg-muted rounded shrink-0" />
          <div className="flex-1 h-8 bg-muted rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function Forecast({ itemIds, days = 7 }: ForecastProps) {
  const mounted = useMounted();

  const data = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    // Während SSR/Hydration liefern wir leere Werte, damit Server und Client
    // übereinstimmen. Erst nach der Hydration werden die SRS-Daten gelesen.
    if (!mounted) {
      return Array.from({ length: days }, (_, i) => ({
        date: addDays(today, i),
        count: 0,
        isToday: i === 0,
      }));
    }

    const cards = getSRSCards();
    const counts: { date: string; count: number; isToday: boolean }[] = [];

    for (let i = 0; i < days; i++) {
      const date = addDays(today, i);
      let count = 0;

      itemIds.forEach((id) => {
        const card = cards[id];
        if (!card) {
          // New cards count as due today
          if (i === 0) count++;
          return;
        }

        if (card.suspendedUntil && card.suspendedUntil >= today) return;
        if (card.buriedUntil && card.buriedUntil >= today) return;

        if (card.dueDate === date) {
          count++;
        }
      });

      counts.push({ date, count, isToday: i === 0 });
    }

    return counts;
  }, [itemIds, days, mounted]);

  const max = useMemo(() => Math.max(1, ...data.map((d) => d.count)), [data]);
  const total = useMemo(() => data.reduce((sum, d) => sum + d.count, 0), [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast</CardTitle>
        <CardDescription>{total} Karten in den nächsten {days} Tagen</CardDescription>
      </CardHeader>
      <CardContent>
        {!mounted ? (
          <ForecastSkeleton days={days} />
        ) : (
          <div className="space-y-3">
            {data.map((d) => (
              <div key={d.date} className="flex items-center gap-3">
                <div className="w-16 text-sm text-muted-foreground shrink-0">
                  {d.isToday ? "Heute" : formatForecastLabel(d.date)}
                </div>
                <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden relative">
                  <div
                    className="h-full bg-primary transition-all duration-500 rounded-md"
                    style={{ width: `${(d.count / max) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center px-2 text-xs font-medium mix-blend-difference text-white">
                    {d.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatForecastLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric" });
}
