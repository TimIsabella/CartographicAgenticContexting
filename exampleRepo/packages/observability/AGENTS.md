---
node: branch
scope: packages/observability/
parent: ../../AGENTS.md
children: []
---

# /packages/observability/AGENTS.md

This branch node defines context for logging, metrics, tracing, and operational visibility work.

## Observability conventions

- Do not log secrets, credentials, tokens, session identifiers, or sensitive payloads.
- Prefer structured events with stable field names.
- Keep metrics low-cardinality unless high cardinality is explicitly justified.
- Include enough context for debugging without exposing private user data.

## Local validation

- Check logging and telemetry changes for sensitive data exposure.
- Confirm new metrics have clear names, units, and expected cardinality.
