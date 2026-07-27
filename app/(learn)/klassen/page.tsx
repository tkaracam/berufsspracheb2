import Link from "next/link";
import { PlusCircle, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMyClasses } from "@/lib/actions/learner";

export const metadata = {
  title: "Meine Klassen",
};

export default async function MeineKlassenPage() {
  const classes = await getMyClasses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meine Klassen</h1>
          <p className="text-muted-foreground">
            Klassen, denen Sie beigetreten sind, und zugewiesene Aufgaben.
          </p>
        </div>
        <Button asChild>
          <Link href="/klassen/beitreten">
            <PlusCircle className="mr-2 h-4 w-4" /> Klasse beitreten
          </Link>
        </Button>
      </div>

      {classes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground space-y-4">
            <Users className="h-12 w-12 mx-auto" />
            <p>Sie sind noch keiner Klasse beigetreten.</p>
            <Button asChild variant="outline">
              <Link href="/klassen/beitreten">
                <PlusCircle className="mr-2 h-4 w-4" /> Per Code beitreten
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{cls.name}</CardTitle>
                  <Badge variant="secondary">Code: {cls.code}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/klassen/${cls.code}`}>
                    Aufgaben ansehen <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
