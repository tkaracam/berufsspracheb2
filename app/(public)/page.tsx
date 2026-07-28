import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";
import { BrandMark } from "@/components/concept27/brand-mark";
import { MobileTabs } from "@/components/concept27/mobile-tabs";
import { PhoneFrame } from "@/components/concept27/phone-frame";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <div className="relative overflow-hidden px-4 py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#f6ebdb] blur-3xl" />
        <div className="absolute right-0 top-8 h-72 w-72 rounded-full bg-[#eef6ef] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#fbf3e8] blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex justify-center">
          <BrandMark />
        </div>

        <p className="mb-8 text-center text-[1.9rem] text-[#73beb2] [font-family:'Snell_Roundhand',cursive]">
          Dein Weg zu beruflichem Erfolg.
        </p>

        <PhoneFrame className="max-w-[330px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[0.95rem] text-slate-900">
              <div className="relative flex h-7 w-7 items-center justify-center text-[#73beb2]">
                <div className="absolute inset-0 rounded-full border border-current/80" />
                <div className="absolute left-[2px] bottom-[2px] h-1.5 w-1.5 rotate-12 border-b border-l border-current/80 rounded-bl-sm" />
                <span className="relative text-[0.9rem] [font-family:Georgia,serif]">B2</span>
              </div>
              <span className="[font-family:Georgia,serif]">Berufssprache B2</span>
            </div>
            <Menu className="h-4 w-4 text-slate-500" />
          </div>

          <div className="mt-7">
            <h1 className="text-[2.3rem] leading-[0.98] text-slate-900 [font-family:Georgia,serif]">
              Sprache
              <br />
              öffnet Türen.
              <br />
              <span className="text-[#73beb2]">Wir öffnen sie</span>
              <br />
              <span className="text-[#73beb2]">mit dir.</span>
            </h1>
            <p className="mt-5 max-w-[13rem] text-[0.95rem] leading-6 text-slate-600">
              Gezielt Deutsch lernen. Sicher im Beruf kommunizieren.
              Selbstbewusst wachsen.
            </p>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#eef6ef_0%,#fbf3e8_100%)] px-2 pt-4">
            <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#d8ece4]" />
            <div className="absolute bottom-4 right-4 h-24 w-24 rounded-[1.8rem] border border-[#d8cdbb] bg-white/35" />
            <Image
              src="/concept27/home-hero-woman.png"
              alt="Lernende Frau"
              width={920}
              height={1600}
              className="relative z-10 h-[19rem] w-full object-contain object-bottom"
            />
          </div>

          <Button
            asChild
            className="mt-4 h-12 w-full rounded-[1.2rem] bg-[#73beb2] text-base hover:bg-[#64aea3]"
          >
            <Link href={user ? "/dashboard" : "/register"}>
              {user ? "Weiterlernen" : "Jetzt starten"}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="mt-3 h-11 w-full rounded-[1.2rem] border-[#eadfce] bg-white text-slate-700 hover:bg-white"
          >
            <Link href="/berufsfelder">Mehr erfahren</Link>
          </Button>

          <MobileTabs active="home" />
        </PhoneFrame>
      </div>
    </div>
  );
}
