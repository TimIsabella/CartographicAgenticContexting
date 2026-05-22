---
node: branch
scope: apps/api/
parent: ../../AGENTS.md
children:
  - src/auth/AGENTS.md
  - src/billing/AGENTS.md
---

# /apps/api/AGENTS.md

This branch node defines context for API application work.

## API conventions

- Keep transport concerns in controllers or route handlers.
- Keep business logic in service-layer modules.
- Validate request input at API boundaries.
- Avoid logging secrets, tokens, credentials, or raw authentication payloads.

## Local validation

- Run API-focused tests when changing API behavior.
- Prefer narrow validation for the touched route, service, or module.
