# P/A Institute — official research website

Independent, deployable Next.js application for P/A Institute. It is separate from the
personal site (www.platodesignlab.com) and from P/A Archive (archive.platodesignlab.com),
and modifies neither.

## Principle

Preserve the research. Preserve the distinctions. Preserve the evidence. Build the infrastructure.

All research content is structured data under `src/data/`, and every item cites a source
listed in `src/data/sources.ts`. Topics named in the development directive whose sources
could not be recovered are present with `grounding: "not-recovered"` and **no content**.
The integrity checks in `src/lib/validation/integrity.ts` fail the test suite if a relation
has no source, an unrecovered topic gains content, a DOI appears, or a negative/conditional
experiment loses its negative findings.

## Commands

```bash
npm install
npm run dev         # http://localhost:3000 → /en
npm run build       # production build + type check
npm run typecheck
npm test            # vitest: research-data integrity, layout, archive client
```

## Environment

```
NEXT_PUBLIC_SITE_URL=                                  # unset → robots disallow + noindex
NEXT_PUBLIC_ARCHIVE_URL=https://archive.platodesignlab.com
NEXT_PUBLIC_PERSONAL_URL=https://www.platodesignlab.com
```

The production domain is not decided. While `NEXT_PUBLIC_SITE_URL` is unset the site
asks not to be indexed.

## Structure

```
src/app/[locale]/…        en / ja routes (research, projects, laboratory, publications,
                          research-map, methods, research-history, institute, contact)
src/app/research-data.json machine-readable export of all research records
src/data/                 sources, nodes, sections, relations, experiments, publications, history, methods
src/types/                research, experiment, publication types
src/lib/archive/          read-only client for the Archive public API (GET /api/records)
src/lib/validation/       integrity rules
src/components/           UI, research blocks, research map (SVG, no external graph library)
```

## Adding research

1. Add the source you read to `src/data/sources.ts` (what was read, and when).
2. Add or update the node / relation / experiment, citing that source id.
3. For a directive topic that is now recovered, remove `unrecovered`, set `grounding`, and add content.
4. `npm test` must pass.

Japanese pages translate the interface only; research text is shown in English with a
notice until a reviewed translation exists.
