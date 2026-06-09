/* ════════════════════════════════════════════════════════════════════════
   ⭐ AVIS CLIENTS
   Ajoutez / modifiez librement. Affichés sur la page d'accueil.
   (Ces avis sont des exemples réalistes à remplacer par de vrais retours.)
   ════════════════════════════════════════════════════════════════════════ */

export interface Temoignage {
  texte: string;
  auteur: string;
  contexte: string;
}

export const temoignages: Temoignage[] = [
  // — Antananarivo / Madagascar —
  { texte: "Le mug avec la photo de ma maman était parfait — qualité irréprochable et livré en 24h à Tana. Merci HJF !", auteur: "Mirana R.", contexte: "Antananarivo" },
  { texte: "J'ai commandé des t-shirts assortis pour toute la famille. Les couleurs sont éclatantes et le travail très soigné.", auteur: "Tojo A.", contexte: "Antananarivo" },
  { texte: "Des créations vraiment uniques et un service à l'écoute. Mon cadeau a fait sensation lors de l'anniversaire.", auteur: "Hanta N.", contexte: "Antananarivo" },
  { texte: "La gourde au prénom de mon fils est solide et superbe — parfaite pour ses journées au collège.", auteur: "Rivo M.", contexte: "Parent d'élève, Tana" },
  { texte: "Un coussin avec nos photos de famille : un souvenir magnifique qui trône maintenant dans le salon.", auteur: "Lalaina R.", contexte: "Antananarivo" },
  { texte: "Trousses et carnets personnalisés pour la rentrée de mes enfants : ils les adorent et s'y retrouvent facilement !", auteur: "Soa R.", contexte: "Maman, Antananarivo" },
  { texte: "Petit budget, grand effet : le porte-clés au prénom de ma fille est devenu son objet préféré.", auteur: "Naina H.", contexte: "Antananarivo" },
  { texte: "Commande rapide, accueil chaleureux et finitions impeccables. Je recommande les yeux fermés.", auteur: "Tiana V.", contexte: "Antananarivo" },
  { texte: "Le mug magique a bluffé tout le monde : la photo apparaît avec le café chaud, effet garanti !", auteur: "Andry F.", contexte: "Antananarivo" },
  { texte: "J'ai fait floquer des tote bags à mon logo pour ma boutique : rendu très pro, mes clientes adorent.", auteur: "Niry A.", contexte: "Commerçante, Tana" },
  { texte: "Une assiette personnalisée pour les 60 ans de mon père — élégante et parfaitement imprimée.", auteur: "Voahangy R.", contexte: "Antananarivo" },
  { texte: "Toujours à l'écoute, des conseils utiles et un résultat à la hauteur. Bravo à toute l'équipe.", auteur: "Faniry M.", contexte: "Antananarivo" },
  { texte: "Badge et tapis de souris personnalisés à mon style : stylé, pas cher, parfait pour mon bureau.", auteur: "Mialy R.", contexte: "Étudiante, Antananarivo" },
  { texte: "Un coffret de cadeaux personnalisés pour ma femme : merci, tout était soigné jusqu'au moindre détail.", auteur: "Hery N.", contexte: "Antananarivo" },

  // — Français / Lycée Français de Tananarive —
  { texte: "Gourde au prénom de mon fils pour le Lycée Français : qualité au top, et plus jamais de gourde perdue !", auteur: "Camille D.", contexte: "Parent — Lycée Français de Tananarive" },
  { texte: "La qualité d'impression du t-shirt personnalisé m'a bluffé, bien au-delà de ce que j'imaginais.", auteur: "Julien P.", contexte: "Antananarivo" },
  { texte: "Trousses assorties pour mes trois enfants : la rentrée la plus réussie, et un service adorable.", auteur: "Sophie L.", contexte: "Maman au LFT" },
  { texte: "Mug photo de famille commandé en quelques minutes, livré nickel. Exactement ce que je voulais.", auteur: "Antoine B.", contexte: "Expatrié, Antananarivo" },
  { texte: "Cadeau de départ pour une amie : élégant, personnel et émouvant. Elle a adoré, moi aussi.", auteur: "Léa M.", contexte: "Tananarive" },
  { texte: "Casquette et tote bag personnalisés : mes ados les portent tous les jours. Pari réussi !", auteur: "Thomas R.", contexte: "Parent — Lycée Français" },

  // — Afrique (autres pays) —
  { texte: "Commandé à distance depuis Dakar pour un proche à Tana : communication parfaite et résultat superbe.", auteur: "Aminata D.", contexte: "Dakar, Sénégal" },
  { texte: "Des t-shirts d'équipe aux couleurs vives pour notre association — qualité et délais au rendez-vous.", auteur: "Kwame O.", contexte: "Accra, Ghana" },
  { texte: "Un mug personnalisé offert à ma sœur : elle a été émue, et l'impression est nette et durable.", auteur: "Fatou S.", contexte: "Abidjan, Côte d'Ivoire" },
  { texte: "Service sérieux et créations de belle qualité. Je repasserai commande sans hésiter.", auteur: "Boubacar T.", contexte: "Bamako, Mali" },
];
