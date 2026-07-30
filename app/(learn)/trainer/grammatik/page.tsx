import { APP_NAME } from "@/lib/constants";
import { grammarQuestions } from "@/lib/grammar-data";
import { InteractiveTrainer } from "@/components/exercises/interactive-trainer";
import { CheckCircle2, Sigma } from "lucide-react";

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
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#eadfce] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_100%)] p-6 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.18)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
              Trainer · Grammatik
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              B2-Strukturen klar und sicher anwenden
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Üben Sie die wichtigsten grammatischen Muster in ruhigen, gut fokussierten Schritten.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <Sigma className="h-4 w-4" />
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>
      <InteractiveTrainer
        title="Grammatik-Trainer"
        description="Testen Sie Ihr Wissen zu den wichtigsten B2-Grammatikstrukturen."
        items={items}
        itemType="grammar_quiz"
      />
    </div>
  );
}
