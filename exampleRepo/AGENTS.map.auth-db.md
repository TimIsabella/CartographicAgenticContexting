# exampleRepo/AGENTS.map.auth-db.md

This Context Map collects the references needed for authorization, session handling, JSON database access, and private note behavior in `exampleRepo/`.

references:
  - /exampleRepo/AGENTS.md
  - /exampleRepo/package.json
  - /exampleRepo/server.js
  - /exampleRepo/db.json
  - /exampleRepo/app.js
  - /exampleRepo/index.html

## Why these references are grouped

- `AGENTS.md` defines local rules, responsibilities, and validation expectations.
- `package.json` defines how to run the example.
- `server.js` contains authorization, password hashing, session cookies, API routes, static file serving, and JSON database access.
- `db.json` defines the persisted data shape: `users`, `sessions`, and `notes`.
- `app.js` contains browser-side calls to login, register, logout, session, and note endpoints.
- `index.html` defines the forms and elements that `app.js` depends on.

## Operating notes

Use this map when a task touches any of the following:

- registration or login
- session cookies
- authorization checks
- note ownership
- JSON database reads or writes
- browser/server API contracts

Do not use this map for unrelated documentation-only changes unless the documentation describes auth or database behavior.
