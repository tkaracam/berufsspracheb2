import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { login, demoLogin } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-[2.4rem] border border-[#eadfce] bg-[linear-gradient(180deg,#eef6ef_0%,#fbf3e8_100%)] p-6 shadow-[0_28px_70px_-34px_rgba(138,116,83,0.28)]">
          <Image
            src="/concept27/home-hero-woman.png"
            alt="Lernende Frau"
            width={920}
            height={1600}
            className="mx-auto h-[38rem] w-full object-contain object-bottom"
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[2rem] border border-[#eadfce] bg-white/92 p-6 shadow-[0_24px_60px_-34px_rgba(138,116,83,0.24)] md:p-8">
          <div className="text-center">
            <h1 className="text-[2.4rem] text-slate-900 [font-family:Georgia,serif]">
              Willkommen zurück!
            </h1>
            <p className="mt-2 text-slate-600">Schön, dass du da bist.</p>
          </div>

          <form action={login} className="mt-8 space-y-4">
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
              </Alert>
            ) : null}
            {registered ? (
              <Alert>
                <AlertDescription>Registrierung erfolgreich. Bitte bestätigen Sie Ihre E-Mail-Adresse.</AlertDescription>
              </Alert>
            ) : null}
            {reset ? (
              <Alert>
                <AlertDescription>Eine E-Mail zum Zurücksetzen wurde gesendet.</AlertDescription>
              </Alert>
            ) : null}

            <Input name="email" type="email" placeholder="Deine E-Mail-Adresse" required autoComplete="email" className="h-12 rounded-[1rem] border-[#eadfce] bg-[#fffdf9]" />
            <div className="relative">
              <Input name="password" type="password" placeholder="Dein Passwort" required autoComplete="current-password" className="h-12 rounded-[1rem] border-[#eadfce] bg-[#fffdf9] pr-11" />
              <Eye className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="text-right">
              <Link href="/reset-password" className="text-xs text-[#73beb2] hover:underline">
                Passwort vergessen?
              </Link>
            </div>

            <SubmitButton className="h-12 w-full rounded-[1rem] bg-[#73beb2] text-base hover:bg-[#64aea3]">
              Anmelden
            </SubmitButton>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">oder weiter mit</div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#eadfce] bg-white text-lg shadow-sm">G</div>
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#eadfce] bg-white text-lg shadow-sm"></div>
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            Noch kein Konto?{" "}
            <Link href="/register" className="text-[#73beb2] hover:underline">
              Konto erstellen
            </Link>
          </p>
        </div>

        {showDemo ? (
          <form action={demoLogin} className="mt-4 grid grid-cols-3 gap-2">
            <SubmitButton name="role" value="learner" variant="outline" className="rounded-xl border-[#eadfce]">
              Lernender
            </SubmitButton>
            <SubmitButton name="role" value="teacher" variant="outline" className="rounded-xl border-[#eadfce]">
              Lehrkraft
            </SubmitButton>
            <SubmitButton name="role" value="admin" variant="outline" className="rounded-xl border-[#eadfce]">
              Admin
            </SubmitButton>
          </form>
        ) : null}
      </div>
    </div>
  );
}
