# Handoff: Benevol.us — studio homepage

## Overview
Benevol.us is a tiny software studio run by one person (**Sol**). The site is a quiet,
personal, anti-corporate "calling card": a warm cream page with hand-drawn ink portrait,
a one-line manifesto, and three scannable lists of work (Apps, Open source, Ventures).
The motto, from the Latin *bene + volus* = "wishing well": software that **serves people,
not subscriptions**. This handoff covers the **homepage**, structured so a **Writing/blog**
section and other pages (Ask/AMA, project detail pages) can be added later.

## About the design files
The files in this bundle are **design references created in HTML** — a prototype showing
the intended look and behaviour, **not production code to copy verbatim**. The task is to
**recreate this design in a new Astro project** using idiomatic Astro (components, layouts,
content collections), not to paste the HTML in. The prototype was authored in a proprietary
component format (`.dc.html`); ignore the framework wrapper and read it as annotated HTML +
one small vanilla-JS behaviour (the portrait animation, described below).

## Target stack
**Astro** (chosen with the client). Rationale: content-heavy, ships ~no JS, first-class
Markdown/MDX **content collections** for the planned blog, built-in **RSS** (there is an RSS
link in the footer), and reusable components so the header/footer/portrait are written once.
- Astro (latest), TypeScript optional but recommended.
- No CSS framework needed — the design is a small, bespoke system (tokens below). Plain
  scoped CSS or CSS modules is fine. Do **not** pull in Tailwind unless the client asks.
- Only client-side JS is the portrait animation — make it a tiny script or a `client:idle`
  island so the rest of the page stays static.
- Fonts: Google Fonts **Space Mono** (monospace, structure/labels) and **Newsreader**
  (serif, prose/headings). Self-host via `@fontsource` for performance if you like.

## Suggested project structure
```
src/
  layouts/BaseLayout.astro        # <html>, <head>, fonts, global tokens, header + footer slot
  components/
    Portrait.astro                # the boil/blink hand-drawn portrait (island)
    WorkList.astro                # renders a section (Apps / Open source / Ventures)
    WorkItem.astro                # one row: name + tag + dotted leader + meta + status dot + desc
    TopBar.astro                  # section nav (left) + social nav (right)
    SiteFooter.astro              # "Find me" links
  pages/
    index.astro                   # homepage — composes the above
    writing/                      # FUTURE: content collection -> pages
  content/                        # FUTURE: blog markdown
public/
  portraits/portrait-1..4.png     # provided in /assets of this bundle
```

## Fidelity
**High-fidelity.** Colours, type, spacing, and the one animation are final. Recreate
pixel-faithfully. The exact hex values, font sizes, and measurements are listed in Design
Tokens and per-component below.

## Screens / Views

### Homepage (`index.astro`)
- **Purpose**: introduce the studio + Sol, state the ethos, list the work, offer contact.
- **Layout**: single centred column. `max-width: 736px`, `margin: 0 auto`,
  `padding: 68px 40px 96px`. Page background is the cream `#f4ecd8`; the column is **not** a
  card (no border/shadow) — it sits directly on the page.
- **Vertical order**: Top bar → Hero (portrait + h1) → lead paragraph → byline →
  divider → **Apps** → divider → **Open source** → divider → **Ventures** → footer.
- **Section dividers**: `height:1px; background: rgba(38,36,69,0.16)`, with ~50px vertical margins.

#### Components

**TopBar** — flex row, `justify-content: space-between`, `align-items: baseline`,
`flex-wrap: wrap`, `gap: 24px`, `margin-bottom: 80px`. Font: Space Mono.
- Left nav (`font-size: 14.5px`, `gap: 30px`): **Studio** (bold, weight 700, current page),
  **Apps** (→ `#apps`), **Writing** (→ `/writing`, future), **Ask** (future).
- Right nav (`font-size: 12.5px`, color `#8a836f`, `gap: 18px`): **Email**, **GitHub**,
  **LinkedIn**, **Bluesky**. No underline; hover → accent.

**Hero** — flex row, `align-items: center`, `gap: 28px`, `margin-bottom: 30px`.
- **Portrait**: 150×150px, `object-fit: cover`, `object-position: center 42%`. Animated
  (see Interactions). No border/frame — the drawing already sits on the cream ground.
