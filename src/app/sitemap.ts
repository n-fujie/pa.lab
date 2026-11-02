import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales } from "@/lib/i18n/config";
import { sections } from "@/data/research/sections";
import { labAreas } from "@/data/laboratory";
import { publications } from "@/data/publications/publications";
import { projectNodes } from "@/lib/research/queries";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/research",
    ...sections.map((s) => `/research/${s.id}`),
    "/projects",
    ...projectNodes.map((n) => `/projects/${n.id}`),
    "/laboratory",
    ...labAreas.map((a) => `/laboratory/${a.id}`),
    "/publications",
    ...publications.map((p) => `/publications/${p.id}`),
    "/research-map",
    "/methods",
    "/research-history",
    "/institute",
    "/contact",
  ];
  return paths.map((p) => ({
    url: `${site.url}/en${p}`,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${p}`])) },
  }));
}
