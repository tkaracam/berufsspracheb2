import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { register } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";
import { PhoneFrame } from "@/components/concept27/phone-frame";
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
      <PhoneFrame>
        <div className="flex items-center justify-between">
          <ArrowLeft className="h-4 w-4 text-slate-500" />
          <BrandMark compact className="scale-[0.72]" />
          <span className="w-4" />
        </div>

        <div className="mt-7 text-center">
          <p className="text-[2rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
            Konto erstellen
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Registrieren Sie sich kostenlos für das BSK-B2-Training.
          </p>
        </div>

        <form action={register} className="mt-8 space-y-4">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
            </Alert>
          ) : null}

          <div>
            <p className="mb-2 text-xs text-slate-500">Vollständiger Name</p>
            <Input
              name="fullName"
              type="text"
              placeholder="Max Mustermann"
              required
              className="h-11 rounded-[1rem] border-[#eadfce] bg-[#fffdf9]"
            />
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-500">E-Mail</p>
            <Input
              name="email"
              type="email"
              placeholder="name@beispiel.de"
              required
              autoComplete="email"
              className="h-11 rounded-[1rem] border-[#eadfce] bg-[#fffdf9]"
            />
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-500">Passwort</p>
            <div className="relative">
              <Input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="h-11 rounded-[1rem] border-[#eadfce] bg-[#fffdf9] pr-11"
              />
              <Eye className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Mindestens 8 Zeichen.</p>
          </div>

          <SubmitButton className="h-11 w-full rounded-[1rem] bg-[#73beb2] text-base text-white hover:bg-[#64aea3]">
            Kostenlos registrieren
          </SubmitButton>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Bereits ein Konto?{" "}
          <Link href="/login" className="text-[#73beb2] hover:underline">
            Anmelden
          </Link>
        </p>

        <div className="mt-6 rounded-[1.3rem] border border-[#f0e5d8] bg-white p-4 text-sm leading-6 text-slate-500 shadow-sm">
          <p className="font-medium text-slate-900">Ruhig. Klar. Direkt.</p>
          <p className="mt-1">
            Lernen Sie mit kurzen Einheiten und einer Oberfläche, die wie eine
            moderne App funktioniert.
          </p>
        </div>

        <MobileTabs active="profil" />
      </PhoneFrame>
    </div>
  );
}
