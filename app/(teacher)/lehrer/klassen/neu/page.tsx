import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClass } from "@/lib/actions/teacher";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `Neue Klasse – ${APP_NAME}`,
};

export default function NeueKlassePage() {
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/lehrer/klassen">
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
        </Link>
      </Button>

      <h1 className="text-3xl font-bold">Neue Klasse erstellen</h1>

      <Card className="max-w-xl">
        <form action={createClass}>
          <CardHeader>
            <CardTitle>Klassendaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name der Klasse</Label>
              <Input id="name" name="name" placeholder="z. B. BSK B2 Kurs A" required />
            </div>
            <Button type="submit">Klasse erstellen</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
