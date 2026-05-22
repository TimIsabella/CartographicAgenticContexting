---
node: leaf
scope: apps/api/src/billing/
parent: ../../AGENTS.md
children: []
---

# /apps/api/src/billing/AGENTS.md

This leaf node defines context for billing-specific API work.

## Billing rules

- Treat pricing, invoices, subscriptions, and payment state as audit-sensitive behavior.
- Keep payment-provider integration details isolated behind service boundaries.
- Avoid storing raw payment credentials or provider secrets.
- Prefer explicit idempotency for billing operations that may be retried.

## Local validation

- Run billing-specific API tests when billing behavior changes.
- Include retry, duplicate-event, and failure-path coverage when payment state changes.
