import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <div className="relative overflow-hidden px-4 py-10 md:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#f6ebdb] blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[#eef6ef] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(216,203,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(216,203,184,0.18)_1px,transparent_1px)] bg-[size:52px_52px]" />
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
            Sprache. Kompetenz. Zukunft.
          </p>
          <h1 className="mt-6 text-5xl leading-[0.95] text-slate-900 md:text-7xl [font-family:Georgia,serif]">
            Sprache öffnet Türen.
            <br />
            <span className="text-[#73beb2]">Wir öffnen sie mit dir.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
            Gezielt Deutsch lernen. Sicher im Beruf kommunizieren.
            Selbstbewusst wachsen.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-[1.1rem] bg-[#73beb2] px-7 text-base hover:bg-[#64aea3]"
            >
              <Link href={user ? "/dashboard" : "/register"}>
                {user ? "Weiterlernen" : "Jetzt starten"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-[1.1rem] border-[#eadfce] bg-white/90 px-7 text-base hover:bg-white"
            >
              <Link href="/berufsfelder">Mehr erfahren</Link>
            </Button>
          </div>

          <div className="mt-8 space-y-3 text-slate-600">
            {[
              "Praxisnah und relevant",
              "Strukturiert und effektiv",
              "Flexibel und mobil",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#73beb2]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="mx-auto max-w-[430px] rounded-[2.6rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f2_100%)] p-4 shadow-[0_30px_70px_-35px_rgba(138,116,83,0.34)]">
            <div className="overflow-hidden rounded-[2rem] border border-[#eadfce] bg-white p-4">
              <div className="rounded-[1.9rem] bg-[linear-gradient(180deg,#eef6ef_0%,#fbf3e8_100%)] p-4">
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#d8ece4]" />
                  <div className="absolute bottom-5 right-5 h-28 w-28 rounded-[2rem] border border-[#d9c9b3] bg-white/35" />
                  <Image
                    src="/concept27/home-hero-woman.png"
                    alt="Lernende Frau"
                    width={920}
                    height={1600}
                    className="relative z-10 h-[28rem] w-full object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
