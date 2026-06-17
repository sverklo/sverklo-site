# Proof-Run Priority Asks

Date: 2026-06-16

Purpose: first-touch outreach targets for the 1K-star proof sprint. Ask for one proof run, correction, grep-better case, or setup-friction report. Do not ask for stars in the first message.

Proof command:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Rules:

- Use public/community channels only where the project exposes them.
- Do not open unsolicited promotional GitHub issues.
- Keep peer-tool asks framed as correction requests, not comparison bait.
- Prefer one specific correction over generic visibility.
- Stop or back off if a community treats the ask as promotion.

## Ranked Targets

### 1. Serena / oraios

Link: https://github.com/oraios/serena

Why: closest peer for MCP coding-agent semantic retrieval, editing, and memory workflows.

Channel: GitHub Discussions or Discord if exposed by the repo.

Draft:

> Serena is probably the sharpest comparison point for Sverklo. Would you be open to running this no-write proof command in a repo you know well and posting either the receipt or a correction where Sverklo's graph/memory claims are weak? I am specifically looking for wrong/noisy proof, not stars.

Risk: competitor dynamic. Keep the ask humble and correction-first.

### 2. Aider

Link: https://github.com/Aider-AI/aider

Why: aider's repo map is one of the clearest baselines for AI-coding codebase context.

Channel: Aider Discord or community channel; avoid unsolicited issues.

Draft:

> Aider users understand repo maps better than almost anyone. Could you run Sverklo's no-write proof command on a repo where aider's map works well and tell us what the receipt gets wrong or misses? Public tracker is https://github.com/sverklo/sverklo/issues/85; no star ask.

Risk: high-volume maintainer/community. Use a narrowly relevant channel only.

### 3. Cline

Link: https://github.com/cline/cline

Why: open-source coding-agent users are a natural test group for repo-memory MCP tools.

Channel: Discord, `r/cline`, or GitHub Discussions if appropriate.

Draft:

> Cline is a natural test harness for repo-memory MCP tools. Could someone run Sverklo's no-write proof command on a real Cline repo/workspace and share either the markdown receipt or the first thing that feels misleading/noisy?

Risk: MCP/tool pitch fatigue. Ask for one correction, not adoption.

### 4. Repomix

Link: https://github.com/yamadashy/repomix

Why: strong audience for repo-context quality and a useful baseline against graph/memory proof.

Channel: Discord or GitHub Discussions if exposed.

Draft:

> Repomix users are exactly the people I would trust to catch bad repo-context claims. Could you run Sverklo's no-write proof command on a repo you know and reply with the receipt or a correction where symbol-graph proof is worse than a packed context file?

Risk: competitive comparison. Explicitly invite "Repomix is better here" feedback.

### 5. OpenHands

Link: https://github.com/OpenHands/openhands

Why: agent workspaces need context before edits and can test setup friction.

Channel: Slack/community channel linked by the project.

Draft:

> OpenHands is a good stress test for repo-context tools. Would someone run Sverklo's no-write proof command in an agent workspace and share the markdown receipt or a correction if it invents value, misses obvious context, or adds friction?

Risk: platform audience. Keep it technical and bounded.

### 6. Codebuff

Link: https://github.com/CodebuffAI/codebuff

Why: multi-agent file selection, planning, editing, and review makes a strong proof-run comparison surface.

Channel: community contact if available; avoid issues unless invited.

Draft:

> Codebuff's multi-agent file-selection flow is a useful benchmark for Sverklo. Could you run the no-write proof command on a repo where Codebuff already performs well and send the first correction or bad receipt you see?

Risk: vendor sensitivity. Do not imply replacement.

### 7. SWE-agent / mini-SWE-agent

Link: https://github.com/SWE-agent/SWE-agent

Why: benchmark-minded agent maintainers can judge whether a proof receipt predicts useful task context.

Channel: listed maintainer contact or Slack/community channel.

Draft:

> Since SWE-agent is benchmark-driven, I would value a falsification pass: run Sverklo's no-write proof command on a repo used for agent tasks and tell us whether the receipt predicts anything useful, or where it fails.

Risk: academic/benchmark maintainers dislike growth asks. Lead with falsification.

### 8. OpenCode

Link: https://github.com/anomalyco/opencode

Why: large open-source coding-agent community with read-only planning/exploration workflows.

Channel: Discord linked by the project/site.

Draft:

> OpenCode's plan/read-only mode is the kind of workflow Sverklo is trying to help. Could an OpenCode power user run Sverklo's no-write proof command and share the markdown receipt or one concrete correction?

Risk: large community and promo fatigue. Use a narrowly relevant channel only.

### 9. Gitingest

Link: https://github.com/coderamp-labs/gitingest

Why: clean baseline for prompt-friendly repository context.

Channel: Discord or Discussions if exposed.

Draft:

> Gitingest is a clean baseline for repo context. Could you run Sverklo's no-write proof command on a repo you know and tell us whether the receipt finds anything useful beyond a digest, or where it is just noise?

Risk: smaller project. Keep the ask humble.

### 10. Simon Willison

Link: https://simonwillison.net/

Why: high-signal writer and practitioner on coding agents, MCP, and agentic engineering.

Channel: only an appropriate existing public reply/contact route.

Draft:

> You have written skeptically and concretely about coding-agent context and MCP costs. If you have 5 minutes, could you run Sverklo's no-write proof command and share the first correction, overclaim, or setup-friction report? We are collecting proof/corrections, not asking for stars.

Risk: very high inbound volume. Only use if the message is exceptionally short and directly relevant to something current.

