import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prixLabel, CATEGORIES } from "@/data/produits";
import { getProduit, getProduits, getSite } from "@/lib/content";
import OrderButtons from "@/components/OrderButtons";
import ProductCard from "@/components/ProductCard";
import { CheckIcon, ImageIcon } from "@/components/icons";

type Params = { params: Promise<{ slug: string }> };

// Les produits ajoutés depuis l'admin après le build restent accessibles.
export const dynamicParams = true;

export async function generateStaticParams() {
  const produits = await getProduits();
  return produits.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [produit, site] = await Promise.all([getProduit(slug), getSite()]);
  if (!produit) return { title: "Produit introuvable" };
  return {
    title: produit.nom,
    description: produit.description,
    alternates: { canonical: `/boutique/${produit.slug}` },
    openGraph: {
      title: `${produit.nom} · ${site.name}`,
      description: produit.description,
      images: produit.image ? [produit.image] : undefined,
    },
  };
}

export default async function ProduitPage({ params }: Params) {
  const { slug } = await params;
  const [produit, produits, site] = await Promise.all([
    getProduit(slug),
    getProduits(),
    getSite(),
  ]);
  if (!produit) notFound();

  const categorie = CATEGORIES.find((c) => c.id === produit.categorie)?.label;
  const related = produits
    .filter((p) => p.categorie === produit.categorie && p.slug !== produit.slug)
    .slice(0, 4);

  const imageUrl = produit.image
    ? produit.image.startsWith("http")
      ? produit.image
      : `${site.url}${produit.image}`
    : `${site.url}/logo.jpg`;

  const produitJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produit.nom,
    description: produit.description,
    image: imageUrl,
    brand: { "@type": "Brand", name: site.name },
    ...(produit.prix !== null && {
      offers: {
        "@type": "Offer",
        price: produit.prix,
        priceCurrency: "MGA",
        availability: "https://schema.org/InStock",
        url: `${site.url}/boutique/${produit.slug}`,
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      { "@type": "ListItem", position: 2, name: "Boutique", item: `${site.url}/boutique` },
      { "@type": "ListItem", position: 3, name: produit.nom },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(produitJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Fil d'Ariane */}
      <div className="border-b border-linen bg-ivory">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-xs uppercase tracking-wider text-ink-soft sm:px-8">
          <Link href="/" className="hover:text-terracotta">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-terracotta">Boutique</Link>
          <span>/</span>
          <span className="text-ink">{produit.nom}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-2 md:py-16">
        {/* Visuel */}
        <div className="relative aspect-[4/5] overflow-hidden bg-sand ring-1 ring-linen">
          {produit.image ? (
            <Image
              src={produit.image}
              alt={produit.nom}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sand to-linen text-taupe-soft">
              <ImageIcon className="h-14 w-14 text-gold/70" />
              <span className="eyebrow">Photo bientôt disponible</span>
            </div>
          )}
          {produit.badge && (
            <span className="absolute left-4 top-4 bg-terracotta px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow">
              {produit.badge}
            </span>
          )}
        </div>

        {/* Détails */}
        <div className="flex flex-col">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-terracotta">
            {categorie}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-ink">
            {produit.nom}
          </h1>
          <p className="mt-3 text-2xl font-extrabold uppercase tracking-wide text-gold-dark">
            {prixLabel(produit)}
          </p>

          <p className="mt-5 leading-relaxed text-ink-soft">{produit.description}</p>

          <ul className="mt-6 space-y-2.5">
            {produit.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-ink">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <OrderButtons produit={produit} site={site} />
          </div>

          <div className="mt-6 border-l-2 border-gold bg-ivory p-5 text-sm leading-relaxed text-ink-soft">
            <p className="font-semibold text-ink">Comment ça marche&nbsp;?</p>
            <p className="mt-1.5">
              Cliquez sur « Commander sur WhatsApp », envoyez-nous votre texte et
              vos photos, et nous validons ensemble la personnalisation. Paiement
              par {site.payments.slice(0, 3).join(", ")} ou à la livraison.{" "}
              {site.delivery}.
            </p>
          </div>
        </div>
      </section>

      {/* Produits liés */}
      {related.length > 0 && (
        <section className="border-t border-linen bg-sand">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
              Dans la même catégorie
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} produit={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
