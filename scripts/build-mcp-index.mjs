#!/usr/bin/env node
/**
 * Build-time generator for /mcp/index.html — the MCP code-intel index.
 *
 * Fetches the live index data from https://t.sverklo.com/v1/index.json
 * (published by .github/workflows/bench-refresh.yml on the sverklo
 * repo) and bakes the comparison table into the static HTML so
 * AI engines and search crawlers see the numbers in the initial
 * page load (no client-side fetch dependency).
 *
 * Per the four-agent strategy review (memory:
 * mcp_index_strategy.md): keep bench axes separate, no composite
 * score, sverklo on its own board including losing slices.
 *
 * Failure mode: if the fetch fails (Worker down, network blocked,
 * or no index published yet), the script falls back to the
 * pre-rendered "no data yet" placeholder. Build never fails on
 * a network problem — same posture as the version-badge fetch.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = join(__dirname, "..");
const INDEX_TEMPLATE = join(SITE_ROOT, "mcp", "index.template.html");
const INDEX_OUTPUT = join(SITE_ROOT, "mcp", "index.html");
const INDEX_URL = "https://t.sverklo.com/v1/index.json";

const MARKER = "<!-- @mcp-index-data -->";

const CANONICAL_INDEX_DATA = {
  sha: "",
  bench_run_id: "2026-05-13T18-32-20-478Z",
  task_count: 180,
  datasets: ["express", "lodash", "sverklo", "requests", "flask", "fastapi"],
  byBaseline: {
    "naive-grep": { avg_f1: 0.25, avg_input_tokens: 22704, avg_tool_calls: 6.3 },
    "smart-grep": { avg_f1: 0.34, avg_input_tokens: 714, avg_tool_calls: 3.2 },
    sverklo: { avg_f1: 0.58, avg_input_tokens: 652, avg_tool_calls: 1.0 },
    jcodemunch: { avg_f1: 0.29, avg_input_tokens: 1907, avg_tool_calls: 1.2 },
    gitnexus: { avg_f1: 0.30, avg_input_tokens: 630, avg_tool_calls: 1.2 },
  },
  byCategory: {
    P1: {
      "naive-grep": { avg_f1: 0.07 },
      "smart-grep": { avg_f1: 0.20 },
      sverklo: { avg_f1: 0.63 },
      jcodemunch: { avg_f1: 0.52 },
      gitnexus: { avg_f1: 0.35 },
    },
    P2: {
      "naive-grep": { avg_f1: 0.11 },
      "smart-grep": { avg_f1: 0.20 },
      sverklo: { avg_f1: 0.27 },
      jcodemunch: { avg_f1: 0.01 },
      gitnexus: { avg_f1: 0.00 },
    },
    P4: {
      "naive-grep": { avg_f1: 0.35 },
      "smart-grep": { avg_f1: 0.40 },
      sverklo: { avg_f1: 0.84 },
      jcodemunch: { avg_f1: 0.33 },
      gitnexus: { avg_f1: 0.27 },
    },
    P5: {
      "naive-grep": { avg_f1: 0.83 },
      "smart-grep": { avg_f1: 0.83 },
      sverklo: { avg_f1: 0.83 },
      jcodemunch: { avg_f1: 0.34 },
      gitnexus: { avg_f1: 0.83 },
    },
  },
  published_at: Date.UTC(2026, 4, 13, 18, 32, 20) / 1000,
  raw_artifact_url: "https://github.com/sverklo/sverklo-bench",
  reproducer_command:
    "git clone https://github.com/sverklo/sverklo && cd sverklo && npm install && npm run build && npm run bench:quick",
};

// Map bench-baseline name → upstream {owner, repo} for fetching the
// audit grade from t.sverklo.com/v1/badge/<owner>/<repo>.svg-adjacent
// JSON. Built-in baselines (naive-grep, smart-grep) don't have a repo
// — their column shows "—" by design.
const BASELINE_REPOS = {
  sverklo: { owner: "sverklo", repo: "sverklo" },
  "sverklo-rerank": { owner: "sverklo", repo: "sverklo" },
  jcodemunch: { owner: "jgravelle", repo: "jcodemunch-mcp" },
  gitnexus: { owner: "abhigyanpatwari", repo: "gitnexus" },
};

// Read the published audit JSON directly from R2-fronted Worker.
// Same shape as POST /v1/badge/publish stores: {grade, dimensions[], version}.
async function fetchAuditFor(baseline) {
  const repo = BASELINE_REPOS[baseline];
  if (!repo) return null;
  const url = `https://t.sverklo.com/v1/badge/${repo.owner}/${repo.repo}.json`;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function escape(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fmtPct(v) {
  if (typeof v !== "number" || !isFinite(v)) return "—";
  return v.toFixed(2);
}

function fmtTokens(v) {
  if (typeof v !== "number" || !isFinite(v)) return "—";
  if (v >= 1000) return Math.round(v).toLocaleString();
  return Math.round(v).toString();
}

function fmtTools(v) {
  if (typeof v !== "number" || !isFinite(v)) return "—";
  return v.toFixed(1);
}

function fmtTimestamp(unixSecs) {
  if (typeof unixSecs !== "number") return "—";
  const d = new Date(unixSecs * 1000);
  return d.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

async function buildTable(data) {
  const cats = ["P1", "P2", "P4", "P5"];
  const baselines = Object.entries(data.byBaseline || {});
  // Sort by avg_f1 descending; sverklo will float to wherever the
  // numbers put it, NOT pinned to the top. That's load-bearing for
  // the "publishes losses" voice.
  baselines.sort((a, b) => (b[1].avg_f1 || 0) - (a[1].avg_f1 || 0));

  // Fetch audit grades in parallel — one HTTP call per baseline that
  // has a known upstream repo. Built-in baselines (naive-grep,
  // smart-grep) skip the fetch and render "—" in the audit column.
  const audits = await Promise.all(
    baselines.map(([name]) => fetchAuditFor(name)),
  );

  // Column header
  let html = `<div class="table-scroll"><table class="mcp-table">
<thead>
  <tr>
    <th>baseline</th>
    <th class="num">F1</th>
${cats.map((c) => `    <th class="num">${c}</th>`).join("\n")}
    <th class="num">tokens</th>
    <th class="num">tools/task</th>
    <th class="num"><span title="Sverklo audit grade — runs locally; see github.com/sverklo/sverklo">audit</span></th>
  </tr>
</thead>
<tbody>
`;

  for (let i = 0; i < baselines.length; i++) {
    const [name, row] = baselines[i];
    const audit = audits[i];
    const cells = cats.map((c) => {
      const v = data.byCategory?.[c]?.[name]?.avg_f1;
      return `    <td class="num">${fmtPct(v)}</td>`;
    });
    const isSverklo = name === "sverklo" || name === "sverklo-rerank";
    const rowCls = isSverklo ? ' class="self"' : "";

    // Audit cell: grade letter + per-dimension tooltip via title attr.
    let auditCell = `    <td class="num audit-cell">—</td>`;
    if (audit && audit.grade) {
      const dimSummary = (audit.dimensions || []).map(
        (d) => `${d.name}: ${d.grade}`
      ).join(" · ");
      const repo = BASELINE_REPOS[name];
      const reportUrl = repo ? `/report/${repo.owner}/${repo.repo}/` : null;
      const auditLetter = `<strong class="audit-${audit.grade}">${escape(audit.grade)}</strong>`;
      auditCell = `    <td class="num audit-cell" title="${escape(dimSummary)}">${reportUrl ? `<a href="${reportUrl}">${auditLetter}</a>` : auditLetter}</td>`;
    }

    html += `  <tr${rowCls}>
    <td class="name"><strong>${escape(name)}</strong>${isSverklo ? ' <span class="self-tag">us</span>' : ""}</td>
    <td class="num"><strong>${fmtPct(row.avg_f1)}</strong></td>
${cells.join("\n")}
    <td class="num">${fmtTokens(row.avg_input_tokens)}</td>
    <td class="num">${fmtTools(row.avg_tool_calls)}</td>
${auditCell}
  </tr>
`;
  }

  const sha = typeof data.sha === "string" && data.sha.length > 0 ? data.sha : null;
  const source = sha
    ? ` at sverklo
  <a href="https://github.com/sverklo/sverklo/commit/${escape(sha.slice(0, 12))}"><code>${escape(sha.slice(0, 7))}</code></a>`
    : "";

  html += `</tbody></table></div>
<p class="meta-line">
  ${data.task_count || "?"} tasks across ${(data.datasets || []).length} datasets (${(data.datasets || []).map(escape).join(", ")}).
  Run <code>${escape(data.bench_run_id || "—")}</code>${source}.
  Published <span title="${escape(fmtTimestamp(data.published_at))}">${escape(fmtTimestamp(data.published_at))}</span>.
</p>
<details class="reproducer">
  <summary>Reproduce these numbers locally</summary>
  <pre><code>${escape(data.reproducer_command || "git clone https://github.com/sverklo/sverklo && npm install && npm run bench:quick")}</code></pre>
  <p>The harness writes <code>summary.json</code>, <code>raw.jsonl</code>, and <code>report.md</code> to <code>benchmark/results/&lt;timestamp&gt;/</code>. Diff against this page; file an issue at <a href="https://github.com/sverklo/sverklo-bench/issues">sverklo-bench/issues</a> if your numbers differ.</p>
  <p>Raw artifact for this run: <a href="${escape(data.raw_artifact_url || "#")}"><code>${escape((data.raw_artifact_url || "—").replace("https://github.com/", ""))}</code></a></p>
</details>`;
  return html;
}

function buildPlaceholder() {
  return `<div class="placeholder"><p>Index data not yet published. Run <code>gh workflow run bench-refresh.yml -R sverklo/sverklo</code> to publish, or check <a href="https://t.sverklo.com/v1/index.json"><code>t.sverklo.com/v1/index.json</code></a> directly.</p></div>`;
}

async function main() {
  if (!existsSync(INDEX_TEMPLATE)) {
    console.error(`[build-mcp-index] template missing: ${INDEX_TEMPLATE}`);
    process.exit(1);
  }
  let template = readFileSync(INDEX_TEMPLATE, "utf-8");

  let dataHtml = buildPlaceholder();
  let publishedNote = "";
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(INDEX_URL, { signal: ctrl.signal });
    clearTimeout(timer);
    if (r.ok) {
      const data = await r.json();
      if ((data.task_count || 0) < CANONICAL_INDEX_DATA.task_count) {
        console.warn(
          `[build-mcp-index] live index has ${data.task_count} tasks; using canonical ${CANONICAL_INDEX_DATA.task_count}-task May 13 run`
        );
        dataHtml = await buildTable(CANONICAL_INDEX_DATA);
        publishedNote = ` (data: ${CANONICAL_INDEX_DATA.task_count} tasks, canonical May 13)`;
        throw new Error("__canonical_index_used__");
      }
      dataHtml = await buildTable(data);
      publishedNote = ` (data: ${data.task_count} tasks, sha ${(data.sha || "?").slice(0, 7)})`;
    } else {
      console.warn(`[build-mcp-index] index fetch returned HTTP ${r.status}; using placeholder`);
    }
  } catch (e) {
    if (e.message !== "__canonical_index_used__") {
      console.warn(`[build-mcp-index] index fetch failed: ${e.message}; using canonical May 13 data`);
      dataHtml = await buildTable(CANONICAL_INDEX_DATA);
      publishedNote = ` (data: ${CANONICAL_INDEX_DATA.task_count} tasks, canonical May 13)`;
    }
  }

  if (!template.includes(MARKER)) {
    console.error(`[build-mcp-index] template missing marker ${MARKER}`);
    process.exit(1);
  }
  const out = template.replace(MARKER, dataHtml);
  writeFileSync(INDEX_OUTPUT, out);
  console.log(`[build-mcp-index] wrote ${INDEX_OUTPUT}${publishedNote}`);
}

main().catch((e) => {
  console.error(`[build-mcp-index] fatal: ${e.message}`);
  process.exit(1);
});
