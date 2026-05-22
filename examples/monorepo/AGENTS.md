---
node: root
scope: .
parent: null
children:
  - apps/api/AGENTS.md
  - packages/db/AGENTS.md
  - docs/releases/AGENTS.md
---

# /AGENTS.md

This is the root Context Tree node for the sample monorepo.

## Repository-wide rules

- Prefer small, reviewable changes.
- Preserve existing public APIs unless the task explicitly calls for a breaking change.
- Keep implementation, tests, and documentation changes together when they describe the same behavior.
- Do not introduce new runtime dependencies without documenting why they are needed.

## Validation

Use the narrowest validation command that proves the change is safe. Escalate to broader validation only when the changed area crosses package boundaries.

## Context resolution guidance

- Load this root node for every task in the sample repository.
- Then load the nearest descendant `AGENTS.md` file for the area being changed.
- Use maps only when a task needs cross-cutting references.
- Use routes only when a repeated task depends on ordered context exposure.
