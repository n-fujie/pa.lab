/**
 * Visual materials, each classified by what it is (directive §V priority list).
 * A design visual is never presented as an experimental record or a built device.
 */
export type VisualKind = "apparatus-photo" | "simulator-screen" | "result-figure" | "technical-drawing" | "interface-visual" | "design-visual" | "artwork";

export type Visual = {
  id: string;
  nodeId: string;
  src: string;
  width: number;
  height: number;
  kind: VisualKind;
  title: string;
  alt: string;
  disclosure: string;
  sources: string[];
};

export const visualKindLabel: Record<VisualKind, string> = {
  "apparatus-photo": "Photograph of research apparatus",
  "simulator-screen": "Simulator screen",
  "result-figure": "Figure from experimental results",
  "technical-drawing": "Technical drawing of an implementation",
  "interface-visual": "Interface visual — not verified as a capture of the published simulator",
  "design-visual": "Design visual — not a built device, not an experimental record",
  artwork: "Artwork — not a photograph of P/A facilities or devices",
};

export const visuals: Visual[] = [
  {
    id: "robotics-23",
    nodeId: "robotics",
    src: "/images/robotics-23-monolithic-disconnection.jpg",
    width: 1536,
    height: 1024,
    kind: "design-visual",
    title: "23 | Monolithic Disconnection — Structural Separation and Functional Reconfiguration",
    alt: "Design sheet for a segmented robotic structure: a rendered view on the left; on the right an annotated configuration drawing (upper segment, lower segment, separation mechanism, internal core), a four-step disconnection sequence (locked, unlocking, separation, independent operation), detail drawings of a separation rail, interface module and structural panel, and three example reconfiguration modes (observation, sample processing, resource exchange).",
    disclosure: "Author-supplied design visual. Dimensions shown (e.g. 3200 × 2840 mm) are design values. No fabricated device, test, or measurement is implied.",
    sources: ["author-robotics-23"],
  },
  {
    id: "sim-interface-r77",
    nodeId: "xz-runtime",
    src: "/images/simulator-interface-r77.jpg",
    width: 1600,
    height: 1200,
    kind: "interface-visual",
    title: "XENO ZIRAN SIMULATOR — overview interface (XenoBody B3, R77)",
    alt: "Dark simulator dashboard titled XENO ZIRAN SIMULATOR: a 3D monochrome simulation view of a domed habitat, towers and a transport ring with labelled regions; side panels for experiment configuration, observability and playback; a coverage bar chart, a horizon line chart, a three-panel baseline / intervention / recovered comparison, and an event log.",
    disclosure: "Author-supplied image. Whether it is a capture of a released build has not been verified; the figures shown in it are not reported on this site as experimental results.",
    sources: ["author-visuals-batch-2"],
  },
  {
    id: "sim-high-fidelity-m8",
    nodeId: "xz-runtime",
    src: "/images/simulator-high-fidelity-m8.jpg",
    width: 1600,
    height: 900,
    kind: "interface-visual",
    title: "High-fidelity (M8) laboratory view on a workstation",
    alt: "A desktop monitor in a dark room showing a circular walled laboratory model with chambers and a dense web of connections, next to a control panel with quality, layer and camera settings and a table of what exists, is observed, accessible, selected and executed for systems A local, B distributed and C history.",
    disclosure: "Author-supplied image. The on-screen panel itself states a recorded runtime execution, simulation-internal, “not a physical laboratory; not evidence of autonomous science.” Not verified as a capture of a released build.",
    sources: ["author-visuals-batch-2"],
  },
  {
    id: "robotics-xb-08",
    nodeId: "robotics",
    src: "/images/robotics-xb-08-material-reconfiguration.jpg",
    width: 1600,
    height: 1066,
    kind: "design-visual",
    title: "P/A-XB-08 — Autonomous Material Reconfiguration Unit (Phase 08)",
    alt: "Three-panel sheet: left, a dark image of translucent soft modules on a metal rig labelled Prototype Experiment; centre, a technical design sheet v0.1 with module configuration, soft material structure, docking mechanism, internal configuration, module variations, assembly patterns and fluid / cable routing; right, monitors with simulation, joint torque, fluid pressure and sensor output plots and a reconfiguration sequence.",
    disclosure: "Author-supplied design visual. The sheet carries the labels “Prototype Experiment” and “Technical Design v0.1”, but no build, test or measurement record for XB-08 was recovered; the plots in it are not reported here as results.",
    sources: ["author-visuals-batch-2"],
  },
  {
    id: "robotics-field-figure",
    nodeId: "robotics",
    src: "/images/robotics-field-figure.jpg",
    width: 1600,
    height: 1066,
    kind: "artwork",
    title: "Quadruped figure in a flooded concrete field",
    alt: "Monochrome image of a translucent, cable-wrapped four-legged machine with black joint modules, dripping water as it steps across wet ground in front of fog-bound concrete blocks.",
    disclosure: "Author-supplied atmospheric image for the robotics project. Not a photograph of a built device or a field test.",
    sources: ["author-visuals-batch-2"],
  },
  {
    id: "robotics-workbench",
    nodeId: "robotics",
    src: "/images/robotics-workbench-collage.jpg",
    width: 1600,
    height: 1066,
    kind: "artwork",
    title: "Drawings, simulation and workbench — collage",
    alt: "Three-part collage: hand-drawn leg mechanism drawings on paper among machined parts; a person at several monitors showing a legged robot model and plots; a jointed robotic limb assembly wired up on a workbench with test equipment.",
    disclosure: "Author-supplied illustrative collage. It does not document P/A facilities, staff or a built prototype; no such record was recovered.",
    sources: ["author-visuals-batch-2"],
  },
];
