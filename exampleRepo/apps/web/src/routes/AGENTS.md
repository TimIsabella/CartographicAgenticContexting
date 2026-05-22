---
node: leaf
scope: exampleRepo/apps/web/src/routes/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/apps/web/src/routes/AGENTS.md

This leaf context applies to frontend route work.

## Local responsibilities

- Compose page-level UI, data loading, navigation, and user-facing state.
- Keep route files focused on orchestration rather than reusable UI primitives.
- Protect authenticated routes and redirect behavior consistently.

## Local rules

- Do not expose privileged backend assumptions in client-side checks alone.
- Route-level error states should be understandable and recoverable.
- Form flows must handle validation, submission, retry, and cancellation states.

## Validation

Validate the changed route, navigation behavior, and user-visible state transitions.
