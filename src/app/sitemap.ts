import type { MetadataRoute } from "next";
import { getProduits, getSite } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, produits] = await Promise.all([getSite(), getProduits()]);
  const lastModified = new Date();

  const pages = ["", "/boutique", "/a-propos", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    priority: path === "" ? 1 : 0.8,
  }));

  const fiches = produits.map((p) => ({
    url: `${site.url}/boutique/${p.slug}`,
    lastModified,
    priority: 0.6,
  }));

  return [...pages, ...fiches];
}
