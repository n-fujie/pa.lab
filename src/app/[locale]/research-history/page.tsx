import Link from "next/link";
import { PageHeader, Section, Tag, UntranslatedNotice } from "@/components/ui";
import { history } from "@/data/research/history";
import { nodeById } from "@/data/research/nodes";
import { sourceById } from "@/data/sources";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/research-history", "Research History");
}

export default async function ResearchHistory({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const events = [...history].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader
        eyebrow="Research history"
        title={locale === "ja" ? "研究履歴" : "Research History"}
        lead="Releases, experiments, submissions and revisions with a date stated in a recovered source. Each entry keeps its source. Undated developments are not placed on this timeline."
      >
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <Section title="Timeline">
        <ol className="relative border-l border-border" lang={locale === "ja" ? "en" : undefined}>
          {events.map((h) => (
            <li key={h.id} className="mb-8 ml-5">
              <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 border border-foreground bg-surface" aria-hidden="true" />
              <p className="mono text-xs text-muted">
                <time>{h.date}</time> · <Tag>{h.kind}</Tag>
              </p>
              <h3 className="mt-1 font-semibold">{h.title}</h3>
              <p className="max-w-[72ch] text-sm">{h.detail}</p>
              <p className="mono mt-1 text-xs text-muted">
                {h.relatedNodes.map((id) => (
                  <Link key={id} href={`/${locale}/projects/${id}`} className="mr-3">{nodeById.get(id)?.title}</Link>
                ))}
                {h.sources.map((s) => (
                  <a key={s} href={sourceById.get(s)?.url} rel="noopener noreferrer" className="mr-3">source ↗</a>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Inheritance format">
        <p className="prose-block text-sm text-muted">
          All research data on this site is stored as typed, machine-readable records (sources, nodes, relations, experiments, publications, events) in the
          repository under <code className="mono">src/data/</code>, with integrity checks that run with the test suite. A JSON export is served at{" "}
          <a href="/research-data.json">/research-data.json</a> for re-verification by other researchers.
        </p>
      </Section>
    </>
  );
}
