import Link from "next/link";
import { Info } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { readingTexts } from "@/lib/reading-data";
import { examModules } from "@/lib/exam-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";
import { ExamShell } from "@/components/exercises/exam-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Prüfungstraining Lesen – ${APP_NAME}`,
};

export default function ExamLesenPage() {
  const mod = examModules.find((m) => m.id === "lesen")!;

  const items = readingTexts.flatMap((text) =>
    text.questions.map((q, idx) => ({
      id: `${text.id}-${idx}`,
      topic: text.title.replace("Text ", ""),
      context: text.text,
      question: q.q,
      options: q.options,
      correctIndex: q.correctIndex,
      answer:
        q.correctIndex !== undefined && q.options
          ? q.options[q.correctIndex]
          : q.answer,
      explanation: q.answer,
    }))
  );

  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <ExamShell
        title={mod.title}
        durationMinutes={45}
        strategy={mod.strategy}
      >
        <Alert className="border-l-4 border-l-blue-500 bg-blue-50/40 dark:bg-blue-950/20">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <AlertTitle>Lesen Teil 1</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>
              Hier üben Sie Lesen Teil 2–4. Den Zuordnungsteil (Teil 1) finden
              Sie separat.
            </span>
            <Button asChild variant="outline" size="sm">
              <Link href="/pruefungstraining/lesen/teil-1">
                Zu Lesen Teil 1
              </Link>
            </Button>
          </AlertDescription>
        </Alert>

        <InteractiveTrainer
          title="Lesen"
          description={mod.desc}
          items={items}
          itemType="reading_quiz"
          maxPoints={60}
          shuffleItems={false}
        />
      </ExamShell>
    </div>
  );
}
