"use client";

import { useActionState } from "react";
import { FileText, RotateCcw, Upload, Eye } from "lucide-react";
import {
  importFachwortschatzAction,
  importNomenVerbAction,
  previewFachwortschatzAction,
  previewNomenVerbAction,
  rollbackFachwortschatzImportAction,
  rollbackNomenVerbImportAction,
} from "@/lib/actions/admin";
import { initialImportUiState, type ImportUiState } from "@/lib/import-ui-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function StatusAlert({ state }: { state: ImportUiState }) {
  if (state.status === "idle") return null;

  const destructive = state.status === "error";
  return (
    <Alert variant={destructive ? "destructive" : "default"}>
      <AlertTitle>
        {state.status === "preview" && "Vorschau bereit"}
        {state.status === "imported" && "Import abgeschlossen"}
        {state.status === "rolledback" && "Import rückgängig gemacht"}
        {state.status === "error" && "Aktion fehlgeschlagen"}
      </AlertTitle>
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}

function Summary({ state }: { state: ImportUiState }) {
  if (!state.summary) return null;

  const { parsed, unique, duplicatesInFile, duplicatesInDatabase, readyToImport, inserted, rolledBack } = state.summary;
  return (
    <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3 xl:grid-cols-6">
      <div className="rounded-lg border p-3"><div className="text-muted-foreground">Gelesen</div><div className="text-xl font-semibold">{parsed}</div></div>
      <div className="rounded-lg border p-3"><div className="text-muted-foreground">Eindeutig</div><div className="text-xl font-semibold">{unique}</div></div>
      <div className="rounded-lg border p-3"><div className="text-muted-foreground">Duplikate Datei</div><div className="text-xl font-semibold">{duplicatesInFile}</div></div>
      <div className="rounded-lg border p-3"><div className="text-muted-foreground">Schon in DB</div><div className="text-xl font-semibold">{duplicatesInDatabase}</div></div>
      <div className="rounded-lg border p-3"><div className="text-muted-foreground">Importierbar</div><div className="text-xl font-semibold">{readyToImport}</div></div>
      <div className="rounded-lg border p-3"><div className="text-muted-foreground">{rolledBack ? "Zurückgenommen" : "Importiert"}</div><div className="text-xl font-semibold">{rolledBack ?? inserted ?? 0}</div></div>
    </div>
  );
}

function SampleTable({
  rows,
  columns,
}: {
  rows: Record<string, string | null>[];
  columns: { key: string; label: string }[];
}) {
  if (!rows.length) return null;

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>{row[column.key] ?? "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DuplicatesList({ state }: { state: ImportUiState }) {
  if (!state.sampleDuplicates.length) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Beispiel-Duplikate</h4>
      <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
        {state.sampleDuplicates.join(", ")}
      </div>
    </div>
  );
}

function ActionButtons({
  previewAction,
  importAction,
}: {
  previewAction: (formData: FormData) => void;
  importAction: (formData: FormData) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="submit" formAction={previewAction} variant="outline">
        <Eye className="mr-2 h-4 w-4" />
        Vorschau
      </Button>
      <Button type="submit" formAction={importAction}>
        <Upload className="mr-2 h-4 w-4" />
        Importieren
      </Button>
    </div>
  );
}

function RollbackForm({
  ids,
  rollbackAction,
}: {
  ids: string[];
  rollbackAction: (formData: FormData) => void;
}) {
  if (!ids.length) return null;
  return (
    <form className="pt-2">
      <input type="hidden" name="ids" value={JSON.stringify(ids)} />
      <Button type="submit" formAction={rollbackAction} variant="outline">
        <RotateCcw className="mr-2 h-4 w-4" />
        Letzten Import rückgängig machen
      </Button>
    </form>
  );
}

function ImportCard({
  title,
  description,
  fieldId,
  state,
  previewAction,
  importAction,
  rollbackAction,
  columns,
}: {
  title: string;
  description: string;
  fieldId: string;
  state: ImportUiState;
  previewAction: (formData: FormData) => void;
  importAction: (formData: FormData) => void;
  rollbackAction: (formData: FormData) => void;
  columns: { key: string; label: string }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={fieldId}>Datei auswählen</Label>
            <Input id={fieldId} name="file" type="file" accept=".csv,.json" required />
          </div>
          <ActionButtons previewAction={previewAction} importAction={importAction} />
        </form>

        <StatusAlert state={state} />
        <Summary state={state} />
        <DuplicatesList state={state} />
        <SampleTable rows={state.sampleRows} columns={columns} />
        <RollbackForm ids={state.insertedIds} rollbackAction={rollbackAction} />
      </CardContent>
    </Card>
  );
}

export function ImportManager() {
  const [nvPreviewState, nvPreviewAction] = useActionState(previewNomenVerbAction, initialImportUiState);
  const [nvImportState, nvImportAction] = useActionState(importNomenVerbAction, initialImportUiState);
  const [nvRollbackState, nvRollbackAction] = useActionState(rollbackNomenVerbImportAction, initialImportUiState);

  const [fwPreviewState, fwPreviewAction] = useActionState(previewFachwortschatzAction, initialImportUiState);
  const [fwImportState, fwImportAction] = useActionState(importFachwortschatzAction, initialImportUiState);
  const [fwRollbackState, fwRollbackAction] = useActionState(rollbackFachwortschatzImportAction, initialImportUiState);

  const nomenVerbState =
    nvRollbackState.status !== "idle"
      ? nvRollbackState
      : nvImportState.status !== "idle"
        ? nvImportState
        : nvPreviewState;

  const fachwortState =
    fwRollbackState.status !== "idle"
      ? fwRollbackState
      : fwImportState.status !== "idle"
        ? fwImportState
        : fwPreviewState;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Daten importieren</h1>
        <p className="text-muted-foreground">
          Prüfen Sie Dateien vor dem Import, erkennen Sie Duplikate und machen Sie den letzten Batch bei Bedarf rückgängig.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ImportCard
          title="Nomen-Verb-Verbindungen"
          description="CSV-Format: phrase;synonym;beispielsatz"
          fieldId="nvFile"
          state={nomenVerbState}
          previewAction={nvPreviewAction}
          importAction={nvImportAction}
          rollbackAction={nvRollbackAction}
          columns={[
            { key: "phrase", label: "Phrase" },
            { key: "kategorie", label: "Kategorie" },
            { key: "synonym", label: "Synonym" },
          ]}
        />

        <ImportCard
          title="Fachwortschatz"
          description="CSV-Format: berufsfeld_id;begriff;artikel;synonym;beispielsatz"
          fieldId="fwFile"
          state={fachwortState}
          previewAction={fwPreviewAction}
          importAction={fwImportAction}
          rollbackAction={fwRollbackAction}
          columns={[
            { key: "berufsfeld_id", label: "Berufsfeld" },
            { key: "artikel", label: "Artikel" },
            { key: "begriff", label: "Begriff" },
            { key: "synonym", label: "Synonym" },
          ]}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow</CardTitle>
          <CardDescription>
            Empfohlen: zuerst Vorschau, dann Import. Große JSON-Dateien wie der vorbereitete `nomen-verb-import.json` können direkt hier hochgeladen werden.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Datei auswählen</p>
          <p>2. Vorschau öffnen und Duplikate prüfen</p>
          <p>3. Importieren</p>
          <p>4. Falls nötig, denselben Batch sofort zurücknehmen</p>
        </CardContent>
      </Card>
    </div>
  );
}
