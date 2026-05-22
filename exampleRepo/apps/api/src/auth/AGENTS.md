---
node: leaf
scope: apps/api/src/auth/
parent: ../../AGENTS.md
children: []
---

# /apps/api/src/auth/AGENTS.md

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

- `passwords.js` hashes and verifies passwords with `crypto.scryptSync`.
- `sessions.js` creates HTTP-only session cookies and resolves authorized users.
- `routes.js` exposes `/api/register`, `/api/login`, `/api/logout`, and `/api/session`.

## Local validation

- Run `npm run check` when authentication code changes.
- Manually test register, login, session reload, and logout through `npm start` when behavior changes.
- Include negative-path coverage for invalid credentials, expired sessions, and unauthorized access when adding tests.