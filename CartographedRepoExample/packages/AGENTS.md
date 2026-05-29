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
scope: packages/
parent: ../AGENTS.md
children:
  - db/AGENTS.md
  - observability/AGENTS.md
  - ui/AGENTS.md
---

# /packages/AGENTS.md

Rules: shared package constraints.

- Keep package modules narrowly scoped and reusable across app/test callers.
- Do not couple one package module to another unless the shared contract is stable and intentional.
- Keep CommonJS in package code for runtime compatibility with the current Node entrypoints.
