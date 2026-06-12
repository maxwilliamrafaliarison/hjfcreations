import type { Metadata } from "next";
import Link from "next/link";
import { creerProduit } from "@/app/admin/actions";
import ProduitForm from "@/components/admin/ProduitForm";
import { Notice } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Nouveau produit" };

export default async function NouveauProduitPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  return (
    <div>
      <Link href="/admin/produits" className="text-xs font-bold uppercase tracking-wider text-taupe hover:text-terracotta">
        ← Retour aux produits
      </Link>
      <h1 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-ink">
        Nouveau produit
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        Le produit sera visible immédiatement sur la boutique après l'ajout.
      </p>

      <div className="mt-5">
        <Notice erreur={erreur} />
      </div>

      <ProduitForm action={creerProduit} />
    </div>
  );
}
