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

Rules: API-local constraints.

- Keep the HTTP entrypoint in `src/server.js` and route-specific behavior in subtree modules (`src/auth`, `src/billing`).
- Preserve JSON response consistency by using `sendJson` from `src/http.js` for API responses and errors.
- Enforce auth/session checks before returning user-scoped note or billing subscription data.
- Persist state changes through the store abstraction in `/packages/db/store.js` rather than direct file I/O in route modules.
