"use client";

import { useState } from "react";
import { produits, CATEGORIES, type Categorie } from "@/data/produits";
import ProductCard from "@/components/ProductCard";

type Filter = "tous" | Categorie;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "tous", label: "Tous" },
  ...CATEGORIES,
];

export default function BoutiqueGrid() {
  const [filter, setFilter] = useState<Filter>("tous");
  const liste =
    filter === "tous" ? produits : produits.filter((p) => p.categorie === filter);

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <span className="mr-1 text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
          Filtrer :
        </span>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
              filter === f.id
                ? "border-terracotta bg-terracotta text-white"
                : "border-linen text-ink-soft hover:border-terracotta hover:text-terracotta"
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

      <p className="mt-8 text-sm text-ink-soft">
        {liste.length} création{liste.length > 1 ? "s" : ""}
        {filter !== "tous" ? " dans cette catégorie" : ""}.
      </p>
    </div>
  );
}
