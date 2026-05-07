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

function buildTable(data) {
  const cats = ["P1", "P2", "P4", "P5"];
  const baselines = Object.entries(data.byBaseline || {});
  // Sort by avg_f1 descending; sverklo will float to wherever the
  // numbers put it, NOT pinned to the top. That's load-bearing for
  // the "publishes losses" voice.
  baselines.sort((a, b) => (b[1].avg_f1 || 0) - (a[1].avg_f1 || 0));

  // Column header
  let html = `<div class="table-scroll"><table class="mcp-table">
<thead>
  <tr>
    <th>baseline</th>
    <th class="num">F1</th>
${cats.map((c) => `    <th class="num">${c}</th>`).join("\n")}
    <th class="num">tokens</th>
    <th class="num">tools/task</th>
  </tr>
</thead>
<tbody>
`;

  for (const [name, row] of baselines) {
    const cells = cats.map((c) => {
      const v = data.byCategory?.[c]?.[name]?.avg_f1;
      return `    <td class="num">${fmtPct(v)}</td>`;
    });
    const isSverklo = name === "sverklo" || name === "sverklo-rerank";
    const rowCls = isSverklo ? ' class="self"' : "";
    html += `  <tr${rowCls}>
    <td class="name"><strong>${escape(name)}</strong>${isSverklo ? ' <span class="self-tag">us</span>' : ""}</td>
    <td class="num"><strong>${fmtPct(row.avg_f1)}</strong></td>
${cells.join("\n")}
    <td class="num">${fmtTokens(row.avg_input_tokens)}</td>
    <td class="num">${fmtTools(row.avg_tool_calls)}</td>
  </tr>
`;
  }

  html += `</tbody></table></div>
<p class="meta-line">
  ${data.task_count || "?"} tasks across ${(data.datasets || []).length} datasets (${(data.datasets || []).map(escape).join(", ")}).
  Run <code>${escape(data.bench_run_id || "—")}</code> at sverklo
  <a href="https://github.com/sverklo/sverklo/commit/${escape((data.sha || "").slice(0, 12))}"><code>${escape((data.sha || "—").slice(0, 7))}</code></a>.
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
      dataHtml = buildTable(data);
      publishedNote = ` (data: ${data.task_count} tasks, sha ${(data.sha || "?").slice(0, 7)})`;
    } else {
      console.warn(`[build-mcp-index] index fetch returned HTTP ${r.status}; using placeholder`);
    }
  } catch (e) {
    console.warn(`[build-mcp-index] index fetch failed: ${e.message}; using placeholder`);
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
