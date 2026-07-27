"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface FocusModeContextValue {
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  toggleFocusMode: () => void;
}

const FocusModeContext = createContext<FocusModeContextValue | null>(null);

export function FocusModeProvider({ children }: { children: React.ReactNode }) {
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    if (focusMode) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }
    return () => {
      document.body.classList.remove("focus-mode");
    };
  }, [focusMode]);

  const toggleFocusMode = () => setFocusMode((v) => !v);

  return (
    <FocusModeContext.Provider value={{ focusMode, setFocusMode, toggleFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  );
}

export function useFocusMode() {
  const ctx = useContext(FocusModeContext);
  if (!ctx) {
    throw new Error("useFocusMode must be used within FocusModeProvider");
  }
  return ctx;
}
