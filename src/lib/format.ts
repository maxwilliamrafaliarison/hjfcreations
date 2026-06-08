/** Formate un montant en Ariary, ex : 20000 -> "20 000 Ar". */
export function formatAr(value: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(value)} Ar`;
}
