---
node: leaf
scope: exampleRepo/apps/api/src/billing/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/apps/api/src/billing/AGENTS.md

This leaf context applies to billing-related API work.

## Local responsibilities

- Handle subscription state, invoice access, payment-provider callbacks, and billing account updates.
- Keep provider-specific behavior isolated behind service boundaries.
- Preserve idempotency for webhook and retry-sensitive operations.

## Local rules

- Never store raw card data in application code or logs.
- Verify webhook signatures before processing billing events.
- Make state transitions explicit and auditable.
- Coordinate billing persistence with database context.

## Validation

Validate happy paths, failed payments, duplicate webhook delivery, cancelled subscriptions, and permission boundaries for billing resources.