- **H1**: Newsreader, weight 400, `font-size: 40px`, `line-height: 1.22`,
  `letter-spacing: -0.01em`, `margin: 0`, color `#262445`. Text:
  *"Benevol.us is a tiny studio, building for good."*

**Lead paragraph** — Newsreader, `font-size: 20px`, `line-height: 1.62`, color `#33314e`,
`max-width: 60ch`. Text: *"No dark patterns. No subscription you can't leave. No lock-in on
your own data. Just useful tools, made small and made well."*

**Byline** — Space Mono, `font-size: 13.5px`, `line-height: 1.7`, color `#57503f`,
`margin-top: 34px`. Text: *"A studio of one. Made by me, **Sol**."* ("Sol" is `#262445`,
weight 700.)

**Section heading** — Space Mono, `font-size: 13px`, weight 700, `letter-spacing: 0.16em`,
`text-transform: uppercase`, color `#262445`. Apps and Ventures headings sit in a
`space-between` row with a right-aligned caption *"est. · status"* (`font-size: 12px`,
`#8a836f`). Open source heading has no caption. `margin-bottom: 18–22px`.

**WorkItem** (one row) — a block; items in a section are stacked with `gap: 20px`.
- Top line: flex row, `align-items: baseline`, `gap: 11px`, containing in order:
  1. **Name** — `<a>`, Newsreader, `font-size: 21px`, weight 500, no underline. Color `#262445`,
     hover `#b04a2c`.
  2. **Tag pill** — Space Mono, `font-size: 10px`, `letter-spacing: 0.08em`, uppercase,
     color `#b04a2c`, `border: 1px solid rgba(176,74,44,0.4)`, `padding: 1px 6px`,
     `border-radius: 4px`. (e.g. `macOS`, `chrome`, `raycast`, `saas`, `vinyl`, `shop`.)
  3. **Dotted leader** — a flexible spacer: `flex: 1; border-bottom: 1px dotted
     rgba(38,36,69,0.26); transform: translateY(-4px)`.
  4. **Meta** — Space Mono, `font-size: 13px`, color `#8a836f`, `white-space: nowrap`
     (year, e.g. `2026`, `2019 · exited`, `2016–21`, `2010–16`, or a licence like `MIT`).
  5. **Status dot** — 9×9px circle, `border-radius: 50%`. Colours:
     green `#4a8a4a` = live, amber `#c99a2e` = paused, muted `#a7a08c` = exited/closed/archived.
- Description line: Newsreader, `font-size: 16px`, `line-height: 1.5`, color `#57503f`,
  `margin-top: 2px`.

**Footer ("Find me")** — `margin-top: 56px`, `padding-top: 28px`,
`border-top: 1px solid rgba(38,36,69,0.16)`, flex row, `align-items: baseline`, `gap: 22px`,
`flex-wrap: wrap`, Space Mono, `font-size: 13.5px`. Label **FIND ME** (weight 700,
`letter-spacing: 0.12em`, uppercase) then underlined links: Email, GitHub, LinkedIn,
Bluesky, RSS (`text-underline-offset: 3px`).

## Content (exact, current)

**Apps**
- **Greyout** · tag `macOS` · `2026` · live — "A menu-bar app that greys out your screen so
  colour and notifications stop pulling at you. Calm tech, one keypress." → https://greyout.cc/

**Open source**
- **Gememo** · tag `chrome` · `2026` · live — "Bot-free Google Meet notes, filed to your own
  apps the moment you leave. No bot, no audio, no lock-in." → https://github.com/caasols/gememo
- **Raycast · YouTube Transcribe** · tag `raycast` · `MIT` · live — "Fetch, browse, and export
  YouTube transcripts with AI summaries — right in your command bar." →
  https://github.com/caasols/raycast-youtube-scribe
- **Raycast · Público** · tag `raycast` · `MIT` · live — "Read the latest from the Portuguese
  daily Público without leaving your command bar." → https://github.com/caasols/raycast-publico

**Ventures**
- **GotJazz** · tag `saas` · `2019 · exited` — "Discogs × Shopify for small record shops.
  Exited to Waxconn.com." → https://waxconn.com
- **A Traineira** · tag `vinyl` · `2016–21` · closed — "A vinyl records mail-order service and
  music label, for people who still drop the needle." → TODO (no URL yet)
- **We Love Film** · tag `shop` · `2010–16` · archived — "Analogue photography e-commerce, back
  when film was 'dead.'" → TODO (no URL yet)

