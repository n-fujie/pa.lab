export type LabArea = "simulators" | "sensors" | "robotics" | "materials" | "experiments";

export const labAreas: { id: LabArea; title: string; titleJa: string }[] = [
  { id: "simulators", title: "Simulators", titleJa: "シミュレーター" },
  { id: "sensors", title: "Sensors", titleJa: "センサー" },
  { id: "robotics", title: "Robotics", titleJa: "ロボティクス" },
  { id: "materials", title: "Materials", titleJa: "材料" },
  { id: "experiments", title: "Experiments", titleJa: "実験記録" },
];

export type Deployment = {
  id: string;
  title: string;
  url: string | null;
  state: string;
  note: string;
  sources: string[];
};

/** Public entry points. The site links to the real systems; it does not imitate them. */
export const deployments: Deployment[] = [
  { id: "xzs-viewer", title: "P/A SYSTEM — Research Results", url: "https://xeno-ziran.platodesignlab.com/", state: "Live · read-only", note: "Presents machine-readable results of experiment runs. Nothing is simulated in the browser.", sources: ["ps-simulator", "dep-xzs"] },
  { id: "xzs-browser", title: "P/A SYSTEM — Browser Edition", url: "https://xeno-ziran.platodesignlab.com/app/", state: "Live · runs in browser (Pyodide)", note: "Separate deployment path from the read-only views and from the full simulator. Feature parity and data formats may differ.", sources: ["ps-simulator", "dep-xzs-app"] },
  { id: "xzs-local", title: "P/A SYSTEM — Interactive (local backend)", url: null, state: "Local backend required", note: "Configure, intervene, run, step, rewind, compare branches; network, shape-space, address-space, map, globe and timeline views. Not available on the public deployment.", sources: ["ps-simulator"] },
  { id: "xzs-ios", title: "P/A SYSTEM — iOS (listed on the App Store as XENO ZIRAN SIMULATOR)", url: "https://apps.apple.com/jp/app/xeno-ziran-simulator/id6819625252", state: "On the App Store (Japan) · iPhone / iPad · iOS 17+", note: "Runs the engine on the device (embedded CPython), with no server. Eight interactive views, Save / Load, CSV / JSON export; worlds are limited in size, and there are no research-result views or 3D Laboratory. The Research Results button opens the results site in the system browser. Version 1.0 is live; 1.0.1 is in review.", sources: ["ps-simulator"] },
  { id: "teoo", title: "BODY / TOTAL OBSERVATION — preview", url: "https://teoo-preview.vercel.app/", state: "Read-only synthetic preview (noindex)", note: "Listed as the homepage of the runtime repository. Only the page shell was inspected; its contents are not described here.", sources: ["dep-teoo", "gh-runtime"] },
  { id: "tii-archive", title: "TII Archive", url: "https://tiiarchive.vercel.app/", state: "Experimental · test identifiers only", note: "Production identifier issuance is disabled.", sources: ["dep-tii", "gh-tii"] },
];

/** Research-result views confirmed present in the public deployment. */
export const simulatorViews = [
  "Resolution Matrix",
  "Hidden Difference",
  "Scale Penetration",
  "Reasoning Structure Inspector",
  "Disconnection Study",
  "Long-Run Compression",
  "Runtime Reduction",
  "Reason Non-Redundancy",
  "Phase Timeline",
  "Primitive Inspector",
];

export type FeatureState = "implemented" | "not-confirmed";

/**
 * The directive's list of simulator functions, checked against the recovered sources.
 * "not-confirmed" means no recovered source names the function; it may or may not exist.
 */
export const directiveFeatures: { name: string; state: FeatureState; evidence: string | null }[] = [
  { name: "Operational Resolution Escalation", state: "implemented", evidence: "xzr run resolution-escalation" },
  { name: "Observation Relations", state: "not-confirmed", evidence: null },
  { name: "Operational-Shape Detection", state: "not-confirmed", evidence: null },
  { name: "Shape Transitions", state: "not-confirmed", evidence: null },
  { name: "Concept Intervention", state: "not-confirmed", evidence: null },
  { name: "Disconnection", state: "implemented", evidence: "Disconnection Study view; xzr study (disconnection)" },
  { name: "Cut and Reconfiguration", state: "implemented", evidence: "Runtime: differences “cut and reconfigure connections across a field of configurations”" },
  { name: "World-Responsive Revision", state: "not-confirmed", evidence: null },
  { name: "Cluster Formation", state: "implemented", evidence: "xzr study (clusters)" },
  { name: "Compression", state: "implemented", evidence: "Long-Run Compression view; xzr study (compression)" },
  { name: "Temporal Observation", state: "not-confirmed", evidence: null },
];

export const xzrCommands = [
  { cmd: "xzr run resolution-escalation", tests: "at which observation resolution (node → global) structural differences are systematic, as scale, topology, memory, coupling and horizon change" },
  { cmd: "xzr run history-reentry", tests: "whether removing, restoring or moving a region's retained history changes reachability, generation, discrimination, intervention response and later configuration — and whether restored history re-enters" },
  { cmd: "xzr run boundary-scale-window", tests: "whether a candidate distinction survives a closed boundary, another scale or another time window" },
  { cmd: "xzr run ablation", tests: "which runtime mechanisms change downstream behaviour when removed" },
  { cmd: "xzr compare A B · xzr export R", tests: "cell-by-cell change of detection status between runs · CSV export" },
];
