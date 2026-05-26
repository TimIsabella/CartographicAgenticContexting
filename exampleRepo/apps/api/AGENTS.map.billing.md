# exampleRepo/apps/api/AGENTS.map.billing.md

This Context Map collects references commonly needed for billing work in `exampleRepo/`.

references:
  - /exampleRepo/AGENTS.md
  - /exampleRepo/AGENTS.atlas.md
  - /exampleRepo/apps/api/AGENTS.md
  - /exampleRepo/apps/api/src/billing/AGENTS.md
  - /exampleRepo/packages/db/AGENTS.md
  - /exampleRepo/packages/observability/AGENTS.md
  - /exampleRepo/apps/web/AGENTS.md

## Why these references belong together

Billing work crosses API route behavior, persisted subscription and invoice state, operational audit events, and user-facing subscription screens. This map preserves that cross-cutting reference set without turning billing into a new hierarchy.

## Use this map when

- modifying plan catalog behavior
- changing subscription or invoice persistence
- changing billing route request/response behavior
- changing billing UI flows
- reviewing billing logs, audit events, or failure paths
