# AGENTS.md

## Project Rules

- Read this file before source files.
- Keep diffs narrow and deployment-oriented.
- Do not introduce new dependencies unless needed for the requested behavior.
- Follow the global ordinary/complex mode split.
- Treat skills as accelerators, not defaults; use them only when they clearly reduce risk or time.
- For clear UI/content fixes, act directly and validate with the narrowest meaningful check.
- For deployment-affecting changes, build locally before pushing or deploying.

## Read Order

1. AGENTS.md
2. ai-context/07-current-state.md
3. README.md
4. package.json
5. task-relevant files

## Validation

Run the smallest meaningful check for the changed behavior.

- Local development: `npm run dev`
- Production build: `npm run build`

## Handoff

For unfinished deployment work, update `ai-context/07-current-state.md`.
