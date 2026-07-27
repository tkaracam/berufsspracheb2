import { APP_NAME } from "@/lib/constants";
import { FachwortschatzTrainer } from "@/components/exercises/fachwortschatz-trainer";
import { getAllFachwoerter, getBerufsfelder } from "@/lib/queries";

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
      <div>
        <h1 className="text-3xl font-bold">Fachwortschatz-Trainer</h1>
        <p className="text-muted-foreground">
          Lernen Sie Fachbegriffe mit Artikel, Synonym und Beispielsatz.
        </p>
      </div>
      <FachwortschatzTrainer entries={entries} fields={felder.map((f) => ({ id: f.id, title: f.title }))} />
    </div>
  );
}
