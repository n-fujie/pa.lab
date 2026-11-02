export type Method = {
  id: string;
  title: string;
  statement: string;
  items?: string[];
  sources: string[];
};

/** Methodological principles stated by the author or implemented in the published software. */
export const methods: Method[] = [
  {
    id: "non-closure-constraint",
    title: "Non-Closure Constraint — absence of detection vs absence of difference",
    statement: "Failure to observe a difference must not automatically be interpreted as the absence of that difference. This applies to both theoretical descriptions and experimental interpretation. The following are held distinct:",
    items: [
      "No difference detected",
      "Difference not measured",
      "Instrument incompatibility",
      "Scale incompatibility",
      "Temporal-window incompatibility",
      "Boundary-induced invisibility",
      "Evidence supporting the absence of a specified difference",
    ],
    sources: ["ps-systems", "gh-simulator"],
  },
  {
    id: "configuration-dependent-ignition",
    title: "Configuration-dependent ignition",
    statement: "Every claimed ignition condition must specify the relevant configuration. It does not require that every parameter be known before research begins; it requires that ignition conditions not be described as if independent of all conditions. Relevant parameters where applicable:",
    items: ["Target configuration", "Observational apparatus", "Boundary and scale", "Temporal interval", "Connections and resources", "Institutional conditions", "External memory", "Feedback mechanisms"],
    sources: ["ps-systems"],
  },
  {
    id: "real-effects",
    title: "Real effects",
    statement: "A real effect is an actual change in a specified target configuration. A recorded event does not automatically establish that the relevant configuration has changed. Claiming a real effect requires specifying the target configuration and evidence of change within it.",
    sources: ["ps-systems"],
  },
  {
    id: "cross-domain",
    title: "Cross-domain propagation",
    statement: "Cross-domain propagation must not be inferred merely because a local operation succeeded. Specifying propagation requires the transmission pathway, the receiving configuration, the temporal interval, and the conditions of propagation.",
    sources: ["ps-systems"],
  },
  {
    id: "historical-reentry",
    title: "Historical re-entry",
    statement: "The reuse of a retained prior operational state in a subsequent operation. Institutional authorization, credit scoring and human recognition are not universal prerequisites. Five phases are distinguished:",
    items: ["Generation of a difference", "Retention of that difference", "Subsequent operational reuse", "Changes resulting from reuse", "Propagation into other domains"],
    sources: ["ps-systems"],
  },
  {
    id: "four-levels",
    title: "Theory–implementation correspondence (four levels)",
    statement: "The simulator does not exhaustively implement the Ziran System. Each operation is placed at one of four levels:",
    items: ["01 Theoretical operation", "02 Implemented operation", "03 Computational approximation", "04 Unimplemented research direction"],
    sources: ["ps-simulator"],
  },
  {
    id: "claim-status",
    title: "Claim status of results",
    statement: "Everything the simulator reports carries a claim status. No result in the current release is an empirically supported generalization; promotion of synthetic evidence to empirical status is refused by the software.",
    items: ["Implementation property", "Synthetic-world result", "Model-class discrimination", "Reconstruction inference", "Replayed empirical result", "Empirical observation", "Empirically supported generalization", "Unresolved"],
    sources: ["gh-simulator", "gh-simulator-limits"],
  },
  {
    id: "abcd",
    title: "A / B / C / D — revisable analytical distinctions",
    statement: "A/B/C/D are not ontological strata. A higher letter does not mean deeper reality, a superior explanation, or a more advanced intelligence.",
    items: ["A · operation within a configuration", "B · configuration reorganization", "C · description-space transformation", "D · meta-configuration transformation"],
    sources: ["gh-simulator"],
  },
  {
    id: "stopping-principle",
    title: "Stopping principle",
    statement: "A fixed condition is not automatically a theoretical defect. It becomes a new experimental object only when changing it produces a non-redundant difference in observation, intervention, reachability, real effect, penetration, feedback, reorganization, or the interpretation of the result.",
    sources: ["gh-simulator"],
  },
  {
    id: "preregistration",
    title: "Pre-registration and exploratory/confirmatory separation",
    statement: "In EXP-001 the exploratory stage was frozen as exploratory evidence; the confirmatory stage ran on fresh disjoint seeds with pre-registration and analysis rules frozen before execution. Confirmatory results are authoritative.",
    sources: ["ps-systems", "gh-runtime"],
  },
  {
    id: "negative-findings",
    title: "Negative findings and criticism",
    statement: "Negative and conditional results are reported as such. Criticism, counterarguments, and corrections are welcome, including those concerning earlier versions of the research; critics are asked to specify the publication, version or date, and claim.",
    sources: ["gh-simulator", "ps-home"],
  },
];

/** Methods topics named in the directive with no recovered statement. Shown as open, not as procedures. */
export const unrecoveredMethodTopics = ["Operational Verification", "Scientific Reachability", "Instrument Revision", "Theory Revision", "Research Inheritance"];
