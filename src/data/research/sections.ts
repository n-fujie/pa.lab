import type { ResearchSection } from "@/types/research";

/**
 * Website sections. These are navigation groupings for the site, not a disciplinary
 * classification of the research and not stages of a developmental sequence.
 * The author states that the programmes are "distinct but interacting" and "not interchangeable".
 */
export const sections: ResearchSection[] = [
  {
    id: "foundations",
    title: "Foundations",
    titleJa: "基礎",
    editorialNote: "Ontological and metaphysical programmes on which other work states a dependency, plus external positions they engage.",
    directiveTopics: ["Operational-Shape Realism"],
  },
  {
    id: "gaisho",
    title: "Gaisho Operational Shapes",
    titleJa: "概象作動形状",
    editorialNote: "Named in the site directive as a central research problem. No public source describing it was recovered.",
    directiveTopics: ["Gaisho", "Gaisho firing rate / coupling rate / nuance / temporal transformation"],
  },
  {
    id: "philosophical-shapes",
    title: "Philosophical Operational Shapes",
    titleJa: "哲学的作動形状",
    editorialNote:
      "The directive names philosophical operational shapes as an independent object. The programmes listed here are the recovered programmes that investigate philosophical operations; grouping them under this heading is an editorial choice of the site.",
    directiveTopics: ["Philosophical Operational Shapes"],
  },
  {
    id: "xenoscience",
    title: "Xenoscience",
    titleJa: "Xenoscience",
    editorialNote: "Xenoscience, its research concepts, and ANESCIRE. The directive's “5S conditions” were not found in the recovered sources and are not described.",
    directiveTopics: ["Xenoscience", "5S conditions", "Scientific reachability"],
  },
  {
    id: "ziran-system",
    title: "Ziran System",
    titleJa: "Ziran System",
    editorialNote: "The Ziran System architecture and its computational implementations.",
    directiveTopics: ["Ziran System", "MO / DO / ZCA / MS"],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    titleJa: "知性",
    editorialNote: "Philosophical AI and AI-related systems.",
    directiveTopics: ["XenoSNN"],
  },
  {
    id: "embodiment",
    title: "Embodiment",
    titleJa: "身体",
    editorialNote: "Body research, its simulators and embodied experiments.",
    directiveTopics: ["XenoBody", "XENO-14", "Xeno-Askesis", "Operational Nihilism", "XenoSNN and sensor–body systems"],
  },
  {
    id: "material-systems",
    title: "Material Systems",
    titleJa: "物質システム",
    editorialNote: "Named in the site directive. No public source describing material experiments was recovered.",
    directiveTopics: ["Mechanical Liquids", "Electrohydraulic Systems", "Iontronics", "Sensor Materials", "Embodied Computation"],
  },
  {
    id: "civilization",
    title: "Civilization",
    titleJa: "文明",
    editorialNote:
      "Social and civilizational research named in the directive was not recovered. Listed here are recovered items that concern inheritance or institutions; whether they correspond to the directive's topics is not established.",
    directiveTopics: ["AI-Scored Societies", "XenoCapital", "Address Domains", "Civilizational Inheritance Intervals"],
  },
];

export const sectionById = new Map(sections.map((s) => [s.id, s]));
