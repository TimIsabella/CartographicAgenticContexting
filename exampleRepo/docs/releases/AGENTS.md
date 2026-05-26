This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Map | `AGENTS.map.<name>.md` | Pointers for one area, workflow, or concern | The task matches the map name or purpose |
| Route | `AGENTS.route.<name>.md` | Ordered traversal to rebuild a prior context state | Task setup depends on reading context in sequence |
| Atlas | `AGENTS.atlas.md` | Index of available maps and routes | Choosing which maps and/or routes to use |

---
node: branch
scope: exampleRepo/docs/releases/
parent: /exampleRepo/AGENTS.md
children: []
---

# exampleRepo/docs/releases/AGENTS.md

This branch node defines context for release documentation and release preparation work.

## Release conventions

- Keep release notes clear, chronological, and action-oriented.
- Separate user-facing changes from internal maintenance notes.
- Include validation, deployment, monitoring, and rollback considerations when relevant.
- Prefer routes when release work must be repeated in a specific order.

## Local validation

- Check links and referenced files in release documentation.
- Confirm release steps match the current repository layout before publishing.
- When release notes mention implementation changes, verify the corresponding implementation contexts still apply.
