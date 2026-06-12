import Link from "next/link";
import { site } from "@/data/site";
import Newsletter from "@/components/Newsletter";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/icons";
import { contactWhatsappLink } from "@/lib/whatsapp";

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="inline-block bg-taupe-soft/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cream">
        {title}
      </span>
      <div className="mt-2 h-0.5 w-16 bg-cream/40" />
      <ul className="mt-5 space-y-3 text-sm text-cream/75">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: site.social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { href: site.social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: site.social.tiktok, Icon: TikTokIcon, label: "TikTok" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-taupe text-cream">
      {/* Bandeau slogan */}
      <div className="border-b border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 sm:px-8 md:flex-row md:items-center">
          <p className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-cream sm:text-4xl">
            Créé avec passion,
            <br />
            <span className="script text-5xl normal-case text-gold sm:text-6xl">offert avec amour</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="eyebrow text-cream/70">Suivez-nous</span>
            <div className="flex gap-2.5">
              <a
                href={contactWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Colonnes */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <FooterCol title="Boutique">
          <li><Link href="/boutique" className="transition-colors hover:text-gold">Tous les produits</Link></li>
          <li><Link href="/boutique?cat=textile" className="transition-colors hover:text-gold">Textile</Link></li>
          <li><Link href="/boutique?cat=ceramique" className="transition-colors hover:text-gold">Céramique</Link></li>
          <li><Link href="/boutique?cat=plastique" className="transition-colors hover:text-gold">Plastique</Link></li>
          <li><Link href="/boutique?cat=cadeau" className="transition-colors hover:text-gold">Cadeaux personnalisés</Link></li>
        </FooterCol>

        <FooterCol title="La maison">
          <li><Link href="/" className="transition-colors hover:text-gold">Accueil</Link></li>
          <li><Link href="/a-propos" className="transition-colors hover:text-gold">Notre histoire</Link></li>
          <li><Link href="/contact" className="transition-colors hover:text-gold">Contact</Link></li>
          <li><Link href="/contact#faq" className="transition-colors hover:text-gold">Questions fréquentes</Link></li>
        </FooterCol>

        <FooterCol title="Contact">
          <li>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 transition-colors hover:text-gold">
              <MailIcon className="h-4 w-4 shrink-0 text-gold" /> {site.email}
            </a>
          </li>
          <li>
            <a href={`tel:+${site.phoneNumber}`} className="flex items-center gap-2.5 transition-colors hover:text-gold">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold" /> {site.phoneDisplay}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <MapPinIcon className="h-4 w-4 shrink-0 text-gold" /> {site.city}, {site.region}
          </li>
        </FooterCol>

        <div>
          <span className="inline-block bg-taupe-soft/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cream">
            Nouveautés
          </span>
          <div className="mt-2 h-0.5 w-16 bg-cream/40" />
          <p className="mt-5 text-sm text-cream/75">
            Recevez nos nouvelles créations et offres.
          </p>
          <div className="mt-4">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Paiement + copyright */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-cream/55 sm:flex-row sm:px-8">
          <p>© {year} {site.name} — {site.city}, {site.region}. Tous droits réservés.</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {site.payments.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
