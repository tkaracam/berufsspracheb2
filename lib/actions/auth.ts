"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getSiteUrl } from "@/lib/site-url";
import { ensureProfileForUser } from "@/lib/supabase/ensure-profile";

function normalizeAuthError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials")) {
    return "E-Mail oder Passwort stimmt nicht. Falls du dich gerade registriert hast, bestätige zuerst deine E-Mail und versuche es danach erneut.";
  }

  if (lower.includes("email not confirmed")) {
    return "Bitte bestätige zuerst deine E-Mail-Adresse. Danach kannst du dich normal anmelden.";
  }

  if (lower.includes("user already registered")) {
    return "Für diese E-Mail-Adresse existiert bereits ein Konto. Melde dich an oder setze dein Passwort zurück.";
  }

  return message;
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(normalizeAuthError(error.message))}`);
  }

  await ensureProfileForUser(data.user);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function register(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const siteUrl = await getSiteUrl();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName || email },
      emailRedirectTo: `${siteUrl}/api/auth/callback`,
    },
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(normalizeAuthError(error.message))}`);
  }

  await ensureProfileForUser(data.user);

  redirect(`/login?registered=true&email=${encodeURIComponent(email)}`);
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const siteUrl = await getSiteUrl();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/api/auth/callback?next=/reset-password`,
  });

  if (error) {
    redirect(`/reset-password?error=${encodeURIComponent(normalizeAuthError(error.message))}`);
  }

  redirect("/login?reset=true");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function demoLogin(formData: FormData) {
  if (!isMockMode()) {
    redirect("/login?error=Demo-Login+nicht+verf%C3%BCgbar");
  }

  const role = formData.get("role") as string;
  if (!["learner", "teacher", "admin"].includes(role)) {
    redirect("/login?error=Ung%C3%BCltige+Rolle");
  }

  const cookieStore = await cookies();
  cookieStore.set("demo_role", role, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
  });

  revalidatePath("/", "layout");

  if (role === "admin") redirect("/admin/dashboard");
  if (role === "teacher") redirect("/lehrer/dashboard");
  redirect("/dashboard");
}
