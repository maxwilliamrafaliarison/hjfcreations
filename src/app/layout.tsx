import type { Metadata } from "next";
import { Jost, Sacramento } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/content";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jost",
  display: "swap",
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sacramento",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.metier}`,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    keywords: [
      site.name,
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
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.metier}`,
      description: site.description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${jost.variable} ${sacramento.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
