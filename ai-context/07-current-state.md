# Current State

## Date
2026-06-13

## Latest Content Restructure Update
- Date: 2026-06-13
- Reworked the post-hero homepage into the requested six content areas only:
  `AI 学习路径`, `大模型评测`, `AI 编程智能体评测`, `方法与案例`,
  `AI Orbit Radar`, and the closing contact section.
- Removed the independent `Capability Matrix` and `Selected Systems` rendered
  sections. Their useful system tags are folded into the method/case story area.
- `AI 学习路径` now pairs the restored `AICoreScene` planet/formula visual with
  a short six-step roadmap and the new cinematic image
  `public/media/ai-learning-path-cinematic.png`.
- `大模型评测` is table-first, with model comparison, task selection, and source
  snapshot tables. The source snapshot is static and should not be presented as
  a live ranking.
- `AI 编程智能体评测` now combines coding tool review and Agent capability review
  with tables plus `public/media/ai-agent-workbench-cinematic.png`.
- `方法与案例` now uses a cinematic system-map panel at
  `public/media/ai-method-system-map-cinematic.png`, the five-step build story,
  and three merged case tags from automation, product interface, and data
  intelligence.
- Updated visible brand and SEO metadata from `AI边池派` to `AI伍子胥`, including
  `index.html`, share title, footer brand, and the page title.
- Removed the `window.prompt()` share fallback that caused an in-app browser
  console error; share now uses native share or Clipboard API and otherwise
  reports copy failure without opening a prompt.
- Local validation: `npm run build` succeeds. Browser checks at
  `http://127.0.0.1:5173/` confirmed the six target sections, five tables,
  `AICoreScene` canvas inside `#ai-roadmap`, all three cinematic images loading,
  no `AI边池派` text in the page body, no `prompt()` console error, and 390px
  mobile table wrappers using horizontal scroll with no detected text overflow.
- Follow-up layout adjustment: removed the dark learning-path image from below
  the `AICoreScene` planet/formula visual, generated a new light-background
  path asset at `public/media/ai-learning-path-light.png`, and moved that visual
  into the `方法与案例` area.
- Follow-up content adjustment: replaced the learning-path right-side timeline
  with `AI 编程基础`, `大模型评测`, `AI 编程智能体评测`, `Agent开发`,
  `自动化与产品化`, and `AI Orbit Radar`. Removed the `How I Build With AI`
  heading and added dedicated `AI 编程基础` plus `Agent开发` practice panels.
- Follow-up validation: `npm run build` succeeds. Browser checks confirmed the
  new six timeline items, old `AI 认知入口` and `RAG 与知识库` roadmap items are
  absent, `How I Build With AI` is absent, the light path image loads in the new
  story position, and 390px mobile layout has no detected text overflow.
- Follow-up on 2026-06-13: aligned the hero module grid with the actual page
  anchors: `AI 学习路径`, `AI 编程基础`, `大模型评测`, `AI 编程智能体评测`,
  `Agent开发与产品化`, and `AI Orbit Radar`.
- Added a standalone `#ai-coding-basics` section between the roadmap and model
  benchmark. Added standalone `#agent-product` for `Agent开发、自动化与产品化`.
- Removed the visible `方法与案例` section from navigation and page flow; the
  old story block is hidden and no longer appears in rendered body text.
- Reworked `大模型评测` and `AI 编程智能体评测` away from table-only layouts into
  animated authority signal cards, task-routing bars, and coding-agent ability
  bars. The page links to live authority sources and labels the local data as
  a current snapshot rather than pretending to scrape the dynamic leaderboards.
- Authority sources checked for this snapshot: Arena leaderboard, Artificial
  Analysis models leaderboard, and Aider LLM leaderboards. Snapshot date is
  `2026-06-13`.
- Changed contact CTA text from `电话：15527138700` to `微信：15527138700`.
- Validation: `npm run build` succeeds. Browser checks confirmed all new
  anchors exist, hero module links point to them, `方法与案例` is no longer
  visible, `微信：15527138700` is present, model live-source links render, and
  390px mobile layout has no detected text overflow.
