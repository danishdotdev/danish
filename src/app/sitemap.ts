import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '../lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  return [{ url: 'https://danish.sh', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }, { url: 'https://danish.sh/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 }, ...posts.map((post) => ({ url: `https://danish.sh/blog/${post.slug}`, lastModified: new Date(post.updated_at), changeFrequency: 'monthly' as const, priority: 0.8 }))];
}
