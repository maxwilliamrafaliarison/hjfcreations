"use client";

/** Formulaire de suppression avec demande de confirmation. */
export default function BoutonSupprimer({
  action,
  confirmation,
  children = "Supprimer",
}: {
  action: () => Promise<void>;
  confirmation: string;
  children?: React.ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmation)) e.preventDefault();
      }}
      className="inline"
    >
      <button
        type="submit"
        className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-rose transition-colors hover:bg-rose hover:text-white"
      >
        {children}
      </button>
    </form>
  );
}
