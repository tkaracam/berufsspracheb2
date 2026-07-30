import { APP_NAME, BERUFSFELDER } from "@/lib/constants";
import { getAllFachwoerter, getNomenVerbVerbindungen } from "@/lib/queries";
import { SearchPageClient } from "@/components/search/search-page-client";

export const metadata = {
  title: `Suche – ${APP_NAME}`,
};

const feldMap = new Map<string, string>(BERUFSFELDER.map((f) => [f.id, f.title]));

export default async function SearchPage() {
  const [fachwoerter, nomenVerbResult] = await Promise.all([
    getAllFachwoerter(),
    getNomenVerbVerbindungen(),
  ]);

  const fachwoerterIndex = fachwoerter.map((wort) => ({
    id: wort.id,
    begriff: wort.begriff,
    artikel: wort.artikel,
    synonym: wort.synonym,
    beispielsatz: wort.beispielsatz,
    feldTitle: feldMap.get(wort.berufsfeld_id) ?? "",
  }));

  const nomenVerbIndex = nomenVerbResult.data.map((eintrag) => ({
    id: eintrag.id,
    phrase: eintrag.phrase,
    synonym: eintrag.synonym,
    beispielsatz: eintrag.beispielsatz,
    kategorie: eintrag.kategorie,
  }));

  return (
    <SearchPageClient
      fachwoerter={fachwoerterIndex}
      nomenVerb={nomenVerbIndex}
    />
  );
}
