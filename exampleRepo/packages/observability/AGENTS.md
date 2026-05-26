This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: leaf
scope: exampleRepo/packages/observability/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/packages/observability/AGENTS.md

## Purpose

Shared observability context for logging, tracing, metrics, alerts, and operational diagnostics.

## Local rules

- Redact secrets, credentials, tokens, cookies, and personally sensitive values before logging or tracing.
- Keep event names and metric labels stable enough for dashboards and alerts.
- Prefer structured operational signals over free-form debug output.
- Coordinate new alerts or high-cardinality metrics with release readiness notes.

## Cross-boundary context

- Use `/exampleRepo/apps/api/AGENTS.map.auth.md` when auth work changes logging, tracing, metrics, or alerts.
- Use `/exampleRepo/docs/releases/AGENTS.map.release.md` when observability changes affect deployment readiness or rollback confidence.

## Validation

- Verify sensitive values are redacted.
- Verify new metrics or logs are useful for operations and do not create avoidable noise.
