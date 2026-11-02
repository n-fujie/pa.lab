import type { Metadata } from "next";
import { site } from "@/lib/site";
import { locales, type Locale } from "@/lib/i18n/config";

/** Per-page metadata with canonical URL and hreflang alternates. `path` excludes the locale prefix. */
export function pageMetadata(locale: Locale, path: string, title: string, description?: string): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/en${path}` } },
    openGraph: { title, description, url: `/${locale}${path}`, siteName: "P/A Institute", type: "website" },
    robots: site.urlConfigured ? undefined : { index: false, follow: false },
  };
}
