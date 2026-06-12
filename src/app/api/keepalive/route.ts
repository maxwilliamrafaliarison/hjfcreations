import { NextResponse } from "next/server";
import { getPublicClient } from "@/lib/supabase/public";

/* Pingé chaque jour par un cron Vercel (vercel.json) : une minuscule requête
   suffit à empêcher la mise en pause du projet Supabase gratuit. */

export const dynamic = "force-dynamic";

export async function GET() {
  const sb = getPublicClient();
  if (!sb) {
    return NextResponse.json({ ok: false, raison: "Supabase non configuré" });
  }
  const { error } = await sb.from("site_settings").select("id").limit(1);
  return NextResponse.json({ ok: !error, date: new Date().toISOString() });
}
