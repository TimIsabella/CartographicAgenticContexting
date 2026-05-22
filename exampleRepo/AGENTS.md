---
node: root
scope: exampleRepo/
parent: null
children: []
---

# exampleRepo/AGENTS.md

This file is the Context Tree root for the `exampleRepo/` sample application.

## Local project purpose

`exampleRepo/` is a small HTML and JavaScript website backed by a zero-dependency Node server. It demonstrates:

- static browser assets served from the same directory
- JSON API routes under `/api/*`
- cookie-based authorization
- password hashing with Node's built-in `crypto` module
- a local JSON file used as a simple database
- user-owned private notes

## Local operating context

Treat this directory as a self-contained example application. When changing behavior here, resolve context from this file first, then follow a relevant map or route when one exists.

Primary files:

- `index.html` defines the page structure and form controls.
- `app.js` owns browser-side session, auth, and note interactions.
- `server.js` owns static serving, API routes, authorization, session cookies, password hashing, and JSON database reads/writes.
- `db.json` is the local database file used by `server.js`.
- `package.json` defines the local run command.

## Rules

- Keep the example dependency-free unless the purpose of the example changes.
- Keep credentials, password hashes, and session identifiers out of logs and rendered HTML.
- Keep private notes scoped to the authenticated user.
- Prefer small, readable functions over framework abstractions.
- Preserve the distinction between browser responsibilities in `app.js` and server responsibilities in `server.js`.

## Validation

From `exampleRepo/`, run:

```bash
npm start
```

Then manually verify:

1. Register a user.
2. Add a private note.
3. Log out.
4. Confirm notes are unavailable while logged out.
5. Log back in and confirm the note is visible again.
