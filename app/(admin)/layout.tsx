import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { getSession } from "@/lib/supabase/server";
import { isMockMode, getMockUser } from "@/lib/mock-user";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isMockMode()) {
    const mockUser = await getMockUser();
    if (mockUser.role !== "admin") redirect("/dashboard");

    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_45%,#f5fbf6_100%)]">
        <AppSidebar
          role={mockUser.role}
          userName={mockUser.full_name}
          userEmail={mockUser.email}
        />
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:pl-[18rem] lg:pr-8 lg:py-8">
          {children}
        </main>
      </div>
    );
  }

  const { user } = await getSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_45%,#f5fbf6_100%)]">
      <AppSidebar
        role={user.role}
        userName={user.user_metadata?.full_name ?? user.email ?? "Admin"}
        userEmail={user.email ?? ""}
      />
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:pl-[18rem] lg:pr-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