- Follow-up on 2026-06-13: fixed share behavior by adding an in-page share
  panel that always displays `https://wuyi-with-ai.pages.dev/`. Desktop tries
  Clipboard API and falls back to visible manual copy; mobile first attempts
  the native share sheet so WeChat can appear when the device/browser supports
  it.
- Rebuilt `AI 编程基础` for Chinese beginners with six clickable topic cards:
  Doubao/DeepSeek/ChatGPT differences, no-VPN domestic AI coding path, domestic
  coding tools such as Trae/通义灵码/MarsCode, task-first tools such as Coze/
  Lovart/Dify, terminal agents such as Claude Code/Codex, and route selection.
  Clicking a card jumps to `#ai-coding-detail` and swaps in a detailed panel
  with action steps and external links.
- Re-styled `大模型评测` and `AI 编程智能体评测` into softer, more rounded visual
  cards with animated score bars, large score bubbles, pastel glows, and a more
  playful graph-system feel while keeping authority-source links and snapshot
  labeling.
- Validation: `npm run build` succeeds. Browser checks confirmed the share panel
  shows the URL, beginner cards and detail panel work, model/coding graph text
  renders, and 390px mobile layout has no detected text overflow.

## Latest Scroll Video Hero and Analytics Update
- Date: 2026-06-12
- Replaced the original first-screen hero with a scroll-driven video hero using
  `public/media/ai-roadmap-hero.mp4`, copied from the user-provided
  `C:\Users\Administrator\Desktop\6月12日.mp4`.
- Added a new AI learning/benchmark section after the hero:
  AI learning path, model benchmark snapshot, and objective AI coding tool
  review.
- Model benchmark v1 uses static snapshot data with source links to Arena,
  Artificial Analysis, and Aider LLM Leaderboards. It does not auto-refresh.
- Added anonymous analytics client tracking for page views, hero progress,
  section views, and CTA clicks.
- Added `api/analytics.js` for Vercel Serverless analytics ingestion and
  summary reads. It uses Upstash Redis REST when configured, validates allowed
  origins, rejects bad methods/content types/events, and never stores raw IPs.
- Added `/admin-analytics` hidden React page for password-protected analytics
  summary viewing.
- Added `.env.example` analytics variables:
  `VITE_ANALYTICS_API_URL`, `ANALYTICS_ALLOWED_ORIGINS`,
  `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`,
  `ANALYTICS_ADMIN_PASSWORD`, and `ANALYTICS_SALT`.
- Added `public/_redirects` so Cloudflare Pages can serve SPA routes such as
  `/admin-analytics`.
- Local validation passed: production build succeeded, homepage DOM contains
  the scroll-video hero and new sections, video metadata loaded in browser,
  `/admin-analytics` rendered its password form, and mocked analytics API smoke
  tests returned 204 for valid POST, 400 for unknown event, 403 for bad Origin,
  401 for missing admin auth, and 200 configured=false when Redis vars are not
  present.
- Browser automation could not move the page scroll position in the in-app
  browser despite the document having normal scroll height and no root overflow
  lock; manual scroll behavior should be checked before deployment.
- The bundled `ffmpeg/ffprobe` WinGet links failed to execute, so the original
  61.5 MB video is currently used. Compress to 1080p/30fps plus a smaller mobile
  variant before production deployment if performance is a priority.
- Follow-up on 2026-06-12: located the real WinGet FFmpeg target and compressed
  the hero video to 1920x1080, 30fps, no audio, faststart H.264. The active
  website file is now `public/media/ai-roadmap-hero.mp4` at about 7.4 MB, with
  the original kept as `public/media/ai-roadmap-hero-original.mp4`.
- Local preview server was started on `http://127.0.0.1:5173/`; browser DOM
  validation confirmed the compressed video loads as 1920x1080 with duration
  about 12.43 seconds and `readyState` 4.
- Follow-up visual adjustment: made the hero video the primary opening visual
  instead of a dim background layer. The video is now visible by default,
  muted/autoplay/loop/preload auto, uses a real extracted poster frame at
  `public/media/ai-roadmap-hero-poster.jpg`, and the text is reduced into a
  lighter bottom-left overlay.
- Follow-up scroll-scrub adjustment: changed the hero video back to paused,
  non-autoplay, non-loop playback. Mouse/page scrolling now drives video
  `currentTime` through both Framer scroll progress and a native scroll listener
  fallback, so the video rhythm follows scroll movement instead of playing by
  itself.
