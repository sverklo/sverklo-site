# Proof-First Sverklo Positioning Package

Date: 2026-06-01
Implementation check date: 2026-06-02
Status: reviewing

Primary rule: proof before belief. Use Token Savior only as inspiration for information architecture: benchmark-led proof, same-task comparison, receipts, visible caveats, and a clear reproducible action. Do not copy Token Savior phrasing, visual identity, exclusivity claims, or unsupported metric framing.

## Current Public Proof Inventory

| Source | Role | What it proves | Limits |
| --- | --- | --- | --- |
| `sverklo-site/index.html` | Primary public surface | Hero, proof wall, benchmark strip, grep caveat, install flow, local-first trust copy | Some copy was feature-led before this refresh; hero needed stronger proof-first priority |
| `sverklo-site/bench/index.html` | Public retrieval benchmark | 180 hand-verified tasks across 6 OSS codebases and 5 baselines; includes wins and losses | Primitive retrieval tasks, not full end-to-end coding tasks |
| `sverklo-site/benchmarks/index.html` | Performance benchmark route | Search p95, impact latency, cold index, RAM tradeoffs | Performance-only; does not prove agent task quality |
| `sverklo-site/report/index.html` | Report/audit examples | Public report-card shape and `sverklo audit` output | Health reports are audit examples, not proof receipts from external users |
| `sverklo-site/launch-kit/ready-to-post-2026-05-29.md` | Prior launch copy | Existing install, proof thread, benchmark, and caveat language | Needed receipt source labels and canonical proof CTA alignment |
| `sverklo-site/launch-kit/targeted-outreach-2026-05-30.md` | Prior outreach queue | Target list and outreach drafts for MCP, power-user, security, and curator audiences | Needed seeded-vs-external receipt language and proof-loop caveat |
| `sverklo/.sverklo/marketing/reports/public-action-ledger-2026-06.md` | Local operator ledger | Public actions and outcome checks | Ignored/local source; use for operator state, not public proof unless surfaced |

## Homepage Section Map And Target Edit Zones

1. Hero: first-screen proof claim, comparison basis, primary proof receipt CTA, trust boundary.
2. Same-task comparison: baseline agent path, Sverklo-assisted path, evidence changed, outcome, caveat.
3. Demo video: retained as secondary proof inspection, not the first action.
4. Proof wall: seeded receipts from Sverklo, Express, Fastify, Zod, and Zustand.
5. Benchmark loop and benchmark strip: public benchmark proof, losses, methodology links.
6. Grep caveat: when Sverklo wins and where grep still wins.
7. Repo evidence visual: files, symbols, callers, tests, dependencies, decisions.
8. Install/final CTA: repeat proof receipt action and local-first trust boundary.

Target anchors:

- `#same-task`
- `#proof-wall`
- `#benchmark-proof`
- `#repo-evidence`
- `#install`

## Benchmark And Proof Route Roles

| Route | Role in package | Required caveat |
| --- | --- | --- |
| `/bench/` | Primary public retrieval proof and methodology | Retrieval primitives are not full agent coding tasks; grep still wins some exact/string-heavy cases |
| `/benchmarks/` | Performance proof for latency, impact, index time, RAM | Performance numbers do not prove correctness or adoption |
| `/report/` | Audit/report format proof | Report cards are examples of `sverklo audit`, not external validation receipts |

## Install And Trust Language

Install path:

```bash
npm install -g sverklo
cd your-project && sverklo init
sverklo prove --markdown
```

Trust boundary:

- MIT licensed.
- No API keys.
- No code upload.
- Index, search, audit, memories, and embeddings run locally.
- First run downloads the local ONNX embedding model.
- Telemetry is opt-in and off by default.

## Baseline Guard Results

Run from `sverklo-site/` on 2026-06-02:

