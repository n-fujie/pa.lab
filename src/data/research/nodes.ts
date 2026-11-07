import type { ResearchNode } from "@/types/research";

/**
 * Research programmes, systems and reference positions recovered from primary sources.
 * Summaries reproduce the author's published wording as closely as possible.
 * Directive-named topics with no recovered source are listed with `unrecovered: true`
 * and carry no summary of their content.
 */
export const nodes: ResearchNode[] = [
  // ── Programmes ────────────────────────────────────────────────
  {
    id: "osr",
    kind: "programme",
    title: "Operational-Shape Realism",
    subtitle: "Real Operations, Configurations, and Transitions",
    summary:
      "Investigates real differences and operations across heterogeneous configurations. An operational shape is a difference that has acquired a reproducible form: it can ignite under specifiable conditions, propagate, transform under interaction, and alter the conditions available for subsequent operations.",
    distinctions: [
      "Real operations must not be reduced to their conceptual identification, observation, description, or classification.",
      "The occurrence of a real operation is independent of whether it has been conceptualized, measured, or named.",
      "Inability to measure a difference is not evidence of its absence.",
      "Transitions, coupling, differentiation, retention, re-entry, branching, closure and related phenomena are not universally mandatory stages; their applicability must be independently established.",
    ],
    sections: ["foundations"],
    grounding: "verified",
    sources: ["ps-research", "ps-home"],
  },
  {
    id: "non-closure",
    kind: "programme",
    title: "Non-Closure Realism",
    subtitle: "Reality-as-a-Whole and the Limits of Any Configuration",
    summary:
      "Holds that reality-as-a-whole is not identical to any particular observational, conceptual, theoretical, mathematical, or operational configuration. No locally generated access configuration exhausts or closes reality-as-a-whole.",
    notClaimed: [
      "Not a claim that every scientific domain must remain indefinitely unresolved.",
      "Not a claim that all scientific knowledge is equally unreliable.",
      "Non-closure must not be turned into a universal explanation of every scientific failure.",
    ],
    distinctions: ["Epistemic incompleteness, apparatus limitations, and genuinely established real differences must be distinguished."],
    sections: ["foundations"],
    grounding: "verified",
    sources: ["ps-research"],
  },
  {
    id: "tosm",
    kind: "programme",
    title: "Transcendental Operational-Shape Metaphysics",
    subtitle: "Conditions of Possibility for Operational Shapes",
    summary:
      "Investigates the structural conditions under which any operational shape can possess determinacy, persistence, and the capacity to generate effects: minimal shape conditions, penetration dynamics, and the relation between shape persistence and configuration-dependent ignition.",
    notClaimed: ["Not a return to Kantian subjectivism; the transcendental conditions investigated are themselves operational and heterogeneous."],
    sections: ["foundations"],
    grounding: "verified",
    sources: ["ps-research"],
  },
  {
    id: "xenoscience",
    kind: "programme",
    title: "Xenoscience",
    subtitle: "Scientific Operations Under Heterogeneous Conditions",
    summary:
      "Investigates how operations subsequently identifiable as scientific emerge, transform, persist, and cease. Observability, measurement, variables, boundaries, state spaces, experimental conditions, and correction conditions may themselves undergo revision as part of a scientific investigation.",
    notClaimed: [
      "Xenoscience is not equivalent to AI automatically conducting human-designed experiments.",
      "It does not define science universally through self-revision.",
      "Strong Xenoscience remains a philosophical research possibility, not an experimentally realized state.",
      "Stellarization as a fully realized condition has not been experimentally achieved.",
    ],
    distinctions: ["Human conceptual mediation is neither universally indispensable nor necessarily obsolete."],
    status: "Theoretical programme",
    sections: ["xenoscience"],
    grounding: "verified",
    sources: ["ps-research", "ps-home"],
  },
  {
    id: "anescire",
    kind: "programme",
    title: "ANESCIRE",
    subtitle: "The Determinate Negation of Scientific Operational Shapes",
    summary:
      "A speculative operational-realist research programme concerned with the possibility that Hegelian philosophical operations, determinate-negational operational shapes, and the determinate negation of scientific operational shapes may transform the conditions under which subsequent configurations can be specified.",
    notClaimed: [
      "Does not claim that a post-scientific ontology has been experimentally proven.",
      "Does not claim that Hegelian operations exhaust the space of possible scientific transformations.",
      "Does not claim that the conditions of post-scientific operation can be derived from any current theoretical framework.",
    ],
    distinctions: ["Hegelian determinate negation is treated as a philosophical-operational form, not a metaphysical law of history."],
    status: "Speculative research programme",
    sections: ["xenoscience"],
    grounding: "verified",
    sources: ["ps-research", "ps-home"],
  },
  {
    id: "post-brassier",
    kind: "programme",
    title: "Post-Brassier / Post-Pittsburgh",
    subtitle: "Beyond the Space of Reasons",
    summary:
      "Engages the Pittsburgh tradition and investigates what remains unresolved within it. Distinguishes nonconceptual causal organization, representation, picturing, inferential constraints, conceptual justification, rational revision, and real effects.",
    notClaimed: ["Post-Brassier is not a declaration of superiority over Brassier. Brassier is not a simple conceptualist."],
    sections: ["philosophical-shapes", "foundations"],
    grounding: "verified",
    sources: ["ps-research", "ps-about"],
  },
  {
    id: "xenoantiphilosophy",
    kind: "programme",
    title: "Xenoantiphilosophy",
    subtitle: "Changing Conditions for Philosophical Operations",
    summary:
      "Investigates the conditions under which philosophical operations arise, persist, become unnecessary, or cease. Philosophy is not treated as necessarily preceding, governing, or legitimating scientific operations.",
    notClaimed: [
      "Not eliminativism about philosophy.",
      "Does not make the disappearance of philosophy a predetermined historical outcome.",
    ],
    sections: ["philosophical-shapes"],
    grounding: "verified",
    sources: ["ps-research"],
  },
  {
    id: "body-without-commands",
    kind: "programme",
    title: "The Body Without Commands",
    subtitle: "Embodiment and Related Investigations",
    summary:
      "An operational account of bodily organization and reconfiguration without treating the body as a fixed prior unit, a recipient of commands, or a natural kind with universal properties.",
    distinctions: ["Connected investigations are not subordinate to Xenoscience where no such theoretical dependency has been established."],
    sections: ["embodiment"],
    grounding: "verified",
    sources: ["ps-research", "ps-publications"],
  },
  {
    id: "xenobody",
    kind: "programme",
    title: "XenoBody / Xeno-Embodiment",
    subtitle: "Operational Body Research Beyond Command Models",
    summary:
      "Investigates bodily configurations that do not presuppose a commanding agent, a fixed physiological norm, or a pre-established relation between body and environment.",
    sections: ["embodiment"],
    grounding: "verified",
    sources: ["ps-research", "ps-home"],
  },
  {
    id: "nihilistic-operationalism",
    kind: "programme",
    title: "Nihilistic Operationalism",
    subtitle: "Nihilistic Laozian Embodied Autonomous Asketic Operation",
    summary:
      "Research into how activities, bodily capacities, classifications, and conditions of subsequent participation are formed, maintained, altered, or lost without a guaranteed affirmative successor.",
    distinctions: [
      "The disappearance or failure of an inherited justification does not guarantee either the termination of an operation or the emergence of a superior successor.",
    ],
    sections: ["embodiment", "foundations"],
    grounding: "verified",
    sources: ["ps-home"],
  },
  {
    id: "philosophical-ai",
    kind: "programme",
    title: "Philosophical AI",
    subtitle: "AI Systems as Philosophical Research Partners and Objects",
    summary:
      "Examines AI systems both as objects of philosophical investigation and as potential participants in philosophical research operations: conditions and limits of function, rationality, knowledge, concept formation, error correction, self-modification, operational identity, and phenomenal consciousness.",
    distinctions: [
      "Does not presuppose that AI systems are philosophical agents, nor that philosophical operations are closed to AI participation.",
      "Functional performance, normative justification, and phenomenal consciousness are kept distinct.",
    ],
    sections: ["intelligence"],
    grounding: "verified",
    sources: ["ps-research", "ps-home"],
  },
  {
    id: "ziran-system",
    kind: "programme",
    title: "Ziran System",
    subtitle: "Distributed Operational Research Architecture",
    summary:
      "A distributed research architecture for tracing how heterogeneous configurations generate, retain, transform, propagate, and reintroduce differences across time, scale, boundaries, and address domains. It conditionally fires, stops, disconnects, reconnects, and revises operative systems without requiring a unified theory of what exists.",
    distinctions: [
      "Components MO, DO, ZCA, and MS are treated as research constructs, not immutable ontological primitives. (Their expansions were not found in the recovered sources and are not given here.)",
      "Functional decomposition remains revisable.",
      "Proposed capabilities and fully implemented capabilities are distinct.",
    ],
    status: "Architectural and philosophical proposal; partially implemented",
    sections: ["ziran-system"],
    grounding: "verified",
    sources: ["ps-systems", "ps-home"],
  },
  // ── Concepts (verified, inside Xenoscience) ───────────────────
  {
    id: "hrgi",
    kind: "concept",
    title: "HRGI",
    subtitle: "Heterogeneous Real-Configuration Generative Interval",
    summary: "The temporal interval within which a scientific configuration retains the conditions for generating real detectable differences.",
    sections: ["xenoscience"],
    grounding: "verified",
    sources: ["ps-research"],
  },
  {
    id: "cicgi",
    kind: "concept",
    title: "CICGI",
    subtitle: "Civilizationally Inherited Cumulative Generative Interval",
    summary: "The accumulated span of prior scientific configurations whose operational shapes remain available for re-entry. Subordinate to HRGI.",
    sections: ["xenoscience", "civilization"],
    grounding: "verified",
    sources: ["ps-research"],
  },
  {
    id: "stellarization",
    kind: "concept",
    title: "Scientific stellarization",
    subtitle: "with semi-stellarization, stellarization index and rate",
    summary:
      "The process by which a scientific configuration achieves operational self-sufficiency across observation, correction, and energy-acquisition cycles without requiring continuous human authorization. Semi-stellarization denotes partial operational independence.",
    notClaimed: ["Stellarization concepts are theoretical instruments; stellarization as a fully realized condition has not been experimentally achieved."],
    sections: ["xenoscience"],
    grounding: "verified",
    sources: ["ps-research"],
  },
  {
    id: "xeno-14",
    kind: "concept",
    title: "Xeno-14",
    subtitle: "Fourteen bodily principles",
    summary:
      "Fourteen principles treated as starting hypotheses. Three — axis maintenance, lower-abdominal continuity, low-noise movement — are implemented as removable modules with ignition gates on a simulated planar embodiment.",
    notClaimed: [
      "The principles are not universal commands and have not been verified as independent control principles.",
      "The remaining eleven principles are not implemented. The names of all fourteen are recorded in the simulator source (src/domains/body.ts), which was not read during recovery.",
    ],
    sections: ["embodiment"],
    grounding: "verified",
    sources: ["gh-simulator"],
  },
  // ── Systems ───────────────────────────────────────────────────
  {
    id: "xz-simulator",
    kind: "system",
    title: "Ziran / Xeno Operational World Simulator",
    subtitle: "ziran-xeno-simulator · v0.4.0",
    summary:
      "An experimental framework for studying how operational differences ignite under configuration-dependent conditions, alter downstream reachability, penetrate across coupled configurations, and reorganize observation and description systems.",
    notClaimed: [
      "Not a completed implementation of the Ziran / Xeno framework, and not a proof of it.",
      "Not an empirically validated theory — the bundled worlds are synthetic.",
      "Not a claim of general superiority over existing modeling approaches.",
    ],
    status: "Open research prototype (MIT)",
    sections: ["ziran-system"],
    grounding: "verified",
    sources: ["gh-simulator", "gh-simulator-limits"],
  },
  {
    id: "xz-runtime",
    kind: "system",
    title: "P/A SYSTEM runtime (formerly XENO ZIRAN SIMULATOR)",
    subtitle: "xeno-ziran-runtime · xzr toolkit, web and iOS simulator",
    summary:
      "A simulation runtime in which differences ignite, propagate, are retained as memory, cut and reconfigure connections across a field of configurations — plus instruments to vary scale, topology, memory, coupling, horizon, boundary and observation resolution.",
    notClaimed: [
      "Not a validator of Operational-Shape Philosophy, Ziran, Xenoscience or any vocabulary.",
      "Results are not real-world forecasts or predictive claims.",
      "Not a source of proof by absence: not detected is not absent.",
    ],
    status: "Public deployment is a read-only research-result viewer",
    sections: ["ziran-system", "xenoscience"],
    grounding: "verified",
    sources: ["gh-runtime", "ps-simulator"],
  },
  {
    id: "tii",
    kind: "system",
    title: "TII — Transition-Ignition Identifier",
    aliases: ["遷移発火識別子"],
    summary:
      "A reference and audit infrastructure for recording how distinctions, relations, functions, and classifications become operative under specified conditions. Issuing a TII means only that tracking has started from a stated reference point.",
    notClaimed: ["TII is not permanent object numbering. Identifiers issued by the current implementation are provisional and non-authoritative (identifier_status: test)."],
    status: "Experimental specification 0.1.x",
    sections: ["ziran-system", "civilization"],
    grounding: "verified",
    sources: ["gh-tii", "ps-systems"],
  },
  {
    id: "xb-tro",
    kind: "system",
    title: "XB-TRO",
    subtitle: "XenoBody Transitional Re-entry Operations",
    summary:
      "A planar body simulator that generates experiment records for bodily operational transitions, askesis sequences, and boundary conditions. Research Beta; 15 experiment records generated; claim-evidence ledger maintained.",
    notClaimed: ["Not publicly deployed; operates on a local branch and is not included in the public P/A SYSTEM deployment."],
    status: "Research Beta · local only",
    sections: ["embodiment"],
    grounding: "verified",
    sources: ["ps-research", "ps-home"],
  },
  {
    id: "zoitpcs",
    kind: "system",
    title: "ZOITPCS",
    subtitle: "Ziran Observable-Intervenable Transparent Physical Computing Substrate",
    summary:
      "Develops design requirements for AI systems that remain intervenable and observable from within the Ziran System architecture, treating internal observability as a first-class architectural constraint.",
    status: "In development",
    sections: ["intelligence", "ziran-system"],
    grounding: "verified",
    sources: ["ps-research", "ps-home", "ps-publications"],
  },
  {
    id: "autonomous-rd",
    kind: "system",
    title: "Autonomous Research Systems",
    summary: "Autonomous R&D system executing hypothesis generation, experimental design, and result analysis.",
    status: "Phase 1–2 complete (208 tests). Phase 3 not started. Documented negative findings retained.",
    sections: ["intelligence", "xenoscience"],
    grounding: "verified",
    sources: ["ps-home"],
  },
  {
    id: "robotics",
    kind: "system",
    title: "P/A — Xenoantiphilosophical AI Robotics Project",
    subtitle: "Xenoscience & Posthuman Cybernetics",
    summary:
      "Listed on the personal site. An author-supplied design sheet (no. 23, “Monolithic Disconnection: Structural Separation and Functional Reconfiguration”) is shown on this page. No build, test, or experiment record for the project was recovered.",
    notClaimed: ["The design sheet is a design visual. It is not a photograph of a built prototype and not an experimental record; dimensions on it are design values."],
    status: "Design stage (no build record recovered)",
    sections: ["intelligence", "embodiment"],
    grounding: "title-only",
    sources: ["ps-home", "author-robotics-23"],
  },
  // ── Earlier research ──────────────────────────────────────────
  {
    id: "audit-philosophy",
    kind: "earlier",
    title: "Audit Philosophy and DDAT",
    subtitle: "Dialectical Direction Audit Theory",
    summary:
      "Earlier frameworks for examining whether institutional and technological systems generate openness to correction — or convert their outputs into self-enclosed justification. Preserved in the research archive; not the current primary orientation, but not disowned.",
    sections: ["civilization"],
    grounding: "verified",
    sources: ["ps-research"],
  },
  // ── External positions engaged ────────────────────────────────
  { id: "ext-aif", kind: "external", title: "Active Inference (Friston)", summary: "Engaged by Operational-Shape Realism and tested in a computational benchmark (EXP-001).", sections: ["foundations", "intelligence"], grounding: "verified", sources: ["ps-research", "ps-systems"] },
  { id: "ext-pittsburgh", kind: "external", title: "Pittsburgh tradition", subtitle: "Sellars, Brandom, Brassier, Wolfendale", summary: "Engaged by the Post-Brassier / Post-Pittsburgh trajectory.", sections: ["philosophical-shapes"], grounding: "verified", sources: ["ps-research"] },
  { id: "ext-roden", kind: "external", title: "Roden — speculative posthumanism", summary: "The conditions of post-human configurations are not in principle determinable in advance from the standpoint of the human. ANESCIRE accepts this as a structural constraint, not as a historical prediction.", sections: ["xenoscience"], grounding: "verified", sources: ["ps-research"] },
  { id: "ext-hegel", kind: "external", title: "Hegelian determinate negation", summary: "Treated by ANESCIRE as a philosophical-operational form, not a metaphysical law of history.", sections: ["xenoscience"], grounding: "verified", sources: ["ps-research"] },
  { id: "ext-simondon", kind: "external", title: "Simondon — individuation", summary: "Engaged by Operational-Shape Realism and by the Post-Brassier trajectory.", sections: ["foundations"], grounding: "verified", sources: ["ps-research"] },
  // ── Directive-named topics with no recovered source ──────────
  { id: "gaisho", kind: "programme", title: "Gaisho Operational Shapes", aliases: ["概象作動形状"], summary: "", sections: ["gaisho"], grounding: "not-recovered", sources: [], unrecovered: true },
  { id: "xenosnn", kind: "system", title: "XenoSNN", summary: "", sections: ["intelligence", "embodiment"], grounding: "not-recovered", sources: [], unrecovered: true },
  { id: "material-systems", kind: "programme", title: "Material Systems", subtitle: "Mechanical Liquids, Electrohydraulic Systems, Iontronics, Sensor Materials, Embodied Computation", summary: "", sections: ["material-systems"], grounding: "not-recovered", sources: [], unrecovered: true },
  { id: "civ-research", kind: "programme", title: "Social and Civilizational Research", subtitle: "AI-Scored Societies, XenoCapital, Address Domains, Civilizational Inheritance Intervals", summary: "", sections: ["civilization"], grounding: "not-recovered", sources: [], unrecovered: true },
];

export const nodeById = new Map(nodes.map((n) => [n.id, n]));
