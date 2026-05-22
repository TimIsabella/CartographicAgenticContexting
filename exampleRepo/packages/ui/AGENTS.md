---
node: branch
scope: packages/ui/
parent: ../../AGENTS.md
children: []
---

# /packages/ui/AGENTS.md

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