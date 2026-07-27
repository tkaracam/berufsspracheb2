import { APP_NAME } from "@/lib/constants";
import { UserList } from "@/components/admin/user-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/queries";

export const metadata = {
  title: `Benutzerverwaltung – ${APP_NAME}`,
};

export default async function BenutzerPage() {
  if (isMockMode()) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Im Demo-Modus sind keine Nutzerdaten verfügbar. Verbinden Sie
            Supabase, um Benutzer zu verwalten.
          </CardContent>
        </Card>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const users = (data ?? []) as {
    id: string;
    full_name: string | null;
    email: string;
    role: string;
    created_at: string;
  }[];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>

      <Card>
        <CardHeader>
          <CardTitle>Alle Nutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <UserList users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
