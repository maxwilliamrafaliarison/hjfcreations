import type { Metadata } from "next";
import Link from "next/link";
import { getProduits, getTemoignages, getEvenementActif } from "@/lib/content";

export const metadata: Metadata = { title: "Tableau de bord" };

export default async function AdminDashboard() {
  const [produits, avis, evenement] = await Promise.all([
    getProduits(),
    getTemoignages(),
    getEvenementActif(),
  ]);

  const cartes = [
    {
      href: "/admin/contact",
      titre: "Contact & coordonnées",
      texte: "Téléphone, WhatsApp, email, horaires, réseaux sociaux, paiements.",
      info: "Le plus important",
    },
    {
      href: "/admin/produits",
      titre: "Produits & tarifs",
      texte: "Ajouter, modifier ou retirer des produits, changer les prix en Ariary, téléverser des photos.",
      info: `${produits.length} produit${produits.length > 1 ? "s" : ""}`,
    },
    {
      href: "/admin/avis",
      titre: "Avis clients",
      texte: "Publier les retours de vos clients sur la page d'accueil.",
      info: `${avis.length} avis visibles`,
    },
    {
      href: "/admin/evenements",
      titre: "Événements & promos",
      texte: "Mettre en avant une offre (Fête des mères, rentrée…) sur l'accueil.",
      info: evenement ? `Actif : ${evenement.titre}` : "Aucun événement actif",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-ink">
        Bienvenue 👋
      </h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Modifiez le contenu du site ici — les changements sont visibles
        immédiatement sur le site public.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {cartes.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group bg-ivory p-5 ring-1 ring-linen transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-terracotta"
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold-dark">
              {c.info}
            </p>
            <h2 className="mt-1.5 text-lg font-extrabold uppercase tracking-tight text-ink group-hover:text-terracotta">
              {c.titre}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{c.texte}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 border-l-2 border-gold bg-ivory p-4 text-sm leading-relaxed text-ink-soft">
        💡 Astuce : après une modification, ouvrez « Voir le site » pour
        vérifier le résultat. Sur mobile, tirez la page vers le bas pour
        rafraîchir.
      </p>
    </div>
  );
}
