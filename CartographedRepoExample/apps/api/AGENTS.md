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
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent's context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: leaf
scope: apps/api/
parent: ../AGENTS.md
children: []
---

# /apps/api/AGENTS.md
Rules: API service guidance.
- Keep HTTP behavior changes scoped to `apps/api/src/*` and validate route/module wiring in `apps/api/src/server.js`.
- When request or response payloads change, update `tests/integration/api.test.js` in the same change.
- Reuse shared persistence and logging modules from `/packages/db` and `/packages/observability` instead of app-local copies.
