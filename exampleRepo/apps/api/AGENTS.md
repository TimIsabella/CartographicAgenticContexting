This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/apps/api/
parent: /exampleRepo/AGENTS.md
children:
  - /exampleRepo/apps/api/src/auth/AGENTS.md
  - /exampleRepo/apps/api/src/billing/AGENTS.md
---

# exampleRepo/apps/api/AGENTS.md

This branch node defines context for API application work.

## API conventions

- Keep transport concerns in route modules and HTTP helpers.
- Keep domain-specific behavior in scoped folders such as `src/auth/` and `src/billing/`.
- Use `packages/db/store.js` for JSON persistence instead of reading database files directly in domain routes.
- Use `packages/observability/logger.js` for structured logging and redaction.
- Validate request input at API boundaries.
- Avoid logging secrets, tokens, credentials, raw cookies, or authentication payloads.

## Important files

- `src/server.js` composes route handlers, static file serving, persistence, and request logging.
- `src/http.js` contains reusable HTTP helpers for JSON responses, body parsing, and cookies.
- `src/auth/` owns registration, login, session, and password behavior.
- `src/billing/` owns plan catalog, subscription, and invoice behavior.

## Local validation

- Run `npm run check` after changing server-side JavaScript.
- Run `npm start` and exercise only the affected API routes when behavior changes.
- Prefer narrow validation for the touched route, service, or module.
