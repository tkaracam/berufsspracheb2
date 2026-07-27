"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadAudio } from "@/lib/actions/audio";

interface AudioUploadProps {
  table: "fachwoerter" | "nomen_verb_verbindungen";
  id: string;
}

export function AudioUpload({ table, id }: AudioUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={uploadAudio} className="inline">
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept="audio/*"
        className="hidden"
        onChange={() => inputRef.current?.form?.requestSubmit()}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-4 w-4" />
      </Button>
    </form>
  );
}
