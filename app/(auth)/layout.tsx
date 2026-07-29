import { BrandMark } from "@/components/concept27/brand-mark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#f0fdfa_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,#fffbeb_0%,transparent_50%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]" />
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="mb-8 text-center">
        <BrandMark />
        <p className="mt-4 text-lg font-medium text-primary">
          Klar lernen. Sicher anwenden.
        </p>
      </div>

      <main className="relative w-full max-w-md">
        {children}
      </main>
    </div>
  );
}
