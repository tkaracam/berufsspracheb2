export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: Database["public"]["Enums"]["app_role"];
          daily_goal: number;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: Database["public"]["Enums"]["app_role"];
          daily_goal?: number;
          avatar_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: []
      };
      roles: {
        Row: { id: Database["public"]["Enums"]["app_role"]; label: string };
        Insert: { id: Database["public"]["Enums"]["app_role"]; label: string };
        Update: Partial<Database["public"]["Tables"]["roles"]["Insert"]>;
        Relationships: []
      };
      classes: {
        Row: {
          id: string;
          name: string;
          teacher_id: string;
          code: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["classes"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["classes"]["Insert"]>;
        Relationships: []
      };
      class_members: {
        Row: {
          id: string;
          class_id: string;
          user_id: string;
          joined_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["class_members"]["Row"],
          "id" | "joined_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["class_members"]["Insert"]
        >;
        Relationships: []
      };
      berufsfelder: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          icon: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["berufsfelder"]["Row"],
          "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["berufsfelder"]["Insert"]>;
        Relationships: []
      };
      berufe: {
        Row: {
          id: string;
          berufsfeld_id: string;
          title: string;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["berufe"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["berufe"]["Insert"]>;
        Relationships: []
      };
      fachwoerter: {
        Row: {
          id: string;
          berufsfeld_id: string;
          beruf_id: string | null;
          begriff: string;
          artikel: string;
          synonym: string | null;
          beispielsatz: string | null;
          schwierigkeit: "leicht" | "mittel" | "schwer";
          audio_path: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["fachwoerter"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["fachwoerter"]["Insert"]>;
        Relationships: []
      };
      nomen_verb_verbindungen: {
        Row: {
          id: string;
          phrase: string;
          synonym: string | null;
          beispielsatz: string | null;
          kategorie: string | null;
          b2_relevanz: number;
          audio_path: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["nomen_verb_verbindungen"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["nomen_verb_verbindungen"]["Insert"]
        >;
        Relationships: []
      };
      uebungen: {
        Row: {
          id: string;
          title: string;
          type: Database["public"]["Enums"]["uebung_typ"];
          berufsfeld_id: string | null;
          description: string | null;
          is_public: boolean;
          created_by: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["uebungen"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["uebungen"]["Insert"]>;
        Relationships: []
      };
      fragen: {
        Row: {
          id: string;
          uebung_id: string;
          frage: string;
          antwort_typ: "text" | "single" | "multiple" | "zuordnung";
          korrekt: string | null;
          hinweis: string | null;
          sort_order: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["fragen"]["Row"],
          "id"
        >;
        Update: Partial<Database["public"]["Tables"]["fragen"]["Insert"]>;
        Relationships: []
      };
      antworten: {
        Row: {
          id: string;
          frage_id: string;
          text: string;
          ist_korrekt: boolean;
          sort_order: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["antworten"]["Row"],
          "id"
        >;
        Update: Partial<Database["public"]["Tables"]["antworten"]["Insert"]>;
        Relationships: []
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          item_type: "fachwort" | "nomen_verb" | "uebung";
          item_id: string;
          score: number;
          completed: boolean;
          practiced_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["user_progress"]["Row"],
          "id" | "practiced_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["user_progress"]["Insert"]
        >;
        Relationships: []
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          item_type: "fachwort" | "nomen_verb";
          item_id: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["favorites"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["favorites"]["Insert"]>;
        Relationships: []
      };
      assignments: {
        Row: {
          id: string;
          teacher_id: string;
          class_id: string;
          title: string;
          description: string | null;
          due_date: string | null;
          uebung_id: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["assignments"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["assignments"]["Insert"]>;
        Relationships: []
      };
      submissions: {
        Row: {
          id: string;
          assignment_id: string | null;
          uebung_id: string | null;
          user_id: string;
          score: number;
          answers: Json;
          submitted_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["submissions"]["Row"],
          "id" | "submitted_at"
        >;
        Update: Partial<Database["public"]["Tables"]["submissions"]["Insert"]>;
        Relationships: []
      };
      files: {
        Row: {
          id: string;
          uploaded_by: string;
          bucket: string;
          path: string;
          filename: string;
          mime_type: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["files"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["files"]["Insert"]>;
        Relationships: []
      };
      settings: {
        Row: {
          id: string;
          value: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["settings"]["Row"],
          "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["settings"]["Insert"]>;
        Relationships: []
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: "guest" | "learner" | "teacher" | "admin";
      uebung_typ:
        | "multiple_choice"
        | "zuordnung"
        | "lueckentext"
        | "drag_drop"
        | "satzbildung"
        | "umformulierung";
    };
    CompositeTypes: Record<string, never>;
  };
};
