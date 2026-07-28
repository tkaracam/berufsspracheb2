import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

export default async function HomePage() {
  const { user } = await getSession();
  const primaryHref = user ? "/dashboard" : "/register";
  const primaryLabel = user ? "Weiterlernen" : "Jetzt starten";

  return (
    <div className="relative overflow-hidden px-4 pb-16 pt-8 md:px-6 md:pb-24 md:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.82),transparent_28%),radial-gradient(circle_at_top_right,rgba(229,244,239,0.8),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff9f3_52%,#f8fbf8_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(220,206,186,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(220,206,186,0.12)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="pointer-events-none absolute left-[-6rem] top-[-2rem] -z-10 h-72 w-72 rounded-full bg-[#f4e6d6]/70 blur-3xl" />
      <div className="pointer-events-none absolute right-[-5rem] top-10 -z-10 h-80 w-80 rounded-full bg-[#dff1ea]/80 blur-3xl" />

      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(180deg,#eef6ef_0%,#f9efe4_100%)] shadow-[0_18px_40px_-34px_rgba(57,73,84,0.42)]">
            <div className="relative h-7 w-7">
              <div className="absolute left-0 top-[5px] h-4 w-2.5 rotate-[-28deg] rounded-full bg-[#6f9f88]" />
              <div className="absolute right-0 top-[5px] h-4 w-2.5 rotate-[28deg] rounded-full bg-[#4f8b73]" />
            </div>
          </div>
          <p className="mt-5 text-[2.3rem] leading-none text-slate-900 md:text-[3.4rem] [font-family:Georgia,serif]">
            {APP_NAME}
          </p>
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Deutsch für den Beruf. Sicher. Klar. Kompetent.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[430px] rounded-[2.15rem] border border-[#e7dcca] bg-[linear-gradient(180deg,#fffefb_0%,#fff9f3_100%)] p-6 shadow-[0_40px_90px_-46px_rgba(118,94,63,0.34)]">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,#eef6ef_0%,#f9efe4_100%)]">
              <div className="relative h-6 w-6">
                <div className="absolute left-0 top-[4px] h-4 w-2.5 rotate-[-28deg] rounded-full bg-[#6f9f88]" />
                <div className="absolute right-0 top-[4px] h-4 w-2.5 rotate-[28deg] rounded-full bg-[#4f8b73]" />
              </div>
            </div>
            <div>
              <p className="text-[1.35rem] leading-none [font-family:Georgia,serif]">
                Berufssprache B2
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Deutsch für den Beruf. Sicher. Klar. Kompetent.
              </p>
            </div>
          </div>

          <div className="mt-9">
            <p className="text-[2.55rem] leading-[0.94] text-slate-900 [font-family:Georgia,serif]">
              Sprache, die
              <br />
              deine Karriere
              <br />
              <span className="text-[#5c9c88]">voranbringt.</span>
            </p>
            <p className="mt-5 max-w-[16rem] text-sm leading-7 text-slate-600">
              Für Fachkräfte, die im Beruf sicher kommunizieren
              und weiterkommen wollen.
            </p>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#f2f7f1_0%,#fbf1e6_100%)] p-5">
            <div className="absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-[#c8ddd1]/88" />
            <div className="absolute left-[4.8rem] top-[2.2rem] h-28 w-28 rounded-full bg-[#efbb8f]" />
            <div className="absolute right-[-1.8rem] top-2 h-44 w-44 rounded-full bg-[#6e9d88]/88" />
            <div className="absolute bottom-4 right-4 h-28 w-28 rounded-[1.8rem] border border-[#e7d9c7] bg-white/28" />
            <div className="absolute left-8 bottom-[6.3rem] h-px w-20 rotate-[-28deg] bg-[#405462]/35" />
            <div className="absolute left-14 bottom-[4.5rem] h-px w-16 rotate-[14deg] bg-[#405462]/25" />
            <div className="absolute right-10 top-[5.2rem] h-14 w-px rotate-[24deg] bg-white/55" />

            <div className="relative z-10 min-h-[250px]">
              <div className="absolute left-[7.4rem] bottom-[5.8rem] h-16 w-10 rounded-t-full border border-[#405462]/70 bg-transparent" />
              <div className="absolute left-[8.3rem] bottom-[5rem] h-16 w-12 rotate-[18deg] rounded-[999px] border border-[#405462]/70 bg-transparent" />
              <div className="absolute left-[7.7rem] bottom-[6.9rem] h-8 w-8 rounded-full border border-[#405462]/70 bg-transparent" />
              <div className="absolute left-[9.9rem] bottom-[4.2rem] h-14 w-px rotate-[18deg] bg-[#405462]" />
              <div className="absolute left-[8.5rem] bottom-[4.35rem] h-12 w-px rotate-[-14deg] bg-[#405462]" />
              <div className="absolute left-[7.45rem] bottom-[5rem] h-10 w-px rotate-[8deg] bg-[#405462]" />
              <div className="absolute left-[10.5rem] bottom-[2.9rem] h-10 w-px rotate-[-12deg] bg-[#405462]" />
              <div className="absolute left-[9.1rem] bottom-[2.9rem] h-10 w-px rotate-[12deg] bg-[#405462]" />
              <div className="absolute left-[10rem] bottom-[2.95rem] h-px w-12 bg-[#405462]" />
              <div className="absolute left-[7.2rem] bottom-[2.8rem] h-px w-14 rotate-[-18deg] bg-[#405462]" />
              <div className="absolute left-[10.7rem] bottom-[2.5rem] h-px w-10 rotate-[22deg] bg-[#405462]" />

              <div className="absolute bottom-0 right-0 h-[6.2rem] w-[7.2rem] rounded-[2rem_2rem_1.4rem_1.4rem] bg-[#f1bb78]" />
              <div className="absolute bottom-[5.25rem] right-[1.9rem] h-12 w-12 rounded-full bg-[#f2c99b]" />
              <div className="absolute bottom-[6.05rem] right-[1.45rem] h-7 w-7 rounded-full bg-[#594230]" />
              <div className="absolute bottom-[4.05rem] right-[3rem] h-14 w-14 rounded-[1rem] bg-[#f6f1e9]" />
              <div className="absolute bottom-0 left-0 h-[5.2rem] w-[10.8rem] bg-[#d7e5dc]/55" />
              <div className="absolute bottom-0 left-[11rem] h-[5.8rem] w-20 bg-[#f7e6d3]/55" />
              <div className="absolute bottom-[1.05rem] left-[13.1rem] h-11 w-px bg-white/45" />
              <div className="absolute bottom-[1.05rem] left-[14.2rem] h-11 w-px bg-white/45" />
              <div className="absolute bottom-[3.15rem] left-[13.1rem] h-px w-14 bg-white/45" />
              <div className="absolute bottom-[1.05rem] left-[16.55rem] h-[3.7rem] w-px bg-white/45" />
              <div className="absolute bottom-[4.6rem] left-[2.2rem] h-12 w-10 rounded-[1rem] bg-white/28" />
              <div className="absolute bottom-[4rem] left-[1.4rem] h-20 w-14 rounded-full border border-[#b5cbbf]/45" />
              <div className="absolute bottom-[2.8rem] left-[4.4rem] h-24 w-12 rounded-[999px] bg-[#e7f1eb]/40" />
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <Button asChild className="h-12 rounded-[1rem] bg-[#5c9c88] text-base text-white hover:bg-[#538d7a]">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            <Button asChild variant="ghost" className="h-11 rounded-[1rem] text-base text-slate-600 hover:bg-transparent hover:text-slate-900">
              <Link href="/berufsfelder">Mehr erfahren</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
