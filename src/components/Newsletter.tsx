"use client";

import { useState, type FormEvent } from "react";
import type { SiteData } from "@/data/site";

export default function Newsletter({ site }: { site: SiteData }) {
  const [email, setEmail] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Inscription aux nouveautés ${site.name}`);
    const body = encodeURIComponent(
      `Bonjour ${site.name},\nJe souhaite recevoir vos nouveautés et offres.\nMon email : ${email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        aria-label="Votre email"
        className="min-w-0 flex-1 border-2 border-cream/30 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/50 outline-none focus:border-cream"
      />
      <button type="submit" className="btn btn--light !px-5">
        S'inscrire
      </button>
    </form>
  );
}
