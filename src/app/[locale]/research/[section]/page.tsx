import { notFound } from "next/navigation";
import { GroundingTag, NotRecovered, PageHeader, Section, UntranslatedNotice } from "@/components/ui";
import { NodeCard, RelationTable } from "@/components/research/blocks";
import { sectionById, sections } from "@/data/research/sections";
import { relations } from "@/data/relations/relations";
import { nodesInSection } from "@/lib/research/queries";
import { locales, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import type { ResearchSectionId } from "@/types/research";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => sections.map((s) => ({ locale, section: s.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale: rawLocale, section } = await params;
  const locale = rawLocale as Locale;
  const s = sectionById.get(section as ResearchSectionId);
  return pageMetadata(locale, `/research/${section}`, s?.title ?? "Research");
}

export default async function ResearchSectionPage({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale: rawLocale, section } = await params;
  const locale = rawLocale as Locale;
  const s = sectionById.get(section as ResearchSectionId);
  if (!s) notFound();
  const items = nodesInSection(s.id);
  const recovered = items.filter((n) => !n.unrecovered);
  const unrecovered = items.filter((n) => n.unrecovered);
  const ids = new Set(recovered.map((n) => n.id));
  const rels = relations.filter((r) => ids.has(r.from) || ids.has(r.to));

  return (
    <>
      <PageHeader eyebrow="Research area" title={locale === "ja" ? s.titleJa : s.title}>
        <p className="mt-4 flex items-start gap-3 text-sm text-muted">
          <GroundingTag state="editorial" locale={locale} />
          <span className="max-w-[72ch]" lang={locale === "ja" ? "en" : undefined}>{s.editorialNote}</span>
        </p>
        <UntranslatedNotice locale={locale} />
      </PageHeader>

      {recovered.length > 0 && (
        <Section id="items" title="Recovered research">
          <ul className="grid gap-4 md:grid-cols-2">
            {recovered.map((n) => <li key={n.id}><NodeCard node={n} locale={locale} /></li>)}
          </ul>
        </Section>
      )}

      {(unrecovered.length > 0 || recovered.length === 0) && (
        <Section id="unrecovered" title="Not recovered">
          <NotRecovered locale={locale} topics={unrecovered.length ? unrecovered.map((n) => [n.title, n.aliases?.join(" · "), n.subtitle].filter(Boolean).join(" — ")) : s.directiveTopics} />
        </Section>
      )}

      {rels.length > 0 && (
        <Section id="relations" title="Relations">
          <RelationTable locale={locale} items={rels} />
        </Section>
      )}
    </>
  );
}
