import type { Publication } from "@/types/publication";

const author = ["Naoto Fujie"];

/**
 * Publications as listed on the author's publications page (retrieved 2026-11-02).
 * Only the year is stated there. No DOI is recorded for any item.
 * "None of the items listed have been peer-reviewed or formally published in a journal or press volume unless otherwise stated."
 */
const preprint = (
  id: string,
  title: string,
  url: string,
  abstract: string | null,
  relatedProjects: string[],
  representative = false,
): Publication => ({
  id,
  title,
  authors: author,
  publicationDate: "2026",
  publicationType: "preprint",
  venue: "PhilPapers (preprint)",
  peerReviewed: false,
  abstract,
  abstractSource: abstract ? "author-listing" : null,
  doi: null,
  canonicalUrl: url,
  version: null,
  correctionStatus: null,
  representative,
  relatedProjects,
  sources: ["ps-publications"],
});

const book = (id: string, title: string, url: string, relatedProjects: string[]): Publication => ({
  id,
  title,
  authors: author,
  publicationDate: "2026",
  publicationType: "book",
  venue: "Amazon KDP",
  peerReviewed: null,
  abstract: null,
  abstractSource: null,
  doi: null,
  canonicalUrl: url,
  version: null,
  correctionStatus: null,
  representative: false,
  relatedProjects,
  sources: ["ps-publications", "ps-home"],
});

export const publications: Publication[] = [
  preprint("operational-shape-philosophy", "Operational-Shape Philosophy", "https://philpapers.org/rec/FUJOPD",
    "A general framework for being, concepts, reasons, science, humans, and reality as a whole. Introduces the category-non-prior approach to ontology and philosophy of science.", ["osr"], true),
  preprint("ziran-system-distributed-architecture", "Ziran System: A Distributed Architecture for Operational Observation, Re-Entry, and Reconfiguration", "https://philpapers.org/rec/FUJZSA",
    "A distributed architecture for operational observation, history re-entry, intervention, feedback, and reconfiguration. Does not unify domains under a single theory of what exists.", ["ziran-system"], true),
  preprint("xenoscience", "Xenoscience", "https://philpapers.org/rec/FUJXXX",
    "Scientific operation beyond the necessity of inherited human variables, observers, conceptual conditions, and fixed conditions of observability. Develops protocols for activating and suspending analytical categories.", ["xenoscience"], true),
  preprint("the-body-without-commands", "The Body Without Commands", "https://philpapers.org/rec/NAOTBW",
    "An operational account of bodily organization and reconfiguration without treating the body as a fixed prior unit or a recipient of commands.", ["body-without-commands"], true),
  preprint("debugging-philosophy", "Debugging Philosophy: From Conceptual Operations to Physical Consequences and Recursive Revision", "https://philpapers.org/rec/FUJDPF",
    "Treats philosophy as a set of operations with physical, institutional, and temporal consequences. Investigates when a concept fires, what it blocks or enables, and how the sequence of operations alters what remains possible.", [], true),
  preprint("ziran-system-addressable-reality", "The Ziran System: Toward an Addressable Reality. A Research Architecture for Unknown Configurations Without a Final Observer", "https://philpapers.org/rec/FUJTZS", null, ["ziran-system"]),
  preprint("ziran-life-detection-audit", "Before Judging an Unknown Configuration as Life, Must the Category of Life Be Activated at All? A Ziran System Audit of NASA's Life-Detection Framework", "https://philpapers.org/rec/FUJBJA", null, ["ziran-system", "xenoscience"]),
  preprint("nihilism-as-operation", "Nihilism as Operation in the Ziran System: Withdrawal, Local Disconnection, and the Regeneration of Transition Conditions", "https://philpapers.org/rec/FUJNAO", null, ["nihilistic-operationalism", "ziran-system"]),
  preprint("zoitpcs", "Ziran Observable-Intervenable Transparent Physical Computing Substrate: Making Internal Observability a First-Class Design Requirement for AI", "https://philpapers.org/rec/FUJZOT", null, ["zoitpcs", "philosophical-ai"]),
  book("operational-nihilism", "OPERATIONAL NIHILISM", "https://amzn.eu/d/08W4W72H", []),
  book("the-work-that-remains", "The Work That Remains", "https://amzn.eu/d/0iCthJqY", []),
  book("dictionary-of-operational-philosophy", "P/A — THE DICTIONARY OF OPERATIONAL PHILOSOPHY", "https://amzn.eu/d/01SMS6W7", []),
  book("xenoantiphilosophy-book", "Xenoantiphilosophy. The Emergence, Persistence, and Withdrawal of Philosophical Operations", "https://amzn.eu/d/0hUTiCiT", ["xenoantiphilosophy"]),
  book("xenoscience-monograph", "Xenoscience: Research Monograph · Cumulative Representative Revision", "https://amzn.eu/d/02lquegQ", ["xenoscience"]),
  book("the-child-born", "The Child Born When Humanity Became Unnecessary", "https://amzn.eu/d/038PcVpS", []),
];

export const publicationById = new Map(publications.map((p) => [p.id, p]));
