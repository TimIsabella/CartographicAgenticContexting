This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/packages/db/
parent: /exampleRepo/AGENTS.md
children: []
---

# exampleRepo/packages/db/AGENTS.md

This branch node defines context for database package work.

## Database conventions

- Keep schema changes explicit and reviewable.
- Keep JSON persistence behavior in `store.js`.
- Keep sample data shape in `db.json`.
- Prefer reversible migrations when possible.
- Avoid storing secrets, raw credentials, or payment-provider secrets.
- Coordinate database changes with API contexts that depend on affected collections.

## Important files

- `store.js` creates the JSON-backed persistence adapter used by the API.
- `db.json` stores sample users, sessions, notes, subscriptions, and invoices.

## Local validation

- Run `npm run check` when changing `store.js`.
- Run `npm start` and exercise affected API routes when changing the database shape.
- Document any required manual migration checks.
