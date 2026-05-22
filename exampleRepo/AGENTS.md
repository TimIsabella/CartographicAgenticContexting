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

# exampleRepo/AGENTS.md

This root context applies across the example repository.

## Purpose

This example demonstrates a complete Cartographic Agentic Contexting layout using a small product monorepo.

## Repository-wide rules

- Resolve the smallest sufficient context for the current task.
- Prefer local subtree context before loading unrelated branches.
- Keep maps focused on reference collections.
- Keep routes focused on ordered contextual priming.
- Keep implementation changes small and validate the affected area.

## Project layout

- `apps/web/` contains the frontend application.
- `apps/api/` contains backend HTTP and service logic.
- `packages/db/` contains database schema and data access context.
- `packages/observability/` contains logging, tracing, and metrics context.
- `docs/releases/` contains release process context.

## Validation baseline

Use the narrowest relevant validation for the changed area. When a change crosses boundaries, validate each affected boundary explicitly.
