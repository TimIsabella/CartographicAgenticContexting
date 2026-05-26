This repository uses additional context file types.
| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: leaf
scope: exampleRepo/apps/api/src/billing/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/apps/api/src/billing/AGENTS.md

## Purpose

Billing leaf context for subscriptions, invoices, payment-provider callbacks, billing account state, and payment-related API behavior.

## Local rules

- Treat payment-provider payloads, signatures, customer identifiers, and billing account state as sensitive.
- Never log payment secrets, raw provider signatures, full payment method data, or unnecessary customer billing details.
- Keep billing state transitions explicit and idempotent where callbacks or retries are involved.
- Coordinate persistence changes with database context and release readiness notes.

## Cross-boundary context

Use `../../AGENTS.map.billing.md` when billing work touches persistence, observability, or release risk.
Use `/exampleRepo/docs/releases/AGENTS.map.release.md` when billing behavior affects deployment readiness or rollback planning.

## Validation

- Run billing-specific API tests.
- Verify callback retry/idempotency behavior where applicable.
- Verify sensitive billing values are redacted from logs, traces, fixtures, and docs.
