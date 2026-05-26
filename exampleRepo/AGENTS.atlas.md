# exampleRepo/AGENTS.atlas.md

This atlas indexes reusable Context Maps and Context Routes available in the example repository.

## Maps

maps:
  - file: /exampleRepo/apps/api/AGENTS.map.auth.md
    context: authentication work spanning API, database, observability, and frontend routes

  - file: /exampleRepo/apps/api/AGENTS.map.billing.md
    context: billing work spanning API billing logic, database persistence, observability, and release notes

  - file: /exampleRepo/docs/releases/AGENTS.map.release.md
    context: release preparation spanning application, database, observability, and rollback readiness

## Routes

routes:
  - file: /exampleRepo/docs/releases/AGENTS.route.release.md
    context: ordered context traversal for release preparation

  - file: /exampleRepo/apps/api/AGENTS.route.auth-change.md
    context: ordered context traversal for making an authentication behavior change

## Selection rules

- For localized implementation work, read the root `AGENTS.md` and the closest subtree `AGENTS.md` only.
- For cross-boundary work, choose the smallest map that covers all affected areas.
- For repeated workflows, follow the relevant route in order instead of rediscovering context ad hoc.
- Create a new map only after the same cross-boundary reference collection is needed more than once.
- Create a new route only when the order of context loading matters.
