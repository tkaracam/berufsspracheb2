"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import {
  initialImportUiState,
  type ImportUiState,
} from "@/lib/import-ui-state";
import {
  analyzeFachwortImport,
  analyzeNomenVerbImport,
  formatDuplicatePreview,
  parseFachwortRows,
  parseNomenVerbRows,
  readImportFile,
  toFachwortInsertRows,
  toNomenVerbInsertRows,
} from "@/lib/import-utils";

async function insertNomenVerbRows(
  supabase: Awaited<ReturnType<typeof createClient>>,
  rows: Database["public"]["Tables"]["nomen_verb_verbindungen"]["Insert"][]
): Promise<string[]> {
  const insertedIds: string[] = [];
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200);
    const { data, error } = await supabase
      .from("nomen_verb_verbindungen")
      .insert(chunk)
      .select("id");
    if (error) {
      throw new Error(error.message);
    }
    insertedIds.push(...(data ?? []).map((row) => row.id));
  }
  return insertedIds;
}

async function insertFachwortRows(
  supabase: Awaited<ReturnType<typeof createClient>>,
  rows: Database["public"]["Tables"]["fachwoerter"]["Insert"][]
): Promise<string[]> {
  const insertedIds: string[] = [];
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200);
    const { data, error } = await supabase
      .from("fachwoerter")
      .insert(chunk)
      .select("id");
    if (error) {
      throw new Error(error.message);
    }
    insertedIds.push(...(data ?? []).map((row) => row.id));
  }
  return insertedIds;
}

async function rollbackNomenVerbByIds(ids: string[]): Promise<number> {
  const supabase = await createClient();
  let deleted = 0;
  for (let i = 0; i < ids.length; i += 200) {
    const chunk = ids.slice(i, i + 200);
    const { data, error } = await supabase
      .from("nomen_verb_verbindungen")
      .delete()
      .in("id", chunk)
      .select("id");
    if (error) {
      throw new Error(error.message);
    }
    deleted += data?.length ?? 0;
  }
  return deleted;
}

async function rollbackFachwortByIds(ids: string[]): Promise<number> {
  const supabase = await createClient();
  let deleted = 0;
  for (let i = 0; i < ids.length; i += 200) {
    const chunk = ids.slice(i, i + 200);
    const { data, error } = await supabase
      .from("fachwoerter")
      .delete()
      .in("id", chunk)
      .select("id");
    if (error) {
      throw new Error(error.message);
    }
    deleted += data?.length ?? 0;
  }
  return deleted;
}

function buildSummaryState(
  analysis: {
    parsedRows: unknown[];
    uniqueRows: unknown[];
    duplicateKeysInFile: string[];
    duplicateKeysInDatabase: string[];
    rowsToImport: unknown[];
  },
  message: string,
  sampleRows: Record<string, string | null>[],
  status: ImportUiState["status"],
  extra?: Partial<ImportUiState["summary"]> & { insertedIds?: string[] }
): ImportUiState {
  return {
    status,
    message,
    sampleRows,
    sampleDuplicates: formatDuplicatePreview([
      ...analysis.duplicateKeysInFile,
      ...analysis.duplicateKeysInDatabase,
    ]),
    insertedIds: extra?.insertedIds ?? [],
    summary: {
      parsed: analysis.parsedRows.length,
      unique: analysis.uniqueRows.length,
      duplicatesInFile: analysis.duplicateKeysInFile.length,
      duplicatesInDatabase: analysis.duplicateKeysInDatabase.length,
      readyToImport: analysis.rowsToImport.length,
      inserted: extra?.inserted,
      rolledBack: extra?.rolledBack,
    },
  };
}

export async function updateUserRole(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const userId = formData.get("userId") as string;
  const role = formData.get("role") as Database["public"]["Enums"]["app_role"];

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/benutzer");
}

