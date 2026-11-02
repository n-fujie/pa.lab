import Link from "next/link";
import { notFound } from "next/navigation";
import { GroundingTag, NotRecovered, PageHeader, Section, SourceList, UntranslatedNotice } from "@/components/ui";
import { ExperimentCard, PublicationRow, RelationTable } from "@/components/research/blocks";
import { nodeById } from "@/data/research/nodes";
import { sectionById } from "@/data/research/sections";
import { history } from "@/data/research/history";
import { visuals } from "@/data/visuals";
import { VisualFigure } from "@/components/research/VisualFigure";
import { experimentsFor, nodeKindLabel, projectNodes, publicationsFor, relationsFor } from "@/lib/research/queries";
import { locales, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projectNodes.map((n) => ({ locale, slug: n.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const n = nodeById.get(slug);
  return pageMetadata(locale, `/projects/${slug}`, n?.title ?? "Project", n?.summary || undefined);
}

const repoFor: Record<string, string> = {
  "xz-simulator": "https://github.com/n-fujie/ziran-xeno-simulator",
  "xz-runtime": "https://github.com/n-fujie/xeno-ziran-runtime",
  tii: "https://github.com/n-fujie/TII",
};

/**
 * Common project template. Sections render only when recovered material exists for them;
 * nothing is filled in to complete the template.
 */
export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const n = nodeById.get(slug);
  if (!n || n.kind === "external") notFound();
  const rels = relationsFor(n.id).map((x) => x.relation);
  const exps = experimentsFor(n.id);
  const pubs = publicationsFor(n.id);
  const hist = history.filter((h) => h.relatedNodes.includes(n.id));
  const negative = exps.flatMap((e) => e.negativeFindings.map((f) => ({ e, f })));
  const repo = repoFor[n.id];
  const figs = visuals.filter((v) => v.nodeId === n.id);
  const content = locale === "ja" ? "en" : undefined;

  return (
    <>
      <PageHeader eyebrow={nodeKindLabel[n.kind]} title={n.title}>
        {n.subtitle && <p className="mt-2 text-lg text-muted">{n.subtitle}</p>}
        {n.aliases && <p className="mt-1 text-muted" lang="ja">{n.aliases.join(" · ")}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <GroundingTag state={n.grounding} locale={locale} />
          {n.sections.map((s) => (
            <Link key={s} href={`/${locale}/research/${s}`} className="tag text-muted no-underline">{sectionById.get(s)?.title}</Link>
          ))}
        </div>
        {!n.unrecovered && <UntranslatedNotice locale={locale} />}
      </PageHeader>

      {n.unrecovered ? (
        <Section title="Status"><NotRecovered locale={locale} /></Section>
      ) : (
        <div lang={content}>
          <Section id="thesis" title="Central statement">
            <p className="serif prose-block text-xl leading-relaxed">{n.summary}</p>
            {n.status && <p className="mono mt-4 text-xs text-muted">Status: {n.status}</p>}
            <SourceList ids={n.sources} locale={locale} />
          </Section>

          {figs.length > 0 && (
            <Section id="visuals" title="Visual materials">
              <div className="space-y-6">{figs.map((v) => <VisualFigure key={v.id} v={v} locale={locale} />)}</div>
            </Section>
          )}

          {n.distinctions && n.distinctions.length > 0 && (
            <Section id="distinctions" title="Conceptual distinctions">
              <ul className="list-dash prose-block">{n.distinctions.map((d) => <li key={d}>{d}</li>)}</ul>
            </Section>
          )}

          {n.notClaimed && n.notClaimed.length > 0 && (
            <Section id="limitations" title="Limitations and non-claims">
              <ul className="list-dash prose-block text-muted">{n.notClaimed.map((d) => <li key={d}>{d}</li>)}</ul>
            </Section>
          )}

          {repo && (
            <Section id="repositories" title="Repositories">
              <p><a href={repo} rel="noopener noreferrer">{repo.replace("https://", "")} ↗</a></p>
            </Section>
          )}

          {exps.length > 0 && (
            <Section id="experiments" title="Experiments and observed results">
              <div className="space-y-4">{exps.map((e) => <ExperimentCard key={e.id} e={e} locale={locale} />)}</div>
            </Section>
          )}

          {negative.length > 0 && (
            <Section id="negative" title="Negative findings">
              <ul className="list-dash prose-block">{negative.map(({ e, f }) => <li key={e.id + f}>{f} <span className="mono text-xs text-muted">({e.title})</span></li>)}</ul>
            </Section>
          )}

          {rels.length > 0 && (
            <Section id="related" title="Related research">
              <RelationTable locale={locale} items={rels} />
            </Section>
          )}

          {pubs.length > 0 && (
            <Section id="publications" title="Publications">
              <ul>{pubs.map((p) => <PublicationRow key={p.id} p={p} locale={locale} />)}</ul>
            </Section>
          )}

          {hist.length > 0 && (
            <Section id="history" title="Revision history">
              <ul className="mono space-y-1 text-sm">{hist.map((h) => <li key={h.id}>{h.date} — {h.title}</li>)}</ul>
            </Section>
          )}
        </div>
      )}
    </>
  );
}
