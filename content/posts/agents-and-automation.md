---
title: "The difference between an agent and an automation"
slug: "agents-and-automation"
excerpt: "A practical way to choose between a reliable workflow and an AI system that needs judgment."
category: "AI workflows"
tags:
  - "AI workflows"
  - "automation"
  - "product design"
seo_title: "AI agents vs automation: when to use each"
seo_description: "A practical guide to choosing automation or an AI agent, with the right guardrails for each."
cover_image_url: "/portfolio/blog/agent-vs-automation-cover.png"
---

## The distinction that keeps a product simple

“Agent” has become a convenient label for almost any workflow with a model in it. That makes product conversations harder than they need to be. The useful question is not whether something can be called an agent. It is: **does this job require judgment, or does it require dependable repetition?**

That is the distinction I use when deciding what to build.

An **automation** follows a defined path: when this happens, do that. A calendar event is created; send a reminder. A form is submitted; create a record. A payment fails; notify the owner. Its value is consistency. You should be able to explain its behavior in a short sentence and expect the same result for the same input.

An **agent** has a goal, context, and some room to choose the next step. It may need to read a conversation, identify what matters, decide which information is missing, and prepare an action. Its value is not that it is mysterious. Its value is that it can handle a task where the path cannot be fully written in advance.

Neither is automatically better.

## Use automation when the rule is stable

Good automations remove the work no one should have to remember:

- move a lead into the right pipeline after a form submission;
- send a preparation note before a scheduled call;
- assign an owner when a support request contains a known category;
- create a weekly report from a fixed set of inputs.

The rule is clear, the action is bounded, and errors are easy to notice or reverse. That is where automation earns trust. Adding a model to these tasks can introduce variability without creating much additional value.

For a workspace product, I would rather have a boring, observable automation than a clever system that occasionally makes a surprising decision. Predictability is a feature.

## Use an agent when context changes the answer

An agent becomes useful when the work depends on information that cannot be reduced to one stable rule. For example:

- turn a meeting transcript into a proposed follow-up plan;
- summarize account history before a customer conversation;
- identify open questions across documents and drafts;
- prepare a CRM update from several scattered signals.

In each case, the system should have access only to the context it needs, and its job should be concrete. “Help with sales” is too broad. “Draft the account update using this meeting, these notes, and these existing CRM fields” is a workable assignment.

This is also where product design matters most. A helpful agent shows what it used, makes its proposal legible, and gives the person an easy way to change or reject it.

## The safest pattern: propose, then act

When an action affects a customer, a commitment, money, or sensitive data, I prefer a two-step workflow:

1. The agent prepares a recommendation or draft.
2. A person approves it before the irreversible action happens.

That does not make the experience slower by default. It moves human attention to the place where it adds the most value: the decision, not the copying and formatting around it.

The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) is a useful reference here because it treats AI work as something to govern according to context and risk, rather than as a feature that is safe simply because it is automated. In product terms: the more costly a wrong action is, the clearer the boundaries, review points, and recovery path need to be.

## A quick decision test

Before calling a feature an agent, I ask four questions:

1. **Can I write the path as deterministic rules?** If yes, start with automation.
2. **What context changes the right outcome?** If the answer is vague, the agent does not have a real job yet.
3. **What is allowed to happen without review?** Keep this narrow.
4. **How does a person correct it?** The answer should be visible in the interface, not hidden in a support process.

The best systems often combine both approaches. An agent can interpret a messy meeting and propose next steps; automations can reliably create the tasks, schedule the reminders, and keep the record clean after approval.

That combination is more useful than chasing an “agentic” label. Build the predictable parts as predictable systems. Reserve judgment for the work that truly needs it.
