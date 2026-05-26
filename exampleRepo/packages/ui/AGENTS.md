This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/packages/ui/
parent: /exampleRepo/AGENTS.md
children: []
---

# exampleRepo/packages/ui/AGENTS.md

This branch node defines context for shared UI package work.

## UI conventions

- Prefer accessible primitives and predictable component APIs.
- Keep visual components reusable across applications.
- Avoid embedding application-specific business logic in shared UI components.
- Document component behavior when props affect accessibility, state, or layout.
- Keep shared browser modules framework-neutral unless the example app adopts a framework.

## Important files

- `components.js` exports simple DOM helpers for reusable cards and status badges.
- `apps/web/index.html` and `apps/web/src/app.js` demonstrate where shared UI primitives may be applied.

## Local validation

- Run browser-based manual checks through `npm start` when shared UI behavior changes.
- Include accessibility and interaction coverage for reusable components when adding tests.
