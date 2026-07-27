import { APP_NAME } from "@/lib/constants";
import { speakingTasks } from "@/lib/speaking-data";
import { examModules } from "@/lib/exam-data";
import { SpeakingTrainer } from "@/components/exercises/speaking-trainer";
import { ExamShell } from "@/components/exercises/exam-shell";

export const metadata = {
  title: `Prüfungstraining Sprechen – ${APP_NAME}`,
};

export default function ExamSprechenPage() {
  const mod = examModules.find((m) => m.id === "sprechen")!;

  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <ExamShell
        title={mod.title}
        durationMinutes={16}
        strategy={mod.strategy}
      >
        <SpeakingTrainer tasks={speakingTasks} />
      </ExamShell>
    </div>
  );
}
