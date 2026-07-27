import { APP_NAME } from "@/lib/constants";
import { VocabularyNotebook, type VocabEntry } from "@/components/exercises/vocabulary-notebook";
import { getAllFachwoerter, getBerufsfelder, getNomenVerbVerbindungen } from "@/lib/queries";

export const metadata = {
  title: `Vokabelheft – ${APP_NAME}`,
};

export default async function VocabularyNotebookPage() {
  const [woerter, felder, nv] = await Promise.all([
    getAllFachwoerter(),
    getBerufsfelder(),
    getNomenVerbVerbindungen(),
  ]);

  const feldMap = new Map(felder.map((f) => [f.id, f.title]));

  const entries: VocabEntry[] = [
    ...woerter.map((w) => ({
      id: w.id,
      type: "fachwort" as const,
      term: `${w.artikel} ${w.begriff}`,
      article: w.artikel,
      meaning: w.synonym,
      antonym: null,
      example: w.beispielsatz,
      field: feldMap.get(w.berufsfeld_id) ?? null,
      category: "Fachwort",
      audioPath: w.audio_path,
    })),
    ...nv.data.map((n) => ({
      id: n.id,
      type: "nomen_verb" as const,
      term: n.phrase,
      article: null,
      meaning: n.synonym,
      antonym: null,
      example: n.beispielsatz,
      field: null,
      category: n.kategorie ?? "Nomen-Verb",
      audioPath: n.audio_path,
    })),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vokabelheft</h1>
        <p className="text-muted-foreground">
          Behalten Sie den Überblick über Ihren Wortschatz mit Synonymen, Antonymen und eigenen Notizen.
        </p>
      </div>
      <VocabularyNotebook entries={entries} fields={felder.map((f) => ({ id: f.id, title: f.title }))} />
    </div>
  );
}
