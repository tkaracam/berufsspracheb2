"use client";

import {
  useSyncExternalStore,
  useCallback,
  useTransition,
  useState,
  useEffect,
} from "react";
import { isMockMode } from "@/lib/is-mock-mode";
import {
  isDemoFavorite,
  toggleDemoFavorite,
  type DemoItemType,
} from "@/lib/demo-storage";
import { toggleFavorite, type FavoriteItemType } from "@/lib/actions/favorites";

export type { DemoItemType as FavoriteItemType };

const CHANGE_EVENT = "favorites-change";

export function useFavorite(
  itemType: DemoItemType,
  itemId: string,
  initialFavorited = false
) {
  const [serverFavorited, setServerFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  const mock = isMockMode();

  const subscribe = useCallback((callback: () => void) => {
    const handler = () => callback();
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  const getSnapshot = useCallback(() => {
    if (mock) {
      return isDemoFavorite(itemType, itemId);
    }
    return serverFavorited;
  }, [mock, itemType, itemId, serverFavorited]);

  const favorited = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialFavorited
  );

  const toggle = useCallback(
    (title: string) => {
      if (mock) {
        const next = toggleDemoFavorite(itemType, itemId, title);
        window.dispatchEvent(new Event(CHANGE_EVENT));
        return next;
      }

      startTransition(async () => {
        const next = await toggleFavorite(itemType as FavoriteItemType, itemId);
        setServerFavorited(next);
        window.dispatchEvent(new Event(CHANGE_EVENT));
      });
    },
    [mock, itemType, itemId]
  );

  return { favorited, toggle, isPending };
}

export function useFavoritesCount(initialCount?: number) {
  const [count, setCount] = useState(initialCount ?? 0);

  useEffect(() => {
    const update = () => {
      if (isMockMode()) {
        import("@/lib/demo-storage").then(({ getDemoFavoritesCount }) => {
          setCount(getDemoFavoritesCount());
        });
      }
    };

    update();
    window.addEventListener(CHANGE_EVENT, update);
    return () => window.removeEventListener(CHANGE_EVENT, update);
  }, []);

  return count;
}
