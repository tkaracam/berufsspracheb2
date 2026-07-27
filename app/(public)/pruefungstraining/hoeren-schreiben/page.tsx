import { APP_NAME } from "@/lib/constants";
import { listeningWritingTasks } from "@/lib/listening-writing-data";
import { examModules } from "@/lib/exam-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";
import { ExamShell } from "@/components/exercises/exam-shell";

export const metadata = {
  title: `Prüfungstraining Hören und Schreiben – ${APP_NAME}`,
};

export default function ExamHoerenSchreibenPage() {
  const mod = examModules.find((m) => m.id === "hoeren-schreiben")!;

  const items = listeningWritingTasks.flatMap((task) =>
    task.questions.map((q, idx) => ({
      id: `${task.id}-${idx}`,
      topic: task.title,
      context: task.transcript,
      audioPath: task.audioPath,
      question: q.q,
      answer: q.answer,
      explanation: q.answer,
    }))
  );

  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <ExamShell
        title={mod.title}
        durationMinutes={5}
        strategy={mod.strategy}
      >
        <InteractiveTrainer
          title="Hören und Schreiben"
          description={mod.desc}
          items={items}
          itemType="listening_quiz"
          maxPoints={9}
          shuffleItems={false}
        />
      </ExamShell>
    </div>
  );
}
