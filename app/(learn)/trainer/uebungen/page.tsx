import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "@/lib/constants";
import { getUebungen, getBerufsfelder } from "@/lib/queries";

export const metadata = {
  title: `Meine Übungen – ${APP_NAME}`,
};

export default async function UebungenPage() {
  const [uebungen, felder] = await Promise.all([
    getUebungen(),
    getBerufsfelder(),
  ]);

  const feldMap = new Map(felder.map((f) => [f.id, f.title]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meine Übungen</h1>
        <p className="text-muted-foreground">
          Öffentliche und von Ihrer Lehrkraft zugewiesene Übungen.
        </p>
      </div>

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
              <p className="text-sm text-muted-foreground mb-3">
                Berufsfeld: {u.berufsfeld_id ? feldMap.get(u.berufsfeld_id) ?? "—" : "—"}
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/trainer/uebungen/${u.id}`}>Übung starten</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
        {uebungen.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Aktuell sind keine Übungen verfügbar.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
