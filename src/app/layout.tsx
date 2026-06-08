import type { Metadata } from "next";
import { Jost, Sacramento } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jost",
  display: "swap",
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sacramento",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.metier}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "HJF Créations",
    "sublimation Madagascar",
    "mug personnalisé Antananarivo",
    "cadeau personnalisé Madagascar",
    "t-shirt personnalisé Tana",
    "objet personnalisé Antananarivo",
    "impression textile céramique Madagascar",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: `${site.name} — ${site.metier}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/campagne-fete-des-meres.jpg", width: 512, height: 768, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.metier}`,
    description: site.description,
    images: ["/campagne-fete-des-meres.jpg"],
  },
  alternates: { canonical: "/" },
};

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${jost.variable} ${sacramento.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
