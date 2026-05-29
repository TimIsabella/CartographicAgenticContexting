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
scope: packages/db/
parent: ../AGENTS.md
children: []
---

# /packages/db/AGENTS.md

Rules: database package constraints.

- Preserve canonical database shape keys (`users`, `sessions`, `notes`, `subscriptions`, `invoices`) in `ensureDbShape`.
- Route all persistence writes through `writeDb` or `updateDb` to maintain directory creation and formatting behavior.
- Keep file-path handling parameterized via `createStore(filePath)`; do not hardcode repository paths inside the package.
