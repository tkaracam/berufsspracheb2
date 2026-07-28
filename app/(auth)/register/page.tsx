import Link from "next/link";
import { ArrowLeft, Eye, LockKeyhole, Mail, UserRound } from "lucide-react";
import { register } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";
import { MobileTabs } from "@/components/concept27/mobile-tabs";
import { BrandMark } from "@/components/concept27/brand-mark";

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
            Konto erstellen
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Kostenlos starten und deinen Lernweg aufbauen.
          </p>
        </div>

        <form action={register} className="mt-8 space-y-4">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
            </Alert>
          ) : null}

          <FieldShell icon={<UserRound className="h-4 w-4" />}>
            <Input
              name="fullName"
              type="text"
              placeholder="Vollständiger Name"
              required
              className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <FieldShell icon={<Mail className="h-4 w-4" />}>
            <Input
              name="email"
              type="email"
              placeholder="name@beispiel.de"
              required
              autoComplete="email"
              className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <FieldShell icon={<LockKeyhole className="h-4 w-4" />} trailing={<Eye className="h-4 w-4 text-slate-400" />}>
            <Input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Passwort"
              className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </FieldShell>

          <p className="text-xs text-slate-400">Mindestens 8 Zeichen.</p>

          <SubmitButton className="h-12 w-full rounded-[1rem] bg-[#5c9c88] text-base text-white hover:bg-[#538d7a]">
            Kostenlos registrieren
          </SubmitButton>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Bereits ein Konto?{" "}
          <Link href="/login" className="text-[#5c9c88] hover:underline">
            Anmelden
          </Link>
        </p>

        <div className="mt-6 rounded-[1.3rem] border border-[#eadfce] bg-[linear-gradient(180deg,#f9fcf9_0%,#fffaf5_100%)] p-4 text-sm leading-6 text-slate-500 shadow-sm">
          <p className="font-medium text-slate-900">Ruhig. Klar. Direkt.</p>
          <p className="mt-1">
            Lerne mit einer Oberfläche, die sich leicht anfühlt und dich Schritt
            für Schritt begleitet.
          </p>
        </div>

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
