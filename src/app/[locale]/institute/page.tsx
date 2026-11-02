import { PageHeader, Section, SourceList, Tag, UntranslatedNotice } from "@/components/ui";
import { nodes } from "@/data/research/nodes";
import { sections } from "@/data/research/sections";
import { sources } from "@/data/sources";
import { relations } from "@/data/relations/relations";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "/institute", "Institute");
}

/** Additional directive items checked during recovery and not found in any public source. */
const otherUnrecovered = [
  "5S conditions (Xenoscience) — formal definition",
  "Expansions of MO, DO, ZCA, MS (Ziran System components)",
  "Xeno-Askesis",
  "Gaisho firing rate, coupling rate, nuance — operational definitions",
  "Rodenian Wide Human / Disconnection as used in XenoBody research",
  "Remaining eleven Xeno-14 principle names (recorded in simulator source, not read)",
];

export default async function Institute({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const unrecovered = nodes.filter((n) => n.unrecovered);
  const counts = {
    verified: nodes.filter((n) => n.grounding === "verified").length,
    titleOnly: nodes.filter((n) => n.grounding === "title-only").length,
    unrecovered: unrecovered.length,
  };

  return (
    <>
      <PageHeader eyebrow="Institute" title={locale === "ja" ? "研究所について" : "P/A Institute"}>
        <UntranslatedNotice locale={locale} />
      </PageHeader>
      <div lang={locale === "ja" ? "en" : undefined}>
        <Section id="about" title="Institutional statement">
          <div className="prose-block">
            <p>
              P/A Institute is the setting through which Naoto Fujie conducts independent research in Operational-Shape Realism, Non-Closure Realism,
              Xenoscience, ANESCIRE, and related philosophical and experimental programmes.
            </p>
            <p>
              Naoto Fujie operates as an independent researcher. There is no current institutional affiliation with a university or academic department.
              The research is self-directed and self-funded. Institutional affiliations, academic degrees, appointments, or awards are not claimed beyond
              what is verifiable. The work is conducted through P/A Institute and Plato Design.
            </p>
            <p className="text-sm text-muted">
              This site makes no claim about legal entity status, staff numbers, facilities, partner institutions, or accreditation; none was found in the
              recovered sources.
            </p>
          </div>
          <SourceList ids={["ps-about", "archive-home"]} locale={locale} />
        </Section>

        <Section id="domains" title="Separation of sites">
          <ul className="grid gap-4 md:grid-cols-3 text-sm">
            <li className="panel p-5">
              <p className="eyebrow mb-2">Personal research website</p>
              <p><a href={site.personalUrl} rel="noopener">{site.personalUrl.replace("https://", "")} ↗</a></p>
              <p className="mt-2 text-muted">Author website: activity, writing, profile, personal projects. Not modified by this site.</p>
            </li>
            <li className="panel p-5">
              <p className="eyebrow mb-2">P/A Archive</p>
              <p><a href={site.archiveUrl} rel="noopener">{site.archiveUrl.replace("https://", "")} ↗</a></p>
              <p className="mt-2 text-muted">Research journal, publication records, corrections and retractions. Read via public API only.</p>
            </li>
            <li className="panel p-5">
              <p className="eyebrow mb-2">P/A Institute (this site)</p>
              <p className="mono">{site.urlConfigured ? site.url : "Domain not yet decided"}</p>
              <p className="mt-2 text-muted">Independent research infrastructure; separate repository and deployment.</p>
            </li>
          </ul>
        </Section>

        <Section id="verification" title="Verification status (recovery ledger)" note="Recovery was carried out on 2026-11-02 from public sources only. Items not found are listed here rather than filled in.">
          <dl className="mono mb-6 flex flex-wrap gap-6 text-sm">
            <div><dt className="text-muted">Verified items</dt><dd className="text-2xl">{counts.verified}</dd></div>
            <div><dt className="text-muted">Title only</dt><dd className="text-2xl">{counts.titleOnly}</dd></div>
            <div><dt className="text-muted">Not recovered</dt><dd className="text-2xl">{counts.unrecovered + otherUnrecovered.length}</dd></div>
            <div><dt className="text-muted">Relations</dt><dd className="text-2xl">{relations.length}</dd></div>
            <div><dt className="text-muted">Sources read</dt><dd className="text-2xl">{sources.length}</dd></div>
          </dl>
          <h3 className="mb-2 font-semibold">Not recovered</h3>
          <ul className="list-dash text-sm">
            {unrecovered.map((n) => (
              <li key={n.id}>
                <Tag tone="red">no source</Tag> {n.title}
                {n.subtitle ? ` — ${n.subtitle}` : ""}
              </li>
            ))}
            {otherUnrecovered.map((x) => (
              <li key={x}><Tag tone="red">no source</Tag> {x}</li>
            ))}
          </ul>
          <h3 className="mb-2 mt-6 font-semibold">Sections as navigation</h3>
          <p className="max-w-[72ch] text-sm text-muted">
            The research areas ({sections.map((s) => s.title).join(", ")}) are navigation groupings for this site. They are not a disciplinary
            classification of the research.
          </p>
          <h3 className="mb-2 mt-6 font-semibold">Sources read</h3>
          <SourceList ids={sources.map((s) => s.id)} locale={locale} />
        </Section>
      </div>
    </>
  );
}
