export type HistoryEventKind = "release" | "experiment" | "publication" | "submission" | "infrastructure" | "revision";

export type HistoryEvent = {
  id: string;
  date: string; // ISO date or date range as recorded
  kind: HistoryEventKind;
  title: string;
  detail: string;
  sources: string[];
  relatedNodes: string[];
};

/** Only events with a date stated in a recovered source. Sorted newest first by the page. */
export const history: HistoryEvent[] = [
  { id: "h-sim-010", date: "2026-09-27", kind: "release", title: "Ziran / Xeno Operational World Simulator v0.1.0 (internal)", detail: "Internal version.", sources: ["gh-simulator"], relatedNodes: ["xz-simulator"] },
  { id: "h-sim-020", date: "2026-09-28", kind: "release", title: "Simulator v0.2.0 (internal)", detail: "Internal version.", sources: ["gh-simulator"], relatedNodes: ["xz-simulator"] },
  { id: "h-sim-030", date: "2026-09-28", kind: "release", title: "Simulator v0.3.0 — first public release", detail: "Open research prototype.", sources: ["gh-simulator"], relatedNodes: ["xz-simulator"] },
  { id: "h-sim-040", date: "2026-09-29", kind: "release", title: "Simulator v0.4.0 — research modules", detail: "Release candidate; not yet tagged. Adds external framework comparison, Xeno-14 pilot integration (X14-1 STOP, X14-1b CONDITIONAL GO) and the Active Inference module (Milestone 1 negative engineering result). Core engine unchanged from 0.3.0.", sources: ["gh-simulator"], relatedNodes: ["xz-simulator", "xeno-14"] },
  { id: "h-exp001-run", date: "2026-10-07/2026-10-08", kind: "experiment", title: "EXP-001 confirmatory run", detail: "Pre-registered confirmatory stage: 30 fresh seeds, 55,680 runs, 842 min on Apple M1.", sources: ["ps-systems"], relatedNodes: ["xz-runtime"] },
  { id: "h-exp001-pub", date: "2026-10-09", kind: "publication", title: "EXP-001 published · Runtime v0.2.0", detail: "Central hypothesis not supported; results reported with explicit non-claims.", sources: ["ps-systems"], relatedNodes: ["xz-runtime", "ext-aif"] },
  { id: "h-ios", date: "2026-10-09", kind: "submission", title: "iOS application submitted for App Store review", detail: "v1.0 · Build 3. The App Store URL will be added only when the listing is verified as publicly available.", sources: ["ps-simulator"], relatedNodes: ["xz-runtime"] },
  { id: "h-site", date: "2026-11-02", kind: "infrastructure", title: "P/A Institute site — recovery and first build", detail: "Public sources recovered; unrecovered directive topics recorded as such. P/A Archive held 0 public records at retrieval.", sources: ["archive-api"], relatedNodes: [] },
];
