import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAssignment } from "@/lib/actions/teacher";
import { createClient } from "@/lib/supabase/server";
import { APP_NAME } from "@/lib/constants";
import { isMockMode } from "@/lib/mock-user";
import { getDemoClasses } from "@/lib/demo-teacher-storage";
import { getUebungen } from "@/lib/queries";

export const metadata = {
  title: `Aufgabe zuweisen – ${APP_NAME}`,
};

export default async function NeueAufgabePage() {
  let classes: { id: string; name: string }[] = [];
  let uebungen: { id: string; title: string }[] = [];

  if (isMockMode()) {
    classes = (await getDemoClasses()).map((c) => ({ id: c.id, name: c.name }));
    uebungen = (await getUebungen()).map((u) => ({ id: u.id, title: u.title }));
  } else {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const [{ data: classesData }, { data: uebungenData }] = await Promise.all([
      supabase
        .from("classes")
        .select("id, name")
        .eq("teacher_id", user?.id ?? "")
        .order("name"),
      supabase
        .from("uebungen")
        .select("id, title")
        .eq("is_public", true)
        .order("title"),
    ]);

    classes = classesData ?? [];
    uebungen = uebungenData ?? [];
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/lehrer/aufgaben">
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
        </Link>
      </Button>

      <h1 className="text-3xl font-bold">Aufgabe zuweisen</h1>

      <Card className="max-w-xl">
        <form action={createAssignment}>
          <CardHeader>
            <CardTitle>Aufgabendetails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input id="title" name="title" placeholder="z. B. Nomen-Verb-Verbindungen wiederholen" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea id="description" name="description" placeholder="Was sollen die Lernenden üben?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classId">Klasse</Label>
              <Select name="classId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Klasse auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="uebungId">Übung (optional)</Label>
              <Select name="uebungId">
                <SelectTrigger>
                  <SelectValue placeholder="Übung auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {uebungen.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Aufgabe zuweisen</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
