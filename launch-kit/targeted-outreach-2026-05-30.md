# Targeted Outreach Queue

Date: 2026-05-30

Rule: personalize every note with one repo-specific observation before sending. Do not bulk-send unchanged text.

Primary CTA:

```bash
npm install -g sverklo
cd your-project && sverklo init
sverklo prove --markdown
```

Proof-first reuse rule: personalize every note, label the current proof thread as maintainer-seeded, and invite corrections. Do not imply third-party validation until an external receipt is logged.

Links:

- Homepage: https://sverklo.com/?utm_source=outreach&utm_medium=dm&utm_campaign=proof_receipts
- Proof wall: https://sverklo.com/#proof-wall
- GitHub proof thread: https://github.com/sverklo/sverklo/discussions/79
- Benchmark: https://sverklo.com/bench/?utm_source=outreach&utm_medium=dm&utm_campaign=benchmark

## 20 High-Fit Targets

| # | Target | Where | Personalization hook | Ask |
| --- | --- | --- | --- | --- |
| 1 | jcodemunch-mcp maintainer | GitHub / Reddit | Prior benchmark feedback loop | Run `prove --markdown` on jcodemunch and tell us where Sverklo loses |
| 2 | Serena maintainers | GitHub | Local code intelligence overlap | Check whether comparison/bench treatment is fair |
| 3 | codebase-memory-mcp maintainer | GitHub | Same MCP repo-memory category | Trade proof receipts and compare retrieval shape |
| 4 | GitNexus maintainer | GitHub | Existing benchmark baseline | Invite correction PR or receipt from GitNexus repo |
| 5 | Continue maintainers | GitHub / Discord | Agent workflow distribution | Ask whether a Continue setup recipe is worth adding |
| 6 | Aider maintainer/users | GitHub / X | Repo-map complement, not replacement | Ask whether MCP retrieval as companion makes sense |
| 7 | Claude Code power users | X / HN | Compaction and lost repo context | Ask for default-profile feedback on a real project |
| 8 | Cursor power users | X | @codebase privacy/locality tension | Ask whether install flow is credible vs Cursor-native indexing |
| 9 | MCP directory maintainers | GitHub | Category/listing freshness | Request category copy: "repo memory for coding agents" |
| 10 | PulseMCP maintainers | Site listing / X | Existing listing surface | Ask for copy/listing refresh and proof-wall link |
| 11 | DevHunt maintainers | Site listing / X | Developer-tool audience | Ask for launch resurfacing with benchmark angle |
| 12 | OSS TypeScript maintainers | GitHub | Symbol refs and caller graph value | Offer to run/share a proof receipt for their repo |
| 13 | Security/compliance engineers | X / LinkedIn | No code upload, no API keys | Ask for threat-model objections |
| 14 | Engineering managers using AI agents | LinkedIn | Review quality and merge risk | Ask for objections to diff-aware review positioning |
| 15 | AI coding newsletter authors | Email / X | Benchmark has wins and losses | Offer the "grep still wins exact strings" angle |
| 16 | MCP server authors | r/mcp / GitHub | Tool naming, default profile, proof | Ask what evidence would make them try it |
| 17 | Local-first AI builders | X / HN | ONNX + SQLite, no cloud dependency | Ask whether local-first claim is sharp enough |
| 18 | Monorepo maintainers | GitHub / LinkedIn | Cross-repo impact and PageRank | Ask for a repo where grep is painful |
| 19 | Code review tool builders | X / GitHub | Risk scoring and test map | Ask what a fair review-quality benchmark needs |
| 20 | Developer-relations folks | LinkedIn | Install friction and proof CTA | Ask what blocks a 2-minute try |

## Ready-To-Personalize Notes

### 1. MCP/code-intel maintainer

Hey <name>, I am working on Sverklo, a local-first MCP server for repo memory.

The reason I am asking you specifically: your project sits close to the same code-intelligence problem, and I would rather get hard feedback from someone who has built in this space than chase soft launch metrics.

Could you run this on your own repo and tell me one thing the graph gets wrong?

```bash
npm install -g sverklo
cd your-project && sverklo init
sverklo prove --markdown
```

Proof wall with examples: https://sverklo.com/#proof-wall

### 2. Claude Code / Cursor power user

Quick ask: can you run Sverklo's repo-memory proof on one real project?

It is meant to answer the thing agents often need before editing: what symbols exist, who calls them, what changed, and what decisions still apply.

```bash
npm install -g sverklo
cd your-project && sverklo init
sverklo prove --markdown
```

I care most about the failure mode: noisy files, wrong central symbols, missing callers, bad install friction.

Proof examples: https://sverklo.com/#proof-wall

### 3. Security/local-first reviewer

I am looking for threat-model objections to Sverklo's local-first positioning.

It is an MIT MCP server for code intelligence: SQLite index, local ONNX embeddings, no API keys, no code upload. First run downloads the embedding model, then indexing/search stays local.

Could you skim the proof flow and tell me what claim still feels under-specified?

https://sverklo.com/#proof-wall

### 4. Newsletter / curator

Possible story angle: Sverklo is trying to make "repo memory" a concrete, testable category for coding agents.

The launch proof is not just a landing page. It includes:

- maintainer-seeded proof examples from Sverklo, Express, Fastify, Zod, and Zustand
- a 180-task retrieval benchmark
- explicit cases where grep is still the right tool

Proof wall: https://sverklo.com/#proof-wall
Benchmark: https://sverklo.com/bench/

Happy to provide a short maintainer quote or a repo-specific receipt. Caveat: the current receipt thread is seeded until external users post their own receipts or corrections.

## Daily Follow-Up Loop

1. Send 5 personalized notes.
2. Record who replied, who installed, and what objection they raised.
3. Turn every repeated objection into one of: docs fix, landing-page copy fix, product issue, or benchmark addition.
4. Reply publicly where possible so one answer serves future visitors.
5. Stop a channel if it produces impressions but no installs, receipts, or stars after 48 hours.
