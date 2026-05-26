This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: leaf
scope: exampleRepo/apps/api/src/auth/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/apps/api/src/auth/AGENTS.md

## Purpose

Authentication leaf context for login, logout, token verification, session refresh, and protected-resource checks.

## Local rules

- Never include real secrets, access tokens, refresh tokens, cookies, or session identifiers in examples or logs.
- Prefer explicit failure modes for invalid, expired, missing, or malformed credentials.
- Keep auth behavior consistent across API responses, database persistence, observability events, and frontend route expectations.
- Redact sensitive auth material before passing data to logs, traces, metrics, or errors.

## Cross-boundary context

Use `../../AGENTS.map.auth.md` when auth work touches database persistence, observability, or frontend route behavior.
Use `../../AGENTS.route.auth-change.md` when making a behavior change that should be validated end to end.

## Validation

- Run auth-specific API tests.
- Verify sensitive data is not emitted in logs, traces, metrics, fixtures, or docs.
- For user-visible auth behavior, verify affected frontend route assumptions.
