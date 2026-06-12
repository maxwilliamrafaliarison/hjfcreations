/** Bandeau défilant — touche éditoriale (slogans qui glissent en continu). */
export default function Marquee({
  items,
  className = "bg-terracotta text-cream",
}: {
  items: string[];
  className?: string;
}) {
  // La série est dupliquée pour une boucle sans couture ; la copie est
  // masquée aux lecteurs d'écran pour ne pas être lue deux fois.
  const serie = (ariaHidden: boolean) => (
    <div className="flex items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="eyebrow px-7">{t}</span>
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden py-3.5 ${className}`}>
      <div className="flex w-max animate-marquee">
        {serie(false)}
        {serie(true)}
      </div>
    </div>
  );
}
