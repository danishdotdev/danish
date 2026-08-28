import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import BlogDock from '../../../components/BlogDock';

export const metadata: Metadata = {
  title: 'How I got Siela’s first 10 users in two weeks | Danish Khan',
  description: 'A founder field note on earning Siela’s first 10 users through conversations, an early product, and a tight feedback loop.',
  alternates: { canonical: '/blog/siela-first-10-users' },
  openGraph: {
    type: 'article',
    title: 'How I got Siela’s first 10 users in two weeks',
    description: 'A field note on earning early users by staying close to the problem.',
    url: '/blog/siela-first-10-users',
    images: [{ url: '/portfolio/blog/siela-first-10-users-cover-v3.png', width: 1792, height: 1008, alt: 'A founder reviewing early user-feedback notes at a desk' }]
  }
};

const publishedAt = '2026-08-29T00:00:00+05:30';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How I got Siela’s first 10 users in two weeks',
  description: 'A founder field note on earning Siela’s first 10 users through conversations, an early product, and a tight feedback loop.',
  datePublished: publishedAt,
  dateModified: publishedAt,
  image: 'https://danish.sh/portfolio/blog/siela-first-10-users-cover-v3.png',
  mainEntityOfPage: 'https://danish.sh/blog/siela-first-10-users',
  author: { '@type': 'Person', name: 'Danish Khan', url: 'https://danish.sh' },
  publisher: { '@type': 'Person', name: 'Danish Khan', url: 'https://danish.sh' }
};

export default function SielaFirstTenUsers() {
  return <main className="blog-shell article-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <header className="blog-nav"><Link href="/blog" className="blog-back">← All notes</Link><a href="mailto:dk557876@gmail.com"><Mail size={15}/> get in touch</a></header>
    <article className="article-content">
      <span className="blog-kicker">Product & growth · 4 min read</span>
      <h1>How I got Siela&apos;s first 10 users in two weeks</h1>
      <p className="article-lede">The first users did not come from a big launch. They came from getting close to a real problem, showing the work early, and treating every conversation as part of the product.</p>
      <div className="article-byline"><Image src="/portfolio/danish-pfp.png" alt="Danish Khan" width={40} height={40}/><p>By Danish Khan<br/><time dateTime={publishedAt}>August 29, 2026 · 4 min read</time></p></div>
      <figure className="article-cover"><Image src="/portfolio/blog/siela-first-10-users-cover-v3.png" alt="A founder reviewing early user-feedback notes at a desk" width={1792} height={1008} priority/><figcaption>A visual field note on making the first conversations count.</figcaption></figure>

      <div className="article-body">
        <p>When I started building Siela, I was not trying to make another dashboard. I wanted an AI-native workspace that could take care of the repetitive work that gets in the way: CRM updates, follow-ups, tasks, meetings, reminders and calendar actions. It only becomes useful when it connects to a day someone has actually had — a meeting without notes, a lost lead, or a follow-up that disappeared into a to-do list.</p>

        <h2>Start with the job, not the feature list</h2>
        <p>Early on, I focused on the job Siela should help with instead of explaining every capability. The question was simple: “What work do you keep postponing because it is repetitive?” A workspace earns its place when it gives time back. The agent is not the headline; fewer loose ends are.</p>

        <aside className="article-pullquote">“The first version of a product is not a presentation. It is a conversation people can react to.”</aside>

        <h2>Show the product before it feels finished</h2>
        <p>I shared Siela while it was still early. That gave me better feedback than waiting for a polished launch: people could point to what felt valuable, what felt unclear, and where they would use it. The goal was never to win everyone; it was to find the people who recognised the problem immediately.</p>

        <h2>Make every early user part of the loop</h2>
        <p>The first 10 users were not a finish line. They were a signal that the problem was real enough for people to try a new workflow. Each person made the next decision clearer: what needed to become simpler, more reliable, or easier to explain.</p>

        <h2>What I am taking forward</h2>
        <p>Two weeks and 10 users is a small milestone, but it makes the next question clearer: how do I keep earning that trust? The work is to make Siela more useful in the moments people need it, keep the agent grounded in real context, and learn closely from the people using it.</p>

        <h2>A useful standard for publishing the learning</h2>
        <p>I am writing these notes from direct work, not to manufacture a page for every possible search query. That matters. Google’s guidance for AI search says the same fundamentals still apply: make content useful, clear, and genuinely written for people; there are no extra technical requirements for AI features. <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noreferrer">Read Google’s guidance on AI features <ArrowUpRight size={14}/></a>.</p>
      </div>
      <section className="article-sources" aria-labelledby="sources-title"><span className="blog-kicker">Further reading</span><h2 id="sources-title">Sources & context</h2><p>This is a first-person account of building Siela. The links below provide standards used to shape the article, not evidence for my own launch experience.</p><ul><li><a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noreferrer">Google Search Central: Creating helpful, reliable, people-first content <ArrowUpRight size={14}/></a></li><li><a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" target="_blank" rel="noreferrer">Google Search Central: Introduction to structured data markup <ArrowUpRight size={14}/></a></li></ul></section>
      <div className="article-next"><span>Next field note</span><Link href="/blog">From video editor to product builder <ArrowUpRight size={16}/></Link></div>
    </article><BlogDock/>
  </main>;
}
