import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/home/scroll-progress";
import { StickyMobileCta } from "@/components/home/sticky-mobile-cta";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <StickyMobileCta />
      <PublicNavbar />
      <main className="animate-in fade-in duration-500 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
