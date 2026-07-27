import { APP_NAME } from "@/lib/constants";
import { LueckentextTrainer } from "@/components/exercises/lueckentext-trainer";
import { getNomenVerbVerbindungen } from "@/lib/queries";

export const metadata = {
  title: `Lückentext – ${APP_NAME}`,
};

export default async function LueckentextPage() {
  const { data } = await getNomenVerbVerbindungen();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lückentext</h1>
        <p className="text-muted-foreground">
          Ergänzen Sie die fehlende Nomen-Verb-Verbindung im Satz.
        </p>
      </div>
      <LueckentextTrainer entries={data} />
    </div>
  );
}
