import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const l = (p: string) => `/${locale}${p}`;
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="wrap grid gap-8 py-10 text-sm md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="mono mb-2 text-xs font-semibold tracking-[0.18em]">P/A INSTITUTE</p>
          <p className="max-w-[48ch] text-muted">{t.footerNote}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-1">
            <li><Link href={l("/research-history")}>{t.nav.history}</Link></li>
            <li><Link href={l("/methods")}>{t.nav.methods}</Link></li>
            <li><Link href={l("/institute")}>{t.nav.institute}</Link></li>
            <li><Link href={l("/contact")}>{t.nav.contact}</Link></li>
          </ul>
        </nav>
        <ul className="space-y-1">
          <li><a href={site.personalUrl} rel="noopener">{t.personalSite} ↗</a></li>
          <li><a href={site.archiveUrl} rel="noopener">{t.archive} ↗</a></li>
          <li><a href={site.github} rel="noopener noreferrer">GitHub ↗</a></li>
          <li><a href={site.orcid} rel="noopener noreferrer">ORCID ↗</a></li>
        </ul>
      </div>
    </footer>
  );
}
