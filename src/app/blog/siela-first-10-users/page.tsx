import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import BlogDock from '../../../components/BlogDock';

export const metadata = { title: 'How I got Siela’s first 10 users in two weeks | Danish Khan' };

export default function SielaFirstTenUsers() {
  return <main className="blog-shell article-shell">
    <header className="blog-nav"><Link href="/blog" className="blog-back">← All notes</Link><a href="mailto:dk557876@gmail.com"><Mail size={15}/> get in touch</a></header>
    <article className="article-content">
      <span className="blog-kicker">Product & growth · 6 min read</span>
      <h1>How I got Siela&apos;s first 10 users in two weeks</h1>
      <p className="article-lede">The first users did not come from a big launch. They came from getting close to a real problem, showing the work early, and treating every conversation as part of the product.</p>
      <div className="article-byline"><span>DK</span><p>By Danish Khan<br/><time>August 2026</time></p></div>

      <div className="article-body">
        <p>When I started building Siela, I was not trying to make another dashboard. I wanted to build an AI-native workspace that could take care of the small, repetitive work that gets in the way: CRM updates, follow-ups, tasks, meetings, reminders and calendar actions.</p>
        <p>That idea sounds broad on a landing page. It becomes useful only when it connects to a day someone has already had: a meeting that ended without notes, a lead that never made it into the CRM, or a follow-up that disappeared into a to-do list.</p>

        <h2>Start with the job, not the feature list</h2>
        <p>Early on, I focused on the job Siela should help with instead of explaining every capability. The conversation was not “here are the things the product can do.” It was “what is the work you keep postponing because it is too repetitive?”</p>
        <p>That helped me see the product through the user&apos;s actual workflow. A workspace only earns its place if it gives time back. The agent is not the headline; the feeling of fewer loose ends is.</p>

        <aside className="article-pullquote">“The first version of a product is not a presentation. It is a conversation people can react to.”</aside>

        <h2>Show the product before it feels finished</h2>
        <p>I shared Siela while it was still early. That created a better kind of feedback than waiting for a polished launch. People could point to the parts that felt valuable, the parts that felt unclear, and the moments where they would actually use it.</p>
        <p>For an early product, the goal is not to win every person. It is to find the people who immediately recognise the problem. Those are the conversations that turn into useful feedback, better product decisions and eventually the first users.</p>

        <h2>Make every early user part of the loop</h2>
        <p>The first 10 users were not a finish line. They were a signal that the problem was real enough for people to try a new workflow. Every early user gave me a sharper view of what needed to become simpler, more reliable or easier to explain.</p>
        <p>That is the advantage of being early: you can still listen closely. You can still make the product feel personal. And you can still build a relationship before you try to scale a number.</p>

        <h2>What I am taking forward</h2>
        <p>Two weeks and 10 users is a small milestone, but it matters because it makes the next question clearer. The work now is to keep earning that trust: make Siela more useful in the moments where people need it, keep the agent grounded in real context, and learn from the people using it every day.</p>
        <p>I am building Siela in public because the product will be better if the learning stays close to the people it is for.</p>
      </div>
      <div className="article-next"><span>Next field note</span><Link href="/blog">From video editor to product builder <ArrowUpRight size={16}/></Link></div>
    </article><BlogDock/>
  </main>;
}
