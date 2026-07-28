import { redirect } from "next/navigation";
import { FocusModeShell } from "@/components/layout/focus-mode-shell";
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
      <FocusModeShell className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.78),transparent_28%),radial-gradient(circle_at_top_right,rgba(231,245,240,0.76),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff8f2_54%,#fbf7f0_100%)]">
        <main className="min-h-screen p-4 pb-10 pt-8">{children}</main>
      </FocusModeShell>
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
    <FocusModeShell className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(244,233,217,0.78),transparent_28%),radial-gradient(circle_at_top_right,rgba(231,245,240,0.76),transparent_24%),linear-gradient(180deg,#fffdf9_0%,#fff8f2_54%,#fbf7f0_100%)]">
      <main className="min-h-screen p-4 pb-10 pt-8">{children}</main>
    </FocusModeShell>
  );
}
