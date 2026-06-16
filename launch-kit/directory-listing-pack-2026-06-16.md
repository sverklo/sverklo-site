# Sverklo Directory Listing Pack

Date: 2026-06-16

Use this for MCP directories, awesome lists, newsletters, and AI-coding tool directories.

## Canonical Links

- GitHub: https://github.com/sverklo/sverklo
- Website: https://sverklo.com
- Proof page: https://sverklo.com/proof/
- Repo memory page: https://sverklo.com/repo-memory-mcp/
- Codex recipe: https://sverklo.com/recipes/codex-cli/
- npm: https://www.npmjs.com/package/sverklo
- Proof Discussion: https://github.com/sverklo/sverklo/discussions/79

## One-Line Listing

Sverklo is a local-first repo-memory MCP for coding agents: hybrid code search, symbol impact, diff review, and git-pinned decisions for Claude Code, Cursor, Windsurf, and Codex CLI.

## 160-Character Description

Local-first repo-memory MCP for coding agents: code search, symbol impact, diff review, and git-pinned decisions. MIT, no code upload.

## 300-Character Description

Sverklo is a local-first repo-memory MCP for coding agents. It gives Claude Code, Cursor, Windsurf, Codex CLI, and other MCP clients hybrid code search, symbol impact analysis, diff-aware review, and git-pinned decisions. MIT licensed, no API keys, no code upload.

## 800-Character Description

Sverklo is a local-first repo-memory and code-intelligence MCP for coding agents. It indexes your repo locally and exposes 37 tools for hybrid BM25/vector search, symbol lookup, references, dependency graphs, blast-radius impact analysis, diff-aware review, test mapping, and git-pinned memory. It works with Claude Code, Cursor, Windsurf, Codex CLI, and other MCP clients. The safest first run is a no-write proof receipt: `npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown`. Sverklo is MIT licensed, requires no API key, and does not upload code. Network use is limited to first-run model download unless telemetry is explicitly enabled.

## Install Snippets

No-write proof:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Global install:

```bash
npm install -g sverklo
sverklo init --dry-run
sverklo init
sverklo doctor --agent claude
```

MCP stdio package:

```json
{
  "command": "npx",
  "args": ["-y", "sverklo", "."]
}
```

## Categories

Preferred:

- Code Intelligence
- Developer Tools
- Coding Agents
- MCP Servers
- Knowledge and Memory
- Code Search
- Code Review
- Local-first Tools

Avoid if a directory has better options:

- Chatbot
- General AI
- Productivity

## Tags

`mcp`, `mcp-server`, `model-context-protocol`, `claude-code`, `cursor`, `windsurf`, `codex-cli`, `coding-agents`, `ai-coding`, `code-intelligence`, `repo-memory`, `agent-memory`, `code-search`, `semantic-search`, `local-first`, `code-review`, `blast-radius`, `dependency-graph`

## Claims With Caveats

Use:

- Local-first: index and search run on the user's machine.
- No code upload: Sverklo does not upload source code to a hosted service.
- No API key required.
- Grep is better when you know the exact string; Sverklo is for relationships before edits.
- Telemetry is opt-in and documented.

Avoid:

- "Best MCP server"
- "Replaces grep"
- "Perfect repo memory"
- "Prevents all hallucinations"
- "Works on every repo"

## Directory Submission Checklist

- [ ] Listing uses no-write proof command first.
- [ ] Listing says MIT, no API key, no code upload.
- [ ] Listing links to proof thread and benchmark/proof page.
- [ ] Listing categorizes under code intelligence/developer tools.
- [ ] Listing includes Claude Code, Cursor, Windsurf, and Codex CLI.
- [ ] Listing does not claim Sverklo replaces grep.
- [ ] Listing includes current version: 0.29.1.

## Follow-Up Note For Curators

```markdown
I maintain Sverklo, a local-first repo-memory/code-intelligence MCP for coding agents.

I am not asking for a listing before proof. The smallest validation is:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It prints central files, one real symbol, real callers, proof-selection reasoning, and a paste-ready agent prompt from the user's repo. I am looking for one receipt, one correction, or one "grep was better here" example.

Proof thread: https://github.com/sverklo/sverklo/discussions/79
```
