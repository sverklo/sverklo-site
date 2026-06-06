# Sverklo Community Engagement Drafts

Date: 2026-06-05

Goal: earn external proof receipts, corrections, grep-better cases, and setup-friction reports.

## Guardrails

- Do not automate Reddit, Hacker News, Discord, or social posting.
- Use a real operator account and rewrite any draft in the operator's own words.
- Disclose the relationship: "I built/maintain Sverklo."
- Check the current community rules before posting.
- Do not ask for stars, votes, DMs, or support.
- Do not repost the same angle across communities.
- Lead with the no-write proof command and invite negative results.

Canonical proof command:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Useful outcomes:

- Receipt: selected files, symbol, and callers look fair.
- Correction: the graph chose the wrong center or missed important files.
- Grep-better: exact search was the better tool.
- Setup friction: Node/npm/model cache/output blocked the run.

## 48-Hour Order

1. Keep GitHub Discussion #79 as the proof hub:
   https://github.com/sverklo/sverklo/discussions/79
2. Follow up with the warm proof-thread respondent by asking for the wrong, noisy, or useful part.
3. Shepherd open curator PRs and respond only to maintainer feedback.
4. Claim or refresh high-intent MCP directory listings with proof-first copy.
5. Send the first 7 personalized proof asks from the tracker:
   https://sverklo.com/launch-kit/proof-run-tracker-2026-06-04.csv
6. Post community drafts manually only after rule review and rewrite.

## Draft: Hacker News Show HN

Title:

```text
Show HN: Sverklo, local repo memory for coding agents
```

Body:

```text
I built Sverklo, a local-first MCP server for Claude Code, Cursor, Windsurf, and Codex CLI.

The piece I am trying to validate is not "does this sound useful," but whether a no-write first run produces a receipt that matches a real codebase.

If you try one thing, run this from a repo root:

npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown

It should not write project files or MCP config. I am looking for corrections: wrong central files, noisy symbols, false callers, setup friction, or cases where grep/ripgrep is plainly better.
```

## Draft: Claude Code Community

```text
Disclosure: I built Sverklo.

I am looking for Claude Code users willing to break a no-write repo-memory proof flow. Sverklo is a local-first MCP/code-intelligence tool, but this ask is narrower: before installing anything, does the proof command pick meaningful files, symbols, and callers from your repo?

npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown

Free/open source, no API key, no code upload. Useful feedback is mostly negative: wrong hub files, useless symbol choice, callers from tests/examples instead of real impact, setup friction, or "ripgrep was better."
```

## Draft: MCP Community

```text
Disclosure: I maintain Sverklo.

I am looking for MCP-server-author critique on a local-first code-intelligence server. The current proof path is intentionally no-write:

npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown

What I would like reviewed is the MCP/product contract, not the landing page: does "central files + symbol + callers + agent prompt" provide enough evidence before a user trusts an MCP server with repo context?

Where would you expect this to fail: generated code, monorepos, examples/tests, language parsing, or trust/security expectations?
```

## Draft: High-Intent Reply

Use only when a thread explicitly asks for codebase-memory, MCP, token/coding-agent context, or local code-intelligence recommendations.

```text
Disclosure: I build Sverklo, so treat this as a biased suggestion.

Sverklo is not a token compressor. It is useful when the agent is wasting reads/grep calls because it needs repo relationships: symbols, callers, tests, dependencies, diffs, and prior decisions.

The no-write test is:

npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown

If you know the exact string, ripgrep is still the right tool. The useful feedback for Sverklo is a correction, a grep-better case, or setup friction.
```

