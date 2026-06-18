# Sverklo External Proof Receipt Sprint

Date: 2026-06-16

Goal: collect proof receipts, corrections, grep-better cases, and setup-friction reports from real repos. Star growth is a downstream visibility metric, not the ask.

Baseline:

- GitHub stars: 72
- Forks: 9
- GitHub subscribers: 1
- npm downloads, last week: 203
- npm downloads, last month: 7,844

Downstream target: 1,000 GitHub stars by 2026-08-11.

Required lift: +928 stars in 56 days, or about 116 net new stars per week.

## Blunt Feasibility

The target is not reachable by posting from the empty brand X account. That account is useful as a receipt archive, but not as the distribution engine.

The credible path is:

1. get external proof receipts and corrections,
2. turn corrections into fixes within 48 hours,
3. route receipts through high-intent developer channels,
4. use directory and AI-citation surfaces to keep discovery compounding.

If proof receipts stall, expected outcome is 350 to 600 stars. Hitting 1,000 requires at least one breakout event: Hacker News, Reddit, an MCP directory, an awesome list, or a creator/newsletter mention.

## Positioning

Do not lead with "another MCP server."

Lead with:

> Before your coding agent edits, make it prove it understands the repo.

Primary command:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Primary ask:

> Run this on a real repo. Paste one useful result, one wrong/noisy result, or one place grep is better.

Secondary ask:

> If it helped, a GitHub star helps other agent-heavy maintainers find it.

## Weekly Targets

| Week | Cumulative star target | Main objective | Proof target |
| --- | ---: | --- | ---: |
| 1 | 100 | Proof infrastructure and direct asks | 5 public receipts/corrections |
| 2 | 180 | Directory fixes and listing submissions | 15 total receipts/corrections |
| 3 | 330 | Reddit, Discord, Cursor, Claude community wave | 25 total receipts/corrections |
| 4 | 520 | Show HN after proof exists | 30 total receipts/corrections |
| 5 | 700 | Creator and newsletter wave | 40 total receipts/corrections |
| 6 | 835 | Proof-focused release | 50 total receipts/corrections |
| 7 | 940 | Grep vs repo-memory trust content | 55 total receipts/corrections |
| 8 | 1,000 | Proof roundup and follow-up | 60 total receipts/corrections |

## Channel Model

| Channel | Expected new stars | Execution rule |
| --- | ---: | --- |
| Direct maintainer proof outreach | 100-200 | Ask for correction first, not stars. |
| Hacker News Show HN | 100-400 | Launch only after 15+ receipts/corrections. |
| Reddit and Discord communities | 120-250 | Comment/help first; disclose affiliation. |
| MCP directories and awesome lists | 150-300 | Submit with proof command and caveats. |
| Creator/newsletter outreach | 100-200 | Offer a run-on-your-repo receipt angle. |
| Medium/blog/SEO pages | 50-150 | Publish after receipts improve the story. |
| X/founder social | 20-80 | Use as receipts and replies, not main distribution. |

## Week 1 Execution Checklist

- [x] Update GitHub topics toward high-intent discovery.
- [x] Add current proof-sprint comment to Discussion #79.
- [x] Add proof-run issue template.
- [x] Build 50-person outreach wave list.
- [x] Create directory listing pack.
- [x] Create 40-prompt AI citation baseline.
- [ ] Send 10 personalized maintainer asks.
- [ ] Send 10 coding-agent power-user asks.
- [x] Follow up on `JackyST0/awesome-agent-skills` requested changes.
- [ ] Follow up on remaining open directory PRs.
- [ ] Resolve or escalate Glama quality/claim blocker.

## Execution Log

- 2026-06-16: GitHub topics updated toward high-intent discovery terms: `codex-cli`, `coding-agents`, `agent-memory`, `repo-memory`, MCP, Claude Code, Cursor, Windsurf, and code intelligence.
- 2026-06-16: Proof-sprint kickoff added to Discussion #79: https://github.com/sverklo/sverklo/discussions/79#discussioncomment-17324042
- 2026-06-16: Public sprint tracker opened: https://github.com/sverklo/sverklo/issues/85
- 2026-06-16: Proof-run feedback issue template added in `sverklo/sverklo`: https://github.com/sverklo/sverklo/blob/main/.github/ISSUE_TEMPLATE/proof-run-feedback.yml
- 2026-06-16: Launch-kit assets added in `sverklo-site`: outreach wave, directory listing pack, citation prompts, and community drafts.
- 2026-06-16: `JackyST0/awesome-agent-skills` PR #51 updated after requested changes and maintainer notified: https://github.com/JackyST0/awesome-agent-skills/pull/51#issuecomment-4719663113
- 2026-06-16: Founder-account proof-sprint X post published from `@marazmo`: https://x.com/i/status/2067074910103769285. Follow-up X reads are currently rate-limited in Wonda cookie mode, so direct replies are paused until the limit clears.
- 2026-06-17: Star-source analysis added: https://github.com/sverklo/sverklo-site/blob/main/launch-kit/star-source-analysis-2026-06-17.md. Conclusion: the 72 stars correlate with benchmark/loss/comparison/product-release artifacts, not generic outreach. Double down on measurable proof artifacts.
- 2026-06-17: Star-source analysis X thread published from `@marazmo`: https://x.com/i/status/2067499040238190908. Wonda reply posting failed on the fourth post with an empty tweet-result response, so the verified thread has three posts.
- 2026-06-18: Reddit posting pack added: https://github.com/sverklo/sverklo-site/blob/main/launch-kit/reddit-posting-pack-2026-06-18.md. Post first to `r/mcp` with `showcase`; hold `r/ClaudeCode` for a 24-48 hour gap or after a useful response. Do not automate Reddit posting.

## Stop Doing

- Do not run broad paid ads yet.
- Do not post generic "local-first MCP memory" copy.
- Do not ask for stars in the first message.
- Do not polish the homepage unless it improves proof-run conversion.
- Do not open promotional issues in unrelated repos.
- Do not claim "better than grep." Say where grep is better.

## Daily Metrics

Record these every day:

- GitHub stars, forks, watchers, open issues.
- npm downloads, last week and last month.
- GitHub traffic referrers, if available.
- Source-tagged site visits to `/proof/`.
- GitHub outbound clicks from proof pages.
- Direct asks sent.
- Replies received.
- Proof receipts.
- Corrections.
- Grep-better cases.
- Setup-friction reports.
- Product fixes shipped from external feedback.

## Decision Rule

At the end of week 1:

- If 20 asks produce fewer than 2 attempted proof runs, fix distribution and category clarity.
- If people run proof but results are weak/noisy, fix proof selection.
- If people run proof and receipts are useful, increase direct outreach and prepare HN.
