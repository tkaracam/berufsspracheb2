import { APP_NAME } from "@/lib/constants";
import { readingMatchingTasks } from "@/lib/reading-matching-data";
import { ReadingMatchingTrainer } from "@/components/exercises/reading-matching-trainer";
import { ExamShell } from "@/components/exercises/exam-shell";

export const metadata = {
  title: `Prüfungstraining Lesen Teil 1 – ${APP_NAME}`,
};

const strategy = [
  "Lesen Sie zuerst die 5 Personen/Meinungen durch.",
  "Lesen Sie dann die 8 Artikel und markieren Sie Schlüsselwörter.",
  "Ordnen Sie jedem Passenden genau einen Artikel zu.",
  "Achten Sie auf Täuscher – nicht jeder Artikel passt zu einer Person.",
];

export default function ExamLesenTeil1Page() {
  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <ExamShell
        title="Lesen Teil 1 – Zuordnung"
        durationMinutes={10}
        strategy={strategy}
      >
        <ReadingMatchingTrainer tasks={readingMatchingTasks} />
      </ExamShell>
    </div>
  );
}
