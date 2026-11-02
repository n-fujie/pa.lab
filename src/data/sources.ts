import type { Source } from "@/types/research";

const R = "2026-11-02";

/** Every source read during Phase 0 recovery. Nothing is cited that is not listed here. */
export const sources: Source[] = [
  { id: "ps-home", kind: "personal-site", title: "platodesignlab.com — home", url: "https://www.platodesignlab.com/", retrieved: R, scope: "Full page text" },
  { id: "ps-research", kind: "personal-site", title: "platodesignlab.com — Research Programme", url: "https://www.platodesignlab.com/research", retrieved: R, scope: "Full page text" },
  { id: "ps-systems", kind: "personal-site", title: "platodesignlab.com — Systems", url: "https://www.platodesignlab.com/systems", retrieved: R, scope: "Full page text" },
  { id: "ps-simulator", kind: "personal-site", title: "platodesignlab.com — Simulator", url: "https://www.platodesignlab.com/simulator", retrieved: R, scope: "Full page text" },
  { id: "ps-publications", kind: "personal-site", title: "platodesignlab.com — Publications", url: "https://www.platodesignlab.com/publications", retrieved: R, scope: "Full page text and outbound links" },
  { id: "ps-about", kind: "personal-site", title: "platodesignlab.com — About", url: "https://www.platodesignlab.com/about", retrieved: R, scope: "Full page text" },
  { id: "gh-simulator", kind: "repository", title: "n-fujie/ziran-xeno-simulator — README (v0.4.0)", url: "https://github.com/n-fujie/ziran-xeno-simulator", retrieved: R, scope: "README sections 1–4, CHANGELOG headings" },
  { id: "gh-simulator-limits", kind: "repository-doc", title: "n-fujie/ziran-xeno-simulator — LIMITATIONS.md", url: "https://github.com/n-fujie/ziran-xeno-simulator/blob/main/LIMITATIONS.md", retrieved: R, scope: "Evidence, Models, Meta-boundedness sections" },
  { id: "gh-runtime", kind: "repository", title: "n-fujie/xeno-ziran-runtime — README", url: "https://github.com/n-fujie/xeno-ziran-runtime", retrieved: R, scope: "README through the Post-Active-Inference benchmark section, CHANGELOG headings" },
  { id: "gh-tii", kind: "repository", title: "n-fujie/TII — README", url: "https://github.com/n-fujie/TII", retrieved: R, scope: "README introduction, public interface, architecture" },
  { id: "archive-api", kind: "archive-api", title: "P/A Archive — /api/records", url: "https://archive.platodesignlab.com/api/records", retrieved: R, scope: "Public JSON listing (0 records at retrieval)" },
  { id: "archive-home", kind: "deployment", title: "P/A Archive — home and identifier policy", url: "https://archive.platodesignlab.com/", retrieved: R, scope: "Home page text" },
  { id: "dep-xzs", kind: "deployment", title: "Xeno Ziran Simulator — public research-result viewer", url: "https://xeno-ziran.platodesignlab.com/", retrieved: R, scope: "HTTP reachability only (200)" },
  { id: "dep-xzs-app", kind: "deployment", title: "Xeno Ziran Simulator — Browser Edition", url: "https://xeno-ziran.platodesignlab.com/app/", retrieved: R, scope: "HTTP reachability only (200)" },
  { id: "dep-teoo", kind: "deployment", title: "BODY / TOTAL OBSERVATION — read-only synthetic preview", url: "https://teoo-preview.vercel.app/", retrieved: R, scope: "HTML shell and title only" },
  { id: "dep-tii", kind: "deployment", title: "TII Archive", url: "https://tiiarchive.vercel.app/", retrieved: R, scope: "HTTP reachability only (200)" },
  { id: "pp-profile", kind: "philpapers", title: "PhilPapers — author profile", url: "https://philpapers.org/profile/240588", retrieved: R, scope: "Linked from personal site; not read" },
];

export const sourceById = new Map(sources.map((s) => [s.id, s]));
