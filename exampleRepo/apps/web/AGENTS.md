This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/apps/web/
parent: ../../AGENTS.md
children:
  - src/routes/AGENTS.md
---

# exampleRepo/apps/web/AGENTS.md

## Purpose

Frontend application context for user-facing routes, components, state, and API-facing UI behavior.

## Local rules

- Keep UI behavior accessible and predictable.
- Do not duplicate backend authorization logic in the frontend; treat frontend checks as user experience only.
- Keep API contract assumptions explicit near code that consumes API responses.
- For login, protected routes, or session-aware UI, use the authentication map from the API subtree.

## Local validation

- Run web-focused checks for changed routes, components, and client behavior.
- For cross-boundary UI changes, validate the relevant API assumptions too.

## Relevant maps

- `../api/AGENTS.map.auth.md` for login, logout, session, and protected-route work.
