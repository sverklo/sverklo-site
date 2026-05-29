# Outreach Targets

Use only personalized, repo-specific messages. Do not bulk-send the template unchanged.

## Highest-fit communities

| Channel | Angle | Link |
| --- | --- | --- |
| Hacker News | Show HN, local-first MCP repo memory | https://news.ycombinator.com/submit |
| r/mcp | MCP tool surface, v0.28 short tool names, benchmark | https://www.reddit.com/r/mcp/ |
| r/ClaudeAI | Claude Code context loss and repo memory | https://www.reddit.com/r/ClaudeAI/ |
| r/LocalLLaMA | Local-first code intelligence, no code upload | https://www.reddit.com/r/LocalLLaMA/ |
| r/programming | Open-source local code intelligence with benchmark | https://www.reddit.com/r/programming/ |
| X / Bluesky | Repo memory for coding agents thread | https://x.com/ / https://bsky.app/ |
| LinkedIn | Maintainer/engineering-leader pitch | https://www.linkedin.com/ |

## Maintainer targets

Start with people who already ship MCP/code-intel/agent tooling, then OSS maintainers of complex repos.

| Target | Why | Suggested ask |
| --- | --- | --- |
| jcodemunch-mcp maintainer | Already engaged through benchmark loop | Ask for v0.28 tool-name/profile feedback |
| Serena maintainers | Large competitor in local code intelligence | Invite bench baseline or comparison correction |
| Continue maintainers | Agent users need local retrieval backends | Ask whether Sverklo should document Continue setup |
| Aider maintainers/users | Repo-map adjacent, complementary | Ask whether MCP retrieval setup is useful |
| Cursor power users | Pain around @codebase and local privacy | Ask for install friction feedback |
| Claude Code power users | Strongest immediate user fit | Ask for default profile feedback |
| Large TS repo maintainers | Symbol refs and diff review demo well | Offer an audit/report run |
| Security/compliance engineers | No code upload angle | Ask for threat-model objections |

## Metrics to record daily for 14 days

| Metric | Source |
| --- | --- |
| GitHub stars | GitHub repo API |
| GitHub unique visitors | GitHub traffic API |
| GitHub clones | GitHub traffic API |
| npm downloads last 7 days | npm downloads API |
| Homepage visits | telemetry worker |
| Install CTA copies | telemetry worker if tracked |
| Benchmark clicks | telemetry worker |
| Discussion/comment count | GitHub/HN/Reddit |
| Issues opened by new users | GitHub issues |

## First 10 DM notes to write manually

1. jcodemunch-mcp: thank them for prior benchmark feedback; ask about v0.28 short tool names.
2. Serena: ask if the comparison page misses anything; invite benchmark PR.
3. Continue: ask if a recipe for Continue context providers would help.
4. Aider: ask whether MCP retrieval as a companion to repo-map is worth documenting.
5. Cursor SDK users: ask for feedback on the MCP recipe.
6. Claude Code users with large monorepos: ask what default tools they want.
7. OSS maintainers from audit reports: send their report, not generic product copy.
8. MCP directory maintainers: request listing refresh with repo-memory positioning.
9. Security-focused users: ask for local-first threat-model objections.
10. AI coding newsletter authors: offer the benchmark and the "grep still wins exact strings" angle.
