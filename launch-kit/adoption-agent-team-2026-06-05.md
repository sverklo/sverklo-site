# Sverklo Adoption Agent-Team Notes

Date: 2026-06-05

## Verdict

Slowed adoption is mostly a distribution and external-proof problem, not an ads problem.

Working weights:

- Distribution: 55%.
- Activation / proof quality: 30%.
- Messaging consistency: 15%.

Owned messaging is good enough to send traffic into because the no-write proof command is now the primary CTA. The weak signal is that discovery has not yet converted into independent receipts, corrections, or visible advocacy.

## Hard Decision Rule

Run 20 personalized proof asks.

- Fewer than 2 attempted runs: distribution or category clarity is the bottleneck.
- 5 or more attempted runs with weak/noisy receipts: product proof selection is the bottleneck.
- Repeated "why not grep / Cursor / Claude memory?" questions: messaging/category page needs another pass.

## 7-Day Plan

1. Keep GitHub Discussion #79 as the public proof center.
2. Build a 30-person proof list with one repo-specific reason per person.
3. Send up to 7 personalized asks per day.
4. Ask only for a receipt, correction, grep-better case, or setup-friction report.
5. Interview 3 users while they run the command and record time-to-proof plus trust objections.
6. Shepherd opened directory PRs; stop broad list chasing after current high-fit submissions.
7. Publish a community update only after at least 2 external outcomes exist.

## Reddit / Community Guardrails

- Comment first for 10-14 days in threads about agent context, MCP memory, local code search, hallucinated imports, or refactor blast radius.
- Disclose relationship: "Disclosure: I build Sverklo."
- Lead with the no-write proof command, not launch language.
- Invite bad receipts and grep-better cases.
- Do not ask for stars, upvotes, DMs, or support.
- Do not repost the same angle across communities.

## Canonical Ask

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Useful outcomes:

- external receipt,
- correction,
- grep-better case,
- setup friction.

## Site Assets Added

- `/proof/`: no-write proof HowTo and receipt classification.
- `/repo-memory-mcp/`: canonical category page for "repo memory MCP" and AI citation.
- `/recipes/codex-cli/`: Codex CLI-specific proof-first setup recipe.

## Open Directory PRs

- `JackyST0/awesome-agent-skills`: https://github.com/JackyST0/awesome-agent-skills/pull/51
- `punkpeye/awesome-mcp-servers`: https://github.com/punkpeye/awesome-mcp-servers/pull/7433
- `TensorBlock/awesome-mcp-servers`: https://github.com/TensorBlock/awesome-mcp-servers/pull/653
- `MobinX/awesome-mcp-list`: https://github.com/MobinX/awesome-mcp-list/pull/299
- `jqueryscript/awesome-claude-code`: https://github.com/jqueryscript/awesome-claude-code/pull/358
- `YuzeHao2023/Awesome-MCP-Servers`: https://github.com/YuzeHao2023/Awesome-MCP-Servers/pull/284

## Branch-Pushed But PR-Blocked

- `wong2/awesome-mcp-servers`: https://github.com/nike-17/awesome-mcp-servers/tree/add-sverklo-20260605
- `appcypher/awesome-mcp-servers`: https://github.com/nike-17/awesome-mcp-servers-appcypher/tree/add-sverklo-20260605
