import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateProfile } from "@/lib/actions/profile";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME, ROLES, type RoleKey } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
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
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from("profiles").select("*").eq("id", user?.id ?? "").single();
    if (data) profile = data;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profil & Einstellungen</h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre Kontodaten und Ihr Tagesziel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Persönliche Daten</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={profile.full_name ?? ""}
                  placeholder="Ihr Name"
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
                />
                <p className="text-xs text-muted-foreground">
                  Die E-Mail-Adresse kann hier nicht geändert werden.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyGoal">Tagesziel (Übungen pro Tag)</Label>
                <Input
                  id="dailyGoal"
                  name="dailyGoal"
                  type="number"
                  min={1}
                  max={100}
                  defaultValue={profile.daily_goal ?? 10}
                />
              </div>
              <Button type="submit">Speichern</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Konto</CardTitle>
            <CardDescription>
              Aktuelle Rolle und Registrierungsdatum
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Rolle</p>
              <Badge variant={ROLES[profile.role as RoleKey]?.color ?? "default"}>
                {ROLES[profile.role as RoleKey]?.label ?? profile.role}
              </Badge>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Registriert am</p>
              <p className="font-medium">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString("de-DE")
                  : "—"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
