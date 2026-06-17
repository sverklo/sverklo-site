# Community Drafts For Proof Sprint

Date: 2026-06-16

Rule: do not cross-post the same text. Adapt each post to the community and disclose affiliation.

## Manual Posting Queue

Use in this order:

1. MCP Discord or accepted MCP community channel: safest first feedback surface.
2. Reddit `r/mcp`: post once, only after participating or confirming rules still allow maintainer feedback asks.
3. Hacker News Show HN: hold until there are at least 15 external receipts/corrections.

Do not ask for stars in any first post. The only ask is a no-write proof run, correction, grep-better case, or setup-friction report.

## MCP Discord

Use in `#showcase`, a server-author feedback channel, or the closest accepted MCP project channel.

````markdown
Disclosure: I maintain Sverklo.

I am looking for correction/proof-run feedback from MCP server authors, not promotion.

Sverklo is a local-first repo-memory MCP for coding agents. The part I am trying to validate is the no-write proof flow: before someone installs MCP config, can it show a fair slice of their repo: central files, one real symbol, callers, and a prompt their agent can use?

From a repo root:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Useful feedback is mostly negative:

- wrong/noisy central files
- bad symbol choice
- callers that are technically references but not meaningful impact
- generated/test/example files dominating the proof
- setup friction around npm/model cache/runtime
- cases where ripgrep is simply the better tool

Proof thread for receipts/corrections:
https://github.com/sverklo/sverklo/discussions/79
````

Moderation risk: low to medium if posted once in the right channel and handled as a feedback thread. Avoid reposting across multiple channels.

## Hacker News Show HN

Use only after 15+ external proof receipts/corrections.

Title:

```text
Show HN: Sverklo, local-first repo memory for coding agents
```

First comment:

```markdown
I built Sverklo after watching coding agents edit shared functions without checking callers.

It is an MIT/local-first MCP server for Claude Code, Cursor, Windsurf, Codex CLI, and other MCP clients. It gives agents hybrid code search, symbol refs, dependency graphs, impact analysis, diff review, test mapping, and git-pinned memory.

The lowest-friction test is no-write:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It prints a receipt from your repo before writing config. I am looking for useful receipts, wrong/noisy receipts, and cases where grep is plainly better.

GitHub: https://github.com/sverklo/sverklo
```

## Reddit: r/mcp

Title:

```text
I built a no-write repo proof for MCP coding agents. Can you run it and tell me where it is wrong?
```

Body:

```markdown
Disclosure: I maintain Sverklo.

I am trying to make "repo memory for coding agents" falsifiable instead of another vague MCP claim.

The current proof path is no-write:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It should not write project files, MCP config, or agent instruction files. It may cache the local model/index under `~/.sverklo`.

The useful reply is not praise. I am looking for one of:

- a receipt if the selected files/symbol/callers are fair,
- a correction if the graph picks the wrong center,
- a case where grep/ripgrep is still the better move,
- setup friction if install/runtime gets in the way.

Proof thread: https://github.com/sverklo/sverklo/discussions/79
GitHub: https://github.com/sverklo/sverklo
```

## Reddit: r/ClaudeAI or Claude Code Community

Title:

```text
Claude Code kept missing callers, so I made the agent print a repo proof before setup
```

Body:

```markdown
Disclosure: I maintain Sverklo.

The failure mode I am targeting: a coding agent edits a shared function or config path without first seeing real callers, dependency impact, tests, or prior decisions.

Sverklo now has a no-write proof command:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It prints central files, one real symbol, real callers, proof-selection reasoning, and a paste-ready agent prompt from your repo.

I am looking for corrections more than praise:

- Did it pick the wrong center?
- Was grep plainly better?
- Was setup too slow or confusing?
- Did it expose context your agent would have missed?

Proof thread: https://github.com/sverklo/sverklo/discussions/79
```

## Discord/Slack Short Ask

```markdown
Disclosure: I maintain Sverklo, a local-first repo-memory MCP for coding agents.

I am collecting proof receipts/corrections, not asking for promotion. If anyone is willing to run one no-write command from a repo root:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

The most useful feedback is one wrong/noisy result, one grep-better case, or one setup-friction point.
```

## Direct Maintainer Ask

```markdown
Disclosure: I maintain Sverklo, an MIT local-first MCP/code-intelligence tool for coding agents.

I am trying to get beyond maintainer-seeded proof receipts. Your repo looks like a fair test because it has enough cross-file symbols/callers that a shallow agent search can be misleading.

Would you be open to running this no-write proof command from the repo root?

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It does not write project files, MCP config, or agent instruction files. It may cache the local model/index under `~/.sverklo`.

The useful reply is not praise. I am looking for one of:

- a receipt if the central files/symbol/callers are fair,
- a correction if the graph picks the wrong center,
- a case where grep/ripgrep is still the better move.

Public proof thread: https://github.com/sverklo/sverklo/discussions/79
```

## Skeptic Response

```markdown
Fair objection. If you know the exact string, grep/ripgrep is better and Sverklo should not be in the path.

The use case is when the agent needs relationships before editing: symbol exists, callers, dependency impact, related tests, and remembered decisions. I am looking for cases where that distinction breaks down.
```

## Hostile Response

```markdown
Fair. Disclosure: I built it. I should have made the post more useful on its own.

The actual ask is correction/proof, not promotion. I will keep links out unless someone asks.
```
