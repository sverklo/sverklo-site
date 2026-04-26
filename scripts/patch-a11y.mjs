#!/usr/bin/env node
// Inject shared a11y rules (focus ring + nav tap-target padding) into every
// site page's <style> block. Idempotent — strips ALL prior blocks before
// re-adding exactly one.

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const FILES = [
  "../index.html",
  "../report/index.html",
  "../badge/index.html",
  "../vs/index.html",
  "../blog/index.html",
  "../404.html",
  "../benchmarks/index.html",
  "../playground/index.html",
];

// Discover /report/<owner>/<repo>/index.html pages and /vs/<slug>/index.html
// and /blog/<slug>/index.html so the a11y block lands everywhere.
function discoverNested(rel, depth) {
  const root = new URL(rel, import.meta.url).pathname;
  const found = [];
  function walk(dir, remaining) {
    let entries;
    try { entries = readdirSync(dir); } catch { return; }
    for (const name of entries) {
      const full = join(dir, name);
      let st;
      try { st = statSync(full); } catch { continue; }
      if (st.isDirectory()) {
        if (remaining > 0) walk(full, remaining - 1);
      } else if (name === "index.html" && remaining === 0 && full !== join(root, "index.html")) {
        found.push(full);
      }
    }
  }
  walk(root, depth);
  return found;
}

const NESTED = [
  ...discoverNested("../report/", 2), // /report/<owner>/<repo>/index.html
  ...discoverNested("../vs/", 1),     // /vs/<slug>/index.html
  ...discoverNested("../blog/", 1),   // /blog/<slug>/index.html
];

const START = "/* @a11y-injected";
const END = "/* @end-a11y */";

const BLOCK = `/* @a11y-injected — do not edit; run patch-a11y.mjs */
a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--accent, #E85A2A) !important;
  outline-offset: 2px;
  border-radius: 2px;
}
.top-nav a, nav.top-nav a {
  padding: 10px 0;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
}
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px; height: 1px;
  overflow: hidden;
}
.skip-link:focus {
  position: fixed;
  left: 16px; top: 16px;
  width: auto; height: auto;
  padding: 8px 14px;
  background: #16140F;
  color: #EDE7D9;
  border: 2px solid #E85A2A;
  border-radius: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  z-index: 10000;
  text-decoration: none;
}
.visually-hidden {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* @end-a11y */`;

function stripAllBlocks(html) {
  // Manual scan: remove every START..END block. Safer than regex with
  // tricky escape semantics.
  let out = html;
  while (true) {
    const s = out.indexOf(START);
    if (s < 0) break;
    const e = out.indexOf(END, s);
    if (e < 0) break;
    const blockEnd = e + END.length;
    // Trim leading/trailing whitespace lines that wrap the block.
    let lo = s;
    while (lo > 0 && /\s/.test(out[lo - 1])) lo--;
    let hi = blockEnd;
    while (hi < out.length && out[hi] === "\n") hi++;
    out = out.slice(0, lo) + "\n" + out.slice(hi);
  }
  return out;
}

const SKIP_LINK = `<a class="skip-link" href="#main">Skip to content</a>`;

function injectSkipLink(html) {
  // Strip any prior skip-link
  html = html.replace(/<a class="skip-link"[^>]*>[^<]*<\/a>\s*/g, "");
  // Add <id="main"> to the first <main> if missing
  html = html.replace(/<main(\s[^>]*)?>/, (match, attrs) => {
    if (match.includes('id="main"')) return match;
    if (attrs && attrs.includes("id=")) return match; // has some other id
    return `<main id="main"${attrs || ""}>`;
  });
  // Insert skip link right after <body> open
  html = html.replace(/<body(\s[^>]*)?>/, (match) => `${match}\n${SKIP_LINK}`);
  return html;
}

function patchOne(absPath, label) {
  let html = readFileSync(absPath, "utf8");
  html = stripAllBlocks(html);
  const idx = html.lastIndexOf("</style>");
  if (idx < 0) {
    console.warn(`[skip] no </style>: ${label}`);
    return false;
  }
  html = html.slice(0, idx) + "\n" + BLOCK + "\n" + html.slice(idx);
  html = injectSkipLink(html);
  writeFileSync(absPath, html);
  return true;
}

let ok = 0;
for (const rel of FILES) {
  const p = new URL(rel, import.meta.url).pathname;
  if (patchOne(p, rel)) ok++;
}
let nestedOk = 0;
for (const p of NESTED) {
  if (patchOne(p, p)) nestedOk++;
}
console.log(`Patched a11y block into ${ok} top-level page(s) and ${nestedOk} nested page(s).`);
