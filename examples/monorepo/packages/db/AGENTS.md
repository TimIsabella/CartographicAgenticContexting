---
node: branch
scope: packages/db/
parent: ../../AGENTS.md
children: []
---

# /packages/db/AGENTS.md

This branch node defines context for shared database code.

## Database conventions

- Schema changes must include an explicit migration path.
- Prefer additive migrations before destructive migrations.
- Keep application-facing model names stable when possible.
- Avoid leaking persistence details into API response contracts.

## Security-sensitive data

- Password hashes, reset tokens, session identifiers, and audit fields are sensitive.
- Do not include sensitive values in seed fixtures, logs, examples, or documentation.

## Validation

Run migration validation and the narrowest affected model tests when persistence behavior changes.
