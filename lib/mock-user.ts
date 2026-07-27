import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export type AppRole = Database["public"]["Enums"]["app_role"];

export const DEMO_ROLES: AppRole[] = ["learner", "teacher", "admin"];

export const MOCK_USER = {
  id: "00000000-0000-0000-0000-000000000000",
  email: "demo@beispiel.de",
  role: "admin" as AppRole,
  full_name: "Demo Nutzer",
};

import { isMockMode as checkMockMode } from "./is-mock-mode";

export function isMockMode() {
  return checkMockMode();
}

export async function getMockUser() {
  if (!isMockMode()) return MOCK_USER;

  const cookieStore = await cookies();
  const roleCookie = cookieStore.get("demo_role")?.value;
  const role = DEMO_ROLES.includes(roleCookie as AppRole)
    ? (roleCookie as AppRole)
    : "admin";

  return { ...MOCK_USER, role };
}
