import { APP_NAME } from "@/lib/constants";
import { NomenVerbTrainer } from "@/components/exercises/nomen-verb-trainer";
import { getNomenVerbVerbindungen } from "@/lib/queries";
import { Link2, MessageSquareQuote } from "lucide-react";

export const metadata = {
  title: `Nomen-Verb-Trainer – ${APP_NAME}`,
};

export default async function NomenVerbTrainerPage() {
  const { data } = await getNomenVerbVerbindungen();

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#eadfce] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_100%)] p-6 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.18)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
              Trainer · Nomen-Verb
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Feste Verbindungen schneller erkennen
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Trainieren Sie typische Nomen-Verb-Verbindungen für Beruf, Kurs und Prüfung in klaren Übungsformaten.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <Link2 className="h-4 w-4" />
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <MessageSquareQuote className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      <NomenVerbTrainer entries={data} />
    </div>
  );
}
