export type ImplementationState = "not-started" | "prototype" | "implemented" | "tested" | "deprecated";

export type ExperimentalState = "not-conducted" | "planned" | "in-progress" | "completed" | "inconclusive";

export type ObservationState =
  | "observed"
  | "not-detected"
  | "not-measured"
  | "instrument-incompatible"
  | "scale-incompatible"
  | "window-incompatible"
  | "boundary-invisible"
  | "undetermined";

/** Outcome relative to the hypothesis under test. Kept separate from the observation state. */
export type HypothesisOutcome = "supported" | "not-supported" | "conditional" | "stop" | "negative-engineering" | "none-stated";

export type ExperimentalResult = {
  id: string;
  title: string;
  protocolId: string | null;
  implementationState: ImplementationState;
  experimentalState: ExperimentalState;
  observationState: ObservationState;
  hypothesisOutcome: HypothesisOutcome;
  /** The question as recorded in the source. */
  question: string | null;
  configuration: string | null;
  resultSummary: string | null;
  /** Numeric findings as reported; never recomputed by the site. */
  reportedStatistics: string[];
  negativeFindings: string[];
  notClaimed: string[];
  limitations: string[];
  dates: { label: string; value: string }[];
  evidenceReferences: string[]; // Source ids
  repositoryUrl: string | null;
  reproductionInstructions: string | null;
  relatedNodes: string[];
  publiclyDeployed: boolean;
};
