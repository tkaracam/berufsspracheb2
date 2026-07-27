import Link from "next/link";
import { Users, GraduationCap, TrendingUp, PlusCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Lehrer-Dashboard</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Klassen, Lernenden und Aufgaben.
          </p>
        </div>
        <Button asChild>
          <Link href="/lehrer/klassen/neu">
            <PlusCircle className="mr-2 h-4 w-4" /> Neue Klasse
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Klassen</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> {classes.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lernende</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" /> {memberCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Aufgaben</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" /> {assignmentCount}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Meine Klassen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {classes.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">Code: {c.code}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
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
            <Button className="w-full justify-start" asChild>
              <Link href="/lehrer/aufgaben/neu">
                <GraduationCap className="mr-2 h-4 w-4" /> Aufgabe zuweisen
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/lehrer/klassen">
                <Users className="mr-2 h-4 w-4" /> Klassen verwalten
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/api/teacher/worksheet?type=nomen_verb" target="_blank">
                <TrendingUp className="mr-2 h-4 w-4" /> PDF-Arbeitsblatt Nomen-Verb
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Klassenfortschritt</h2>
        </div>

        {classProgress.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Noch keine Klassen vorhanden.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {classProgress.map((c) => (
              <Card key={c.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle>{c.name}</CardTitle>
                      <CardDescription>
                        {c.progress.length} Lernende · Durchschnitt: {c.average}%
                      </CardDescription>
                    </div>
                    <div className="text-2xl font-bold text-primary">{c.average}%</div>
                  </div>
                  <Progress value={c.average} className="h-2 mt-2" />
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
                          <span className="font-medium">{p.fullName}</span>
                          <span className="text-muted-foreground">{p.average}%</span>
                        </div>
                        <Progress value={p.average} className="h-1.5" />
                      </div>
                    ))
                  )}
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/lehrer/klassen/${c.id}`}>Details ansehen</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
