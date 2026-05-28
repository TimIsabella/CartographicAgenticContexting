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
scope: apps/api/src/auth/
parent: ../AGENTS.md
children: []
---

# /apps/api/src/auth/AGENTS.md
Rules: Authentication and session behavior.
- Keep password hashing and verification logic in `passwords.js` only.
- Keep session cookie shape and TTL decisions in `sessions.js`.
- Ensure auth route handlers preserve redacted event logging and HTTP-only cookie flows.
Validate: `node --check apps/api/src/auth/passwords.js && node --check apps/api/src/auth/sessions.js && node --check apps/api/src/auth/routes.js`
