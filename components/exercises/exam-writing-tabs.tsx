"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WritingTrainer } from "./writing-trainer";
import type { ExamWritingTask } from "@/lib/exam-writing-data";

interface Props {
  tasks: ExamWritingTask[];
}

export function ExamWritingTabs({ tasks }: Props) {
  const [tab, setTab] = useState<"lesen-schreiben" | "sprachbausteine">(
    "lesen-schreiben"
  );

  const filtered = tasks.filter((t) => t.examPart === tab);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={tab === "lesen-schreiben" ? "default" : "outline"}
          onClick={() => setTab("lesen-schreiben")}
        >
          Lesen und Schreiben
        </Button>
        <Button
          variant={tab === "sprachbausteine" ? "default" : "outline"}
          onClick={() => setTab("sprachbausteine")}
        >
          Forumsbeitrag
        </Button>
      </div>
      <WritingTrainer key={tab} tasks={filtered} />
    </div>
  );
}
