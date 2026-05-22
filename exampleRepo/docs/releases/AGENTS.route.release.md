# /docs/releases/AGENTS.route.release.md

This Context Route rebuilds the context state needed to prepare a release of the populated sample app.

route:
  - /AGENTS.md
  - /AGENTS.atlas.md
  - /docs/releases/AGENTS.md
  - /docs/releases/AGENTS.map.release.md
  - /apps/api/AGENTS.md
  - /apps/web/AGENTS.md
  - /packages/db/AGENTS.md
  - /packages/observability/AGENTS.md

## Route purpose

Follow this route when release work needs ordered priming: repository rules first, available maps second, release-documentation conventions third, then implementation areas that affect validation, deployment, and rollback.

## Expected release checks

1. Run `npm run check` from `exampleRepo/`.
2. Run `npm start` from `exampleRepo/`.
3. Manually test registration, login, private notes, billing subscription, invoice rendering, and logout.
4. Review logs for accidental secrets, cookies, session identifiers, or credentials.
5. Confirm any release notes describe auth, billing, persistence, UI, and observability changes separately.
