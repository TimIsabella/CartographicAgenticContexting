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
scope: apps/
parent: ../AGENTS.md
children:
  - apps/api/AGENTS.md
  - apps/web/AGENTS.md
---

# /apps/AGENTS.md
Rules: Application-layer guidance.
- Keep API server and web client concerns separated by subtree.
- Place cross-application behavior expectations at `/AGENTS.md` or map/route artifacts instead of duplicating leaf-level rules.