export async function importNomenVerb(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file) throw new Error("Keine Datei ausgewählt");

  const text = await file.text();
  let rows: { phrase: string; synonym: string; beispielsatz: string }[] = [];

  try {
    const parsed = JSON.parse(text);
    rows = Array.isArray(parsed) ? parsed : parsed.rows;
  } catch {
    // CSV-Import: phrase;synonym;beispielsatz
    rows = text
      .split("\n")
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const [phrase, synonym, beispielsatz] = line.split(";");
        return { phrase, synonym, beispielsatz };
      });
  }

  const { error } = await supabase.from("nomen_verb_verbindungen").insert(
    rows.map((r) => ({
      phrase: r.phrase,
      synonym: r.synonym,
      beispielsatz: r.beispielsatz,
      kategorie: null,
      audio_path: null,
      b2_relevanz: 2,
    }))
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/nomen-verb");
  revalidatePath("/nomen-verb");
}

export async function importFachwortschatz(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file) throw new Error("Keine Datei ausgewählt");

  const text = await file.text();
  let rows: {
    berufsfeld_id: string;
    begriff: string;
    artikel: string;
    synonym?: string;
    beispielsatz?: string;
  }[] = [];

  try {
    rows = JSON.parse(text);
  } catch {
    rows = text
      .split("\n")
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const [berufsfeld_id, begriff, artikel, synonym, beispielsatz] =
          line.split(";");
        return { berufsfeld_id, begriff, artikel, synonym, beispielsatz };
      });
  }

  const { error } = await supabase.from("fachwoerter").insert(
    rows.map((r) => ({
      berufsfeld_id: r.berufsfeld_id,
      beruf_id: null,
      begriff: r.begriff,
      artikel: r.artikel,
      synonym: r.synonym ?? null,
      beispielsatz: r.beispielsatz ?? null,
      audio_path: null,
      schwierigkeit: "mittel",
    }))
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/berufsfelder");
  revalidatePath("/berufsfelder");
}

export async function previewNomenVerbAction(
  _prevState: ImportUiState,
  formData: FormData
): Promise<ImportUiState> {
  try {
    const supabase = await createClient();
    const file = formData.get("file") as File;
    const text = await readImportFile(file);
    const rows = parseNomenVerbRows(text);
    const analysis = await analyzeNomenVerbImport(supabase, rows);

    return buildSummaryState(
      analysis,
      `${analysis.rowsToImport.length} Datensätze sind importierbar.`,
      analysis.rowsToImport.slice(0, 12).map((row) => ({
        phrase: row.phrase,
        kategorie: row.kategorie ?? "",
        synonym: row.synonym ?? "",
      })),
      "preview"
    );
  } catch (error) {
    return {
      ...initialImportUiState,
      status: "error",
      message: error instanceof Error ? error.message : "Vorschau fehlgeschlagen",
    };
  }
}

export async function importNomenVerbAction(
  _prevState: ImportUiState,
  formData: FormData
): Promise<ImportUiState> {
  try {
    const supabase = await createClient();
    const file = formData.get("file") as File;
    const text = await readImportFile(file);
    const rows = parseNomenVerbRows(text);
    const analysis = await analyzeNomenVerbImport(supabase, rows);

    if (!analysis.rowsToImport.length) {
      return buildSummaryState(
        analysis,
        "Keine neuen Datensätze zum Importieren gefunden.",
        analysis.uniqueRows.slice(0, 12).map((row) => ({
          phrase: row.phrase,
          kategorie: row.kategorie ?? "",
          synonym: row.synonym ?? "",
        })),
        "preview"
      );
    }

    const insertedIds = await insertNomenVerbRows(
      supabase,
      toNomenVerbInsertRows(analysis.rowsToImport)
    );

    revalidatePath("/admin/import");
    revalidatePath("/admin/nomen-verb");
    revalidatePath("/nomen-verb");

    return buildSummaryState(
      analysis,
      `${insertedIds.length} Nomen-Verb-Verbindungen wurden importiert.`,
      analysis.rowsToImport.slice(0, 12).map((row) => ({
        phrase: row.phrase,
        kategorie: row.kategorie ?? "",
        synonym: row.synonym ?? "",
      })),
      "imported",
      { inserted: insertedIds.length, insertedIds }
    );
  } catch (error) {
    return {
      ...initialImportUiState,
      status: "error",
      message: error instanceof Error ? error.message : "Import fehlgeschlagen",
    };
  }
}

