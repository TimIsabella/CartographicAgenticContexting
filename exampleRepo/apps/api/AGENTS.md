This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/apps/api/
parent: ../../AGENTS.md
children:
  - src/auth/AGENTS.md
---

# exampleRepo/apps/api/AGENTS.md

## Purpose

Backend API context for HTTP handlers, service orchestration, authentication flows, and integration with shared packages.

## Local rules

- Keep route handlers thin; place business logic in service modules.
- Treat authentication, authorization, and session handling as security-sensitive.
- Do not log secrets, credentials, tokens, session identifiers, or raw authorization headers.
- When API behavior changes, update or verify affected frontend assumptions and release notes when relevant.

## Local validation

- Run API-focused tests for changed routes or services.
- For auth changes, also follow `AGENTS.route.auth-change.md`.

## Relevant local maps and routes

- `AGENTS.map.auth.md` for authentication-related cross-boundary references.
- `AGENTS.map.billing.md` for billing-related cross-boundary references.
- `AGENTS.route.auth-change.md` for ordered auth-change context loading.
