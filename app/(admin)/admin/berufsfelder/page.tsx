import { APP_NAME } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VocabTable } from "@/components/admin/vocab-table";
import { getBerufsfelder, getAllFachwoerter } from "@/lib/queries";

export const metadata = {
  title: `Berufsfelder verwalten – ${APP_NAME}`,
};

export default async function AdminBerufsfelderPage() {
  const [berufsfelder, fachwoerter] = await Promise.all([
    getBerufsfelder(),
    getAllFachwoerter(100),
  ]);

  type Wort = (typeof fachwoerter)[number];
  const wortMap = fachwoerter.reduce<Map<string, Wort[]>>((map, w) => {
    const list = map.get(w.berufsfeld_id) ?? [];
    list.push(w);
    map.set(w.berufsfeld_id, list);
    return map;
  }, new Map());

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Berufsfelder verwalten</h1>

      <div className="grid gap-6">
        {berufsfelder.map((feld) => {
          const items = (wortMap.get(feld.id) ?? []).map((wort) => ({
            id: wort.id,
            term: `${wort.artikel} ${wort.begriff}`,
            synonym: wort.synonym,
            example: wort.beispielsatz,
            audioPath: wort.audio_path,
            audioText: `${wort.artikel} ${wort.begriff}`,
          }));

          return (
            <Card key={feld.id}>
              <CardHeader>
                <CardTitle>{feld.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {feld.description}
                </p>
                <VocabTable items={items} table="fachwoerter" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
