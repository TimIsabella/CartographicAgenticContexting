---
node: branch
scope: exampleRepo/packages/db/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/packages/db/AGENTS.md

This branch context applies to database schema, migrations, and data access.

## Local responsibilities

- Define persistent data models and migration behavior.
- Keep query helpers explicit and reviewable.
- Preserve data integrity across API and background workflows.

## Local rules

- Migrations must be reversible or include a documented rollback strategy.
- Avoid destructive schema changes without migration notes.
- Keep sensitive fields protected in fixtures, logs, and examples.
- Coordinate auth-related schema changes with API auth context.
- Coordinate billing-related schema changes with API billing context.

## Validation

Validate migrations, data access helpers, and any affected API behavior before considering database changes complete.
