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
node: leaf
scope: CartographedRepoExample/apps/api/src/auth/
parent: /CartographedRepoExample/apps/api/AGENTS.md
children: []
---

# CartographedRepoExample/apps/api/src/auth/AGENTS.md

This leaf node defines context for authentication-specific API work.

## Authentication rules

- Never expose secrets, passwords, session identifiers, cookies, or credential material in logs or examples.
- Treat authentication failures as security-sensitive behavior.
- Keep password hashing and verification in `passwords.js`.
- Keep session creation, lookup, and public-user shaping in `sessions.js`.
- Keep HTTP route behavior in `routes.js`.
- Prefer explicit authorization checks near protected boundaries.
- Keep test fixtures free of real user credentials.

## Important files

- `passwords.js` hashes and verifies passwords.
- `sessions.js` creates HTTP-only session cookies and resolves authorized users.
- `routes.js` exposes registration, login, logout, and session endpoints.

## Local validation

- Run `npm run check` when authentication code changes.
- Manually test register, login, session reload, and logout through `npm start` when behavior changes.
- Include negative-path coverage for invalid credentials, expired sessions, and unauthorized access when adding tests.
