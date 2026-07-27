"use client";

import { useSyncExternalStore, useCallback } from "react";
import {
  isDemoFavorite,
  toggleDemoFavorite,
  type DemoItemType,
} from "@/lib/demo-storage";

export type { DemoItemType };

const CHANGE_EVENT = "demo-favorites-change";

export function useDemoFavorite(itemType: DemoItemType, itemId: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const handler = () => callback();
      window.addEventListener(CHANGE_EVENT, handler);
      return () => window.removeEventListener(CHANGE_EVENT, handler);
    },
    []
  );

  return useSyncExternalStore(
    subscribe,
    () => isDemoFavorite(itemType, itemId),
    () => false
  );
}

export function toggleDemoFavoriteAndNotify(
  itemType: DemoItemType,
  itemId: string,
  title: string
) {
  const next = toggleDemoFavorite(itemType, itemId, title);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
  return next;
}
