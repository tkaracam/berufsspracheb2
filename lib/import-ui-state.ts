export interface ImportUiState {
  status: "idle" | "preview" | "imported" | "rolledback" | "error";
  message: string;
  sampleRows: Record<string, string | null>[];
  sampleDuplicates: string[];
  insertedIds: string[];
  summary?: {
    parsed: number;
    unique: number;
    duplicatesInFile: number;
    duplicatesInDatabase: number;
    readyToImport: number;
    inserted?: number;
    rolledBack?: number;
  };
}

export const initialImportUiState: ImportUiState = {
  status: "idle",
  message: "",
  sampleRows: [],
  sampleDuplicates: [],
  insertedIds: [],
};
