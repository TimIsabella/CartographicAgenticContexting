# exampleRepo/AGENTS.route.auth-db.md

This Context Route rebuilds the context state needed to safely change authorization, session handling, JSON database access, or private notes in `exampleRepo/`.

route:
  - /exampleRepo/AGENTS.md
  - /exampleRepo/AGENTS.map.auth-db.md
  - /exampleRepo/package.json
  - /exampleRepo/db.json
  - /exampleRepo/server.js
  - /exampleRepo/app.js
  - /exampleRepo/index.html

## Route rationale

1. Start with `AGENTS.md` to load the local rules and file responsibilities.
2. Read `AGENTS.map.auth-db.md` to confirm the full reference set for this operating context.
3. Read `package.json` to understand how the example is run.
4. Read `db.json` to understand the persisted database shape.
5. Read `server.js` before browser files because it defines the API contract, authorization boundary, and database behavior.
6. Read `app.js` to understand how the browser calls the API and renders session/note state.
7. Read `index.html` last to confirm that DOM IDs, forms, and controls match the browser code.

## Use this route when

- modifying registration, login, logout, or session behavior
- changing note ownership or note persistence
- changing request/response shapes under `/api/*`
- changing the database file shape
- debugging authorization failures between browser and server

## Completion check

After following this route, the agent should know:

- which context files apply
- how to run the example
- where data is persisted
- how users are authenticated
- how private notes are authorized
- which browser elements depend on server API behavior
