import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatAr } from "@/lib/format";
import { CATEGORIES, type Categorie } from "@/data/produits";
import { supprimerProduit } from "@/app/admin/actions";
import BoutonSupprimer from "@/components/admin/BoutonSupprimer";
import { Notice, btnPrimaire } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Produits" };

const SUCCES: Record<string, string> = {
  ajout: "Produit ajouté — il est en ligne sur la boutique.",
  maj: "Produit modifié — le site est à jour.",
  suppression: "Produit supprimé.",
};

type Row = {
  id: string;
  slug: string;
  nom: string;
  categorie: Categorie;
  prix: number | null;
  image: string;
  populaire: boolean;
  badge: string | null;
  ordre: number;
};

export default async function AdminProduitsPage({
  searchParams,
}: {
  searchParams: Promise<{ succes?: string; erreur?: string }>;
}) {
  const { succes, erreur } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("produits")
    .select("id, slug, nom, categorie, prix, image, populaire, badge, ordre")
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: true });

  const produits = (data ?? []) as Row[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-ink">Produits</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {produits.length} produit{produits.length > 1 ? "s" : ""} dans la boutique.
          </p>
        </div>
        <Link href="/admin/produits/nouveau" className={btnPrimaire}>
          ➕ Ajouter un produit
        </Link>
      </div>

      <div className="mt-5">
        <Notice succes={succes ? SUCCES[succes] : undefined} erreur={erreur} />
        {error && (
          <Notice erreur="Impossible de charger les produits — vérifiez que le schéma SQL a bien été exécuté dans Supabase." />
        )}
      </div>

      <ul className="space-y-3">
        {produits.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center gap-4 bg-ivory p-3.5 ring-1 ring-linen sm:flex-nowrap"
          >
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="" className="h-14 w-14 shrink-0 object-cover ring-1 ring-linen" />
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-sand text-xs text-taupe-soft">
                —
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-ink">
                {p.nom}
                {p.populaire && <span title="Populaire"> ⭐</span>}
                {p.badge && (
                  <span className="ml-2 bg-terracotta px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                    {p.badge}
                  </span>
                )}
              </p>
              <p className="text-sm text-ink-soft">
                {CATEGORIES.find((c) => c.id === p.categorie)?.label} ·{" "}
                <span className="font-bold text-gold-dark">
                  {p.prix === null ? "Sur devis" : formatAr(p.prix)}
                </span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/admin/produits/${p.id}`}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-taupe transition-colors hover:bg-taupe hover:text-cream"
              >
                Modifier
              </Link>
              <BoutonSupprimer
                action={supprimerProduit.bind(null, p.id)}
                confirmation={`Supprimer définitivement « ${p.nom} » ?`}
              />
            </div>
          </li>
        ))}
        {produits.length === 0 && !error && (
          <li className="bg-ivory p-8 text-center text-sm text-ink-soft ring-1 ring-linen">
            Aucun produit pour l'instant — cliquez sur « Ajouter un produit ».
          </li>
        )}
      </ul>
    </div>
  );
}
