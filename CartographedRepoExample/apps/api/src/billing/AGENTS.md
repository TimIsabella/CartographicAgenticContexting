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
scope: apps/api/src/billing/
parent: ../AGENTS.md
children: []
---

# /apps/api/src/billing/AGENTS.md
Rules: Billing plan and subscription flow.
- Keep catalog data access in `catalog.js` and route orchestration in `routes.js`.
- Preserve plan ID validation before mutating subscription or invoice records.
- Keep invoice construction deterministic from subscription and plan inputs.
Validate: `node --check apps/api/src/billing/catalog.js && node --check apps/api/src/billing/routes.js`
