import { APP_NAME } from "@/lib/constants";
import { readingTexts } from "@/lib/reading-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";
import { BookText, ScanSearch } from "lucide-react";

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
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#eadfce] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_100%)] p-6 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.18)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
              Trainer · Lesen
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Texte sicherer erfassen und verstehen
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Lesen Sie berufsnahe Inhalte und beantworten Sie die Fragen in einem ruhigen, klaren Übungsfluss.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <BookText className="h-4 w-4" />
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <ScanSearch className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>
      <InteractiveTrainer
        title="Leseverstehen-Trainer"
        description="Lesen Sie die Texte und beantworten Sie die Fragen."
        items={items}
        itemType="reading_quiz"
      />
    </div>
  );
}
