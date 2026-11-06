import type { MetadataRoute } from "next";
import { PROJECTS, SERVICES } from "@/lib/data";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/realisations", "/a-propos", "/faq", "/contact", "/application"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, priority: p === "" ? 1 : 0.8 })),
    ...SERVICES.map((s) => ({ url: `${SITE.url}/services/${s.slug}`, priority: 0.7 })),
    ...PROJECTS.map((p) => ({ url: `${SITE.url}/realisations/${p.slug}`, priority: 0.5 })),
  ];
}
