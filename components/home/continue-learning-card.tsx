import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/supabase/server";

export async function ContinueLearningCard() {
  const { user } = await getSession();

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {user ? <Sparkles className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
          </div>
          <div>
            <h3 className="font-semibold">
              {user ? "Willkommen zurück!" : "Starten Sie Ihre Lernreise"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {user
                ? "Setzen Sie dort weiter, wo Sie aufgehört haben – mit Fachwortschatz und Prüfungsübungen."
                : "Entdecken Sie Fachwortschatz, Kommunikation und Prüfungstraining für den B2-Kurs."}
            </p>
          </div>
        </div>
        <Button asChild className="shrink-0">
          <Link href={user ? "/berufsfelder" : "/register"}>
            {user ? "Weiterlernen" : "Kostenlos registrieren"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
