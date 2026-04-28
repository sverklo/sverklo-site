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

// Body-copy historical references. Match by file + version + a unique
// substring of the line so patch-nav.mjs injecting new <head>/<style>
// blocks doesn't shift line numbers and break the allowlist.
const ALLOWED_HISTORICAL = [
  // Research paper citations: which sverklo version produced the
  // numbers in the paper. NOT a UI fallback — a factual claim.
  {
    file: "research/index.html",
    version: "v0.17.1",
    snippet: "Numbers in the paper come from sverklo",
    note: "research paper provenance — which sverklo version produced the numbers",
  },
];

const VERSION_RE = /v0\.\d+\.\d+/g;

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
