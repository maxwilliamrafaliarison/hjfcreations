import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
      <p className="font-display text-7xl text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">Page introuvable</h1>
      <p className="mt-3 text-ink-soft">
        Désolé, cette page n'existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="clip-corner bg-terracotta px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-terracotta-dark"
        >
          Retour à l'accueil
        </Link>
        <Link
          href="/boutique"
          className="clip-corner border border-ink/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          Voir la boutique
        </Link>
      </div>
    </section>
  );
}