- Follow-up smoothness adjustment: re-encoded the original user video into a
  scroll-scrub optimized active asset: `public/media/ai-roadmap-hero.mp4` is
  now 1920x1080, 60fps, H.264, about 12.43 seconds and 20.4 MB, with dense
  keyframes (`-g 6`) for smoother seek-on-scroll behavior. The previous 30fps
  compressed version is kept as `public/media/ai-roadmap-hero-1080p30.mp4`, and
  the original 4K source copy is kept as `public/media/ai-roadmap-hero-original.mp4`.
- Deployment is not complete. Before deploying, configure Vercel env vars for
  Upstash Redis and analytics admin password/salt, then use the known ASCII
  worktree Vercel deploy workaround if the Chinese-path workspace times out.

## Latest Security Hardening Update
- Date: 2026-06-04
- Added production security headers for Vercel and Cloudflare Pages:
  CSP with `frame-ancestors 'none'`, HSTS, `nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy`, and `Cross-Origin-Opener-Policy`.
- Added `public/_headers` so Cloudflare Pages will publish the same static
  security headers after the next successful Pages deployment.
- Hardened `api/agent.js`: production requests without an allowed Origin are
  blocked, non-JSON POSTs are rejected, JSON request bodies are capped at 16KB,
  API responses are `no-store`, JSON parse/body-size failures return 400/413,
  image generation has a stricter per-IP limit of 1 request/minute and
  3 requests/15 minutes, and upstream failure details are no longer exposed.
- Local validation passed: `node --check api/agent.js`, `npm run build`, no
  sourcemaps in `dist`, `dist/_headers` exists, Vercel JSON parses, CSP hash
  matches built `dist/index.html`, and mock API requests returned expected
  403/204/415/413/429 statuses.
- Vercel production deployment succeeded from ASCII temp directory
  `C:\Users\Administrator\Desktop\wuyi-security-deploy-temp\20260604173616`;
  deployment `https://wuyi-with-dsnob78qg-wuyi.vercel.app` was aliased to
  `https://wuyi-with-ai.vercel.app`.
- Vercel live smoke test passed: homepage returns HTTP 200 with CSP, HSTS, and
  `X-Frame-Options: DENY`; `/api/agent` blocks bad Origin with 403, no Origin
  with 403, oversized JSON with 413, and allows Cloudflare Pages preflight with
  HTTP 204.
- Cloudflare Pages deployment initially failed because the default Wrangler
  OAuth callback timed out. Login succeeded with `npx wrangler login
  --callback-host 127.0.0.1`, then `npx wrangler pages deploy dist
  --project-name wuyi-with-ai` completed and produced preview URL
  `https://326ce499.wuyi-with-ai.pages.dev`.
- Cloudflare live smoke test passed for both `https://wuyi-with-ai.pages.dev`
  and `https://326ce499.wuyi-with-ai.pages.dev`: HTTP 200 with CSP, HSTS,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and
  `Cross-Origin-Opener-Policy: same-origin`.

## Latest Agent API Update
- Diagnosed user-visible "链路响应超时" reports after the image/model update.
  Reproduction with a 30s frontend-style abort showed image generation took
  about 29.1s and project diagnosis aborted at 30s, while the backend completed
  project diagnosis in about 49s.
- Root cause: Vercel `ARK_MODELS` tried slower Ark models before
  `deepseek-v3-2-251201`; the first two provider attempts could consume about
  36s before the successful model ran, exceeding the frontend's fixed 30s
  timeout.
- Reordered Ark text fallback to
  `deepseek-v3-2-251201,glm-4-7-251222,doubao-seed-2-0-pro-260215,...` in code,
  `.env.example`, `.env.local`, and Vercel Production.
- Changed frontend Agent timeouts from one fixed 30s value to 75s for text and
  140s for image generation.
- Vercel deployment `dpl_HAYkVHrc6UV4cnKnFYxnGk7Kt1hN` is READY and aliased to
  `https://wuyi-with-ai.vercel.app`.
- Cloudflare Pages deployment completed at
  `https://cf799bce.wuyi-with-ai.pages.dev`; `https://wuyi-with-ai.pages.dev`
  serves the new `assets/index-CVURdcha.js`.
