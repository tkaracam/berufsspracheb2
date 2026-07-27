"use client";

import { useMemo } from "react";
import { getHeatmapData } from "@/lib/study-activity";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface StudyHeatmapProps {
  days?: number;
}

function getEmptyHeatmapData(days: number) {
  const result: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    result.push({ date: d.toISOString().split("T")[0], count: 0 });
  }
  return result;
}

function HeatmapSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] h-[140px] bg-muted/50 rounded-md animate-pulse" />
    </div>
  );
}

export function StudyHeatmap({ days = 112 }: StudyHeatmapProps) {
  const mounted = useMounted();
  const data = useMemo(() => {
    if (!mounted) return getEmptyHeatmapData(days);
    return getHeatmapData(days);
  }, [days, mounted]);

  const weeks = useMemo(() => {
    const result: { date: string; count: number; dayIndex: number }[][] = [];
    const start = new Date(data[0]?.date ?? new Date());
    start.setHours(0, 0, 0, 0);
    data.forEach((d) => {
      const date = new Date(d.date);
      date.setHours(0, 0, 0, 0);
      const dayOffset = Math.round((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.floor(dayOffset / 7);
      const dayIndex = dayOffset % 7;
      if (!result[weekIndex]) result[weekIndex] = [];
      result[weekIndex].push({ ...d, dayIndex });
    });
    return result;
  }, [data]);

  const maxCount = useMemo(() => Math.max(1, ...data.map((d) => d.count)), [data]);

  const intensityClass = (count: number) => {
    if (count === 0) return "bg-muted";
    const ratio = count / maxCount;
    if (ratio <= 0.25) return "bg-primary/30";
    if (ratio <= 0.5) return "bg-primary/50";
    if (ratio <= 0.75) return "bg-primary/70";
    return "bg-primary";
  };

  const monthLabels = useMemo(() => {
    const labels: { weekIndex: number; label: string }[] = [];
    let lastMonth = "";
    data.forEach((d) => {
      const date = new Date(d.date);
      const month = date.toLocaleDateString("de-DE", { month: "short" });
      if (month !== lastMonth) {
        const start = new Date(data[0]?.date ?? new Date());
        start.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        const dayOffset = Math.round((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        labels.push({ weekIndex: Math.floor(dayOffset / 7), label: month });
        lastMonth = month;
      }
    });
    return labels;
  }, [data]);

  if (!mounted) {
    return <HeatmapSkeleton />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="relative h-[140px]">
          {/* Month labels */}
          <div className="flex text-xs text-muted-foreground mb-1 h-4">
            {monthLabels.map((m) => (
              <div
                key={`${m.label}-${m.weekIndex}`}
                style={{
                  left: `${m.weekIndex * 16}px`,
                }}
                className="absolute"
              >
                {m.label}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex gap-1 pt-5">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = week.find((d) => d.dayIndex === dayIndex);
                  const count = day?.count ?? 0;
                  return (
                    <div
                      key={dayIndex}
                      className={cn(
                        "h-3 w-3 rounded-sm",
                        intensityClass(count)
                      )}
                      title={
                        day
                          ? `${day.date}: ${count} Aktivität${count === 1 ? "" : "en"}`
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mt-2">
          <span>Weniger</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-sm bg-muted" />
            <div className="h-3 w-3 rounded-sm bg-primary/30" />
            <div className="h-3 w-3 rounded-sm bg-primary/50" />
            <div className="h-3 w-3 rounded-sm bg-primary/70" />
            <div className="h-3 w-3 rounded-sm bg-primary" />
          </div>
          <span>Mehr</span>
        </div>
      </div>
    </div>
  );
}
