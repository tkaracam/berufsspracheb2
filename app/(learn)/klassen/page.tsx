import Link from "next/link";
import { PlusCircle, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getMyClasses } from "@/lib/actions/learner";

export const metadata = {
  title: "Meine Klassen",
};

export default async function MeineKlassenPage() {
  const classes = await getMyClasses();

  return (
    <Container size="large">
      <PageHeader
        title="Meine Klassen"
        description="Klassen, denen Sie beigetreten sind, und zugewiesene Aufgaben."
      >
        <Button asChild>
          <Link href="/klassen/beitreten">
            <PlusCircle className="mr-2 h-4 w-4" /> Klasse beitreten
          </Link>
        </Button>
      </PageHeader>

      {classes.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="space-y-4 py-12 text-center text-muted-foreground">
            <Users className="mx-auto h-12 w-12" />
            <p>Sie sind noch keiner Klasse beigetreten.</p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/klassen/beitreten">
                <PlusCircle className="mr-2 h-4 w-4" /> Per Code beitreten
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4">
          {classes.map((cls) => (
            <Card key={cls.id} className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{cls.name}</CardTitle>
                  <Badge variant="secondary" className="rounded-full">Code: {cls.code}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="rounded-xl">
                  <Link href={`/klassen/${cls.code}`}>
                    Aufgaben ansehen <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
