import { BrandMark } from "@/components/concept27/brand-mark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.78),transparent_28%),radial-gradient(circle_at_top_right,rgba(231,245,240,0.76),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff8f2_54%,#fbf7f0_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(220,206,186,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(220,206,186,0.13)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-16 pt-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-4">
            <BrandMark />
          </div>
          <p className="mt-6 text-[1.9rem] text-[#73beb2] [font-family:'Snell_Roundhand',cursive] md:text-[3rem]">
            Dein Weg zu beruflichem Erfolg.
          </p>
          <div className="mx-auto mt-1 h-px w-40 bg-[#73beb2]/60 md:w-52" />
        </div>

        <main className="relative flex flex-1 items-center justify-center py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
