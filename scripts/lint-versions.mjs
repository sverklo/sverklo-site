#!/usr/bin/env node
// Lint: catch stale hardcoded sverklo versions on the site.
//
// Background: sverklo.com had v0.12.5 hardcoded on 8 pages, v0.16.0 on
// the homepage, and v0.17.1 on /research/ — at a time when the actual
// shipped product was v0.18.2. The fix was the runtime npm-fetch script
// + tokens.css; this lint catches the *next* time we drift.
//
// Policy:
//   - The version fallback used by the version-fetch script is sourced
//     from VERSION_FALLBACK in patch-nav.mjs. When a new version ships,
//     bump that constant + rerun patch-nav.mjs. This script reads it as
//     truth — if anything else hardcodes a different vX.Y.Z, fail.
//   - Historical body-copy references ("Sverklo v0.17.1 was used to
//     produce these benchmark numbers") are allowed via the
//     ALLOWED_HISTORICAL set below — they're factual statements about
//     past runs, not stale fallbacks.
//
// Run: `node scripts/lint-versions.mjs` from repo root.
// Exit code: 0 if clean, 1 if any unallowed stale version found.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = join(__dirname, "..");

// Read the canonical version from patch-nav.mjs so there's exactly one
// source of truth for "current sverklo version on the site."
const patchNavSrc = readFileSync(join(__dirname, "patch-nav.mjs"), "utf8");
const m = patchNavSrc.match(/VERSION_FALLBACK\s*=\s*["'](v\d+\.\d+\.\d+)["']/);
if (!m) {
  console.error(
    "lint-versions: could not parse VERSION_FALLBACK from patch-nav.mjs — refusing to run."
  );
  process.exit(2);
}
const CURRENT = m[1];
const CURRENT_BARE = CURRENT.slice(1);

// Body-copy historical references. Match by file + version + a unique
// substring of the line so patch-nav.mjs injecting new <head>/<style>
// blocks doesn't shift line numbers and break the allowlist.
const ALLOWED_HISTORICAL = [
  // Post-launch retrospective: provenance for the v0.23.1 → v0.27.0
  // sequence + the in-flight v0.28.0 work. The whole post is a release
  // log; every version cited is historical. Allowlist all of them.
  ...["v0.23.1", "v0.24.0", "v0.25.0", "v0.25.1", "v0.25.2", "v0.26.0", "v0.26.1", "v0.28.0"].map(
    (version) => ({
      file: "blog/the-fix-that-wasnt/index.html",
      version,
      snippet: version,
      note: `retrospective: provenance for the ${version} release in the log`,
    })
  ),
  // docs/config: factual claim that keep_alive was added in v0.23.1.
  // Doc citation, not a UI badge.
  {
    file: "docs/config/index.html",
    version: "v0.23.1",
    snippet: "v0.23.1",
    note: "docs/config: factual provenance — sverklo v0.23.1 added Ollama keep_alive",
  },
  // Updates feed: factual statements about which version shipped which
  // change. Not UI fallbacks — provenance for the ship/fix entries.
  {
    file: "updates/index.html",
    version: "v0.20.6",
    snippet: "v0.20.6",
    note: "updates feed: provenance for the audit JSON 1.0.0 ship entry",
  },
  {
    file: "updates/index.html",
    version: "v0.20.3",
    snippet: "v0.20.3",
    note: "updates feed: provenance for the cascade-bug fix (sv-p4-04)",
  },
  // Memoir comparison: third-party version (v0.1.9 = memoir-ai PyPI alpha).
  // Not a sverklo version, but lint can't tell from regex alone.
  // Match "v0.1.9" anywhere on the line — it's always Memoir's version.
  {
    file: "vs/memoir/index.html",
    version: "v0.1.9",
    snippet: "v0.1.9",
    note: "memoir comparison: third-party (Memoir/memoir-ai) version, not sverklo",
  },
  {
    file: "blog/we-already-shipped-git-for-agent-memory/index.html",
    version: "v0.1.9",
    snippet: "v0.1.9",
    note: "memoir comparison post: third-party (Memoir) version, not sverklo",
  },
  // Historical publication-time claim in the May 9 comparison post.
  // Not a UI fallback or an active current-version claim.
  {
    file: "blog/we-already-shipped-git-for-agent-memory/index.html",
    version: "v0.20.6",
    snippet: "Production (v0.20.6)",
    note: "memoir comparison post: publication-time Sverklo version on 2026-05-09",
  },
  // Research paper citations: which sverklo version produced the
  // numbers in the paper. NOT a UI fallback — a factual claim.
  {
    file: "research/index.html",
    version: "v0.17.1",
    snippet: "Numbers in the paper come from sverklo",
    note: "research paper provenance — which sverklo version produced the numbers",
  },
  {
    file: "bench/index.html",
    version: "v0.2.11",
    snippet: "sverklo v0.2.11 at run-time",
    note: "bench:primitives provenance — sverklo version that produced the 60-task results in this report",
  },
  {
    file: "blog/14200-tokens-to-find-one-function/index.html",
    version: "v0.20.1",
    snippet: "latest npm release (v0.20.1)",
    note: "launch post: v0.20.1 was the release shipping `sverklo receipt`. Factual provenance, not a UI fallback.",
  },
  {
    file: "blog/index.html",
    version: "v0.20.1",
    snippet: "v0.20.1",
    note: "blog index excerpt referencing the launch post (which shipped sverklo receipt in v0.20.1).",
  },
  {
    file: "bench/index.html",
    version: "v0.20.1",
    snippet: "pre-fix table (sverklo v0.20.1",
    note: "May 4 PM bench page: pre-vs-post diff label for the v0.20.2 fix landing.",
  },
  {
    file: "bench/index.html",
    version: "v0.20.1",
    snippet: "sverklo v0.20.1</strong>",
    note: "May 4 PM bench page: pre-fix table row label.",
  },
  // bench/index.html: 180-task run provenance + May-4 pre/post-fix labels
  {
    file: "bench/index.html",
    version: "v0.20.18",
    snippet: "Sverklo v0.20.18 achieves F1 0.56",
    note: "bench page FAQ: provenance for 180-task headline F1 (historical, pre-2026-05-13 rerun)",
  },
  {
    file: "bench/index.html",
    version: "v0.20.19",
    snippet: "v0.20.19",
    note: "bench page: factual reference to v0.20.19 Python-decorator audit fix (closes P5 gap)",
  },
  {
    file: "bench/index.html",
    version: "v0.20.2",
    snippet: "May 4, 20",
    note: "May 4 timeline header (pre/post-fix bench cards)",
  },
  {
    file: "bench/index.html",
    version: "v0.20.2",
    snippet: "releases/tag/v0.20.2",
    note: "Direct link to v0.20.2 release tag in the May-4 timeline card",
  },
  {
    file: "bench/index.html",
    version: "v0.20.2",
    snippet: "post-fix table (sverklo v0.20.2)",
    note: "May 4 PM post-fix table header",
  },
  {
    file: "bench/index.html",
    version: "v0.20.2",
    snippet: "<strong>sverklo v0.20.2</strong>",
    note: "May 4 PM post-fix table row label",
  },
  {
    file: "bench/index.html",
    version: "v0.20.2",
    snippet: "post-v0.20.2 single-baseline rerun",
    note: "May 4 footnote: data provenance for post-fix rerun",
  },
  {
    file: "bench/index.html",
    version: "v0.20.2",
    snippet: "Pre-v0.20.2 numbers preserved here",
    note: "May 4 footnote: pre-fix numbers preserved for audit diff",
  },
  // bench/losses/index.html: every v0.20.19 reference is a factual claim
  // about which version shipped the Python-decorator audit fix.
  {
    file: "bench/losses/index.html",
    version: "v0.20.19",
    snippet: "v0.20.19",
    note: "bench losses page: factual provenance for fastapi P5 Python-decorator fix",
  },
  {
    file: "bench/losses/index.html",
    version: "v0.20.17",
    snippet: "v0.20.17",
    note: "bench losses page: factual provenance for prior fastapi audit version",
  },
  // benchmarks/index.html: version badge baked into the perf-bench static
  // page footer. Updated client-side via patch-nav VERSION_FALLBACK fetcher.
  {
    file: "benchmarks/index.html",
    version: "v0.20.2",
    snippet: 'id="bench-version-inline"',
    note: "perf-bench page footer version badge — client-fills from npm registry; this is the SSR fallback",
  },
  // blog/bench-as-feedback-loop: factual narrative about the v0.20.2 fix iteration
  {
    file: "blog/bench-as-feedback-loop/index.html",
    version: "v0.20.2",
    snippet: "v0.20.2",
    note: "bench-loop post: factual narrative about sverklo v0.20.2 brace-counter fix iteration",
  },
  // blog/claude-code-tool-overload: the entire post is about what shipped in v0.20.9
  {
    file: "blog/claude-code-tool-overload/index.html",
    version: "v0.20.9",
    snippet: "v0.20.9",
    note: "tool-overload post: the post is about what shipped in v0.20.9 (SVERKLO_PROFILE=core default)",
  },
  {
    file: "blog/claude-code-tool-overload/index.html",
    version: "v0.20.14",
    snippet: "sverklo v0.20.14",
    note: "tool-overload post: doctor probe output captured at v0.20.14",
  },
  // blog/claude-code-troubleshooting-large-repos
  {
    file: "blog/claude-code-troubleshooting-large-repos/index.html",
    version: "v0.20.9",
    snippet: "v0.20.9",
    note: "large-repos post: cross-link mention of the v0.20.9 tool-overload fix",
  },
  // blog/tool-search-doesnt-fix-grep
  {
    file: "blog/tool-search-doesnt-fix-grep/index.html",
    version: "v0.20.9",
    snippet: "v0.20.9",
    note: "tool-search post: factual reference to v0.20.9 fix",
  },
  {
    file: "blog/tool-search-doesnt-fix-grep/index.html",
    version: "v0.20.15",
    snippet: "v0.20.15",
    note: "tool-search post: factual reference to v0.20.15 doctor-probe upgrade",
  },
  // blog/the-fix-that-wasnt: post-launch retrospective mentions the exact
  // release train that produced the artifact-validation rule.
  {
    file: "blog/the-fix-that-wasnt/index.html",
    version: "v0.27.0",
    snippet: "v0.27.0",
    note: "post-launch retrospective: historical references to v0.27.0 in release timeline and validation narrative",
  },
  // index.html: bench-loop narrative mentions v0.20.2
  {
    file: "index.html",
    version: "v0.20.2",
    snippet: "loop-evt",
    note: "home page bench-loop event card: factual narrative about v0.20.2 fix",
  },
  // press/index.html: 180-task headline provenance
  {
    file: "press/index.html",
    version: "v0.20.18",
    snippet: "v0.20.18",
    note: "press page: factual provenance for 180-task bench run (sverklo v0.20.18)",
  },
  {
    file: "press/index.html",
    version: "v0.20.19",
    snippet: "v0.20.19",
    note: "press page: factual reference to v0.20.19 audit fix",
  },
  // vs/jcodemunch: factual narrative about which versions ran the bench
  {
    file: "vs/jcodemunch/index.html",
    version: "v0.20.2",
    snippet: "v0.20.2",
    note: "jcodemunch comparison: factual provenance for bench-run versions",
  },
  // vs/smart-grep-at-scale: factual reference to v0.20.19 P5 audit fix
  {
    file: "vs/smart-grep-at-scale/index.html",
    version: "v0.20.19",
    snippet: "v0.20.19",
    note: "smart-grep comparison: factual provenance for P5 audit fix shipped in v0.20.19",
  },
  // bun-rust-audit-gap post (2026-05-15): factual mentions of the
  // sverklo release-cycle history (v0.20.22 → v0.20.31), the v0.20.25
  // path-lookup regression and v0.20.29 fix, and v0.20.27 vendored-
  // path filter shipped. All are honest provenance for the audit-gap
  // story; none are UI fallbacks.
  {
    file: "blog/bun-rust-audit-gap/index.html",
    version: "v0.20.22",
    snippet: "v0.20.22 through v0.20.31",
    note: "audit-gap post: range start of the 11-release dogfood arc",
  },
  {
    file: "blog/bun-rust-audit-gap/index.html",
    version: "v0.20.31",
    snippet: "v0.20.22 through v0.20.31",
    note: "audit-gap post: range end of the 11-release dogfood arc",
  },
  {
    file: "blog/bun-rust-audit-gap/index.html",
    version: "v0.20.25",
    snippet: "v0.20.25",
    note: "audit-gap post: factual provenance for the path-lookup change that introduced the GLOB-injection regression",
  },
  {
    file: "blog/bun-rust-audit-gap/index.html",
    version: "v0.20.29",
    snippet: "v0.20.29",
    note: "audit-gap post: factual provenance for the GLOB-injection fix shipped after dogfood-agent caught it",
  },
  {
    file: "blog/bun-rust-audit-gap/index.html",
    version: "v0.20.27",
    snippet: "v0.20.27",
    note: "audit-gap post: factual provenance for the vendored-path audit-time filter",
  },
  // bench/index.html + press/index.html: v0.20.21 references are now
  // historical (current is v0.20.31). Both are 2026-05-13-run citations.
  {
    file: "bench/index.html",
    version: "v0.20.21",
    snippet: "v0.20.21",
    note: "bench page: factual provenance for the 2026-05-13 180-task run",
  },
  {
    file: "press/index.html",
    version: "v0.20.21",
    snippet: "v0.20.21",
    note: "press page: factual provenance for the 2026-05-13 180-task run",
  },
];

const VERSION_RE = /v0\.\d+\.\d+/g;
const SOFTWARE_VERSION_RE = /"softwareVersion"\s*:\s*"(0\.\d+\.\d+)"/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "dist") continue;
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) yield* walk(full);
    else if (full.endsWith(".html")) yield full;
  }
}

