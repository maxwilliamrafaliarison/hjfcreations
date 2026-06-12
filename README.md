# HJF Créations — Site vitrine, catalogue & administration

Site web de **HJF Créations** : sublimation personnalisée (coton, céramique, plastique) à Antananarivo.
Catalogue moderne avec commande directe par **WhatsApp** et **email**, et **espace d'administration**
pour modifier le contenu sans toucher au code.

> *« Créé avec passion, offert avec amour. »*

Construit avec **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4** et **Supabase**
(base de données + authentification + stockage des photos).

---

## 🗂️ Pages

| Page | Adresse | Contenu |
|------|---------|---------|
| Accueil | `/` | Hero, collections, produits phares, événement/promo, Collège & Lycée, avis |
| Boutique | `/boutique` | Catalogue filtrable par l'URL (`?cat=textile…`) |
| Fiche produit | `/boutique/<produit>` | Détails, JSON-LD Product, commande WhatsApp/email |
| À propos | `/a-propos` | Histoire et valeurs |
| Contact | `/contact` | Coordonnées, formulaire, FAQ achat |
| **Administration** | `/admin` | **Réservé aux admins** — contact, produits, tarifs, photos, avis, événements |

## 🔐 Administration

- Accès : `https://votre-site/admin` — connexion par **email + mot de passe**.
- Administrateurs autorisés : définis par la variable `ADMIN_EMAILS` **et** créés
  dans Supabase (Authentication → Users). Actuellement : Franck
  (`hjcreation101@gmail.com`) et Max (`max.fianar@gmail.com`).
- Toute modification (contact, produit, prix, photo, avis, événement) est
  **visible immédiatement** sur le site public.
- Si la base est injoignable, le site public retombe automatiquement sur le
  contenu de secours de `src/data/` — il ne casse jamais.

## 🚀 Démarrer en local

Pré-requis : [Node.js](https://nodejs.org) 20+.

```bash
npm install            # une seule fois
cp .env.example .env.local   # puis remplissez les 4 valeurs (voir ci-dessous)
npm run dev            # http://localhost:3000
```

> Sans `.env.local`, le site fonctionne quand même (contenu statique de
> `src/data/`) mais l'administration est désactivée.

## ☁️ Mise en place Supabase (une seule fois)

1. **Créer le projet** : [supabase.com](https://supabase.com) → New project
   (gratuit), nommé par ex. `hjfcreations`.
2. **Créer les tables** : Supabase → *SQL Editor* → coller le contenu de
   [`supabase/schema.sql`](supabase/schema.sql) → **Run**. (Ré-exécutable sans danger.)
3. **Créer les 2 admins** : *Authentication → Users → Add user* —
   `hjcreation101@gmail.com` et `max.fianar@gmail.com` avec leurs mots de passe
   (cocher « Auto confirm »). Puis *Authentication → Sign In / Up* :
   **désactiver** « Allow new users to sign up ».
4. **Récupérer les clés** : *Project Settings → API Keys* → URL du projet,
   clé `anon`, clé `service_role`.
5. **Variables d'environnement** : remplir `.env.local` (local) **et**
   Vercel → *Settings → Environment Variables* (production) :

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | clé publique (lecture + connexion) |
| `SUPABASE_SERVICE_ROLE_KEY` | **secrète**, serveur uniquement (photos, seed) |
| `ADMIN_EMAILS` | emails admin séparés par des virgules |

6. **Remplir la base avec le contenu actuel** :

```bash
npm run seed
```

7. **Redéployer** sur Vercel (un simple `git push` suffit).

### Garder la base éveillée

Le plan gratuit Supabase met le projet en pause après ~7 jours sans requête.
Le fichier [`vercel.json`](vercel.json) programme un **cron quotidien** qui
appelle `/api/keepalive` — rien à faire, c'est automatique une fois déployé.

## ✏️ Modifier le contenu

- **Au quotidien : passez par `/admin`** (aucune connaissance technique requise).
- Le dossier `src/data/` contient le **contenu de secours** (et le seed initial) :
  `site.ts` (coordonnées), `produits.ts` (catalogue), `temoignages.ts` (avis),
  `evenements.ts` (événement par défaut). Il n'est utilisé que si la base est
  vide ou injoignable.

## 📁 Structure du projet

```
src/
├── app/
│   ├── (site)/               Pages publiques (accueil, boutique, contact…)
│   ├── admin/                Administration (login + pages protégées)
│   │   ├── actions.ts        Server actions (validation zod + updateTag)
│   │   └── (protected)/      Tableau de bord, contact, produits, avis, événements
│   ├── api/keepalive/        Ping quotidien anti-pause Supabase
│   ├── layout.tsx            Racine (polices, métadonnées)
│   ├── sitemap.ts/robots.ts  SEO
│   └── opengraph-image.tsx   Image de partage générée
├── components/               Composants du site + components/admin/*
├── data/                     ⭐ Contenu de secours + seed initial
├── lib/
│   ├── content.ts            Couche de données (cache + fallback)
│   └── supabase/             Clients (public, serveur, service)
├── proxy.ts                  Protection de /admin (session + allowlist)
supabase/schema.sql           Schéma de la base (à exécuter dans Supabase)
scripts/seed.ts               Remplissage initial (npm run seed)
```

## ☁️ Déploiement

À chaque `git push` sur `main`, Vercel reconstruit et déploie automatiquement
(projet `hjfcreations` → https://hjfcreations.vercel.app). Pour un domaine
personnalisé : Vercel → *Settings → Domains*, puis mettre à jour `url` dans
`src/data/site.ts`.

---

© HJF Créations — Antananarivo, Madagascar. Crédits photos : voir [IMAGES.md](IMAGES.md).
