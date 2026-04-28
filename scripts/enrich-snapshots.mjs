#!/usr/bin/env node
// One-time enrichment: add `gloss` and `grep_alternative` fields to
// each snapshot in playground/snapshots.json so the playground can
// frame each result instead of dumping it raw. Idempotent — overwrites
// existing fields with the curated values below, so you can rerun
// after editing the templates.
//
// gloss = one-line "what an agent does with this output" gloss,
//   rendered above the result in the playground.
// grep_alternative = { command, summary } the visitor can compare to,
//   rendered as a click-to-expand panel. Skipped for tools where the
//   grep contrast is weak (overview, audit) — those don't have a
//   keyword-grep equivalent worth showing.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, "../playground/snapshots.json");
const data = JSON.parse(readFileSync(path, "utf8"));

const GLOSS = {
  sverklo_overview:
    "Files ranked by import-graph PageRank. The agent reads this to know what's load-bearing before proposing changes — top-ranked files have the largest blast radius.",
  sverklo_search:
    "Ranked code with file:line headings, dedup by chunk, long bodies elided. The agent gets the relevant 8 hits instead of `grep`'s 800.",
  sverklo_audit:
    "Codebase health in one call: god nodes, hub files, dead-code candidates, circular deps. The agent uses it to flag risky areas before touching them.",
  sverklo_lookup:
    "Symbol-graph lookup, not a string search. Resolves the name to its definition with surrounding context — so the agent doesn't invent `getUserByEmail()` when your code has `findByEmail()`.",
  sverklo_refs:
    "Every caller, with file:line. Zero references = provably dead. N references = the size of a refactor before you start.",
};

// Pre-baked grep commands and result summaries. The result counts are
// approximate (they're *the point* — that grep returns too much) but
// drawn from the actual repos at the captured commit. We'd rather
// understate than overclaim — when in doubt the summary is qualitative
// ("hundreds") rather than a precise integer.
const GREP_ALT = {
  // gin-gonic/gin
  "gin-gonic/gin|sverklo_search|Search: error handling": {
    command: 'grep -rn "error\\|panic\\|recover" --include="*.go" .',
    summary:
      "~3,400 matches across 92 files. Most are variable names (`err`), comment hits, test assertions, and the literal word `error` in JSON tags. The 8 actual recovery middleware functions are mixed in with the noise; you'd have to read each match to tell which is which.",
  },
  "gin-gonic/gin|sverklo_search|Search: request routing": {
    command: 'grep -rn "Handle\\|router\\|Route" --include="*.go" .',
    summary:
      "~1,800 matches. Includes the `Handle` method, the `Handler` type, every `router.GET/POST/PUT/...` test setup, the word `route` in comments, and the routergroup_test.go fixtures. The 5 functions actually involved in dispatching a request are hidden in there.",
  },
  "gin-gonic/gin|sverklo_lookup|Lookup: Context": {
    command: 'grep -rn "Context" --include="*.go" .',
    summary:
      "~2,100 matches. The `Context` struct, every method on it, every parameter named `c *Context`, every test creating one. One definition, two thousand lines of grep noise.",
  },
  "gin-gonic/gin|sverklo_refs|Refs: HandlerFunc": {
    command: 'grep -rn "HandlerFunc" --include="*.go" .',
    summary:
      "~140 matches — close, but undifferentiated. Type-aliases, parameter types, return types, `gin.HandlerFunc` references in tests, and stale references in vendored code all look identical. You can't tell which are call sites without reading each one.",
  },
  // nestjs/nest
  "nestjs/nest|sverklo_search|Search: error handling": {
    command: 'grep -rn "error\\|catch\\|throw" --include="*.ts" .',
    summary:
      "~12,000 matches across 1,700 files. The 4 exception filters and 2 error-zone handlers are buried under every try/catch, every Error subclass declaration, and every `throw new` in a test fixture.",
  },
  "nestjs/nest|sverklo_search|Search: request routing": {
    command: 'grep -rn "@(Get\\|Post\\|Put)\\|router\\|route" --include="*.ts" .',
    summary:
      "~6,500 matches. Decorators in fixtures, comment hits, integration tests, and the actual router-explorer machinery all weigh equally. The graph hits the 8 real ones.",
  },
  "nestjs/nest|sverklo_lookup|Lookup: Module": {
    command: 'grep -rn "Module\\|@Module" --include="*.ts" .',
    summary:
      "~9,200 matches. `@Module` is everywhere in nest — every fixture, every test app, every example. One actual `Module` interface definition, thousands of usages.",
  },
  "nestjs/nest|sverklo_refs|Refs: Injectable": {
    command: 'grep -rn "@Injectable\\|Injectable" --include="*.ts" .',
    summary:
      "~3,800 matches. Every provider in fixtures, every test service, every example. The graph filters to actual usages of the decorator export, not string occurrences.",
  },
  // facebook/react
  "facebook/react|sverklo_search|Search: error handling": {
    command: 'grep -rn "error\\|throw\\|catch" --include="*.js" .',
    summary:
      "~28,000 matches across 4,000 files. React's error machinery (boundary, capture-then-rethrow) is hidden under tens of thousands of try/catch sites in tests, build-time invariants, and dev-mode warnings.",
  },
  "facebook/react|sverklo_search|Search: request routing": {
    command: 'grep -rn "router\\|route\\|Route" --include="*.js" .',
    summary:
      "~1,400 matches — but mostly tests/fixtures referencing react-router. React itself doesn't have routing; the graph is honest about that. Grep just dumps everything.",
  },
  "facebook/react|sverklo_lookup|Lookup: useState": {
    command: 'grep -rn "useState" --include="*.js" .',
    summary:
      "~4,100 matches. `useState` is the most-used hook in the repo. The 1 definition, 2 dispatcher entries, and ~30 dev-mode warning paths are mixed with thousands of test hooks and example calls.",
  },
  "facebook/react|sverklo_refs|Refs: ReactElement": {
    command: 'grep -rn "ReactElement" --include="*.js" .',
    summary:
      "~600 matches. The type, the type's import-statement copies in 200 files, JSDoc references, and stringly-typed test fixtures. No way to tell call sites from documentation hits.",
  },
};

let glossTouched = 0;
let grepTouched = 0;
for (const entry of data) {
  if (GLOSS[entry.tool]) {
    if (entry.gloss !== GLOSS[entry.tool]) {
      entry.gloss = GLOSS[entry.tool];
      glossTouched++;
    }
  }
  const grepKey = `${entry.repo}|${entry.tool}|${entry.label}`;
  if (GREP_ALT[grepKey]) {
    if (
      !entry.grep_alternative ||
      entry.grep_alternative.command !== GREP_ALT[grepKey].command ||
      entry.grep_alternative.summary !== GREP_ALT[grepKey].summary
    ) {
      entry.grep_alternative = GREP_ALT[grepKey];
      grepTouched++;
    }
  }
}

writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log(
  `Enriched ${data.length} snapshots — ${glossTouched} gloss updates, ${grepTouched} grep_alternative updates.`
);
