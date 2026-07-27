import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getClassByCode, getClassAssignments } from "@/lib/actions/learner";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function KlasseDetailPage({ params }: Props) {
  const { code } = await params;
  const cls = await getClassByCode(code);

  if (!cls) {
    notFound();
  }

  const assignments = await getClassAssignments(code);

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/klassen">
          <ArrowLeft className="mr-2 h-4 w-4" /> Meine Klassen
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold">{cls.name}</h1>
        <p className="text-muted-foreground">
          Klassen-Code: <Badge variant="secondary">{cls.code}</Badge>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" /> Aufgaben
        </h2>

        {assignments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Noch keine Aufgaben für diese Klasse vorhanden.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {assignments.map((a) => (
              <Card key={a.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> {a.title}
                  </CardTitle>
                </CardHeader>
                {a.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
