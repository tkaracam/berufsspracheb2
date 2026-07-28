import Link from "next/link";
import { register } from "@/lib/actions/auth";
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
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Konto erstellen</h1>
        <p className="text-base leading-7 text-slate-600">
          Starte kostenlos und baue deinen Lernweg für Beruf und Prüfung Schritt für Schritt auf.
        </p>
      </div>

      <Card className="w-full rounded-[2rem] border border-[#eadfce] bg-white/92 shadow-[0_28px_70px_-42px_rgba(115,190,178,0.32)]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-slate-900">Registrieren</CardTitle>
          <CardDescription>
            Dein persönliches Konto für Fortschritt, Favoriten und ruhiges Lernen.
          </CardDescription>
        </CardHeader>
        <form action={register}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="fullName">Vollständiger Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Max Mustermann"
                required
                className="h-12 rounded-2xl border-[#eadfce] bg-[#fffdf9]"
              />
            </div>
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
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="h-12 rounded-2xl border-[#eadfce] bg-[#fffdf9]"
              />
              <p className="text-xs text-muted-foreground">
                Mindestens 8 Zeichen.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton size="lg" className="h-12 w-full rounded-2xl bg-[#73beb2] hover:bg-[#64aea3]">
              Kostenlos registrieren
            </SubmitButton>
            <p className="text-sm text-muted-foreground">
              Bereits ein Konto?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Anmelden
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <div className="rounded-[1.6rem] border border-[#eadfce] bg-white/70 px-5 py-4 text-sm text-slate-600 shadow-[0_20px_45px_-38px_rgba(32,50,58,0.3)]">
        <p className="font-medium text-slate-900">Einladend und motivierend.</p>
        <p className="mt-1">Starte jetzt deinen Weg mit kurzen, klaren Einheiten.</p>
      </div>
    </div>
  );
}
