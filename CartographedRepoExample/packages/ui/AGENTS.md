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
scope: packages/ui/
parent: ../AGENTS.md
children: []
---

# /packages/ui/AGENTS.md
Rules: Reusable browser UI helpers.
- Keep exported constructors DOM-focused and framework-neutral.
- Avoid side effects at module import time.
Validate: browser module parse for `/packages/ui/components.js` must remain valid in modern evergreen browsers.
