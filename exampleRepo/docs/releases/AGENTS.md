This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: leaf
scope: exampleRepo/docs/releases/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/docs/releases/AGENTS.md

## Purpose

Release documentation context for release notes, deployment readiness, migration impact, observability readiness, and rollback planning.

## Local rules

- Keep release notes user- and operator-readable.
- Document risky changes, migration requirements, monitoring expectations, and rollback constraints.
- Treat database migrations, auth behavior changes, and observability changes as release-impacting unless clearly local.
- Do not publish sensitive operational details, credentials, or secret-bearing examples.

## Relevant local maps and routes

- `AGENTS.map.release.md` for release preparation references.
- `AGENTS.route.release.md` for ordered release-readiness context loading.

## Validation

- Verify release notes match the changed implementation areas.
- Verify rollback notes are realistic for database and API behavior changes.
