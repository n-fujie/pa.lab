import { nodes, nodeById } from "@/data/research/nodes";
import { relations } from "@/data/relations/relations";
import { experiments } from "@/data/experiments/experiments";
import { publications } from "@/data/publications/publications";
import type { ResearchSectionId, ResearchNode, ResearchRelationType } from "@/types/research";

/** Nodes that get a project page: everything recovered except external positions. */
export const projectNodes = nodes.filter((n) => n.kind !== "external");

export function nodesInSection(id: ResearchSectionId): ResearchNode[] {
  return nodes.filter((n) => n.sections.includes(id));
}

export function relationsFor(nodeId: string) {
  return relations
    .filter((r) => r.from === nodeId || r.to === nodeId)
    .map((r) => ({ relation: r, other: nodeById.get(r.from === nodeId ? r.to : r.from)!, outgoing: r.from === nodeId }));
}

export function experimentsFor(nodeId: string) {
  return experiments.filter((e) => e.relatedNodes.includes(nodeId));
}

export function publicationsFor(nodeId: string) {
  return publications.filter((p) => p.relatedProjects.includes(nodeId));
}

export const relationTypeLabel: Record<ResearchRelationType, string> = {
  "theoretical-dependency": "Theoretical dependency",
  "conceptual-distinction": "Conceptual distinction",
  "critical-comparison": "Critical comparison",
  incompatibility: "Incompatibility",
  "experimental-constraint": "Experimental constraint",
  "material-implementation": "Implementation",
  "observational-dependency": "Observational dependency",
  "historical-inheritance": "Historical inheritance",
  "operational-coupling": "Operational coupling",
  "unresolved-connection": "Unresolved connection",
};

export const nodeKindLabel: Record<ResearchNode["kind"], string> = {
  programme: "Programme",
  system: "System",
  concept: "Concept",
  experiment: "Experiment",
  external: "External position",
  earlier: "Earlier research",
};
