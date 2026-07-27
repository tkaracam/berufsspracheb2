import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { addStudent } from "@/lib/actions/teacher";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME } from "@/lib/constants";
import { isMockMode } from "@/lib/mock-user";
import { getDemoClassById, getDemoProgressByClass } from "@/lib/demo-teacher-storage";

interface Props {
  params: Promise<{ id: string }>;
}

type ClassMemberWithProfile = {
  id: string;
  profiles: { full_name?: string; email?: string } | null;
};

export const metadata = {
  title: `Klasse – ${APP_NAME}`,
};

export default async function KlasseDetailPage({ params }: Props) {
  const { id } = await params;
  let klasse: { id: string; name: string; code: string } | null = null;
  let members: { id: string; full_name: string | null; email: string | null }[] = [];
  let progress: Awaited<ReturnType<typeof getDemoProgressByClass>> = [];

  if (isMockMode()) {
    const demoClass = await getDemoClassById(id);
    if (!demoClass) return notFound();
    klasse = demoClass;
    members = demoClass.members.map((m) => ({
      id: m.id,
      full_name: m.fullName,
      email: m.email,
    }));
    progress = await getDemoProgressByClass(id);
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from("classes")
      .select("*")
      .eq("id", id)
      .single();
    if (!data) return notFound();
    klasse = data;

    const { data: membersData } = await supabase
      .from("class_members")
      .select("*, profiles(full_name, email)")
      .eq("class_id", id)
      .order("joined_at", { ascending: false });

    const rawMembers = (membersData ?? []) as ClassMemberWithProfile[];
    members = rawMembers.map((m) => ({
      id: m.id,
      full_name: m.profiles?.full_name ?? null,
      email: m.profiles?.email ?? null,
    }));
  }

  const classAverage =
    progress.length === 0
      ? 0
      : Math.round(progress.reduce((sum, p) => sum + p.average, 0) / progress.length);

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/lehrer/klassen">
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold">{klasse.name}</h1>
        <p className="text-muted-foreground">
          Klassen-Code: <span className="font-mono font-medium">{klasse.code}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lernende</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {members.map((m) => {
              const p = progress.find((x) => x.studentId === m.id);
              return (
                <div key={m.id} className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{m.full_name ?? "Unbekannt"}</p>
                      <p className="text-sm text-muted-foreground">{m.email}</p>
                    </div>
                    {p && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{p.average}%</p>
                      </div>
                    )}
                  </div>
                  {p && <Progress value={p.average} className="h-1.5" />}
                </div>
              );
            })}
            {members.length === 0 && (
              <p className="text-muted-foreground">Noch keine Lernenden hinzugefügt.</p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" /> Lernenden hinzufügen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addStudent} className="space-y-4">
                <input type="hidden" name="classId" value={id} />
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail des Lernenden</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="lernender@beispiel.de"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Hinzufügen
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gesamtfortschritt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Klassendurchschnitt</span>
                <span className="text-2xl font-bold text-primary">{classAverage}%</span>
              </div>
              <Progress value={classAverage} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {isMockMode()
                  ? "Der Fortschritt basiert auf Demo-Daten."
                  : "Der Fortschritt wird aus den abgeschlossenen Aufgaben der Lernenden berechnet."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
