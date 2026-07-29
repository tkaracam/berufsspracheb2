import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { resetPassword } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `Passwort zurücksetzen – ${APP_NAME}`,
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <Card className="overflow-hidden rounded-3xl border-border shadow-xl shadow-slate-900/5">
      <CardHeader className="space-y-1 bg-gradient-to-br from-primary/10 to-accent/20 p-6 text-center sm:p-8">
        <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground">
          Passwort zurücksetzen
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link zum Zurücksetzen.
        </CardDescription>
      </CardHeader>

      <form action={resetPassword}>
        <CardContent className="space-y-4 p-6 sm:p-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
            </Alert>
          )}

          <Alert>
            <AlertDescription>
              Verwende dieselbe E-Mail-Adresse wie bei deiner Registrierung. Der Link wird an dieses Postfach gesendet.
            </AlertDescription>
          </Alert>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 text-muted-foreground transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <Mail className="h-4 w-4" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@beispiel.de"
              required
              autoComplete="email"
              className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <SubmitButton className="h-12 w-full text-base">
            Link senden
          </SubmitButton>

          <Link
            href="/login"
            className="flex items-center justify-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Login
          </Link>
        </CardContent>
      </form>
    </Card>
  );
}
