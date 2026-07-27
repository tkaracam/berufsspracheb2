import { Briefcase, MessageSquare, BookOpen, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const roadmapSteps = [
  { icon: Briefcase, label: "Fachwortschatz", description: "Berufsbegriffe sicher beherrschen" },
  { icon: MessageSquare, label: "Nomen-Verb", description: "Feste Wendungen automatisch nutzen" },
  { icon: BookOpen, label: "Kommunikation", description: "Gespräche und E-Mails meistern" },
  { icon: GraduationCap, label: "Prüfungstraining", description: "Alle vier Prüfungsteile üben" },
  { icon: Award, label: "B2 bestehen", description: "Sicher im Berufsalltag kommunizieren" },
];

export function RoadmapSection() {
  return (
    <section className="border-t bg-muted/30 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ihr Weg zum B2
          </h2>
          <p className="mt-2 text-muted-foreground">
            Von den Grundlagen bis zur Prüfung – Schritt für Schritt.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
          {roadmapSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className={cn(
                  "relative flex items-center gap-6 md:gap-0",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div className={cn("flex-1 md:px-12", index % 2 === 0 ? "md:text-right" : "md:text-left")}>
                  <h3 className="text-lg font-semibold text-foreground">{step.label}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 md:px-12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
