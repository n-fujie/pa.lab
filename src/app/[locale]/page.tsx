import Link from "next/link";
import { ResearchMap } from "@/components/visualization/ResearchMap";
import { ArrowLink, Section, Tag, UntranslatedNotice } from "@/components/ui";
import { PublicationRow } from "@/components/research/blocks";
import { nodeById } from "@/data/research/nodes";
import { deployments } from "@/data/laboratory";
import { experiments } from "@/data/experiments/experiments";
import { publications } from "@/data/publications/publications";
import { fetchArchiveListing } from "@/lib/archive/client";
import { getDictionary, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return pageMetadata(locale, "", "P/A Institute", "Independent research in philosophy, science, intelligence, and operational forms.");
}

const featured = ["osr", "xenoscience", "ziran-system", "xenobody"];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const t = getDictionary(locale);
  const l = (p: string) => `/${locale}${p}`;
  const archive = await fetchArchiveListing();
  const negativeCount = experiments.filter((e) => e.negativeFindings.length > 0).length;

  return (
    <>
      <section className="border-b border-border pb-10 pt-12 md:pt-20">
        <p className="eyebrow mb-4">Independent Research Infrastructure</p>
        <h1 className="serif max-w-[22ch] text-4xl leading-[1.1] md:text-6xl">
          Independent Research in Philosophy, Science, Intelligence, and Operational Forms
        </h1>
        <p className="prose-block mt-6 text-lg text-muted" lang={locale === "ja" ? "en" : undefined}>
          Research into the conditions under which operational forms, scientific practices, intelligence, embodiment, and institutional structures arise,
          persist, transform, and cease to operate.
        </p>
        <p className="mono mt-4 text-xs text-muted">
          Provisional site introduction — not a formal research thesis. Programme statements on this site are quoted from the author&apos;s published sources.
        </p>
        <UntranslatedNotice locale={locale} />
      </section>

      <Section id="map" title={t.nav.researchMap} note="Relations between programmes, systems and positions, as stated in recovered sources. A diagram of relations is not the research object itself.">
        <ResearchMap locale={locale} />
        <p className="mt-4 text-sm">
          <ArrowLink href={l("/research-map")}>Full map with relation list</ArrowLink>
        </p>
      </Section>

      <Section id="featured" title="Research programmes" note="The programmes are distinct but interacting; they are not stages of a single developmental sequence.">
        <ul className="grid gap-px border border-border bg-border md:grid-cols-2" lang={locale === "ja" ? "en" : undefined}>
          {featured.map((id) => {
            const n = nodeById.get(id)!;
            return (
              <li key={id} className="bg-surface p-5">
                <h3 className="serif text-xl"><Link href={l(`/projects/${id}`)} className="text-foreground">{n.title}</Link></h3>
                <p className="text-sm text-muted">{n.subtitle}</p>
                <p className="mt-2 text-sm">{n.summary}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm"><ArrowLink href={l("/research")}>All research areas</ArrowLink></p>
      </Section>

      <Section id="systems" title="Experimental systems" note="Links go to the real deployments. Nothing on this site imitates their behaviour.">
        <ul className="grid gap-4 md:grid-cols-3">
          {deployments.filter((d) => d.url).slice(0, 3).map((d) => (
            <li key={d.id} className="panel p-5">
              <p className="mono mb-2 text-xs text-muted">{d.state}</p>
              <h3 className="font-semibold"><a href={d.url!} rel="noopener noreferrer">{d.title} ↗</a></h3>
              <p className="mt-2 text-sm text-muted">{d.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm"><ArrowLink href={l("/laboratory")}>Laboratory</ArrowLink></p>
      </Section>

      <Section id="publications" title={t.publications}>
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <ul>
            {publications.filter((p) => p.representative).slice(0, 3).map((p) => <PublicationRow key={p.id} p={p} locale={locale} />)}
          </ul>
          <div className="panel h-fit p-5 text-sm">
            <p className="eyebrow mb-2">P/A Archive — live</p>
            {archive.ok ? (
              <p>
                <span className="mono text-2xl">{archive.total}</span> public records.
                {archive.total === 0 && " The Archive has not yet published any record."}
              </p>
            ) : (
              <p className="text-muted">Archive listing unavailable ({archive.error}).</p>
            )}
            <p className="mt-3"><ArrowLink href={l("/publications")}>All publications</ArrowLink></p>
          </div>
        </div>
      </Section>

      <Section id="integrity" title="Research integrity">
        <ul className="grid gap-4 md:grid-cols-3 text-sm">
          <li className="panel p-5">
            <Tag tone="red">Negative findings</Tag>
            <p className="mt-3">{negativeCount} experiment records carry negative or conditional findings. They are kept with the results, not removed.</p>
            <p className="mt-2"><Link href={l("/laboratory/experiments")}>Experiment records →</Link></p>
          </li>
          <li className="panel p-5">
            <Tag tone="blue">Methods</Tag>
            <p className="mt-3">Absence of detection is not absence of difference. Implementation, approximation and theory are distinguished.</p>
            <p className="mt-2"><Link href={l("/methods")}>Methods →</Link></p>
          </li>
          <li className="panel p-5">
            <Tag tone="brown">Recovery ledger</Tag>
            <p className="mt-3">Topics whose sources were not recovered are listed as such instead of being filled in.</p>
            <p className="mt-2"><Link href={l("/institute#verification")}>Verification status →</Link></p>
          </li>
        </ul>
      </Section>
    </>
  );
}
