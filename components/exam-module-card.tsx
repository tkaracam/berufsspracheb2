"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ExamModule } from "@/lib/exam-data";

interface Props {
  module: ExamModule;
  icon: React.ReactNode;
}

export function ExamModuleCard({ module, icon }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="rounded-[1.7rem] border border-[#eadfce] bg-white/88 transition-all hover:shadow-md hover:border-[#d9c9b3]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef6ef] text-[#73beb2]">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {module.desc}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="gap-1 rounded-full bg-[#eef6ef] font-normal text-[#5a8d7d]">
                  <Clock className="h-3 w-3" />
                  {module.duration}
                </Badge>
                <Badge variant="secondary" className="gap-1 rounded-full bg-[#fbf0de] font-normal text-[#c49a63]">
                  <Target className="h-3 w-3" />
                  {module.points} Punkte
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" /> Weniger
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" /> Mehr
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-6 border-t border-[#f0e5d8] pt-6">
          <div>
            <h4 className="font-semibold mb-3">Strategie</h4>
            <ul className="space-y-2 text-sm">
              {module.strategy.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 h-5 shrink-0 border-[#eadfce] px-1.5">
                    {i + 1}
                  </Badge>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#fbf5ed] p-4">
            <h4 className="font-semibold mb-2">{module.example.title}</h4>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {module.example.text}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
