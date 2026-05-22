---
node: leaf
scope: apps/api/src/auth/
parent: ../../AGENTS.md
children: []
---

# /apps/api/src/auth/AGENTS.md

This leaf node defines context for authentication-specific API work.

## Authentication rules

- Never expose secrets, tokens, session identifiers, or credential material in logs or examples.
- Treat authentication failures as security-sensitive behavior.
- Prefer explicit authorization checks near protected boundaries.
- Keep test fixtures free of real user credentials.

## Local validation

- Run auth-specific API tests when authentication behavior changes.
- Include negative-path tests for invalid credentials, expired sessions, and unauthorized access.
