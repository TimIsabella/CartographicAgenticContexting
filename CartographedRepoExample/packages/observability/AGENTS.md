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
scope: packages/observability/
parent: ../AGENTS.md
children: []
---

# /packages/observability/AGENTS.md

Rules: observability package constraints.

- Keep redaction behavior centralized in `redact` and apply it before logging externally visible payloads.
- Emit structured JSON logs via `logEvent` and compose HTTP request logs through `logHttpRequest`.
- Avoid embedding route-specific business logic in this package; keep it focused on telemetry formatting and safety.
