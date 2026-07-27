import { APP_NAME } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VocabTable } from "@/components/admin/vocab-table";
import { getNomenVerbVerbindungen } from "@/lib/queries";

export const metadata = {
  title: `Nomen-Verb-Verwaltung – ${APP_NAME}`,
};

export default async function AdminNomenVerbPage() {
  const { data } = await getNomenVerbVerbindungen();

  const items = data.map((entry) => ({
    id: entry.id,
    term: entry.phrase,
    synonym: entry.synonym,
    example: entry.beispielsatz,
    audioPath: entry.audio_path,
    audioText: entry.phrase,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Nomen-Verb-Verbindungen</h1>

      <Card>
        <CardHeader>
          <CardTitle>Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <VocabTable items={items} table="nomen_verb_verbindungen" />
        </CardContent>
      </Card>
    </div>
  );
}
