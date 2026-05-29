# Sverklo Repo Memory Launch Pack

Date: 2026-05-29

## Positioning

Primary line:

> Give your coding agent repo memory.

One-sentence description:

> Sverklo is an open-source local-first MCP server that gives Claude Code, Cursor, Windsurf, Codex-style agents, and any MCP client your repo's symbols, callers, diffs, blast radius, and git-pinned decisions before it edits.

Proof points:

- 3k npm downloads per week
- 180-task public retrieval benchmark across 6 OSS codebases
- 26ms search p95 on React-sized repos
- 37 MCP tools in the full surface, compact default profile
- MIT, no API keys, no code upload

Primary CTA:

```bash
npm install -g sverklo
cd your-project && sverklo init
```

URLs:

- Homepage: https://sverklo.com/
- GitHub: https://github.com/sverklo/sverklo
- Bench: https://sverklo.com/bench/
- Demo: https://www.youtube.com/watch?v=OX7aEgdlqhQ
- Reports: https://sverklo.com/report/

## Hacker News

Title options:

1. Show HN: Sverklo - repo memory for coding agents
2. Show HN: I built an MCP server that gives coding agents repo memory
3. Sverklo: local-first code intelligence MCP for Claude Code and Cursor

Post:

I built Sverklo, an MIT-licensed local-first MCP server for coding agents.

The short version: Claude Code, Cursor, Windsurf, and other agents are good at editing, but they often enter a repo with no durable memory of its symbols, call graph, diffs, or project decisions. Sverklo runs locally and gives the agent tools for semantic code search, symbol lookup, refactor blast radius, diff-aware review, and git-pinned memory.

Install:

```bash
npm install -g sverklo
cd your-project && sverklo init
```

It writes MCP config, appends local instructions to AGENTS.md or CLAUDE.md, and runs a doctor check. Your code stays on your machine. The only first-run network call is the local ONNX embedding model download.

I also published the benchmark instead of only shipping a marketing page: 180 hand-verified retrieval tasks across 6 OSS codebases and 5 baselines. Sverklo leads overall F1 on that run, but the losses are visible too. Grep is still the right tool when you know the exact string; Sverklo is for relationship questions like "who calls this?", "what depends on this?", "what changed?", and "what decision did we make last time?"

Happy to answer hard questions, especially from people using MCP tools heavily.

## Reddit r/mcp

Title:

Open-source local-first MCP server for repo memory + code intelligence

Post:

Disclosure: I maintain Sverklo.

I have been building Sverklo, an MIT local-first MCP server for coding agents.

This is not meant to replace grep. Grep is still best when you know the exact string. Sverklo is for agent workflows where the model needs repo relationships before it edits:

- semantic code search
- symbol lookup and references
- refactor blast radius
- diff-aware review
- test coverage mapping
- git-pinned memory across sessions

Install is:

```bash
npm install -g sverklo
cd your-project && sverklo init
```

It works with Claude Code and other MCP clients. No API keys; your code stays local.

I also ship the benchmark: 180 hand-verified tasks across 6 OSS codebases, with naive grep, smart grep, jcodemunch-mcp, and GitNexus as baselines. The page includes where Sverklo loses.

I am looking for feedback on which MCP tools should be in the default profile. The v0.28.0 release also removed the old double `sverklo_` tool-name prefix, so the visible tools are now `search`, `lookup`, `impact`, `review_diff`, etc.

## Reddit r/ClaudeAI

Title:

Claude Code users: what repo-memory MCP tools should be in the default profile?

Post:

Claude Code is strong once it has the right files, but on large repos it can still waste a lot of context finding them, hallucinate names from training-data patterns, or forget decisions after compaction.

Sverklo is my attempt to make the repo itself available as MCP tools:

- `search` for semantic code search
- `lookup` / `refs` for symbol existence
- `impact` for refactor blast radius
- `review_diff` / `test_map` for PR review
- `remember` / `recall` for git-pinned project memory

It is MIT and local-first. Install:

```bash
npm install -g sverklo
cd your-project && sverklo init
```

The homepage has the demo and the benchmark: https://sverklo.com/

I am particularly looking for feedback from Claude Code users on what the default tool profile should include. The full surface is 37 tools, but the default profile stays compact.

## X / Bluesky Thread

