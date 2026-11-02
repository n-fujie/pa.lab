import { sources } from "@/data/sources";
import { nodes } from "@/data/research/nodes";
import { sections } from "@/data/research/sections";
import { relations } from "@/data/relations/relations";
import { experiments } from "@/data/experiments/experiments";
import { publications } from "@/data/publications/publications";
import { history } from "@/data/research/history";
import { methods } from "@/data/research/methods";
import { visuals } from "@/data/visuals";

export type IntegrityIssue = { where: string; problem: string };

/**
 * Research-data integrity rules. These encode the directive's constraints as checks:
 * no uncited claims, no relation without a source, no fabricated DOIs, unrecovered topics
 * must carry no content, and negative findings must stay attached to their experiments.
 */
export function checkIntegrity(): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  const sourceIds = new Set(sources.map((s) => s.id));
  const nodeIds = new Set(nodes.map((n) => n.id));
  const sectionIds = new Set(sections.map((s) => s.id));
  const push = (where: string, problem: string) => issues.push({ where, problem });

  const unique = (label: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) push(label, `duplicate id ${id}`);
      seen.add(id);
    }
  };
  unique("sources", sources.map((s) => s.id));
  unique("nodes", nodes.map((n) => n.id));
  unique("relations", relations.map((r) => r.id));
  unique("experiments", experiments.map((e) => e.id));
  unique("publications", publications.map((p) => p.id));

  for (const s of sources) {
    if (s.kind !== "author-supplied" && !/^https:\/\//.test(s.url)) push(`source ${s.id}`, "url must be https");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.retrieved)) push(`source ${s.id}`, "retrieved must be an ISO date");
  }

  for (const n of nodes) {
    for (const sec of n.sections) if (!sectionIds.has(sec)) push(`node ${n.id}`, `unknown section ${sec}`);
    for (const src of n.sources) if (!sourceIds.has(src)) push(`node ${n.id}`, `unknown source ${src}`);
    if (n.unrecovered) {
      if (n.grounding !== "not-recovered") push(`node ${n.id}`, "unrecovered node must have grounding not-recovered");
      if (n.summary.trim() !== "") push(`node ${n.id}`, "unrecovered node must not carry a summary");
      if ((n.distinctions?.length ?? 0) > 0 || (n.notClaimed?.length ?? 0) > 0) push(`node ${n.id}`, "unrecovered node must not carry claims");
    } else {
      if (n.sources.length === 0) push(`node ${n.id}`, "recovered node needs at least one source");
      if (n.summary.trim() === "") push(`node ${n.id}`, "recovered node needs a summary");
    }
  }

  for (const r of relations) {
    if (!nodeIds.has(r.from)) push(`relation ${r.id}`, `unknown from ${r.from}`);
    if (!nodeIds.has(r.to)) push(`relation ${r.id}`, `unknown to ${r.to}`);
    if (r.from === r.to) push(`relation ${r.id}`, "self relation");
    if (r.sources.length === 0) push(`relation ${r.id}`, "relation needs a source");
    for (const src of r.sources) if (!sourceIds.has(src)) push(`relation ${r.id}`, `unknown source ${src}`);
    if (r.basis.trim().length < 10) push(`relation ${r.id}`, "relation needs a stated basis");
    const endpoints = [r.from, r.to].map((id) => nodes.find((n) => n.id === id));
    if (endpoints.some((n) => n?.unrecovered)) push(`relation ${r.id}`, "relations must not attach to unrecovered topics");
  }

  for (const e of experiments) {
    for (const src of e.evidenceReferences) if (!sourceIds.has(src)) push(`experiment ${e.id}`, `unknown source ${src}`);
    if (e.evidenceReferences.length === 0) push(`experiment ${e.id}`, "experiment needs evidence references");
    for (const n of e.relatedNodes) if (!nodeIds.has(n)) push(`experiment ${e.id}`, `unknown node ${n}`);
    if (["not-supported", "stop", "negative-engineering", "conditional"].includes(e.hypothesisOutcome) && e.negativeFindings.length === 0)
      push(`experiment ${e.id}`, "negative or conditional outcome must keep its negative findings");
    if (e.experimentalState === "not-conducted" && e.resultSummary) push(`experiment ${e.id}`, "unconducted experiment cannot have a result");
  }

  for (const p of publications) {
    for (const src of p.sources) if (!sourceIds.has(src)) push(`publication ${p.id}`, `unknown source ${src}`);
    for (const n of p.relatedProjects) if (!nodeIds.has(n)) push(`publication ${p.id}`, `unknown project ${n}`);
    if (p.doi !== null) push(`publication ${p.id}`, "no DOI has been verified for any publication");
    if (p.publicationDate && !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(p.publicationDate)) push(`publication ${p.id}`, "bad date");
    if (p.publicationType === "preprint" && p.peerReviewed !== false) push(`publication ${p.id}`, "preprints are listed as not peer reviewed");
  }

  for (const h of history) {
    for (const src of h.sources) if (!sourceIds.has(src)) push(`history ${h.id}`, `unknown source ${src}`);
    for (const n of h.relatedNodes) if (!nodeIds.has(n)) push(`history ${h.id}`, `unknown node ${n}`);
  }

  for (const m of methods) for (const src of m.sources) if (!sourceIds.has(src)) push(`method ${m.id}`, `unknown source ${src}`);

  for (const v of visuals) {
    if (!nodeIds.has(v.nodeId)) push(`visual ${v.id}`, `unknown node ${v.nodeId}`);
    if (v.sources.length === 0) push(`visual ${v.id}`, "visual needs a source");
    for (const src of v.sources) if (!sourceIds.has(src)) push(`visual ${v.id}`, `unknown source ${src}`);
    if (v.alt.trim().length < 20) push(`visual ${v.id}`, "visual needs descriptive alt text");
    if (v.disclosure.trim() === "") push(`visual ${v.id}`, "visual needs a disclosure of what it is");
  }

  return issues;
}
