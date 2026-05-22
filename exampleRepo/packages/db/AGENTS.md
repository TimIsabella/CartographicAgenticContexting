---
node: branch
scope: packages/db/
parent: ../../AGENTS.md
children: []
---

# /packages/db/AGENTS.md

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