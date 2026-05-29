# AGENTS.route.verification.md

This route rebuilds context state in numeric sequence for running repository verification after changes.

route_steps:
  1:
    read: /AGENTS.md
    expected_context: Repository-wide directory ownership and minimal-scope change policy.
    step_reason: Global constraints define which quality gates must be considered.
    task: Confirm affected directories and the verification surface needed for the change.

  2:
    read: /tests/AGENTS.md
    expected_context: Test subtree boundaries and split between integration and unit coverage.
    step_reason: Test hierarchy context is required before selecting specific suites.
    task: Decide whether verification must include integration tests, unit tests, or both.

  3:
    read: /scripts/AGENTS.md
    expected_context: Ownership of executable quality gate scripts.
    step_reason: The script subtree defines where syntax checks are authored and maintained.
    task: Confirm the syntax gate path and update responsibilities for verification tooling.

  4:
    read: /scripts/check-syntax.js
    expected_context: Current syntax-check coverage and scan directory definitions.
    step_reason: Verification commands should reflect the implemented quality gate behavior.
    task: Validate whether syntax scanning already covers modified paths or needs expansion.

  5:
    read: /package.json
    expected_context: Canonical npm scripts for check/test/verify execution.
    step_reason: Command entry points are required before running or documenting verification.
    task: Select the canonical script set for local and CI-equivalent verification.

  6:
    read: /tests/integration/AGENTS.md
    expected_context: Integration-test constraints for cross-layer behavior validation.
    step_reason: Integration scope rules are needed before executing or altering integration tests.
    task: Confirm integration coverage expectations for end-to-end behavior changes.

  7:
    read: /tests/unit/AGENTS.md
    expected_context: Unit-test constraints for isolated module correctness.
    step_reason: Unit scope rules are needed before executing or altering unit tests.
    task: Confirm unit coverage expectations for focused module-level changes.
