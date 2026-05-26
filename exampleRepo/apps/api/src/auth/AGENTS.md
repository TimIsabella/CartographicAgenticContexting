This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: leaf
scope: exampleRepo/apps/api/src/auth/
parent: /exampleRepo/apps/api/AGENTS.md
children: []
---

# exampleRepo/apps/api/src/auth/AGENTS.md

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
