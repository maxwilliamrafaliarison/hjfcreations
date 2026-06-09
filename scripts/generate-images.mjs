/* ════════════════════════════════════════════════════════════════════════
   Génération d'images produits avec « Nano Banana » (Google Gemini 2.5 Flash Image).
   Usage :
     export GEMINI_API_KEY="votre_cle"        # clé gratuite : https://aistudio.google.com/apikey
     node scripts/generate-images.mjs          # génère les images manquantes
     node scripts/generate-images.mjs all      # régénère tout
   Les images sont écrites dans public/produits/.
   ════════════════════════════════════════════════════════════════════════ */

import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("❌ GEMINI_API_KEY manquant. Récupérez une clé gratuite sur https://aistudio.google.com/apikey");
  process.exit(1);
}
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "produits");
const ALL = process.argv.includes("all");

const STYLE =
  "Photographie de produit e-commerce professionnelle, haute résolution, fond neutre clair (crème/beige) uni, lumière de studio douce, mise au point nette, composition carrée centrée, sans personne, style catalogue de grande boutique.";

const ITEMS = [
  { file: "assiette.jpg", prompt: "Une assiette en céramique blanche décorée d'une photo de famille personnalisée et d'un texte élégant au centre, posée de face." },
  { file: "badge.jpg", prompt: "Un badge rond (pin's) à épingler avec une impression photo personnalisée colorée et une finition brillante, gros plan." },
  { file: "tapis-souris.jpg", prompt: "Un tapis de souris rectangulaire imprimé d'un visuel photo personnalisé coloré, posé à plat sur un bureau clair." },
  { file: "porte-cles.jpg", prompt: "Un porte-clés en acrylique transparent avec une photo personnalisée imprimée, présenté en gros plan." },
  { file: "puzzle.jpg", prompt: "Un puzzle photo personnalisé partiellement assemblé montrant une photo de famille, vu de dessus." },
  { file: "casquette.jpg", prompt: "Une casquette blanche avec un petit logo personnalisé imprimé sur le devant, vue de face." },
];

async function generate(item) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${item.prompt} ${STYLE}` }] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });
  if (!res.ok) {
    console.error(`❌ ${item.file} : HTTP ${res.status} — ${(await res.text()).slice(0, 300)}`);
    return false;
  }
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) {
    console.error(`❌ ${item.file} : pas d'image dans la réponse — ${JSON.stringify(data).slice(0, 300)}`);
    return false;
  }
  writeFileSync(join(OUT, item.file), Buffer.from(img.inlineData.data, "base64"));
  console.log(`✅ ${item.file}`);
  return true;
}

let ok = 0;
for (const item of ITEMS) {
  if (!ALL && existsSync(join(OUT, item.file))) {
    console.log(`⏭️  ${item.file} (déjà présent)`);
    continue;
  }
  if (await generate(item)) ok++;
}
console.log(`\nTerminé : ${ok} image(s) générée(s) dans public/produits/`);
