"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getDictionary, locales, type Locale } from "@/lib/i18n/config";

const items = [
  ["research", "research"],
  ["projects", "projects"],
  ["laboratory", "laboratory"],
  ["publications", "publications"],
  ["research-map", "researchMap"],
  ["methods", "methods"],
  ["institute", "institute"],
] as const;

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(en|ja)(?=\/|$)/, "");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <a href="#main" className="sr-only-focusable absolute left-2 top-2 z-50 bg-surface p-2">
        {t.skip}
      </a>
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="mono text-sm font-semibold tracking-[0.18em] text-foreground no-underline">
          P/A INSTITUTE
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {items.map(([href, key]) => {
              const active = rest === `/${href}` || rest.startsWith(`/${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={`/${locale}/${href}`}
                    aria-current={active ? "page" : undefined}
                    className={`mono text-[0.72rem] uppercase tracking-[0.1em] no-underline ${active ? "text-blue underline" : "text-foreground"}`}
                  >
                    {t.nav[key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <nav aria-label={t.language}>
            <ul className="mono flex gap-2 text-xs">
              {locales.map((l) => (
                <li key={l}>
                  <Link
                    href={`/${l}${rest}`}
                    hrefLang={l}
                    lang={l}
                    aria-current={l === locale ? "true" : undefined}
                    className={l === locale ? "font-bold text-foreground no-underline" : "text-muted"}
                  >
                    {l.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="mono border border-border px-2 py-1 text-xs lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border bg-surface lg:hidden">
          <ul className="wrap py-3">
            {[...items, ["research-history", "history"] as const, ["contact", "contact"] as const].map(([href, key]) => (
              <li key={href}>
                <Link href={`/${locale}/${href}`} className="block py-2 text-foreground" onClick={() => setOpen(false)}>
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