| Command | Result | Notes |
| --- | --- | --- |
| `node scripts/patch-nav.mjs` | pass | Canonical nav/css/fonts/version-script/breadcrumb injections regenerated across static pages |
| `node scripts/build-mcp-index.mjs` | pass | Wrote `sverklo-site/mcp/index.html` from canonical May 13 180-task data |
| `node scripts/lint-versions.mjs` | pass | Clean; current version is `v0.28.3` |

## Canonical Positioning Package

Package ID: `proof-first-positioning-2026-06-01`
Primary wedge: same task, same coding agent, better repo evidence before edits.
Primary CTA: run a proof receipt on a real repo.
Default CTA copy: `sverklo prove --markdown`
Secondary CTA rules:

- Benchmark inspection links to `/bench/` or `#benchmark-proof`.
- Receipt inspection links to GitHub Discussion #79 with source labels.
- Install CTAs copy the three-command path and keep trust language nearby.
- Stars, generic homepage links, and demos are secondary, never the main proof ask.

## Proof Claim Register

| ID | Claim text | Source | Caveat | Freshness | Approval |
| --- | --- | --- | --- | --- | --- |
| C01 | `sverklo prove --markdown` prints a shareable repo-memory receipt from the current repo | Install page, homepage proof wall, Discussion #79 seed receipts | Seed receipts show shape; they are not independent third-party validation | fresh 2026-06-02 | approved for draft |
| C02 | Public benchmark covers 180 hand-verified retrieval tasks across 6 OSS codebases and 5 baselines | `/bench/`, `/mcp/`, `llms.txt` citation block | Retrieval primitives, not end-to-end coding tasks | fresh 2026-06-02 after `build-mcp-index` | approved for draft |
| C03 | Sverklo led overall F1 on the May 13 bench run at 0.58, with visible losses | `/bench/`, `llms.txt` | Do not convert to "best" or "only"; cite version/date and loss section | fresh 2026-06-02 | approved for draft |
| C04 | Naive grep used 22,704 average input tokens vs Sverklo 652 on the published benchmark run | `/bench/`, `llms.txt` | Baseline-specific; do not generalize to all agent sessions | fresh 2026-06-02 | approved for draft |
| C05 | Grep remains better when the exact string is known or the repo is small | `/bench/` loss section, homepage grep caveat | This is a limitation, not a weakness to hide | fresh 2026-06-02 | approved |
| C06 | Sverklo is local-first: no API keys and no code upload for indexing/search | `/security/`, `/install/` | First run downloads a model; telemetry is opt-in/off by default | fresh 2026-06-02 | approved |
| C07 | Performance proof includes 26ms search p95 on React and sub-1.2ms impact analysis in the published route | `/benchmarks/`, homepage proof strip | Hardware/corpus-specific; do not imply universal latency | needs refresh before publication | draft |
| C08 | Same-task comparison shows what changes when the agent receives files, symbols, callers, tests, dependencies, and decisions before editing | Homepage same-task section | Illustrative homepage comparison unless linked to a full external receipt | fresh 2026-06-02 | approved for draft |
| C09 | External proof receipts have not landed yet | Operator ledger, GitHub Discussion #79 partial check | Keep seeded receipts labeled; do not imply community validation | fresh 2026-06-02 | approved |

## Evidence Source Register

| ID | Type | Path or URL | Summary | Limits |
| --- | --- | --- | --- | --- |
| E01 | public_benchmark | `https://sverklo.com/bench/` | Retrieval benchmark, wins, losses, methodology, reproducer | Not full coding-task latency |
| E02 | public_benchmark | `https://sverklo.com/mcp/` | Canonical MCP ranking generated from 180-task May 13 data | Generated static route; verify after regeneration |
| E03 | proof_receipt | `https://github.com/sverklo/sverklo/discussions/79` | Seeded proof receipts for Sverklo and OSS repos | Maintainer-seeded until external replies arrive |
| E04 | site_page | `https://sverklo.com/security/` | Local-first and network-call trust boundary | Must stay synced with implementation behavior |
| E05 | site_page | `https://sverklo.com/install/` | Trial/install action and proof receipt command | Must keep Node/version assumptions current |
| E06 | operator_ledger | `sverklo/.sverklo/marketing/reports/public-action-ledger-2026-06.md` | Outcome checks and external receipt state | Local-only, ignored file |
| E07 | site_page | `https://sverklo.com/report/` | Public audit report examples | Audit examples are not proof receipts |
| E08 | launch_asset | `sverklo-site/launch-kit/ready-to-post-2026-05-29.md` | Prior public launch copy | Needs proof-first consistency before reuse |
| E09 | launch_asset | `sverklo-site/launch-kit/targeted-outreach-2026-05-30.md` | Prior outreach queue | Needs seeded/external labels before reuse |

