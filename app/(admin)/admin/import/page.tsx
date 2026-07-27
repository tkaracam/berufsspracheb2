import { importNomenVerb, importFachwortschatz } from "@/lib/actions/admin";
import { APP_NAME } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: `Import – ${APP_NAME}`,
};

export default function ImportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Daten importieren</h1>
      <p className="text-muted-foreground">
        Laden Sie CSV- oder JSON-Dateien mit Wortschatz hoch.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nomen-Verb-Verbindungen</CardTitle>
            <CardDescription>
              CSV-Format: phrase;synonym;beispielsatz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={importNomenVerb} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nvFile">Datei auswählen</Label>
                <Input id="nvFile" name="file" type="file" accept=".csv,.json" required />
              </div>
              <Button type="submit">Importieren</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fachwortschatz</CardTitle>
            <CardDescription>
              CSV-Format: berufsfeld_id;begriff;artikel;synonym;beispielsatz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={importFachwortschatz} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fwFile">Datei auswählen</Label>
                <Input id="fwFile" name="file" type="file" accept=".csv,.json" required />
              </div>
              <Button type="submit">Importieren</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
