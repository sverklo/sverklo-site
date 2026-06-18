# Reddit Posting Pack

Date: 2026-06-18

Goal: get external proof receipts, corrections, grep-better cases, or setup-friction reports from communities that already discuss MCP and Claude Code workflows.

Constraint: do not automate Reddit posting. Use a real operator account, disclose affiliation, and rewrite in the operator's own words if needed.

## Rule Check

### r/mcp

Fit: best first post.

Observed rules:

- Fully launched services are allowed; waitlists and landing-page-only announcements are not.
- AI-generated slop is banned.
- Self-promotion is allowed with proper disclosure.
- Use the showcase tag for authored MCP work.

Post type: standalone post with `showcase` tag.

Risk: medium. The community allows this, but the post must be specific and correction-seeking, not launch-copy.

### r/ClaudeCode

Fit: second post after at least one r/mcp response or after a 24-48 hour gap.

Observed rules:

- Posts must focus on Claude Code workflows, agents, MCP, tutorials, troubleshooting, or developer practice.
- Required flair must be used.
- Substantive posts need concrete details.
- Promotions must disclose what the tool does, who benefits, costs, and the poster's relationship. No repeated promotion.

Post type: `Showcase` or `Resource`, depending on available flair.

Risk: medium. It is a fit, but posting the same day as r/mcp may read as a distribution blast.

### r/LocalLLaMA / r/LocalLLM

Fit: hold.

Observed rule: self-promotion follows a 1/10 guideline and requires clear affiliation disclosure.

Post type: comment only, and only when a thread explicitly asks about local coding agents, local context, MCP, or repo memory.

Risk: high unless the operator account already has strong non-promotional participation.

### Hacker News

Fit: hold.

Reason: existing plan says Show HN should wait until there are at least 15 external receipts/corrections. Posting before proof exists repeats the generic-launch mistake.

## Posting Order

1. Post once to `r/mcp` with `showcase`.
2. Monitor comments for corrections, grep-better cases, and setup friction.
3. If there is a useful response, convert it into a fix or public proof receipt.
4. After 24-48 hours, post a Claude Code-specific version to `r/ClaudeCode`.
5. Do not post to `r/LocalLLaMA`, `r/LocalLLM`, or Hacker News yet.

## r/mcp Post

Title:

```text
I built a no-write repo proof for MCP coding agents. Can you tell me where it is wrong?
```

Body:

```markdown
Disclosure: I maintain Sverklo. It is open source/MIT and free to run locally.

I am trying to make "repo memory for coding agents" falsifiable instead of another vague MCP claim.

The current proof path is no-write:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It should not write project files, MCP config, or agent instruction files. It may cache the local model/index under `~/.sverklo`.

What it prints from your repo:

- central files,
- one real symbol,
- callers / impact evidence,
- proof-selection reasoning,
- a paste-ready agent prompt.

The useful reply is not praise. I am looking for one of:

- a receipt if the selected files/symbol/callers are fair,
- a correction if the graph picks the wrong center,
- a case where grep/ripgrep is still the better move,
- setup friction if install/runtime gets in the way.

Public proof thread:
https://github.com/sverklo/sverklo/discussions/79

Repo:
https://github.com/sverklo/sverklo
```

Expected tag: `showcase`.

## r/ClaudeCode Post

Title:

```text
Claude Code kept missing callers, so I made it print a repo proof before setup
```

Body:

```markdown
Disclosure: I maintain Sverklo. It is open source/MIT and free to run locally.

The failure mode I am targeting: Claude Code edits a shared function or config path without first seeing real callers, dependency impact, tests, or prior decisions.

Sverklo now has a no-write proof command:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It should not write project files, MCP config, or agent instruction files. It may cache the local model/index under `~/.sverklo`.

The command prints central files, one real symbol, real callers, proof-selection reasoning, and a paste-ready prompt from your repo.

I am looking for corrections more than praise:

- Did it pick the wrong center?
- Was grep plainly better?
- Was setup too slow or confusing?
- Did it expose context your agent would have missed?

Public proof thread:
https://github.com/sverklo/sverklo/discussions/79

Repo:
https://github.com/sverklo/sverklo
```

Expected flair: `Showcase` or `Resource`.

## Comment-Only Reply

Use only when a thread explicitly asks about codebase memory, MCP, local coding-agent context, token waste, or repo search.

```markdown
Disclosure: I maintain Sverklo, so treat this as biased.

For exact strings, ripgrep is still the right tool. The gap Sverklo tries to cover is when a coding agent needs relationships before editing: central files, symbols, callers, related tests, dependencies, and prior repo decisions.

The no-write test is:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Useful feedback is a correction, a grep-better case, or setup friction.
```

