---
additional_context_file_types:
  atlas:
    file_name_pattern: "AGENTS.atlas.md"
    purpose: "Indexes available maps and routes"
    when_to_read: "Read when deciding which maps or routes are relevant to the task"
  map:
    file_name_pattern: "AGENTS.map.<name>.md"
    purpose: "Points to context for one area, workflow, or concern"
    when_to_read: "Read when task matches the map name, area, workflow, or concern"
  route:
    file_name_pattern: "AGENTS.route.<name>.md"
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
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
