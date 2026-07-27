import Link from "next/link";
import { PlusCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getDemoClasses } from "@/lib/demo-teacher-storage";

export const metadata = {
  title: `Klassen – ${APP_NAME}`,
};

export default async function KlassenPage() {
  let classes: { id: string; name: string; code: string }[] = [];

  if (isMockMode()) {
    classes = await getDemoClasses();
  } else {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("classes")
      .select("*")
      .eq("teacher_id", user?.id ?? "")
      .order("created_at", { ascending: false });
    classes = data ?? [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meine Klassen</h1>
        <Button asChild>
          <Link href="/lehrer/klassen/neu">
            <PlusCircle className="mr-2 h-4 w-4" /> Neue Klasse
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Klassen-Code: <span className="font-mono font-medium">{c.code}</span>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/lehrer/klassen/${c.id}`}>
                    <Users className="mr-2 h-4 w-4" /> Verwalten
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {classes.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Noch keine Klasse erstellt.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
