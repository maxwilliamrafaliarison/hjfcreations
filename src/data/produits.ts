/* ════════════════════════════════════════════════════════════════════════
   ⭐ CATALOGUE PRODUITS
   Pour AJOUTER un produit : copiez un bloc { … } ci-dessous, modifiez les
   valeurs, et déposez la photo dans le dossier  public/produits/ .
   - categorie : "textile" | "ceramique" | "plastique" | "cadeau"
   - prix      : nombre en Ariary (ex : 20000) ou null si « sur devis »
   - image     : "/produits/mon-image.jpg"  (laissez vide "" si pas encore de photo)
   - populaire : true pour afficher le produit en page d'accueil
   - tags      : ["scolaire"] pour la sélection Collège & Lycée (optionnel)
   ════════════════════════════════════════════════════════════════════════ */

import { formatAr } from "../lib/format";

export type Categorie = "textile" | "ceramique" | "plastique" | "cadeau";

export interface Produit {
  slug: string; // identifiant dans l'URL, ex : "mug-personnalise"
  nom: string;
  categorie: Categorie;
  prix: number | null; // Ariary, ou null = sur devis
  image: string; // "/produits/xxx.jpg" ou "" si pas de photo
  description: string;
  details: string[]; // points clés (matière, personnalisation…)
  populaire?: boolean;
  badge?: string; // ex : "Best-seller", "Nouveau", "Idée cadeau"
  tags?: string[]; // ex : ["scolaire"]
}

export const CATEGORIES: { id: Categorie; label: string }[] = [
  { id: "textile", label: "Textile" },
  { id: "ceramique", label: "Céramique" },
  { id: "plastique", label: "Plastique" },
  { id: "cadeau", label: "Cadeaux" },
];

