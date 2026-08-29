---
title: "Privacy basics for an AI workspace"
slug: "ai-workspace-privacy-basics"
excerpt: "A practical privacy baseline for products that use workplace context to make AI useful."
category: "AI product"
tags:
  - "AI product"
  - "privacy"
  - "workspace"
seo_title: "Privacy basics for an AI workspace"
seo_description: "A practical guide to permissions, data minimisation and transparency for AI workspace products."
cover_image_url: "/portfolio/blog/ai-workspace-privacy-cover.png"
---

## Useful context does not mean unlimited access

An AI workspace becomes useful when it can work with the things people already use to get work done: calendar events, meeting notes, documents, tasks, and customer records. That same context is why privacy needs to be part of the product from the beginning.

The right goal is not to say “we take privacy seriously” in a footer. It is to make a clear agreement with the person using the product: **what information is connected, why it is needed, what the feature can do with it, and how that access can be changed.**

Here is the practical baseline I would expect from a product that brings AI into everyday work.

## Ask for the smallest useful permission

Permission requests should match a specific job. If someone connects their calendar so the product can prepare a meeting brief, that does not automatically justify reading every document or changing every task.

Start with the narrowest scope that can make the first experience valuable. Expand only when a new capability makes the reason clear. This has two benefits: it limits unnecessary exposure, and it makes the product easier to understand.

The [NIST Privacy Framework](https://www.nist.gov/privacy-framework) is a useful guide because it treats privacy risk as something that should be managed through product and organisational choices, not just a legal document. In practice, fewer unnecessary data flows mean fewer things a product needs to explain, secure and recover from.

## Explain the moment of use

People should not have to guess whether an AI feature is using their personal workspace, shared team information, or only the page currently open.

Good interfaces explain this close to the moment where it matters. A meeting-summary tool can name the transcript it is working from. A CRM assistant can indicate that it is using the current account record and selected notes. A workspace search can show which sources were included.

This is more useful than a long generic notice because it lets a person decide whether the feature has the right context before they ask it to act.

## Separate reading from acting

There is an important difference between letting a product read a source and letting it make a change. Those should not feel like one invisible permission.

A sensible sequence is:

1. connect a source for read access;
2. show the information the assistant can use;
3. let the assistant prepare a proposed update;
4. ask for confirmation before it sends, edits, or deletes something meaningful.

This gives the user a natural review point. It also reduces the chance that a useful assistant quietly becomes an over-permissioned one.

## Make access easy to inspect and remove

If connecting an account takes one click, disconnecting it should not require a support request. The product should make it simple to see:

- which integrations are connected;
- what each connection is allowed to access;
- which workspace members can use that connection;
- when the access was last used;
- how to revoke it.

Clear controls make privacy operational. They help users solve a problem themselves instead of asking them to rely on a claim.

## Keep sensitive work out of vague prompts

An AI assistant should not encourage people to paste sensitive information into a broad, unstructured text box simply because it is convenient. The product can offer safer paths: connect the specific source, select the relevant records, or provide a scoped form for the task.

That creates better output as well as better privacy. A feature with selected context has less room to make assumptions, and a person can see what will be used before running it.

## Build privacy into the interaction design

Privacy is often treated as a backend concern. The backend matters, but the interface determines whether people understand the product’s behaviour. The most trustworthy AI workspace products make privacy visible through ordinary product choices: scoped connections, clear source labels, approval before important actions, and a straightforward way to remove access.

That is not friction for its own sake. It is what lets a product use context confidently without asking users to give up control of it.
