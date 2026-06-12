-- ════════════════════════════════════════════════════════════════════════
-- HJF Créations — Schéma de la base de données
-- À exécuter dans Supabase → SQL Editor → New query → Run.
-- Idempotent : peut être ré-exécuté sans danger.
-- ════════════════════════════════════════════════════════════════════════

-- ── Tables de contenu ────────────────────────────────────────────────────

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1), -- une seule ligne
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.produits (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nom text not null,
  categorie text not null check (categorie in ('textile', 'ceramique', 'plastique', 'cadeau')),
  prix integer, -- en Ariary ; null = « sur devis »
  image text not null default '',
  description text not null default '',
  details text[] not null default '{}',
  populaire boolean not null default false,
  badge text,
  tags text[] not null default '{}',
  ordre integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.temoignages (
  id uuid primary key default gen_random_uuid(),
  texte text not null,
  auteur text not null,
  contexte text not null default '',
  visible boolean not null default true,
  ordre integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.evenements (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  titre_script text not null default '', -- partie du titre en écriture manuscrite
  accroche text not null default '',     -- petit sur-titre (ex : « Idées cadeaux »)
  description text not null default '',
  image text not null default '',
  actif boolean not null default false,
  date_debut date,
  date_fin date,
  created_at timestamptz not null default now()
);

-- ── Sécurité (RLS) : lecture publique, écriture réservée aux admins ──────

alter table public.site_settings enable row level security;
alter table public.produits      enable row level security;
alter table public.temoignages   enable row level security;
alter table public.evenements    enable row level security;

drop policy if exists "lecture publique"  on public.site_settings;
create policy "lecture publique"  on public.site_settings for select using (true);
drop policy if exists "ecriture admins"   on public.site_settings;
create policy "ecriture admins"   on public.site_settings for all to authenticated using (true) with check (true);

drop policy if exists "lecture publique"  on public.produits;
create policy "lecture publique"  on public.produits for select using (true);
drop policy if exists "ecriture admins"   on public.produits;
create policy "ecriture admins"   on public.produits for all to authenticated using (true) with check (true);

drop policy if exists "lecture publique"  on public.temoignages;
create policy "lecture publique"  on public.temoignages for select using (true);
drop policy if exists "ecriture admins"   on public.temoignages;
create policy "ecriture admins"   on public.temoignages for all to authenticated using (true) with check (true);

drop policy if exists "lecture publique"  on public.evenements;
create policy "lecture publique"  on public.evenements for select using (true);
drop policy if exists "ecriture admins"   on public.evenements;
create policy "ecriture admins"   on public.evenements for all to authenticated using (true) with check (true);

-- ── Stockage des photos (bucket public « produits ») ─────────────────────

insert into storage.buckets (id, name, public)
values ('produits', 'produits', true)
on conflict (id) do update set public = true;

drop policy if exists "produits lecture publique" on storage.objects;
create policy "produits lecture publique" on storage.objects
  for select using (bucket_id = 'produits');

drop policy if exists "produits upload admins" on storage.objects;
create policy "produits upload admins" on storage.objects
  for insert to authenticated with check (bucket_id = 'produits');

drop policy if exists "produits update admins" on storage.objects;
create policy "produits update admins" on storage.objects
  for update to authenticated using (bucket_id = 'produits');

drop policy if exists "produits delete admins" on storage.objects;
create policy "produits delete admins" on storage.objects
  for delete to authenticated using (bucket_id = 'produits');
