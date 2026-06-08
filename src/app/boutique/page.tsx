import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BoutiqueGrid from "@/components/BoutiqueGrid";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez nos créations personnalisées : mugs, t-shirts, coussins, gourdes et cadeaux uniques par sublimation, à Antananarivo.",
};

export default function BoutiquePage() {
  return (
    <>
      <PageHeader label="Nos créations" title={<>La <span className="script text-[1.15em] text-terracotta">boutique</span></>} watermark="Boutique">
        Chaque pièce est réalisée à la main et personnalisée avec votre texte et
        vos photos. Choisissez, puis commandez en un message.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:py-16">
        <BoutiqueGrid />
      </section>
    </>
  );
}
