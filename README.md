# HJF Créations — Site vitrine & catalogue

Site web de **HJF Créations** : sublimation personnalisée (coton, céramique, plastique) à Antananarivo.
Catalogue moderne avec commande directe par **WhatsApp** et **email**.

> *« Créé avec passion, offert avec amour. »*

Construit avec **Next.js 16**, **React 19**, **TypeScript** et **Tailwind CSS v4**.

---

## 🗂️ Aperçu des pages

| Page | Adresse | Contenu |
|------|---------|---------|
| Accueil | `/` | Présentation, produits phares, étapes de commande |
| Boutique | `/boutique` | Catalogue filtrable (Textile, Céramique, Plastique, Cadeaux) |
| Fiche produit | `/boutique/<produit>` | Détails + boutons « Commander sur WhatsApp / email » |
| À propos | `/a-propos` | Histoire et valeurs |
| Contact | `/contact` | Coordonnées, Mobile Money, formulaire |

---

## 🚀 Démarrer en local

Pré-requis : [Node.js](https://nodejs.org) 18 ou plus.

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site sur http://localhost:3000
```

Pour tester la version finale optimisée :

```bash
npm run build && npm start
```

---

## ✏️ Modifier le contenu (sans être développeur)

Tout le contenu modifiable est dans **deux fichiers** seulement.

### 1. Coordonnées — `src/data/site.ts`
Email, téléphone, numéro WhatsApp, horaires, réseaux sociaux, moyens de paiement…
Modifiez les valeurs, enregistrez : tout le site se met à jour automatiquement.

### 2. Produits — `src/data/produits.ts`
Pour **ajouter un produit**, copiez un bloc existant et changez les valeurs :

```ts
{
  slug: "tasse-noel",                 // identifiant unique (dans l'adresse)
  nom: "Tasse de Noël",
  categorie: "ceramique",             // textile | ceramique | plastique | cadeau
  prix: 25000,                         // en Ariary, ou null pour « Sur devis »
  image: "/produits/tasse-noel.jpg",  // photo dans public/produits/ (ou "" si aucune)
  description: "Une tasse festive personnalisée avec votre photo.",
  details: ["Céramique premium", "Votre texte + photo", "Édition de fin d'année"],
  populaire: true,                     // true = affiché en page d'accueil
  badge: "Nouveau",                    // optionnel
},
```

**Ajouter une photo :** déposez l'image dans le dossier `public/produits/`,
puis indiquez son chemin dans `image` (ex. `"/produits/tasse-noel.jpg"`).
Sans photo, une vignette élégante « Photo bientôt » s'affiche automatiquement.

---

## ☁️ Mettre en ligne (GitHub → Vercel)

### Étape 1 — Envoyer le code sur GitHub
```bash
git init
git add .
git commit -m "Site HJF Créations"
git branch -M main
git remote add origin https://github.com/<votre-compte>/hjfcreations.git
git push -u origin main
```

### Étape 2 — Déployer sur Vercel (gratuit)
1. Créez un compte sur [vercel.com](https://vercel.com) (connexion avec GitHub).
2. **Add New… → Project**, puis importez le dépôt `hjfcreations`.
3. Vercel détecte Next.js automatiquement — cliquez **Deploy**.
4. En ~1 minute, votre site est en ligne sur une adresse `…vercel.app`.

> À chaque `git push`, Vercel redéploie le site automatiquement.

### Étape 3 — Nom de domaine (optionnel)
Dans Vercel : **Project → Settings → Domains**, ajoutez votre domaine
(ex. `hjfcreations.mg`) et suivez les instructions DNS.
Pensez ensuite à mettre à jour le champ `url` dans `src/data/site.ts`.

---

## 📁 Structure du projet

```
src/
├── app/                  Pages (Next.js App Router)
│   ├── page.tsx          Accueil
│   ├── boutique/         Catalogue + fiches produits
│   ├── a-propos/         À propos
│   ├── contact/          Contact
│   ├── layout.tsx        En-tête, pied de page, SEO (global)
│   ├── sitemap.ts        Plan du site (SEO)
│   └── robots.ts         robots.txt (SEO)
├── components/           Éléments réutilisables (Header, Footer, ProductCard…)
├── data/
│   ├── site.ts           ⭐ Coordonnées & configuration
│   └── produits.ts       ⭐ Catalogue produits
└── lib/                  Fonctions utilitaires (liens WhatsApp, prix)
public/
├── logo.jpg              Logo HJF
└── produits/             Photos des produits
reference/                Fichiers d'origine (ancienne maquette HTML, visuels)
```

---

## 🔮 Évolutions possibles

- **Panier & paiement en ligne** (Mobile Money via une passerelle locale type Voaray).
- **Interface d'administration / CMS** pour gérer les produits sans toucher au code.
- **Galerie de réalisations** et avis clients.
- **Suivi des statistiques** de visite (Vercel Analytics).

---

© HJF Créations — Antananarivo, Madagascar.