- Regression with the old 30s abort threshold now passes: project diagnosis
  returned HTTP 200 in about 17.2s and image generation returned HTTP 200 in
  about 22.8s.
- Added more Ark text model fallbacks to `api/agent.js` and Vercel Production:
  `doubao-seed-2-0-pro-260215`, `glm-4-7-251222`,
  `deepseek-v3-2-251201`, `doubao-1-5-vision-pro-32k-250115`,
  `kimi-k2-250905`, and `kimi-k2-thinking-251104`.
- Live smoke tests confirmed `doubao-seed-2-0-pro-260215`,
  `glm-4-7-251222`, and `deepseek-v3-2-251201` work via
  `/api/v3/chat/completions`; the tested Kimi and Doubao-1.5 Vision IDs still
  return `ModelNotOpen`/404 in this account, so they remain late fallbacks.
- Added Agent `image_generation` intent, frontend "AI 生图" mode, generated
  image rendering, and Ark image generation routing through
  `/api/v3/images/generations`.
- Added per-IP in-process rate limiting for Agent POST requests: 5 requests per
  1 minute and 15 requests per 15 minutes.
- Vercel Production now has encrypted `ARK_MODELS`, `ARK_IMAGE_MODEL`, and
  `ARK_IMAGE_SIZE` in addition to the existing Ark key/base/model variables.
- Vercel deployment `dpl_CWVscWqfParhBsozDDwiMnpAD1ee` is READY and aliased to
  `https://wuyi-with-ai.vercel.app`.
- Cloudflare Pages deployment completed and both
  `https://wuyi-with-ai.pages.dev` and preview
  `https://2273879d.wuyi-with-ai.pages.dev` serve the new Vite asset
  `assets/index-PoJ8qhL2.js`.
- Live production text Agent smoke test returned HTTP 200 after this deploy.
- Live production image-generation smoke test reaches the new code path but
  returns HTTP 502 because the Ark account has not activated the Seedream model
  `doubao-seedream-4-5-251128`.
- Follow-up Ark image smoke tests confirmed `doubao-seedream-5-0-260128` and
  `doubao-seedream-4-0-250828` can generate images; `doubao-seedream-4-5-251128`
  still returns `ModelNotOpen`.
- Added encrypted Vercel Production `ARK_IMAGE_MODELS` with
  `doubao-seedream-5-0-260128,doubao-seedream-4-0-250828,doubao-seedream-4-5-251128`.
- Vercel deployment `dpl_EjHrkhX493WSxPKcS3WGTzGp6GaQ` is READY and aliased to
  `https://wuyi-with-ai.vercel.app`.
- Live production image-generation smoke test now returns HTTP 200 with a
  Seedream 5.0 image URL.
- Added Volcengine Ark provider support to `api/agent.js`. When `ARK_API_KEY`,
  `VOLCENGINE_ARK_API_KEY`, or `VOLCENGINE_API_KEY` is configured, the agent now
  tries Volcengine Ark before the older fallback providers.
- The user-provided Ark key was live-tested against
  `https://ark.cn-beijing.volces.com/api/v3/chat/completions` with model
  `deepseek-v3-2-251201`; the request succeeded.
- Default Volcengine Ark base URL is now the standard Ark endpoint
  `https://ark.cn-beijing.volces.com/api/v3`, and the default model is
  `deepseek-v3-2-251201`, matching the tested DeepSeek-V3.2 free resource.
- Coding Plan remains supported by explicitly setting
  `ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/coding/v3` and Coding
  Plan model names such as `ark-code-latest`.
- `.env.example` documents the Volcengine Ark/Coding Plan variables.
- Local `.env.local` now contains the Ark key/base/model values; `.env.local`
  is ignored by git.
- Added encrypted Vercel Production env vars `ARK_API_KEY`, `ARK_BASE_URL`, and
  `ARK_MODEL`.
- A direct deploy from the Chinese-path workspace timed out and produced an
  `UNKNOWN` deployment, so the verified deployment was made from an ASCII temp
  directory `C:\Users\Administrator\Desktop\wuyi-ark-deploy-temp\20260522103359`.
