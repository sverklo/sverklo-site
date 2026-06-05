# Sverklo Proof-Run Outreach Queue

Date: 2026-06-04

Goal: get 20 non-maintainer proof runs, 5 public artifacts, and 3 correction-driven improvements.

Canonical command:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

## Already Executed

- Replied to Will-Ostrick in Discussion #79 after they said they would try Sverklo on a small repo:
  https://github.com/sverklo/sverklo/discussions/79#discussioncomment-17188158
- Opened a curator-list submission PR for `JackyST0/awesome-agent-skills`:
  https://github.com/JackyST0/awesome-agent-skills/pull/51
- Opened a curator-list submission PR for `punkpeye/awesome-mcp-servers`:
  https://github.com/punkpeye/awesome-mcp-servers/pull/7433
- Opened a curator-list submission PR for `TensorBlock/awesome-mcp-servers`:
  https://github.com/TensorBlock/awesome-mcp-servers/pull/653
- Opened a curator-list submission PR for `MobinX/awesome-mcp-list`:
  https://github.com/MobinX/awesome-mcp-list/pull/299
- Opened a curator-list submission PR for `jqueryscript/awesome-claude-code`:
  https://github.com/jqueryscript/awesome-claude-code/pull/358
- Branch-pushed `wong2/awesome-mcp-servers`, but GitHub blocked API PR creation for the account:
  https://github.com/nike-17/awesome-mcp-servers/tree/add-sverklo-20260605
- Branch-pushed `appcypher/awesome-mcp-servers`, but GitHub blocked API PR creation for the account:
  https://github.com/nike-17/awesome-mcp-servers-appcypher/tree/add-sverklo-20260605
- Skipped programmatic submission to `hesreallyhim/awesome-claude-code` because its templates explicitly require manual GitHub UI issue-form submission and forbid PR/CLI/programmatic recommendations.
- Published local site assets for adoption/citation clarity:
  - https://sverklo.com/proof/
  - https://sverklo.com/repo-memory-mcp/
  - https://sverklo.com/recipes/codex-cli/

## Safety Rule

Do not open unsolicited issues in unrelated repos just to promote Sverklo.

Preferred outreach channels:

1. existing GitHub discussion where tool feedback is already invited,
2. personal DM/social channel where the person already talks about coding agents,
3. maintainer email only when public contact is listed,
4. issue only when the repo explicitly has a "tools", "feedback", "showcase", or "directory submission" path.

Every reply should be logged as one of: `receipt`, `correction`, `grep-better`, `setup-friction`, `declined`, or `no-response`.

## Target Queue

| # | Target | Why This Fit | Personalized Hook | Ask |
| ---: | --- | --- | --- | --- |
| 1 | `czlonkowski/n8n-mcp` | MCP server for Claude Code, Windsurf, and Cursor; active TypeScript repo | Their README already frames multi-agent workflow automation, so repo-memory proof can test whether callers/workflows are selected usefully | Ask maintainer to run proof and tell whether central files/callers match the real workflow surface |
| 2 | `steipete/claude-code-mcp` | Claude Code as MCP server; code-agent power-user audience | A tool that embeds an agent inside an agent is an exact stress test for impact vs simple references | Ask for one receipt or the first noisy/wrong symbol |
| 3 | `rohitg00/awesome-claude-code-toolkit` | Claude Code ecosystem curator | Curated toolkit audiences can evaluate whether Sverklo belongs only after external proof exists | Ask for a correction-first review, not a listing |
| 4 | `ccplugins/awesome-claude-code-plugins` | Claude Code plugin directory | Directory maintainers need falsifiable proof before adding another MCP/code-intelligence tool | Ask for directory submission guidance after one proof run |
| 5 | `zilliztech/claude-context` | Adjacent code-search MCP competitor/comparator | Same category: codebase context for Claude Code | Ask whether Sverklo proof exposes a useful distinction or just duplicates existing context retrieval |
| 6 | `oraios/serena` | Adjacent semantic coding-agent toolkit | Similar promise: semantic retrieval/editing for coding agents | Ask for a grep-better or "Serena already covers this" correction |
| 7 | `addyosmani/agent-skills` | High-signal AI coding-agent skills audience | Production-grade skills need repo-aware impact checks before agent edits | Ask whether proof receipt format would be useful as a skill prerequisite |
| 8 | `ghuntley/how-to-build-a-coding-agent` | Coding-agent builders and workshop audience | Agent builders understand context failure and can critique retrieval proof quality | Ask for one small repo proof or a critique of the activation flow |
| 9 | `GLips/Figma-Context-MCP` | MCP used by Cursor/coding agents; active TypeScript | Design-to-code workflows often have scattered examples and tests | Ask whether Sverklo separates real impact from examples/docs |
| 10 | `grab/cursor-talk-to-figma-mcp` | Cursor/Claude Code MCP integration | Cross-file JS MCP project with obvious agent users | Ask for a no-write proof run and a noise report |
| 11 | `tech-leads-club/agent-skills` | Agent skill registry | They care about validated, safe agent extensions | Ask whether no-write proof is enough validation for a listing/review |
| 12 | `databricks-solutions/ai-dev-kit` | Enterprise coding-agent toolkit | Enterprise repos care about local-first/no-upload and dry-run config | Ask for setup-friction feedback more than praise |
| 13 | `ciembor/agent-rules-books` | AGENTS.md/rules audience | Sverklo writes agent instructions after proof; rules users can assess whether that is acceptable | Ask for correction on wording/trust boundary |
| 14 | `f/agentlytics` | Analytics for AI coding-agent usage | They track agent workflows; Sverklo needs proof-run conversion instrumentation | Ask for feedback on which activation metric should be tracked |
| 15 | `agent-sh/agentsys` | Agent automation system | Multi-agent users face context/impact failures | Ask for one proof run on their own repo and a false-positive report |
| 16 | `chenhg5/cc-connect` | Connects local agents to messaging platforms | Local-agent workflow tool with Go codebase and multiple integrations | Ask whether proof picks integration center or just obvious entrypoints |
| 17 | `iamzhihuix/skills-manage` | Desktop app managing agent skills across tools | Cross-platform agent skill users are good fit for safe setup preview | Ask for friction report on `init --dry-run` and `doctor --agent` |
| 18 | `FrancyJGLisboa/agent-skill-creator` | Agent skill creator across tools | Skill creators can test whether Sverklo's receipt should become a skill artifact | Ask for one generated-skill repo proof and correction |
| 19 | `rohitg00/skillkit` | Portable skills across Claude Code/Cursor/Codex | Same multi-agent portability audience | Ask for a receipt or "wrong abstraction" critique |
| 20 | `JackyST0/awesome-agent-skills` | Agent skills curator | Directory/listing fit after receipts exist | Ask for listing criteria and one proof/correction first |

