import type { Metadata } from "next";
import { site } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { contactWhatsappLink } from "@/lib/whatsapp";
import {
  WhatsAppIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez HJF Créations à Antananarivo par WhatsApp ou email pour vos commandes et cadeaux personnalisés. Paiement Mobile Money ou à la livraison.",
};

export default function ContactPage() {
  const coordonnees = [
    { Icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: PhoneIcon, label: "Téléphone / WhatsApp", value: site.phoneDisplay, href: `tel:+${site.phoneNumber}` },
    { Icon: MapPinIcon, label: "Localisation", value: `${site.city}, ${site.region}` },
    { Icon: ClockIcon, label: "Disponibilités", value: site.hours },
  ];

  return (
    <>
      <PageHeader
        label="Parlons de votre projet"
        title={<><span className="script text-[1.1em] text-terracotta">Contactez</span>-nous</>}
        watermark="Contact"
      >
        Une question, une commande, un cadeau sur mesure ? Nous sommes à votre
        écoute — la réponse la plus rapide est sur WhatsApp.
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:py-16">
        {/* Coordonnées */}
        <div>
          <h2 className="font-display text-2xl text-ink">Nous sommes là pour vous</h2>
          <p className="mt-2 text-ink-soft">
            Écrivez-nous directement, nous répondons avec plaisir.
          </p>

          <ul className="mt-7 space-y-4">
            {coordonnees.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-terracotta">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</p>
                  {href ? (
                    <a href={href} className="link-underline text-ink">{value}</a>
                  ) : (
                    <p className="text-ink">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Paiement */}
          <div className="mt-8 border-l-2 border-gold bg-ivory p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Moyens de paiement
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {site.payments.map((p) => (
                <span key={p} className="bg-sand px-3 py-1.5 text-xs font-medium text-ink">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Gros bouton WhatsApp */}
          <a
            href={contactWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="clip-corner mt-6 flex items-center justify-center gap-2.5 bg-whatsapp px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Discuter sur WhatsApp
          </a>
        </div>

        {/* Formulaire */}
        <div className="bg-ivory p-6 shadow-sm ring-1 ring-linen sm:p-8">
          <h2 className="font-display text-2xl text-ink">Envoyez-nous un message</h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            Les champs marqués d'un * sont obligatoires.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