## Receipt Source Taxonomy

- Maintainer-seeded example: created by Sverklo maintainer to show output shape. Label visibly. Useful for evaluation, not independent validation.
- External user receipt: created by someone outside the project. Requires source attribution before promotion.
- Benchmark receipt: produced by public benchmark or reproducer. Include version, run date, dataset, and caveats.
- Correction receipt: external or internal report showing where Sverklo was wrong/noisy. Track as a proof-loop outcome.

## Claim-Safety Checklist

- No unsupported "only," "best," "perfect," "100%," or equivalent superiority claims.
- No copied Token Savior phrasing, claim structure, brand style, or visual identity.
- No hidden losses; homepage and benchmark pages must show where grep or baselines win.
- No stale metrics; version, stars, downloads, benchmark counts, and receipt status need current verification before publication.
- No unlabeled seeded receipts.
- No public X/GitHub automation from this package without explicit operator action.

## Selected Proof Receipts For First Implementation

1. Sverklo: maintainer-seeded example showing the tool on its own TypeScript MCP/CLI/site repo.
2. Fastify: maintainer-seeded example showing plugin/route structure where graph-aware retrieval helps.
3. Zod: maintainer-seeded example showing symbol precision on TypeScript-heavy code.
4. Caveat/loss: grep wins exact strings and published P5/P2 losses remain visible on `/bench/`.

## Metric Freshness Requirements

| Metric | Verification source | Required before public reuse |
| --- | --- | --- |
| Version | `node scripts/lint-versions.mjs`, npm latest endpoint | Must pass same day as publish |
| Stars | GitHub API or visible GitHub page | Must be checked same day if included |
| Downloads | npm package page or registry-derived metric | Must be checked same day if included |
| Benchmark counts | `/bench/`, `/mcp/`, `build-mcp-index` output | Must match canonical generated data |
| Proof receipt status | GitHub Discussion #79 and operator ledger | Must distinguish seeded vs external |

## Outreach Variants

### Coding-Agent Power User

Hook: you already use Claude Code, Cursor, or Codex-style agents on real repos.

Draft:

Can you run a repo-memory proof on one project where your agent usually wastes time finding files?

```bash
npm install -g sverklo
cd your-project && sverklo init
sverklo prove --markdown
```

Proof source: the public thread is seeded with Sverklo/Fastify/Zod receipts so you can inspect the shape first.

Caveat: grep is still better when you know the exact string. I want the noisy/wrong parts too.

Ask: paste one receipt or one concrete failure mode.

### Maintainer

Hook: your repo has enough symbols/callers/tests that an agent can be misled by a shallow search.

Draft:

I maintain Sverklo, a local-first MCP server that gives coding agents repo evidence before they edit. The public receipts are maintainer-seeded examples right now, not third-party validation.

Would you be open to running `sverklo prove --markdown` on your repo and telling me whether the central files, symbol, and callers are fair?

Caveat: corrections are useful. If the receipt picks the wrong center of gravity, I will track it as a correction receipt instead of hiding it.

Ask: one external receipt or one maintainer correction.

### MCP / Code-Intelligence Builder

Hook: you build adjacent code-intelligence tooling and can judge whether the comparison is fair.

Draft:

