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
node: branch
scope: apps/api/
parent: ../AGENTS.md
children:
  - src/AGENTS.md
---

# /apps/api/AGENTS.md
Rules: API application constraints.
- Keep HTTP route composition centralized in `/apps/api/src/server.js`.
- Keep request/response primitives in `/apps/api/src/http.js` and reuse them across route modules.
- Keep authentication and billing behaviors isolated in their dedicated subtrees.
