import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { login, demoLogin } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";
import { isMockMode } from "@/lib/mock-user";
import { PhoneFrame } from "@/components/concept27/phone-frame";
import { MobileTabs } from "@/components/concept27/mobile-tabs";
import { BrandMark } from "@/components/concept27/brand-mark";

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
    <div className="mx-auto w-full max-w-sm">
      <PhoneFrame>
        <div className="flex items-center justify-between">
          <ArrowLeft className="h-4 w-4 text-slate-500" />
          <BrandMark compact className="scale-[0.72]" />
          <span className="w-4" />
        </div>

        <div className="mt-7 text-center">
          <p className="text-[1.8rem] text-slate-900 [font-family:Georgia,serif]">{APP_NAME}</p>
          <p className="mt-8 text-[2.05rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
            Willkommen zurück!
          </p>
          <p className="mt-2 text-sm text-slate-500">Schön, dass du da bist.</p>
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

          <div>
            <p className="mb-2 text-xs text-slate-500">E-Mail-Adresse</p>
            <Input name="email" type="email" placeholder="Deine E-Mail-Adresse" required autoComplete="email" className="h-11 rounded-[1rem] border-[#eadfce] bg-[#fffdf9]" />
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-500">Passwort</p>
            <div className="relative">
              <Input name="password" type="password" placeholder="Dein Passwort" required autoComplete="current-password" className="h-11 rounded-[1rem] border-[#eadfce] bg-[#fffdf9] pr-11" />
              <Eye className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="text-right">
            <Link href="/reset-password" className="text-xs text-[#73beb2] hover:underline">
              Passwort vergessen?
            </Link>
          </div>

          <SubmitButton className="h-11 w-full rounded-[1rem] bg-[#73beb2] text-base text-white hover:bg-[#64aea3]">
            Anmelden
          </SubmitButton>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">oder weiter mit</div>
        <div className="mt-5 flex items-center justify-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[#eadfce] bg-white text-lg shadow-sm">G</div>
          <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[#eadfce] bg-white text-lg shadow-sm"></div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Noch kein Konto?{" "}
          <Link href="/register" className="text-[#73beb2] hover:underline">
            Konto erstellen
          </Link>
        </p>

        {showDemo ? (
          <form action={demoLogin} className="mt-5 grid grid-cols-3 gap-2">
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

        <MobileTabs active="profil" />
      </PhoneFrame>
    </div>
  );
}
