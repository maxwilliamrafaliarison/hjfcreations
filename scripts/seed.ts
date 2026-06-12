/* ════════════════════════════════════════════════════════════════════════
   Remplit la base Supabase avec le contenu initial du site
   (coordonnées, produits, avis, événement) depuis src/data/*.

   Usage :   npm run seed
   Requiert NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
   (lus depuis .env.local s'ils ne sont pas déjà dans l'environnement).

   Idempotent : les produits sont upsertés par slug ; les avis et
   l'événement ne sont insérés que si leurs tables sont vides.
   ════════════════════════════════════════════════════════════════════════ */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { site } from "../src/data/site";
import { produits } from "../src/data/produits";
import { temoignages } from "../src/data/temoignages";
import { evenementParDefaut } from "../src/data/evenements";

/* Charge .env.local si nécessaire (sans dépendance externe). */
function chargerEnvLocal() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  const chemin = fileURLToPath(new URL("../.env.local", import.meta.url));
  if (!existsSync(chemin)) return;
  for (const ligne of readFileSync(chemin, "utf8").split("\n")) {
    const m = ligne.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

async function main() {
  chargerEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error(
      "❌ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis (dans .env.local).",
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  /* 1. Coordonnées du site */
  {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, data: site, updated_at: new Date().toISOString() });
    if (error) throw new Error(`site_settings : ${error.message}`);
    console.log("✅ Coordonnées du site enregistrées");
  }

  /* 2. Produits (upsert par slug) */
  {
    const lignes = produits.map((p, i) => ({
      slug: p.slug,
      nom: p.nom,
      categorie: p.categorie,
      prix: p.prix,
      image: p.image,
      description: p.description,
      details: p.details,
      populaire: p.populaire ?? false,
      badge: p.badge ?? null,
      tags: p.tags ?? [],
      ordre: (i + 1) * 10,
    }));
    const { error } = await supabase.from("produits").upsert(lignes, { onConflict: "slug" });
    if (error) throw new Error(`produits : ${error.message}`);
    console.log(`✅ ${lignes.length} produits upsertés`);
  }

  /* 3. Avis (uniquement si la table est vide) */
  {
    const { count, error: errCount } = await supabase
      .from("temoignages")
      .select("id", { count: "exact", head: true });
    if (errCount) throw new Error(`temoignages (count) : ${errCount.message}`);
    if ((count ?? 0) > 0) {
      console.log(`⏭️  Avis : ${count} déjà en base — aucun ajout`);
    } else {
      const lignes = temoignages.map((t, i) => ({
        texte: t.texte,
        auteur: t.auteur,
        contexte: t.contexte,
        visible: true,
        ordre: (i + 1) * 10,
      }));
      const { error } = await supabase.from("temoignages").insert(lignes);
      if (error) throw new Error(`temoignages : ${error.message}`);
      console.log(`✅ ${lignes.length} avis insérés`);
    }
  }

  /* 4. Événement par défaut (uniquement si la table est vide) */
  {
    const { count, error: errCount } = await supabase
      .from("evenements")
      .select("id", { count: "exact", head: true });
    if (errCount) throw new Error(`evenements (count) : ${errCount.message}`);
    if ((count ?? 0) > 0) {
      console.log(`⏭️  Événements : ${count} déjà en base — aucun ajout`);
    } else {
      const { error } = await supabase.from("evenements").insert({
        titre: evenementParDefaut.titre,
        titre_script: evenementParDefaut.titreScript,
        accroche: evenementParDefaut.accroche,
        description: evenementParDefaut.description,
        image: evenementParDefaut.image,
        actif: evenementParDefaut.actif,
      });
      if (error) throw new Error(`evenements : ${error.message}`);
      console.log("✅ Événement « Fête des mères » inséré");
    }
  }

  console.log("\n🎉 Seed terminé — le contenu est en base, l'admin peut prendre le relais.");
}

main().catch((e) => {
  console.error(`❌ ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
