import Link from "next/link";
import { ArrowLeft, Eye, LockKeyhole, Mail } from "lucide-react";
import { login, demoLogin } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";
import { isMockMode } from "@/lib/mock-user";
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
      <div className="w-full rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffefb_0%,#fffaf5_100%)] px-5 pb-5 pt-4 shadow-[0_28px_60px_-38px_rgba(101,79,50,0.22)]">
        <div className="flex items-center justify-between">
          <ArrowLeft className="h-4 w-4 text-slate-500" />
          <span className="text-xs text-slate-400">09:41</span>
        </div>

        <div className="mt-5 text-center">
          <div className="flex justify-center">
            <BrandMark compact />
          </div>
          <p className="mt-8 text-[2.05rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
            Willkommen zurück
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Schön, dass du weiterlernst.
          </p>
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

          <FieldShell icon={<Mail className="h-4 w-4" />}>
            <Input
              name="email"
              type="email"
              placeholder="hallo@beispiel.de"
              required
              autoComplete="email"
              className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <FieldShell icon={<LockKeyhole className="h-4 w-4" />} trailing={<Eye className="h-4 w-4 text-slate-400" />}>
            <Input
              name="password"
              type="password"
              placeholder="Passwort"
              required
              autoComplete="current-password"
              className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <div className="text-right">
            <Link href="/reset-password" className="text-xs text-[#5c9c88] hover:underline">
              Passwort vergessen?
            </Link>
          </div>

          <SubmitButton className="h-12 w-full rounded-[1rem] bg-[#5c9c88] text-base text-white hover:bg-[#538d7a]">
            Anmelden
          </SubmitButton>
        </form>

        <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
          <div className="h-px flex-1 bg-[#ece2d7]" />
          <span>oder</span>
          <div className="h-px flex-1 bg-[#ece2d7]" />
        </div>

        <div className="mt-5 rounded-[1rem] border border-[#eadfce] bg-white px-4 py-3 text-center text-sm text-slate-700 shadow-sm">
          Mit Google anmelden
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Noch kein Konto?{" "}
          <Link href="/register" className="text-[#5c9c88] hover:underline">
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
      </div>
    </div>
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
    <div className="flex items-center gap-3 rounded-[1rem] border border-[#eadfce] bg-white px-4 text-slate-500 shadow-sm">
      {icon}
      <div className="flex-1">{children}</div>
      {trailing}
    </div>
  );
}
