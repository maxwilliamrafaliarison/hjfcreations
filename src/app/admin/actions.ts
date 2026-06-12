"use server";

/* ════════════════════════════════════════════════════════════════════════
   Server actions de l'administration.
   Chaque mutation : session vérifiée + liste blanche, validation zod,
   écriture en base (RLS), puis revalidateTag → le site public se met à
   jour immédiatement.
   ════════════════════════════════════════════════════════════════════════ */

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { adminEmails } from "@/lib/supabase/config";
import { TAGS } from "@/lib/content";

/* ── Garde commune ───────────────────────────────────────────────────── */

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect("/admin/login");

  const allowlist = adminEmails();
  if (allowlist.length > 0 && !allowlist.includes(user.email.toLowerCase())) {
    redirect("/admin/login?erreur=acces");
  }
  return supabase;
}

/* ── Utilitaires ─────────────────────────────────────────────────────── */

function champ(fd: FormData, nom: string): string {
  return String(fd.get(nom) ?? "").trim();
}

function lignes(fd: FormData, nom: string): string[] {
  return champ(fd, nom)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function prixDepuisFormulaire(fd: FormData): number | null {
  const brut = champ(fd, "prix");
  if (!brut) return null; // vide = « sur devis »
  const n = Math.round(Number(brut.replace(/\s/g, "")));
  if (!Number.isFinite(n) || n < 0) throw new Error("Le prix doit être un nombre positif (en Ariary).");
  return n;
}

function slugifier(nom: string): string {
  return (
    nom
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "produit"
  );
}

const TAILLE_MAX_PHOTO = 4 * 1024 * 1024; // 4 Mo

/** Téléverse une photo dans le bucket public et renvoie son URL — "" si aucun fichier. */
async function televerserPhoto(fd: FormData, nomChamp = "photo"): Promise<string> {
  const fichier = fd.get(nomChamp);
  if (!(fichier instanceof File) || fichier.size === 0) return "";
  if (!fichier.type.startsWith("image/")) {
    throw new Error("Le fichier doit être une image (JPG, PNG, WEBP…).");
  }
  if (fichier.size > TAILLE_MAX_PHOTO) {
    throw new Error("La photo dépasse 4 Mo — réduisez-la avant de la téléverser.");
  }

  const admin = createSupabaseAdminClient();
  const ext =
    (fichier.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const chemin = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await admin.storage.from("produits").upload(chemin, fichier, {
    contentType: fichier.type || "image/jpeg",
  });
  if (error) throw new Error(`Téléversement impossible : ${error.message}`);

  return admin.storage.from("produits").getPublicUrl(chemin).data.publicUrl;
}

function messageZod(e: z.ZodError): string {
  return e.issues.map((i) => i.message).join(" · ");
}

/* ══════════════════════════════════════════════════════════════════════
   1. CONTACT & COORDONNÉES (site_settings)
   ══════════════════════════════════════════════════════════════════════ */

const contactSchema = z.object({
  name: z.string().min(2, "Le nom de la boutique est requis."),
  slogan: z.string().min(2, "Le slogan est requis."),
  metier: z.string().min(2, "Le métier est requis."),
  description: z.string().min(10, "La description est trop courte."),
  email: z.string().email("Email invalide."),
  phoneDisplay: z.string().min(5, "Le téléphone affiché est requis."),
  phoneNumber: z
    .string()
    .regex(/^\d{8,15}$/, "Numéro pour les appels : chiffres uniquement (ex : 261329527596)."),
  whatsappNumber: z
    .string()
    .regex(/^\d{8,15}$/, "Numéro WhatsApp : chiffres uniquement (ex : 261329527596)."),
  city: z.string().min(2, "La ville est requise."),
  region: z.string().min(2, "Le pays/la région est requis."),
  delivery: z.string().min(2, "La phrase de livraison est requise."),
  hours: z.string().min(2, "Les horaires sont requis."),
  responseTime: z.string().min(2, "Le délai de réponse est requis."),
});

export async function majContact(fd: FormData) {
  const supabase = await requireAdmin();

  let erreur = "";
  try {
    const base = contactSchema.parse({
      name: champ(fd, "name"),
      slogan: champ(fd, "slogan"),
      metier: champ(fd, "metier"),
      description: champ(fd, "description"),
      email: champ(fd, "email"),
      phoneDisplay: champ(fd, "phoneDisplay"),
      phoneNumber: champ(fd, "phoneNumber").replace(/\D/g, ""),
      whatsappNumber: champ(fd, "whatsappNumber").replace(/\D/g, ""),
      city: champ(fd, "city"),
      region: champ(fd, "region"),
      delivery: champ(fd, "delivery"),
      hours: champ(fd, "hours"),
      responseTime: champ(fd, "responseTime"),
    });

    const data = {
      ...base,
      payments: lignes(fd, "payments"),
      social: {
        facebook: champ(fd, "facebook"),
        instagram: champ(fd, "instagram"),
        tiktok: champ(fd, "tiktok"),
      },
    };

    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, data, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);

    updateTag(TAGS.site);
  } catch (e) {
    erreur = e instanceof z.ZodError ? messageZod(e) : e instanceof Error ? e.message : "Erreur inconnue.";
  }

  if (erreur) redirect(`/admin/contact?erreur=${encodeURIComponent(erreur)}`);
  redirect("/admin/contact?succes=1");
}

/* ══════════════════════════════════════════════════════════════════════
   2. PRODUITS
   ══════════════════════════════════════════════════════════════════════ */

const produitSchema = z.object({
  nom: z.string().min(2, "Le nom du produit est requis."),
  categorie: z.enum(["textile", "ceramique", "plastique", "cadeau"], {
    message: "Choisissez une catégorie.",
  }),
  description: z.string().min(10, "La description est trop courte (10 caractères minimum)."),
});

async function slugUnique(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  nom: string,
  idActuel?: string,
): Promise<string> {
  const base = slugifier(nom);
  const { data } = await supabase.from("produits").select("id, slug").like("slug", `${base}%`);
  const pris = new Set(
    (data ?? []).filter((r) => r.id !== idActuel).map((r) => r.slug as string),
  );
  if (!pris.has(base)) return base;
  for (let i = 2; i < 100; i++) {
    if (!pris.has(`${base}-${i}`)) return `${base}-${i}`;
  }
  return `${base}-${Date.now()}`;
}

function lireProduit(fd: FormData) {
  const base = produitSchema.parse({
    nom: champ(fd, "nom"),
    categorie: champ(fd, "categorie"),
    description: champ(fd, "description"),
  });
  const tags: string[] = [];
  if (fd.get("scolaire") === "on") tags.push("scolaire");

  return {
    ...base,
    prix: prixDepuisFormulaire(fd),
    details: lignes(fd, "details"),
    badge: champ(fd, "badge") || null,
    populaire: fd.get("populaire") === "on",
    tags,
    ordre: Math.round(Number(champ(fd, "ordre") || "0")) || 0,
  };
}

export async function creerProduit(fd: FormData) {
  const supabase = await requireAdmin();

  let erreur = "";
  let slug = "";
  try {
    const produit = lireProduit(fd);
    const photo = await televerserPhoto(fd);
    slug = await slugUnique(supabase, produit.nom);

    const { error } = await supabase.from("produits").insert({
      ...produit,
      slug,
      image: photo || champ(fd, "imageActuelle"),
    });
    if (error) throw new Error(error.message);

    updateTag(TAGS.produits);
  } catch (e) {
    erreur = e instanceof z.ZodError ? messageZod(e) : e instanceof Error ? e.message : "Erreur inconnue.";
  }

  if (erreur) redirect(`/admin/produits/nouveau?erreur=${encodeURIComponent(erreur)}`);
  redirect("/admin/produits?succes=ajout");
}

export async function majProduit(id: string, fd: FormData) {
  const supabase = await requireAdmin();

  let erreur = "";
  try {
    const produit = lireProduit(fd);
    const photo = await televerserPhoto(fd);

    const maj: Record<string, unknown> = {
      ...produit,
      updated_at: new Date().toISOString(),
    };
    if (photo) maj.image = photo;
    if (fd.get("retirerPhoto") === "on") maj.image = "";

    const { error } = await supabase.from("produits").update(maj).eq("id", id);
    if (error) throw new Error(error.message);

    updateTag(TAGS.produits);
  } catch (e) {
    erreur = e instanceof z.ZodError ? messageZod(e) : e instanceof Error ? e.message : "Erreur inconnue.";
  }

  if (erreur) redirect(`/admin/produits/${id}?erreur=${encodeURIComponent(erreur)}`);
  redirect("/admin/produits?succes=maj");
}

export async function supprimerProduit(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("produits").delete().eq("id", id);
  updateTag(TAGS.produits);
  redirect("/admin/produits?succes=suppression");
}

/* ══════════════════════════════════════════════════════════════════════
   3. AVIS CLIENTS
   ══════════════════════════════════════════════════════════════════════ */

const avisSchema = z.object({
  texte: z.string().min(5, "Le texte de l'avis est trop court."),
  auteur: z.string().min(2, "Le nom de l'auteur est requis."),
});

export async function creerAvis(fd: FormData) {
  const supabase = await requireAdmin();

  let erreur = "";
  try {
    const avis = avisSchema.parse({ texte: champ(fd, "texte"), auteur: champ(fd, "auteur") });
    const { error } = await supabase.from("temoignages").insert({
      ...avis,
      contexte: champ(fd, "contexte"),
      visible: fd.get("visible") === "on",
      ordre: Math.round(Number(champ(fd, "ordre") || "0")) || 0,
    });
    if (error) throw new Error(error.message);
    updateTag(TAGS.avis);
  } catch (e) {
    erreur = e instanceof z.ZodError ? messageZod(e) : e instanceof Error ? e.message : "Erreur inconnue.";
  }

  if (erreur) redirect(`/admin/avis?erreur=${encodeURIComponent(erreur)}`);
  redirect("/admin/avis?succes=1");
}

export async function majAvis(id: string, fd: FormData) {
  const supabase = await requireAdmin();

  let erreur = "";
  try {
    const avis = avisSchema.parse({ texte: champ(fd, "texte"), auteur: champ(fd, "auteur") });
    const { error } = await supabase
      .from("temoignages")
      .update({
        ...avis,
        contexte: champ(fd, "contexte"),
        visible: fd.get("visible") === "on",
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    updateTag(TAGS.avis);
  } catch (e) {
    erreur = e instanceof z.ZodError ? messageZod(e) : e instanceof Error ? e.message : "Erreur inconnue.";
  }

  if (erreur) redirect(`/admin/avis?erreur=${encodeURIComponent(erreur)}`);
  redirect("/admin/avis?succes=1");
}

export async function supprimerAvis(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("temoignages").delete().eq("id", id);
  updateTag(TAGS.avis);
  redirect("/admin/avis?succes=1");
}

/* ══════════════════════════════════════════════════════════════════════
   4. ÉVÉNEMENTS / PROMOTIONS
   ══════════════════════════════════════════════════════════════════════ */

const evenementSchema = z.object({
  titre: z.string().min(2, "Le titre est requis."),
  description: z.string().min(10, "La description est trop courte."),
});

function lireEvenement(fd: FormData) {
  const base = evenementSchema.parse({
    titre: champ(fd, "titre"),
    description: champ(fd, "description"),
  });
  return {
    ...base,
    titre_script: champ(fd, "titreScript"),
    accroche: champ(fd, "accroche"),
    actif: fd.get("actif") === "on",
    date_debut: champ(fd, "dateDebut") || null,
    date_fin: champ(fd, "dateFin") || null,
  };
}

export async function creerEvenement(fd: FormData) {
  const supabase = await requireAdmin();

  let erreur = "";
  try {
    const evenement = lireEvenement(fd);
    const photo = await televerserPhoto(fd);
    const { error } = await supabase
      .from("evenements")
      .insert({ ...evenement, image: photo });
    if (error) throw new Error(error.message);
    updateTag(TAGS.evenements);
  } catch (e) {
    erreur = e instanceof z.ZodError ? messageZod(e) : e instanceof Error ? e.message : "Erreur inconnue.";
  }

  if (erreur) redirect(`/admin/evenements?erreur=${encodeURIComponent(erreur)}`);
  redirect("/admin/evenements?succes=1");
}

export async function majEvenement(id: string, fd: FormData) {
  const supabase = await requireAdmin();

  let erreur = "";
  try {
    const evenement = lireEvenement(fd);
    const photo = await televerserPhoto(fd);

    const maj: Record<string, unknown> = { ...evenement };
    if (photo) maj.image = photo;
    if (fd.get("retirerPhoto") === "on") maj.image = "";

    const { error } = await supabase.from("evenements").update(maj).eq("id", id);
    if (error) throw new Error(error.message);
    updateTag(TAGS.evenements);
  } catch (e) {
    erreur = e instanceof z.ZodError ? messageZod(e) : e instanceof Error ? e.message : "Erreur inconnue.";
  }

  if (erreur) redirect(`/admin/evenements?erreur=${encodeURIComponent(erreur)}`);
  redirect("/admin/evenements?succes=1");
}

export async function supprimerEvenement(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("evenements").delete().eq("id", id);
  updateTag(TAGS.evenements);
  redirect("/admin/evenements?succes=1");
}
