/**
 * Visual materials, each classified by what it is (directive §V priority list).
 * A design visual is never presented as an experimental record or a built device.
 */
export type VisualKind = "apparatus-photo" | "simulator-screen" | "result-figure" | "technical-drawing" | "design-visual" | "artwork";

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
  "design-visual": "Design visual — not a built device, not an experimental record",
  artwork: "Artwork",
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
];
