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

- Resolve the smallest sufficient context for the current task.
- Prefer local subtree context before loading unrelated branches.
- Keep maps focused on reference collections.
- Keep routes focused on ordered contextual priming.
- Keep implementation changes small and validate the affected area.

## Project layout

- `apps/web/` contains the frontend application.
- `apps/api/` contains backend HTTP and service logic.
- `packages/db/` contains database schema, migrations, and data access helpers.
- `packages/observability/` contains logging, tracing, metrics, and alerting helpers.
- `docs/releases/` contains release notes, deployment readiness, and rollback planning.

## Validation baseline

Use the narrowest relevant validation for the changed area. When a change crosses boundaries, validate each affected boundary explicitly.
