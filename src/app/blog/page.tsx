import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, PenLine } from 'lucide-react';
import BlogDock from '../../components/BlogDock';
import { blogCoverUrl, getPublishedPosts } from '../../lib/blog';

export const dynamic = 'force-dynamic';

function formatDate(date: string | null) {
  return date ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date)) : 'New note';
}

export default async function BlogIndex() {
  const posts = await getPublishedPosts();
  const featured = posts.find((post) => post.is_featured) || posts[0];
  const remaining = posts.filter((post) => post.id !== featured.id);
  return <main className="blog-shell">
    <header className="blog-nav">
      <Link href="/" className="blog-back">← Danish Khan</Link>
      <a href="mailto:dk557876@gmail.com"><Mail size={15}/> get in touch</a>
    </header>

    <section className="blog-hero">
      <span className="blog-kicker"><PenLine size={14}/> Field notes</span>
      <h1>Building, growing,<br/>and telling better stories.</h1>
      <p>Notes from the intersection of AI products, growth systems and the creative work that taught me how people pay attention.</p>
    </section>

    <section className="blog-featured" aria-labelledby="featured-title">
      <div className="blog-featured-visual"><Image src={blogCoverUrl(featured.cover_image_url)} alt="" fill priority sizes="(max-width: 680px) 100vw, 640px"/><div className="featured-visual-caption"><span>01</span><i>{featured.category} / field note</i></div></div>
      <Link href={`/blog/${featured.slug}`} className="blog-featured-copy">
        <span className="blog-kicker">Featured note</span>
        <h2 id="featured-title">{featured.title}</h2>
        <p>{featured.excerpt}</p>
        <div><span>{featured.category}</span><span>{formatDate(featured.published_at)}</span><b>Read note <ArrowUpRight size={12}/></b></div>
      </Link>
    </section>

    {remaining.length > 0 && <section className="blog-section blog-post-list" aria-label="More articles">
      <div className="blog-drafts">{remaining.map((post) => <Link href={`/blog/${post.slug}`} className="blog-post-card" key={post.id}><Image src={blogCoverUrl(post.cover_image_url)} alt="" width={640} height={360}/><div><span>{post.category}</span><span>{formatDate(post.published_at)}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><small>Read note <ArrowUpRight size={13}/></small></Link>)}</div>
    </section>}

    <footer className="blog-footer"><p>Want to talk product, growth, or creative work?</p><a href="mailto:dk557876@gmail.com">Email Danish <ArrowUpRight size={16}/></a></footer><BlogDock/>
  </main>;
}
