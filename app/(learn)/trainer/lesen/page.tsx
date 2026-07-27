import { APP_NAME } from "@/lib/constants";
import { readingTexts } from "@/lib/reading-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";

export const metadata = {
  title: `Lesetrainer – ${APP_NAME}`,
};

export default function ReadingTrainerPage() {
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
    <InteractiveTrainer
      title="Leseverstehen-Trainer"
      description="Lesen Sie die Texte und beantworten Sie die Fragen."
      items={items}
      itemType="reading_quiz"
    />
  );
}
