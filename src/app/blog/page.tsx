import Link from 'next/link';
import { ArrowUpRight, Mail, PenLine } from 'lucide-react';

const lanes = [
  { number: '01', title: 'AI products', copy: 'Shipping useful agents, workspaces and early product decisions.' },
  { number: '02', title: 'Growth systems', copy: 'Finding users, positioning products and building repeatable momentum.' },
  { number: '03', title: 'Creative to product', copy: 'What editing, shooting and storytelling taught me about attention.' },
  { number: '04', title: 'Founder notes', copy: 'The honest, unfinished lessons from building in public.' },
];

const drafts = [
  { label: 'Product & growth', title: 'How I got Siela’s first 10 users in two weeks', read: '6 min read' },
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
      <div className="blog-featured-visual"><span>01</span><i>AI-native<br/>workspace</i></div>
      <div className="blog-featured-copy">
        <span className="blog-kicker">Start here</span>
        <h2 id="featured-title">How I got Siela&apos;s first 10 users in two weeks</h2>
        <p>The early launch decisions, direct conversations and small experiments behind Siela&apos;s first group of users.</p>
        <div><span>Product & growth</span><span>6 min read</span><b>Writing next</b></div>
      </div>
    </section>

    <section className="blog-section" aria-labelledby="map-title">
      <div className="blog-section-heading"><h2 id="map-title">What I write about</h2><span>04 lanes</span></div>
      <div className="blog-lanes">{lanes.map((lane) => <article key={lane.number}><span>{lane.number}</span><h3>{lane.title}</h3><p>{lane.copy}</p></article>)}</div>
    </section>

    <section className="blog-section" aria-labelledby="drafts-title">
      <div className="blog-section-heading"><h2 id="drafts-title">On the desk</h2><span>New writing in progress</span></div>
      <div className="blog-drafts">{drafts.map((draft) => <article key={draft.title}><div><span>{draft.label}</span><span>{draft.read}</span></div><h3>{draft.title}</h3><small>Draft in progress <ArrowUpRight size={13}/></small></article>)}</div>
    </section>

    <footer className="blog-footer"><p>Want to talk product, growth, or creative work?</p><a href="mailto:dk557876@gmail.com">Email Danish <ArrowUpRight size={16}/></a></footer>
  </main>;
}
