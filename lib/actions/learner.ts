"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, getSession } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import {
  joinDemoClass,
  getDemoJoinedClasses,
  getDemoClassByCode,
  getDemoClassAssignments,
  type DemoJoinedClass,
  type DemoLearnerAssignment,
} from "@/lib/demo-learner-storage";

export async function joinClassByCode(formData: FormData) {
  const code = (formData.get("code") as string)?.trim().toUpperCase();

  if (!code) {
    redirect("/klassen/beitreten?error=missing");
  }

  if (isMockMode()) {
    const cls = await joinDemoClass(code);
    if (!cls) {
      redirect("/klassen/beitreten?error=invalid");
    }
    revalidatePath("/klassen");
    redirect("/klassen");
  }

  const { user } = await getSession();
  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();

  const { data: cls } = await supabase
    .from("classes")
    .select("id, code")
    .eq("code", code)
    .single();

  if (!cls) {
    redirect("/klassen/beitreten?error=invalid");
  }

  const { data: existing } = await supabase
    .from("class_members")
    .select("id")
    .eq("class_id", cls.id)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    redirect(`/klassen/${cls.code}`);
  }

  const { error } = await supabase
    .from("class_members")
    .insert({ class_id: cls.id, user_id: user.id });

  if (error) {
    redirect("/klassen/beitreten?error=failed");
  }

  revalidatePath("/klassen");
  redirect("/klassen");
}

export async function getMyClasses(): Promise<DemoJoinedClass[]> {
  if (isMockMode()) {
    return getDemoJoinedClasses();
  }

  const { user } = await getSession();
  if (!user) return [];

  const supabase = await createClient();

  const { data: memberships } = await supabase
    .from("class_members")
    .select("class_id")
    .eq("user_id", user.id);

  const classIds = memberships?.map((m) => m.class_id) ?? [];
  if (classIds.length === 0) return [];

  const { data: classes } = await supabase
    .from("classes")
    .select("id, name, code")
    .in("id", classIds);

  return (
    classes?.map((c) => ({
      id: c.id,
      name: c.name,
      code: c.code,
    })) ?? []
  );
}

export async function getClassByCode(
  code: string
): Promise<DemoJoinedClass | null> {
  const normalized = code.trim().toUpperCase();

  if (isMockMode()) {
    return getDemoClassByCode(normalized);
  }

  const { user } = await getSession();
  if (!user) return null;

  const supabase = await createClient();

  const { data: cls } = await supabase
    .from("classes")
    .select("id, name, code")
    .eq("code", normalized)
    .single();

  if (!cls) return null;

  const { data: membership } = await supabase
    .from("class_members")
    .select("id")
    .eq("class_id", cls.id)
    .eq("user_id", user.id)
    .single();

  if (!membership) return null;

  return { id: cls.id, name: cls.name, code: cls.code };
}

export async function getClassAssignments(
  code: string
): Promise<DemoLearnerAssignment[]> {
  const normalized = code.trim().toUpperCase();

  if (isMockMode()) {
    return getDemoClassAssignments(normalized);
  }

  const cls = await getClassByCode(normalized);
  if (!cls) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("assignments")
    .select("id, title, description, due_date")
    .eq("class_id", cls.id)
    .order("created_at", { ascending: false });

  return (
    data?.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      dueDate: a.due_date,
    })) ?? []
  );
}
