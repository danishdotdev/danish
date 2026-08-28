import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, PenLine } from 'lucide-react';
import BlogDock from '../../components/BlogDock';

const drafts = [
  { label: 'Creative to product', title: 'From video editor to product builder: the path I didn’t plan', read: '5 min read' },
  { label: 'Immigration technology', title: 'Designing calmer experiences for stressful workflows', read: '7 min read' },
];

export default function BlogIndex() {
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
      <div className="blog-featured-visual"><Image src="/portfolio/blog/siela-first-10-users-cover-v3.png" alt="A founder reviewing feedback at a desk" fill priority sizes="(max-width: 680px) 100vw, 640px"/><div className="featured-visual-caption"><span>01</span><i>Siela / field note</i></div></div>
      <Link href="/blog/siela-first-10-users" className="blog-featured-copy">
        <span className="blog-kicker">Featured note</span>
        <h2 id="featured-title">How I got Siela&apos;s first 10 users in two weeks</h2>
        <p>Direct conversations, a rough first version, and the small decisions that helped Siela find its first users.</p>
        <div><span>Product & growth</span><span>4 min read</span><b>Read note <ArrowUpRight size={12}/></b></div>
      </Link>
    </section>

    <section className="blog-section blog-post-list" aria-label="More articles">
      <div className="blog-drafts">{drafts.map((draft) => <article key={draft.title}><div><span>{draft.label}</span><span>{draft.read}</span></div><h3>{draft.title}</h3><small>{draft.title === drafts[0].title ? 'Published' : 'Draft in progress'} <ArrowUpRight size={13}/></small></article>)}</div>
    </section>

    <footer className="blog-footer"><p>Want to talk product, growth, or creative work?</p><a href="mailto:dk557876@gmail.com">Email Danish <ArrowUpRight size={16}/></a></footer><BlogDock/>
  </main>;
}
