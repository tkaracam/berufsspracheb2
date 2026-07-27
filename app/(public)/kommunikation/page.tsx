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
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">
            Kommunikation im Beruf
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Berufliche Kommunikationssituationen gezielt trainieren – von
            Telefonaten bis zum Bewerbungsgespräch.
          </p>
        </div>

        <KommunikationSearch modules={communicationModules} />
      </div>
    </div>
  );
}
