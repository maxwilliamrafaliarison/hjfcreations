import { getSite } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/** Coquille du site public : en-tête, pied de page, bouton WhatsApp, JSON-LD. */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSite();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.name,
    image: `${site.url}/logo.jpg`,
    description: site.description,
    slogan: site.slogan,
    telephone: `+${site.phoneNumber}`,
    email: site.email,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "MG",
    },
    areaServed: `${site.city}, ${site.region}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Aller au contenu
      </a>
      <Header site={site} />
      <main id="contenu" className="flex-1">{children}</main>
      <Footer site={site} />
      <WhatsAppFloat site={site} />
    </>
  );
}
