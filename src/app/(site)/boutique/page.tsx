import type { Metadata } from "next";
import { Suspense } from "react";
import { getProduits } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import BoutiqueGrid from "@/components/BoutiqueGrid";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez nos créations personnalisées : mugs, t-shirts, coussins, gourdes et cadeaux uniques par sublimation, à Antananarivo.",
  alternates: { canonical: "/boutique" },
};

export default async function BoutiquePage() {
  const produits = await getProduits();

  return (
    <>
      <PageHeader label="Nos créations" title={<>La <span className="script text-[1.15em] text-terracotta">boutique</span></>} watermark="Boutique">
        Chaque pièce est réalisée à la main et personnalisée avec votre texte et
        vos photos. Choisissez, puis commandez en un message.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:py-16">
        <Suspense>
          <BoutiqueGrid produits={produits} />
        </Suspense>
      </section>
    </>
  );
}
