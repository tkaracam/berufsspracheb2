import Link from "next/link";
import { Users, GraduationCap, TrendingUp, PlusCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/mock-user";
import { getDemoClasses, getDemoAssignments, getDemoProgressByClass } from "@/lib/demo-teacher-storage";

export const metadata = {
  title: `Lehrer-Dashboard – ${APP_NAME}`,
};

export default async function TeacherDashboardPage() {
  let classes: { id: string; name: string; code: string }[] = [];
  let memberCount = 0;
  let assignmentCount = 0;

  if (isMockMode()) {
    const demoClasses = await getDemoClasses();
    const demoAssignments = await getDemoAssignments();
    classes = demoClasses;
    memberCount = demoClasses.reduce((sum, c) => sum + c.members.length, 0);
    assignmentCount = demoAssignments.length;
  } else {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("classes")
      .select("*")
      .eq("teacher_id", user?.id ?? "")
      .order("created_at", { ascending: false });

    classes = data ?? [];
    const classIds = classes.map((c) => c.id);

    const [{ count }, { count: assignmentCountReal }] = await Promise.all([
      supabase
        .from("class_members")
        .select("*", { count: "exact", head: true })
        .in("class_id", classIds.length ? classIds : ["00000000-0000-0000-0000-000000000000"]),
      supabase
        .from("assignments")
        .select("*", { count: "exact", head: true })
        .eq("teacher_id", user?.id ?? ""),
    ]);

    memberCount = count ?? 0;
    assignmentCount = assignmentCountReal ?? 0;
  }

  const classProgress = await Promise.all(
    classes.map(async (c) => {
      const progress = isMockMode() ? await getDemoProgressByClass(c.id) : [];
      const average =
        progress.length === 0
          ? 0
          : Math.round(progress.reduce((sum, p) => sum + p.average, 0) / progress.length);
      return { ...c, average, progress };
    })
  );

  return (
    <Container size="large">
      <PageHeader
        title="Lehrer-Dashboard"
        description="Verwalten Sie Ihre Klassen, Lernenden und Aufgaben."
      >
        <Button asChild>
          <Link href="/lehrer/klassen/neu">
            <PlusCircle className="mr-2 h-4 w-4" /> Neue Klasse
          </Link>
        </Button>
      </PageHeader>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Klassen"
          value={classes.length}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label="Lernende"
          value={memberCount}
          icon={<GraduationCap className="h-5 w-5" />}
        />
        <StatCard
          label="Aufgaben"
          value={assignmentCount}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Meine Klassen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {classes.map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-bold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">Code: {c.code}</p>
                </div>
                <Button variant="outline" size="sm" asChild className="rounded-xl">
                  <Link href={`/lehrer/klassen/${c.id}`}>Öffnen</Link>
                </Button>
              </div>
            ))}
            {classes.length === 0 && (
              <p className="text-muted-foreground">Noch keine Klassen vorhanden.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schnellaktionen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start rounded-xl" asChild>
              <Link href="/lehrer/aufgaben/neu">
                <GraduationCap className="mr-2 h-4 w-4" /> Aufgabe zuweisen
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
              <Link href="/lehrer/klassen">
                <Users className="mr-2 h-4 w-4" /> Klassen verwalten
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
              <Link href="/api/teacher/worksheet?type=nomen_verb" target="_blank">
                <TrendingUp className="mr-2 h-4 w-4" /> PDF-Arbeitsblatt Nomen-Verb
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Klassenfortschritt</h2>
        </div>

        {classProgress.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Noch keine Klassen vorhanden.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {classProgress.map((c) => (
              <Card key={c.id}>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle>{c.name}</CardTitle>
                      <CardDescription>
                        {c.progress.length} Lernende · Durchschnitt: {c.average}%
                      </CardDescription>
                    </div>
                    <div className="text-2xl font-extrabold text-primary">{c.average}%</div>
                  </div>
                  <Progress value={c.average} className="mt-2 h-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {c.progress.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Noch keine Lernenden in dieser Klasse.
                    </p>
                  ) : (
                    c.progress.slice(0, 5).map((p) => (
                      <div key={p.studentId} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">{p.fullName}</span>
                          <span className="text-muted-foreground">{p.average}%</span>
                        </div>
                        <Progress value={p.average} className="h-1.5" />
                      </div>
                    ))
                  )}
                  <Button variant="outline" size="sm" className="w-full rounded-xl" asChild>
                    <Link href={`/lehrer/klassen/${c.id}`}>Details ansehen</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
