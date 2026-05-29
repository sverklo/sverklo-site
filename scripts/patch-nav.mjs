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

// Nav distinguishes the two "bench-y" pages explicitly:
//   /bench/        → retrieval evaluation (90-task F1 / token economy)
//   /benchmarks/   → latency + cold-start performance
// Audit P0: previously a single "benchmarks" entry hid /bench/ entirely
// from cross-page navigation, even though the bench-loop story
// (sverklo's strongest content) lives on /bench/. Both now first-class.
const CANONICAL_NAV = `<nav class="top-nav">
      <a href="/install/">install</a>
      <a href="/compare/">compare</a>
      <a href="/bench/">bench</a>
      <a href="/docs/config/">docs</a>
      <a href="/research/">research</a>
      <a href="/blog/">blog</a>
      <a href="https://github.com/sverklo/sverklo" target="_blank" rel="noopener">github</a>
    </nav>`;

// Latest known sverklo version. Used as the synchronous fallback in the
// version badge — the runtime fetcher (VERSION_SCRIPT) refreshes it from
// npm if the network cooperates. Bump this whenever you publish a new
// release so subpages don't drift back to a stale fallback when npm
// is offline. The canonical truth is on npm; this is just a placeholder
// that gets shown for ~50ms before the fetch resolves.
const VERSION_FALLBACK = "v0.28.0";

// Canonical design tokens. Loaded before page-local styles so the
// per-page `:root { ... }` blocks override only when they want to.
const TOKENS_MARKER_START = "<!-- @tokens-injected — do not edit; run patch-nav.mjs -->";
const TOKENS_MARKER_END = "<!-- @end-tokens -->";
const TOKENS_BLOCK = `${TOKENS_MARKER_START}
<link rel="stylesheet" href="/tokens.css">
${TOKENS_MARKER_END}`;

// Google Fonts: same family list as the homepage. Subpages without
// these links render the wordmark in system fonts, which is the most
// visible brand inconsistency on the site.
// Fonts are now self-hosted via @font-face declarations in tokens.css
// (added 2026-05-06). Sverklo's brand thesis is local-first; the
// marketing site shouldn't beacon Google Fonts on every visit. The
// marker block is kept (now empty-ish) so existing pages can be
// re-patched to strip their old Google Fonts links cleanly.
const FONTS_MARKER_START = "<!-- @fonts-injected — do not edit; run patch-nav.mjs -->";
const FONTS_MARKER_END = "<!-- @end-fonts -->";
const FONTS_BLOCK = `${FONTS_MARKER_START}
<!-- Fonts self-hosted via @font-face in /tokens.css (no Google Fonts beacon). -->
${FONTS_MARKER_END}`;

// BreadcrumbList JSON-LD — derived per-page from the file path. Helps
// AI engines (Gemini, Perplexity) render breadcrumb snippets and
// strengthens entity-context for citations. Idempotent via marker.
const BREADCRUMB_MARKER_START = "<!-- @breadcrumb-injected — do not edit; run patch-nav.mjs -->";
const BREADCRUMB_MARKER_END = "<!-- @end-breadcrumb -->";

// Map URL segments → human-readable display names. Falls back to
// title-casing the slug. Hand-curated where the slug-to-name mapping
// is non-obvious.
const SEGMENT_NAMES = {
  "vs": "Compare",
  "blog": "Blog",
  "bench": "Retrieval bench",
  "benchmarks": "Performance",
  "mcp": "MCP code-intel index",
  "playground": "Playground",
  "research": "Research",
  "press": "Press",
  "badge": "Badge",
  "recipes": "Recipes",
  "report": "Reports",
  "launch-kit": "Launch kit",
  "docs": "Docs",
  "gitnexus": "vs GitNexus",
  "greptile": "vs Greptile",
  "jcodemunch": "vs jcodemunch-mcp",
  "serena": "vs Serena",
  "codebase-memory-mcp": "vs codebase-memory-mcp",
  "cursor-codebase": "vs Cursor @codebase",
  "sourcegraph-cody": "vs Sourcegraph Cody",
  "claude-code": "vs Claude Code",
  "claude-context": "vs Claude Context",
  "aider": "vs Aider",
  "continue": "vs Continue",
  "codex-cli": "vs Codex CLI",
  "matrix": "Comparison matrix",
  "cursor-sdk": "Cursor SDK recipe",
};

