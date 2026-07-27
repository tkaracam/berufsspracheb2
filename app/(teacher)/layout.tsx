import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { FocusModeShell } from "@/components/layout/focus-mode-shell";
import { getSession } from "@/lib/supabase/server";
import { isMockMode, getMockUser } from "@/lib/mock-user";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isMockMode()) {
    const mockUser = await getMockUser();
    if (mockUser.role !== "teacher" && mockUser.role !== "admin") redirect("/dashboard");

    return (
      <FocusModeShell className="min-h-screen">
        <AppSidebar
          role={mockUser.role}
          userName={mockUser.full_name}
          userEmail={mockUser.email}
        />
        <main className="min-h-screen p-4 pb-24 lg:p-8">{children}</main>
        <MobileBottomNav role={mockUser.role} />
      </FocusModeShell>
    );
  }

  const { user } = await getSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "teacher" && user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <FocusModeShell className="min-h-screen">
      <AppSidebar
        role={user.role}
        userName={user.user_metadata?.full_name ?? user.email ?? "Lehrkraft"}
        userEmail={user.email ?? ""}
      />
      <main className="min-h-screen p-4 pb-24 lg:p-8">{children}</main>
      <MobileBottomNav role={user.role} />
    </FocusModeShell>
  );
}
