This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/packages/observability/
parent: /exampleRepo/AGENTS.md
children: []
---

# exampleRepo/packages/observability/AGENTS.md

This branch node defines context for logging, metrics, tracing, and operational visibility work.

## Observability conventions

- Do not log secrets, credentials, tokens, session identifiers, cookies, authorization headers, or sensitive payloads.
- Prefer structured events with stable field names.
- Keep metrics low-cardinality unless high cardinality is explicitly justified.
- Include enough context for debugging without exposing private user data.
- Use redaction helpers before writing event fields to logs.

## Important files

- `logger.js` provides structured JSON logging and recursive sensitive-field redaction.
- API route modules call logging helpers for auth and billing events.
- `apps/api/src/server.js` logs HTTP requests.

## Local validation

- Run `npm run check` when changing observability code.
- Check logging and telemetry changes for sensitive data exposure.
- Confirm new metrics or events have clear names, units, and expected cardinality.
