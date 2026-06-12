import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Connexion" };

const MESSAGES: Record<string, string> = {
  champs: "Renseignez votre email et votre mot de passe.",
  identifiants: "Email ou mot de passe incorrect.",
  acces: "Ce compte n'est pas autorisé à accéder à l'administration.",
  config:
    "L'administration n'est pas encore configurée (variables Supabase manquantes). Contactez le développeur.",
};

async function seConnecter(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/admin/login?erreur=champs");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?erreur=identifiants");
  redirect("/admin");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;
  const message = erreur ? MESSAGES[erreur] : null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm bg-ivory p-8 shadow-lg ring-1 ring-linen">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.jpg"
            alt="HJF Créations"
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-cover ring-1 ring-gold/40"
          />
          <h1 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-ink">
            Administration
          </h1>
          <p className="mt-1 text-sm text-ink-soft">Espace réservé à l'équipe HJF.</p>
        </div>

        {message && (
          <p className="mt-5 border-l-2 border-rose bg-rose/10 px-4 py-3 text-sm text-ink">
            {message}
          </p>
        )}

        <form action={seConnecter} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={!isSupabaseConfigured}
              className="w-full border border-linen bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-terracotta disabled:opacity-50"
              placeholder="vous@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={!isSupabaseConfigured}
              className="w-full border border-linen bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-terracotta disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={!isSupabaseConfigured}
            className="btn btn--terracotta w-full disabled:opacity-50"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-ink-soft">
          Mot de passe oublié ? Contactez l'autre administrateur ou utilisez la
          réinitialisation depuis le tableau de bord Supabase.
        </p>
      </div>
    </div>
  );
}
