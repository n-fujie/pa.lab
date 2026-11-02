import { sources } from "@/data/sources";
import { nodes } from "@/data/research/nodes";
import { sections } from "@/data/research/sections";
import { relations } from "@/data/relations/relations";
import { experiments } from "@/data/experiments/experiments";
import { publications } from "@/data/publications/publications";
import { history } from "@/data/research/history";
import { methods } from "@/data/research/methods";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schema: "pa-institute.research-data/0.1",
    note: "Machine-readable research records. Items with grounding 'not-recovered' carry no content by design.",
    sources,
    sections,
    nodes,
    relations,
    experiments,
    publications,
    history,
    methods,
  });
}
