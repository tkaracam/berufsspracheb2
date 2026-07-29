import Link from "next/link";
import { ArrowRight, Eye, LockKeyhole, Mail, UserRound, CheckCircle2 } from "lucide-react";
import { register } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Registrierung – ${APP_NAME}`,
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <Card className="overflow-hidden rounded-3xl border-border shadow-xl shadow-slate-900/5">
      <CardHeader className="space-y-1 bg-gradient-to-br from-primary/10 to-accent/20 p-6 text-center sm:p-8">
        <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground">
          Konto erstellen
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Kostenlos starten und deinen Lernweg aufbauen.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8">
        <form action={register} className="space-y-4">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
            </Alert>
          ) : null}

          <Alert>
            <AlertDescription>
              Nach der Registrierung erhältst du eine Bestätigungs-E-Mail. Erst danach ist die Anmeldung möglich.
            </AlertDescription>
          </Alert>

          <FieldShell icon={<UserRound className="h-4 w-4" />}>
            <Input
              name="fullName"
              type="text"
              placeholder="Vollständiger Name"
              required
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <FieldShell icon={<Mail className="h-4 w-4" />}>
            <Input
              name="email"
              type="email"
              placeholder="name@beispiel.de"
              required
              autoComplete="email"
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <FieldShell icon={<LockKeyhole className="h-4 w-4" />} trailing={<Eye className="h-4 w-4 text-muted-foreground" />}>
            <Input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Passwort"
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <p className="text-xs text-muted-foreground">Mindestens 8 Zeichen.</p>

          <SubmitButton className="h-12 w-full text-base">
            Kostenlos registrieren
          </SubmitButton>
        </form>

        <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>oder</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Registrierung aktuell per E-Mail</p>
          <p className="mt-1">
            Google-Registrierung ist noch nicht aktiv. Bitte verwende vorerst E-Mail und Passwort.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Bereits ein Konto?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Anmelden
          </Link>
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Ruhig. Klar. Direkt.
          </p>
          <p className="mt-1">
            Lerne mit einer Oberfläche, die sich leicht anfühlt und dich Schritt
            für Schritt begleitet.
          </p>
        </div>
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
