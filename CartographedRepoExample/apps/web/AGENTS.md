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
scope: CartographedRepoExample/apps/web/
parent: /CartographedRepoExample/AGENTS.md
children: []
---

# CartographedRepoExample/apps/web/AGENTS.md

This branch node defines context for web application work.

## Web conventions

- Keep user-facing flows accessible and keyboard navigable.
- Keep API integration details behind small client request helpers.
- Prefer reusable UI primitives from `/CartographedRepoExample/packages/ui/AGENTS.md` when adding shared components.
- Avoid exposing internal error details in user-facing messages.
- Treat authentication and billing state as user-specific data.

## Important files

- `index.html` contains the static page structure for account, notes, and billing flows.
- `src/app.js` wires the browser UI to session, notes, and billing endpoints.
- `/CartographedRepoExample/packages/ui/components.js` contains reusable browser component helpers that can be copied or imported by web code when needed.

## Local validation

- Run `npm start` and open `http://localhost:3000` when changing web behavior.
- Manually check register, login, notes, plan selection, subscription, invoice rendering, and logout.
- Include accessibility checks when UI behavior changes.
