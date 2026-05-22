---
node: branch
scope: exampleRepo/apps/web/
parent: ../../AGENTS.md
children:
  - src/routes/AGENTS.md
---

# exampleRepo/apps/web/AGENTS.md

This branch context applies to frontend application work.

## Local responsibilities

- Render product screens and user flows.
- Keep API interaction behind client modules or data-loading boundaries.
- Preserve accessibility and responsive behavior.
- Avoid placing secrets or privileged business logic in browser-executed code.

## Local conventions

- Prefer small components with explicit props.
- Keep shared UI primitives separate from route-specific orchestration.
- Handle loading, empty, error, and success states deliberately.
- Coordinate authentication-dependent UI with API auth context.

## Validation

Validate changed routes or components with the narrowest relevant frontend checks, including accessibility-sensitive flows when applicable.