### Links still needed from the client (currently `#` / placeholder)
- Email address (footer + top bar use `mailto:hello@benevol.us` as a placeholder)
- LinkedIn, Bluesky, RSS URLs
- A Traineira and We Love Film destination URLs (may be archives or none)
- Writing and Ask pages don't exist yet — nav points at `/writing` and `#` for now.

## Interactions & Behavior

**Portrait "boil + blink" animation** — the signature interaction. Four hand-drawn frames
of the same face (provided). Logic:
- Preload all four images on mount (`new Image()`), so swaps never flicker.
- **Boil**: every **380ms**, swap the `<img src>` to the next of three eyes-open frames
  (`portrait-1`, `portrait-2`, `portrait-4`) in a loop — this makes the ink lines "wiggle"
  like a living sketch.
- **Blink**: on a random timer of **2600–5000ms**, swap to the eyes-closed frame
  (`portrait-3`) for **130ms**, then return to the current boil frame and reschedule.
- Clean up the interval + timeout on unmount.
- Implement as a small script tied to one `<img id="portrait">`, or an Astro island
  (`client:idle`). It's ~20 lines of vanilla JS; no library. Respect
  `prefers-reduced-motion: reduce` — if set, show a single static frame and skip the timers.

**Links** — external project/social links open normally (consider `target="_blank"
rel="noopener"` for external). `#apps` is an in-page anchor.

**Hover** — all links: color transitions from `#262445` (or `#8a836f` for the muted social
row) to accent `#b04a2c`. Keep it instant/subtle; the prototype uses a plain color change.

## Responsive behavior
Single breakpoint at **max-width: 680px**:
- Wrapper padding → `40px 24px 64px`.
- Hero switches to `flex-direction: column`, `align-items: flex-start`, `gap: 20px`
  (portrait sits above the headline).
- H1 → `font-size: 30px`.
- Portrait → 116×116px.
- Top bar bottom margin → 48px; nav rows wrap.
Everything else (the lists, dotted leaders, footer) already wraps gracefully with flex.

## State management
Effectively none. The only stateful thing is the portrait animation's internal frame index
and timers, local to that one component. No data fetching on the homepage. (Future: the blog
uses Astro **content collections** — filesystem Markdown, no runtime state.)

## Design tokens
Colours:
- `--bg` cream `#f4ecd8` (page background)
- `--ink` `#262445` (primary text, headings, dots-archived alt)
- `--ink-soft` `#33314e` (lead paragraph)
- `--muted` `#57503f` (descriptions)
- `--faint` `#8a836f` (meta, captions, muted social links)
- `--accent` terracotta `#b04a2c` (tags, link hover, eyebrow)
- Status dots: live `#4a8a4a`, paused `#c99a2e`, exited/closed/archived `#a7a08c`
- Hairlines: `rgba(38,36,69,0.16)` (dividers), `rgba(38,36,69,0.26)` (dotted leaders),
  tag border `rgba(176,74,44,0.4)`

Typography:
- Serif: **Newsreader** — H1 40/1.22 wt400 (-0.01em); lead 20/1.62; item name 21 wt500;
  item description 16/1.5.
- Mono: **Space Mono** — section headings 13 wt700 (0.16em, uppercase); nav 14.5; social nav
  12.5; meta 13; byline/footer 13.5; tag 10 (0.08em, uppercase).

Spacing / shape:
- Column max-width 736px; desktop padding 68/40/96.
- Section rhythm: ~50–54px divider margins; item gap 20px; row gap 11px.
- Border-radius: tag pill 4px; status dot 50%.
- No shadows anywhere (flat, paper-like).

## Assets
`/assets/portrait-1.png … portrait-4.png` — four hand-drawn ink self-portraits by the client,
already recoloured so their paper background matches the site cream `#f4ecd8`. Each 1088×976.
- 1, 2, 4 = eyes open (used for the boil loop).
- 3 = eyes closed (used for the blink).
Put them in `public/portraits/`. Source drawings are the client's own artwork.

## Files in this bundle
- `Benevolus.dc.html` — the hi-fi homepage prototype (read as annotated HTML; the `<script>`
  logic class holds the portrait animation timings).
- `assets/portrait-1..4.png` — the portrait frames.
- `README.md` — this document (self-sufficient; implement from this alone).