- Vercel deployment `dpl_FKPMDJfZQy6wctPeXH4z62WbSZW2` is READY and aliased to
  `https://wuyi-with-ai.vercel.app`.
- User reported WuYi Agent cat often replies with network failure.
- Local code now expands `api/agent.js` fallback routing to include optional Hugging Face Router, GitHub Models, SiliconFlow, Cerebras, and SambaNova providers in addition to the existing OpenRouter, Groq, Gemini, Pollinations, 9Router, and custom provider paths.
- Vercel Production environment already has encrypted `OPENROUTER_API_KEY`, `GROQ_API_KEY`, and `GEMINI_API_KEY` plus their model variables.
- Added encrypted Vercel Production `GITHUB_MODELS_TOKEN`, `GITHUB_MODELS_MODEL`, and `GITHUB_MODELS_MODELS`; a direct GitHub Models smoke test with `openai/gpt-4.1-nano` returned `OK`.
- Live `POST https://wuyi-with-ai.vercel.app/api/agent` initially returned HTTP 404 because the Vercel production deployment did not expose the API function.
- `npx vercel --prod --yes` and `npx vercel deploy --prod --yes --force` from the Chinese-path workspace both created `UNKNOWN` production deployments and timed out locally.
- `npx vercel build --prod` in the Chinese-path workspace failed locally with `spawn cmd.exe ENOENT`, while plain `npm run build` succeeded. Deploying from an ASCII-path temporary worktree avoided this issue.
- Deployed commit `07cecc1` from `C:\Users\Administrator\Desktop\wuyi-deploy-temp`; Vercel deployment `dpl_ECrq58KC4e7tCq48WxVycrcS6Ddn` is READY and aliased to `https://wuyi-with-ai.vercel.app`.

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
- Timed production reproduction using a 30s AbortController:
  image-generation HTTP 200 in about 29.1s, project diagnosis AbortError at 30s
  before the fix
- Timed production no-abort project diagnosis check: HTTP 200 in about 49.0s
  before the fix
- Direct timed Ark model checks for `doubao-seed-2-0-pro-260215`,
  `glm-4-7-251222`, and `deepseek-v3-2-251201`
- `node --check api/agent.js` after reordering Ark models
- `npm run build` after adding mode-specific frontend timeouts
- `npx vercel env rm ARK_MODELS production --yes`, then `vercel env add`
  with the reordered model list
- `npx vercel deploy --prod --yes` from
  `C:\Users\Administrator\Desktop\wuyi-ark-deploy-temp\20260522111447`
- `npx wrangler pages deploy dist --project-name wuyi-with-ai`
- Timed production regression with the old 30s abort threshold: project
  diagnosis HTTP 200 in about 17.2s and image generation HTTP 200 in about 22.8s
- HTTP smoke tests confirming Cloudflare/Vercel serve `assets/index-CVURdcha.js`
- Live Ark smoke tests for `doubao-seed-2-0-pro-260215`,
  `glm-4-7-251222`, `deepseek-v3-2-251201`,
  `doubao-1-5-vision-pro-32k-250115`, `kimi-k2-250905`, and
  `kimi-k2-thinking-251104`
- Live Ark Seedream smoke tests for `doubao-seedream-4-5-251128` and
  `doubao-seedream-4-0-250828`
- `node --check api/agent.js` with the known local Node.js binary after adding
  multi-model, image-generation, and rate-limit code
- `npm run build` with the known local npm binary after adding the Agent UI mode
- Local Node handler smoke test confirming the 6th request from one IP returns
  HTTP 429 after 5 requests inside 1 minute
- `npx vercel env ls production` after adding the Ark model/image env vars
- `npx vercel deploy --prod --yes` from
  `C:\Users\Administrator\Desktop\wuyi-ark-deploy-temp\20260522105315`
- Live `POST https://wuyi-with-ai.vercel.app/api/agent` text smoke test after
  deployment
- Live `POST https://wuyi-with-ai.vercel.app/api/agent` image-generation smoke
  test after deployment
- Live Ark image smoke tests for `doubao-seedream-5-0-260128`,
  `doubao-seedream-5-0-lite`, and `doubao-seedream-4-0-250828`
