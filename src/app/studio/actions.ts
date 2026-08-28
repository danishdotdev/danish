'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cmsConfig, dynamo, publicAssetUrl, s3 } from '../../lib/cms';
import { getStudioUser } from '../../lib/cms-auth';

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function requireAdmin() {
  const user = await getStudioUser();
  if (!user) throw new Error('You are not allowed to use the Studio.');
  return user;
}

export async function savePost(formData: FormData) {
  const user = await requireAdmin();
  const title = String(formData.get('title') || '').trim().slice(0, 160);
  const slug = cleanSlug(String(formData.get('slug') || title)).slice(0, 120);
  const excerpt = String(formData.get('excerpt') || '').trim().slice(0, 360);
  const content = String(formData.get('content_md') || '').trim().slice(0, 50000);
  const category = String(formData.get('category') || 'Field note').trim().slice(0, 80);
  const tags = String(formData.get('tags') || '').split(',').map((tag) => tag.trim().slice(0, 40)).filter(Boolean).slice(0, 12);
  const publish = String(formData.get('intent')) === 'publish';
  if (!title || !slug || !excerpt || !content) throw new Error('Title, slug, description, and article content are required.');

  let coverImageUrl = String(formData.get('cover_image_url') || '').trim();
  const file = formData.get('cover_file');
  if (file instanceof File && file.size > 0) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (file.size > 5 * 1024 * 1024 || !allowed.includes(file.type)) throw new Error('Use a JPG, PNG, or WebP cover under 5 MB.');
    const ext = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
    const key = `covers/${user.sub}/${crypto.randomUUID()}.${ext}`;
    await s3.send(new PutObjectCommand({ Bucket: cmsConfig().bucket, Key: key, Body: Buffer.from(await file.arrayBuffer()), ContentType: file.type, CacheControl: 'public, max-age=31536000, immutable' }));
    coverImageUrl = publicAssetUrl(key);
  }
  if (!coverImageUrl || !/^https?:\/\//.test(coverImageUrl)) throw new Error('Add a valid cover image URL or upload a cover image.');

  const now = new Date().toISOString();
  await dynamo.send(new PutCommand({ TableName: cmsConfig().table, Item: { id: crypto.randomUUID(), title, slug, excerpt, content_md: content, category, tags, cover_image_url: coverImageUrl, seo_title: String(formData.get('seo_title') || '').trim().slice(0, 160) || null, seo_description: String(formData.get('seo_description') || '').trim().slice(0, 360) || null, status: publish ? 'published' : 'draft', is_featured: formData.get('is_featured') === 'on', published_at: publish ? now : undefined, updated_at: now, author_id: user.sub } }));
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  revalidatePath('/feed.xml');
  redirect('/studio?success=1');
}

export async function signOutStudio() {
  const { cookies } = await import('next/headers');
  (await cookies()).delete('danish_studio_session');
  redirect('/');
}
