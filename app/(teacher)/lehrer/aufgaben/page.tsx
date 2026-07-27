import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME } from "@/lib/constants";
import { isMockMode } from "@/lib/mock-user";
import { getDemoAssignments } from "@/lib/demo-teacher-storage";

export const metadata = {
  title: `Aufgaben – ${APP_NAME}`,
};

type AssignmentWithClass = {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  classes: { name?: string } | null;
};

export default async function AufgabenPage() {
  let assignments: {
    id: string;
    title: string;
    description: string | null;
    due_date: string | null;
    className: string | null;
  }[] = [];

  if (isMockMode()) {
    const demoAssignments = await getDemoAssignments();
    assignments = demoAssignments.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      due_date: a.dueDate,
      className: a.className,
    }));
  } else {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("assignments")
      .select("*, classes(name)")
      .eq("teacher_id", user?.id ?? "")
      .order("created_at", { ascending: false });

    const raw = (data ?? []) as AssignmentWithClass[];
    assignments = raw.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      due_date: a.due_date,
      className: a.classes?.name ?? null,
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Aufgaben</h1>
        <Button asChild>
          <Link href="/lehrer/aufgaben/neu">
            <PlusCircle className="mr-2 h-4 w-4" /> Aufgabe zuweisen
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {assignments.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <CardTitle>{a.title}</CardTitle>
              <CardDescription>
                Klasse: {a.className ?? "—"} ·{" "}
                {a.due_date
                  ? new Date(a.due_date).toLocaleDateString("de-DE")
                  : "Keine Frist"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{a.description}</p>
            </CardContent>
          </Card>
        ))}
        {assignments.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Noch keine Aufgaben zugewiesen.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
