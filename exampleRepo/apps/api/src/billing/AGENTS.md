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
scope: exampleRepo/apps/api/src/billing/
parent: /exampleRepo/apps/api/AGENTS.md
children: []
---

# exampleRepo/apps/api/src/billing/AGENTS.md

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
- `routes.js` exposes billing plan, subscription, and subscribe behavior.
- `packages/db/db.json` persists subscriptions and invoices for the sample app.
- `packages/observability/logger.js` records billing events with sensitive-field redaction.

## Local validation

- Run `npm run check` when billing code changes.
- Manually test plan loading, subscription creation, and invoice display through `npm start` when behavior changes.
- Include retry, duplicate-event, and failure-path coverage when payment state changes.
