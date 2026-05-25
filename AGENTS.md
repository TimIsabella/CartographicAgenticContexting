---
node: root
scope: .
parent: null
children:
  - exampleRepo/AGENTS.md
---

## Location-aware metadata

- `node: root` establishes this file as the repository-wide Context Tree root.
- `scope: .` applies this context to the whole repository.
- `parent: null` records that this root has no inherited parent context.
- `children` lists immediate child Context Tree nodes that inherit from this root.

## Context Key

This repository uses additional context file types.

| Type | File name | Purpose | When to read |
|---|---|---|---|
| Atlas | `AGENTS.atlas.md` | Index of available maps. | When choosing which map to use. |
| Map | `AGENTS.map.<name>.md` | Guide for one area, workflow, or concern. | When the task matches the map name or purpose. |
| Route | `AGENTS.route.<name>.md` | Ordered list of context files for a task. | When the task matches the route name or purpose. |

Keep the Context Key in this root `AGENTS.md` file, immediately below Location-aware metadata, so agents discover auxiliary context file types before reading repository-wide rules or narrower subtree guidance.

Branch and leaf `AGENTS.md` files inherit this key from the root. Do not duplicate it in narrower nodes unless that subtree intentionally acts as its own independent context root.

## Repository-wide guidance

- Resolve the smallest sufficient context for the current operating context.
- Prefer the closest relevant `AGENTS.md` file before loading broader or unrelated context.
- Use `AGENTS.atlas.md`, `AGENTS.map.<name>.md`, and `AGENTS.route.<name>.md` only when their purpose matches the task.
- Keep documentation and example repository artifacts aligned when changing the framework model.
