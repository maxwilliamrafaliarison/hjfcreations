import { CATEGORIES, type Produit } from "@/data/produits";
import { inputClass, labelClass, btnPrimaire } from "@/components/admin/ui";

/** Formulaire produit (création et modification). */
export default function ProduitForm({
  action,
  produit,
}: {
  action: (fd: FormData) => Promise<void>;
  produit?: Produit;
}) {
  const edition = Boolean(produit);

  return (
    <form action={action} className="space-y-5 bg-ivory p-5 ring-1 ring-linen sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="nom">Nom du produit *</label>
          <input id="nom" name="nom" required defaultValue={produit?.nom} className={inputClass} placeholder="Ex : Mug personnalisé" />
        </div>
        <div>
          <label className={labelClass} htmlFor="categorie">Catégorie *</label>
          <select id="categorie" name="categorie" required defaultValue={produit?.categorie ?? ""} className={inputClass}>
            <option value="" disabled>— Choisir —</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="prix">Prix en Ariary (vide = « sur devis »)</label>
          <input id="prix" name="prix" type="number" min={0} step={500} defaultValue={produit?.prix ?? ""} className={inputClass} placeholder="20000" />
        </div>
        <div>
          <label className={labelClass} htmlFor="badge">Badge (optionnel)</label>
          <input id="badge" name="badge" defaultValue={produit?.badge ?? ""} className={inputClass} placeholder="Best-seller, Nouveau, Petit prix…" />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="description">Description *</label>
        <textarea id="description" name="description" required rows={3} defaultValue={produit?.description} className={inputClass} placeholder="Présentez le produit en quelques phrases…" />
      </div>

      <div>
        <label className={labelClass} htmlFor="details">Points clés (un par ligne)</label>
        <textarea id="details" name="details" rows={3} defaultValue={produit?.details.join("\n")} className={inputClass} placeholder={"Céramique qualité premium\nVotre texte + votre photo"} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="photo">
            {edition ? "Remplacer la photo (max 4 Mo)" : "Photo (max 4 Mo)"}
          </label>
          <input id="photo" name="photo" type="file" accept="image/*" className={`${inputClass} file:mr-3 file:border-0 file:bg-taupe file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:text-cream`} />
          {edition && produit?.image && (
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={produit.image} alt="" className="h-16 w-16 object-cover ring-1 ring-linen" />
              <label className="flex items-center gap-2 text-xs text-ink-soft">
                <input type="checkbox" name="retirerPhoto" className="h-4 w-4 accent-terracotta" />
                Retirer la photo actuelle
              </label>
            </div>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="ordre">Ordre d'affichage (petit = en premier)</label>
          <input id="ordre" name="ordre" type="number" defaultValue={produit?.ordre ?? 99} className={inputClass} />
          <div className="mt-4 space-y-2.5">
            <label className="flex items-center gap-2.5 text-sm text-ink">
              <input type="checkbox" name="populaire" defaultChecked={produit?.populaire} className="h-4 w-4 accent-terracotta" />
              ⭐ Populaire (affiché sur la page d'accueil)
            </label>
            <label className="flex items-center gap-2.5 text-sm text-ink">
              <input type="checkbox" name="scolaire" defaultChecked={produit?.tags?.includes("scolaire")} className="h-4 w-4 accent-terracotta" />
              🎒 Sélection « Collège & Lycée »
            </label>
          </div>
        </div>
      </div>

      <button type="submit" className={`${btnPrimaire} w-full sm:w-auto`}>
        💾 {edition ? "Enregistrer les modifications" : "Ajouter le produit"}
      </button>
    </form>
  );
}
