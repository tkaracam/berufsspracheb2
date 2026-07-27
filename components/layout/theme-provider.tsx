"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes rendert ein Inline-<script>, um Theme-Flimmern (FOUC) zu verhindern.
// React 19 warnt davor, dass <script>-Tags innerhalb von React-Komponenten nicht
// ausgeführt werden. Das Script läuft korrekt während des SSR – die Warnung ist
// ein bekanntes False Positive. Siehe: https://github.com/pacocoursey/next-themes/issues/385
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const first = args[0];
    if (
      typeof first === "string" &&
      first.includes("Encountered a script tag")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
