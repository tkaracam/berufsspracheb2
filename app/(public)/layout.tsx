export const dynamic = "force-static";
export const revalidate = 3600;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_48%,#f5fbf6_100%)]">
      <main className="animate-in fade-in flex-1 duration-500">{children}</main>
    </div>
  );
}
