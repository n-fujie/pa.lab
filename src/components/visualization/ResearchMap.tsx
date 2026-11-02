"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { nodes, nodeById } from "@/data/research/nodes";
import { relations } from "@/data/relations/relations";
import { experiments } from "@/data/experiments/experiments";
import { publications } from "@/data/publications/publications";
import { sourceById } from "@/data/sources";
import { forceLayout } from "@/lib/research/layout";
import { nodeKindLabel, relationTypeLabel } from "@/lib/research/queries";
import type { Locale } from "@/lib/i18n/config";
import type { NodeKind, RelationEvidenceState, ResearchRelationType } from "@/types/research";

const W = 1000;
const H = 680;

const evidenceDash: Record<RelationEvidenceState, string | undefined> = {
  established: undefined,
  hypothesis: "7 5",
  "site-inferred": "2 4",
};
const evidenceLabel: Record<RelationEvidenceState, string> = {
  established: "Stated in source",
  hypothesis: "Stated as hypothesis",
  "site-inferred": "Site-inferred (unconfirmed)",
};

const typeColor: Partial<Record<ResearchRelationType, string>> = {
  "theoretical-dependency": "var(--institutional-blue)",
  "material-implementation": "var(--dark-brown)",
  "experimental-constraint": "var(--deep-red)",
  "unresolved-connection": "var(--deep-red)",
};

const shortLabel = (title: string) => title.split(" — ")[0].replace(/^Ziran \/ Xeno Operational World Simulator$/, "Ziran/Xeno Simulator").replace(/^XENO ZIRAN SIMULATOR runtime$/, "XZS runtime");

function NodeShape({ kind, selected }: { kind: NodeKind; selected: boolean }) {
  const stroke = selected ? "var(--deep-red)" : "var(--foreground)";
  const sw = selected ? 2.5 : 1.2;
  const fill = kind === "external" ? "var(--background)" : kind === "programme" ? "var(--institutional-blue)" : "var(--surface)";
  if (kind === "system") return <rect x={-7} y={-7} width={14} height={14} fill={fill} stroke={stroke} strokeWidth={sw} />;
  if (kind === "concept") return <rect x={-6} y={-6} width={12} height={12} transform="rotate(45)" fill={fill} stroke={stroke} strokeWidth={sw} />;
  if (kind === "earlier") return <circle r={7} fill="var(--dark-brown)" stroke={stroke} strokeWidth={sw} />;
  return <circle r={kind === "programme" ? 9 : 7} fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={kind === "external" ? "2 2" : undefined} />;
}

