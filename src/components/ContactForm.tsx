"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon, MailIcon } from "@/components/icons";

const SUJETS = [
  "Demande de devis",
  "Passer une commande",
  "Mug personnalisé",
  "T-shirt personnalisé",
  "Cadeau personnalisé",
  "Autre question",
];

const champVide = { prenom: "", nom: "", email: "", tel: "", sujet: "", message: "" };

export default function ContactForm() {
  const [f, setF] = useState(champVide);
  const [erreur, setErreur] = useState("");

  const update =
    (k: keyof typeof f) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF((prev) => ({ ...prev, [k]: e.target.value }));

  function valide() {
    if (!f.prenom.trim() || !f.message.trim()) {
      setErreur("Merci d'indiquer au moins votre prénom et votre message.");
      return false;
    }
    setErreur("");
    return true;
  }

  function composeMessage() {
    const lignes = [`Bonjour ${site.name},`, ""];
    if (f.sujet) lignes.push(`Sujet : ${f.sujet}`);
    lignes.push(`Nom : ${`${f.prenom} ${f.nom}`.trim()}`);
    if (f.email) lignes.push(`Email : ${f.email}`);
    if (f.tel) lignes.push(`Téléphone : ${f.tel}`);
    lignes.push("", f.message);
    return lignes.join("\n");
  }

  function envoyerWhatsApp(e: FormEvent) {
    e.preventDefault();
    if (!valide()) return;
    window.open(whatsappLink(composeMessage()), "_blank", "noopener,noreferrer");
  }

  function envoyerEmail() {
    if (!valide()) return;
    const sujet = encodeURIComponent(f.sujet || `Message de ${f.prenom}`);
    const corps = encodeURIComponent(composeMessage());
    window.location.href = `mailto:${site.email}?subject=${sujet}&body=${corps}`;
  }

  const inputClass =
    "w-full border border-linen bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-terracotta";
  const labelClass =
    "mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-soft";

  return (
    <form onSubmit={envoyerWhatsApp} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="prenom">Prénom *</label>
          <input id="prenom" className={inputClass} value={f.prenom} onChange={update("prenom")} placeholder="Votre prénom" />
        </div>
        <div>
          <label className={labelClass} htmlFor="nom">Nom</label>
          <input id="nom" className={inputClass} value={f.nom} onChange={update("nom")} placeholder="Votre nom" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" type="email" className={inputClass} value={f.email} onChange={update("email")} placeholder="vous@email.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="tel">Téléphone</label>
          <input id="tel" type="tel" className={inputClass} value={f.tel} onChange={update("tel")} placeholder="+261 ..." />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="sujet">Sujet</label>
        <select id="sujet" className={inputClass} value={f.sujet} onChange={update("sujet")}>
          <option value="">— Choisissez un sujet —</option>
          {SUJETS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">Message *</label>
        <textarea id="message" rows={5} className={inputClass} value={f.message} onChange={update("message")} placeholder="Décrivez votre projet, vos idées de personnalisation…" />
      </div>

      {erreur && <p className="text-sm text-rose">{erreur}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="clip-corner inline-flex flex-1 items-center justify-center gap-2.5 bg-whatsapp px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-whatsapp-dark"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Envoyer sur WhatsApp
        </button>
        <button
          type="button"
          onClick={envoyerEmail}
          className="clip-corner inline-flex flex-1 items-center justify-center gap-2.5 border border-ink/20 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          <MailIcon className="h-5 w-5" />
          Envoyer par email
        </button>
      </div>
      <p className="text-xs text-ink-soft">
        Votre message s'ouvrira dans WhatsApp ou votre messagerie, pré-rempli — il
        ne vous reste qu'à l'envoyer.
      </p>
    </form>
  );
}
