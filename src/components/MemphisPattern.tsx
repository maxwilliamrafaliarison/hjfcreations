/** Motif décoratif coloré (confettis & formes) — accent éditorial façon Izzy. */
export default function MemphisPattern({ className = "" }: { className?: string }) {
  // grille de confettis
  const dots: { x: number; y: number; r: number; c: string }[] = [];
  const colors = [
    "var(--color-terracotta)",
    "var(--color-gold)",
    "var(--color-teal)",
    "var(--color-rose)",
    "var(--color-sky)",
    "var(--color-orange)",
  ];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 70; i++) {
    dots.push({
      x: rand() * 1200,
      y: rand() * 400,
      r: 4 + rand() * 9,
      c: colors[Math.floor(rand() * colors.length)],
    });
  }

  return (
    <svg
      className={className}
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.9} />
      ))}
      <circle cx="150" cy="90" r="46" fill="none" stroke="var(--color-rose)" strokeWidth="9" />
      <circle cx="1040" cy="300" r="40" fill="none" stroke="var(--color-teal)" strokeWidth="9" />
      <path d="M40 320 l28 -28 28 28 28 -28 28 28" fill="none" stroke="var(--color-gold)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M980 60 l28 -28 28 28 28 -28 28 28" fill="none" stroke="var(--color-orange)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
