import { PageHeader, Section, UntranslatedNotice } from "@/components/ui";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/contact", "Contact");
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const critique = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Research Criticism / Correction")}`;
  return (
    <>
      <PageHeader eyebrow="Contact" title={locale === "ja" ? "連絡先" : "Contact"}>
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <div lang={locale === "ja" ? "en" : undefined}>
        <Section title="Correspondence">
          <p>
            <a href={`mailto:${site.contactEmail}`} className="mono text-lg">{site.contactEmail}</a>
          </p>
        </Section>
        <Section title="Criticism and corrections">
          <p className="prose-block">
            Criticism, counterarguments, and corrections are welcome, including those concerning earlier versions of the research. Please specify the
            publication, version or date, and the particular claim being addressed.
          </p>
          <p className="mt-3"><a href={critique}>Submit a critique by email →</a></p>
        </Section>
        <Section title="Privacy">
          <p className="prose-block text-sm text-muted">
            This site has no contact form, sets no cookies, and runs no analytics. Correspondence goes directly to the address above through your own
            mail client; this site does not receive or store it.
          </p>
        </Section>
        <Section title="Identifiers">
          <ul className="list-dash text-sm">
            <li><a href={site.orcid} rel="noopener noreferrer">ORCID 0009-0003-0435-181X ↗</a></li>
            <li><a href={site.philpapers} rel="noopener noreferrer">PhilPapers ↗</a></li>
            <li><a href={site.github} rel="noopener noreferrer">GitHub ↗</a></li>
          </ul>
        </Section>
      </div>
    </>
  );
}
