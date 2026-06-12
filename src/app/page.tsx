import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { produits, getByTag } from "@/data/produits";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";
import MemphisPattern from "@/components/MemphisPattern";
import Testimonials from "@/components/Testimonials";
import { devisWhatsappLink, contactWhatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon, ArrowRightIcon, MailIcon, SparkleIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const populaires = produits.filter((p) => p.populaire).slice(0, 4);
const scolaires = getByTag("scolaire").slice(0, 4);

const collections = [
  { id: "textile", label: "Textile", image: "/produits/coll-textile.jpg" },
  { id: "ceramique", label: "Céramique", image: "/produits/coll-ceramique.jpg" },
  { id: "plastique", label: "Plastique", image: "/produits/coll-plastique.jpg" },
  { id: "cadeau", label: "Cadeaux", image: "/produits/coll-cadeau.jpg" },
];

const matieres = [
  { titre: "Textile", texte: "T-shirts, tote bags, coussins — le coton sublimé, doux et coloré." },
  { titre: "Céramique", texte: "Mugs, assiettes — des motifs élégants qui durent dans le temps." },
  { titre: "Plastique", texte: "Gourdes, porte-clés, objets du quotidien à votre image." },
  { titre: "Sur mesure", texte: "Une idée précise ? Nous la réalisons sur devis, de A à Z." },
];

const etapes = [
  { num: "1", titre: "Choisissez", texte: "Parcourez la boutique et sélectionnez votre création." },
  { num: "2", titre: "Personnalisez", texte: "Envoyez votre texte et vos photos sur WhatsApp." },
  { num: "3", titre: "Recevez", texte: "Payez par Mobile Money ou à la livraison, puis on vous livre." },
];

export default function Home() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute right-[-6%] top-[-30%] h-[70vh] w-[70vh] rounded-full bg-gradient-to-br from-gold/20 via-sand to-cream blur-2xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-gold-dark">
              <span className="h-0.5 w-10 bg-terracotta" />
              Sublimation artisanale · {site.city}
            </p>
            <h1 className="mt-5 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-ink sm:text-7xl">
              Des cadeaux
              <span className="script my-1 block text-7xl normal-case text-terracotta sm:text-8xl">
                uniques
              </span>
              à votre image
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-taupe">
              Mugs, t-shirts et objets personnalisés par sublimation avec votre
              texte et vos photos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/boutique" className="btn btn--terracotta">
                Voir la boutique
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href={contactWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--line text-ink"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Commander
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <span className="absolute -left-4 top-6 h-7 w-7 rounded-full bg-teal" />
              <span className="absolute right-2 top-0 h-4 w-4 rounded-full bg-rose" />
              <span className="absolute -bottom-2 left-10 h-5 w-5 rounded-full bg-gold" />
              <span className="absolute bottom-10 -right-3 h-6 w-6 rounded-full bg-sky" />
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-br from-gold/20 to-terracotta/15 blur-2xl" />
              <Image
                src="/logo.jpg"
                alt={site.name}
                width={440}
                height={440}
                priority
                className="w-[min(360px,72vw)] animate-float rounded-full shadow-2xl shadow-ink/15 ring-4 ring-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <Marquee
        items={[
          "Créé avec passion",
          "Offert avec amour",
          "Texte + photo personnalisés",
          "Livraison à Tana & en province",
          "Paiement Mobile Money",
        ]}
      />

      {/* ═══════════ COLLECTIONS (tuiles rondes) ═══════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 md:py-20">
        <p className="eyebrow text-gold-dark">Explorez</p>
        <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
          Nos collections
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {collections.map((c) => (
            <Link key={c.id} href={`/boutique?cat=${c.id}`} className="group flex flex-col items-center gap-4">
              <span className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-32">
                <Image src={c.image} alt={c.label} fill sizes="128px" className="object-cover" />
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-ink group-hover:text-terracotta">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════ POPULAIRES ═══════════ */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold-dark">Nos créations</p>
              <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
                Les plus appréciés
              </h2>
            </div>
            <Link href="/boutique" className="btn btn--line text-ink">
              Toute la boutique
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {populaires.map((p) => (
              <ProductCard key={p.slug} produit={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURE : FÊTE DES MÈRES ═══════════ */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-20">
        <div className="relative mx-auto w-full max-w-md overflow-hidden ring-1 ring-linen">
          <Image
            src="/campagne-fete-des-meres.jpg"
            alt="Collection Fête des Mères — HJF Créations"
            width={512}
            height={768}
            className="h-auto w-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow text-gold-dark">Idées cadeaux</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
            Un cadeau qui vient
            <span className="script block text-5xl normal-case text-terracotta sm:text-6xl">
              du cœur
            </span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-taupe">
            Mugs, t-shirts et objets personnalisés avec votre texte et vos plus
            belles photos. La touche personnelle qui fait toute la différence —
            pour la fête des mères, un anniversaire ou simplement faire plaisir.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/boutique" className="btn btn--terracotta">
              Découvrir
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ SPÉCIAL COLLÈGE & LYCÉE ═══════════ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold-dark">Spécial rentrée</p>
              <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
                Collège &amp; Lycée
              </h2>
              <p className="mt-3 max-w-xl text-taupe">
                À deux pas du Lycée Français de Tananarive : gourdes, trousses,
                carnets et casquettes au prénom de votre enfant — plus rien ne se
                perd, et tout a du style.
              </p>
            </div>
            <Link href="/boutique" className="btn btn--line text-ink">
              Voir tout
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {scolaires.map((p) => (
              <ProductCard key={p.slug} produit={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SAVOIR-FAIRE ═══════════ */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20">
          <div className="text-center">
            <p className="eyebrow text-gold">Notre savoir-faire</p>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-cream sm:text-5xl">
              La sublimation, sur toutes vos surfaces
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {matieres.map((m) => (
              <div key={m.titre} className="border-t-2 border-gold pt-5">
                <SparkleIcon className="h-7 w-7 text-gold" />
                <h3 className="mt-3 text-xl font-extrabold uppercase tracking-tight text-cream">
                  {m.titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{m.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMMENT COMMANDER (motif coloré) ═══════════ */}
      <section className="relative overflow-hidden bg-cream">
        <MemphisPattern className="absolute inset-0 h-full w-full opacity-[0.5]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24">
          <div className="text-center">
            <p className="eyebrow text-gold-dark">Simple & rapide</p>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
              Commander en 3 étapes
            </h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {etapes.map((e) => (
              <div key={e.num} className="rounded-sm bg-ivory/90 p-7 text-center shadow-sm ring-1 ring-linen backdrop-blur">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-2xl font-extrabold text-white">
                  {e.num}
                </div>
                <h3 className="mt-4 text-xl font-extrabold uppercase tracking-tight text-ink">
                  {e.titre}
                </h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-taupe">{e.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TÉMOIGNAGES ═══════════ */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20">
          <div className="text-center">
            <p className="eyebrow text-gold-dark">Ils nous font confiance</p>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
              Vos plus beaux moments
            </h2>
          </div>
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ═══════════ BANDEAU LIVRAISON ═══════════ */}
      <section className="bg-taupe text-cream">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center sm:px-8">
          <p className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
            Livraison à {site.city} & en province
          </p>
          <p className="mt-1 text-cream/70">
            Paiement Mobile Money (MVola, Orange, Airtel) ou à la livraison.
          </p>
        </div>
      </section>

      {/* ═══════════ CTA DEVIS ═══════════ */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-[18rem] font-extrabold uppercase tracking-tighter text-white/[0.03]">HJF</span>
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:px-8 md:py-20">
          <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-cream sm:text-5xl">
            Un projet
            <span className="script mx-3 normal-case text-gold">sur mesure</span> ?
          </h2>
          <p className="mt-4 text-lg text-cream/70">
            Anniversaire, mariage, entreprise, cadeau surprise… Parlez-nous de
            votre idée, nous la réalisons.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={devisWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Demander un devis
            </a>
            <a href={`mailto:${site.email}`} className="btn btn--line text-gold">
              <MailIcon className="h-5 w-5" />
              Nous écrire
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
