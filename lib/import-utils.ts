import type { Database } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

type ImportSourceRow = Record<string, unknown>;
type ImportSupabaseClient = SupabaseClient<Database>;

export interface NomenVerbImportRow {
  phrase: string;
  synonym: string | null;
  beispielsatz: string | null;
  kategorie?: string | null;
  b2_relevanz?: number;
  audio_path?: string | null;
}

export interface FachwortImportRow {
  berufsfeld_id: string;
  begriff: string;
  artikel: string;
  synonym?: string | null;
  beispielsatz?: string | null;
}

export interface ImportAnalysis<T> {
  parsedRows: T[];
  uniqueRows: T[];
  duplicateKeysInFile: string[];
  duplicateKeysInDatabase: string[];
  rowsToImport: T[];
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? "").trim();
}

function asOptionalString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function normalizeKey(value: string): string {
  return normalizeText(value).toLocaleLowerCase("de");
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export async function readImportFile(file: File): Promise<string> {
  if (!file) {
    throw new Error("Keine Datei ausgewählt");
  }
  return file.text();
}

export function parseNomenVerbRows(text: string): NomenVerbImportRow[] {
  try {
    const parsed = JSON.parse(text);
    const rows = (Array.isArray(parsed) ? parsed : parsed.rows) as ImportSourceRow[];
    return rows
      .map((row: ImportSourceRow) => ({
        phrase: normalizeText(asOptionalString(row.phrase)),
        synonym: normalizeText(asOptionalString(row.synonym)) || null,
        beispielsatz: normalizeText(asOptionalString(row.beispielsatz)) || null,
        kategorie: normalizeText(asOptionalString(row.kategorie)) || null,
        b2_relevanz: typeof row.b2_relevanz === "number" ? row.b2_relevanz : 2,
        audio_path: normalizeText(asOptionalString(row.audio_path)) || null,
      }))
      .filter((row) => row.phrase);
  } catch {
    return text
      .split("\n")
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const [phrase, synonym, beispielsatz] = line.split(";");
        return {
          phrase: normalizeText(phrase),
          synonym: normalizeText(synonym) || null,
          beispielsatz: normalizeText(beispielsatz) || null,
          kategorie: null,
          b2_relevanz: 2,
          audio_path: null,
        };
      })
      .filter((row) => row.phrase);
  }
}

export function parseFachwortRows(text: string): FachwortImportRow[] {
  try {
    const parsed = JSON.parse(text);
    const rows = (Array.isArray(parsed) ? parsed : parsed.rows) as ImportSourceRow[];
    return rows
      .map((row: ImportSourceRow) => ({
        berufsfeld_id: normalizeText(asOptionalString(row.berufsfeld_id)),
        begriff: normalizeText(asOptionalString(row.begriff)),
        artikel: normalizeText(asOptionalString(row.artikel)),
        synonym: normalizeText(asOptionalString(row.synonym)) || null,
        beispielsatz: normalizeText(asOptionalString(row.beispielsatz)) || null,
      }))
      .filter((row) => row.berufsfeld_id && row.begriff && row.artikel);
  } catch {
    return text
      .split("\n")
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const [berufsfeld_id, begriff, artikel, synonym, beispielsatz] =
          line.split(";");
        return {
          berufsfeld_id: normalizeText(berufsfeld_id),
          begriff: normalizeText(begriff),
          artikel: normalizeText(artikel),
          synonym: normalizeText(synonym) || null,
          beispielsatz: normalizeText(beispielsatz) || null,
        };
      })
      .filter((row) => row.berufsfeld_id && row.begriff && row.artikel);
  }
}

function dedupeRows<T>(rows: T[], getKey: (row: T) => string): Pick<
  ImportAnalysis<T>,
  "uniqueRows" | "duplicateKeysInFile"
> {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  const uniqueRows: T[] = [];

  for (const row of rows) {
    const key = getKey(row);
    if (seen.has(key)) {
      duplicates.add(key);
      continue;
    }
    seen.add(key);
    uniqueRows.push(row);
  }

  return {
    uniqueRows,
    duplicateKeysInFile: [...duplicates],
  };
}

