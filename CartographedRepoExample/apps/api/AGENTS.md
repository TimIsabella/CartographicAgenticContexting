---
additional_context_file_types:
  atlas:
    file_name_pattern: "AGENTS.atlas.md"
    purpose: "Indexes available maps and routes"
    when_to_read: "Read when deciding which maps or routes are relevant to the task"
  map:
    file_name_pattern: "AGENTS.map.<name>.md"
    purpose: "Points to context for one area, workflow, or concern"
    when_to_read: "Read when task matches the map name, area, workflow, or concern"
  route:
    file_name_pattern: "AGENTS.route.<name>.md"
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: branch
scope: ExampleRepo/apps/api/
parent: /ExampleRepo/AGENTS.md
children:
  - /ExampleRepo/apps/api/src/auth/AGENTS.md
  - /ExampleRepo/apps/api/src/billing/AGENTS.md
---

# ExampleRepo/apps/api/AGENTS.md

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
