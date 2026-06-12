/** Coordonnées minimales nécessaires aux liens WhatsApp. */
export interface ContactWhatsApp {
  name: string;
  whatsappNumber: string; // sans + ni espaces, ex : "261329527596"
}

/** Construit un lien WhatsApp (wa.me) avec un message pré-rempli. */
export function whatsappLink(numero: string, message: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

/** Lien « Commander » pré-rempli pour un produit donné. */
export function orderWhatsappLink(
  contact: ContactWhatsApp,
  produitNom: string,
  prixLabel?: string,
): string {
  const lignes = [
    `Bonjour ${contact.name} 👋`,
    "",
    `Je souhaite commander : *${produitNom}*${prixLabel ? ` — ${prixLabel}` : ""}.`,
    "Pouvez-vous me préciser la personnalisation, le paiement et la livraison ?",
  ];
  return whatsappLink(contact.whatsappNumber, lignes.join("\n"));
}

/** Lien de contact général pré-rempli. */
export function contactWhatsappLink(contact: ContactWhatsApp): string {
  return whatsappLink(
    contact.whatsappNumber,
    `Bonjour ${contact.name} 👋\nJ'aimerais avoir des renseignements.`,
  );
}

/** Lien « demande de devis » pré-rempli. */
export function devisWhatsappLink(contact: ContactWhatsApp): string {
  return whatsappLink(
    contact.whatsappNumber,
    `Bonjour ${contact.name} 👋\nJ'ai un projet personnalisé et j'aimerais un devis.`,
  );
}
