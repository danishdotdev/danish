import { createClient } from '@supabase/supabase-js';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_md: string;
  cover_image_url: string;
  category: string;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  updated_at: string;
  is_featured: boolean;
};

const fallbackPost: BlogPost = {
  id: 'siela-field-note',
  title: 'How I got Siela’s first 10 users in two weeks',
  slug: 'siela-first-10-users',
  excerpt: 'Direct conversations, a rough first version, and the small decisions that helped Siela find its first users.',
  content_md: '',
  cover_image_url: '/portfolio/blog/siela-first-10-users-cover-v3.png',
  category: 'Product & growth',
  tags: ['Siela', 'early users'],
  seo_title: null,
  seo_description: null,
  published_at: '2026-08-29T00:00:00+05:30',
  updated_at: '2026-08-29T00:00:00+05:30',
  is_featured: true,
};

export const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

function publicClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = publicClient();
  if (!supabase) return [fallbackPost];
  const { data, error } = await supabase.from('posts').select('*').eq('status', 'published').order('is_featured', { ascending: false }).order('published_at', { ascending: false });
  if (error || !data?.length) return [fallbackPost];
  const posts = data as BlogPost[];
  return [...posts, fallbackPost].filter((post, index, all) => all.findIndex((candidate) => candidate.slug === post.slug) === index);
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  if (slug === fallbackPost.slug) return fallbackPost;
  const supabase = publicClient();
  if (!supabase) return null;
  const { data } = await supabase.from('posts').select('*').eq('status', 'published').eq('slug', slug).maybeSingle();
  return data as BlogPost | null;
}

export function blogCoverUrl(url: string) {
  return url.startsWith('/') || url.startsWith('http') ? url : `/${url}`;
}
