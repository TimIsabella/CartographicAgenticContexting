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
- Keep the static plan catalog in `catalog.js`.
- Keep subscription and invoice route behavior in `routes.js`.
- Keep payment-provider integration details isolated behind service boundaries. This sample does not contact a real provider.
- Avoid storing raw payment credentials or provider secrets.
- Prefer explicit idempotency for billing operations that may be retried.

## Important files

- `catalog.js` defines the available sample plans and pricing.
- `routes.js` exposes `/api/billing/plans`, `/api/billing/subscription`, and `/api/billing/subscribe`.
- `packages/db/db.json` persists subscriptions and invoices for the sample app.
- `packages/observability/logger.js` records billing events with sensitive-field redaction.

## Local validation

- Run `npm run check` when billing code changes.
- Manually test plan loading, subscription creation, and invoice display through `npm start` when behavior changes.
- Include retry, duplicate-event, and failure-path coverage when payment state changes.