function segmentName(slug) {
  if (SEGMENT_NAMES[slug]) return SEGMENT_NAMES[slug];
  // Title-case the slug, replacing dashes with spaces.
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/**
 * Build BreadcrumbList JSON-LD from a file path relative to sverklo-site root.
 * E.g. "vs/gitnexus/index.html" → Home > Compare > vs GitNexus.
 * Returns the inline <script> block string.
 */
function breadcrumbBlock(relPath) {
  // Strip trailing /index.html and leading slash.
  const url = "/" + relPath.replace(/\/?index\.html$/, "").replace(/^\/+/, "");
  // Root page — no breadcrumb (it's the home).
  if (url === "/" || url === "") return null;
  const segments = url.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sverklo.com/",
    },
  ];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += "/" + seg;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: segmentName(seg),
      item: "https://sverklo.com" + acc + "/",
    });
  });
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
  return `${BREADCRUMB_MARKER_START}
<script type="application/ld+json">
${JSON.stringify(json, null, 2)}
</script>
${BREADCRUMB_MARKER_END}`;
}

function injectBreadcrumb(html, relPath) {
  let out = html;
  // Strip prior marker block (idempotent).
  const s = out.indexOf(BREADCRUMB_MARKER_START);
  if (s >= 0) {
    const e = out.indexOf(BREADCRUMB_MARKER_END, s);
    if (e >= 0) {
      const blockEnd = e + BREADCRUMB_MARKER_END.length;
      let lo = s;
      while (lo > 0 && /\s/.test(out[lo - 1])) lo--;
      let hi = blockEnd;
      while (hi < out.length && out[hi] === "\n") hi++;
      out = out.slice(0, lo) + "\n" + out.slice(hi);
    }
  }
  const block = breadcrumbBlock(relPath);
  if (!block) return { html: out, touched: out !== html };
  const idx = out.indexOf("</head>");
  if (idx < 0) return { html: out, touched: false };
  return {
    html: out.slice(0, idx) + block + "\n" + out.slice(idx),
    touched: true,
  };
}

// Runtime version refresh. Renders the static fallback synchronously
// (so there's no layout shift), then tries to overwrite it from npm
// with a 2s timeout. If npm is slow/offline we keep the fallback.
const VERSION_SCRIPT_START = "<!-- @version-script-injected — do not edit; run patch-nav.mjs -->";
const VERSION_SCRIPT_END = "<!-- @end-version-script -->";
const VERSION_SCRIPT = `${VERSION_SCRIPT_START}
<script>
(async () => {
  const el = document.getElementById('version-badge');
  if (!el) return;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2000);
    const r = await fetch('https://registry.npmjs.org/sverklo/latest', { signal: ctrl.signal });
    clearTimeout(t);
    const data = await r.json();
    if (data && data.version) el.textContent = 'v' + data.version;
  } catch { /* keep static value */ }
})();
</script>
${VERSION_SCRIPT_END}`;

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
/* The sticky header escapes the body's max-width via negative side
   margins, but it cannot escape body padding-top — pages with body
   padding (benchmarks: 48px, research: similar) shoved the header
   down by exactly that amount, leaving an empty black band above
   the nav. Reset top padding when the canonical header is present
   and restore equivalent spacing inside main. */
body:has(header.top.nav-canonical) {
  padding-top: 0 !important;
}
body:has(header.top.nav-canonical) > main,
body:has(header.top.nav-canonical) > #main {
  padding-top: 32px !important;
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
  new URL("../research/index.html", import.meta.url).pathname,
  new URL("../bench/index.html", import.meta.url).pathname,
  new URL("../compare/index.html", import.meta.url).pathname,
  new URL("../docs/config/index.html", import.meta.url).pathname,
  new URL("../install/index.html", import.meta.url).pathname,
  new URL("../press/index.html", import.meta.url).pathname,
  new URL("../vs/index.html", import.meta.url).pathname,
  new URL("../vs/matrix/index.html", import.meta.url).pathname,
  // /mcp/ is generated by scripts/build-mcp-index.mjs from index.template.html.
  // We patch the TEMPLATE so the build output inherits nav + tokens injections.
  new URL("../mcp/index.template.html", import.meta.url).pathname,
  new URL("../mcp/index.html", import.meta.url).pathname,
  // nested templates
  ...discover("../report/", 2),
  ...discover("../vs/", 1),
  ...discover("../blog/", 1),
  ...discover("../recipes/", 1),
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

const CTA_BLOCK = `<div class="top-cta"><a href="https://www.npmjs.com/package/sverklo" target="_blank" rel="noopener" id="version-badge">${VERSION_FALLBACK}</a></div>`;

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

// Inject the canonical tokens.css link into <head> (idempotent).
function injectTokens(html) {
  let out = html;
  const s = out.indexOf(TOKENS_MARKER_START);
  if (s >= 0) {
    const e = out.indexOf(TOKENS_MARKER_END, s);
    if (e >= 0) {
      const blockEnd = e + TOKENS_MARKER_END.length;
      let lo = s;
      while (lo > 0 && /\s/.test(out[lo - 1])) lo--;
      let hi = blockEnd;
      while (hi < out.length && out[hi] === "\n") hi++;
      out = out.slice(0, lo) + "\n" + out.slice(hi);
    }
  }
  // Inject just before the first <style> tag so per-page styles still
  // win on every shared property they declare.
  const idx = out.indexOf("<style>");
  if (idx < 0) {
    // No <style> — fall back to before </head>.
    const headIdx = out.indexOf("</head>");
    if (headIdx < 0) return { html: out, touched: false };
    return {
      html: out.slice(0, headIdx) + TOKENS_BLOCK + "\n" + out.slice(headIdx),
      touched: true,
    };
  }
  return {
    html: out.slice(0, idx) + TOKENS_BLOCK + "\n" + out.slice(idx),
    touched: true,
  };
}

