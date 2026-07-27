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
      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Willkommen zurück</CardTitle>
          <CardDescription>
            Melden Sie sich an, um Ihre Lernfortschritte zu speichern.
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
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton size="lg" className="w-full">
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

      {showDemo && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="space-y-1 text-center pb-3">
            <CardTitle className="text-lg">Demo-Zugang</CardTitle>
            <CardDescription>
              Ohne Login als Lernender, Lehrkraft oder Admin ansehen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={demoLogin} className="grid grid-cols-3 gap-2">
              <SubmitButton name="role" value="learner" variant="outline" size="sm">
                Lernender
              </SubmitButton>
              <SubmitButton name="role" value="teacher" variant="outline" size="sm">
                Lehrkraft
              </SubmitButton>
              <SubmitButton name="role" value="admin" variant="outline" size="sm">
                Admin
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
