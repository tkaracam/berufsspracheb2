"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Module {
  id: string;
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  words: number;
  jobs: number;
}

interface Props {
  modules: Module[];
}

export function BerufsfelderSearch({ modules }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return modules;
    return modules.filter((m) =>
      [m.title, m.description].join(" ").toLowerCase().includes(q)
    );
  }, [modules, query]);

  return (
    <div className="space-y-6">
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Berufsfeld suchen..."
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
        {filtered.length} von {modules.length} Berufsfeldern
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((feld) => {
          const Icon = feld.icon;
          return (
            <Link key={feld.id} href={feld.href} className="group block">
              <Card className="h-full border-t-4 border-t-blue-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/40">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feld.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {feld.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{feld.words} Begriffe</Badge>
                    <Badge variant="outline">{feld.jobs} Berufe</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Kein Berufsfeld gefunden. Probieren Sie einen anderen Suchbegriff.
        </p>
      )}
    </div>
  );
}