- Live Ark Vision smoke test with an inline image for
  `doubao-1-5-vision-pro-32k-250115` and `doubao-1.5-vision-pro-250328`
- `npx vercel deploy --prod --yes` from
  `C:\Users\Administrator\Desktop\wuyi-ark-deploy-temp\20260522110240`
- Live production image-generation smoke test returning HTTP 200 with a
  generated image URL after adding `ARK_IMAGE_MODELS`
- `npx wrangler pages deploy dist --project-name wuyi-with-ai`
- HTTP smoke tests for `https://wuyi-with-ai.pages.dev`,
  `https://2273879d.wuyi-with-ai.pages.dev`, and
  `https://wuyi-with-ai.vercel.app`
- `node --check api/agent.js` with the known local Node.js binary
- `npm run build` with the known local npm binary
- One-time live Ark smoke test against `/api/v3/chat/completions` using
  `deepseek-v3-2-251201`
- `npx vercel env ls production`
- `npx vercel deploy --prod --yes` from an ASCII temp deployment directory
- Live `POST https://wuyi-with-ai.vercel.app/api/agent` with Origin
  `https://wuyi-with-ai.pages.dev`
- node --check api/agent.js
- npm run build
- Mocked provider smoke test for GitHub Models headers/endpoint and Cerebras `max_completion_tokens`
- npx vercel env ls production
- HTTP POST smoke test for https://wuyi-with-ai.vercel.app/api/agent
- npx vercel pull --yes
- npx vercel build --prod
- npx vercel deploy --prod --yes --force
- npx vercel deploy --prod --yes from ASCII temp worktree
- HTTP POST smoke test for https://wuyi-with-ai.vercel.app/api/agent after deploy
- CORS OPTIONS smoke test from Origin https://wuyi-with-ai.pages.dev
- npx vercel inspect https://wuyi-with-ai.vercel.app
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
- 2026-06-12 local hero update: `ScrollVideoHero` now uses `AI伍子胥`,
  removes the right-side "滚动控制视频进度" text, shows seven clickable module
  entries, and animates the active hero copy in from above as scroll-controlled
  video progress changes.
- Local `npm run build` succeeds after the latest scroll-video hero changes.
- In-app browser at `http://127.0.0.1:5173/` confirms `AI伍子胥` is present,
  "滚动控制视频进度" is absent, the seven hero module links are present, and
  the scrub video remains paused/non-autoplay with scroll-controlled progress.
- 2026-06-12 local AI pet update: generated
  `public/media/ai-pet-cat-avatar.jpg` from the scroll-video poster and
  replaced the hand-drawn SVG pet face with the video cat avatar while keeping
  pet drag/click behavior. Local build succeeds and the in-app browser confirms
  the avatar image loads at 512x512.
- 2026-06-12 local AI pet warrior update: generated
  `public/media/ai-pet-cat-warrior.png` from the user-provided clear cat-warrior
  screenshot as a transparent character asset, replaced the boxed avatar with a
  floating full-body pet, added mouse-following pupil layers, and added random
  30s-300s idle tricks (`flip`, `dance`, `pose`). Local build succeeds; browser
  verification confirms the PNG loads, the pet is present, and both eye layers
  move after pointer movement.
- 2026-06-12 AI pet eye correction: removed the extra black-dot pupil overlays
  and replaced them with small clipped windows of the original cat image so the
  visible eye movement comes from the source artwork itself. Increased the pet
  button/character display area to reduce clipping. Local build succeeds; browser
  verification confirms zero black-dot eye overlays and moving image-based eye
  masks.
- 2026-06-12 AI pet eye correction follow-up: removed the image-window eye masks
  too because they still looked like a moving patch instead of natural eye
  motion. The pet now uses only the original cat artwork eyes, with zero
  `[data-pet-eye]` overlays. Random idle tricks remain enabled.
- User-visible timeout symptom was reproduced and fixed by reordering text
  model fallback plus increasing frontend timeouts by mode.
- The exact project-diagnosis prompt from the screenshot class now returns
  before 30s in production.
- Image generation returns before 30s in the latest production smoke test, and
  the frontend now waits up to 140s for slower image jobs.
- Ark text model fallback now includes the newly requested model IDs, with
  Doubao-Seed-2.0-pro and GLM-4.7 verified live.
