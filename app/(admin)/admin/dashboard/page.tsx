import { Users, BookOpen, GraduationCap, Layers } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/queries";
import { mockBerufsfelder, mockFachwoerter, mockNomenVerbVerbindungen } from "@/lib/mock-data";

export const metadata = {
  title: `Admin-Dashboard – ${APP_NAME}`,
};

export default async function AdminDashboardPage() {
  if (isMockMode()) {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Admin-Dashboard</h1>
          <p className="text-muted-foreground">
            Übersicht über Nutzer, Inhalte und Klassen. (Demo-Modus)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Nutzer</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" /> —
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Nomen-Verb-Verbindungen</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" /> {mockNomenVerbVerbindungen.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Fachwörter</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" /> {mockFachwoerter.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Klassen</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Layers className="h-6 w-6 text-primary" /> {mockBerufsfelder.length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const { count: userCountReal } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: nvCount } = await supabase
    .from("nomen_verb_verbindungen")
    .select("*", { count: "exact", head: true });

  const { count: fwCount } = await supabase
    .from("fachwoerter")
    .select("*", { count: "exact", head: true });

  const { count: classCountReal } = await supabase
    .from("classes")
    .select("*", { count: "exact", head: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin-Dashboard</h1>
        <p className="text-muted-foreground">
          Übersicht über Nutzer, Inhalte und Klassen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Nutzer</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> {userCountReal ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Nomen-Verb-Verbindungen</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" /> {nvCount ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Fachwörter</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" /> {fwCount ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Klassen</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" /> {classCountReal ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
