---
node: root
scope: .
parent: null
children:
  - apps/api/AGENTS.md
  - apps/web/AGENTS.md
  - docs/releases/AGENTS.md
  - packages/db/AGENTS.md
  - packages/observability/AGENTS.md
  - packages/ui/AGENTS.md
---

# /AGENTS.md

This is the root Context Tree node for the sample repository.

## Repository-wide context

- Treat this directory as the sample repository root.
- Prefer the smallest sufficient context for the current task.
- Read narrower `AGENTS.md` files when working inside a child scope.
- Use maps only when the task needs an explicit cross-cutting reference set.
- Use routes only when ordered contextual priming matters.

## Validation

- Run only the checks relevant to the files changed in the current operating context.
- Document any skipped validation when the example is changed without executable code.
