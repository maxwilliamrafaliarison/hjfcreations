import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { produits } from "@/data/produits";

export default function sitemap(): MetadataRoute.Sitemap {
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
