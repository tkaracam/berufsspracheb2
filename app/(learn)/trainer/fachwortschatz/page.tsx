import { APP_NAME } from "@/lib/constants";
import { FachwortschatzTrainer } from "@/components/exercises/fachwortschatz-trainer";
import { getAllFachwoerter, getBerufsfelder } from "@/lib/queries";
import { BookOpen, BriefcaseBusiness } from "lucide-react";

export const metadata = {
  title: `Fachwortschatz-Trainer – ${APP_NAME}`,
};

export default async function FachwortschatzTrainerPage() {
  const [woerter, felder] = await Promise.all([
    getAllFachwoerter(),
    getBerufsfelder(),
  ]);

  const feldMap = new Map(felder.map((f) => [f.id, f.title]));

  const entries = woerter.map((w) => ({
    ...w,
    berufsfelder: { title: feldMap.get(w.berufsfeld_id) ?? "" },
  }));

  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-[#eadfce] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_100%)] p-6 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.18)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
              Trainer · Fachwortschatz
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Fachbegriffe gezielt und ruhig vertiefen
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Lernen Sie Begriffe mit Artikel, Synonym und Beispielsatz direkt im passenden beruflichen Kontext.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <BriefcaseBusiness className="h-4 w-4" />
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0f4f55]">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>
      <FachwortschatzTrainer entries={entries} fields={felder.map((f) => ({ id: f.id, title: f.title }))} />
    </div>
  );
}
