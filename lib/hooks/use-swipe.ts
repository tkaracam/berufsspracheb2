"use client";

import { useRef, useCallback, useEffect } from "react";

export type SwipeDirection = "left" | "right" | "up" | "down";

interface UseSwipeOptions {
  onSwipe: (direction: SwipeDirection) => void;
  threshold?: number;
  enabled?: boolean;
}

export function useSwipe({ onSwipe, threshold = 60, enabled = true }: UseSwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const isActive = useRef(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      const touch = e.touches[0];
      start.current = { x: touch.clientX, y: touch.clientY };
      isActive.current = true;
    },
    [enabled]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled || !isActive.current || !start.current) return;
      isActive.current = false;

      const touch = e.changedTouches[0];
      const dx = touch.clientX - start.current.x;
      const dy = touch.clientY - start.current.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (absX < threshold && absY < threshold) return;

      if (absX > absY) {
        onSwipe(dx > 0 ? "right" : "left");
      } else {
        onSwipe(dy > 0 ? "down" : "up");
      }
    },
    [enabled, onSwipe, threshold]
  );

  const handleTouchCancel = useCallback(() => {
    isActive.current = false;
    start.current = null;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchCancel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [enabled, handleTouchStart, handleTouchEnd, handleTouchCancel]);

  return {
    // Attaches to the target element; window listeners handle gesture detection
    handlers: {
      onTouchStart: handleTouchStart as unknown as React.TouchEventHandler<HTMLElement>,
      onTouchEnd: handleTouchEnd as unknown as React.TouchEventHandler<HTMLElement>,
    },
  };
}
