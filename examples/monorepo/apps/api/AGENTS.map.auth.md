# /apps/api/AGENTS.map.auth.md

This Context Map collects references commonly needed for authentication work. It is a reference collection, not a new hierarchy.

```yaml
context: authentication work across API and database boundaries
references:
  - path: /AGENTS.md
    reason: repository-wide contribution, validation, and context-resolution rules
  - path: /apps/api/AGENTS.md
    reason: API route, service, validation, and testing conventions
  - path: /apps/api/src/auth/AGENTS.md
    reason: local authentication rules and security-sensitive behavior
  - path: /packages/db/AGENTS.md
    reason: persisted user, session, password, token, and audit data constraints
```

## Use this map when

- Changing login, logout, registration, password reset, session, or token behavior.
- Reviewing whether an API auth change also needs a database migration.
- Updating tests that cross API and persistence boundaries.

## Do not use this map when

- The task only changes unrelated API routes.
- The task only updates copy, formatting, or documentation outside auth behavior.
- A release-preparation route is more appropriate because ordered context exposure matters.
