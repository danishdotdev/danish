import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import BlogDock from '../../../components/BlogDock';

export const metadata = { title: 'How I got Siela’s first 10 users in two weeks | Danish Khan' };

export default function SielaFirstTenUsers() {
  return <main className="blog-shell article-shell">
    <header className="blog-nav"><Link href="/blog" className="blog-back">← All notes</Link><a href="mailto:dk557876@gmail.com"><Mail size={15}/> get in touch</a></header>
    <article className="article-content">
      <span className="blog-kicker">Product & growth · 4 min read</span>
      <h1>How I got Siela&apos;s first 10 users in two weeks</h1>
      <p className="article-lede">The first users did not come from a big launch. They came from getting close to a real problem, showing the work early, and treating every conversation as part of the product.</p>
      <div className="article-byline"><span>DK</span><p>By Danish Khan<br/><time>August 2026</time></p></div>

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
      </div>
      <div className="article-next"><span>Next field note</span><Link href="/blog">From video editor to product builder <ArrowUpRight size={16}/></Link></div>
    </article><BlogDock/>
  </main>;
}
