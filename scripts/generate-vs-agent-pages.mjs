#!/usr/bin/env node
// Generate /vs/<agent>/index.html pages for AI coding agents that are
// complementary to sverklo, not competitors. Each page captures the
// "open source alternative to X" + "X vs sverklo" queries with FAQ
// schema and an honest "use both together" framing. Run once to ship,
// run again to refresh content.
//
// Why this script and not a static template per page: 4 pages × ~250
// lines means 1000 lines that're 80% identical. Single-source it here.

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VS_DIR = join(__dirname, "../vs");

const AGENTS = [
  {
    slug: "claude-code",
    name: "Claude Code",
    homepage: "https://claude.ai/code",
    summary:
      "Claude Code is Anthropic's official CLI agent that runs in the terminal and edits code through tool calls. Sverklo is an MCP server Claude Code calls to retrieve from your codebase — they're built to work together.",
    relationship: "complementary",
    relationship_note:
      "Sverklo is an MCP server Claude Code installs as a tool provider. <code>sverklo init</code> auto-writes <code>.mcp.json</code> at the project root and the 37 sverklo tools appear in Claude Code's tool list immediately.",
    primary_query: "open source MCP server for Claude Code",
    queries: [
      { q: "How do I stop Claude Code from hallucinating function names that don't exist in my codebase?", a: "Claude Code generates from training-data patterns when it doesn't have authoritative retrieval against your repo. Sverklo's <code>sverklo_lookup</code>, <code>sverklo_refs</code>, and <code>sverklo_verify</code> MCP tools give Claude Code a real symbol graph: it resolves <code>findByEmail</code> to its definition with file:line, proves whether a quoted span still exists at the cited git SHA, and never lets the agent invent a function name that isn't in the codebase. Run <code>sverklo init</code> in your project — Claude Code picks the tools up automatically." },
      { q: "What's the best MCP server for Claude Code?", a: "Sverklo ships 37 MCP tools across hybrid code search, symbol-graph blast-radius analysis, diff-aware risk-scored review, and bi-temporal memory pinned to git SHAs. It's the only MCP server that bundles all four surfaces in one zero-config install. MIT-licensed, runs locally with embedded SQLite + ONNX, no API keys." },
      { q: "How do I install sverklo for Claude Code?", a: "Run <code>npm install -g sverklo</code>, then <code>cd your-project && sverklo init</code>. The init command writes <code>.mcp.json</code>, appends a sverklo block to <code>CLAUDE.md</code> (or AGENTS.md if that's what your project uses), and runs <code>sverklo doctor</code> to verify the MCP handshake. Restart Claude Code and the 37 tools appear in <code>/mcp</code>." },
      { q: "Does Claude Code support MCP?", a: "Yes — Claude Code natively supports the Model Context Protocol via <code>.mcp.json</code> at the project root. Sverklo registers as an stdio MCP server. You don't need to write any custom config; <code>sverklo init</code> auto-detects Claude Code and wires it up." }
    ],
  },
  {
    slug: "aider",
    name: "Aider",
    homepage: "https://aider.chat",
    summary:
      "Aider is a Python-based CLI AI pair programmer that edits code in your local repo. Sverklo is the retrieval layer Aider can call via MCP to ground its edits in real symbol-graph data instead of training-data patterns.",
    relationship: "complementary",
    relationship_note:
      "Aider edits code; sverklo tells Aider what's in your codebase. Aider can call sverklo's MCP tools through its MCP integration to look up symbols, find references, and check whether a function it's about to write actually exists.",
    primary_query: "open source alternative to Aider",
    queries: [
      { q: "What's the best open source alternative to Aider?", a: "Sverklo isn't an alternative to Aider — they solve different layers. Aider is the agent (it generates and applies edits); sverklo is the retrieval layer (it answers \"does this symbol exist?\" \"who calls it?\" \"what's the blast radius?\"). Run them together: Aider for editing, sverklo (via MCP) for retrieval. If you want a sverklo-only alternative for codebase question-answering without any agent at all, the <code>sverklo</code> CLI exposes the same surface (<code>sverklo search</code>, <code>sverklo refs</code>, <code>sverklo audit</code>)." },
      { q: "How do I give Aider a symbol graph of my codebase?", a: "Aider supports MCP servers via its config. Run <code>sverklo init</code> in your project — it generates <code>.mcp.json</code> that Aider's MCP integration picks up, exposing 37 sverklo tools (<code>sverklo_lookup</code>, <code>sverklo_refs</code>, <code>sverklo_impact</code>, <code>sverklo_verify</code>, etc.) to Aider. The agent now reasons about your real symbol graph instead of training-data patterns." },
      { q: "Does Aider need an embeddings index?", a: "Aider has its own repo-map feature (built on tree-sitter), and that's enough for small repos. On large interconnected codebases — where Aider's repo-map exceeds its context budget — sverklo's hybrid retrieval (BM25 + ONNX vector + PageRank) pulls only the chunks that matter, which is the load-bearing axis when the agent is making real edits." },
      { q: "Is sverklo better than Aider's repo-map?", a: "Different jobs. Aider's repo-map is a lightweight static signal that fits in the system prompt. Sverklo's index is a queryable graph the agent calls on demand. On 10-file repos, repo-map is fine. On 1k-file monorepos, sverklo's tools answer questions repo-map can't fit (\"who calls this?\" \"is this dead code?\")." }
    ],
  },
  {
    slug: "continue",
    name: "Continue",
    homepage: "https://continue.dev",
    summary:
      "Continue is an open-source AI code assistant for VS Code and JetBrains. Sverklo is the local-first MCP retrieval backend Continue can use as its codebase context provider.",
    relationship: "complementary",
    relationship_note:
      "Continue is the assistant UI; sverklo is its retrieval engine. Wire sverklo into Continue's MCP config and the assistant's @codebase-style queries route through sverklo's symbol graph instead of relying on Continue's built-in indexing.",
    primary_query: "Continue.dev MCP code intelligence",
    queries: [
      { q: "What's the best MCP server for Continue.dev?", a: "Sverklo. Continue supports MCP servers as context providers; sverklo registers as one and exposes 37 tools the assistant can call. Symbol-graph lookup, blast-radius analysis, diff-aware risk-scored review, and bi-temporal memory — all running locally with no API keys." },
      { q: "How do I add a symbol graph to Continue?", a: "Run <code>sverklo init</code> in your project. The command writes the MCP config that Continue picks up; the sverklo tools become available to the assistant alongside Continue's built-in retrieval. No cloud, no API keys, no separate index to maintain." },
      { q: "Is sverklo a replacement for Continue?", a: "No — they're complementary. Continue is the assistant + UI in your editor. Sverklo is the retrieval backend it can call. Use both: Continue for editing, sverklo for grounding." },
      { q: "Can sverklo replace Continue's @codebase indexing?", a: "Sverklo's hybrid retrieval (BM25 + ONNX + PageRank) is more sophisticated than Continue's default indexing — it builds a symbol graph and computes PageRank on imports. If your codebase is large enough that @codebase misses what you need, route through sverklo via MCP instead." }
    ],
  },
  {
    slug: "codex-cli",
    name: "Codex CLI",
    homepage: "https://github.com/openai/codex",
    summary:
      "Codex CLI is OpenAI's open-source command-line coding agent that runs locally and edits code through tool calls. Sverklo is an MCP server Codex CLI can register as a tool provider — the same way it works with Claude Code.",
    relationship: "complementary",
    relationship_note:
      "Codex CLI supports MCP. Wire sverklo as an MCP tool provider and the agent gains the symbol graph, blast-radius analysis, and diff-aware review that Codex's built-in tools don't expose.",
    primary_query: "MCP server for Codex CLI",
    queries: [
      { q: "Does Codex CLI support MCP servers?", a: "Yes — Codex CLI implements the Model Context Protocol, so any MCP server (including sverklo) registers as a tool provider. Run <code>sverklo init</code> and the 37 sverklo tools appear in Codex CLI's tool list." },
      { q: "What's the best MCP server for Codex CLI?", a: "Sverklo. Same hybrid retrieval, blast-radius, diff-review, and bi-temporal memory surface as on Claude Code or Cursor. Local-first, MIT-licensed, no per-seat pricing, no cloud, no API keys." },
      { q: "How is sverklo different from Codex CLI's built-in code search?", a: "Codex CLI's built-in tools are general-purpose (file reads, shell commands). Sverklo exposes a 37-tool retrieval API that's specifically about your symbol graph: <code>sverklo_impact</code> for blast radius, <code>sverklo_refs</code> for caller context, <code>sverklo_audit</code> for hub files and god nodes. Different abstraction layer, different power surface." },
      { q: "Can I run Codex CLI and sverklo together?", a: "Yes — that's the recommended setup. Codex CLI is the agent loop; sverklo is the retrieval backend. The 37 sverklo MCP tools coexist with Codex's built-in tools." }
    ],
  },
];

