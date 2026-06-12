/* ════════════════════════════════════════════════════════════════════════
   Événement / promotion mis en avant sur la page d'accueil.
   Cette valeur par défaut sert de contenu de secours (et de seed) tant que
   l'administration n'a pas créé son propre événement.
   ════════════════════════════════════════════════════════════════════════ */

export interface Evenement {
  id?: string;
  titre: string; // affiché en capitales, ex : "Un cadeau qui vient"
  titreScript: string; // suite du titre en écriture manuscrite, ex : "du cœur"
  accroche: string; // petit sur-titre, ex : "Idées cadeaux"
  description: string;
  image: string; // chemin local ou URL
  actif: boolean;
  dateDebut?: string | null; // "AAAA-MM-JJ" ou null = toujours
  dateFin?: string | null;
}

export const evenementParDefaut: Evenement = {
  titre: "Un cadeau qui vient",
  titreScript: "du cœur",
  accroche: "Idées cadeaux",
  description:
    "Mugs, t-shirts et objets personnalisés avec votre texte et vos plus belles photos. La touche personnelle qui fait toute la différence — pour la fête des mères, un anniversaire ou simplement faire plaisir.",
  image: "/campagne-fete-des-meres.jpg",
  actif: true,
};
