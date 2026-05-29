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
node: root
scope: .
parent: null
children:
  - apps/AGENTS.md
  - packages/AGENTS.md
  - tests/AGENTS.md
  - scripts/AGENTS.md
  - docs/AGENTS.md
---

# /AGENTS.md

Rules: repository-wide constraints.

- Keep API route behavior and web UI behavior separated under `apps/`.
- Keep reusable helpers inside `packages/` and consume them from apps/tests instead of duplicating logic.
- Keep executable quality gates in `scripts/` and place test assertions under `tests/`.
- Prefer minimal-scope edits: read parent context first, then descend only into the subtree needed for the task.
