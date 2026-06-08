import Link from "next/link";
import Image from "next/image";
import { type Produit, prixLabel, CATEGORIES } from "@/data/produits";
import { ImageIcon } from "@/components/icons";

function categorieLabel(id: Produit["categorie"]) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export default function ProductCard({ produit }: { produit: Produit }) {
  return (
    <Link
      href={`/boutique/${produit.slug}`}
      className="group flex flex-col overflow-hidden bg-ivory ring-1 ring-linen transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/10 hover:ring-terracotta"
    >
      <div className="relative aspect-square overflow-hidden bg-sand">
        {produit.image ? (
          <Image
            src={produit.image}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-linen text-taupe-soft">
            <ImageIcon className="h-9 w-9 text-gold/70" />
            <span className="eyebrow text-[0.62rem]">Photo bientôt</span>
          </div>
        )}

        {produit.badge && (
          <span className="absolute left-0 top-4 bg-terracotta px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white">
            {produit.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-terracotta">
          {categorieLabel(produit.categorie)}
        </p>
        <h3 className="mt-1.5 text-base font-bold leading-snug text-ink group-hover:text-terracotta">
          {produit.nom}
        </h3>
        <p className="mt-auto pt-3 text-sm font-extrabold uppercase tracking-wide text-gold-dark">
          {prixLabel(produit)}
        </p>
      </div>
    </Link>
  );
}
