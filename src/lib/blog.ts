import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { cmsConfig, dynamo, isAwsCmsConfigured } from './cms';

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

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isAwsCmsConfigured) return [fallbackPost];
  try {
    const { Items = [] } = await dynamo.send(new QueryCommand({ TableName: cmsConfig().table, IndexName: 'status-published_at-index', KeyConditionExpression: '#status = :published', ExpressionAttributeNames: { '#status': 'status' }, ExpressionAttributeValues: { ':published': 'published' }, ScanIndexForward: false }));
    const posts = Items as BlogPost[];
    posts.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    if (!posts.length) return [fallbackPost];
    return [...posts, fallbackPost].filter((post, index, all) => all.findIndex((candidate) => candidate.slug === post.slug) === index);
  } catch {
    return [fallbackPost];
  }
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  if (slug === fallbackPost.slug) return fallbackPost;
  if (!isAwsCmsConfigured) return null;
  try {
    const { Items = [] } = await dynamo.send(new QueryCommand({ TableName: cmsConfig().table, IndexName: 'slug-index', KeyConditionExpression: 'slug = :slug', ExpressionAttributeValues: { ':slug': slug }, Limit: 1 }));
    const post = Items[0] as (BlogPost & { status?: string }) | undefined;
    return post?.status === 'published' ? post : null;
  } catch { return null; }
}

export function blogCoverUrl(url: string) {
  return url.startsWith('/') || url.startsWith('http') ? url : `/${url}`;
}
