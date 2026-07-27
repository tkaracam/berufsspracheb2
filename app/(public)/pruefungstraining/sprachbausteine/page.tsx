import { APP_NAME } from "@/lib/constants";
import { sprachbausteineQuestions } from "@/lib/sprachbausteine-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";
import { ExamShell } from "@/components/exercises/exam-shell";

export const metadata = {
  title: `Prüfungstraining Sprachbausteine – ${APP_NAME}`,
};

export default function ExamSprachbausteinePage() {
  const strategy = [
    "Lesen Sie den ganzen Satz, bevor Sie die Lücke füllen.",
    "Achten Sie auf feste Verbindungen und den Kasus nach Präpositionen.",
    "Vergleichen Sie alle Antwortmöglichkeiten.",
    "Beim Forumsbeitrag: Begründen Sie Ihre Meinung mit Beispielen.",
  ];

  const items = sprachbausteineQuestions.map((q) => ({
    id: q.id,
    topic: q.part,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    answer: q.options[q.correctIndex],
    explanation: q.explanation,
  }));

  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <ExamShell
        title="Sprachbausteine und Schreiben"
        durationMinutes={35}
        strategy={strategy}
      >
        <InteractiveTrainer
          title="Sprachbausteine"
          description="Wählen Sie die passende Verbindung, Präposition oder den Konnektor."
          items={items}
          itemType="grammar_quiz"
          maxPoints={60}
          shuffleItems={false}
        />
      </ExamShell>
    </div>
  );
}
