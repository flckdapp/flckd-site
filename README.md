# You're Flocked website

The app's marketing site, built with **Astro + Bun**. Astro uses Vite for fast local reloads and produces static files for Cloudflare Pages. No React runtime, database, or server adapter is needed for these pages.

## Run locally

```sh
bun install
bun run dev
```

Open http://localhost:4321. Edit an Astro page or stylesheet and Vite reloads it.

```sh
bun run check
bun run build
bun run preview
```

## Where to edit

- `src/pages/index.astro`: landing-page copy and sections.
- `src/pages/hosting.astro`: approachable self-hosting guide.
- `src/pages/privacy.astro`: plain-English privacy page; the app repo's `PRIVACY.md` stays the source of truth.
- `src/pages/press.astro`: press kit and downloads.
- `src/data/site.ts`: shared project links and app download CTA.
- `src/styles/`: global tokens, homepage styling, information-page styling.
- `src/layouts/SiteLayout.astro`: navigation, footer, page metadata.
- `public/press/`: original PNGs and the fact sheet (source of truth for all site imagery; the ZIP is generated).
- `public/downloads/compose.yml`: downloadable server configuration.
- `PRODUCT.md` / `DESIGN.md`: content facts and visual direction.

Design sources (Butterkit project, App Store exports, raw screenshots) live in the sibling `flckd-design` folder, not here. `public/press/` holds the original PNGs and is the source of truth for imagery; the WebP variants in `public/images/` and the press ZIP are generated from it on every `dev` and `build` by `scripts/prepare-assets.mjs`, and are not committed.

## Cloudflare Pages

Use the standard Git-connected Pages deployment:

- Build command: `bun run build`
- Build output directory: `dist`
- Runtime: Node 22.12+ (set `NODE_VERSION=22` on Pages)
- Package manager: Bun, with committed `bun.lock` (set `BUN_VERSION=1.3.11`)
- Set `SITE_URL=https://flckd.app` or your final production origin.

Alternatively, after building, use `bunx wrangler pages deploy dist` and select/create the Pages project when prompted. No Cloudflare Astro adapter is needed: this is a fully static site, not server-rendered Astro. `_headers` and `404.html` are included in the output for Pages.

The marketing site and `tiles.flckd.app` are independent deployments. This site links to the existing tile catalog and documents its builder; it does not replace the tile server, proxy binary downloads, or expose its control UI.

## Launch settings

Copy `.env.example` to `.env` for local settings, or configure the same variables in Pages.

- `SITE_URL`: canonical and social-sharing origin. The layout uses `https://flckd.app` if unset.
- `PUBLIC_APP_STORE_URL`: optional `https://apps.apple.com/...` URL for when the app ships on the App Store. While it is empty the site is in beta mode: the iPhone CTA links to the TestFlight beta in `src/data/site.ts` and the copy says so.

There was no public press email in the source material, so contact links point to the Q&A category of GitHub Discussions on the app repo. Replace them with your preferred public address when ready. Do not publish private commit-author metadata as contact information.

## Update press assets

Drop the new 1320 × 2868 PNG into `public/press/` (add a line to `scripts/prepare-assets.mjs` if it is a new image), update `flckd-fact-sheet.txt` if needed, and commit. The next build regenerates the WebP variants and the ZIP; `bun run assets:prepare` does the same on demand.

Before publishing, confirm the store link (if available), public contact details and current product facts. Camera contributions are currently stored locally in the app, not synced to OpenStreetMap, so the site deliberately does not claim direct map submissions.

## Check the site

With `bun run build && bun run preview --port 4322` running in another terminal:

```sh
bun run qa:verify       # 375/768/1280 screenshots, axe, overflow, downloads, clipboard, keyboard, no-JS
bun run qa:lighthouse   # mobile + desktop Lighthouse for /, /hosting/, /press/
```

Results land in the gitignored `.qa/` folder. Both need Google Chrome installed.

## Check the site

With `bun run build` done and `bun run preview --port 4322` running in another terminal:

```sh
bun run qa:verify       # every page at 375/768/1280, axe, overflow, images, clicks, copy, downloads, keyboard, no-JS
bun run qa:lighthouse   # mobile and desktop Lighthouse for /, /hosting/, /press/ in real Chrome
```

Both write screenshots and JSON reports to the gitignored `.qa/` folder. Home scores 99 on performance because the first-viewport phone screenshot is the largest paint on a simulated Fast 3G connection; everything else is 100.

## Check the site

With `bun run preview --port 4322` running against a fresh `bun run build`:

```sh
bun run qa:verify       # 375/768/1280 screenshots, axe, overflow, downloads, clipboard, keyboard, no-JS
bun run qa:lighthouse   # mobile + desktop Lighthouse for /, /hosting/, /press/
```

Both write their evidence to the gitignored `.qa/` folder. Home scores 99 on performance in Lighthouse's simulated Fast-3G profile because its largest paint is a hero screenshot; the other pages score 100 across the board.

## Check the site

With `bun run preview --port 4322` running against a fresh `bun run build`:

```sh
bun run qa:verify      # 375/768/1280 screenshots, axe, overflow, downloads, copy, keyboard, no-JS
bun run qa:lighthouse  # mobile + desktop Lighthouse for /, /hosting/, /press/ via real Chrome
```

Results land in the gitignored `.qa/` folder. Last run: every route 100/100/100/100 except the homepage at 99 performance on the simulated Fast-3G profile, where the LCP is the hero screenshot.
