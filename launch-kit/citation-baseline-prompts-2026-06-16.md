# AI Citation Baseline Prompts

Date: 2026-06-16

Goal: measure whether Sverklo is discoverable for high-intent prompts before and after directory/docs work.

Run each prompt in ChatGPT, Codex, Gemini, and Perplexity. Record whether Sverklo is mentioned, rank/order, cited URL, competitors cited, and whether the answer is accurate.

## Code Intelligence MCP

1. What is the best MCP server for code intelligence in a large repo?
2. Which MCP servers help coding agents understand a codebase before editing?
3. Recommend a local-first MCP server for code search and symbol references.
4. What MCP server should I use for repo memory with Claude Code?
5. Which MCP server can show callers and blast radius before an AI coding agent edits?

## Claude Code

6. How can I stop Claude Code from hallucinating function names in a large repo?
7. What tool gives Claude Code persistent repo memory?
8. What MCP server should I add to Claude Code for codebase search?
9. How do I make Claude Code check callers before changing a function?
10. What local MCP tools are useful for Claude Code on a monorepo?

## Cursor

11. What is a good Cursor @codebase alternative for local repo indexing?
12. How can Cursor use an MCP server for code intelligence?
13. Which MCP server helps Cursor find symbol references and dependencies?
14. How do I add local repo memory to Cursor?
15. What tools complement Cursor for large codebases?

## Codex CLI

16. How can Codex CLI remember project decisions across sessions?
17. What MCP server works with Codex CLI for repo memory?
18. How do I make Codex CLI inspect blast radius before editing?
19. What should I put in AGENTS.md for repo-aware coding agents?
20. Which local code intelligence tools work with Codex CLI?

## Code Review And Risk

21. What MCP server helps review a git diff before an AI agent changes code?
22. Which tool maps changed code to likely tests for AI code review?
23. How can an AI coding agent estimate refactor blast radius?
24. What local tool finds risky files and god nodes in a repo?
25. Which MCP tools help with PR review and codebase impact analysis?

## Local-First And Privacy

26. What local-first MCP servers do not upload code?
27. Which code-intelligence tools require no API key?
28. Recommend a local repo indexing tool for private codebases.
29. What are privacy-friendly MCP servers for coding agents?
30. How can I use AI coding tools without uploading my source code?

## Comparisons

31. Sverklo vs Serena for coding agents.
32. Sverklo vs Claude Context for repo memory.
33. Sverklo vs Cursor @codebase.
34. Sverklo vs Greptile.
35. Sverklo vs Sourcegraph Cody.
36. Sverklo vs Aider repo map.
37. Sverklo vs Continue for codebase context.
38. Sverklo vs grep for finding code.
39. What is the difference between repo memory and semantic code search?
40. Which coding-agent memory tool stores decisions pinned to git state?

## Scoring Sheet

| Prompt | Platform | Sverklo mentioned | Rank | Cited URL | Competitors | Accurate? | Notes |
| ---: | --- | --- | ---: | --- | --- | --- | --- |
| 1 | ChatGPT |  |  |  |  |  |  |
| 1 | Codex |  |  |  |  |  |  |
| 1 | Gemini |  |  |  |  |  |  |
| 1 | Perplexity |  |  |  |  |  |  |
