---
additional_context_file_types:
  atlas:
    file_name_pattern: "AGENTS.atlas.md"
    purpose: "Indexes available maps and routes"
    when_to_read: "Read when deciding which maps or routes are relevant to the task"
  map:
    file_name_pattern: "AGENTS.map.<name>.md"
    purpose: "Points to context for one area, workflow, or concern"
    when_to_read: "Read when task matches the map name, area, workflow, or concern"
  route:
    file_name_pattern: "AGENTS.route.<name>.md"
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: root
scope: ExampleRepo/
parent: null
children:
  - /ExampleRepo/apps/web/AGENTS.md
  - /ExampleRepo/apps/api/AGENTS.md
  - /ExampleRepo/packages/db/AGENTS.md
  - /ExampleRepo/packages/observability/AGENTS.md
  - /ExampleRepo/packages/ui/AGENTS.md
  - /ExampleRepo/docs/releases/AGENTS.md
---

# ExampleRepo/AGENTS.md

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
