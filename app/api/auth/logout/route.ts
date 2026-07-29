import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    await supabase.auth.signOut();
  } catch {
    // Auch im Demo-Modus soll das Abmelden funktionieren.
  }

  const origin = new URL(request.url).origin;
  const response = NextResponse.redirect(
    new URL("/", origin)
  );
  response.cookies.delete("demo_role");
  return response;
}
