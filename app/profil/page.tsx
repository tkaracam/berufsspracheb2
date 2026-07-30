import {
  BadgeCheck,
  CalendarDays,
  Mail,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import { updateProfile } from "@/lib/actions/profile";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME, ROLES, type RoleKey } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isMockMode, getMockUser } from "@/lib/mock-user";

export const metadata = {
  title: `Profil – ${APP_NAME}`,
};

export default async function ProfilPage() {
  const mockUser = isMockMode() ? await getMockUser() : null;
  let profile: {
    full_name: string | null;
    email: string;
    role: string;
    daily_goal: number;
    created_at: string;
  } = {
    full_name: mockUser?.full_name ?? "Demo Nutzer",
    email: mockUser?.email ?? "demo@beispiel.de",
    role: mockUser?.role ?? "admin",
    daily_goal: 10,
    created_at: new Date().toISOString(),
  };

  if (!isMockMode()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase.from("profiles").select("*").eq("id", user?.id ?? "").single();
    if (data) profile = data;
  }

  const roleConfig = ROLES[profile.role as RoleKey];
  const joinedAt = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("de-DE")
    : "—";

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#e7ddcf] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_52%,rgba(238,248,245,0.98)_100%)] p-6 shadow-[0_30px_90px_-52px_rgba(83,70,54,0.28)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,190,178,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(225,193,145,0.16),transparent_30%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ebe4] bg-white/78 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f4f55]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Konto & persönliche Einstellungen
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Ihr Profil bleibt
              <span className="mt-2 block text-[#0f4f55]">klar, ruhig und einfach verwaltbar.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Aktualisieren Sie Name und Tagesziel, behalten Sie Ihre Kontodaten im Blick
              und halten Sie Ihre Lernroutine übersichtlich.
            </p>
          </div>

          <div className="grid gap-3">
            <InfoCard
              icon={<UserRound className="h-4 w-4" />}
              label="Name"
              value={profile.full_name?.trim() || "Nicht angegeben"}
            />
            <InfoCard
              icon={<Mail className="h-4 w-4" />}
              label="E-Mail"
              value={profile.email}
            />
            <InfoCard
              icon={<Target className="h-4 w-4" />}
              label="Tagesziel"
              value={`${profile.daily_goal ?? 10} Übungen`}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[1.8rem] border-[#eadfce] bg-white/88 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.22)]">
          <CardContent className="p-6 sm:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
                Persönliche Angaben
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Profil ruhig und aktuell halten
              </h2>
            </div>

            <form action={updateProfile} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={profile.full_name ?? ""}
                  placeholder="Ihr Name"
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#fffdfa]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profile.email ?? ""}
                  disabled
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#f8f4ee] text-slate-500"
                />
                <p className="text-xs text-slate-500">
                  Die E-Mail-Adresse wird aus Ihrem Konto übernommen und kann hier nicht geändert werden.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyGoal">Tagesziel</Label>
                <Input
                  id="dailyGoal"
                  name="dailyGoal"
                  type="number"
                  min={1}
                  max={100}
                  defaultValue={profile.daily_goal ?? 10}
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#fffdfa]"
                />
                <p className="text-xs text-slate-500">
                  Wie viele Übungen pro Tag für Sie realistisch und gut erreichbar sind.
                </p>
              </div>

              <Button type="submit" className="rounded-full bg-[#0f4f55] px-6 hover:bg-[#0c4348]">
                Änderungen speichern
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-[1.8rem] border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,250,244,0.94)_0%,rgba(255,255,255,0.92)_100%)] shadow-[0_24px_70px_-52px_rgba(60,44,26,0.2)]">
          <CardContent className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6d47]">
              Kontostatus
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-[1.2rem] border border-[#efe4d6] bg-white/78 p-4">
                <p className="text-sm text-slate-500">Rolle</p>
                <div className="mt-2 flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-[#0f4f55]" />
                  <Badge variant={roleConfig?.color ?? "default"}>
                    {roleConfig?.label ?? profile.role}
                  </Badge>
                </div>
              </div>

              <div className="rounded-[1.2rem] border border-[#efe4d6] bg-white/78 p-4">
                <p className="text-sm text-slate-500">Registriert seit</p>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
                  <CalendarDays className="h-4 w-4 text-[#0f4f55]" />
                  {joinedAt}
                </div>
              </div>

              <div className="rounded-[1.2rem] border border-[#efe4d6] bg-white/78 p-4">
                <p className="text-sm font-semibold text-slate-950">Hinweis</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Halten Sie Name und Tagesziel aktuell, damit Dashboard und Lernfluss besser
                  zu Ihrem tatsächlichen Alltag passen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-[#e3efe9] bg-white/82 p-4 shadow-[0_18px_40px_-34px_rgba(15,79,85,0.24)]">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f4f55]">
        {icon}
        {label}
      </div>
      <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-slate-950">{value}</p>
    </div>
  );
}
