import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowUpRight, Mail } from 'lucide-react';
import BlogDock from '../../../components/BlogDock';
import { blogCoverUrl, getPublishedPost } from '../../../lib/blog';

export const dynamic = 'force-dynamic';

type BlogArticleProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return { title: 'Post not found | Danish Khan' };
  return { title: post.seo_title || `${post.title} | Danish Khan`, description: post.seo_description || post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', title: post.seo_title || post.title, description: post.seo_description || post.excerpt, images: [{ url: blogCoverUrl(post.cover_image_url) }] } };
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const post = await getPublishedPost((await params).slug);
  if (!post) return <main className="blog-shell article-shell"><header className="blog-nav"><Link href="/blog" className="blog-back">← All notes</Link></header><p className="article-lede">This note is not published yet.</p></main>;
  if (post.slug === 'siela-first-10-users') return null;
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt, datePublished: post.published_at, dateModified: post.updated_at, image: `https://danish.sh${blogCoverUrl(post.cover_image_url)}`, author: { '@type': 'Person', name: 'Danish Khan', url: 'https://danish.sh' }, mainEntityOfPage: `https://danish.sh/blog/${post.slug}` };
  return <main className="blog-shell article-shell"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/><header className="blog-nav"><Link href="/blog" className="blog-back">← All notes</Link><a href="mailto:dk557876@gmail.com"><Mail size={15}/> get in touch</a></header><article className="article-content"><span className="blog-kicker">{post.category}</span><h1>{post.title}</h1><p className="article-lede">{post.excerpt}</p><div className="article-byline"><Image src="/portfolio/danish-pfp.png" alt="Danish Khan" width={40} height={40}/><p>By Danish Khan<br/><time dateTime={post.published_at || post.updated_at}>{new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(post.published_at || post.updated_at))}</time></p></div><figure className="article-cover"><Image src={blogCoverUrl(post.cover_image_url)} alt="" width={1792} height={1008} priority/></figure><div className="article-body markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content_md}</ReactMarkdown></div><div className="article-next"><span>More notes</span><Link href="/blog">Back to all notes <ArrowUpRight size={16}/></Link></div></article><BlogDock/></main>;
}
