import { getPublishedPosts } from '../../lib/blog';

function escapeXml(value: string) { return value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[character]!)); }

export async function GET() {
  const posts = await getPublishedPosts();
  const items = posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>https://danish.sh/blog/${post.slug}</link><guid>https://danish.sh/blog/${post.slug}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(post.published_at || post.updated_at).toUTCString()}</pubDate></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Danish Khan — Field notes</title><link>https://danish.sh/blog</link><description>Notes on AI products, growth and creative work.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } });
}