export const produits: Produit[] = [
  {
    slug: "mug-personnalise",
    nom: "Mug personnalisé",
    categorie: "ceramique",
    prix: 20000,
    image: "/produits/mug-fete-des-meres.jpg",
    description:
      "Le cadeau qui touche le cœur. Ajoutez votre texte (prénom, citation, message) et votre photo pour un mug unique, à offrir ou à garder précieusement.",
    details: [
      "Céramique qualité premium",
      "Personnalisation : votre texte + votre photo",
      "Impression durable par sublimation",
    ],
    populaire: true,
    badge: "Best-seller",
  },
  {
    slug: "mug-magique",
    nom: "Mug magique",
    categorie: "ceramique",
    prix: 30000,
    image: "/produits/mug-magique.jpg",
    description:
      "Un mug noir qui révèle votre photo dès qu'on y verse une boisson chaude. L'effet « waouh » garanti à chaque tasse.",
    details: [
      "Révélation de l'image à la chaleur",
      "Personnalisation : photo + texte",
      "Un cadeau original et surprenant",
    ],
    populaire: true,
    badge: "Nouveau",
  },
  {
    slug: "t-shirt-personnalise",
    nom: "T-shirt personnalisé",
    categorie: "textile",
    prix: 35000,
    image: "/produits/t-shirt.jpg",
    description:
      "Votre design, votre photo ou votre message sur un t-shirt en coton. Idéal pour les événements, les familles, les équipes ou un cadeau qui sort de l'ordinaire.",
    details: [
      "Coton agréable à porter",
      "Sublimation aux couleurs vives et durables",
      "Plusieurs tailles disponibles",
    ],
    populaire: true,
    badge: "Best-seller",
    tags: ["scolaire"],
  },
  {
    slug: "tote-bag-personnalise",
    nom: "Tote bag personnalisé",
    categorie: "textile",
    prix: 25000,
    image: "/produits/tote-bag.jpg",
    description:
      "Un sac en toile pratique et élégant, personnalisé à votre image. Utile au quotidien, parfait en cadeau ou en goodies pour votre marque.",
    details: [
      "Toile résistante",
      "Votre visuel sur une ou deux faces",
      "Réutilisable et écologique",
    ],
    tags: ["scolaire"],
  },
  {
    slug: "coussin-personnalise",
    nom: "Coussin personnalisé",
    categorie: "textile",
    prix: 40000,
    image: "/produits/coussin.jpg",
    description:
      "Un coussin doux imprimé avec vos plus belles photos. Une décoration chaleureuse et un souvenir qui réchauffe l'intérieur.",
    details: [
      "Housse + coussin inclus",
      "Photo et texte personnalisés",
      "Souvenir idéal pour toute la famille",
    ],
    populaire: true,
  },
  {
    slug: "assiette-personnalisee",
    nom: "Assiette personnalisée",
    categorie: "ceramique",
    prix: 30000,
    image: "",
    description:
      "Une assiette en céramique décorée de votre photo ou de votre message. Un objet déco et un cadeau mémorable pour les grandes occasions.",
    details: [
      "Céramique de qualité",
      "Impression nette et durable",
      "Parfait pour anniversaires & fêtes",
    ],
  },
  {
    slug: "gourde-personnalisee",
    nom: "Gourde / bouteille personnalisée",
    categorie: "plastique",
    prix: 35000,
    image: "/produits/gourde.jpg",
    description:
      "Une gourde réutilisable à votre image, pour le sport, l'école ou le bureau. Pratique, utile et 100 % personnalisable.",
    details: [
      "Réutilisable au quotidien",
      "Votre prénom, photo ou logo",
      "Idéale écoles, sport et entreprises",
    ],
    populaire: true,
    tags: ["scolaire"],
  },
  {
    slug: "trousse-personnalisee",
    nom: "Trousse personnalisée",
    categorie: "textile",
    prix: 18000,
    image: "/produits/trousse.jpg",
    description:
      "La trousse qui ne se perd plus : prénom, photo ou motif au choix. Parfaite pour la rentrée des collégiens et lycéens.",
    details: [
      "Tissu résistant, fermeture éclair",
      "Prénom + motif personnalisés",
      "Spéciale rentrée scolaire",
    ],
    badge: "Spécial rentrée",
    tags: ["scolaire"],
  },
  {
    slug: "carnet-personnalise",
    nom: "Carnet / cahier personnalisé",
    categorie: "cadeau",
    prix: 15000,
    image: "/produits/carnet.jpg",
    description:
      "Un carnet à couverture personnalisée avec le prénom ou la photo de l'élève. Pratique pour les cours, élégant pour les notes de tous les jours.",
    details: [
      "Couverture sublimée durable",
      "Prénom, photo ou citation",
      "Idéal collège, lycée & bureau",
    ],
    tags: ["scolaire"],
  },
  {
    slug: "casquette-personnalisee",
    nom: "Casquette personnalisée",
    categorie: "textile",
    prix: 25000,
    image: "",
    description:
      "Une casquette à votre image — prénom, logo ou design. Tendance chez les ados et pratique pour les sorties et le sport.",
    details: [
      "Coton confortable",
      "Broderie ou impression au choix",
      "Style assuré pour les jeunes",
    ],
    tags: ["scolaire"],
  },
  {
    slug: "badge-personnalise",
    nom: "Badge / pin's personnalisé",
    categorie: "plastique",
    prix: 8000,
    image: "",
    description:
      "Un petit badge à épingler sur le sac ou la veste : prénom, photo ou message. Le détail qui personnalise tout, à tout petit prix.",
    details: [
      "Finition brillante",
      "Photo, prénom ou logo",
      "Cadeau-souvenir ou goodies",
    ],
    badge: "Petit prix",
    tags: ["scolaire"],
  },
  {
    slug: "tapis-souris-personnalise",
    nom: "Tapis de souris personnalisé",
    categorie: "plastique",
    prix: 15000,
    image: "",
    description:
      "Un tapis de souris à votre image pour le bureau ou la chambre. Photo, motif ou citation : à vous de choisir.",
    details: [
      "Surface lisse, base antidérapante",
      "Impression nette et colorée",
      "Idéal étudiants & télétravail",
    ],
    tags: ["scolaire"],
  },
  {
    slug: "porte-cles-personnalise",
    nom: "Porte-clés personnalisé",
    categorie: "plastique",
    prix: 10000,
    image: "",
    description:
      "Un petit objet qui fait toujours plaisir : votre photo ou votre message sur un porte-clés à garder toujours avec soi.",
    details: [
      "Petit prix, grand effet",
      "Photo ou texte au choix",
      "Cadeau-souvenir ou goodies",
    ],
    tags: ["scolaire"],
  },
  {
    slug: "puzzle-photo",
    nom: "Puzzle photo",
    categorie: "cadeau",
    prix: 25000,
    image: "",
    description:
      "Transformez votre plus belle photo en puzzle à reconstituer. Un cadeau ludique et original pour petits et grands.",
    details: [
      "Votre photo en puzzle",
      "Activité conviviale à partager",
      "Présenté dans une jolie boîte",
    ],
    badge: "Idée cadeau",
  },
];

/** Renvoie un produit par son slug. */
export function getProduit(slug: string): Produit | undefined {
  return produits.find((p) => p.slug === slug);
}

/** Produits portant une étiquette donnée (ex : "scolaire"). */
export function getByTag(tag: string): Produit[] {
  return produits.filter((p) => p.tags?.includes(tag));
}

/** Libellé de prix affichable, ex : "20 000 Ar" ou "Sur devis". */
export function prixLabel(p: Produit): string {
  if (p.prix === null) return "Sur devis";
  return formatAr(p.prix);
}
