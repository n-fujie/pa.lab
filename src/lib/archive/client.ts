import { site } from "@/lib/site";

/**
 * Read-only client for the P/A Archive public API (GET /api/records).
 * The site never writes to the Archive and never shares its database.
 * Only fields observed in the live response are typed; anything else is ignored.
 */
export type ArchiveRecord = {
  id?: string;
  paid?: string;
  title?: string;
  url?: string;
  [key: string]: unknown;
};

export type ArchiveListing =
  | { ok: true; total: number; records: ArchiveRecord[]; fetchedAt: string }
  | { ok: false; error: string; fetchedAt: string };

export function parseArchiveListing(json: unknown, fetchedAt: string): ArchiveListing {
  if (!json || typeof json !== "object") return { ok: false, error: "Unexpected response shape", fetchedAt };
  const body = json as { data?: unknown; pagination?: { total?: unknown } };
  if (!Array.isArray(body.data)) return { ok: false, error: "Response has no data array", fetchedAt };
  const total = typeof body.pagination?.total === "number" ? body.pagination.total : body.data.length;
  return { ok: true, total, records: body.data as ArchiveRecord[], fetchedAt };
}

export async function fetchArchiveListing(): Promise<ArchiveListing> {
  const fetchedAt = new Date().toISOString();
  try {
    const res = await fetch(`${site.archiveUrl}/api/records`, {
      next: { revalidate: 3600 },
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}`, fetchedAt };
    return parseArchiveListing(await res.json(), fetchedAt);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Request failed", fetchedAt };
  }
}
