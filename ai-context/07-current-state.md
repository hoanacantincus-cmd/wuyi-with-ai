# Current State

## Date
2026-05-12

## Branch
- branch: main

## User Goal
- Publish the personal website to GitHub, Cloudflare Pages for domestic access, and Vercel for international access.
- README should include domestic and international URLs plus the technology stack.

## What Changed
- Converted the ChatGPT Canvas React code into a local Vite React project.
- Added README, Git ignore rules, Vercel config, Cloudflare Pages Wrangler config, and project agent handoff rules.
- Deployed the Vercel production site.
- Created and deployed the Cloudflare Pages production site.
- Created and pushed the GitHub repository.
- Reverted the lightweight mobile replacement path and restored the original high-end AI Core and Orbit scenes on mobile.
- Added mobile-only spacing and scaled wrappers so the original scenes remain viewable below `lg`.
- Added post-render hash scrolling so direct section links such as `/#radar` land on the intended React-rendered section.
- Set global root backgrounds to deep black to prevent white edges during mobile hash navigation or screenshots.
- Added favicon, Apple touch icon, OG image, robots.txt, sitemap.xml, SEO metadata, Twitter/Open Graph metadata, and Person JSON-LD.
- Explicitly disabled production sourcemaps in Vite.

## Changed Files
- README.md
- AGENTS.md
- ai-context/07-current-state.md
- package.json
- vercel.json
- wrangler.toml
- .gitignore
- src/App.jsx
- src/main.jsx
- src/styles.css
- index.html
- tailwind.config.js
- postcss.config.js
- vite.config.js
- public/favicon.svg
- public/favicon.ico
- public/apple-touch-icon.png
- public/og-image.png
- public/robots.txt
- public/sitemap.xml
- src/styles.css

## Validation Run
- npm install
- npm run build
- Browser smoke test at http://127.0.0.1:5173/
- Vercel production deploy
- HTTP smoke test for https://wuyi-with-ai.vercel.app
- Cloudflare Pages production deploy
- HTTP smoke test for https://wuyi-with-ai.pages.dev
- npm run build after mobile/SEO optimization
- dist source map check
- dist static asset check
- Browser DOM checks for 375px, 390px, 430px, 768px, and 1280px
- Playwright screenshots with Microsoft Edge for 375px, 390px, 430px, 768px, and 1280px

## Verified
- Production build succeeds.
- Local dev server renders the page.
- Browser smoke test found key text and no console errors.
- Vercel production URL returns HTTP 200.
- Cloudflare Pages production URL returns HTTP 200.
- Build output contains favicon, apple-touch-icon, og-image, robots.txt, and sitemap.xml.
- Build output contains no `.map` files.
- Mobile viewports keep the original high-end AI Core and Orbit visual language, with responsive spacing and scaling.

## Not Yet Verified
- None.

## Open Risks
- No open local validation blockers.

## Important Evidence
- Vite React build output directory is `dist`.
- Cloudflare Pages React Vite preset uses `npm run build` and `dist`.
- Vercel Vite deployment uses the Vite framework preset, `npm run build`, and `dist`.
- Vercel production alias is https://wuyi-with-ai.vercel.app.
- Cloudflare Pages production URL is https://wuyi-with-ai.pages.dev.
- GitHub repository is https://github.com/hoanacantincus-cmd/wuyi-with-ai.
- Canonical sitemap host is https://wuyi-with-ai.pages.dev/.

## Next Smallest Step
- Redeploy to Cloudflare Pages and Vercel, then verify production URLs.
