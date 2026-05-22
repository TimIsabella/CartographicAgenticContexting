---
node: branch
scope: packages/db/
parent: ../../AGENTS.md
children: []
---

# /packages/db/AGENTS.md

This branch node defines context for database package work.

## Database conventions

- Keep schema changes explicit and reviewable.
- Prefer reversible migrations when possible.
- Avoid storing secrets or raw credential material.
- Coordinate database changes with API contexts that depend on the affected models.

## Local validation

- Run migration or model tests when database behavior changes.
- Document any required manual migration checks.
