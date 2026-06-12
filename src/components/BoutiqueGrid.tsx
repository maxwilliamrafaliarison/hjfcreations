"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, type Categorie, type Produit } from "@/data/produits";
import ProductCard from "@/components/ProductCard";

type Filter = "tous" | Categorie;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "tous", label: "Tous" },
  ...CATEGORIES,
];

const CATEGORIES_VALIDES = new Set<string>(CATEGORIES.map((c) => c.id));

/** Grille filtrable — le filtre vit dans l'URL (?cat=…) pour être partageable. */
export default function BoutiqueGrid({ produits }: { produits: Produit[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cat = searchParams.get("cat");
  const filter: Filter =
    cat && CATEGORIES_VALIDES.has(cat) ? (cat as Categorie) : "tous";

  const liste =
    filter === "tous" ? produits : produits.filter((p) => p.categorie === filter);

  function setFilter(f: Filter) {
    router.replace(f === "tous" ? "/boutique" : `/boutique?cat=${f}`, {
      scroll: false,
    });
  }

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <span className="eyebrow mr-1 text-ink-soft">Filtrer :</span>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === f.id
                ? "border-terracotta bg-terracotta text-white"
                : "border-linen text-taupe hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {liste.map((p) => (
          <ProductCard key={p.slug} produit={p} />
        ))}
      </div>

      <p className="mt-8 text-sm text-taupe">
        {liste.length} création{liste.length > 1 ? "s" : ""}
        {filter !== "tous" ? " dans cette catégorie" : ""}.
      </p>
    </div>
  );
}
