# Medium draft - proof-first adoption article

Status: draft, not published

## Working title

I almost treated my open-source AI coding tool like an ads problem. It was a proof problem.

## Subtitle

Sverklo had installs, stars, and working code. What it did not have was enough third-party proof that a maintainer could trust before wiring another MCP server into their agent.

## Medium tags

- AI
- Open Source
- Developer Tools
- MCP
- Software Engineering

## Canonical URL

If this publishes on Medium first, leave canonical unset.

If the same article ships on `sverklo.com/blog/` first, set Medium's canonical URL to the Sverklo-owned post before publishing.

## Publication checklist

1. Paste the article body below into Medium.
2. Use the title and subtitle above.
3. Add the five tags above.
4. Add a simple code-oriented cover image or skip the cover image. Do not use a generic AI robot image.
5. Do not publish until the CTA links resolve:
   - `https://sverklo.com/proof/`
   - `https://sverklo.com/repo-memory-mcp/`
   - `https://github.com/sverklo/sverklo/discussions/79`
6. After publishing, share the link only in places where a proof request is appropriate. Do not mass-post.

---

# Article body

I almost treated my open-source AI coding tool like an ads problem. It was a proof problem.

I am building [Sverklo](https://sverklo.com), a local-first MCP server for AI coding agents. The short version: it gives Claude Code, Cursor, Windsurf, Codex CLI, and other MCP clients a repo map, hybrid code search, symbol references, blast-radius analysis, diff review, and git-pinned memory.

The promise is simple: before your agent edits code, it should know what is load-bearing in the repo.

That sounds useful. It is also not enough.

For a while I was watching the wrong signals. GitHub stars moved a little. npm downloads moved a little. The website explained the product better than before. The docs got cleaner. The first-run command got safer.

Adoption still felt slow.

The tempting founder answer is: distribution. More launch posts. More list submissions. More social. More ads.

The uncomfortable answer was narrower: I had not earned enough external proof.

## The thing people are actually buying is trust

Installing another local coding-agent tool is not a casual action.

If you are a maintainer, you are asking:

- Will this touch my repo?
- Will it upload my code?
- Will it rewrite my agent config?
- Will it waste tokens?
- Will it make the agent more confident and still wrong?
- Is this meaningfully better than `rg`, Cursor's index, or just asking Claude to read files?

Those are not marketing objections. They are product trust objections.

Sverklo is local-first. It does not require API keys. It does not upload code. It can now run a proof receipt without writing MCP config or agent instruction files.

But a claim is weaker than a receipt.

So I changed the ask.

## The current ask is not "try my tool"

The current ask is:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Run that from a real repo root.

It does not wire Sverklo into your agent. It does not write `.mcp.json`. It does not append instructions to your agent config. It may cache the local model/index under `~/.sverklo`, but the point is to produce a receipt before setup.

The receipt should show:

- central files in the repo,
- one selected symbol,
- where that symbol is referenced,
- a paste-ready prompt for your coding agent,
- and enough context to decide whether Sverklo saw something real or just produced polished noise.

The useful reply is not praise.

The useful reply is one of four artifacts:

- Receipt: selected files, symbol, and callers look fair.
- Correction: the graph chose the wrong center or missed important files.
- Grep-better case: exact search was the better tool.
- Setup friction: Node, npm, model cache, runtime, or output blocked the run.

Broken receipts are more useful than compliments.

## Why not just advertise?

Because paid traffic would send more people into the same trust gap.

If 100 people click an ad and 95 bounce because they do not know whether the tool is safe, the ad did not fail. The proof path failed.

The better sequence is:

1. Make the first run safe.
2. Make the receipt easy to classify.
3. Get third-party receipts or corrections.
4. Put the best and worst receipts on the page.
5. Then amplify.

That is slower than buying traffic. It is also less self-deceptive.

For Sverklo, the adoption diagnosis became:

- distribution matters,
- activation matters,
- messaging matters,
- but external proof is the bottleneck that tells me which of the three is actually failing.

If fewer than two people even attempt the no-write receipt, the distribution or category clarity is weak.

If five people attempt it and the receipts are noisy, the product proof selection is weak.

If people keep asking "why not grep?", the messaging is weak.

Those are different problems. Stars and download counts blur them together.

## Grep is still the right answer sometimes

This is the part I want to keep explicit.

If your question is "where does this exact string appear?", use `rg`.

If your repo is tiny, use `rg`.

If you know the identifier and the language's reference pattern is simple, `rg '\bsymbol\b'` may be the fastest correct path.

Sverklo is trying to prove a narrower case:

- Which files are central to this codebase?
- What depends on this file?
- What callers would be affected by changing this symbol?
- What should an agent read before editing a 40-file PR?
- What project decisions should survive across sessions?

That is relationship-heavy work. It needs a graph, not just text matches.

The product is not "grep replacement." The product is repo memory for agents before they edit.

## What changed in the product

The most important change was not a landing page headline. It was lowering the risk of the first touch.

Sverklo now has a no-write proof path:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

It also has:

- `init --dry-run`, so setup can be previewed before config writes,
- agent-specific `doctor` guidance,
- clearer proof pages,
- a public discussion for receipts and corrections,
- and directory submissions aimed at high-intent MCP users rather than broad attention.

The website now points people to the proof before the install.

That is a small change in copy and a large change in trust posture.

## What I am measuring now

I still watch stars and npm downloads, but they are secondary.

The real metric is weekly credible external proof receipts.

Not testimonials. Not "looks cool." Not "starred."

Receipts.

I want to know:

- Did the command run?
- Did it choose a meaningful center of the repo?
- Did it find real callers?
- Did it miss a load-bearing file?
- Was grep better?
- Did setup friction stop the run?

That is the signal that determines whether Sverklo needs better distribution, better proof selection, or better positioning.

## If you maintain a repo, I want the boring truth

If you use an AI coding agent on a real repo, run:

```bash
npm exec --yes --package=sverklo@latest -- sverklo prove --no-write --guided --markdown
```

Then post one useful artifact here:

- the receipt,
- a correction,
- a grep-better case,
- or setup friction.

The public receipt thread is here:

https://github.com/sverklo/sverklo/discussions/79

The short proof guide is here:

https://sverklo.com/proof/

The category page is here:

https://sverklo.com/repo-memory-mcp/

The GitHub repo is here:

https://github.com/sverklo/sverklo

If the proof is bad, say so. That is the point of asking for proof before asking for adoption.

## The larger lesson

For developer tools, slow adoption is not always an awareness problem.

Sometimes the product is not activated enough.

Sometimes the category is unclear.

Sometimes the market does not believe the claim yet.

And sometimes "marketing" means building a smaller, safer experiment that lets someone disprove you in five minutes.

That is where Sverklo is now.

I do not need broader praise. I need sharper receipts.
