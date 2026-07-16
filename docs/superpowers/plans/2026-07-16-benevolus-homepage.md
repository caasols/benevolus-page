# Benevol.us Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the benevol.us homepage design handoff pixel-faithfully as a static Astro site deployable to GitHub Pages.

**Architecture:** One `BaseLayout` holds fonts + design-token CSS custom properties; the homepage composes small components (`TopBar`, `Portrait`, `WorkList`/`WorkItem`, `SiteFooter`) that render from a typed data file (`src/data/work.ts`). The only JS is a vanilla portrait boil/blink script inside `Portrait.astro`.

**Tech Stack:** Astro (minimal template, already scaffolded), TypeScript, `@fontsource/space-mono` + `@fontsource/newsreader`, plain scoped CSS. No test framework — the verification gate for each task is `npx astro build` passing plus visual checks against `docs/design/prototype.html`.

## Global Constraints

- Visual source of truth: `docs/design/handoff.md` (exact hexes, sizes, spacing — copy values verbatim from it).
- No Tailwind, no CSS framework, no client framework/island — only the vanilla portrait script.
- Colours: bg `#f4ecd8`, ink `#262445`, ink-soft `#33314e`, muted `#57503f`, faint `#8a836f`, accent `#b04a2c`; dots live `#4a8a4a`, paused `#c99a2e`, ended `#a7a08c`; hairline `rgba(38,36,69,0.16)`, leader `rgba(38,36,69,0.26)`, tag border `rgba(176,74,44,0.4)`.
- Fonts self-hosted via @fontsource: Space Mono 400/700, Newsreader 400/500.
- Placeholder links: `mailto:hello@benevol.us`, `#` for LinkedIn/Bluesky/Ask/A Traineira/We Love Film; RSS → `/rss.xml`; Writing → `/writing`.
- External links get `target="_blank" rel="noopener"`.
- Single breakpoint `max-width: 680px` per handoff.
- Commit after every task; `npx astro build` must pass before each commit.

---

### Task 1: Fonts, tokens, BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Modify: `package.json` (add @fontsource deps), `astro.config.mjs` (site URL)
- Delete: nothing

**Interfaces:**
- Produces: `BaseLayout.astro` with props `{ title: string; description: string }`, a default `<slot />` inside `<div class="bv-wrap">`, and `:root` CSS custom properties `--bg --ink --ink-soft --muted --faint --accent --dot-live --dot-paused --dot-ended --hairline --leader --tag-border --mono --serif` used by every later task.

- [ ] **Step 1:** `npm install @fontsource/space-mono @fontsource/newsreader` in the project root.
- [ ] **Step 2:** Set `site: 'https://benevol.us'` in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://benevol.us',
});
```

- [ ] **Step 3:** Create `src/layouts/BaseLayout.astro`:

```astro
---
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/500.css';

interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={Astro.site} />
  </head>
  <body>
    <div class="bv-wrap">
      <slot />
    </div>
  </body>
</html>

<style is:global>
  :root {
    --bg: #f4ecd8;
    --ink: #262445;
    --ink-soft: #33314e;
    --muted: #57503f;
    --faint: #8a836f;
    --accent: #b04a2c;
    --dot-live: #4a8a4a;
    --dot-paused: #c99a2e;
    --dot-ended: #a7a08c;
    --hairline: rgba(38, 36, 69, 0.16);
    --leader: rgba(38, 36, 69, 0.26);
    --tag-border: rgba(176, 74, 44, 0.4);
    --mono: 'Space Mono', monospace;
    --serif: 'Newsreader', serif;
  }
  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body { margin: 0; background: var(--bg); color: var(--ink); }
  a { color: var(--ink); }
  a:hover { color: var(--accent); }
  ::selection { background: rgba(38, 36, 69, 0.14); }
  .bv-wrap { max-width: 736px; margin: 0 auto; padding: 68px 40px 96px; }
  @media (max-width: 680px) {
    .bv-wrap { padding: 40px 24px 64px; }
  }
</style>
```

- [ ] **Step 4:** Point `src/pages/index.astro` at the layout (placeholder body for now):

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Benevol.us — a tiny studio, building for good"
  description="No dark patterns. No subscription you can't leave. No lock-in on your own data. Just useful tools, made small and made well."
>
  <h1>Benevol.us</h1>
</BaseLayout>
```

- [ ] **Step 5:** Run `npx astro build`. Expected: `Complete!` with no errors.
- [ ] **Step 6:** Commit: `git add -A && git commit -m "feat: base layout with self-hosted fonts and design tokens"`

---

### Task 2: Work data file

**Files:**
- Create: `src/data/work.ts`

