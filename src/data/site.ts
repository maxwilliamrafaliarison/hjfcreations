/* ════════════════════════════════════════════════════════════════════════
   ⭐ CONFIGURATION DU SITE — valeurs par défaut.
   Une fois l'administration en place (/admin/contact), ces informations
   sont modifiables en ligne et stockées en base : ce fichier sert alors de
   contenu de secours (et de valeurs initiales pour le seed).
   ════════════════════════════════════════════════════════════════════════ */

export interface SiteData {
  /* Identité */
  name: string;
  slogan: string;
  metier: string;
  description: string;

  /* Localisation */
  city: string;
  region: string;
  delivery: string;

  /* Contact */
  email: string;
  phoneDisplay: string; // affiché à l'écran
  phoneNumber: string; // pour les liens tel: (sans + ni espaces)
  whatsappNumber: string; // pour les liens wa.me (sans + ni espaces)

  /* Infos pratiques */
  hours: string;
  responseTime: string;

  /* Moyens de paiement acceptés */
  payments: string[];

  /* Réseaux sociaux — "" = masqué */
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };

  /* Adresse du site (SEO) */
  url: string;
}

export const site: SiteData = {
  name: "HJF Créations",
  slogan: "Créé avec passion, offert avec amour",
  metier: "Sublimation sur coton, céramique & plastique",
  description:
    "HJF Créations réalise vos objets personnalisés par sublimation à Antananarivo : mugs, t-shirts, coussins et cadeaux uniques avec votre texte et vos photos. Créé avec passion, offert avec amour.",

  city: "Antananarivo",
  region: "Madagascar",
  delivery: "Livraison à Antananarivo et en province",

  email: "hjcreation101@gmail.com",
  phoneDisplay: "+261 32 95 275 96",
  phoneNumber: "261329527596",
  whatsappNumber: "261329527596",

  hours: "Lundi – Samedi : 8h – 18h",
  responseTime: "Réponse rapide sur WhatsApp",

  payments: ["MVola", "Orange Money", "Airtel Money", "Paiement à la livraison"],

  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },

  url: "https://hjfcreations.vercel.app",
};

export type Site = SiteData;
