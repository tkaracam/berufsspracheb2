"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function uploadAudio(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Nicht angemeldet");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "teacher")) {
    throw new Error("Keine Berechtigung");
  }

  const file = formData.get("file") as File;
  const table = formData.get("table") as string;
  const id = formData.get("id") as string;

  if (!file || !table || !id) {
    throw new Error("Fehlende Daten");
  }

  const ext = file.name.split(".").pop() ?? "mp3";
  const path = `${table}/${id}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("audio")
    .upload(path, file, { upsert: true });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { error: updateError } = await supabase
    .from(table as "fachwoerter" | "nomen_verb_verbindungen")
    .update({ audio_path: path })
    .eq("id", id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/admin/nomen-verb");
  revalidatePath("/admin/berufsfelder");
  revalidatePath("/trainer/nomen-verb");
  revalidatePath("/trainer/fachwortschatz");
}
