import { temoignages, type Temoignage } from "@/data/temoignages";

export default function Testimonials({
  items = temoignages,
}: {
  items?: Temoignage[];
}) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
      {items.map((t, i) => (
        <figure key={i} className="break-inside-avoid bg-ivory p-6 ring-1 ring-linen">
          <span className="font-script text-5xl leading-none text-terracotta">“</span>
          <blockquote className="-mt-3 leading-relaxed text-ink">{t.texte}</blockquote>
          <figcaption className="mt-4">
            <span className="block text-sm font-bold uppercase tracking-[0.12em] text-gold-dark">
              {t.auteur}
            </span>
            <span className="block text-xs text-taupe-soft">{t.contexte}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
