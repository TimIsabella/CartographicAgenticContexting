---
node: branch
scope: apps/web/
parent: ../../AGENTS.md
children: []
---

# /apps/web/AGENTS.md

This branch node defines context for web application work.

## Web conventions

- Keep user-facing flows accessible and keyboard navigable.
- Prefer reusable UI primitives from `/packages/ui/AGENTS.md` when available.
- Keep API integration details behind client service boundaries.
- Avoid exposing internal error details in user-facing messages.

## Local validation

- Run web-focused checks when changing screens, routing, or client behavior.
- Include accessibility checks when UI behavior changes.
