# ExampleRepo/AGENTS.atlas.md

This Context Atlas indexes available Context Maps and Context Routes for `ExampleRepo/`.

Use this file after reading `/ExampleRepo/AGENTS.md` when the current task may match an existing cross-cutting context collection or repeatable traversal.

maps:
  - file: /ExampleRepo/apps/api/AGENTS.map.auth.md
    context: authentication work across API, database, observability, and web boundaries

  - file: /ExampleRepo/apps/api/AGENTS.map.billing.md
    context: billing work across API, database, observability, and web boundaries

  - file: /ExampleRepo/docs/releases/AGENTS.map.release.md
    context: release preparation and publication work

routes:
  - file: /ExampleRepo/apps/api/AGENTS.route.auth.md
    context: ordered priming for authentication and session work

  - file: /ExampleRepo/docs/releases/AGENTS.route.release.md
    context: ordered release preparation across implementation and operational areas
