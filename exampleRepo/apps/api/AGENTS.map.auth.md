# exampleRepo/apps/api/AGENTS.map.auth.md

This Context Map collects references commonly needed for authentication work in `exampleRepo/`.

references:
  - /exampleRepo/AGENTS.md
  - /exampleRepo/AGENTS.atlas.md
  - /exampleRepo/apps/api/AGENTS.md
  - /exampleRepo/apps/api/src/auth/AGENTS.md
  - /exampleRepo/packages/db/AGENTS.md
  - /exampleRepo/packages/observability/AGENTS.md
  - /exampleRepo/apps/web/AGENTS.md

## Why these references belong together

Authentication work usually crosses the API boundary, persistence layer, operational visibility layer, and browser session state. This map preserves that cross-cutting reference set without turning it into a new hierarchy.

## Use this map when

- modifying registration, login, logout, session lookup, cookies, or password handling
- changing authorization checks for protected API behavior
- changing persisted user or session shape
- changing browser behavior that depends on authenticated session state
- reviewing logs or telemetry for authentication-sensitive events
