import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, MessageCircle, Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getSession } from "@/lib/supabase/server";
import { PhoneFrame } from "@/components/concept27/phone-frame";
import { MobileTabs } from "@/components/concept27/mobile-tabs";
import { BrandMark } from "@/components/concept27/brand-mark";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `${APP_NAME} – Start`,
};

const supportCards = [
  {
    title: "Fachwortschatz",
    text: "Praxisnah für Arbeitsalltag und Berufssprachkurs.",
    icon: Briefcase,
    tone: "sage",
  },
  {
    title: "Kommunikation",
    text: "Klare Redemittel für echte Gespräche im Beruf.",
    icon: MessageCircle,
    tone: "peach",
  },
  {
    title: "Lernen mit Struktur",
    text: "Kurze Einheiten, ruhige Führung und klare nächste Schritte.",
    icon: BookOpen,
    tone: "sand",
  },
];

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

      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <BrandMark className="justify-center" />
          <p className="mt-6 text-[1.8rem] text-[#73beb2] [font-family:'Snell_Roundhand',cursive] md:text-[2.8rem]">
            Deutsch für deinen beruflichen Weg.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white/84 px-4 py-2 text-sm text-slate-600 shadow-[0_18px_40px_-34px_rgba(57,73,84,0.42)]">
            <Sparkles className="h-4 w-4 text-[#73beb2]" />
            Moderne Lern-App für Berufssprache B2
          </div>
          <h1 className="mt-6 text-[2.65rem] leading-[0.94] text-slate-900 md:text-[4.1rem] [font-family:Georgia,serif]">
            Sprache, die
            <br />
            deine Karriere
            <br />
            voranbringt.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-slate-600 md:text-lg">
            {APP_NAME} hilft dir, im Beruf sicher zu kommunizieren, Fachsprache
            zu beherrschen und mit ruhiger Struktur sichtbar voranzukommen.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <PhoneFrame className="max-w-[380px]">
            <div className="flex items-center gap-3">
              <div className="scale-[0.76] origin-left">
                <BrandMark compact />
              </div>
            </div>

            <div className="mt-7">
              <p className="text-[2.45rem] leading-[0.94] text-slate-900 [font-family:Georgia,serif]">
                Sprache, die
                <br />
                dich im Beruf
                <br />
                <span className="text-[#5c9c88]">weiterbringt.</span>
              </p>
              <p className="mt-5 max-w-[15rem] text-sm leading-7 text-slate-600">
                Für Fachkräfte, die im Beruf sicher kommunizieren und
                weiterkommen wollen.
              </p>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#eff6ef_0%,#f9efe4_100%)] p-5">
              <div className="absolute -bottom-10 -left-8 h-44 w-44 rounded-full bg-[#c7ddd1]/80" />
              <div className="absolute right-[-1.4rem] top-4 h-40 w-40 rounded-full bg-[#f5d7bb]/55" />
              <div className="absolute bottom-4 right-6 h-28 w-28 rounded-[1.8rem] border border-[#e7d9c7] bg-white/30" />

              <div className="relative z-10 flex min-h-[265px] items-end justify-between">
                <div className="max-w-[10.5rem]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/82 text-[#5c9c88] shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="mt-4 text-[1.45rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                    Klar lernen.
                    <br />
                    Sicher handeln.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-[1rem] bg-white/80 px-3 py-2 text-xs text-slate-600 shadow-sm">
                      Fachwortschatz
                    </div>
                    <div className="rounded-[1rem] bg-white/80 px-3 py-2 text-xs text-slate-600 shadow-sm">
                      Berufskommunikation
                    </div>
                  </div>
                </div>

                <div className="relative flex h-[178px] w-[122px] items-end justify-center">
                  <div className="absolute bottom-0 h-[156px] w-[104px] rounded-[2rem_2rem_1.4rem_1.4rem] bg-[#f1bb78]" />
                  <div className="absolute bottom-[104px] h-14 w-14 rounded-full bg-[#f2c99b]" />
                  <div className="absolute bottom-[114px] left-[28px] h-8 w-8 rounded-full bg-[#5a4331]" />
                  <div className="absolute bottom-[82px] h-16 w-16 rounded-[1rem] bg-[#f6f1e9]" />
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <Button asChild className="h-12 rounded-[1rem] bg-[#5c9c88] text-base text-white hover:bg-[#538d7a]">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-[1rem] border-[#eadfce] bg-white text-base text-slate-700 hover:bg-white">
                <Link href="/berufsfelder">Mehr erfahren</Link>
              </Button>
            </div>

            <MobileTabs active="home" />
          </PhoneFrame>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {supportCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[1.6rem] border border-[#eadfce] bg-white/82 p-5 shadow-[0_24px_48px_-36px_rgba(57,73,84,0.42)]"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    item.tone === "peach"
                      ? "bg-[#fff1e8] text-[#d69061]"
                      : item.tone === "sand"
                        ? "bg-[#faf1df] text-[#b88a4a]"
                        : "bg-[#eef7f4] text-[#5c9c88]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[1.4rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-500">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