**Interfaces:**
- Produces:

```ts
export type Status = 'live' | 'paused' | 'exited' | 'closed' | 'archived';
export interface WorkItem {
  name: string;
  url: string;          // '#' when unknown
  external: boolean;    // true → target="_blank" rel="noopener"
  tag: string;          // pill text, e.g. 'macOS'
  meta: string;         // right column, e.g. '2026', 'MIT', '2019 · exited'
  status: Status;
  description: string;
}
export const apps: WorkItem[];
export const openSource: WorkItem[];
export const ventures: WorkItem[];
```

- [ ] **Step 1:** Create `src/data/work.ts` with the exact content from the handoff:

```ts
export type Status = 'live' | 'paused' | 'exited' | 'closed' | 'archived';

export interface WorkItem {
  name: string;
  url: string;
  external: boolean;
  tag: string;
  meta: string;
  status: Status;
  description: string;
}

export const apps: WorkItem[] = [
  {
    name: 'Greyout',
    url: 'https://greyout.cc/',
    external: true,
    tag: 'macOS',
    meta: '2026',
    status: 'live',
    description:
      'A menu-bar app that greys out your screen so colour and notifications stop pulling at you. Calm tech, one keypress.',
  },
];

export const openSource: WorkItem[] = [
  {
    name: 'Gememo',
    url: 'https://github.com/caasols/gememo',
    external: true,
    tag: 'chrome',
    meta: '2026',
    status: 'live',
    description:
      'Bot-free Google Meet notes, filed to your own apps the moment you leave. No bot, no audio, no lock-in.',
  },
  {
    name: 'Raycast · YouTube Transcribe',
    url: 'https://github.com/caasols/raycast-youtube-scribe',
    external: true,
    tag: 'raycast',
    meta: 'MIT',
    status: 'live',
    description:
      'Fetch, browse, and export YouTube transcripts with AI summaries — right in your command bar.',
  },
  {
    name: 'Raycast · Público',
    url: 'https://github.com/caasols/raycast-publico',
    external: true,
    tag: 'raycast',
    meta: 'MIT',
    status: 'live',
    description:
      'Read the latest from the Portuguese daily Público without leaving your command bar.',
  },
];

export const ventures: WorkItem[] = [
  {
    name: 'GotJazz',
    url: 'https://waxconn.com',
    external: true,
    tag: 'saas',
    meta: '2019 · exited',
    status: 'exited',
    description: 'Discogs × Shopify for small record shops. Exited to Waxconn.com.',
  },
  {
    name: 'A Traineira',
    url: '#',
    external: false,
    tag: 'vinyl',
    meta: '2016–21',
    status: 'closed',
    description:
      'A vinyl records mail-order service and music label, for people who still drop the needle.',
  },
  {
    name: 'We Love Film',
    url: '#',
    external: false,
    tag: 'shop',
    meta: '2010–16',
    status: 'archived',
    description: 'Analogue photography e-commerce, back when film was “dead.”',
  },
];
```

- [ ] **Step 2:** Run `npx astro build`. Expected: passes (type errors would surface here).
- [ ] **Step 3:** Commit: `git add -A && git commit -m "feat: typed work data (apps, open source, ventures)"`

---

### Task 3: WorkItem + WorkList components

**Files:**
- Create: `src/components/WorkItem.astro`, `src/components/WorkList.astro`

**Interfaces:**
- Consumes: `WorkItem`, `Status` from `src/data/work.ts`.
- Produces: `<WorkList id="apps" heading="Apps" caption="est. · status" items={apps} />` — `caption` optional (omit for Open source); `<WorkItem item={...} />`.

- [ ] **Step 1:** Create `src/components/WorkItem.astro`:

```astro
---
import type { WorkItem } from '../data/work';

interface Props {
  item: WorkItem;
}
const { item } = Astro.props;

const dotColor: Record<WorkItem['status'], string> = {
  live: 'var(--dot-live)',
  paused: 'var(--dot-paused)',
  exited: 'var(--dot-ended)',
  closed: 'var(--dot-ended)',
  archived: 'var(--dot-ended)',
};
---

<div class="item">
  <div class="row">
    <a
      class="name"
      href={item.url}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener' : undefined}
    >{item.name}</a>
    <span class="tag">{item.tag}</span>
    <span class="leader"></span>
    <span class="meta">{item.meta}</span>
    <span class="dot" style={`background: ${dotColor[item.status]}`} title={item.status}></span>
  </div>
  <div class="desc">{item.description}</div>
</div>

<style>
  .row { display: flex; align-items: baseline; gap: 11px; }
  .name {
    font-family: var(--serif);
    font-size: 21px;
    font-weight: 500;
    text-decoration: none;
  }
  .tag {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    border: 1px solid var(--tag-border);
    padding: 1px 6px;
    border-radius: 4px;
  }
  .leader { flex: 1; border-bottom: 1px dotted var(--leader); transform: translateY(-4px); }
  .meta { font-family: var(--mono); font-size: 13px; color: var(--faint); white-space: nowrap; }
  .dot { width: 9px; height: 9px; border-radius: 50%; flex: 0 0 auto; }
  .desc {
    font-family: var(--serif);
    font-size: 16px;
    line-height: 1.5;
    color: var(--muted);
    margin-top: 2px;
  }
  @media (max-width: 680px) {
    .row { flex-wrap: wrap; }
  }
</style>
```

