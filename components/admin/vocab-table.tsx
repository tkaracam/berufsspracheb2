"use client";

import { AudioPlayer } from "@/components/exercises/audio-player";
import { AudioUpload } from "./audio-upload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface VocabItem {
  id: string;
  term: string;
  synonym: string | null;
  example: string | null;
  audioPath: string | null;
  audioText: string;
}

interface VocabTableProps {
  items: VocabItem[];
  table: "fachwoerter" | "nomen_verb_verbindungen";
}

export function VocabTable({ items, table }: VocabTableProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Keine Einträge vorhanden.
      </p>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Begriff</TableHead>
              <TableHead>Synonym</TableHead>
              <TableHead>Beispielsatz</TableHead>
              <TableHead className="w-24">Audio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium whitespace-normal">
                  {item.term}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {item.synonym ?? "—"}
                </TableCell>
                <TableCell className="max-w-md whitespace-normal">
                  {item.example}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <AudioPlayer path={item.audioPath} text={item.audioText} />
                    <AudioUpload table={table} id={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Begriff
                </p>
                <p className="font-medium text-lg">{item.term}</p>
              </div>
              {item.synonym && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Synonym
                  </p>
                  <p>{item.synonym}</p>
                </div>
              )}
              {item.example && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Beispielsatz
                  </p>
                  <p className="text-sm text-muted-foreground">{item.example}</p>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2 border-t">
                <AudioPlayer path={item.audioPath} text={item.audioText} />
                <AudioUpload table={table} id={item.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
