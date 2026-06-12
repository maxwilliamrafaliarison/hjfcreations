import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Produit } from "@/data/produits";
import { majProduit, supprimerProduit } from "@/app/admin/actions";
import ProduitForm from "@/components/admin/ProduitForm";
import BoutonSupprimer from "@/components/admin/BoutonSupprimer";
import { Notice } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Modifier le produit" };

export default async function EditerProduitPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erreur?: string }>;
}) {
  const [{ id }, { erreur }] = await Promise.all([params, searchParams]);

  const supabase = await createSupabaseServerClient();
  const { data: row } = await supabase.from("produits").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  const produit: Produit = {
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

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/produits" className="text-xs font-bold uppercase tracking-wider text-taupe hover:text-terracotta">
            ← Retour aux produits
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-ink">
            {produit.nom}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Page publique :{" "}
            <a
              href={`/boutique/${produit.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-terracotta"
            >
              /boutique/{produit.slug} ↗
            </a>
          </p>
        </div>
        <BoutonSupprimer
          action={supprimerProduit.bind(null, id)}
          confirmation={`Supprimer définitivement « ${produit.nom} » ?`}
        >
          🗑 Supprimer ce produit
        </BoutonSupprimer>
      </div>

      <div className="mt-5">
        <Notice erreur={erreur} />
      </div>

      <ProduitForm action={majProduit.bind(null, id)} produit={produit} />
    </div>
  );
}
