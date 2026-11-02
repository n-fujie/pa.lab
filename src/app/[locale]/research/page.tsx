import Link from "next/link";
import { PageHeader, UntranslatedNotice } from "@/components/ui";
import { sections } from "@/data/research/sections";
import { nodesInSection } from "@/lib/research/queries";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/research", "Research");
}

export default async function ResearchIndex({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title={locale === "ja" ? "研究" : "Research"}
        lead={
          <p lang={locale === "ja" ? "en" : undefined}>
            The following constitute distinct but interacting research programmes. They are not interchangeable concepts, nor stages of a single
            developmental sequence. The areas below are navigation groupings for this site, not a disciplinary classification.
          </p>
        }
      >
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <ul className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
        {sections.map((s) => {
          const items = nodesInSection(s.id);
          const recovered = items.filter((n) => !n.unrecovered);
          return (
            <li key={s.id} className="flex flex-col bg-surface p-5">
              <h2 className="serif text-xl">
                <Link href={`/${locale}/research/${s.id}`} className="text-foreground">{locale === "ja" ? s.titleJa : s.title}</Link>
              </h2>
              <p className="mono mt-2 text-xs text-muted">
                {recovered.length} recovered item{recovered.length === 1 ? "" : "s"}
                {items.length > recovered.length && ` · ${items.length - recovered.length} not recovered`}
              </p>
              <ul className="list-dash mt-3 text-sm" lang={locale === "ja" ? "en" : undefined}>
                {recovered.slice(0, 5).map((n) => <li key={n.id}>{n.title}</li>)}
                {recovered.length === 0 && <li className="text-red">Source not recovered</li>}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}
