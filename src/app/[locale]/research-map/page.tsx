import { PageHeader, Section, UntranslatedNotice } from "@/components/ui";
import { RelationTable } from "@/components/research/blocks";
import { ResearchMap } from "@/components/visualization/ResearchMap";
import { relations } from "@/data/relations/relations";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/research-map", "Research Map");
}

export default async function ResearchMapPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const inferred = relations.filter((r) => r.evidence === "site-inferred").length;
  return (
    <>
      <PageHeader
        eyebrow="Research Map"
        title={locale === "ja" ? "研究マップ" : "Research Map"}
        lead={
          <>
            <p>
              Every line is a relation stated in a recovered source, typed and with its basis attached. Directed and bidirectional relations, and
              established relations and hypotheses, are drawn differently.
            </p>
            <p>
              {inferred} relation{inferred === 1 ? " was" : "s were"} proposed while building this site and {inferred === 1 ? "is" : "are"} marked
              site-inferred; {inferred === 1 ? "it is" : "they are"} hidden by default and await author confirmation. Topics whose sources were not
              recovered have no relations.
            </p>
          </>
        }
      >
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <div className="mt-8">
        <ResearchMap locale={locale} />
      </div>
      <Section id="list" title="Relation list" note="The same information as the graph, available without the drawing.">
        <RelationTable locale={locale} />
      </Section>
      <Section id="not-implemented" title="Not implemented">
        <p className="max-w-[72ch] text-sm text-muted">
          Temporal filtering is not implemented: the recovered sources give no dates for when individual relations were established. Dated events are
          listed in Research History.
        </p>
      </Section>
    </>
  );
}
