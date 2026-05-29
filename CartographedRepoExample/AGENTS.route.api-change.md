# AGENTS.route.api-change.md

This route rebuilds context state in numeric sequence for implementing and validating API changes.

route_steps:
  1:
    read: /AGENTS.md
    expected_context: Repository-wide boundaries and cross-directory placement rules.
    step_reason: Global constraints apply before entering narrower application scopes.
    task: Confirm the requested change belongs in app/API code and identify shared package impacts.

  2:
    read: /apps/AGENTS.md
    expected_context: Application-layer split between API and web concerns.
    step_reason: The app subtree boundary is required before selecting an app leaf.
    task: Confirm the change belongs under /apps/api instead of /apps/web.

  3:
    read: /apps/api/AGENTS.md
    expected_context: API-local constraints for route handling, HTTP contracts, and module structure.
    step_reason: API-local rules must be loaded before reading implementation files.
    task: Identify API behavior and module-level requirements for the change.

  4:
    read: /apps/api/src/server.js
    expected_context: Current request routing flow and static/API dispatch entry points.
    step_reason: Entry-point routing context is needed before changing endpoint behavior.
    task: Locate where the requested API behavior should be wired into the server flow.

  5:
    read: /packages/db/AGENTS.md
    expected_context: Persistence-layer constraints and database shape ownership.
    step_reason: Storage constraints are a prerequisite when API changes touch persisted data.
    task: Determine whether the API change requires schema-shape or store behavior updates.

  6:
    read: /packages/observability/AGENTS.md
    expected_context: Logging/redaction boundaries for operational events.
    step_reason: Observability constraints should be loaded before adding API-side telemetry.
    task: Decide whether event logging changes are required and where to place them.

  7:
    read: /tests/integration/AGENTS.md
    expected_context: Integration-test scope and end-to-end workflow validation expectations.
    step_reason: Test-scope constraints should be loaded before editing concrete tests.
    task: Determine which integration workflow assertions must be updated or added.

  8:
    read: /tests/integration/api.test.js
    expected_context: Existing end-to-end API workflow assertions and request sequence coverage.
    step_reason: Concrete test behavior is needed to validate the API change outcome.
    task: Apply or adjust integration assertions that prove the change works end-to-end.
