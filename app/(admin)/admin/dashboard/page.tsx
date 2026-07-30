import { Users, BookOpen, GraduationCap, Layers, BarChart3, Activity } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/queries";
import { mockBerufsfelder, mockFachwoerter, mockNomenVerbVerbindungen } from "@/lib/mock-data";

export const metadata = {
  title: `Admin-Dashboard – ${APP_NAME}`,
};

export default async function AdminDashboardPage() {
  let userCount = 0;
  let nvCount = mockNomenVerbVerbindungen.length;
  let fwCount = mockFachwoerter.length;
  let fieldCount = mockBerufsfelder.length;

  if (isMockMode()) {
    return (
      <Container size="large">
        <PageHeader
          title="Admin-Dashboard"
          description="Übersicht über Nutzer, Inhalte und Berufsfelder. (Demo-Modus)"
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Nutzer" value="—" icon={<Users className="h-5 w-5" />} />
          <StatCard label="Nomen-Verb-Verbindungen" value={nvCount} icon={<BookOpen className="h-5 w-5" />} />
          <StatCard label="Fachwörter" value={fwCount} icon={<GraduationCap className="h-5 w-5" />} />
          <StatCard label="Berufsfelder" value={fieldCount} icon={<Layers className="h-5 w-5" />} />
        </div>
      </Container>
    );
  }

  const supabase = await createClient();

  const { count: userCountReal } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: nvCountReal } = await supabase
    .from("nomen_verb_verbindungen")
    .select("*", { count: "exact", head: true });

  const { count: fwCountReal } = await supabase
    .from("fachwoerter")
    .select("*", { count: "exact", head: true });

  const { count: fieldCountReal } = await supabase
    .from("berufsfelder")
    .select("*", { count: "exact", head: true });

  userCount = userCountReal ?? 0;
  nvCount = nvCountReal ?? 0;
  fwCount = fwCountReal ?? 0;
  fieldCount = fieldCountReal ?? 0;

  return (
    <Container size="large">
      <PageHeader
        title="Admin-Dashboard"
        description="Übersicht über Nutzer, Inhalte und Berufsfelder."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Nutzer" value={userCount} icon={<Users className="h-5 w-5" />} />
        <StatCard label="Nomen-Verb-Verbindungen" value={nvCount} icon={<BookOpen className="h-5 w-5" />} />
        <StatCard label="Fachwörter" value={fwCount} icon={<GraduationCap className="h-5 w-5" />} />
        <StatCard label="Berufsfelder" value={fieldCount} icon={<Layers className="h-5 w-5" />} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Plattform-Status</CardTitle>
            </div>
            <CardDescription>
              Alle Systeme laufen normal. Letzte Aktualisierung: {new Date().toLocaleDateString("de-DE")}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Inhaltsübersicht</CardTitle>
            </div>
            <CardDescription>
              {fwCount} Fachwörter und {nvCount} Nomen-Verb-Verbindungen verfügbar.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </Container>
  );
}
