import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isMockMode } from "@/lib/mock-user";

const PUBLIC_ROUTES = ["/", "/berufsfelder", "/nomen-verb", "/kommunikation", "/pruefungstraining"];
const AUTH_ROUTES = ["/login", "/register", "/reset-password"];

export async function proxy(request: NextRequest) {
  const mockMode = isMockMode();
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isPublic =
    PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico");

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // Im Demo-Modus keine Auth-Weiterleitungen
  if (mockMode) {
    return response;
  }

  // Eingeloggte Nutzer nicht auf Login/Register lassen
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Geschützte Bereiche
  if (!user && !isPublic && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
