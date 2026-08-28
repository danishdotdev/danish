create extension if not exists pgcrypto;

create type public.post_status as enum ('draft', 'published');

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 140),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text not null check (char_length(excerpt) between 20 and 320),
  content_md text not null,
  cover_image_url text not null,
  category text not null default 'Field note',
  tags text[] not null default '{}',
  seo_title text,
  seo_description text,
  status public.post_status not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_posts_have_a_date check (status = 'draft' or published_at is not null)
);

create index posts_published_at_idx on public.posts (published_at desc) where status = 'published';
create index posts_featured_idx on public.posts (is_featured desc, published_at desc) where status = 'published';

alter table public.posts enable row level security;
revoke all on public.posts from anon, authenticated;
grant select on public.posts to anon;
grant select, insert, update, delete on public.posts to authenticated;

create policy "Public can read published posts" on public.posts for select to anon, authenticated using (status = 'published');
create policy "Admin can manage all posts" on public.posts for all to authenticated using ((select auth.jwt()->>'email') = 'dk557876@gmail.com') with check ((select auth.jwt()->>'email') = 'dk557876@gmail.com');

insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true) on conflict (id) do update set public = true;
create policy "Public can read blog images" on storage.objects for select to anon, authenticated using (bucket_id = 'blog-images');
create policy "Admin can upload blog images" on storage.objects for insert to authenticated with check (bucket_id = 'blog-images' and (select auth.jwt()->>'email') = 'dk557876@gmail.com');
create policy "Admin can update blog images" on storage.objects for update to authenticated using (bucket_id = 'blog-images' and (select auth.jwt()->>'email') = 'dk557876@gmail.com') with check (bucket_id = 'blog-images' and (select auth.jwt()->>'email') = 'dk557876@gmail.com');
create policy "Admin can delete blog images" on storage.objects for delete to authenticated using (bucket_id = 'blog-images' and (select auth.jwt()->>'email') = 'dk557876@gmail.com');
