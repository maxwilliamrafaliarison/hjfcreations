import { site } from "@/data/site";

/** Construit un lien WhatsApp (wa.me) avec un message pré-rempli. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Lien « Commander » pré-rempli pour un produit donné. */
export function orderWhatsappLink(produitNom: string, prixLabel?: string): string {
  const lignes = [
    `Bonjour ${site.name} 👋`,
    "",
    `Je souhaite commander : *${produitNom}*${prixLabel ? ` — ${prixLabel}` : ""}.`,
    "Pouvez-vous me préciser la personnalisation, le paiement et la livraison ?",
  ];
  return whatsappLink(lignes.join("\n"));
}

/** Lien de contact général pré-rempli. */
export function contactWhatsappLink(): string {
  return whatsappLink(`Bonjour ${site.name} 👋\nJ'aimerais avoir des renseignements.`);
}

/** Lien « demande de devis » pré-rempli. */
export function devisWhatsappLink(): string {
  return whatsappLink(
    `Bonjour ${site.name} 👋\nJ'ai un projet personnalisé et j'aimerais un devis.`,
  );
}
