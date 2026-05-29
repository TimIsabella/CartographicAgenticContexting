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
scope: tests/integration/
parent: ../AGENTS.md
children: []
---

# /tests/integration/AGENTS.md

Rules: integration-test constraints.

- Validate end-to-end API workflows through the running server process and HTTP calls.
- Prefer assertions that cover request ordering, auth state transitions, and persisted side effects.
- Keep fixture setup isolated per test via temporary directories and dynamic ports.
