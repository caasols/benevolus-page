# benevol.us

The website of **Benevol.us** — a tiny software studio run by Sol, building for good.
From the Latin *bene + volus*, "wishing well": software that serves people, not subscriptions.

**Live at [benevol.us](https://benevol.us)** — deployed to GitHub Pages on every push to `main`.

## Stack

- [Astro](https://astro.build) + TypeScript, plain scoped CSS (no framework)
- Self-hosted fonts via [@fontsource](https://fontsource.org) (Space Mono + Newsreader)
- The only client-side JS is the hand-drawn portrait's boil/blink animation (~25 lines, vanilla)

## Development

```sh
npm install
npm run dev       # local dev server at localhost:4321
npm run build     # production build to ./dist/
```

## Where things live

| Path | Purpose |
| :--- | :--- |
| `src/pages/index.astro` | The homepage |
| `src/data/work.ts` | Portfolio content (apps, open source, ventures) — edit here to update the lists |
| `src/components/` | `TopBar`, `Portrait`, `WorkList`/`WorkItem`, `SiteFooter` |
| `src/layouts/BaseLayout.astro` | Fonts, design tokens, global styles |
| `public/portraits/` | The four ink portrait frames (boil + blink) |
| `docs/design/` | Original design handoff + hi-fi prototype |
| `docs/superpowers/` | Design spec and implementation plan |

## Deployment

`.github/workflows/deploy.yml` builds with Node 22 and publishes to GitHub Pages.
Custom domain `benevol.us` is set via `public/CNAME` + the repo's Pages settings.
