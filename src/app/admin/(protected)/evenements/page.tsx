import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { creerEvenement, majEvenement, supprimerEvenement } from "@/app/admin/actions";
import BoutonSupprimer from "@/components/admin/BoutonSupprimer";
import { Notice, inputClass, labelClass, btnPrimaire } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Événements & promos" };

type Row = {
  id: string;
  titre: string;
  titre_script: string;
  accroche: string;
  description: string;
  image: string;
  actif: boolean;
  date_debut: string | null;
  date_fin: string | null;
};

function ChampsEvenement({ evenement }: { evenement?: Row }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Petit sur-titre</label>
          <input name="accroche" defaultValue={evenement?.accroche ?? "Idées cadeaux"} className={inputClass} placeholder="Idées cadeaux, Promo, Rentrée…" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Du (optionnel)</label>
            <input name="dateDebut" type="date" defaultValue={evenement?.date_debut ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Au (optionnel)</label>
            <input name="dateFin" type="date" defaultValue={evenement?.date_fin ?? ""} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Titre (en capitales) *</label>
          <input name="titre" required defaultValue={evenement?.titre} className={inputClass} placeholder="Un cadeau qui vient" />
        </div>
        <div>
          <label className={labelClass}>Suite du titre en écriture manuscrite</label>
          <input name="titreScript" defaultValue={evenement?.titre_script} className={inputClass} placeholder="du cœur" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description *</label>
        <textarea name="description" required rows={3} defaultValue={evenement?.description} className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{evenement?.image ? "Remplacer l'affiche (max 4 Mo)" : "Affiche / visuel (max 4 Mo)"}</label>
          <input name="photo" type="file" accept="image/*" className={`${inputClass} file:mr-3 file:border-0 file:bg-taupe file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:text-cream`} />
          {evenement?.image && (
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={evenement.image} alt="" className="h-16 w-16 object-cover ring-1 ring-linen" />
              <label className="flex items-center gap-2 text-xs text-ink-soft">
                <input type="checkbox" name="retirerPhoto" className="h-4 w-4 accent-terracotta" />
                Retirer l'affiche actuelle
              </label>
            </div>
          )}
        </div>
        <label className="flex items-center gap-2.5 self-end pb-3 text-sm text-ink">
          <input type="checkbox" name="actif" defaultChecked={evenement?.actif ?? true} className="h-4 w-4 accent-terracotta" />
          ✅ Actif (affiché sur la page d'accueil)
        </label>
      </div>
    </>
  );
}

export default async function AdminEvenementsPage({
  searchParams,
}: {
  searchParams: Promise<{ succes?: string; erreur?: string }>;
}) {
  const { succes, erreur } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("evenements")
    .select("*")
    .order("created_at", { ascending: false });

  const evenements = (data ?? []) as Row[];

  return (
    <div>
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-ink">
        Événements & promos
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        L'événement actif s'affiche en grand sur la page d'accueil. S'il y en a
        plusieurs, le plus récent est utilisé ; sans dates, il reste affiché en
        permanence.
      </p>

      <div className="mt-5">
        <Notice succes={succes ? "Enregistré — le site est à jour." : undefined} erreur={erreur} />
        {error && (
          <Notice erreur="Impossible de charger les événements — vérifiez que le schéma SQL a bien été exécuté dans Supabase." />
        )}
      </div>

      {/* Créer */}
      <details className="bg-ivory ring-1 ring-linen" open={evenements.length === 0}>
        <summary className="cursor-pointer px-5 py-4 text-sm font-bold uppercase tracking-wider text-terracotta">
          ➕ Créer un événement
        </summary>
        <form action={creerEvenement} className="space-y-4 border-t border-linen p-5">
          <ChampsEvenement />
          <button type="submit" className={btnPrimaire}>💾 Créer l'événement</button>
        </form>
      </details>

      {/* Liste */}
      <ul className="mt-5 space-y-3">
        {evenements.map((e) => (
          <li key={e.id} className="bg-ivory ring-1 ring-linen">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                {e.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.image} alt="" className="h-12 w-12 shrink-0 object-cover ring-1 ring-linen" />
                )}
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink">
                    {e.titre} {e.titre_script}
                    {e.actif ? (
                      <span className="ml-2 bg-teal/15 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-teal">Actif</span>
                    ) : (
                      <span className="ml-2 bg-sand px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-taupe">Inactif</span>
                    )}
                  </p>
                  <p className="truncate text-xs text-ink-soft">
                    {e.date_debut || e.date_fin
                      ? `${e.date_debut ?? "…"} → ${e.date_fin ?? "…"}`
                      : "Permanent"}
                  </p>
                </div>
              </div>
              <BoutonSupprimer
                action={supprimerEvenement.bind(null, e.id)}
                confirmation={`Supprimer l'événement « ${e.titre} » ?`}
              />
            </div>
            <details>
              <summary className="cursor-pointer border-t border-linen px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-taupe hover:text-terracotta">
                ✏️ Modifier
              </summary>
              <form action={majEvenement.bind(null, e.id)} className="space-y-4 border-t border-linen p-5">
                <ChampsEvenement evenement={e} />
                <button type="submit" className={btnPrimaire}>💾 Enregistrer</button>
              </form>
            </details>
          </li>
        ))}
        {evenements.length === 0 && !error && (
          <li className="bg-ivory p-8 text-center text-sm text-ink-soft ring-1 ring-linen">
            Aucun événement pour l'instant.
          </li>
        )}
      </ul>
    </div>
  );
}
