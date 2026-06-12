/** Configuration Supabase — lue depuis les variables d'environnement. */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Vrai si le projet est relié à Supabase (sinon le site sert le contenu statique). */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/** Emails autorisés à accéder à l'administration. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}
