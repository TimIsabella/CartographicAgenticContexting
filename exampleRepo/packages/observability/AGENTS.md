---
node: branch
scope: packages/observability/
parent: ../../AGENTS.md
children: []
---

# /packages/observability/AGENTS.md

This branch node defines context for logging, metrics, tracing, and operational visibility work.

## Observability conventions

- Do not log secrets, credentials, tokens, session identifiers, cookies, authorization headers, or sensitive payloads.
- Prefer structured events with stable field names.
- Keep metrics low-cardinality unless high cardinality is explicitly justified.
- Include enough context for debugging without exposing private user data.
- Use redaction helpers before writing event fields to logs.

## Important files

- `logger.js` provides structured JSON logging and recursive sensitive-field redaction.
- API route modules call `logEvent` for auth and billing events.
- `apps/api/src/server.js` calls `logHttpRequest` once per request.

## Local validation

- Run `npm run check` when changing observability code.
- Check logging and telemetry changes for sensitive data exposure.
- Confirm new metrics or events have clear names, units, and expected cardinality.