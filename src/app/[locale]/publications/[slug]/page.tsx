import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Section, SourceList, UntranslatedNotice } from "@/components/ui";
import { publicationById, publications } from "@/data/publications/publications";
import { nodeById } from "@/data/research/nodes";
import { locales, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => publications.map((p) => ({ locale, slug: p.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const p = publicationById.get(slug);
  return pageMetadata(locale, `/publications/${slug}`, p?.title ?? "Publication", p?.abstract ?? undefined);
}

export default async function PublicationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const p = publicationById.get(slug);
  if (!p) notFound();

  // Structured data limited to verified fields; no DOI, no full date, no peer-review claim.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": p.publicationType === "book" ? "Book" : "ScholarlyArticle",
    name: p.title,
    author: p.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: p.publicationDate ?? undefined,
    url: p.canonicalUrl ?? undefined,
    publisher: p.venue,
  };

  const rows: [string, string][] = [
    ["Authors", p.authors.join(", ")],
    ["Year", p.publicationDate ?? "Not recorded"],
    ["Type", p.publicationType],
    ["Venue", p.venue],
    ["Peer review", p.peerReviewed === false ? "Not peer reviewed" : "Not stated"],
    ["DOI", p.doi ?? "None recorded"],
    ["Version", p.version ?? "Not recorded"],
    ["Corrections / retraction", p.correctionStatus ?? "None recorded"],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow="Publication" title={p.title}>
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <div lang={locale === "ja" ? "en" : undefined}>
        <Section title="Record">
          <dl className="grid max-w-[720px] grid-cols-[180px_1fr] gap-y-2 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="mono text-xs text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {p.canonicalUrl && (
            <p className="mt-6">
              <a href={p.canonicalUrl} rel="noopener noreferrer" className="font-semibold">Canonical record ↗</a>
            </p>
          )}
        </Section>
        {p.abstract && (
          <Section title="Description" note="The author's listing description from the publications page — not the paper's abstract.">
            <p className="prose-block">{p.abstract}</p>
          </Section>
        )}
        {p.relatedProjects.length > 0 && (
          <Section title="Related research">
            <ul className="list-dash">
              {p.relatedProjects.map((id) => (
                <li key={id}><Link href={`/${locale}/projects/${id}`}>{nodeById.get(id)?.title}</Link></li>
              ))}
            </ul>
          </Section>
        )}
        <SourceList ids={p.sources} locale={locale} />
      </div>
    </>
  );
}
