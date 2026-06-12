/* ════════════════════════════════════════════════════════════════════════
   Couche de contenu du site public.
   - Lit Supabase (modifiable depuis /admin) avec cache Next + tags.
   - Retombe sur le contenu statique de src/data/* si Supabase n'est pas
     configuré ou injoignable : le site public ne casse jamais.
   - Les server actions de l'admin appellent revalidateTag(...) après chaque
     modification → mise à jour immédiate du site.
   ════════════════════════════════════════════════════════════════════════ */

import { unstable_cache } from "next/cache";
import { site as siteDefaut, type SiteData } from "@/data/site";
import { produits as produitsDefaut, type Produit, type Categorie } from "@/data/produits";
import { temoignages as temoignagesDefaut, type Temoignage } from "@/data/temoignages";
import { evenementParDefaut, type Evenement } from "@/data/evenements";
import { getPublicClient } from "@/lib/supabase/public";

export const TAGS = {
  site: "site",
  produits: "produits",
  avis: "avis",
  evenements: "evenements",
} as const;

const REVALIDATE = 300; // secondes — filet de sécurité, les mutations admin invalident immédiatement

/* ── Lignes en base → types du site ──────────────────────────────────── */

type ProduitRow = {
  id: string;
  slug: string;
  nom: string;
  categorie: Categorie;
  prix: number | null;
  image: string;
  description: string;
  details: string[];
  populaire: boolean;
  badge: string | null;
  tags: string[];
  ordre: number;
};

function mapProduit(row: ProduitRow): Produit {
  return {
    id: row.id,
    slug: row.slug,
    nom: row.nom,
    categorie: row.categorie,
    prix: row.prix,
    image: row.image ?? "",
    description: row.description ?? "",
    details: row.details ?? [],
    populaire: row.populaire ?? false,
    badge: row.badge ?? undefined,
    tags: row.tags ?? [],
    ordre: row.ordre ?? 0,
  };
}

type TemoignageRow = {
  id: string;
  texte: string;
  auteur: string;
  contexte: string;
  visible: boolean;
};

type EvenementRow = {
  id: string;
  titre: string;
  titre_script: string;
  accroche: string;
  description: string;
  image: string;
  actif: boolean;
  date_debut: string | null;
  date_fin: string | null;
};

function mapEvenement(row: EvenementRow): Evenement {
  return {
    id: row.id,
    titre: row.titre,
    titreScript: row.titre_script ?? "",
    accroche: row.accroche ?? "",
    description: row.description ?? "",
    image: row.image ?? "",
    actif: row.actif,
    dateDebut: row.date_debut,
    dateFin: row.date_fin,
  };
}

/* ── Getters publics (cache + fallback) ──────────────────────────────── */

export const getSite = unstable_cache(
  async (): Promise<SiteData> => {
    const sb = getPublicClient();
    if (!sb) return siteDefaut;
    try {
      const { data, error } = await sb
        .from("site_settings")
        .select("data")
        .eq("id", 1)
        .maybeSingle();
      if (error || !data?.data) return siteDefaut;
      const stored = data.data as Partial<SiteData>;
      return { ...siteDefaut, ...stored, social: { ...siteDefaut.social, ...stored.social } };
    } catch {
      return siteDefaut;
    }
  },
  ["content-site"],
  { tags: [TAGS.site], revalidate: REVALIDATE },
);

export const getProduits = unstable_cache(
  async (): Promise<Produit[]> => {
    const sb = getPublicClient();
    if (!sb) return produitsDefaut;
    try {
      const { data, error } = await sb
        .from("produits")
        .select("*")
        .order("ordre", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) return produitsDefaut;
      return (data as ProduitRow[]).map(mapProduit);
    } catch {
      return produitsDefaut;
    }
  },
  ["content-produits"],
  { tags: [TAGS.produits], revalidate: REVALIDATE },
);

export async function getProduit(slug: string): Promise<Produit | undefined> {
  const liste = await getProduits();
  return liste.find((p) => p.slug === slug);
}

export const getTemoignages = unstable_cache(
  async (): Promise<Temoignage[]> => {
    const sb = getPublicClient();
    if (!sb) return temoignagesDefaut;
    try {
      const { data, error } = await sb
        .from("temoignages")
        .select("*")
        .eq("visible", true)
        .order("ordre", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) return temoignagesDefaut;
      return data as TemoignageRow[];
    } catch {
      return temoignagesDefaut;
    }
  },
  ["content-avis"],
  { tags: [TAGS.avis], revalidate: REVALIDATE },
);

/** Événement/promo actif à afficher sur l'accueil — null si aucun. */
export const getEvenementActif = unstable_cache(
  async (): Promise<Evenement | null> => {
    const sb = getPublicClient();
    if (!sb) return evenementParDefaut;
    try {
      const { data, error } = await sb
        .from("evenements")
        .select("*")
        .eq("actif", true)
        .order("created_at", { ascending: false });
      if (error) return evenementParDefaut;
      const today = new Date().toISOString().slice(0, 10);
      const actif = (data as EvenementRow[]).find(
        (e) => (!e.date_debut || e.date_debut <= today) && (!e.date_fin || e.date_fin >= today),
      );
      return actif ? mapEvenement(actif) : null;
    } catch {
      return evenementParDefaut;
    }
  },
  ["content-evenements"],
  { tags: [TAGS.evenements], revalidate: REVALIDATE },
);
