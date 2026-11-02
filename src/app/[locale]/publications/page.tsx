import { PageHeader, Section, SourceList, UntranslatedNotice } from "@/components/ui";
import { PublicationRow } from "@/components/research/blocks";
import { publications } from "@/data/publications/publications";
import { fetchArchiveListing } from "@/lib/archive/client";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/publications", "Publications");
}

export default async function Publications({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const archive = await fetchArchiveListing();
  const preprints = publications.filter((p) => p.publicationType === "preprint");
  const books = publications.filter((p) => p.publicationType === "book");

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title={locale === "ja" ? "出版物" : "Publications"}
        lead="Papers are released as preprints on PhilPapers. None of the items listed have been peer-reviewed or formally published in a journal or press volume unless otherwise stated. No DOI is recorded for any item."
      >
        <UntranslatedNotice locale={locale} />
      </PageHeader>

      <Section id="archive" title="P/A Archive (P/A Journal)" note="Read-only connection to the Archive's public API. The Archive remains the canonical record system; this site does not write to it.">
        <div className="panel p-5 text-sm">
          {archive.ok ? (
            <>
              <p><span className="mono text-2xl">{archive.total}</span> public records at last fetch ({archive.fetchedAt.slice(0, 16).replace("T", " ")} UTC).</p>
              {archive.total === 0 ? (
                <p className="mt-2 text-muted">No records have been published in the Archive yet. Preprints below are listed from the author&apos;s publications page.</p>
              ) : (
                <ul className="list-dash mt-3">
                  {archive.records.map((r, i) => (
                    <li key={String(r.id ?? i)}>{String(r.title ?? r.id ?? "Untitled record")}</li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="text-muted">Archive listing unavailable: {archive.error}.</p>
          )}
          <p className="mt-3">
            Identifier policy (from the Archive): persistent identification is provided by P/A Identifiers (PAID:YYYY:NNNNNN), which are not DOIs.{" "}
            <a href={site.archiveUrl} rel="noopener">Open the Archive ↗</a>
          </p>
          <SourceList ids={["archive-api", "archive-home"]} locale={locale} />
        </div>
      </Section>

      <Section id="preprints" title="Preprints (PhilPapers)">
        <ul>{preprints.map((p) => <PublicationRow key={p.id} p={p} locale={locale} />)}</ul>
        <p className="mt-3 text-sm"><a href={site.philpapers} rel="noopener noreferrer">Full listing: PhilPapers profile ↗</a></p>
      </Section>

      <Section id="books" title="Books (Amazon KDP)" note="Links are to Amazon product pages.">
        <ul>{books.map((p) => <PublicationRow key={p.id} p={p} locale={locale} />)}</ul>
        <SourceList ids={["ps-publications"]} locale={locale} />
      </Section>
    </>
  );
}
