#!/usr/bin/env node
// Normalize the top-nav link list across every subpage so users don't see
// a different menu on each page. Idempotent: replaces only the <nav
// class="top-nav">…</nav> region, leaves the surrounding <header> / container
// classes alone (each page has its own layout shell).
//
// For pages that lack a <header class="top"> wrapper (benchmarks,
// playground) we also inject a wrapper so the brand + nav render in the
// same shape as the rest of the site.

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const CANONICAL_NAV = `<nav class="top-nav">
      <a href="/report/">reports</a>
      <a href="/vs/">compare</a>
      <a href="/benchmarks/">benchmarks</a>
      <a href="/playground/">playground</a>
      <a href="/blog/">blog</a>
      <a href="https://github.com/sverklo/sverklo" target="_blank" rel="noopener">github</a>
    </nav>`;

// Self-contained CSS so subpage themes can't override the header. Mirrors
// the homepage's 12-column grid so nav items sit in the same horizontal slot
// regardless of whether the page has a CTA on the right.
const NAV_CSS_START = "/* @nav-injected";
const NAV_CSS_END = "/* @end-nav */";
const NAV_CSS = `/* @nav-injected — do not edit; run patch-nav.mjs */
header.top.nav-canonical {
  border-bottom: 1px solid #2A2620 !important;
  padding: 16px 0 !important;
  position: sticky !important;
  top: 0 !important;
  background: rgba(14, 13, 11, 0.92) !important;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 100 !important;
  width: 100vw !important;
  margin-left: calc(50% - 50vw) !important;
  margin-right: calc(50% - 50vw) !important;
  margin-top: 0 !important;
}
header.top.nav-canonical .nav-grid {
  display: grid !important;
  grid-template-columns: repeat(12, 1fr) !important;
  gap: 24px !important;
  max-width: 1280px !important;
  margin: 0 auto !important;
  padding: 0 32px !important;
  align-items: center !important;
  box-sizing: border-box !important;
}
header.top.nav-canonical .brand {
  grid-column: 1 / 4 !important;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  color: #EDE7D9 !important;
  text-decoration: none !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
}
header.top.nav-canonical .brand::before {
  content: "\\25CC ";
  color: #E85A2A !important;
}
header.top.nav-canonical .top-nav {
  grid-column: 5 / 10 !important;
  display: flex !important;
  gap: 32px !important;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  flex-wrap: nowrap !important;
  white-space: nowrap !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background: transparent !important;
}
header.top.nav-canonical .top-nav a {
  color: #A39886 !important;
  text-decoration: none !important;
  border: none !important;
  padding: 0 !important;
  background: transparent !important;
  font-weight: 500 !important;
}
header.top.nav-canonical .top-nav a:hover { color: #EDE7D9 !important; }
header.top.nav-canonical .top-cta {
  grid-column: 11 / 13 !important;
  display: flex !important;
  justify-content: flex-end !important;
  gap: 16px !important;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace !important;
  font-size: 13px !important;
  color: #A39886 !important;
}
header.top.nav-canonical .top-cta a {
  color: #A39886 !important;
  text-decoration: none !important;
  border: none !important;
  background: transparent !important;
}
header.top.nav-canonical .top-cta a:hover { color: #E85A2A !important; }
@media (max-width: 900px) {
  header.top.nav-canonical .nav-grid { gap: 16px !important; padding: 0 20px !important; }
  header.top.nav-canonical .brand { grid-column: 1 / 13 !important; margin-bottom: 8px !important; }
  header.top.nav-canonical .top-nav { grid-column: 1 / 13 !important; gap: 18px !important; }
  header.top.nav-canonical .top-cta { grid-column: 1 / 13 !important; justify-content: flex-start !important; }
}
/* @end-nav */`;

// Files to patch. Skip index.html (has the version-badge CTA variant) and the
// 6 already-canonical site-level pages — the idempotent replacement below is
// safe to run on them too, but this list keeps the script predictable.
function discover(rel, depth) {
  const root = new URL(rel, import.meta.url).pathname;
  const out = [];
  function walk(dir, left) {
    let names;
    try { names = readdirSync(dir); } catch { return; }
    for (const n of names) {
      const p = join(dir, n);
      let st;
      try { st = statSync(p); } catch { continue; }
      if (st.isDirectory()) { if (left > 0) walk(p, left - 1); }
      else if (n === "index.html" && left === 0) out.push(p);
    }
  }
  walk(root, depth);
  return out;
}

const TARGETS = [
  // site-level pages (already canonical but run for idempotence)
  new URL("../404.html", import.meta.url).pathname,
  new URL("../badge/index.html", import.meta.url).pathname,
  new URL("../benchmarks/index.html", import.meta.url).pathname,
  new URL("../blog/index.html", import.meta.url).pathname,
  new URL("../playground/index.html", import.meta.url).pathname,
  new URL("../report/index.html", import.meta.url).pathname,
  new URL("../vs/index.html", import.meta.url).pathname,
  // nested templates
  ...discover("../report/", 2),
  ...discover("../vs/", 1),
  ...discover("../blog/", 1),
];