Sverklo's current proof frame is same task, same agent, better repo evidence. The benchmark page shows wins and losses against grep, jcodemunch-mcp, and GitNexus; the homepage now keeps the caveat visible.

Can you inspect the same-task comparison and tell me what evidence would make it fairer?

Caveat: no claim that Sverklo is the only or perfect MCP code-intel server. The ask is correction, not applause.

Ask: one comparison correction or one baseline we should add.

### Developer-Tool Curator

Hook: your audience evaluates tools quickly and needs a verifiable angle.

Draft:

Story angle: Sverklo is trying to make "repo memory for coding agents" testable instead of slogan-based.

Proof source: 180-task public retrieval benchmark, seeded proof receipts, and visible "grep still wins exact strings" caveat.

Caveat: the proof thread is seeded until external receipts arrive.

Ask: review whether the proof-first page gives enough evidence for a developer to try it, or tell me what source would make it credible.

Link discipline: originating X posts stay link-free; links go in replies or non-X surfaces.

## Review Notes

### Competitive Pattern Analyst

- Keep the proof-first hierarchy: benchmark/receipt before feature inventory.
- Borrow the pattern of specific evidence, not Token Savior's category, tone, or claims.
- Reject "only tool" and unqualified superiority language.
- Make losses part of the narrative.

### Proof Messaging Strategist

- Repeat one wedge: same task, same agent, better repo evidence.
- Make the primary ask produce a proof artifact, not a vanity signal.
- Place trust language next to trial actions.
- Keep every audience variant tied to one proof source and one correction invitation.

### Brand Claim Guard

- Approved: "local-first," "MIT," "no API keys," "no code upload," "180 hand-verified tasks" when sourced.
- Approved with caveat: "overall F1 leader on the May 13 run" only with date/version/loss context.
- Needs refresh before publish: download counts, stars, current external receipt status, performance metrics if used prominently.
- Rejected: "only one tool has everything," "perfect," "best," "unstoppable," or implied independent validation from seeded receipts.

## Review Results

US1 first-screen review:

- Proof claim visible: yes, hero now leads with running a proof receipt and links to benchmark proof.
- Comparison basis visible: yes, hero and same-task section name baseline agent vs Sverklo-assisted agent.
- Trust boundary visible: yes, CTA note and install/security pages state no API keys, no code upload, first-run model download.
- First action visible: yes, primary action is `sverklo prove --markdown`.
- Unresolved gap: browser visual review still required after final static scripts.

US2 comparison review:

- Task named: yes, same-task section uses "change an auth helper without breaking callers."
- Baseline path named: yes.
- Sverklo-assisted path named: yes.
- Evidence changed: files, symbol, callers, tests, dependencies, decisions.
- Outcome/caveat: yes, outcome is framed as fewer blind edits with caveat that grep wins exact strings and small repos.
- Unresolved gap: external same-task receipt still missing.

US3 proof-loop review:

- One receipt can be traced across homepage, launch package, and operator ledger: Fastify maintainer-seeded receipt -> homepage proof wall -> this package -> ledger template.
- External receipt state: none verified yet.
- Unresolved gap: need an external user receipt before calling the proof wall community validation.

US4 claim guard review:

- Copied Token Savior phrasing: none intentionally used.
- Unsupported superlatives: "only one tool has everything" identified for removal/rewrite.
- Hidden caveats: grep and benchmark limitations are visible.
- Stale metrics: version clean at `v0.28.3`; download/star metrics should not be used without fresh check.

## Claim Guard Audit Log

Audit run: 2026-06-02, focused scan across `index.html`, `/bench/`, `/benchmarks/`, `/report/`, `/install/`, `/security/`, and the two launch-kit drafts.

