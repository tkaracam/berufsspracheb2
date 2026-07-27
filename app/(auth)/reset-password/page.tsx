import Link from "next/link";
import { resetPassword } from "@/lib/actions/auth";
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
  title: `Passwort zurücksetzen – ${APP_NAME}`,
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex-1 flex items-center justify-center p-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Passwort zurücksetzen</CardTitle>
          <CardDescription>
            Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link zum
            Zurücksetzen.
          </CardDescription>
        </CardHeader>
        <form action={resetPassword}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
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
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <SubmitButton className="w-full">
              Link senden
            </SubmitButton>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Zurück zum Login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