// Find <nav class="top-nav">…</nav> and replace its inner link list with the
// canonical 6 items. Keeps whatever <header>/container wrapper is already
// there.
function normalizeNavLinks(html) {
  const m = html.match(/<nav class="top-nav">[\s\S]*?<\/nav>/);
  if (!m) return { html, touched: false, reason: "no-nav" };
  if (m[0] === CANONICAL_NAV) return { html, touched: false, reason: "already" };
  return { html: html.replace(m[0], CANONICAL_NAV), touched: true, reason: "nav-rewritten" };
}

const CTA_BLOCK = `<div class="top-cta"><a href="https://www.npmjs.com/package/sverklo" target="_blank" rel="noopener">v0.12.5</a></div>`;

// Collapse everything from the first <header class="top..."> to the LAST
// </header> that appears before the main content boundary (<main>, <section>,
// or content wrapper). This consumes any orphan fragments left by earlier
// buggy runs and emits exactly one canonical header. Idempotent.
function normalizeHeader(html, filePath) {
  if (filePath.endsWith("/sverklo-site/index.html")) return { html, touched: false };

  const startMatch = html.match(/<header class="top[^>]*>/);
  if (!startMatch) {
    // No header at all — create one from the bare <nav class="top-nav">.
    const navMatch = html.match(/<nav class="top-nav">[\s\S]*?<\/nav>/);
    if (!navMatch) return { html, touched: false };
    const block = `<header class="top nav-canonical">\n  <div class="nav-grid">\n    <a class="brand" href="/">sverklo</a>\n    ${navMatch[0]}\n    ${CTA_BLOCK}\n  </div>\n</header>`;
    return { html: html.replace(navMatch[0], block), touched: true };
  }
  const startIdx = startMatch.index;

  // Find the content boundary — first <main> / <section> / <div class="wrapper">
  // / <article> after the header start.
  const afterStart = html.slice(startIdx);
  const boundary = afterStart.match(/<main[\s>]|<section[\s>]|<article[\s>]|<div class="wrapper">/);
  if (!boundary) return { html, touched: false };

  // In the region before the boundary, find the LAST </header>.
  const region = afterStart.slice(0, boundary.index);
  const lastEnd = region.lastIndexOf("</header>");
  if (lastEnd < 0) return { html, touched: false };

  // Pull the canonical nav block out of the region (it's already been
  // normalized to 6 items by normalizeNavLinks).
  const navMatch = region.match(/<nav class="top-nav">[\s\S]*?<\/nav>/);
  if (!navMatch) return { html, touched: false };

  const newHeader = `<header class="top nav-canonical">\n  <div class="nav-grid">\n    <a class="brand" href="/">sverklo</a>\n    ${navMatch[0]}\n    ${CTA_BLOCK}\n  </div>\n</header>`;
  const before = html.slice(0, startIdx);
  const after = html.slice(startIdx + lastEnd + "</header>".length);
  const next = before + newHeader + after;
  return { html: next, touched: next !== html };
}

// Inject the shared CSS block just before </style> (idempotent — strip first).
function injectCss(html) {
  // Strip any existing block
  let out = html;
  while (true) {
    const s = out.indexOf(NAV_CSS_START);
    if (s < 0) break;
    const e = out.indexOf(NAV_CSS_END, s);
    if (e < 0) break;
    const blockEnd = e + NAV_CSS_END.length;
    let lo = s;
    while (lo > 0 && /\s/.test(out[lo - 1])) lo--;
    let hi = blockEnd;
    while (hi < out.length && out[hi] === "\n") hi++;
    out = out.slice(0, lo) + "\n" + out.slice(hi);
  }
  const idx = out.lastIndexOf("</style>");
  if (idx < 0) return { html: out, touched: false };
  return { html: out.slice(0, idx) + "\n" + NAV_CSS + "\n" + out.slice(idx), touched: true };
}

let ok = 0, skip = 0;
for (const p of TARGETS) {
  let html;
  try { html = readFileSync(p, "utf8"); } catch { skip++; continue; }
  const r1 = normalizeNavLinks(html);
  const r2 = normalizeHeader(r1.html, p);
  const r3 = injectCss(r2.html);
  if (r1.touched || r2.touched || r3.touched) {
    writeFileSync(p, r3.html);
    ok++;
    console.log(`[patched] ${p.replace(/.*sverklo-site\//, "")} (${[r1.touched && "nav", r2.touched && "header", r3.touched && "css"].filter(Boolean).join("+")})`);
  }
}
console.log(`Done. ${ok} page(s) updated, ${TARGETS.length - ok - skip} already canonical, ${skip} skipped.`);
