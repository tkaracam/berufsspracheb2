import { APP_NAME } from "@/lib/constants";
import { redemittelQuestions } from "@/lib/redemittel-quiz-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";

export const metadata = {
  title: `Redemittel-Trainer – ${APP_NAME}`,
};

export default function RedemittelTrainerPage() {
  const items = redemittelQuestions.map((q) => ({
    id: q.id,
    topic: q.topic,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    answer: q.options[q.correctIndex],
    explanation: q.explanation,
  }));

  return (
    <InteractiveTrainer
      title="Redemittel-Trainer"
      description="Wählen Sie die passende Redewendung für berufliche Situationen."
      items={items}
      itemType="redemittel_quiz"
    />
  );
}
