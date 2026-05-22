---
node: branch
scope: exampleRepo/apps/api/
parent: ../../AGENTS.md
children:
  - src/auth/AGENTS.md
  - src/billing/AGENTS.md
---

# exampleRepo/apps/api/AGENTS.md

This branch context applies to backend API work.

## Local responsibilities

- HTTP routes translate requests into service calls.
- Services contain business logic.
- Data access belongs in shared database package context.
- API code must not leak secrets, tokens, or internal identifiers in responses or logs.

## Local conventions

- Keep request validation close to route boundaries.
- Keep business rules in services rather than controllers.
- Prefer explicit error handling over broad catch-all behavior.
- Coordinate cross-cutting logging and tracing with observability context.

## Validation

Run API-focused tests for changes under this subtree. For auth or billing changes, also load the relevant leaf context before selecting validation commands.
