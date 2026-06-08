/** Bandeau défilant — touche éditoriale (slogans qui glissent en continu). */
export default function Marquee({
  items,
  className = "bg-terracotta text-cream",
}: {
  items: string[];
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`overflow-hidden py-3.5 ${className}`}>
      <div className="flex w-max animate-marquee items-center">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="eyebrow px-7">{t}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
