/**
 * Deterministic force-directed layout. Same input → same positions on server and client,
 * so the map is stable across visits and renders without hydration drift.
 * Positions carry no meaning beyond readability; distance is not a research quantity.
 */
export type Point = { x: number; y: number };

export function forceLayout(ids: string[], edges: [string, string][], width: number, height: number, iterations = 400): Map<string, Point> {
  const n = ids.length;
  const index = new Map(ids.map((id, i) => [id, i]));
  const cx = width / 2;
  const cy = height / 2;
  const pos = ids.map((_, i) => {
    const a = (2 * Math.PI * i) / Math.max(n, 1);
    const r = Math.min(width, height) * 0.38;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  const k = Math.sqrt((width * height) / Math.max(n, 1)) * 0.62;
  const links = edges.map(([a, b]) => [index.get(a)!, index.get(b)!] as const).filter(([a, b]) => a !== undefined && b !== undefined);

  for (let it = 0; it < iterations; it++) {
    const t = (1 - it / iterations) * (width / 10);
    const disp = pos.map(() => ({ x: 0, y: 0 }));
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++) {
        const dx = pos[i].x - pos[j].x || 0.01;
        const dy = pos[i].y - pos[j].y || 0.01;
        const d = Math.max(Math.hypot(dx, dy), 0.01);
        const f = (k * k) / d;
        disp[i].x += (dx / d) * f;
        disp[i].y += (dy / d) * f;
        disp[j].x -= (dx / d) * f;
        disp[j].y -= (dy / d) * f;
      }
    for (const [a, b] of links) {
      const dx = pos[a].x - pos[b].x;
      const dy = pos[a].y - pos[b].y;
      const d = Math.max(Math.hypot(dx, dy), 0.01);
      const f = (d * d) / k;
      disp[a].x -= (dx / d) * f;
      disp[a].y -= (dy / d) * f;
      disp[b].x += (dx / d) * f;
      disp[b].y += (dy / d) * f;
    }
    for (let i = 0; i < n; i++) {
      // gentle gravity keeps disconnected components on screen
      disp[i].x += (cx - pos[i].x) * 0.02 * k * 0.1;
      disp[i].y += (cy - pos[i].y) * 0.02 * k * 0.1;
      const d = Math.max(Math.hypot(disp[i].x, disp[i].y), 0.01);
      pos[i].x += (disp[i].x / d) * Math.min(d, t);
      pos[i].y += (disp[i].y / d) * Math.min(d, t);
      pos[i].x = Math.min(width - 60, Math.max(60, pos[i].x));
      pos[i].y = Math.min(height - 30, Math.max(30, pos[i].y));
    }
  }
  return new Map(ids.map((id, i) => [id, { x: Math.round(pos[i].x), y: Math.round(pos[i].y) }]));
}
