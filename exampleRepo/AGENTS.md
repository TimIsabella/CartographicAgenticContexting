---
node: root
scope: .
parent: null
children:
  - apps/api/AGENTS.md
  - apps/web/AGENTS.md
  - docs/releases/AGENTS.md
  - packages/db/AGENTS.md
  - packages/observability/AGENTS.md
  - packages/ui/AGENTS.md
---

# /AGENTS.md

This is the root Context Tree node for the populated sample repository.

## Repository-wide context

- Treat this directory as a small Node.js monorepo with one API app, one static web app, and three shared packages.
- Prefer the smallest sufficient context for the current task.
- Read narrower `AGENTS.md` files when working inside a child scope.
- Use maps only when the task needs an explicit cross-cutting reference set.
- Use routes only when ordered contextual priming matters.

## Important files

- `package.json` defines the runnable sample and syntax check command.
- `apps/api/src/server.js` composes API routes, static web serving, persistence, and logging.
- `packages/db/db.json` is the local JSON database used by the example.
- `AGENTS.atlas.md` indexes available cross-cutting maps.

## Validation

- Run `npm run check` after changing server-side JavaScript.
- Run `npm start` and manually exercise registration, login, notes, and billing when changing behavior.
- Document any skipped validation when the example is changed without executable code.