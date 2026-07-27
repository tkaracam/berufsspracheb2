"use client";

import { useMemo, useState } from "react";
import { InteractiveTrainer } from "./interactive-trainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ListeningTask } from "@/lib/listening-data";

interface Props {
  tasks: ListeningTask[];
}

export function ListeningTrainerClient({ tasks }: Props) {
  const types = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.type))).sort(),
    [tasks]
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(types);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const selectAll = () => setSelectedTypes(types);
  const clearAll = () => setSelectedTypes([]);

  const items = useMemo(() => {
    return tasks
      .filter((task) => selectedTypes.includes(task.type))
      .flatMap((task) =>
        task.questions.map((q, idx) => ({
          id: `${task.id}-${idx}`,
          topic: task.title,
          context: task.transcript,
          audioPath: task.audioPath,
          question: q.q,
          answer: q.answer,
          explanation: q.answer,
          options: q.options,
          correctIndex: q.correctIndex,
        }))
      );
  }, [tasks, selectedTypes]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hörverstehen-Trainer</h1>
        <p className="text-muted-foreground">
          Hören Sie den Text und beantworten Sie die Fragen. Das Transkript können
          Sie bei Bedarf einblenden.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="text-sm font-medium">Aufgabentyp filtern</span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={selectAll}
              disabled={selectedTypes.length === types.length}
            >
              Alle
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAll}
              disabled={selectedTypes.length === 0}
            >
              Keine
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const active = selectedTypes.includes(type);
            const count = tasks.filter((t) => t.type === type).length;
            return (
              <Button
                key={type}
                type="button"
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => toggleType(type)}
                className="gap-2"
              >
                {type}
                <Badge variant={active ? "secondary" : "outline"} className="text-xs">
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {items.length} Frage{items.length !== 1 ? "n" : ""} ausgewählt
        </p>
      </div>

      <InteractiveTrainer
        title=""
        description=""
        items={items}
        itemType="listening_quiz"
        hideContextInitially
      />
    </div>
  );
}
