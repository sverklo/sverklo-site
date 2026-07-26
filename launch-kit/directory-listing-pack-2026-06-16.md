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

Sverklo is a local-first repo-memory MCP for coding agents: run a no-write proof receipt before relationship-heavy edits in Claude Code, Cursor, Windsurf, and Codex CLI.

## 160-Character Description

Local-by-default repo-memory MCP for coding agents. MIT; remote embeddings only if explicitly configured; telemetry off by default.

## 300-Character Description

Sverklo is a local-first repo-memory MCP for coding agents. Best for relationship-heavy edits: symbols, callers, dependencies, diff review, and git-pinned decisions before code changes. Start with a no-write proof receipt; use grep/ripgrep for exact strings. The bundled provider is local; remote embeddings are explicit.

## 800-Character Description

Sverklo is a local-first repo-memory and code-intelligence MCP for coding agents. It exposes 37 tools for hybrid BM25/vector search, symbol lookup, references, dependency graphs, blast-radius impact analysis, diff-aware review, test mapping, and git-pinned memory. It works with Claude Code, Cursor, Windsurf, Codex CLI, and other MCP clients. Start with a no-write proof receipt: `npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown`. The bundled ONNX provider runs locally and needs no API key. If a user explicitly configures a remote embedding provider, code chunks may be sent to that provider. Telemetry is off by default.

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

- Local by default: the bundled ONNX provider indexes and embeds on the user's machine.
- Remote-provider boundary: if a user explicitly configures a remote embedding provider, code chunks may be sent to that provider.
- No API key is required for the bundled provider.
- Grep is better when you know the exact string; Sverklo is for relationships before edits.
- Telemetry is opt-in, documented, and off by default.

Avoid:

- "Best MCP server"
- "Replaces grep"
- "Perfect repo memory"
- "Prevents all hallucinations"
- "Works on every repo"

## Directory Submission Checklist

- [ ] Listing uses no-write proof command first.
- [ ] Listing says MIT, bundled provider local/no API key, remote embedding provider explicit, and telemetry off by default.
- [ ] Listing links to proof thread and benchmark/proof page.
- [ ] Listing categorizes under code intelligence/developer tools.
- [ ] Listing includes Claude Code, Cursor, Windsurf, and Codex CLI.
- [ ] Listing does not claim Sverklo replaces grep.
- [ ] Listing includes current version: 0.29.2.

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
