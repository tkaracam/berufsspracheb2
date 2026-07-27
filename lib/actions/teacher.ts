"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import {
  createDemoClass,
  addDemoStudent,
  createDemoAssignment,
} from "@/lib/demo-teacher-storage";

export async function createClass(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;

  if (isMockMode()) {
    const cls = await createDemoClass(name);
    revalidatePath("/lehrer/klassen");
    redirect(`/lehrer/klassen/${cls.id}`);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Nicht angemeldet");

  const { data, error } = await supabase
    .from("classes")
    .insert({ name, teacher_id: user.id, code: generateCode() })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/lehrer/klassen");
  redirect(`/lehrer/klassen/${data.id}`);
}

export async function addStudent(formData: FormData) {
  "use server";

  const classId = formData.get("classId") as string;
  const email = formData.get("email") as string;

  if (isMockMode()) {
    await addDemoStudent(classId, email);
    revalidatePath(`/lehrer/klassen/${classId}`);
    return;
  }

  const supabase = await createClient();
  const { data: user } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (!user) throw new Error("Kein Nutzer mit dieser E-Mail gefunden.");

  const { error } = await supabase
    .from("class_members")
    .insert({ class_id: classId, user_id: user.id });

  if (error) throw new Error(error.message);

  revalidatePath(`/lehrer/klassen/${classId}`);
}

export async function createAssignment(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classId = formData.get("classId") as string;
  const uebungId = formData.get("uebungId") as string;

  if (isMockMode()) {
    await createDemoAssignment(title, description, classId, uebungId || null);
    revalidatePath("/lehrer/aufgaben");
    redirect("/lehrer/aufgaben");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Nicht angemeldet");

  const { error } = await supabase.from("assignments").insert({
    teacher_id: user.id,
    class_id: classId,
    title,
    description,
    due_date: null,
    uebung_id: uebungId || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/lehrer/aufgaben");
  redirect("/lehrer/aufgaben");
}

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
