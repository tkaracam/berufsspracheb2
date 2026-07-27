"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CommunicationModule } from "@/lib/communication-data";

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded bg-primary/20 px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

interface Props {
  modules: CommunicationModule[];
}

export function KommunikationSearch({ modules }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return modules;
    return modules.filter((m) =>
      [m.title, m.desc, m.tips.join(" "), m.redemittel.join(" "), m.example.title, m.example.text]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [modules, query]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Module durchsuchen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {filtered.length} von {modules.length} Modulen
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((module) => (
          <Card key={module.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>{highlightText(module.title, query)}</CardTitle>
              <CardDescription>{highlightText(module.desc, query)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-semibold">Redemittel</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {module.redemittel.slice(0, 3).map((phrase, i) => (
                    <li key={i} className="italic">
                      „{highlightText(phrase, query)}“
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {module.tips.slice(0, 2).map((tip, i) => (
                  <Badge key={i} variant="secondary" className="font-normal">
                    {highlightText(tip, query)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Keine Module gefunden. Probieren Sie einen anderen Suchbegriff.
        </p>
      )}
    </div>
  );
}
