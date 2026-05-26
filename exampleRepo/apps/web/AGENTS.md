This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/apps/web/
parent: /exampleRepo/AGENTS.md
children: []
---

# exampleRepo/apps/web/AGENTS.md

This branch node defines context for web application work.

## Web conventions

- Keep user-facing flows accessible and keyboard navigable.
- Keep API integration details behind small client request helpers.
- Prefer reusable UI primitives from `/exampleRepo/packages/ui/AGENTS.md` when adding shared components.
- Avoid exposing internal error details in user-facing messages.
- Treat authentication and billing state as user-specific data.

## Important files

- `index.html` contains the static page structure for account, notes, and billing flows.
- `src/app.js` wires the browser UI to session, notes, and billing endpoints.
- `/exampleRepo/packages/ui/components.js` contains reusable browser component helpers that can be copied or imported by web code when needed.

## Local validation

- Run `npm start` and open `http://localhost:3000` when changing web behavior.
- Manually check register, login, notes, plan selection, subscription, invoice rendering, and logout.
- Include accessibility checks when UI behavior changes.