Post 1:

I rebuilt Sverklo's positioning around the thing AI coding agents actually need:

repo memory.

Not another chat UI. Not cloud code search.

A local MCP server that gives Claude Code, Cursor, Windsurf, and Codex-style agents your repo's symbols, callers, diffs, blast radius, and git-pinned decisions.

Post 2:

Install:

```bash
npm install -g sverklo
cd your-project && sverklo init
```

MIT. No API keys. No code upload. First run downloads a local ONNX embedding model.

Post 3:

The useful mental model:

Use grep when you know the exact string.
Use Sverklo when the agent needs relationships:

- who calls this?
- what depends on it?
- what changed?
- what tests cover it?
- what did we decide last time?

Post 4:

The benchmark is public too:

180 hand-verified tasks across 6 OSS codebases, with naive grep, smart grep, jcodemunch-mcp, and GitNexus as baselines.

The losses are published next to the wins.

https://sverklo.com/bench/

Post 5:

If your agent has ever invented `getUserByEmail()` when your repo actually uses `findByEmail()`, this is the failure mode Sverklo is trying to close.

https://sverklo.com/

## LinkedIn

I have been working on Sverklo, an open-source local-first MCP server for AI coding agents.

The category I think matters is "repo memory." Agents like Claude Code and Cursor are strong editors, but they still need reliable access to the structure of the codebase: symbols, call sites, dependency graph, diffs, tests, and project decisions.

Sverklo runs locally and exposes those as MCP tools:

- semantic code search
- symbol lookup and references
- refactor blast-radius analysis
- diff-aware code review
- git-pinned memory across sessions

It is MIT licensed, needs no API keys, and does not upload code. Install is:

```bash
npm install -g sverklo
cd your-project && sverklo init
```

I also published a 180-task retrieval benchmark across 6 OSS repos, including the slices where Sverklo loses. Grep is still the right tool when you know the exact string. Sverklo is for relationship questions agents need before editing.

Homepage: https://sverklo.com/
GitHub: https://github.com/sverklo/sverklo

## GitHub Discussion

Title:

Help choose the default MCP tool profile for sverklo init

Body:

Sverklo v0.28.0 now advertises canonical short MCP tool names (`search`, `lookup`, `impact`, `review_diff`, etc.) instead of the old `sverklo_*` names.

The full surface is 37 tools, but most users should not pay attention to all of them on every session. The current positioning is:

- `core`: common repo-memory and code-intelligence path
- `lean`: adds memory and review tools
- `research`: broader exploration
- `review`: PR-review focused
- `full`: everything

Question for users: what tools do you actually expect to be present by default after `sverklo init`?

The jobs I am optimizing for:

- "Where is this behavior implemented?"
- "Can I safely rename this symbol?"
- "Review this branch before merge."
- "Remember this project decision for next session."
- "What files should the agent read first?"

## Direct Maintainer DM Template

Subject:

Local repo-memory MCP for AI agents

Message:

Hi {name}, {specific reason from their repo} made me wonder whether repo-memory tools would help there.

Would you run Sverklo on one nontrivial repo and tell me where the retrieval or memory model is wrong? I am looking for hard feedback, not promotion.

It gives Claude Code and other MCP-capable coding agents local tools for semantic search, symbol refs, refactor blast radius, diff-aware review, and git-pinned memory. Install is two commands:

```bash
npm install -g sverklo
cd your-project && sverklo init
```

No API keys, no code upload, MIT.

If this is not relevant, no worries. The most useful reply would be one specific correction, objection, or docs-fit opinion.

Homepage: https://sverklo.com/
Bench: https://sverklo.com/bench/

## Launch Day Checklist

- [ ] Deploy homepage.
- [ ] Push README update.
- [ ] Update GitHub repo description and topics.
- [ ] Open GitHub Discussion with default-profile question.
- [ ] Post HN Show HN.
- [ ] Post r/mcp.
- [ ] Post r/ClaudeAI.
- [ ] Post X / Bluesky thread.
- [ ] Post LinkedIn.
- [ ] DM 10 maintainers with repo-specific notes.
- [ ] Reply to every comment within 30 minutes for the first 4 hours.
- [ ] Track installs, stars, npm downloads, homepage CTR, and benchmark clicks.