export async function rollbackNomenVerbImportAction(
  _prevState: ImportUiState,
  formData: FormData
): Promise<ImportUiState> {
  try {
    const ids = JSON.parse(String(formData.get("ids") ?? "[]")) as string[];
    const deleted = await rollbackNomenVerbByIds(ids);

    revalidatePath("/admin/import");
    revalidatePath("/admin/nomen-verb");
    revalidatePath("/nomen-verb");

    return {
      ...initialImportUiState,
      status: "rolledback",
      message: `${deleted} importierte Datensätze wurden entfernt.`,
      summary: {
        parsed: 0,
        unique: 0,
        duplicatesInFile: 0,
        duplicatesInDatabase: 0,
        readyToImport: 0,
        rolledBack: deleted,
      },
    };
  } catch (error) {
    return {
      ...initialImportUiState,
      status: "error",
      message: error instanceof Error ? error.message : "Rollback fehlgeschlagen",
    };
  }
}

export async function previewFachwortschatzAction(
  _prevState: ImportUiState,
  formData: FormData
): Promise<ImportUiState> {
  try {
    const supabase = await createClient();
    const file = formData.get("file") as File;
    const text = await readImportFile(file);
    const rows = parseFachwortRows(text);
    const analysis = await analyzeFachwortImport(supabase, rows);

    return buildSummaryState(
      analysis,
      `${analysis.rowsToImport.length} Fachwörter sind importierbar.`,
      analysis.rowsToImport.slice(0, 12).map((row) => ({
        berufsfeld_id: row.berufsfeld_id,
        artikel: row.artikel,
        begriff: row.begriff,
        synonym: row.synonym ?? "",
      })),
      "preview"
    );
  } catch (error) {
    return {
      ...initialImportUiState,
      status: "error",
      message: error instanceof Error ? error.message : "Vorschau fehlgeschlagen",
    };
  }
}

export async function importFachwortschatzAction(
  _prevState: ImportUiState,
  formData: FormData
): Promise<ImportUiState> {
  try {
    const supabase = await createClient();
    const file = formData.get("file") as File;
    const text = await readImportFile(file);
    const rows = parseFachwortRows(text);
    const analysis = await analyzeFachwortImport(supabase, rows);

    if (!analysis.rowsToImport.length) {
      return buildSummaryState(
        analysis,
        "Keine neuen Fachwörter zum Importieren gefunden.",
        analysis.uniqueRows.slice(0, 12).map((row) => ({
          berufsfeld_id: row.berufsfeld_id,
          artikel: row.artikel,
          begriff: row.begriff,
          synonym: row.synonym ?? "",
        })),
        "preview"
      );
    }

    const insertedIds = await insertFachwortRows(
      supabase,
      toFachwortInsertRows(analysis.rowsToImport)
    );

    revalidatePath("/admin/import");
    revalidatePath("/admin/berufsfelder");
    revalidatePath("/berufsfelder");

    return buildSummaryState(
      analysis,
      `${insertedIds.length} Fachwörter wurden importiert.`,
      analysis.rowsToImport.slice(0, 12).map((row) => ({
        berufsfeld_id: row.berufsfeld_id,
        artikel: row.artikel,
        begriff: row.begriff,
        synonym: row.synonym ?? "",
      })),
      "imported",
      { inserted: insertedIds.length, insertedIds }
    );
  } catch (error) {
    return {
      ...initialImportUiState,
      status: "error",
      message: error instanceof Error ? error.message : "Import fehlgeschlagen",
    };
  }
}

export async function rollbackFachwortschatzImportAction(
  _prevState: ImportUiState,
  formData: FormData
): Promise<ImportUiState> {
  try {
    const ids = JSON.parse(String(formData.get("ids") ?? "[]")) as string[];
    const deleted = await rollbackFachwortByIds(ids);

    revalidatePath("/admin/import");
    revalidatePath("/admin/berufsfelder");
    revalidatePath("/berufsfelder");

    return {
      ...initialImportUiState,
      status: "rolledback",
      message: `${deleted} importierte Fachwörter wurden entfernt.`,
      summary: {
        parsed: 0,
        unique: 0,
        duplicatesInFile: 0,
        duplicatesInDatabase: 0,
        readyToImport: 0,
        rolledBack: deleted,
      },
    };
  } catch (error) {
    return {
      ...initialImportUiState,
      status: "error",
      message: error instanceof Error ? error.message : "Rollback fehlgeschlagen",
    };
  }
}
