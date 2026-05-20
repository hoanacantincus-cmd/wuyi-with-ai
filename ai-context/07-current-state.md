# Current State

## Date
2026-05-20

## Latest Agent API Update
- User reported WuYi Agent cat often replies with network failure.
- Local code now expands `api/agent.js` fallback routing to include optional Hugging Face Router, GitHub Models, SiliconFlow, Cerebras, and SambaNova providers in addition to the existing OpenRouter, Groq, Gemini, Pollinations, 9Router, and custom provider paths.
- Vercel Production environment already has encrypted `OPENROUTER_API_KEY`, `GROQ_API_KEY`, and `GEMINI_API_KEY` plus their model variables.
- Added encrypted Vercel Production `GITHUB_MODELS_TOKEN`, `GITHUB_MODELS_MODEL`, and `GITHUB_MODELS_MODELS`; a direct GitHub Models smoke test with `openai/gpt-4.1-nano` returned `OK`.
- Live `POST https://wuyi-with-ai.vercel.app/api/agent` still returned HTTP 404 after probing, so the current production issue is not only missing model keys; the Vercel production deployment currently does not expose the API function.
- `npx vercel --prod --yes` and `npx vercel deploy --prod --yes --force` both created `UNKNOWN` production deployments and timed out locally.
- `npx vercel build --prod` fails locally with `spawn cmd.exe ENOENT`, while plain `npm run build` succeeds. Treat this as a local Vercel CLI/Windows build-runner issue until proven otherwise.

## Latest Deployment Update
- Commit `1284062` (`Refine AI visual backgrounds`) was pushed to `origin/main`.
- The visual fix was deployed to Cloudflare Pages production with Wrangler from a clean worktree based on commit `1284062`.
- Cloudflare production URL `https://wuyi-with-ai.pages.dev` returns HTTP 200 and serves `assets/index-Bf3kcRBA.js`.
- Re-authenticated Vercel CLI as `hoanacantincus-9216`.
- Vercel production deployment `dpl_Bq6g9h74FGn3RnHwMTtML4MnP5iE` is READY and aliased to `https://wuyi-with-ai.vercel.app`.
- Vercel production URL `https://wuyi-with-ai.vercel.app` returns HTTP 200 and serves `assets/index-Bf3kcRBA.js`.

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
- Pushed the latest mobile/SEO/static asset changes to GitHub.
- Redeployed the latest build to Vercel and Cloudflare Pages.

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
- node --check api/agent.js
- npm run build
- Mocked provider smoke test for GitHub Models headers/endpoint and Cerebras `max_completion_tokens`
- npx vercel env ls production
- HTTP POST smoke test for https://wuyi-with-ai.vercel.app/api/agent
- npx vercel pull --yes
- npx vercel build --prod
- npx vercel deploy --prod --yes --force
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
- GitHub push of commit `b38bccb`
- Vercel production deploy after mobile/SEO optimization
- Cloudflare Pages deploy after mobile/SEO optimization
- HTTP smoke tests for production home pages, robots.txt, and sitemap.xml

## Verified
- Local `api/agent.js` syntax check passes.
- Local Vite production build succeeds.
- Vercel Production has encrypted OpenRouter, Groq, and Gemini provider keys configured.
- Vercel Production has encrypted GitHub Models token/model variables configured.
- Live production `/api/agent` currently returns HTTP 404.
- Vercel CLI deployment attempts from this Windows session produced `UNKNOWN` deployments rather than a ready production alias.
- Production build succeeds.
- Local dev server renders the page.
- Browser smoke test found key text and no console errors.
- Vercel production URL returns HTTP 200.
- Cloudflare Pages production URL returns HTTP 200.
- Vercel production HTML contains the updated SEO title.
- Cloudflare Pages production HTML contains the updated SEO title.
- Cloudflare Pages robots.txt and sitemap.xml return HTTP 200.
- Build output contains favicon, apple-touch-icon, og-image, robots.txt, and sitemap.xml.
- Build output contains no `.map` files.
- Mobile viewports keep the original high-end AI Core and Orbit visual language, with responsive spacing and scaling.

## Not Yet Verified
- Updated Agent API code is not yet verified on the live production alias.
- Newly added optional providers are not configured with real keys unless added in Vercel.

## Open Risks
- Vercel Production API route is currently not reachable at `/api/agent`, so the Cloudflare-hosted frontend cannot use the Vercel Agent backend.
- Local Vercel CLI deploy/build is unreliable in this Windows session because deploys time out and local Vercel build fails with `spawn cmd.exe ENOENT`.

## Important Evidence
- Cloudflare frontend code routes pages.dev Agent calls to `https://wuyi-with-ai.vercel.app/api/agent`.
- `npx vercel env ls production` shows encrypted `OPENROUTER_API_KEY`, `GROQ_API_KEY`, and `GEMINI_API_KEY`.
- `POST https://wuyi-with-ai.vercel.app/api/agent` returned HTTP 404 on 2026-05-20.
- Vite React build output directory is `dist`.
- Cloudflare Pages React Vite preset uses `npm run build` and `dist`.
- Vercel Vite deployment uses the Vite framework preset, `npm run build`, and `dist`.
- Vercel production alias is https://wuyi-with-ai.vercel.app.
- Cloudflare Pages production URL is https://wuyi-with-ai.pages.dev.
- GitHub repository is https://github.com/hoanacantincus-cmd/wuyi-with-ai.
- Canonical sitemap host is https://wuyi-with-ai.pages.dev/.

## Next Smallest Step
- Deploy the current branch through GitHub/Vercel Dashboard or fix the local Vercel CLI runner, then verify `POST https://wuyi-with-ai.vercel.app/api/agent` returns JSON instead of 404.
