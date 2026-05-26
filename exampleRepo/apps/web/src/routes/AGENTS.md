This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: leaf
scope: exampleRepo/apps/web/src/routes/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/apps/web/src/routes/AGENTS.md

## Purpose

Frontend route context for navigation, protected routes, session-aware screens, and route-level data loading.

## Local rules

- Keep route guards focused on user experience; backend authorization remains authoritative.
- Make loading, empty, unauthorized, and error states explicit.
- Keep route assumptions aligned with API response contracts.
- Avoid exposing sensitive auth or account details in URLs, client logs, or rendered debug output.

## Cross-boundary context

Use `/exampleRepo/apps/api/AGENTS.map.auth.md` when route behavior depends on login, logout, session refresh, or protected API behavior.

## Validation

- Validate affected route states and navigation behavior.
- For auth-aware routes, verify both authorized and unauthorized user flows.
