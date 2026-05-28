# CartographedRepoExample/docs/releases/AGENTS.route.release.md

This Context Route rebuilds the context state needed to prepare a release of the sample app in `CartographedRepoExample/`.

route:
  - /CartographedRepoExample/AGENTS.md
  - /CartographedRepoExample/AGENTS.atlas.md
  - /CartographedRepoExample/docs/releases/AGENTS.md
  - /CartographedRepoExample/docs/releases/AGENTS.map.release.md
  - /CartographedRepoExample/apps/api/AGENTS.md
  - /CartographedRepoExample/apps/web/AGENTS.md
  - /CartographedRepoExample/packages/db/AGENTS.md
  - /CartographedRepoExample/packages/observability/AGENTS.md
  - /CartographedRepoExample/packages/ui/AGENTS.md
  - /CartographedRepoExample/package.json

## Route purpose

Follow this route when release work needs ordered priming: repository rules first, available maps second, release-documentation conventions third, then implementation areas that affect validation, deployment, monitoring, and rollback.

## Expected release checks

1. Run `npm run check` from `CartographedRepoExample/`.
2. Run `npm start` from `CartographedRepoExample/`.
3. Manually test registration, login, private notes, billing subscription, invoice rendering, and logout.
4. Review logs for accidental secrets, cookies, session identifiers, or credentials.
5. Confirm release notes describe auth, billing, persistence, UI, and observability changes separately when those areas are affected.
