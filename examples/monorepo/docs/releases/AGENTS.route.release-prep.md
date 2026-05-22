# /docs/releases/AGENTS.route.release-prep.md

This Context Route rebuilds the context state needed for release preparation.

route:
  - /AGENTS.md
  - /docs/releases/AGENTS.md
  - /docs/releases/AGENTS.map.release.md
  - /apps/api/AGENTS.md
  - /packages/db/AGENTS.md

## Route purpose

Follow this route when preparing a release so the agent first loads repository-wide expectations, then release-specific conventions, then the cross-cutting release references that may affect validation, deployment, and rollback planning.