async function fetchExistingKeys(
  supabase: ImportSupabaseClient,
  table: string,
  selectColumn: string,
  values: string[]
): Promise<string[]> {
  const matches: string[] = [];
  for (const chunk of chunkArray(values, 200)) {
    const { data, error } = await supabase
      .from(table)
      .select(selectColumn)
      .in(selectColumn, chunk);
    if (error) {
      throw new Error(error.message);
    }
    for (const row of data ?? []) {
      const value = row[selectColumn];
      if (typeof value === "string") {
        matches.push(value);
      }
    }
  }
  return matches;
}

export async function analyzeNomenVerbImport(
  supabase: ImportSupabaseClient,
  rows: NomenVerbImportRow[]
): Promise<ImportAnalysis<NomenVerbImportRow>> {
  const parsedRows = rows.filter((row) => row.phrase);
  const { uniqueRows, duplicateKeysInFile } = dedupeRows(parsedRows, (row) =>
    normalizeKey(row.phrase)
  );

  const phrases = uniqueRows.map((row) => row.phrase);
  const duplicateKeysInDatabase = (await fetchExistingKeys(
    supabase,
    "nomen_verb_verbindungen",
    "phrase",
    phrases
  )).map(normalizeKey);
  const existing = new Set(duplicateKeysInDatabase);

  return {
    parsedRows,
    uniqueRows,
    duplicateKeysInFile,
    duplicateKeysInDatabase,
    rowsToImport: uniqueRows.filter((row) => !existing.has(normalizeKey(row.phrase))),
  };
}

function fachwortKey(row: FachwortImportRow): string {
  return [
    normalizeKey(row.berufsfeld_id),
    normalizeKey(row.artikel),
    normalizeKey(row.begriff),
  ].join("::");
}

export async function analyzeFachwortImport(
  supabase: ImportSupabaseClient,
  rows: FachwortImportRow[]
): Promise<ImportAnalysis<FachwortImportRow>> {
  const parsedRows = rows.filter(
    (row) => row.berufsfeld_id && row.artikel && row.begriff
  );
  const { uniqueRows, duplicateKeysInFile } = dedupeRows(parsedRows, fachwortKey);

  const duplicateKeysInDatabase: string[] = [];
  for (const chunk of chunkArray(uniqueRows, 150)) {
    const begriffe = [...new Set(chunk.map((row) => row.begriff))];
    const berufsfelder = [...new Set(chunk.map((row) => row.berufsfeld_id))];
    const artikel = new Set(chunk.map((row) => normalizeKey(row.artikel)));

    const { data, error } = await supabase
      .from("fachwoerter")
      .select("berufsfeld_id, begriff, artikel")
      .in("begriff", begriffe);

    if (error) {
      throw new Error(error.message);
    }

    for (const row of data ?? []) {
      const berufsfeldId = String(row.berufsfeld_id ?? "");
      const begriff = String(row.begriff ?? "");
      const artikelValue = String(row.artikel ?? "");
      if (
        berufsfelder.includes(berufsfeldId) &&
        artikel.has(normalizeKey(artikelValue))
      ) {
        duplicateKeysInDatabase.push(
          [normalizeKey(berufsfeldId), normalizeKey(artikelValue), normalizeKey(begriff)].join("::")
        );
      }
    }
  }

  const existing = new Set(duplicateKeysInDatabase);

  return {
    parsedRows,
    uniqueRows,
    duplicateKeysInFile,
    duplicateKeysInDatabase,
    rowsToImport: uniqueRows.filter((row) => !existing.has(fachwortKey(row))),
  };
}

export function formatDuplicatePreview(keys: string[], limit = 8): string[] {
  return keys.slice(0, limit);
}

export function toNomenVerbInsertRows(rows: NomenVerbImportRow[]): Database["public"]["Tables"]["nomen_verb_verbindungen"]["Insert"][] {
  return rows.map((row) => ({
    phrase: row.phrase,
    synonym: row.synonym ?? null,
    beispielsatz: row.beispielsatz ?? null,
    kategorie: row.kategorie ?? null,
    b2_relevanz: row.b2_relevanz ?? 2,
    audio_path: row.audio_path ?? null,
  }));
}

export function toFachwortInsertRows(rows: FachwortImportRow[]): Database["public"]["Tables"]["fachwoerter"]["Insert"][] {
  return rows.map((row) => ({
    berufsfeld_id: row.berufsfeld_id,
    beruf_id: null,
    begriff: row.begriff,
    artikel: row.artikel,
    synonym: row.synonym ?? null,
    beispielsatz: row.beispielsatz ?? null,
    audio_path: null,
    schwierigkeit: "mittel",
  }));
}
