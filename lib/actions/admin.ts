"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

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