// Inject the Google Fonts links into <head> (idempotent — strip first).
function injectFonts(html) {
  let out = html;
  const s = out.indexOf(FONTS_MARKER_START);
  if (s >= 0) {
    const e = out.indexOf(FONTS_MARKER_END, s);
    if (e >= 0) {
      const blockEnd = e + FONTS_MARKER_END.length;
      let lo = s;
      while (lo > 0 && /\s/.test(out[lo - 1])) lo--;
      let hi = blockEnd;
      while (hi < out.length && out[hi] === "\n") hi++;
      out = out.slice(0, lo) + "\n" + out.slice(hi);
    }
  }
  // Strip any pre-existing hand-rolled Google Fonts links. These existed
  // on pages predating the central FONTS_BLOCK (e.g., index.html had its
  // own preconnect+stylesheet). Now that fonts are self-hosted via
  // tokens.css, every page should drop them.
  out = out
    .replace(/<link[^>]+rel="preconnect"[^>]+fonts\.googleapis\.com[^>]*>\s*\n?/g, "")
    .replace(/<link[^>]+rel="preconnect"[^>]+fonts\.gstatic\.com[^>]*>\s*\n?/g, "")
    .replace(/<link[^>]+fonts\.googleapis\.com\/css2[^>]*>\s*\n?/g, "");
  // Insert the (mostly empty) marker block before </head> so the file
  // remains idempotent under re-patching, and so the auditable comment
  // about self-hosting lives somewhere visible to future readers.
  const idx = out.indexOf("</head>");
  if (idx < 0) return { html: out, touched: false };
  return {
    html: out.slice(0, idx) + FONTS_BLOCK + "\n" + out.slice(idx),
    touched: true,
  };
}

// Inject the version-refresh script just before </body> (idempotent).
function injectVersionScript(html) {
  let out = html;
  const s = out.indexOf(VERSION_SCRIPT_START);
  if (s >= 0) {
    const e = out.indexOf(VERSION_SCRIPT_END, s);
    if (e >= 0) {
      const blockEnd = e + VERSION_SCRIPT_END.length;
      let lo = s;
      while (lo > 0 && /\s/.test(out[lo - 1])) lo--;
      let hi = blockEnd;
      while (hi < out.length && out[hi] === "\n") hi++;
      out = out.slice(0, lo) + "\n" + out.slice(hi);
    }
  }
  // Skip if a version-badge fetcher is already wired up (home page has
  // its own copy with extra logic).
  if (
    out.includes("registry.npmjs.org/sverklo/latest") &&
    !out.includes(VERSION_SCRIPT_START)
  ) {
    return { html: out, touched: out !== html };
  }
  const idx = out.lastIndexOf("</body>");
  if (idx < 0) return { html: out, touched: false };
  return {
    html: out.slice(0, idx) + VERSION_SCRIPT + "\n" + out.slice(idx),
    touched: true,
  };
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

// Compute file path relative to sverklo-site root for breadcrumb derivation.
const SITE_ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
function relFromRoot(p) {
  return p.startsWith(SITE_ROOT) ? p.slice(SITE_ROOT.length).replace(/^\/+/, "") : p;
}

let ok = 0, skip = 0;
for (const p of TARGETS) {
  let html;
  try { html = readFileSync(p, "utf8"); } catch { skip++; continue; }
  const r1 = normalizeNavLinks(html);
  const r2 = normalizeHeader(r1.html, p);
  const r3 = injectCss(r2.html);
  const r4 = injectFonts(r3.html);
  const r5 = injectVersionScript(r4.html);
  const r6 = injectTokens(r5.html);
  const r7 = injectBreadcrumb(r6.html, relFromRoot(p));
  if (r1.touched || r2.touched || r3.touched || r4.touched || r5.touched || r6.touched || r7.touched) {
    writeFileSync(p, r7.html);
    ok++;
    const tags = [
      r1.touched && "nav",
      r2.touched && "header",
      r3.touched && "css",
      r4.touched && "fonts",
      r5.touched && "version-script",
      r6.touched && "tokens",
      r7.touched && "breadcrumb",
    ].filter(Boolean).join("+");
    console.log(`[patched] ${p.replace(/.*sverklo-site\//, "")} (${tags})`);
  }
}
console.log(`Done. ${ok} page(s) updated, ${TARGETS.length - ok - skip} already canonical, ${skip} skipped.`);
