import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Until the production domain is configured, the site asks not to be indexed. */
export default function robots(): MetadataRoute.Robots {
  if (!site.urlConfigured) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
