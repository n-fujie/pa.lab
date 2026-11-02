import Link from "next/link";
import { nodeById } from "@/data/research/nodes";
import { relations } from "@/data/relations/relations";
import { sourceById } from "@/data/sources";
import { GroundingTag, SourceList, Tag } from "@/components/ui";
import { nodeKindLabel, relationTypeLabel } from "@/lib/research/queries";
import type { Locale } from "@/lib/i18n/config";
import type { ResearchNode, ResearchRelation } from "@/types/research";
import type { ExperimentalResult } from "@/types/experiment";
import type { Publication } from "@/types/publication";

export function NodeCard({ node, locale }: { node: ResearchNode; locale: Locale }) {
  return (
    <article className="panel flex h-full flex-col p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="eyebrow">{nodeKindLabel[node.kind]}</span>
        <GroundingTag state={node.grounding} locale={locale} />
      </div>
      <h3 className="serif text-xl leading-snug">
        {node.kind === "external" ? node.title : <Link href={`/${locale}/projects/${node.id}`} className="text-foreground">{node.title}</Link>}
      </h3>
      {node.subtitle && <p className="mt-1 text-sm text-muted">{node.subtitle}</p>}
      {node.aliases && <p className="mt-1 text-sm text-muted" lang="ja">{node.aliases.join(" · ")}</p>}
      {node.summary && <p className="mt-3 text-sm" lang={locale === "ja" ? "en" : undefined}>{node.summary}</p>}
      {node.status && <p className="mono mt-auto pt-4 text-xs text-muted">{node.status}</p>}
    </article>
  );
}

const evidenceText: Record<ResearchRelation["evidence"], string> = {
  established: "Stated in source",
  hypothesis: "Stated as hypothesis",
  "site-inferred": "Site-inferred — awaiting author confirmation",
};

