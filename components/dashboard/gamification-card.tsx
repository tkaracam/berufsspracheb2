"use client";

import { useMemo } from "react";
import { Award, Star, Trophy, Zap, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useMounted } from "@/lib/hooks/use-mounted";
import {
  getDemoProgress,
  getTodayDemoProgressCount,
  getCompletedDemoProgressCount,
} from "@/lib/demo-storage";
import { cn } from "@/lib/utils";

const BADGES = [
  {
    id: "first-steps",
    label: "Erste Schritte",
    icon: Star,
    check: (total: number) => total >= 1,
  },
  {
    id: "daily-grind",
    label: "Lernfleiß",
    icon: Flame,
    check: (total: number, today: number) => today >= 5,
  },
  {
    id: "expert",
    label: "Experte",
    icon: Trophy,
    check: (total: number, today: number, completed: number) => completed >= 10,
  },
  {
    id: "versatile",
    label: "Vielseitig",
    icon: Award,
    check: (total: number, today: number, completed: number, types: number) => types >= 3,
  },
  {
    id: "lightning",
    label: "Blitzlerner",
    icon: Zap,
    check: (total: number, today: number) => today >= 20,
  },
];

export function GamificationCard() {
  const mounted = useMounted();

  const { today, completed, unlocked } = useMemo(() => {
    const progress = mounted ? getDemoProgress() : [];
    const total = progress.length;
    const today = mounted ? getTodayDemoProgressCount() : 0;
    const completed = mounted ? getCompletedDemoProgressCount() : 0;
    const types = new Set(progress.map((p) => p.itemType)).size;
    const unlocked = BADGES.filter((b) =>
      b.check(total, today, completed, types)
    );
    return { today, completed, unlocked };
  }, [mounted]);

  return (
    <Card className="overflow-hidden border-t-4 border-t-amber-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Errungenschaften
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <ProgressRing
            value={mounted ? Math.min((unlocked.length / BADGES.length) * 100, 100) : 0}
            size={72}
            strokeWidth={6}
            label={`${unlocked.length}/${BADGES.length}`}
            sublabel="Badges"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Flame className="h-4 w-4 text-orange-500" />
              Heute: {today} Übung{today !== 1 ? "en" : ""}
            </div>
            <div className="text-sm text-muted-foreground">
              {completed} Übungen mit ≥ 80 %
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {BADGES.map((badge) => {
            const isUnlocked = unlocked.some((u) => u.id === badge.id);
            const Icon = badge.icon;
            return (
              <Badge
                key={badge.id}
                variant={isUnlocked ? "default" : "outline"}
                className={cn(
                  "gap-1.5 py-1.5 transition-colors",
                  !isUnlocked && "text-muted-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {badge.label}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
