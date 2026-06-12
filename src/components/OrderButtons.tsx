import type { SiteData } from "@/data/site";
import { type Produit, prixLabel } from "@/data/produits";
import { orderWhatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon, MailIcon } from "@/components/icons";

/** Boutons « Commander » pour une fiche produit (WhatsApp + email). */
export default function OrderButtons({
  produit,
  site,
}: {
  produit: Produit;
  site: SiteData;
}) {
  const label = prixLabel(produit);

  const mailSubject = encodeURIComponent(`Commande : ${produit.nom}`);
  const mailBody = encodeURIComponent(
    `Bonjour ${site.name},\n\nJe souhaite commander : ${produit.nom} (${label}).\nMerci de me préciser la personnalisation, le paiement et la livraison.\n\nCordialement,`,
  );
  const mailHref = `mailto:${site.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={orderWhatsappLink(site, produit.nom, label)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--wa flex-1"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Commander sur WhatsApp
      </a>
      <a href={mailHref} className="btn btn--line flex-1 text-ink">
        <MailIcon className="h-5 w-5" />
        Par email
      </a>
    </div>
  );
}
