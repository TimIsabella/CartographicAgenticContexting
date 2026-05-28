---
additional_context_file_types:
  atlas:
    file_name_pattern: "AGENTS.atlas.md"
    purpose: "Indexes available maps and routes"
    when_to_read: "Read when deciding which maps or routes are relevant to the task"
  map:
    file_name_pattern: "AGENTS.map.<name>.md"
    purpose: "Points to context for one area, workflow, or concern"
    when_to_read: "Read when task matches the map name, area, workflow, or concern"
  route:
    file_name_pattern: "AGENTS.route.<name>.md"
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: branch
scope: ExampleRepo/packages/db/
parent: /ExampleRepo/AGENTS.md
children: []
---

# ExampleRepo/packages/db/AGENTS.md

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
