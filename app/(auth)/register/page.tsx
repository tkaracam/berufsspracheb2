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
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Konto erstellen</CardTitle>
        <CardDescription>
          Registrieren Sie sich kostenlos für das BSK-B2-Training.
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
            />
            <p className="text-xs text-muted-foreground">
              Mindestens 8 Zeichen.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton size="lg" className="w-full">
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
  );
}
