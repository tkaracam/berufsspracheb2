import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="editorial-grid absolute inset-0 opacity-40" />
        <div className="animate-aurora-float absolute left-[-10%] top-[-8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(115,190,178,0.16)_0%,transparent_68%)] blur-3xl" />
        <div className="animate-aurora-float absolute bottom-[-14%] right-[-6%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(223,195,156,0.18)_0%,transparent_68%)] blur-3xl" />
      </div>

      <div className="min-h-screen flex flex-col">
        <PublicNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
