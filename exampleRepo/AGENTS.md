This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: root
scope: exampleRepo/
parent: null
children:
  - /exampleRepo/apps/web/AGENTS.md
  - /exampleRepo/apps/api/AGENTS.md
  - /exampleRepo/packages/db/AGENTS.md
  - /exampleRepo/packages/observability/AGENTS.md
  - /exampleRepo/packages/ui/AGENTS.md
  - /exampleRepo/docs/releases/AGENTS.md
---

# exampleRepo/AGENTS.md

## Purpose

This repository contains a small Node.js product monorepo with a frontend application, backend API, shared database package, observability package, shared UI helpers, and release documentation.

## Context resolution

- Start here for repository-wide expectations.
- Read `AGENTS.atlas.md` when choosing an existing Context Map or Context Route.
- Read the narrowest applicable child `AGENTS.md` before editing inside a subtree.
- Use maps only when a task crosses tree branches or needs an explicit reference collection.
- Use routes only when task setup depends on reading context in a repeatable sequence.

## Repository-wide rules

- Resolve the smallest sufficient context for the current task.
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
- `packages/ui/` contains shared browser UI helper functions.
- `docs/releases/` contains release notes, deployment readiness, and rollback planning.

## Validation baseline

Use the narrowest relevant validation for the changed area. When a change crosses boundaries, validate each affected boundary explicitly.
