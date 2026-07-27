import { createClient } from "@/lib/supabase/server";
import { APP_NAME } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: `Übungen verwalten – ${APP_NAME}`,
};

type UebungWithField = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  berufsfelder: { title?: string } | null;
};

export default async function AdminUebungenPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("uebungen")
    .select("*, berufsfelder(title)")
    .order("created_at", { ascending: false });

  const uebungen = (data ?? []) as UebungWithField[];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Übungen verwalten</h1>

      <div className="grid gap-4">
        {uebungen.map((u) => (
          <Card key={u.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{u.title}</CardTitle>
                <Badge>{u.type}</Badge>
              </div>
              <CardDescription>{u.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Berufsfeld: {u.berufsfelder?.title ?? "—"}
              </p>
            </CardContent>
          </Card>
        ))}
        {uebungen.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Noch keine Übungen erstellt.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