- [ ] **Step 2:** Create `src/components/WorkList.astro`:

```astro
---
import type { WorkItem as WorkItemData } from '../data/work';
import WorkItem from './WorkItem.astro';

interface Props {
  id: string;
  heading: string;
  caption?: string;
  items: WorkItemData[];
}
const { id, heading, caption, items } = Astro.props;
---

<section {id}>
  <div class="head">
    <h2>{heading}</h2>
    {caption && <span class="caption">{caption}</span>}
  </div>
  <div class="items">
    {items.map((item) => <WorkItem {item} />)}
  </div>
</section>

<style>
  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 20px;
    font-family: var(--mono);
  }
  h2 {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin: 0;
  }
  .caption { font-size: 12px; color: var(--faint); }
  .items { display: flex; flex-direction: column; gap: 20px; }
</style>
```

- [ ] **Step 3:** Run `npx astro build`. Expected: passes.
- [ ] **Step 4:** Commit: `git add -A && git commit -m "feat: WorkList and WorkItem components"`

---

### Task 4: TopBar, Portrait (with animation), SiteFooter

**Files:**
- Create: `src/components/TopBar.astro`, `src/components/Portrait.astro`, `src/components/SiteFooter.astro`

**Interfaces:**
- Produces: `<TopBar />`, `<Portrait />` (no props), `<SiteFooter />`.
- Consumes: `public/portraits/portrait-1..4.png` (already in repo).

- [ ] **Step 1:** Create `src/components/TopBar.astro`:

```astro
<div class="topbar">
  <nav class="sections">
    <a class="current" href="/">Studio</a>
    <a href="#apps">Apps</a>
    <a href="/writing">Writing</a>
    <a href="#">Ask</a>
  </nav>
  <nav class="social">
    <a href="mailto:hello@benevol.us">Email</a>
    <a href="https://github.com/caasols" target="_blank" rel="noopener">GitHub</a>
    <a href="#">LinkedIn</a>
    <a href="#">Bluesky</a>
  </nav>
</div>

<style>
  .topbar {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 80px;
    font-family: var(--mono);
  }
  nav { display: flex; }
  a { text-decoration: none; }
  .sections { gap: 30px; font-size: 14.5px; }
  .current { font-weight: 700; }
  .social { gap: 18px; font-size: 12.5px; }
  .social a { color: var(--faint); }
  .social a:hover { color: var(--accent); }
  @media (max-width: 680px) {
    .topbar { margin-bottom: 48px; }
  }
</style>
```

- [ ] **Step 2:** Create `src/components/Portrait.astro`:

```astro
<img
  id="portrait"
  src="/portraits/portrait-1.png"
  alt="Hand-drawn portrait of Sol"
  width="150"
  height="150"
/>

<style>
  img {
    width: 150px;
    height: 150px;
    flex: 0 0 auto;
    object-fit: cover;
    object-position: center 42%;
    display: block;
  }
  @media (max-width: 680px) {
    img { width: 116px; height: 116px; }
  }
</style>

<script>
  const el = document.getElementById('portrait') as HTMLImageElement | null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (el && !reduced) {
    const boilFrames = [
      '/portraits/portrait-1.png',
      '/portraits/portrait-2.png',
      '/portraits/portrait-4.png',
    ];
    const blinkFrame = '/portraits/portrait-3.png';
    [...boilFrames, blinkFrame].forEach((src) => {
      const i = new Image();
      i.src = src;
    });

    let bi = 0;
    setInterval(() => {
      bi = (bi + 1) % boilFrames.length;
      el.src = boilFrames[bi];
    }, 380);

    const scheduleBlink = () => {
      setTimeout(() => {
        el.src = blinkFrame;
        setTimeout(() => {
          el.src = boilFrames[bi];
          scheduleBlink();
        }, 130);
      }, 2600 + Math.random() * 2400);
    };
    scheduleBlink();
  }
</script>
```

