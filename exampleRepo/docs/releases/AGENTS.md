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
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: branch
scope: exampleRepo/docs/releases/
parent: /exampleRepo/AGENTS.md
children: []
---

# exampleRepo/docs/releases/AGENTS.md

This branch node defines context for release documentation and release preparation work.

## Release conventions

- Keep release notes clear, chronological, and action-oriented.
- Separate user-facing changes from internal maintenance notes.
- Include validation, deployment, monitoring, and rollback considerations when relevant.
- Prefer routes when release work must be repeated in a specific order.

## Local validation

- Check links and referenced files in release documentation.
- Confirm release steps match the current repository layout before publishing.
- When release notes mention implementation changes, verify the corresponding implementation contexts still apply.
