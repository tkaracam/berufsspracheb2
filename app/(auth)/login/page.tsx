import Link from "next/link";
import { ArrowRight, Eye, LockKeyhole, Mail } from "lucide-react";
import { login, demoLogin } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";
import { isMockMode } from "@/lib/mock-user";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Login – ${APP_NAME}`,
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; registered?: string; reset?: string; email?: string }>;
}) {
  const { error, registered, reset, email } = await searchParams;
  const showDemo = isMockMode();

  return (
    <Card className="overflow-hidden rounded-3xl border-border shadow-xl shadow-slate-900/5">
      <CardHeader className="space-y-1 bg-gradient-to-br from-primary/10 to-accent/20 p-6 text-center sm:p-8">
        <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground">
          Willkommen zurück
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Schön, dass du weiterlernst.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8">
        <form action={login} className="space-y-4">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
            </Alert>
          ) : null}
          {registered ? (
            <Alert>
              <AlertDescription>
                Registrierung gespeichert. Bitte öffne jetzt dein E-Mail-Postfach
                {email ? ` (${email})` : ""}, bestätige dein Konto und melde dich danach an.
              </AlertDescription>
            </Alert>
          ) : null}
          {reset ? (
            <Alert>
              <AlertDescription>Eine E-Mail zum Zurücksetzen wurde gesendet.</AlertDescription>
            </Alert>
          ) : null}

          <FieldShell icon={<Mail className="h-4 w-4" />}>
            <Input
              name="email"
              type="email"
              placeholder="hallo@beispiel.de"
              required
              autoComplete="email"
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <FieldShell icon={<LockKeyhole className="h-4 w-4" />} trailing={<Eye className="h-4 w-4 text-muted-foreground" />}>
            <Input
              name="password"
              type="password"
              placeholder="Passwort"
              required
              autoComplete="current-password"
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <div className="text-right">
            <Link href="/reset-password" className="text-xs font-semibold text-primary hover:underline">
              Passwort vergessen?
            </Link>
          </div>

          <SubmitButton className="h-12 w-full text-base">
            Anmelden
          </SubmitButton>
        </form>

        <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>oder</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Anmeldung aktuell per E-Mail</p>
          <p className="mt-1">
            Google-Login ist noch nicht verbunden. Bitte melde dich mit E-Mail und Passwort an.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Noch kein Konto?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Konto erstellen
          </Link>
        </p>

        {showDemo ? (
          <form action={demoLogin} className="mt-6 grid grid-cols-3 gap-2">
            <SubmitButton name="role" value="learner" variant="outline" className="rounded-xl">
              Lernender
            </SubmitButton>
            <SubmitButton name="role" value="teacher" variant="outline" className="rounded-xl">
              Lehrkraft
            </SubmitButton>
            <SubmitButton name="role" value="admin" variant="outline" className="rounded-xl">
              Admin
            </SubmitButton>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}

function FieldShell({
  icon,
  trailing,
  children,
}: {
  icon: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 text-muted-foreground transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
      {icon}
      <div className="flex-1">{children}</div>
      {trailing}
    </div>
  );
}
