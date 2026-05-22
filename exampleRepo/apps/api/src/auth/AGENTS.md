---
node: leaf
scope: exampleRepo/apps/api/src/auth/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/apps/api/src/auth/AGENTS.md

This leaf context applies to authentication work in the API.

## Local responsibilities

- Handle login, logout, session refresh, token verification, and identity-bound access checks.
- Treat credentials, tokens, secrets, and session identifiers as sensitive.
- Keep authorization decisions explicit and auditable.

## Local rules

- Never log passwords, raw tokens, refresh tokens, session cookies, or one-time codes.
- Prefer short-lived access tokens and explicit refresh behavior.
- Keep authentication errors user-safe while preserving enough internal detail for debugging through protected logs.
- Changes that affect auth behavior must consider database and observability context.

## Validation

Validate authentication flows, negative cases, and token/session expiry behavior before considering auth changes complete.
