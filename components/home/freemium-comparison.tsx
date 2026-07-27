import { Fragment } from "react";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { label: "Fachwortschatz & Berufsfelder", free: true, registered: true },
  { label: "Nomen-Verb-Verbindungen", free: true, registered: true },
  { label: "Kommunikationsmodule", free: true, registered: true },
  { label: "Prüfungsaufgaben", free: true, registered: true },
  { label: "Audio-Wiedergabe", free: true, registered: true },
  { label: "Favoriten speichern", free: false, registered: true },
  { label: "Lernfortschritt verfolgen", free: false, registered: true },
  { label: "Eigenes Vokabelheft", free: false, registered: true },
  { label: "Werbefrei", free: false, registered: true },
];

export function FreemiumComparison() {
  return (
    <section className="border-t px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Kostenlos oder registriert?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Die wichtigsten Inhalte sind frei zugänglich. Mit einem Account schalten Sie zusätzliche Lernfunktionen frei.
          </p>
        </div>
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Funktionsübersicht</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-3 text-sm">
              <div className="border-b p-4 font-medium">Funktion</div>
              <div className="border-b p-4 text-center font-medium">Kostenlos</div>
              <div className="border-b bg-primary/5 p-4 text-center font-medium text-primary">
                Mit Account
              </div>
              {features.map((feature) => (
                <Fragment key={feature.label}>
                  <div className="border-b p-4 text-muted-foreground">
                    {feature.label}
                  </div>
                  <div className="flex items-center justify-center border-b p-4">
                    {feature.free ? (
                      <Check className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="h-5 w-4 text-muted-foreground/60" />
                    )}
                  </div>
                  <div className="flex items-center justify-center border-b bg-primary/5 p-4">
                    {feature.registered ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-4 text-muted-foreground/60" />
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
