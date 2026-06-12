import Link from "next/link";
import Image from "next/image";
import type { Evenement } from "@/data/evenements";
import { ArrowRightIcon } from "@/components/icons";

/** Bloc « événement / promotion » de la page d'accueil (géré depuis l'admin). */
export default function EventFeature({ evenement }: { evenement: Evenement }) {
  const avecImage = Boolean(evenement.image);

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-20">
      {avecImage && (
        <div className="relative mx-auto w-full max-w-md overflow-hidden ring-1 ring-linen">
          <Image
            src={evenement.image}
            alt={evenement.titre}
            width={512}
            height={768}
            className="h-auto w-full object-cover"
          />
        </div>
      )}
      <div className={avecImage ? "" : "mx-auto max-w-2xl text-center md:col-span-2"}>
        {evenement.accroche && <p className="eyebrow text-gold-dark">{evenement.accroche}</p>}
        <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-5xl">
          {evenement.titre}
          {evenement.titreScript && (
            <span className="script block text-5xl normal-case text-terracotta sm:text-6xl">
              {evenement.titreScript}
            </span>
          )}
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-taupe">
          {evenement.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/boutique" className="btn btn--terracotta">
            Découvrir
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
