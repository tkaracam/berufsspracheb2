import Link from "next/link";
import { login, demoLogin } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { isMockMode } from "@/lib/mock-user";

export const metadata = {
  title: `Login – ${APP_NAME}`,
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; registered?: string; reset?: string }>;
}) {
  const { error, registered, reset } = await searchParams;
  const showDemo = isMockMode();

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Willkommen zurück</h1>
        <p className="text-base leading-7 text-slate-600">
          Schön, dass du wieder da bist. Melde dich an und lerne ruhig weiter.
        </p>
      </div>

      <Card className="rounded-[2rem] border border-[#eadfce] bg-white/92 shadow-[0_28px_70px_-42px_rgba(115,190,178,0.32)]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-slate-900">Anmelden</CardTitle>
          <CardDescription>
            Zugang zu Lernfortschritt, Favoriten und deinen nächsten Einheiten.
          </CardDescription>
        </CardHeader>
        <form action={login}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
              </Alert>
            )}
            {registered && (
              <Alert>
                <AlertDescription>
                  Registrierung erfolgreich. Bitte bestätigen Sie Ihre E-Mail-Adresse.
                </AlertDescription>
              </Alert>
            )}
            {reset && (
              <Alert>
                <AlertDescription>
                  Eine E-Mail zum Zurücksetzen wurde gesendet (falls ein Konto existiert).
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@beispiel.de"
                required
                autoComplete="email"
                className="h-12 rounded-2xl border-[#eadfce] bg-[#fffdf9]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
                <Link
                  href="/reset-password"
                  className="text-xs text-muted-foreground hover:text-primary hover:underline"
                >
                  Passwort vergessen?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-12 rounded-2xl border-[#eadfce] bg-[#fffdf9]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton size="lg" className="h-12 w-full rounded-2xl bg-[#73beb2] hover:bg-[#64aea3]">
              Anmelden
            </SubmitButton>
            <p className="text-sm text-muted-foreground">
              Noch kein Konto?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Kostenlos registrieren
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <div className="rounded-[1.6rem] border border-[#eadfce] bg-white/70 px-5 py-4 text-sm text-slate-600 shadow-[0_20px_45px_-38px_rgba(32,50,58,0.3)]">
        <p className="font-medium text-slate-900">Dein Weg zu beruflichem Erfolg.</p>
        <p className="mt-1">Klar, leicht und mobil optimiert für den Alltag.</p>
      </div>

      {showDemo && (
        <Card className="rounded-[1.8rem] border border-[#eadfce] bg-white/80 shadow-[0_20px_55px_-40px_rgba(115,190,178,0.25)]">
          <CardHeader className="space-y-1 text-center pb-3">
            <CardTitle className="text-lg">Demo-Zugang</CardTitle>
            <CardDescription>
              Ohne Login als Lernender, Lehrkraft oder Admin ansehen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={demoLogin} className="grid grid-cols-3 gap-2">
              <SubmitButton name="role" value="learner" variant="outline" size="sm" className="rounded-xl border-[#eadfce] bg-white">
                Lernender
              </SubmitButton>
              <SubmitButton name="role" value="teacher" variant="outline" size="sm" className="rounded-xl border-[#eadfce] bg-white">
                Lehrkraft
              </SubmitButton>
              <SubmitButton name="role" value="admin" variant="outline" size="sm" className="rounded-xl border-[#eadfce] bg-white">
                Admin
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
