---
node: branch
scope: apps/api/
parent: ../../AGENTS.md
children:
  - src/auth/AGENTS.md
---

# /apps/api/AGENTS.md

This branch node defines context for the API application.

## API conventions

- Route handlers translate HTTP requests into service calls.
- Services own business logic and should not depend on transport-specific request or response objects.
- Input validation happens at the boundary before service calls.
- Return stable error shapes so client behavior does not depend on internal exception text.

## Testing

- Add or update API tests when route behavior changes.
- Prefer focused tests for the changed route before broader integration tests.

## Local context guidance

Load this node when modifying files under `/apps/api/`. For authentication-specific work, also inspect `/apps/api/src/auth/AGENTS.md` and the auth map at `/apps/api/AGENTS.map.auth.md`.
