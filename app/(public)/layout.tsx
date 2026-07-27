import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/home/sticky-mobile-cta";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyMobileCta />
      <PublicNavbar />
      <main className="animate-in fade-in duration-500 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