| Surface | Finding | Decision |
| --- | --- | --- |
| `sverklo-site/index.html` | Hero was feature-led and included star/install CTAs before proof inspection | Rewritten to proof receipt CTA, same-task comparison, benchmark link, and trust boundary |
| `sverklo-site/index.html` | "only one tool has everything" and structured FAQ "best" questions were unsupported | Rewritten to comparison-matrix and evidence framing |
| `sverklo-site/index.html` | Proof wall could imply third-party receipts | Rewritten to "maintainer-seeded examples" and explicit external-receipt gap |
| `sverklo-site/index.html` | Proof strip had review-quality metrics that were not central to this refresh | Replaced with 180-task benchmark metrics and visible losses |
| `sverklo-site/bench/index.html` | Needed bridge from aggregate benchmark to same-task proof story | Added same-task interpretation note and retained limitations |
| `sverklo-site/benchmarks/index.html` | Stale "90-task" reference and missing performance caveat | Updated to 180-task route and added performance-vs-correctness caveat |
| `sverklo-site/report/index.html` | Audit examples could be mistaken for proof receipts | Labeled as maintainer-produced audit examples, not third-party validation |
| Launch-kit drafts | Seeded receipt language varied by channel | Added proof-first reuse rule and maintainer-produced labels |

Remaining accepted hits:

- `best` in benchmark table classes or "next-best" benchmark labels is metric/table language, not a marketing superlative.
- "Grep is still best when you know the exact string" is kept as a supported caveat.
- `100%` hits in CSS or benchmark numeric precision are not marketing claims.

## Browser Review

Rendered locally via Chrome CDP against `http://127.0.0.1:4173/` on 2026-06-02.

| Viewport | Result |
| --- | --- |
| Desktop 1440x1100 | PASS. First viewport shows proof claim, comparison basis, primary `sverklo prove --markdown` CTA, trust text, and benchmark facts without visible overlap. |
| Mobile 390x900 | PASS. First view shows proof claim, comparison basis, local-first trust boundary, and primary receipt CTA. Secondary CTAs continue below the fold, which is acceptable because the primary action is visible. |

Screenshots captured for local review:

- `/tmp/sverklo-desktop.png`
- `/tmp/sverklo-mobile.png`

## Public Link Review

Checked `href` targets from `sverklo-site/index.html`, `sverklo-site/bench/index.html`, `sverklo-site/report/index.html`, and `sverklo-site/install/index.html` on 2026-06-02.

| Result | Count | Notes |
| --- | ---: | --- |
| Total links checked | 125 | Internal routes checked against local static files; external links checked with HEAD and GET fallback |
| External links checked | 55 | Most resolved with HTTP 2xx/3xx |
| Follow-ups | 4 | Bot/rate-limit responses, not confirmed broken content |

Follow-ups:

- `https://www.npmjs.com/package/sverklo` returned HTTP 403 to automated HEAD/GET. Browser/manual check recommended before publish.
- `https://claude.ai/code` returned HTTP 403 to automated HEAD/GET. Browser/manual check recommended before publish.
- `https://www.pulsemcp.com/servers/sverklo` returned HTTP 403 to automated HEAD/GET. Browser/manual check recommended before publish.
- `https://stackshare.io/sverklo` returned HTTP 429 to automated HEAD/GET. Retry later or check manually before publish.

## Proof-Loop Outcome Tracking Template

Use in `sverklo/.sverklo/marketing/reports/public-action-ledger-2026-06.md`:

| Time | Signal Type | Source | Receipt Type | Quality | Follow-up Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| _pending_ | external_receipt / correction / inbound_question / trial_start | URL or local source | external_user / correction / benchmark / maintainer_seeded | low / medium / high | operator | What changed in proof, copy, or product? |

## Final Implementation Notes

- Package remains `reviewing`, not `published`.
- Public copy may use seeded receipts only when labeled.
- Top proof gap: no external proof receipt yet.
- Next proof target: one real repo receipt from a coding-agent power user or OSS maintainer.
- Static guards passed after implementation: `patch-nav`, `build-mcp-index`, and `lint-versions` (`v0.28.3` clean after removing stale homepage version text).
- Link follow-ups are documented above; none require copy removal before review, but all should be manually checked before public publish.
