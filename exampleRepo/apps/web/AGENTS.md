---
node: branch
scope: apps/web/
parent: ../../AGENTS.md
children: []
---

# /apps/web/AGENTS.md

This branch node defines context for web application work.

## Web conventions

- Keep user-facing flows accessible and keyboard navigable.
- Keep API integration details behind small client request helpers.
- Prefer reusable UI primitives from `/packages/ui/AGENTS.md` when adding shared components.
- Avoid exposing internal error details in user-facing messages.
- Treat authentication and billing state as user-specific data.

## Important files

- `index.html` contains the static page structure for account, notes, and billing flows.
- `src/app.js` wires the browser UI to `/api/session`, `/api/notes`, and `/api/billing/*` endpoints.
- `/packages/ui/components.js` contains reusable browser component helpers that can be copied or imported by web code when needed.

## Local validation

- Run `npm start` and open `http://localhost:3000` when changing web behavior.
- Manually check register, login, notes, plan selection, subscription, invoice rendering, and logout.
- Include accessibility checks when UI behavior changes.