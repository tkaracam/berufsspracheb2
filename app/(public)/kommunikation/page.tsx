import { APP_NAME } from "@/lib/constants";
import { communicationModules } from "@/lib/communication-data";
import { KommunikationSearch } from "@/components/home/kommunikation-search";

export const metadata = {
  title: `Kommunikation im Beruf – ${APP_NAME}`,
};

export default function KommunikationPage() {
  return (
    <div className="relative flex-1 overflow-hidden py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(237,246,239,0.82),_transparent_58%)]" />
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#f5e7d6]/50 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#eef6ef]/60 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-5xl">
          <div className="rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff5eb_55%,#f4fbf6_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(115,190,178,0.16)] md:p-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-[#eadfce] bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                Kommunikation im Arbeitsalltag
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Kommunikation im Beruf
              </h1>
              <p className="mt-4 text-lg leading-7 text-slate-600">
                Trainieren Sie berufliche Gesprächssituationen gezielt und in
                einer ruhigen, appartigen Lernoberfläche.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          <KommunikationSearch modules={communicationModules} />
        </div>
      </div>
    </div>
  );
}
