# CartographedRepoExample/apps/api/AGENTS.route.auth.md

This Context Route rebuilds the context state needed to safely change authentication, authorization, session handling, and private user state in `CartographedRepoExample/`.

route:
  - /CartographedRepoExample/AGENTS.md
  - /CartographedRepoExample/AGENTS.atlas.md
  - /CartographedRepoExample/apps/api/AGENTS.md
  - /CartographedRepoExample/apps/api/AGENTS.map.auth.md
  - /CartographedRepoExample/apps/api/src/auth/AGENTS.md
  - /CartographedRepoExample/packages/db/AGENTS.md
  - /CartographedRepoExample/packages/observability/AGENTS.md
  - /CartographedRepoExample/apps/web/AGENTS.md
  - /CartographedRepoExample/package.json

## Route rationale

1. Start with repository-wide context to load global rules and validation expectations.
2. Read the atlas to confirm available cross-cutting context artifacts.
3. Read API context before auth leaf context because auth behavior is implemented behind API route boundaries.
4. Read the auth map to confirm every cross-branch reference relevant to the task.
5. Read auth leaf context for sensitive behavior, file ownership, and narrow validation.
6. Read database and observability contexts because auth depends on persistence and safe logging.
7. Read web context when session state, browser flows, or user-facing auth behavior may change.
8. Read `package.json` last to confirm runnable commands and Node version expectations.

## Use this route when

- modifying registration, login, logout, sessions, cookies, or password handling
- changing protected API behavior or authorization checks
- changing user/session persistence shape
- debugging browser/server authentication mismatches
- reviewing authentication-sensitive logs or examples

## Completion check

After following this route, the agent should know the relevant tree chain, cross-cutting auth references, sensitive-data constraints, affected validation commands, and browser/API boundaries involved in authentication work.
