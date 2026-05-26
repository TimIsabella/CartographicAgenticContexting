# exampleRepo/AGENTS.atlas.md

This Context Atlas indexes available Context Maps and Context Routes for `exampleRepo/`.

Use this file after reading `/exampleRepo/AGENTS.md` when the current task may match an existing cross-cutting context collection or repeatable traversal.

maps:
  - file: /exampleRepo/apps/api/AGENTS.map.auth.md
    context: authentication work across API, database, observability, and web boundaries

  - file: /exampleRepo/apps/api/AGENTS.map.billing.md
    context: billing work across API, database, observability, and web boundaries

  - file: /exampleRepo/docs/releases/AGENTS.map.release.md
    context: release preparation and publication work

routes:
  - file: /exampleRepo/apps/api/AGENTS.route.auth.md
    context: ordered priming for authentication and session work

  - file: /exampleRepo/docs/releases/AGENTS.route.release.md
    context: ordered release preparation across implementation and operational areas
