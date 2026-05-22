---
node: leaf
scope: apps/api/src/auth/
parent: ../../AGENTS.md
children: []
---

# /apps/api/src/auth/AGENTS.md

This leaf node defines context for authentication code in the API application.

## Auth-specific rules

- Never log passwords, tokens, session secrets, recovery codes, or raw authorization headers.
- Treat authentication failures as expected control flow, not exceptional infrastructure failures.
- Keep token creation, token verification, and session persistence separated.
- Prefer explicit authorization checks over implicit assumptions from route shape.

## Validation

When authentication behavior changes, run focused auth tests first. Add regression coverage for security-sensitive edge cases.

## Related context

Use `/apps/api/AGENTS.map.auth.md` for auth work that crosses into database models, observability, release notes, or other non-local context.
