# exampleRepo/docs/releases/AGENTS.route.release.md

This Context Route rebuilds the context state needed to prepare a release of the sample app in `exampleRepo/`.

route:
  - /exampleRepo/AGENTS.md
  - /exampleRepo/AGENTS.atlas.md
  - /exampleRepo/docs/releases/AGENTS.md
  - /exampleRepo/docs/releases/AGENTS.map.release.md
  - /exampleRepo/apps/api/AGENTS.md
  - /exampleRepo/apps/web/AGENTS.md
  - /exampleRepo/packages/db/AGENTS.md
  - /exampleRepo/packages/observability/AGENTS.md
  - /exampleRepo/packages/ui/AGENTS.md
  - /exampleRepo/package.json

## Route purpose

Follow this route when release work needs ordered priming: repository rules first, available maps second, release-documentation conventions third, then implementation areas that affect validation, deployment, monitoring, and rollback.

## Expected release checks

1. Run `npm run check` from `exampleRepo/`.
2. Run `npm start` from `exampleRepo/`.
3. Manually test registration, login, private notes, billing subscription, invoice rendering, and logout.
4. Review logs for accidental secrets, cookies, session identifiers, or credentials.
5. Confirm release notes describe auth, billing, persistence, UI, and observability changes separately when those areas are affected.
