# Sverklo Traction Sprint

Date: 2026-06-03

Goal: get external proof receipts or corrections, not generic awareness.

Current bottleneck:

- GitHub stars and npm downloads are moving slowly.
- The public proof thread is still maintainer-seeded.
- `sverklo@0.29.1` now has a lower-risk first-run path, so the outreach ask can be smaller.

Primary CTA:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

What this does:

- runs from the user's repo,
- does not write project files,
- does not write MCP config,
- does not write agent instruction files,
- may cache the local ONNX model and index under `~/.sverklo`,
- prints central files, one real symbol, real callers, proof-selection reasoning, and a paste-ready agent prompt.

Follow-up only if useful:

```bash
npm install -g sverklo
sverklo init --dry-run
sverklo init
sverklo doctor --agent claude
```

Use the right agent name: `claude`, `cursor`, `codex`, `windsurf`, `vscode`, `copilot`, `copilot-cli`, `zed`, or `antigravity`.

## Operating Rule

Do not ask for stars first.

Ask for exactly one of:

1. a public proof receipt,
2. a correction,
3. a "grep was better here" example.

Corrections count as wins because they improve the proof loop and reduce trust risk.

## Priority Target Groups

### 1. OSS Maintainers With Medium/Large Repos

Best fit:

- active TypeScript, Python, Go, Rust, Java, or C# repos,
- enough modules/callers/tests that shallow search can mislead an agent,
- maintainers who already discuss code review, AI agents, MCP, or local-first tooling.

Personalization hook:

- name one real repo structure observation before asking,
- never imply the maintainer owes a reply,
- make the correction path explicit.

Draft:

> I maintain Sverklo, a local-first MCP/code-intelligence tool for coding agents.
>
> I am trying to get the public proof thread beyond maintainer-seeded receipts. Your repo looks like a fair test because it has enough cross-file symbols/callers that a shallow agent search can be misleading.
>
> Would you be open to running this no-write proof command from the repo root?
>
> ```bash
> npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
> ```
>
> It does not write project files or MCP config. It may cache the local model/index under `~/.sverklo`.
>
> The useful reply is not necessarily praise. I am looking for one of:
>
> - a receipt if the central files/symbol/callers are fair,
> - a correction if the graph picks the wrong center,
> - a case where grep is still the better move.
>
> Public proof thread: https://github.com/sverklo/sverklo/discussions/79

### 2. Coding-Agent Power Users

Best fit:

- Claude Code, Cursor, Codex CLI, Windsurf, or Copilot users,
- people posting agent failures, missed callers, context-loss, or review misses,
- people with real private repos who can share redacted output.

Draft:

> You have posted about coding-agent context failures, so this is the exact feedback I need.
>
> Sverklo now has a no-write proof command:
>
> ```bash
> npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
> ```
>
> It prints a repo-memory receipt without writing MCP config or agent instruction files. I am trying to learn whether the proof picks useful central files/symbols on real repos.
>
> If you try it, the most valuable reply is one concrete thing it gets wrong, noisy, or surprisingly right.

### 3. MCP Curators And Newsletter Editors

Best fit:

- MCP server directories,
- devtool newsletter editors,
- AI coding workflow curators,
- benchmark/retrieval skeptics.

Draft:

> Sverklo is trying to make "repo memory for coding agents" falsifiable instead of just a claim.
>
> New in `sverklo@0.29.1`: a no-write proof command:
>
> ```bash
> npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
> ```
>
> It prints central files, one real symbol, real callers, proof-selection reasoning, and a paste-ready agent prompt from the user's repo. The current public thread is intentionally labeled maintainer-seeded until external receipts/corrections land:
>
> https://github.com/sverklo/sverklo/discussions/79
>
> Useful angle: "try this on your repo and tell the maintainer where the graph is wrong."

## Public Thread Update

Use this in GitHub Discussion #79 after `0.29.1` is confirmed on npm:

~~~markdown
Update: `sverklo@0.29.1` is live with a lower-risk proof path.

You can now run the receipt without writing project files, MCP config, or agent instruction files:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

The command may cache the local ONNX model/index under `~/.sverklo`, but it does not wire Sverklo into your agent. If the receipt looks useful, run `npm install -g sverklo`, `sverklo init --dry-run`, then `sverklo init`.

The ask is still the same: reply with one receipt, one correction, or one place where grep was better.
~~~

## 48-Hour Sprint

1. Update homepage and `/install/` to lead with the no-write proof command.
2. Post the public thread update after npm confirms `0.29.1`.
3. Send 10 personalized maintainer notes.
4. Send 10 coding-agent power-user notes.
5. Refresh MCP directory listings where the old install/init-first copy appears.
6. Log every outcome as one of:
   - external receipt,
   - correction,
   - grep-better,
   - setup friction,
   - no response.

Success criteria:

- 3 external replies or corrections,
- 1 proof receipt good enough to label external,
- 1 product issue from a noisy/wrong proof result,
- no broad paid promotion until the above exists.
