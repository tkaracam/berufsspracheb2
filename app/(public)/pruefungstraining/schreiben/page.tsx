import { APP_NAME } from "@/lib/constants";
import { examWritingTasks } from "@/lib/exam-writing-data";
import { examModules } from "@/lib/exam-data";
import { ExamWritingTabs } from "@/components/exercises/exam-writing-tabs";
import { ExamShell } from "@/components/exercises/exam-shell";

export const metadata = {
  title: `Prüfungstraining Schreiben – ${APP_NAME}`,
};

export default function ExamSchreibenPage() {
  const modLesenSchreiben = examModules.find((m) => m.id === "lesen-schreiben")!;
  const modSprachbausteine = examModules.find((m) => m.id === "sprachbausteine")!;

  const strategy = [
    ...modLesenSchreiben.strategy,
    ...modSprachbausteine.strategy.slice(2),
  ];

  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <ExamShell
        title="Lesen und Schreiben / Forumsbeitrag"
        durationMinutes={35}
        strategy={strategy}
      >
        <ExamWritingTabs tasks={examWritingTasks} />
      </ExamShell>
    </div>
  );
}
