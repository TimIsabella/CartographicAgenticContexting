# Example Repository

This directory is a sample repository used to demonstrate Cartographic Agentic Contexting in a realistic folder structure.

Treat `exampleRepo/` as the sample repository root. Paths inside the example use `/` to mean this directory, not the outer documentation repository.

## Structure

```text
exampleRepo/
  AGENTS.md
  AGENTS.atlas.md
  apps/
    api/
      AGENTS.md
      AGENTS.map.auth.md
      src/
        auth/
          AGENTS.md
        billing/
          AGENTS.md
    web/
      AGENTS.md
  docs/
    releases/
      AGENTS.md
      AGENTS.map.release.md
      AGENTS.route.release-prep.md
  packages/
    db/
      AGENTS.md
    observability/
      AGENTS.md
    ui/
      AGENTS.md
```

## Reading the example

- Start with `/AGENTS.md` for repository-wide context.
- Read narrower `AGENTS.md` files as the operating context moves into child folders.
- Use `AGENTS.atlas.md` to discover available Context Maps.
- Use `AGENTS.map.*.md` files for cross-cutting reference sets.
- Use `AGENTS.route.*.md` files when context needs to be loaded in a repeatable order.
