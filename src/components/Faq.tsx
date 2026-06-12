/* Questions fréquentes — rassurance achat (livraison, paiement, délais).
   Affichée sur la page Contact + balisage schema.org FAQPage. */

const FAQ = [
  {
    q: "Comment passer commande ?",
    r: "Choisissez un produit dans la boutique puis cliquez sur « Commander sur WhatsApp » : envoyez-nous votre texte (prénom, message…) et vos photos, et nous validons ensemble la personnalisation avant de lancer la création. Vous pouvez aussi commander par email.",
  },
  {
    q: "Quels sont les délais de préparation ?",
    r: "Le délai dépend du produit et de la quantité — il vous est confirmé dès la commande sur WhatsApp. Pour une occasion précise (anniversaire, fête), commandez quelques jours à l'avance pour être livré à temps.",
  },
  {
    q: "Livrez-vous à domicile ?",
    r: "Oui : livraison à Antananarivo et envoi possible vers les provinces. Les frais et le délai de livraison sont confirmés lors de la commande.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    r: "MVola, Orange Money, Airtel Money, ou paiement à la livraison. Le mode de paiement se convient simplement lors de la commande.",
  },
  {
    q: "Puis-je utiliser mes propres photos ?",
    r: "Bien sûr — c'est même notre spécialité ! Envoyez vos photos sur WhatsApp. Pour un résultat optimal, choisissez des images nettes et bien éclairées.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="border-t border-linen bg-sand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 md:py-16">
        <div className="text-center">
          <p className="eyebrow text-gold-dark">Tout savoir</p>
          <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {FAQ.map(({ q, r }) => (
            <details
              key={q}
              className="group bg-ivory ring-1 ring-linen open:ring-terracotta"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-bold uppercase tracking-wide text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-terracotta transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-ink-soft">{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
