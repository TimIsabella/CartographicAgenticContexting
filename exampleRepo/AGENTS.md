---
node: root
scope: exampleRepo/
parent: null
children:
  - apps/web/AGENTS.md
  - apps/api/AGENTS.md
  - packages/db/AGENTS.md
  - packages/observability/AGENTS.md
  - docs/releases/AGENTS.md
---

## Purpose

This repository contains a small product monorepo with a frontend application, backend API, shared database package, observability package, and release documentation.

## Repository-wide rules

- Keep changes small and scoped to the affected area.
- Prefer local subsystem conventions when working inside a subtree.
- Do not load unrelated implementation areas unless the task crosses boundaries.
- Keep sensitive values out of source code, fixtures, logs, examples, and documentation.
- Validate the affected area before considering a change complete.
- When a change crosses boundaries, validate each affected boundary explicitly.

## Project layout

- `apps/web/` contains the frontend application.
- `apps/api/` contains backend HTTP and service logic.
- `packages/db/` contains database schema, migrations, and data access helpers.
- `packages/observability/` contains logging, tracing, metrics, and alerting helpers.
- `docs/releases/` contains release notes, deployment readiness, and rollback planning.

## Validation baseline

Use the narrowest relevant validation for the changed area. When a change crosses boundaries, validate each affected boundary explicitly.
