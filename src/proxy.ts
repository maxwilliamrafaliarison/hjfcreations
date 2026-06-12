import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/** Protège /admin : session Supabase + liste blanche d'emails (ADMIN_EMAILS). */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const versLogin = pathname === "/admin/login";

  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase pas encore configuré : la page de connexion explique quoi faire.
  if (!url || !anonKey) {
    if (versLogin) return response;
    return NextResponse.redirect(new URL("/admin/login?erreur=config", request.url));
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const estAutorise =
    !!user?.email && (allowlist.length === 0 || allowlist.includes(user.email.toLowerCase()));

  if (versLogin) {
    // Déjà connecté et autorisé → directement au tableau de bord.
    if (user && estAutorise) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (!estAutorise) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/admin/login?erreur=acces", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
