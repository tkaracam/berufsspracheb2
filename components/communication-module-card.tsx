"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CommunicationModule } from "@/lib/communication-data";

interface Props {
  module: CommunicationModule;
  icon: React.ReactNode;
}

export function CommunicationModuleCard({ module, icon }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary shrink-0">
              {icon}
            </div>
            <div>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription className="mt-1">{module.desc}</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" /> Weniger
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" /> Mehr
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-6 border-t pt-6">
          <div>
            <h4 className="font-semibold mb-2">Tipps</h4>
            <ul className="space-y-1.5 text-sm">
              {module.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0 mt-0.5 h-5 px-1.5">
                    {i + 1}
                  </Badge>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Redemittel</h4>
            <ul className="space-y-1.5 text-sm">
              {module.redemittel.map((phrase, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="italic">{phrase}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-muted/60 p-4">
            <h4 className="font-semibold mb-2">{module.example.title}</h4>
            <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
              {module.example.text}
            </pre>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
