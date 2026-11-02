import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { isLocale, locales } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "P/A Institute", template: "%s — P/A Institute" },
  description: "Independent research in philosophy, science, intelligence, and operational forms.",
};

export const viewport: Viewport = { themeColor: "#F7F7F4", width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body className="min-h-screen antialiased">
        <Header locale={locale} />
        <main id="main" className="wrap" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
