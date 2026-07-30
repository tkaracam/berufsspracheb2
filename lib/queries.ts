import { createClient } from "@/lib/supabase/server";
import {
  mockBerufsfelder,
  mockBerufe,
  mockFachwoerter,
  mockNomenVerbVerbindungen,
  mockUebungen,
  type Fachwort,
  type NomenVerbVerbindung,
} from "@/lib/mock-data";

export type { Fachwort, NomenVerbVerbindung };

export function isMockMode() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !url || url === "http://dummy";
}

export async function getBerufsfelder() {
  if (isMockMode()) return mockBerufsfelder;
  const supabase = await createClient();
  const { data } = await supabase.from("berufsfelder").select("*").order("sort_order");
  return data && data.length > 0 ? data : mockBerufsfelder;
}

export async function getBerufsfeldById(id: string) {
  if (isMockMode()) return mockBerufsfelder.find((f) => f.id === id) ?? null;
  const supabase = await createClient();
  const { data } = await supabase.from("berufsfelder").select("*").eq("id", id).single();
  return data ?? mockBerufsfelder.find((f) => f.id === id) ?? null;
}

export async function getBerufeByFeld(id: string) {
  if (isMockMode()) return mockBerufe.filter((b) => b.berufsfeld_id === id);
  const supabase = await createClient();
  const { data } = await supabase.from("berufe").select("*").eq("berufsfeld_id", id).order("title");
  return data && data.length > 0 ? data : mockBerufe.filter((b) => b.berufsfeld_id === id);
}

export async function getFachwoerterByFeld(id: string, limit?: number) {
  let data = isMockMode()
    ? mockFachwoerter.filter((w) => w.berufsfeld_id === id)
    : (await (await createClient()).from("fachwoerter").select("*").eq("berufsfeld_id", id)).data ?? [];
  if (data.length === 0) {
    data = mockFachwoerter.filter((w) => w.berufsfeld_id === id);
  }
  if (limit) data = data.slice(0, limit);
  return data;
}

export async function getAllFachwoerter(limit?: number) {
  let data = isMockMode() ? mockFachwoerter : (await (await createClient()).from("fachwoerter").select("*")).data ?? [];
  if (data.length === 0) {
    data = mockFachwoerter;
  }
  if (limit) data = data.slice(0, limit);
  return data;
}

export async function getNomenVerbVerbindungen(search?: string) {
  let data = isMockMode()
    ? mockNomenVerbVerbindungen
    : (await (await createClient()).from("nomen_verb_verbindungen").select("*", { count: "exact" }).order("phrase")).data ?? [];

  if (search) {
    const q = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.phrase.toLowerCase().includes(q) ||
        (d.synonym?.toLowerCase().includes(q) ?? false)
    );
  }
  return { data, count: data.length };
}

export async function getUebungen() {
  if (isMockMode()) return mockUebungen;
  const supabase = await createClient();
  const { data } = await supabase.from("uebungen").select("*").eq("is_public", true);
  return data ?? [];
}

export async function getStats() {
  if (isMockMode()) {
    return {
      berufsfelder: mockBerufsfelder.length,
      fachwoerter: mockFachwoerter.length,
      nomenVerb: mockNomenVerbVerbindungen.length,
    };
  }
  const supabase = await createClient();
  const [{ count: bf }, { count: fw }, { count: nv }] = await Promise.all([
    supabase.from("berufsfelder").select("*", { count: "exact", head: true }),
    supabase.from("fachwoerter").select("*", { count: "exact", head: true }),
    supabase.from("nomen_verb_verbindungen").select("*", { count: "exact", head: true }),
  ]);
  return {
    berufsfelder: bf ?? mockBerufsfelder.length,
    fachwoerter: fw ?? 0,
    nomenVerb: nv ?? 0,
  };
}
