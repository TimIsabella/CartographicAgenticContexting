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
scope: apps/web/
parent: ../AGENTS.md
children: []
---

# /apps/web/AGENTS.md

Rules: web-app-local constraints.

- Keep browser interaction logic in `src/app.js` and static document/style shell in `index.html`.
- Preserve API usage through relative `/api/...` fetch calls with `credentials: "same-origin"` for session-backed workflows.
- Keep UI rendering functions pure with explicit DOM updates in dedicated renderer helpers.
