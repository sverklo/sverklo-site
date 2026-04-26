#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../report/", import.meta.url).pathname;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else if (name === "index.html") yield p;
  }
}

const reports = [...walk(ROOT)].filter((p) => {
  const rel = p.slice(ROOT.length).split("/");
  return rel.length === 3 && rel[2] === "index.html";
});

let ok = 0, skipped = 0;

for (const file of reports) {
  const rel = file.slice(ROOT.length);
  const [owner, repo] = rel.split("/");
  const display = `${owner}/${repo}`;
  const canonical = `https://sverklo.com/report/${display.toLowerCase()}/`;

  let html = readFileSync(file, "utf8");

  const gradeMatch = html.match(/<span class="grade-letter"[^>]*>([A-F])<\/span>/);
  if (!gradeMatch) { skipped++; console.warn(`[skip] no grade letter: ${rel}`); continue; }
  const grade = gradeMatch[1];

  const seoTitle = `Sverklo Audit — ${display} — Grade ${grade}`;
  const seoDesc = `Sverklo code-intelligence audit of ${display}. Overall grade ${grade}. Dead code, circular dependencies, coupling, and security analysis with reproducer.`;

  const metaBlock = `<meta name="description" content="${esc(seoDesc)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:title" content="${esc(seoTitle)}">
<meta property="og:description" content="${esc(seoDesc)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="Sverklo">
<meta property="og:image" content="https://sverklo.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(seoTitle)}">
<meta name="twitter:description" content="${esc(seoDesc)}">
<meta name="twitter:image" content="https://sverklo.com/og.png">`;

  // Strip any previously-injected SEO block (idempotency for re-runs).
  html = html.replace(
    /\n?<meta name="description"[^>]*>\n?<link rel="canonical"[^>]*>\n?(?:<meta (?:property|name)="(?:og|twitter):[^"]*"[^>]*>\n?)+/,
    ""
  );

  // Inject after <title>...</title>.
  const titleRe = /(<title>[^<]*<\/title>)/;
  if (!titleRe.test(html)) { skipped++; console.warn(`[skip] no title: ${rel}`); continue; }
  html = html.replace(titleRe, `$1\n${metaBlock}`);

  // Replace nav block with shared inventory (idempotent).
  html = html.replace(
    /<nav class="top-nav">[\s\S]*?<\/nav>/,
    `<nav class="top-nav">
      <a href="https://sverklo.com/report/">← All reports</a>
      <a href="https://sverklo.com/vs/">compare</a>
      <a href="https://sverklo.com/benchmarks/">benchmarks</a>
      <a href="https://sverklo.com/blog/">blog</a>
      <a href="https://github.com/sverklo/sverklo">GitHub</a>
    </nav>`
  );

  // Promote project-name span to <h1> (a11y: every page needs an h1).
  // Idempotent: matches both the original <span> form and the patched <h1> form.
  html = html.replace(
    /<(span|h1) class="project-name">([^<]+)<\/\1>/,
    `<h1 class="project-name">$2</h1>`
  );

  // Wrap content in <main> landmark (a11y). Idempotent — no-op if main present.
  if (!/<main[\s>]/.test(html)) {
    html = html.replace(/<\/header>\n/, `</header>\n\n<main>\n`);
    html = html.replace(/\n<\/body>/, `\n</main>\n</body>`);
  }

  writeFileSync(file, html);
  ok++;
}

console.log(`\nPatched ${ok} report(s). Skipped ${skipped}.`);
