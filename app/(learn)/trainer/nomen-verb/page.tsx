import { APP_NAME } from "@/lib/constants";
import { NomenVerbTrainer } from "@/components/exercises/nomen-verb-trainer";
import { getNomenVerbVerbindungen } from "@/lib/queries";

export const metadata = {
  title: `Nomen-Verb-Trainer – ${APP_NAME}`,
};

export default async function NomenVerbTrainerPage() {
  const { data } = await getNomenVerbVerbindungen();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nomen-Verb-Trainer</h1>
        <p className="text-muted-foreground">
          Wählen Sie die richtige Bedeutung oder ergänzen Sie die fehlende
          Verbindung.
        </p>
      </div>

      <NomenVerbTrainer entries={data} />
    </div>
  );
}
