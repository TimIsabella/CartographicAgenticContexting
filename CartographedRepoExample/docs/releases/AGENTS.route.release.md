# ExampleRepo/docs/releases/AGENTS.route.release.md

This Context Route rebuilds the context state needed to prepare a release of the sample app in `ExampleRepo/`.

route:
  - /ExampleRepo/AGENTS.md
  - /ExampleRepo/AGENTS.atlas.md
  - /ExampleRepo/docs/releases/AGENTS.md
  - /ExampleRepo/docs/releases/AGENTS.map.release.md
  - /ExampleRepo/apps/api/AGENTS.md
  - /ExampleRepo/apps/web/AGENTS.md
  - /ExampleRepo/packages/db/AGENTS.md
  - /ExampleRepo/packages/observability/AGENTS.md
  - /ExampleRepo/packages/ui/AGENTS.md
  - /ExampleRepo/package.json

## Route purpose

Follow this route when release work needs ordered priming: repository rules first, available maps second, release-documentation conventions third, then implementation areas that affect validation, deployment, monitoring, and rollback.

## Expected release checks

1. Run `npm run check` from `ExampleRepo/`.
2. Run `npm start` from `ExampleRepo/`.
3. Manually test registration, login, private notes, billing subscription, invoice rendering, and logout.
4. Review logs for accidental secrets, cookies, session identifiers, or credentials.
5. Confirm release notes describe auth, billing, persistence, UI, and observability changes separately when those areas are affected.
