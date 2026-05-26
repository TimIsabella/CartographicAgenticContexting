This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: leaf
scope: exampleRepo/packages/db/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/packages/db/AGENTS.md

## Purpose

Shared database context for schema, migrations, persistence helpers, and data access behavior.

## Local rules

- Treat migrations as durable public history; keep them reversible or clearly document rollback limits.
- Keep persistence behavior explicit when API contracts or release readiness depend on it.
- Do not store raw secrets or sensitive tokens unless the design explicitly requires it and storage is protected.
- Coordinate schema changes with API services and release notes.

## Cross-boundary context

- Use `/exampleRepo/apps/api/AGENTS.map.auth.md` when auth persistence changes affect API or frontend behavior.
- Use `/exampleRepo/docs/releases/AGENTS.map.release.md` when schema changes affect deployment or rollback planning.

## Validation

- Run database/migration checks for schema changes.
- Validate API callers when data shape or persistence behavior changes.
