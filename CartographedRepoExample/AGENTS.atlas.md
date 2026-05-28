# CartographedRepoExample/AGENTS.atlas.md

This Context Atlas indexes available Context Maps and Context Routes for `CartographedRepoExample/`.

Use this file after reading `/CartographedRepoExample/AGENTS.md` when the current task may match an existing cross-cutting context collection or repeatable traversal.

maps:
  - file: /CartographedRepoExample/apps/api/AGENTS.map.auth.md
    context: authentication work across API, database, observability, and web boundaries

  - file: /CartographedRepoExample/apps/api/AGENTS.map.billing.md
    context: billing work across API, database, observability, and web boundaries

  - file: /CartographedRepoExample/docs/releases/AGENTS.map.release.md
    context: release preparation and publication work

routes:
  - file: /CartographedRepoExample/apps/api/AGENTS.route.auth.md
    context: ordered priming for authentication and session work

  - file: /CartographedRepoExample/docs/releases/AGENTS.route.release.md
    context: ordered release preparation across implementation and operational areas