export function ResearchMap({ locale }: { locale: Locale }) {
  const allTypes = useMemo(() => Array.from(new Set(relations.map((r) => r.type))), []);
  const [types, setTypes] = useState<Set<ResearchRelationType>>(() => new Set(allTypes));
  const [evidence, setEvidence] = useState<Set<RelationEvidenceState>>(() => new Set<RelationEvidenceState>(["established", "hypothesis"]));
  const [showExternal, setShowExternal] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  const graphNodeIds = useMemo(() => {
    const ids = new Set<string>();
    for (const r of relations) {
      ids.add(r.from);
      ids.add(r.to);
    }
    return nodes.filter((n) => ids.has(n.id)).map((n) => n.id);
  }, []);

  const positions = useMemo(
    () => forceLayout(graphNodeIds, relations.map((r) => [r.from, r.to] as [string, string]), W, H),
    [graphNodeIds],
  );

  const visibleRelations = relations.filter((r) => {
    if (!types.has(r.type) || !evidence.has(r.evidence)) return false;
    if (!showExternal && (nodeById.get(r.from)?.kind === "external" || nodeById.get(r.to)?.kind === "external")) return false;
    return true;
  });
  const visibleNodeIds = new Set(graphNodeIds.filter((id) => showExternal || nodeById.get(id)?.kind !== "external"));

  // Non-passive wheel listener so zooming does not scroll the page.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * W;
      const my = ((e.clientY - rect.top) / rect.height) * H;
      setView((v) => {
        const k = Math.min(4, Math.max(0.5, v.k * (e.deltaY < 0 ? 1.12 : 1 / 1.12)));
        return { k, x: mx - ((mx - v.x) * k) / v.k, y: my - ((my - v.y) * k) / v.k };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const zoom = (f: number) => setView((v) => {
    const k = Math.min(4, Math.max(0.5, v.k * f));
    return { k, x: W / 2 - ((W / 2 - v.x) * k) / v.k, y: H / 2 - ((H / 2 - v.y) * k) / v.k };
  });

  const toggle = <T,>(set: Set<T>, value: T, update: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    update(next);
  };

  const sel = selected ? nodeById.get(selected) : null;
  const selRelations = sel ? relations.filter((r) => r.from === sel.id || r.to === sel.id) : [];
  const selExperiments = sel ? experiments.filter((e) => e.relatedNodes.includes(sel.id)) : [];
  const selPublications = sel ? publications.filter((p) => p.relatedProjects.includes(sel.id)) : [];
  const neighbours = new Set(selRelations.flatMap((r) => [r.from, r.to]));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div>
        <fieldset className="panel mb-3 p-3 text-sm">
          <legend className="eyebrow px-1">Relation type</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {allTypes.map((t) => (
              <label key={t} className="inline-flex items-center gap-1.5">
                <input type="checkbox" checked={types.has(t)} onChange={() => toggle(types, t, setTypes)} />
                <span className="inline-block h-[2px] w-4" style={{ background: typeColor[t] ?? "var(--muted)" }} aria-hidden="true" />
                {relationTypeLabel[t]}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="panel mb-3 p-3 text-sm">
          <legend className="eyebrow px-1">Evidence state</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {(Object.keys(evidenceLabel) as RelationEvidenceState[]).map((e) => (
              <label key={e} className="inline-flex items-center gap-1.5">
                <input type="checkbox" checked={evidence.has(e)} onChange={() => toggle(evidence, e, setEvidence)} />
                <svg width="22" height="6" aria-hidden="true">
                  <line x1="0" y1="3" x2="22" y2="3" stroke="var(--foreground)" strokeWidth="1.5" strokeDasharray={evidenceDash[e]} />
                </svg>
                {evidenceLabel[e]}
              </label>
            ))}
            <label className="inline-flex items-center gap-1.5">
              <input type="checkbox" checked={showExternal} onChange={() => setShowExternal((v) => !v)} />
              Show external positions
            </label>
          </div>
        </fieldset>

        <div className="panel relative overflow-hidden">
          <div className="absolute right-2 top-2 z-10 flex gap-1">
            <button type="button" className="mono h-8 w-8 border border-border bg-surface" onClick={() => zoom(1.25)} aria-label="Zoom in">+</button>
            <button type="button" className="mono h-8 w-8 border border-border bg-surface" onClick={() => zoom(0.8)} aria-label="Zoom out">−</button>
            <button type="button" className="mono h-8 border border-border bg-surface px-2 text-xs" onClick={() => setView({ x: 0, y: 0, k: 1 })}>Reset</button>
          </div>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full cursor-grab touch-none select-none active:cursor-grabbing"
            role="group"
            aria-label="Research relation graph. Use Tab to move between research items and Enter to select. The relation list below contains the same information."
            onPointerDown={(e) => {
              if ((e.target as Element).closest("[data-node]")) return;
              drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
              (e.currentTarget as Element).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!drag.current || !svgRef.current) return;
              const scale = W / svgRef.current.getBoundingClientRect().width;
              setView((v) => ({ ...v, x: drag.current!.vx + (e.clientX - drag.current!.x) * scale, y: drag.current!.vy + (e.clientY - drag.current!.y) * scale }));
            }}
            onPointerUp={() => (drag.current = null)}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="19" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--foreground)" />
              </marker>
            </defs>
            <rect width={W} height={H} fill="var(--surface)" />
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
              {visibleRelations.map((r) => {
                const a = positions.get(r.from)!;
                const b = positions.get(r.to)!;
                const dim = sel && !(r.from === sel.id || r.to === sel.id);
                return (
                  <line
                    key={r.id}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={typeColor[r.type] ?? "var(--muted)"}
                    strokeWidth={1.4 / Math.sqrt(view.k)}
                    strokeDasharray={evidenceDash[r.evidence]}
                    markerEnd={r.directed ? "url(#arrow)" : undefined}
                    opacity={dim ? 0.15 : 0.9}
                  >
                    <title>{`${nodeById.get(r.from)?.title} → ${nodeById.get(r.to)?.title}: ${relationTypeLabel[r.type]} (${evidenceLabel[r.evidence]})`}</title>
                  </line>
                );
              })}
              {graphNodeIds.filter((id) => visibleNodeIds.has(id)).map((id) => {
                const n = nodeById.get(id)!;
                const p = positions.get(id)!;
                const isSel = selected === id;
                const dim = sel && !neighbours.has(id) && !isSel;
                return (
                  <g
                    key={id}
                    data-node
                    transform={`translate(${p.x} ${p.y})`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${n.title}, ${nodeKindLabel[n.kind]}`}
                    className="cursor-pointer focus:outline-none [&:focus-visible>circle]:stroke-[3]"
                    opacity={dim ? 0.3 : 1}
                    onClick={() => setSelected(isSel ? null : id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(isSel ? null : id);
                      }
                    }}
                  >
                    <NodeShape kind={n.kind} selected={isSel} />
                    <text y={-14} textAnchor="middle" fontSize={12 / Math.sqrt(view.k)} fill="var(--foreground)" style={{ paintOrder: "stroke", stroke: "var(--surface)", strokeWidth: 3 }}>
                      {shortLabel(n.title)}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <p className="border-t border-border px-3 py-2 text-xs text-muted">
            Drag to pan · scroll or +/− to zoom · select an item to inspect its relations. Positions are a layout convenience; distance and placement carry no research meaning. The graph shows only relations stated in recovered sources; it is one representation of the research, not its ontological whole.
          </p>
        </div>
        <dl className="mono mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          <div className="flex items-center gap-1.5"><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="var(--institutional-blue)" stroke="var(--foreground)" /></svg><dt>Programme</dt></div>
          <div className="flex items-center gap-1.5"><svg width="14" height="14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" fill="var(--surface)" stroke="var(--foreground)" /></svg><dt>System</dt></div>
          <div className="flex items-center gap-1.5"><svg width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="8" height="8" transform="rotate(45 7 7)" fill="var(--surface)" stroke="var(--foreground)" /></svg><dt>Concept</dt></div>
          <div className="flex items-center gap-1.5"><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="var(--background)" stroke="var(--foreground)" strokeDasharray="2 2" /></svg><dt>External position</dt></div>
          <div className="flex items-center gap-1.5"><span aria-hidden="true">→</span><dt>Directed relation</dt></div>
        </dl>
      </div>

      <aside aria-live="polite" className="panel h-fit p-5 lg:sticky lg:top-20">
        {!sel ? (
          <div className="text-sm text-muted">
            <p className="eyebrow mb-2">Inspector</p>
            <p>Select an item in the graph to see its source, relations, and linked experiments and publications.</p>
            <p className="mt-3">
              Showing {visibleRelations.length} of {relations.length} recorded relations.
            </p>
          </div>
        ) : (
          <div lang={locale === "ja" ? "en" : undefined}>
            <p className="eyebrow mb-1">{nodeKindLabel[sel.kind]}</p>
            <h2 className="serif text-xl leading-snug">{sel.title}</h2>
            {sel.subtitle && <p className="text-sm text-muted">{sel.subtitle}</p>}
            <p className="mt-3 text-sm">{sel.summary}</p>
            {sel.kind !== "external" && (
              <p className="mt-3 text-sm">
                <Link href={`/${locale}/projects/${sel.id}`}>Open project page →</Link>
              </p>
            )}
            <h3 className="eyebrow mb-2 mt-5">Relations ({selRelations.length})</h3>
            <ul className="space-y-3 text-sm">
              {selRelations.map((r) => {
                const out = r.from === sel.id;
                const other = nodeById.get(out ? r.to : r.from)!;
                return (
                  <li key={r.id} className="border-l-2 border-border pl-3">
                    <p>
                      <span className="mono text-xs">{relationTypeLabel[r.type]}</span>
                      {" · "}
                      {r.directed ? (out ? "→ " : "← ") : "↔ "}
                      <button type="button" className="text-blue underline" onClick={() => setSelected(other.id)}>
                        {other.title}
                      </button>
                    </p>
                    <p className="mono text-xs text-muted">{evidenceLabel[r.evidence]}</p>
                    <p className="mt-1 text-muted">“{r.basis}”</p>
                    <p className="mono text-xs text-muted">{r.sources.map((s) => sourceById.get(s)?.title).join(" · ")}</p>
                  </li>
                );
              })}
            </ul>
            {selExperiments.length > 0 && (
              <>
                <h3 className="eyebrow mb-2 mt-5">Experimental evidence</h3>
                <ul className="list-dash text-sm">
                  {selExperiments.map((e) => (
                    <li key={e.id}>
                      <Link href={`/${locale}/laboratory/experiments#${e.id}`}>{e.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {selPublications.length > 0 && (
              <>
                <h3 className="eyebrow mb-2 mt-5">Publications</h3>
                <ul className="list-dash text-sm">
                  {selPublications.map((p) => (
                    <li key={p.id}>
                      <Link href={`/${locale}/publications/${p.id}`}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
