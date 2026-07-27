import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LanguageProvider } from "@/components/layout/language-provider";
import { FocusModeProvider } from "@/components/layout/focus-mode-provider";
import { PageBackground } from "@/components/layout/page-background";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { type Locale, defaultLocale, rtlLocales } from "@/lib/i18n/dictionaries";
import "./globals.css";
import "./theme.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `${APP_NAME} – Berufssprachkurs B2 professionell trainieren`,
  description: APP_DESCRIPTION,
  keywords: [
    "BSK B2",
    "Berufssprachkurs",
    "Fachwortschatz",
    "Nomen-Verb-Verbindungen",
    "berufliche Kommunikation",
    "Deutsch B2",
  ],
  authors: [{ name: APP_NAME }],
  openGraph: {
    title: `${APP_NAME} – Berufssprachkurs B2`,
    description: APP_DESCRIPTION,
    type: "website",
    locale: "de_DE",
  },
};

async function getInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("NEXT_LOCALE")?.value as Locale | undefined;
  return cookie && ["de", "tr", "en", "ar", "uk"].includes(cookie) ? cookie : defaultLocale;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getInitialLocale();
  const isRtl = rtlLocales.includes(locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <PageBackground />
        <LanguageProvider initialLocale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <FocusModeProvider>
              {children}
              <Toaster position="top-center" richColors />
            </FocusModeProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
