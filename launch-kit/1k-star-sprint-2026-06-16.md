# Sverklo 1K-Star Sprint

Date: 2026-06-16

Baseline:

- GitHub stars: 72
- Forks: 9
- GitHub subscribers: 1
- npm downloads, last week: 203
- npm downloads, last month: 7,844

Target: 1,000 GitHub stars by 2026-08-11.

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
- [ ] Add proof-run issue template.
- [ ] Build 50-person outreach wave list.
- [ ] Create directory listing pack.
- [ ] Create 40-prompt AI citation baseline.
- [ ] Send 10 personalized maintainer asks.
- [ ] Send 10 coding-agent power-user asks.
- [ ] Follow up on open directory PRs.
- [ ] Resolve or escalate Glama quality/claim blocker.

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
