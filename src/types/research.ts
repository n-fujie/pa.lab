/**
 * Source references. Every published statement on the site points to at least one
 * source that was actually read during recovery. `retrieved` is the date the source
 * was read, not the date the source was written.
 */
export type SourceKind =
  | "personal-site"
  | "repository"
  | "repository-doc"
  | "philpapers"
  | "archive-api"
  | "deployment"
  | "bookstore"
  | "author-supplied";

export type Source = {
  id: string;
  kind: SourceKind;
  title: string;
  /** Empty for material handed over directly by the author. */
  url: string;
  retrieved: string; // ISO date
  /** What exactly was read: whole page, README, title only, etc. */
  scope: string;
};

/**
 * How strongly the site's text is grounded.
 * - verified: wording taken from a recovered primary source.
 * - title-only: only the title / listing of the source was read, not its body.
 * - editorial: a grouping or heading made for this website; not a research claim.
 * - not-recovered: the topic is named in the site directive but no source was found.
 */
export type GroundingState = "verified" | "title-only" | "editorial" | "not-recovered";

export type ResearchSectionId =
  | "foundations"
  | "gaisho"
  | "philosophical-shapes"
  | "xenoscience"
  | "ziran-system"
  | "intelligence"
  | "embodiment"
  | "material-systems"
  | "civilization";

export type NodeKind = "programme" | "system" | "concept" | "experiment" | "external" | "earlier";

export type ResearchNode = {
  id: string;
  kind: NodeKind;
  title: string;
  subtitle?: string;
  /** Alternate names recorded in sources (e.g. Japanese names published by the author). */
  aliases?: string[];
  /** Short description quoted or closely paraphrased from a source. */
  summary: string;
  /** Explicit negative scope ("does not claim …") recorded in sources. */
  notClaimed?: string[];
  /** Distinctions the source insists on keeping. */
  distinctions?: string[];
  status?: string;
  sections: ResearchSectionId[];
  grounding: GroundingState;
  sources: string[];
  /** Directive-named topic whose source could not be recovered. */
  unrecovered?: boolean;
};

export type ResearchRelationType =
  | "theoretical-dependency"
  | "conceptual-distinction"
  | "critical-comparison"
  | "incompatibility"
  | "experimental-constraint"
  | "material-implementation"
  | "observational-dependency"
  | "historical-inheritance"
  | "operational-coupling"
  | "unresolved-connection";

/**
 * established: the source states the relation.
 * hypothesis: the source frames the relation as open / speculative.
 * site-inferred: proposed while building this site from shared terminology; NOT confirmed by the author.
 */
export type RelationEvidenceState = "established" | "hypothesis" | "site-inferred";

export type ResearchRelation = {
  id: string;
  type: ResearchRelationType;
  from: string;
  to: string;
  directed: boolean;
  evidence: RelationEvidenceState;
  /** Wording from the source that grounds the relation. */
  basis: string;
  sources: string[];
};

export type ResearchSection = {
  id: ResearchSectionId;
  title: string;
  titleJa: string;
  /** Why this section exists on the website. Editorial, never a research claim. */
  editorialNote: string;
  /** Topics the site directive names for this section. */
  directiveTopics: string[];
};
