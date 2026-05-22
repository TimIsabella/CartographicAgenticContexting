---
node: branch
scope: exampleRepo/packages/observability/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/packages/observability/AGENTS.md

This branch context applies to logging, tracing, metrics, alerts, and operational visibility.

## Local responsibilities

- Provide reusable observability helpers.
- Keep operational signals consistent across frontend, API, and shared packages.
- Support debugging without leaking sensitive user, auth, billing, or infrastructure data.

## Local rules

- Logs must not contain secrets, raw tokens, payment data, or unnecessary personal data.
- Metrics should use stable names and bounded labels.
- Traces should identify meaningful boundaries without excessive payload capture.
- Alerts should be actionable and connected to documented response paths.

## Validation

Validate that instrumentation captures useful signals and does not introduce sensitive-data exposure.
