"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Nicht angemeldet");
  }

  const fullName = formData.get("fullName") as string;
  const dailyGoal = parseInt(formData.get("dailyGoal") as string, 10);

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, daily_goal: dailyGoal })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/profil");
  revalidatePath("/dashboard");
}
