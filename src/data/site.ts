/* ════════════════════════════════════════════════════════════════════════
   ⭐ CONFIGURATION DU SITE — modifiez UNIQUEMENT ce fichier pour mettre à
   jour vos coordonnées. Tout le site (en-tête, pied de page, boutons
   WhatsApp, contact…) lit ces valeurs automatiquement.
   ════════════════════════════════════════════════════════════════════════ */

export const site = {
  /* Identité */
  name: "HJF Créations",
  slogan: "Créé avec passion, offert avec amour",
  metier: "Sublimation sur coton, céramique & plastique",
  description:
    "HJF Créations réalise vos objets personnalisés par sublimation à Antananarivo : mugs, t-shirts, coussins et cadeaux uniques avec votre texte et vos photos. Créé avec passion, offert avec amour.",

  /* Localisation */
  city: "Antananarivo",
  region: "Madagascar",
  delivery: "Livraison à Antananarivo et en province",

  /* Contact */
  email: "hjcreation101@gmail.com",
  phoneDisplay: "+261 32 95 275 96", // affiché à l'écran
  phoneNumber: "261329527596", // utilisé pour les liens tel:
  whatsappNumber: "261329527596", // utilisé pour les liens wa.me (sans + ni espaces)

  /* Infos pratiques */
  hours: "Lundi – Samedi : 8h – 18h",
  responseTime: "Réponse rapide sur WhatsApp",

  /* Moyens de paiement acceptés (affichés sur la page Contact) */
  payments: ["MVola", "Orange Money", "Airtel Money", "Paiement à la livraison"],

  /* Réseaux sociaux — laissez "" si vous n'en avez pas (le lien sera masqué) */
  social: {
    facebook: "", // ex : "https://facebook.com/hjfcreations"
    instagram: "", // ex : "https://instagram.com/hjfcreations"
    tiktok: "", // ex : "https://tiktok.com/@hjfcreations"
  },

  /* Adresse finale du site — à mettre à jour après le déploiement sur Vercel */
  url: "https://hjfcreations.vercel.app",
} as const;

export type Site = typeof site;
