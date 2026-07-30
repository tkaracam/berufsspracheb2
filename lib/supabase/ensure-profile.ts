import type { User } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_ROLES = new Set(["guest", "learner", "teacher", "admin"]);

function getSafeRole(value: unknown) {
  return typeof value === "string" && VALID_ROLES.has(value) ? value : "learner";
}

export async function ensureProfileForUser(user: User | null) {
  if (!user?.id || !user.email) {
    return;
  }

  const admin = createAdminClient();
  if (!admin) {
    return;
  }

  const fullName =
    typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim().length > 0
      ? user.user_metadata.full_name.trim()
      : user.email;

  await admin.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: fullName,
      role: getSafeRole(user.user_metadata?.role) as "guest" | "learner" | "teacher" | "admin",
    },
    { onConflict: "id" }
  );
}
