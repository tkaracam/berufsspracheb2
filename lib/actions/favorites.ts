"use server";

import { revalidatePath } from "next/cache";
import { createClient, getSession } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/is-mock-mode";

export type FavoriteItemType = "fachwort" | "nomen_verb";

export interface FavoriteItem {
  id: string;
  type: FavoriteItemType;
  title: string;
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  if (isMockMode()) {
    return [];
  }

  const { user } = await getSession();
  if (!user) return [];

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("favorites")
    .select("item_id, item_type")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!rows || rows.length === 0) return [];

  const fachwortIds = rows
    .filter((r) => r.item_type === "fachwort")
    .map((r) => r.item_id);
  const nvIds = rows
    .filter((r) => r.item_type === "nomen_verb")
    .map((r) => r.item_id);

  const [{ data: fachwoerter }, { data: nv }] = await Promise.all([
    fachwortIds.length > 0
      ? supabase.from("fachwoerter").select("id, begriff").in("id", fachwortIds)
      : Promise.resolve({ data: [] as { id: string; begriff: string }[] }),
    nvIds.length > 0
      ? supabase.from("nomen_verb_verbindungen").select("id, phrase").in("id", nvIds)
      : Promise.resolve({ data: [] as { id: string; phrase: string }[] }),
  ]);

  const fachwortMap = new Map(fachwoerter?.map((w) => [w.id, w.begriff]) ?? []);
  const nvMap = new Map(nv?.map((n) => [n.id, n.phrase]) ?? []);

  return rows.map((row) => {
    const title =
      row.item_type === "fachwort"
        ? fachwortMap.get(row.item_id)
        : nvMap.get(row.item_id);
    return {
      id: row.item_id,
      type: row.item_type as FavoriteItemType,
      title: title ?? row.item_id,
    };
  });
}

export async function toggleFavorite(
  itemType: FavoriteItemType,
  itemId: string
): Promise<boolean> {
  if (isMockMode()) {
    return false;
  }

  const { user } = await getSession();
  if (!user) return false;

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("item_type", itemType)
    .eq("item_id", itemId)
    .maybeSingle();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
    revalidatePath("/favoriten");
    revalidatePath("/dashboard");
    return false;
  }

  await supabase.from("favorites").insert({
    user_id: user.id,
    item_type: itemType,
    item_id: itemId,
  });
  revalidatePath("/favoriten");
  revalidatePath("/dashboard");
  return true;
}

export async function removeFavorite(
  itemType: FavoriteItemType,
  itemId: string
): Promise<void> {
  if (isMockMode()) {
    return;
  }

  const { user } = await getSession();
  if (!user) return;

  const supabase = await createClient();
  await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("item_type", itemType)
    .eq("item_id", itemId);

  revalidatePath("/favoriten");
  revalidatePath("/dashboard");
}