const NAV = `<header class="top nav-canonical">
  <div class="nav-grid">
    <a class="brand" href="/">sverklo</a>
    <nav class="top-nav">
      <a href="/report/">reports</a>
      <a href="/vs/">compare</a>
      <a href="/benchmarks/">benchmarks</a>
      <a href="/research/">research</a>
      <a href="/playground/">playground</a>
      <a href="/blog/">blog</a>
      <a href="https://github.com/sverklo/sverklo" target="_blank" rel="noopener">github</a>
    </nav>
    <div class="top-cta"><a href="https://www.npmjs.com/package/sverklo" target="_blank" rel="noopener" id="version-badge">v0.18.2</a></div>
  </div>
</header>`;

function renderFaqJsonLd(queries) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: queries.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.a.replace(/<[^>]+>/g, ""),
        },
      })),
    },
    null,
    2
  );
}

function render(agent) {
  const title = `Sverklo + ${agent.name} — open-source MCP code intelligence for ${agent.name}`;
  const desc = `${agent.summary} MIT-licensed, local-first, runs entirely on your laptop. Install with one command.`;
  const ogTitle = `Sverklo + ${agent.name} — local-first MCP code intelligence`;

  const faqHtml = agent.queries
    .map(
      (qa) => `      <details>
        <summary>${qa.q}</summary>
        <p>${qa.a}</p>
      </details>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://sverklo.com/vs/${agent.slug}/">

<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://sverklo.com/vs/${agent.slug}/">
<meta property="og:image" content="https://sverklo.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${ogTitle}">
<meta name="twitter:description" content="${desc}">

<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<script type="application/ld+json">
${renderFaqJsonLd(agent.queries)}
</script>

<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    background:var(--bg);color:var(--fg);
    font-family:'Public Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    font-size:15px;line-height:1.65;
    padding:48px 20px;max-width:880px;margin:0 auto;
  }
  a{color:var(--accent);text-decoration:none} a:hover{text-decoration:underline}
  h1{font-size:30px;line-height:1.2;margin-bottom:12px;letter-spacing:-.02em}
  h1 .plus{color:var(--accent)}
  .subtitle{color:var(--muted);font-size:16px;margin-bottom:32px;max-width:60ch}
  .meta{color:var(--muted);font-size:12px;margin-bottom:40px;padding-bottom:20px;border-bottom:2px solid var(--accent)}
  h2{color:var(--accent);font-size:18px;margin:36px 0 14px;padding-bottom:6px;border-bottom:1px solid #333}
  p{margin:10px 0;color:var(--muted)}
  p strong{color:var(--fg)}
  code{background:var(--bg-2);padding:2px 6px;border-radius:3px;font-size:13px;font-family:'JetBrains Mono',ui-monospace,monospace}
  pre{background:var(--bg-2);padding:16px;border-radius:6px;overflow-x:auto;margin:12px 0;border-left:3px solid var(--accent);font-size:13px;font-family:'JetBrains Mono',ui-monospace,monospace}
  details{
    border:1px solid var(--border);
    border-radius:6px;
    margin:8px 0;
    background:var(--bg-2);
  }
  details summary{
    padding:14px 16px;
    cursor:pointer;
    color:var(--fg);
    font-weight:600;
    list-style:none;
    font-size:15px;
  }
  details summary::before{
    content:"▸ ";
    color:var(--accent);
    margin-right:6px;
  }
  details[open] summary::before{content:"▾ ";}
  details p{
    padding:0 16px 14px;
    border-top:1px solid var(--border);
    margin:0;
    padding-top:14px;
  }
  .relationship{
    background:var(--bg-2);
    border:1px solid var(--border);
    border-left:3px solid var(--accent);
    padding:16px 20px;
    border-radius:6px;
    margin:20px 0;
  }
  .relationship strong{color:var(--fg)}
  .cta{
    background:var(--bg-2);
    border:1px solid var(--border);
    padding:20px 24px;
    border-radius:8px;
    margin:32px 0;
  }
  .cta h3{color:var(--fg);font-size:16px;margin:0 0 10px}
  @media(max-width:700px){
    body{padding:24px 12px;font-size:13px}
    h1{font-size:24px}
  }
</style>
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

${NAV}

<main id="main">

<h1>Sverklo <span class="plus">+</span> ${agent.name}</h1>
<p class="subtitle">${agent.summary}</p>
<div class="meta">
  ${agent.name}: <a href="${agent.homepage}" target="_blank" rel="noopener">${agent.homepage}</a> ·
  Sverklo: MIT-licensed, local-first, MCP-native, 37 tools, runs on your laptop ·
  Install: <code>npm install -g sverklo &amp;&amp; sverklo init</code>
</div>

<div class="relationship">
  <strong>Relationship:</strong> ${agent.relationship_note}
</div>

<h2>How they fit together</h2>
<p>${agent.name} is the agent — it decides what to do, generates code, applies edits. Sverklo is the retrieval layer the agent calls when it needs authoritative answers about <em>your</em> codebase. Without sverklo, the agent generates from training-data patterns and invents function names that don't exist. With sverklo, it looks up real symbols, finds real call sites, measures real blast radius before proposing changes.</p>

<p>The integration is one command:</p>
<pre><code>npm install -g sverklo
cd your-project
sverklo init</code></pre>

<p><code>sverklo init</code> auto-detects ${agent.name} and writes the right MCP config files. The 37 sverklo tools appear in the agent's tool list immediately.</p>

<h2>Frequently asked questions</h2>
<div>
${faqHtml}
</div>

<div class="cta">
  <h3>Try it</h3>
  <p>If you're already using ${agent.name} and your agent has hallucinated function names, invented imports, or forgotten yesterday's design decision — sverklo is the retrieval layer that fixes the root cause.</p>
  <pre><code>npm install -g sverklo
sverklo init</code></pre>
  <p>Or read the <a href="/bench/">60-task retrieval benchmark</a> first — we publish where sverklo wins <em>and</em> where it loses.</p>
</div>

<h2>See also</h2>
<ul>
  <li><a href="/bench/">bench:primitives — 60-task retrieval evaluation</a> (where sverklo wins, where it loses)</li>
  <li><a href="/vs/">All comparisons</a></li>
  <li><a href="/playground/">Playground — see real sverklo output on real OSS repos</a></li>
  <li><a href="https://github.com/sverklo/sverklo">GitHub: sverklo/sverklo</a></li>
</ul>

</main>

</body>
</html>
`;
}

let written = 0;
for (const agent of AGENTS) {
  const dir = join(VS_DIR, agent.slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const path = join(dir, "index.html");
  writeFileSync(path, render(agent));
  console.log(`[wrote] vs/${agent.slug}/index.html (${render(agent).length} bytes)`);
  written++;
}
console.log(`Done. ${written} /vs/ pages generated.`);
