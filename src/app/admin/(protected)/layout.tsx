import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

async function seDeconnecter() {
  "use server";
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="HJF Créations"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/40"
          />
          <span className="leading-tight">
            <span className="block text-sm font-extrabold uppercase tracking-wider text-ink">
              Admin HJF
            </span>
            <span className="block max-w-[180px] truncate text-xs text-ink-soft sm:max-w-none">
              {user.email}
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-taupe transition-colors hover:text-terracotta"
          >
            Voir le site ↗
          </a>
          <form action={seDeconnecter}>
            <button
              type="submit"
              className="bg-ink px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-black"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <AdminNav />

      <main className="mt-6">{children}</main>
    </div>
  );
}
