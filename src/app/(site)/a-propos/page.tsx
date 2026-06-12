import type { Metadata } from "next";
import Image from "next/image";
import { getSite } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import { contactWhatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon, SparkleIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "HJF Créations, l'artisanat de la sublimation à Antananarivo : des objets personnalisés faits avec passion, offerts avec amour.",
  alternates: { canonical: "/a-propos" },
};

const valeurs = [
  { titre: "Passion", texte: "Chaque création est réalisée avec soin et amour du détail." },
  { titre: "Qualité", texte: "Des matières premium et une sublimation durable dans le temps." },
  { titre: "Personnalisation", texte: "Vos textes, vos photos, vos idées — au cœur de chaque pièce." },
  { titre: "Proximité", texte: "Un service à l'écoute, à Antananarivo et partout à Madagascar." },
];

export default async function AProposPage() {
  const site = await getSite();

  return (
    <>
      <PageHeader
        label="Notre histoire"
        title={<>À <span className="script text-[1.15em] text-terracotta">propos</span></>}
        watermark="HJF"
      >
        L'art du transfert, sublimé à la main.
      </PageHeader>

      {/* Histoire */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow text-gold-dark">{site.name}</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
            Un savoir-faire artisanal au cœur de chaque création
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p>
              Chez {site.name}, nous transformons les objets du quotidien en
              cadeaux qui ont du sens. Passionnés par la sublimation, nous
              appliquons vos motifs, vos textes et vos photos sur le coton, la
              céramique et le plastique pour créer des pièces uniques.
            </p>
            <p>
              Que ce soit pour offrir un cadeau original, marquer un moment
              important ou habiller un événement, chaque commande est réalisée
              avec passion et un véritable souci du détail.
            </p>
            <p className="script text-4xl text-terracotta">{site.slogan}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-br from-gold/15 to-terracotta/10 blur-2xl" />
            <Image
              src="/logo.jpg"
              alt={site.name}
              width={400}
              height={400}
              className="w-[min(340px,75vw)] rounded-full shadow-2xl shadow-ink/10 ring-1 ring-gold/30"
            />
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20">
          <div className="text-center">
            <p className="eyebrow text-gold-dark">Ce qui nous guide</p>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
              Nos valeurs
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valeurs.map((v) => (
              <div key={v.titre} className="border-l-2 border-gold bg-ivory p-6">
                <SparkleIcon className="h-6 w-6 text-gold" />
                <h3 className="mt-3 text-xl font-extrabold uppercase tracking-tight text-ink">{v.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-8">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-cream sm:text-4xl">
            Envie d'une création <span className="script normal-case text-gold">à votre image</span> ?
          </h2>
          <p className="mt-4 text-lg text-cream/70">
            Écrivez-nous sur WhatsApp, nous vous répondons rapidement.
          </p>
          <a
            href={contactWhatsappLink(site)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--wa mt-8"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Discuter de mon projet
          </a>
        </div>
      </section>
    </>
  );
}