- The Agent UI now has a third "AI 生图" mode and production build succeeds.
- Local rate-limit smoke test confirms one IP is blocked on the 6th request
  inside 1 minute.
- Vercel Production has encrypted Ark multi-model and image env vars.
- Live production Agent text requests return HTTP 200 after the latest deploy.
- Live production image mode returns a controlled JSON error instead of a
  broken route when Seedream is not activated.
- Cloudflare Pages and Vercel frontends both serve the latest built asset with
  the Agent image mode UI.
- Live production image mode now succeeds through Seedream 5.0 after setting
  `ARK_IMAGE_MODELS`.
- Local `api/agent.js` syntax check still passes after adding Volcengine Ark.
- Local Vite production build still succeeds after adding Volcengine Ark.
- The provided Ark key can call DeepSeek-V3.2 through model
  `deepseek-v3-2-251201`.
- Vercel Production has encrypted Ark env vars configured.
- The live production Agent API returns HTTP 200 with the expected CORS origin
  after the Ark deployment.
- Local `api/agent.js` syntax check passes.
- Local Vite production build succeeds.
- Vercel Production has encrypted OpenRouter, Groq, and Gemini provider keys configured.
- Vercel Production has encrypted GitHub Models token/model variables configured.
- Live production `/api/agent` now returns JSON with a Chinese reply.
- CORS preflight from `https://wuyi-with-ai.pages.dev` returns HTTP 204 with the expected allow-origin header.
- Vercel inspect shows `λ api/agent` deployed on the production alias.
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
- `doubao-seedream-4-5-251128` is not live-successful in this account yet, but
  image generation works through `doubao-seedream-5-0-260128` and
  `doubao-seedream-4-0-250828`.
- Kimi-K2 and Doubao-1.5 Vision direct chat calls were not live-successful in
  this account; they are present as late fallbacks but currently return 404.
- Newly added optional providers other than GitHub Models are not configured with real keys unless added in Vercel.

## Open Risks
- Local Vercel CLI deploy/build is unreliable from the Chinese-path workspace; use an ASCII-path worktree for direct CLI deployment if this repeats.

## Important Evidence
- 2026-06-13 front-end iteration: AI 编程基础 now has a hub at
  `/ai-coding-basics` plus six practical standalone pages:
  `/ai-coding-basics/model-choice`, `/domestic-route`, `/task-agents`,
  `/terminal-agents`, `/concept-aesthetics`, and `/open-skills`.
- 2026-06-13 front-end iteration: homepage AI 编程基础 cards now link to the
  standalone practical pages instead of same-page hash anchors.
- 2026-06-13 front-end iteration: 大模型评测 now includes a Model Radar orbit
  visual plus a task-router chart; AI 编程智能体评测 now includes an Agent
  Capability Map plus capability cards.
- 2026-06-13 validation: `npm run build` passed after the standalone-page and
  evaluation-visual changes.
- 2026-06-13 browser validation: desktop homepage links point to six standalone
  routes, `/ai-coding-basics/model-choice` renders the practical detail page,
  model/agent visual systems render, and 390px mobile checks had no horizontal
  overflow.
- Cloudflare frontend code routes pages.dev Agent calls to `https://wuyi-with-ai.vercel.app/api/agent`.
- `npx vercel env ls production` shows encrypted `OPENROUTER_API_KEY`, `GROQ_API_KEY`, and `GEMINI_API_KEY`.
- `POST https://wuyi-with-ai.vercel.app/api/agent` returned JSON successfully on 2026-05-20 after deploying from the ASCII temp worktree.
- Vite React build output directory is `dist`.
- Cloudflare Pages React Vite preset uses `npm run build` and `dist`.
- Vercel Vite deployment uses the Vite framework preset, `npm run build`, and `dist`.
- Vercel production alias is https://wuyi-with-ai.vercel.app.
- Cloudflare Pages production URL is https://wuyi-with-ai.pages.dev.
- GitHub repository is https://github.com/hoanacantincus-cmd/wuyi-with-ai.
- Canonical sitemap host is https://wuyi-with-ai.pages.dev/.

## Next Smallest Step
- Optional: add SiliconFlow/Cerebras/SambaNova keys if more fallback capacity is needed.
