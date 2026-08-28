'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient, isStudioAdmin } from '../../lib/supabase/server';

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function adminClient() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error('CMS is not configured.');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isStudioAdmin(user.email)) throw new Error('You are not allowed to use the Studio.');
  return { supabase, user };
}

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  if (!isStudioAdmin(email)) redirect('/studio?error=denied');
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/studio?error=setup');
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://danish.sh';
  await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/auth/callback?next=/studio` } });
  redirect('/studio?sent=1');
}

export async function savePost(formData: FormData) {
  const { supabase, user } = await adminClient();
  const title = String(formData.get('title') || '').trim();
  const slug = cleanSlug(String(formData.get('slug') || title));
  const excerpt = String(formData.get('excerpt') || '').trim();
  const content = String(formData.get('content_md') || '').trim();
  const category = String(formData.get('category') || 'Field note').trim();
  const intent = String(formData.get('intent') || 'draft');
  const tags = String(formData.get('tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean);
  if (!title || !slug || !excerpt || !content) throw new Error('Title, slug, description, and article content are required.');
  let coverImageUrl = String(formData.get('cover_image_url') || '').trim();
  const file = formData.get('cover_file');
  if (file instanceof File && file.size > 0) {
    if (file.size > 5 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Use a JPG, PNG, or WebP cover under 5 MB.');
    const extension = file.name.split('.').pop() || 'png';
    const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from('blog-images').upload(path, file, { contentType: file.type, upsert: false });
    if (uploadError) throw new Error(uploadError.message);
    coverImageUrl = supabase.storage.from('blog-images').getPublicUrl(path).data.publicUrl;
  }
  if (!coverImageUrl) throw new Error('Add a cover image URL or upload a cover image.');
  const isPublished = intent === 'publish';
  const payload = { title, slug, excerpt, content_md: content, category, tags, cover_image_url: coverImageUrl, seo_title: String(formData.get('seo_title') || '').trim() || null, seo_description: String(formData.get('seo_description') || '').trim() || null, status: isPublished ? 'published' : 'draft', is_featured: formData.get('is_featured') === 'on', published_at: isPublished ? new Date().toISOString() : null, author_id: user.id };
  const { error } = await supabase.from('posts').insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  redirect('/studio?success=1');
}

export async function signOutStudio() {
  const supabase = await createServerSupabaseClient();
  await supabase?.auth.signOut();
  redirect('/studio');
}
