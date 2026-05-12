# AGENTS.md

## Project Rules

- Follow the AI Coding Production System workflow for non-trivial changes.
- Read this file before source files.
- Keep diffs narrow and deployment-oriented.
- Do not introduce new dependencies unless needed for the requested behavior.

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
