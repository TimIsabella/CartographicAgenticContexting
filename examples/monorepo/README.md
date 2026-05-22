# Monorepo Context Example

This directory is a complete example of Cartographic Agentic Contexting applied to a small monorepo.

Treat `examples/monorepo/` as the root of the sample repository. Paths inside the example files are written relative to this sample repository root, so `/AGENTS.md` means `examples/monorepo/AGENTS.md`.

## What this example demonstrates

- A **Context Tree** made from nested `AGENTS.md` files.
- A root **Context Atlas** listing available maps.
- A cross-cutting **Context Map** for authentication work.
- An ordered **Context Route** for release preparation.

## Example layout

```text
examples/monorepo/
  AGENTS.md
  AGENTS.atlas.md
  apps/
    api/
      AGENTS.md
      AGENTS.map.auth.md
      src/
        auth/
          AGENTS.md
  packages/
    db/
      AGENTS.md
  docs/
    releases/
      AGENTS.md
      AGENTS.map.release.md
      AGENTS.route.release-prep.md
```

## How an agent would use it

For authentication work, an agent starts at the local tree node, inherits root and API context, then uses the auth map to add cross-cutting database context:

```text
/apps/api/src/auth/AGENTS.md
  inherits /apps/api/AGENTS.md
  inherits /AGENTS.md
  uses /apps/api/AGENTS.map.auth.md when the task is auth-specific
```

For release preparation, an agent follows the route because the order of context exposure matters:

```text
/docs/releases/AGENTS.route.release-prep.md
```
