import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { majContact } from "@/app/admin/actions";
import { Notice, inputClass, labelClass, btnPrimaire } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Contact & coordonnées" };

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <fieldset className="bg-ivory p-5 ring-1 ring-linen sm:p-6">
      <legend className="bg-taupe px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cream">
        {titre}
      </legend>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ succes?: string; erreur?: string }>;
}) {
  const [site, { succes, erreur }] = await Promise.all([getSite(), searchParams]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-ink">
        Contact & coordonnées
      </h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Ces informations alimentent tout le site : boutons WhatsApp, pied de
        page, page contact, référencement Google.
      </p>

      <div className="mt-6">
        <Notice
          succes={succes ? "Coordonnées enregistrées — le site est à jour." : undefined}
          erreur={erreur}
        />
      </div>

      <form action={majContact} className="space-y-6">
        <Section titre="Identité">
          <div>
            <label className={labelClass} htmlFor="name">Nom de la boutique *</label>
            <input id="name" name="name" required defaultValue={site.name} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="slogan">Slogan *</label>
            <input id="slogan" name="slogan" required defaultValue={site.slogan} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="metier">Métier (sous-titre) *</label>
            <input id="metier" name="metier" required defaultValue={site.metier} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="description">Description (référencement Google) *</label>
            <textarea id="description" name="description" required rows={3} defaultValue={site.description} className={inputClass} />
          </div>
        </Section>

        <Section titre="Contact">
          <div>
            <label className={labelClass} htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required defaultValue={site.email} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="phoneDisplay">Téléphone affiché *</label>
            <input id="phoneDisplay" name="phoneDisplay" required defaultValue={site.phoneDisplay} className={inputClass} placeholder="+261 32 95 275 96" />
          </div>
          <div>
            <label className={labelClass} htmlFor="phoneNumber">Numéro pour les appels (chiffres uniquement) *</label>
            <input id="phoneNumber" name="phoneNumber" required defaultValue={site.phoneNumber} className={inputClass} placeholder="261329527596" />
          </div>
          <div>
            <label className={labelClass} htmlFor="whatsappNumber">Numéro WhatsApp (chiffres uniquement) *</label>
            <input id="whatsappNumber" name="whatsappNumber" required defaultValue={site.whatsappNumber} className={inputClass} placeholder="261329527596" />
          </div>
        </Section>

        <Section titre="Localisation & disponibilités">
          <div>
            <label className={labelClass} htmlFor="city">Ville *</label>
            <input id="city" name="city" required defaultValue={site.city} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="region">Pays / région *</label>
            <input id="region" name="region" required defaultValue={site.region} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="delivery">Phrase de livraison *</label>
            <input id="delivery" name="delivery" required defaultValue={site.delivery} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="hours">Horaires *</label>
            <input id="hours" name="hours" required defaultValue={site.hours} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="responseTime">Délai de réponse *</label>
            <input id="responseTime" name="responseTime" required defaultValue={site.responseTime} className={inputClass} />
          </div>
        </Section>

        <Section titre="Moyens de paiement">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="payments">Un moyen de paiement par ligne</label>
            <textarea id="payments" name="payments" rows={4} defaultValue={site.payments.join("\n")} className={inputClass} />
          </div>
        </Section>

        <Section titre="Réseaux sociaux (laisser vide pour masquer)">
          <div>
            <label className={labelClass} htmlFor="facebook">Facebook (lien complet)</label>
            <input id="facebook" name="facebook" type="url" defaultValue={site.social.facebook} className={inputClass} placeholder="https://facebook.com/votrepage" />
          </div>
          <div>
            <label className={labelClass} htmlFor="instagram">Instagram (lien complet)</label>
            <input id="instagram" name="instagram" type="url" defaultValue={site.social.instagram} className={inputClass} placeholder="https://instagram.com/votrecompte" />
          </div>
          <div>
            <label className={labelClass} htmlFor="tiktok">TikTok (lien complet)</label>
            <input id="tiktok" name="tiktok" type="url" defaultValue={site.social.tiktok} className={inputClass} placeholder="https://tiktok.com/@votrecompte" />
          </div>
        </Section>

        <button type="submit" className={`${btnPrimaire} w-full sm:w-auto`}>
          💾 Enregistrer les coordonnées
        </button>
      </form>
    </div>
  );
}