const findings = [];
for (const file of walk(REPO_ROOT)) {
  const rel = relative(REPO_ROOT, file);
  const lines = readFileSync(file, "utf8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const softwareVersion = lines[i].match(SOFTWARE_VERSION_RE);
    if (softwareVersion && softwareVersion[1] !== CURRENT_BARE) {
      findings.push({
        file: rel,
        line: i + 1,
        version: softwareVersion[1],
        snippet: lines[i].trim().slice(0, 140),
      });
      continue;
    }

    const matches = lines[i].matchAll(VERSION_RE);
    for (const m of matches) {
      const ver = m[0];
      if (ver === CURRENT) continue;
      const allowed = ALLOWED_HISTORICAL.some(
        (a) => a.file === rel && a.version === ver && lines[i].includes(a.snippet)
      );
      if (allowed) continue;
      findings.push({ file: rel, line: i + 1, version: ver, snippet: lines[i].trim().slice(0, 140) });
    }
  }
}

if (findings.length === 0) {
  console.log(`lint-versions: clean. Current version is ${CURRENT}.`);
  process.exit(0);
}

console.error(
  `lint-versions: ${findings.length} stale version reference(s). Current: ${CURRENT}.\n`
);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  ${f.version}`);
  console.error(`    ${f.snippet}`);
}
console.error(
  "\nFix options:\n" +
    "  1. Bump VERSION_FALLBACK in scripts/patch-nav.mjs and rerun it.\n" +
    "  2. If this is a historical citation (paper/blog), add an entry to\n" +
    "     ALLOWED_HISTORICAL in this file with file/line/version/note.\n"
);
process.exit(1);
