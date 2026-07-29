import { redirect } from "next/navigation";
import { getSession } from "@/lib/supabase/server";
import { isMockMode, getMockUser } from "@/lib/mock-user";

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isMockMode()) {
    await getMockUser();

    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_45%,#f5fbf6_100%)]">
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    );
  }

  const { user } = await getSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "admin") {
    redirect("/admin/dashboard");
  }

  if (user.role === "teacher") {
    redirect("/lehrer/dashboard");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_45%,#f5fbf6_100%)]">
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
