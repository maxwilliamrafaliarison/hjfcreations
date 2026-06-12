/* Petits éléments partagés de l'interface d'administration. */

export const inputClass =
  "w-full border border-linen bg-ivory px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-terracotta";

export const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft";

export const btnPrimaire =
  "inline-flex items-center justify-center gap-2 bg-terracotta px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-terracotta-dark";

export const btnSecondaire =
  "inline-flex items-center justify-center gap-2 border border-ink/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream";

/** Bandeau succès / erreur (alimenté par les searchParams). */
export function Notice({ succes, erreur }: { succes?: string; erreur?: string }) {
  if (erreur) {
    return (
      <p className="mb-5 border-l-2 border-rose bg-rose/10 px-4 py-3 text-sm text-ink">
        ⚠️ {erreur}
      </p>
    );
  }
  if (succes) {
    return (
      <p className="mb-5 border-l-2 border-teal bg-teal/10 px-4 py-3 text-sm text-ink">
        ✅ {succes}
      </p>
    );
  }
  return null;
}
