import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { creerAvis, majAvis, supprimerAvis } from "@/app/admin/actions";
import BoutonSupprimer from "@/components/admin/BoutonSupprimer";
import { Notice, inputClass, labelClass, btnPrimaire } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Avis clients" };

type Row = {
  id: string;
  texte: string;
  auteur: string;
  contexte: string;
  visible: boolean;
};

function ChampsAvis({ avis }: { avis?: Row }) {
  return (
    <>
      <div>
        <label className={labelClass}>Texte de l'avis *</label>
        <textarea name="texte" required rows={3} defaultValue={avis?.texte} className={inputClass} placeholder="Ce que le client a dit…" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Auteur *</label>
          <input name="auteur" required defaultValue={avis?.auteur} className={inputClass} placeholder="Mirana R." />
        </div>
        <div>
          <label className={labelClass}>Contexte (ville, situation…)</label>
          <input name="contexte" defaultValue={avis?.contexte} className={inputClass} placeholder="Antananarivo" />
        </div>
      </div>
      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input type="checkbox" name="visible" defaultChecked={avis ? avis.visible : true} className="h-4 w-4 accent-terracotta" />
        Visible sur le site
      </label>
    </>
  );
}

export default async function AdminAvisPage({
  searchParams,
}: {
  searchParams: Promise<{ succes?: string; erreur?: string }>;
}) {
  const { succes, erreur } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("temoignages")
    .select("id, texte, auteur, contexte, visible")
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: true });

  const avis = (data ?? []) as Row[];

  return (
    <div>
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-ink">Avis clients</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {avis.filter((a) => a.visible).length} avis visibles sur la page d'accueil.
      </p>

      <div className="mt-5">
        <Notice succes={succes ? "Enregistré — le site est à jour." : undefined} erreur={erreur} />
        {error && (
          <Notice erreur="Impossible de charger les avis — vérifiez que le schéma SQL a bien été exécuté dans Supabase." />
        )}
      </div>

      {/* Ajouter */}
      <details className="bg-ivory ring-1 ring-linen" open={avis.length === 0}>
        <summary className="cursor-pointer px-5 py-4 text-sm font-bold uppercase tracking-wider text-terracotta">
          ➕ Ajouter un avis
        </summary>
        <form action={creerAvis} className="space-y-4 border-t border-linen p-5">
          <ChampsAvis />
          <button type="submit" className={btnPrimaire}>💾 Ajouter l'avis</button>
        </form>
      </details>

      {/* Liste */}
      <ul className="mt-5 space-y-3">
        {avis.map((a) => (
          <li key={a.id} className="bg-ivory ring-1 ring-linen">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm text-ink">« {a.texte} »</p>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-gold-dark">
                  {a.auteur}
                  {a.contexte && <span className="font-normal normal-case text-ink-soft"> — {a.contexte}</span>}
                  {!a.visible && <span className="ml-2 bg-sand px-1.5 py-0.5 text-[0.6rem] text-taupe">Masqué</span>}
                </p>
              </div>
              <BoutonSupprimer
                action={supprimerAvis.bind(null, a.id)}
                confirmation={`Supprimer l'avis de ${a.auteur} ?`}
              />
            </div>
            <details>
              <summary className="cursor-pointer border-t border-linen px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-taupe hover:text-terracotta">
                ✏️ Modifier
              </summary>
              <form action={majAvis.bind(null, a.id)} className="space-y-4 border-t border-linen p-5">
                <ChampsAvis avis={a} />
                <button type="submit" className={btnPrimaire}>💾 Enregistrer</button>
              </form>
            </details>
          </li>
        ))}
        {avis.length === 0 && !error && (
          <li className="bg-ivory p-8 text-center text-sm text-ink-soft ring-1 ring-linen">
            Aucun avis pour l'instant.
          </li>
        )}
      </ul>
    </div>
  );
}
