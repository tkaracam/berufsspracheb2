import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { getSession } from "@/lib/supabase/server";
import { isMockMode, getMockUser } from "@/lib/mock-user";

export default async function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isMockMode()) {
    const mockUser = await getMockUser();

    return (
      <div className="min-h-screen lg:pl-64">
        <AppSidebar
          role={mockUser.role}
          userName={mockUser.full_name}
          userEmail={mockUser.email}
        />
        <main className="min-h-screen p-4 lg:p-8">{children}</main>
      </div>
    );
  }

  const { user } = await getSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen lg:pl-64">
      <AppSidebar
        role={user.role}
        userName={user.user_metadata?.full_name ?? user.email ?? "Nutzer"}
        userEmail={user.email ?? ""}
      />
      <main className="min-h-screen p-4 lg:p-8">{children}</main>
    </div>
  );
}