## Short Direct Ask

Use when there is already a relationship or a public thread about coding-agent tooling:

~~~markdown
I am trying to get Sverklo beyond maintainer-seeded proof receipts.

Would you be open to running this from the repo root?

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It does not write project files, MCP config, or agent instruction files. It may cache the local model/index under `~/.sverklo`.

The useful reply is not praise. I am looking for one of:

- a receipt if the selected files/symbol/callers are fair,
- a correction if the graph picks the wrong center,
- a case where grep/ripgrep is still the better move.

Public proof thread: https://github.com/sverklo/sverklo/discussions/79
~~~

## Curator Ask

Use for awesome lists, plugin directories, and newsletters:

~~~markdown
I maintain Sverklo, a local-first repo-memory/code-intelligence MCP for coding agents.

New in `sverklo@0.29.1`: a no-write proof path:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It prints central files, one real symbol, real callers, why that proof was selected, and a paste-ready agent prompt from the user's repo. I am not asking for a listing before proof. I am looking for one receipt, correction, or "grep was better here" example.

Proof thread: https://github.com/sverklo/sverklo/discussions/79
~~~

## Follow-Up If Someone Runs It

```markdown
Thanks. Can I treat this as one of:

- external receipt,
- correction,
- grep-better,
- setup friction?

If it is a correction, I will turn it into a product issue and link back unless you prefer not to be mentioned.
```

## 7-Day Scorecard

| Metric | Target | Current |
| --- | ---: | ---: |
| Non-maintainer proof runs | 20 | 0 confirmed |
| Public third-party artifacts | 5 | 0 confirmed |
| Corrections or grep-better examples | 3 | 0 confirmed |
| Setup-friction reports | 3 | 0 confirmed |
| Curator submission PRs | 5 opened, 2 branch-pushed/blocked | 5 opened, 2 branch-pushed/blocked |
| Broad paid ads | 0 | 0 |

## Agent-Team Diagnosis

Adoption is currently a distribution plus external-proof problem, with product activation still the fastest diagnostic lever. Weighting from the 2026-06-05 agent team:

- Distribution: 55%.
- Activation / product proof quality: 30%.
- Messaging consistency: 15%.

Do not run paid ads yet. The next hard signal is whether 20 personalized proof asks produce at least 2 attempted runs. If people run proof and receipts are weak/noisy, fix product proof selection. If people do not run it, fix distribution and category clarity.

## 7-Day Operating Rule

1. Keep Discussion #79 as the proof center.
2. Build a 30-person proof list with repo-specific reasons.
3. Send no more than 7 personalized asks per day.
4. Ask for a receipt, correction, grep-better case, or setup-friction report.
5. Do not create another broad launch post until at least two external outcomes exist.
6. Use Reddit comment-first, disclosed, proof-first; never ask for stars, votes, DMs, or support.