/** Accessible, non-graphical equivalent of the research map. */
export function RelationTable({ locale, items = relations }: { locale: Locale; items?: ResearchRelation[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">Research relations with type, direction, evidence state, basis, and sources</caption>
        <thead>
          <tr className="border-b border-foreground">
            <th scope="col" className="py-2 pr-3 font-semibold">From</th>
            <th scope="col" className="py-2 pr-3 font-semibold">Relation</th>
            <th scope="col" className="py-2 pr-3 font-semibold">To</th>
            <th scope="col" className="py-2 pr-3 font-semibold">Evidence</th>
            <th scope="col" className="py-2 font-semibold">Basis (source wording)</th>
          </tr>
        </thead>
        <tbody lang={locale === "ja" ? "en" : undefined}>
          {items.map((r) => {
            const a = nodeById.get(r.from)!;
            const b = nodeById.get(r.to)!;
            const link = (n: ResearchNode) => (n.kind === "external" ? n.title : <Link href={`/${locale}/projects/${n.id}`}>{n.title}</Link>);
            return (
              <tr key={r.id} id={r.id} className="border-b border-border align-top">
                <td className="py-2 pr-3">{link(a)}</td>
                <td className="mono py-2 pr-3 text-xs">
                  {relationTypeLabel[r.type]}
                  <br />
                  <span className="text-muted">{r.directed ? "directed →" : "bidirectional ↔"}</span>
                </td>
                <td className="py-2 pr-3">{link(b)}</td>
                <td className="py-2 pr-3 text-xs">{evidenceText[r.evidence]}</td>
                <td className="py-2 text-muted">
                  “{r.basis}”
                  <span className="mono mt-1 block text-xs">
                    {r.sources.map((s, i) => (
                      <span key={s}>
                        {i > 0 && " · "}
                        <a href={sourceById.get(s)?.url} rel="noopener noreferrer">{sourceById.get(s)?.title}</a>
                      </span>
                    ))}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const outcomeLabel: Record<ExperimentalResult["hypothesisOutcome"], { text: string; tone: "blue" | "red" | "brown" | "muted" }> = {
  supported: { text: "Hypothesis supported", tone: "blue" },
  "not-supported": { text: "Hypothesis not supported", tone: "red" },
  conditional: { text: "Conditional result", tone: "brown" },
  stop: { text: "STOP", tone: "red" },
  "negative-engineering": { text: "Negative engineering result", tone: "red" },
  "none-stated": { text: "No hypothesis outcome stated", tone: "muted" },
};

export function ExperimentCard({ e, locale }: { e: ExperimentalResult; locale: Locale }) {
  const o = outcomeLabel[e.hypothesisOutcome];
  return (
    <article id={e.id} className="panel scroll-mt-24 p-5 md:p-6" lang={locale === "ja" ? "en" : undefined}>
      <h3 className="serif text-xl leading-snug">{e.title}</h3>
      <dl className="mono mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:grid-cols-4">
        <div><dt className="text-muted">Implementation</dt><dd>{e.implementationState}</dd></div>
        <div><dt className="text-muted">Experiment</dt><dd>{e.experimentalState}</dd></div>
        <div><dt className="text-muted">Observation</dt><dd>{e.observationState}</dd></div>
        <div><dt className="text-muted">Public</dt><dd>{e.publiclyDeployed ? "yes" : "no — local only"}</dd></div>
      </dl>
      <p className="mt-3"><Tag tone={o.tone}>{o.text}</Tag></p>
      {e.question && <><h4 className="eyebrow mb-1 mt-4">Question</h4><p className="text-sm">{e.question}</p></>}
      {e.configuration && <><h4 className="eyebrow mb-1 mt-4">Configuration</h4><p className="text-sm">{e.configuration}</p></>}
      {e.resultSummary && <><h4 className="eyebrow mb-1 mt-4">Result</h4><p className="text-sm">{e.resultSummary}</p></>}
      {e.reportedStatistics.length > 0 && (
        <><h4 className="eyebrow mb-1 mt-4">Reported figures (as published)</h4><ul className="list-dash mono text-xs">{e.reportedStatistics.map((s) => <li key={s}>{s}</li>)}</ul></>
      )}
      {e.negativeFindings.length > 0 && (
        <div className="mt-4 border-l-2 border-red pl-3">
          <h4 className="eyebrow mb-1 text-red">Negative findings</h4>
          <ul className="list-dash text-sm">{e.negativeFindings.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      )}
      {e.notClaimed.length > 0 && (
        <><h4 className="eyebrow mb-1 mt-4">Not claimed</h4><ul className="list-dash text-sm text-muted">{e.notClaimed.map((s) => <li key={s}>{s}</li>)}</ul></>
      )}
      {e.limitations.length > 0 && (
        <><h4 className="eyebrow mb-1 mt-4">Limitations</h4><ul className="list-dash text-sm text-muted">{e.limitations.map((s) => <li key={s}>{s}</li>)}</ul></>
      )}
      {e.dates.length > 0 && (
        <dl className="mono mt-4 text-xs">{e.dates.map((d) => <div key={d.label}><dt className="inline text-muted">{d.label}: </dt><dd className="inline">{d.value}</dd></div>)}</dl>
      )}
      {e.reproductionInstructions && <><h4 className="eyebrow mb-1 mt-4">Reproduction</h4><pre className="mono overflow-x-auto whitespace-pre-wrap bg-background p-3 text-xs">{e.reproductionInstructions}</pre></>}
      {e.repositoryUrl && <p className="mt-3 text-sm"><a href={e.repositoryUrl} rel="noopener noreferrer">Repository / protocol ↗</a></p>}
      <SourceList ids={e.evidenceReferences} locale={locale} />
    </article>
  );
}

export function PublicationRow({ p, locale }: { p: Publication; locale: Locale }) {
  return (
    <li className="border-b border-border py-4">
      <p className="mono mb-1 text-xs text-muted">
        {p.publicationDate ?? "Date not recorded"} · {p.venue} · {p.publicationType === "preprint" ? "Not peer reviewed" : "Peer review: not applicable / not stated"} · DOI: none recorded
      </p>
      <h3 className="serif text-lg leading-snug" lang={locale === "ja" ? "en" : undefined}>
        <Link href={`/${locale}/publications/${p.id}`} className="text-foreground">{p.title}</Link>
      </h3>
      {p.abstract && <p className="mt-1 max-w-[72ch] text-sm text-muted" lang={locale === "ja" ? "en" : undefined}>{p.abstract}</p>}
    </li>
  );
}

export function SourceNote({ ids, locale }: { ids: string[]; locale: Locale }) {
  return <SourceList ids={ids} locale={locale} />;
}