(No unmount cleanup needed — the script runs once per full page load; there's no client-side routing.)

- [ ] **Step 3:** Create `src/components/SiteFooter.astro`:

```astro
<footer>
  <span class="label">Find me</span>
  <a href="mailto:hello@benevol.us">Email</a>
  <a href="https://github.com/caasols" target="_blank" rel="noopener">GitHub</a>
  <a href="#">LinkedIn</a>
  <a href="#">Bluesky</a>
  <a href="/rss.xml">RSS</a>
</footer>

<style>
  footer {
    margin-top: 56px;
    padding-top: 28px;
    border-top: 1px solid var(--hairline);
    display: flex;
    align-items: baseline;
    gap: 22px;
    flex-wrap: wrap;
    font-family: var(--mono);
    font-size: 13.5px;
  }
  .label { font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
  a { text-decoration: underline; text-underline-offset: 3px; }
</style>
```

- [ ] **Step 4:** Run `npx astro build`. Expected: passes.
- [ ] **Step 5:** Commit: `git add -A && git commit -m "feat: TopBar, animated Portrait, SiteFooter"`

---

### Task 5: Compose the homepage

**Files:**
- Modify: `src/pages/index.astro` (replace placeholder body)

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1:** Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TopBar from '../components/TopBar.astro';
import Portrait from '../components/Portrait.astro';
import WorkList from '../components/WorkList.astro';
import SiteFooter from '../components/SiteFooter.astro';
import { apps, openSource, ventures } from '../data/work';
---

<BaseLayout
  title="Benevol.us — a tiny studio, building for good"
  description="No dark patterns. No subscription you can't leave. No lock-in on your own data. Just useful tools, made small and made well."
>
  <TopBar />

  <header class="hero">
    <Portrait />
    <h1>Benevol.us is a tiny studio, building for good.</h1>
  </header>

  <p class="lead">
    No dark patterns. No subscription you can’t leave. No lock-in on your own data. Just
    useful tools, made small and made well.
  </p>

  <p class="byline">A studio of one. Made by me, <strong>Sol</strong>.</p>

  <hr />
  <WorkList id="apps" heading="Apps" caption="est. · status" items={apps} />
  <hr />
  <WorkList id="open-source" heading="Open source" items={openSource} />
  <hr />
  <WorkList id="ventures" heading="Ventures" caption="est. · status" items={ventures} />

  <SiteFooter />
</BaseLayout>

<style>
  .hero { display: flex; align-items: center; gap: 28px; margin-bottom: 30px; }
  h1 {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 40px;
    line-height: 1.22;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .lead {
    font-family: var(--serif);
    font-size: 20px;
    line-height: 1.62;
    color: var(--ink-soft);
    max-width: 60ch;
    margin: 0;
  }
  .byline {
    margin: 34px 0 0;
    font-family: var(--mono);
    font-size: 13.5px;
    line-height: 1.7;
    color: var(--muted);
  }
  .byline strong { color: var(--ink); font-weight: 700; }
  hr { border: 0; height: 1px; background: var(--hairline); margin: 50px 0 24px; }
  hr:first-of-type { margin: 54px 0 28px; }
  @media (max-width: 680px) {
    .hero { flex-direction: column; align-items: flex-start; gap: 20px; }
    h1 { font-size: 30px; }
  }
</style>
```

- [ ] **Step 2:** Run `npx astro build`. Expected: passes.
- [ ] **Step 3:** Visual verification (browser): run `npm run dev`, open the page, and compare against `docs/design/prototype.html` opened side by side. Check: cream bg, hero layout, dotted leaders reach the meta column, tag pills, status dot colours, hover → terracotta, footer underlines. Resize below 680px: portrait stacks above H1 at 116px, H1 30px. Watch the portrait boil (wiggles ~3×/s) and blink (every few seconds).
- [ ] **Step 4:** Commit: `git add -A && git commit -m "feat: compose homepage"`

---

### Task 6: GitHub Pages deployment

**Files:**
- Create: `.github/workflows/deploy.yml`, `public/CNAME`

**Interfaces:**
- Consumes: `astro.config.mjs` `site` value from Task 1.

- [ ] **Step 1:** Create `public/CNAME` containing exactly:

```
benevol.us
```

- [ ] **Step 2:** Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3:** Run `npx astro build`. Expected: passes; `dist/CNAME` exists.
- [ ] **Step 4:** Commit: `git add -A && git commit -m "ci: GitHub Pages deploy workflow + CNAME"`

(Repo creation on GitHub, Pages settings, and DNS are manual/user steps — not in this plan.)
