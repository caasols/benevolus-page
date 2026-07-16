# Benevol.us homepage — design spec

**Date:** 2026-07-16
**Status:** Approved by Sol (chat, 2026-07-16)
**Source of truth for visuals/content:** [docs/design/handoff.md](../../design/handoff.md) — the
client design handoff. It is final and high-fidelity: colours, type, spacing, content, and the
portrait animation are specified there exactly and are to be recreated pixel-faithfully. This
spec does not restate them; it records the implementation decisions made on top.

## Goal

Build the benevol.us homepage: a single-page, quiet studio calling card (cream page, hand-drawn
animated portrait, manifesto, three work lists), structured so a Writing/blog section and other
pages can be added later.

## Decisions (made with Sol)

- **Location:** `~/Documents/benevolus-landing-page`, its own git repo.
- **Stack:** Astro (latest, minimal template) + TypeScript. Plain scoped CSS, no Tailwind.
- **Fonts:** Space Mono + Newsreader self-hosted via `@fontsource` (performance; no Google
  Fonts request).
- **Deployment:** GitHub Pages with custom domain `benevol.us` (same pattern as greyout.cc):
  `site: 'https://benevol.us'` in `astro.config.mjs`, `public/CNAME`, deploy via the official
  `withastro/action` GitHub Actions workflow.
- **Placeholder links:** keep as in the handoff — `mailto:hello@benevol.us`, `#` for LinkedIn /
  Bluesky / Ask / A Traineira / We Love Film. RSS footer link points at `/rss.xml` (page added
  later with the blog). Nav "Writing" points at `/writing` (future).

## Architecture

```
src/
  layouts/BaseLayout.astro   # <html>/<head>, fonts, design tokens as CSS custom props,
                             # global styles; slots the page content
  components/
    TopBar.astro             # section nav (left) + social nav (right)
    Portrait.astro           # animated boil/blink portrait + its <script>
    WorkList.astro           # one section: heading (+ optional "est. · status" caption),
                             # renders WorkItem per entry
    WorkItem.astro           # name + tag pill + dotted leader + meta + status dot + description
    SiteFooter.astro         # FIND ME row
  data/work.ts               # typed content: apps / openSource / ventures arrays
  pages/index.astro          # composes TopBar → hero → lead → byline → sections → footer
public/
  portraits/portrait-1..4.png
  CNAME
```

- **Content as data:** each work item is `{ name, url, tag, meta, status, description }` with
  `status: 'live' | 'paused' | 'exited' | 'closed' | 'archived'` mapped to the three dot
  colours from the handoff. Updating the portfolio = editing one array.
- **Design tokens:** the handoff's colour/spacing tokens become CSS custom properties on
  `:root` in `BaseLayout.astro`; components use scoped `<style>` blocks referencing them.
- **Portrait animation:** plain vanilla `<script>` inside `Portrait.astro` (no island — no
  framework state). Preload 4 frames; boil = swap frames 1→2→4 every 380 ms; blink = at random
  2600–5000 ms show frame 3 for 130 ms then resume; `prefers-reduced-motion: reduce` → static
  frame 1, no timers.
- **External links:** `target="_blank" rel="noopener"` on external project/social links;
  `#apps` stays an in-page anchor.

## Error handling

Static site — no runtime data or error states. The only failure modes are build-time
(type-checked data file, `astro build` in CI before deploy).

## Testing / verification

- `astro build` passes (CI gate).
- Visual verification in the browser: compare rendered page against
  [docs/design/prototype.html](../../design/prototype.html) at desktop width and at the 680 px
  breakpoint; check hover colours, dotted leaders, status dots.
- Animation check: boil wiggle visible, blink occurs, reduced-motion shows a static frame.

## Out of scope (future)

Blog/content collections, `/writing` and Ask pages, real RSS feed, real LinkedIn/Bluesky/email
links, project detail pages.
