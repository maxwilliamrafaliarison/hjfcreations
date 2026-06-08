import { site } from "@/data/site";
import { type Produit, prixLabel } from "@/data/produits";
import { orderWhatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon, MailIcon } from "@/components/icons";

/** Boutons « Commander » pour une fiche produit (WhatsApp + email). */
export default function OrderButtons({ produit }: { produit: Produit }) {
  const label = prixLabel(produit);

  const mailSubject = encodeURIComponent(`Commande : ${produit.nom}`);
  const mailBody = encodeURIComponent(
    `Bonjour ${site.name},\n\nJe souhaite commander : ${produit.nom} (${label}).\nMerci de me préciser la personnalisation, le paiement et la livraison.\n\nCordialement,`,
  );
  const mailHref = `mailto:${site.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={orderWhatsappLink(produit.nom, label)}
        target="_blank"
        rel="noopener noreferrer"
        className="clip-corner inline-flex flex-1 items-center justify-center gap-2.5 bg-whatsapp px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-whatsapp-dark"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Commander sur WhatsApp
      </a>
      <a
        href={mailHref}
        className="clip-corner inline-flex flex-1 items-center justify-center gap-2.5 border border-ink/20 bg-transparent px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream"
      >
        <MailIcon className="h-5 w-5" />
        Par email
      </a>
    </div>
  );
}
