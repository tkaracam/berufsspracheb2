import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { joinClassByCode } from "@/lib/actions/learner";

export const metadata = {
  title: "Klasse beitreten",
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function KlasseBeitretenPage({ searchParams }: Props) {
  const { error } = await searchParams;

  const errorMessage =
    error === "missing"
      ? "Bitte geben Sie einen Klassen-Code ein."
      : error === "invalid"
      ? "Keine Klasse mit diesem Code gefunden."
      : error === "failed"
      ? "Beitritt ist fehlgeschlagen. Bitte versuchen Sie es erneut."
      : null;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/klassen">
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
        </Link>
      </Button>

      <Card>
        <CardHeader className="text-center">
          <Users className="h-12 w-12 mx-auto text-primary mb-2" />
          <CardTitle className="text-2xl">Klasse beitreten</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={joinClassByCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Klassen-Code</Label>
              <Input
                id="code"
                name="code"
                placeholder="z. B. A1B2C3"
                autoComplete="off"
                className="uppercase"
              />
              <p className="text-xs text-muted-foreground">
                Den Code erhalten Sie von Ihrer Lehrkraft.
              </p>
            </div>

            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full">
              Beitreten
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
