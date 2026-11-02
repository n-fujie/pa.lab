import { describe, expect, it } from "vitest";
import { checkIntegrity } from "@/lib/validation/integrity";
import { nodes, nodeById } from "@/data/research/nodes";
import { relations } from "@/data/relations/relations";
import { experiments } from "@/data/experiments/experiments";
import { publications } from "@/data/publications/publications";
import { forceLayout } from "@/lib/research/layout";
import { parseArchiveListing } from "@/lib/archive/client";

describe("research data integrity", () => {
  it("has no integrity issues", () => {
    expect(checkIntegrity()).toEqual([]);
  });

  it("publishes no content for unrecovered directive topics", () => {
    for (const id of ["gaisho", "xenosnn", "material-systems", "civ-research"]) {
      const n = nodeById.get(id)!;
      expect(n.unrecovered).toBe(true);
      expect(n.summary).toBe("");
      expect(relations.some((r) => r.from === id || r.to === id)).toBe(false);
    }
  });

  it("keeps the negative results of EXP-001 and Xeno-14", () => {
    const exp = experiments.find((e) => e.id === "exp-001")!;
    expect(exp.hypothesisOutcome).toBe("not-supported");
    expect(exp.negativeFindings.join(" ")).toMatch(/not supported/);
    expect(experiments.find((e) => e.id === "x14-1")!.hypothesisOutcome).toBe("stop");
  });

  it("records no DOI and no peer review for any publication", () => {
    expect(publications.every((p) => p.doi === null)).toBe(true);
    expect(publications.filter((p) => p.publicationType === "preprint").every((p) => p.peerReviewed === false)).toBe(true);
  });

  it("marks site-inferred relations distinctly", () => {
    const inferred = relations.filter((r) => r.evidence === "site-inferred");
    expect(inferred.length).toBeGreaterThan(0);
    for (const r of inferred) expect(r.basis).toMatch(/infer/i);
  });

  it("keeps the stated non-dependency between Body Without Commands and Xenoscience", () => {
    const r = relations.find((x) => x.id === "r-bwc-xs")!;
    expect(r.type).toBe("unresolved-connection");
  });

  it("does not expand MO / DO / ZCA / MS", () => {
    const z = nodeById.get("ziran-system")!;
    expect(z.distinctions!.join(" ")).toMatch(/expansions were not found/);
  });
});

describe("layout", () => {
  it("is deterministic and inside bounds", () => {
    const ids = nodes.slice(0, 10).map((n) => n.id);
    const edges: [string, string][] = [[ids[0], ids[1]], [ids[2], ids[3]]];
    const a = forceLayout(ids, edges, 1000, 680);
    const b = forceLayout(ids, edges, 1000, 680);
    expect([...a.entries()]).toEqual([...b.entries()]);
    for (const p of a.values()) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(1000);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(680);
    }
  });
});

describe("archive client", () => {
  it("parses the observed empty listing", () => {
    const r = parseArchiveListing({ data: [], pagination: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }, "t");
    expect(r).toEqual({ ok: true, total: 0, records: [], fetchedAt: "t" });
  });
  it("rejects malformed responses", () => {
    expect(parseArchiveListing(null, "t").ok).toBe(false);
    expect(parseArchiveListing({ items: [] }, "t").ok).toBe(false);
  });
});
