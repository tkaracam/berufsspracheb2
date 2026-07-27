import { APP_NAME } from "@/lib/constants";
import { grammarQuestions } from "@/lib/grammar-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";

export const metadata = {
  title: `Grammatik-Trainer – ${APP_NAME}`,
};

export default function GrammarTrainerPage() {
  const items = grammarQuestions.map((q) => ({
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
      title="Grammatik-Trainer"
      description="Testen Sie Ihr Wissen zu den wichtigsten B2-Grammatikstrukturen."
      items={items}
      itemType="grammar_quiz"
    />
  );
}
