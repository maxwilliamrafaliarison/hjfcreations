"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";
import { contactWhatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon, MenuIcon, CloseIcon } from "@/components/icons";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-linen bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo.jpg"
            alt={site.name}
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/40"
          />
          <span className="leading-none">
            <span className="block text-lg font-extrabold uppercase tracking-[0.12em] text-ink">HJF</span>
            <span className="script -mt-1 block text-xl text-terracotta">Créations</span>
          </span>
        </Link>

        {/* Navigation bureau */}
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-terracotta ${
                isActive(pathname, item.href) ? "text-terracotta" : "text-taupe"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contactWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--wa hidden !px-4 !py-2.5 sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Commander
          </a>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-linen bg-cream px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-colors ${
                    isActive(pathname, item.href) ? "bg-sand text-terracotta" : "text-taupe hover:bg-sand"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={contactWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--wa w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Commander sur WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
