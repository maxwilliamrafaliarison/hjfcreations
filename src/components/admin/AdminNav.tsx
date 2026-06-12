"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LIENS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/avis", label: "Avis" },
  { href: "/admin/evenements", label: "Événements" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap">
        {LIENS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`block whitespace-nowrap px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive(pathname, l.href)
                  ? "bg-terracotta text-white"
                  : "bg-ivory text-taupe ring-1 ring-linen hover:text-terracotta"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
