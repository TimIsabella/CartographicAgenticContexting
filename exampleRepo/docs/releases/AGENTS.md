---
node: branch
scope: exampleRepo/docs/releases/
parent: ../../AGENTS.md
children: []
---

# exampleRepo/docs/releases/AGENTS.md

This branch context applies to release preparation, release notes, deployment readiness, and rollback planning.

## Local responsibilities

- Document release scope and user-facing changes.
- Identify validation completed before release.
- Preserve rollback and incident-response notes for risky changes.
- Coordinate release communication with the areas changed.

## Local rules

- Release notes should distinguish features, fixes, migrations, and operational changes.
- Risky releases must include rollback notes.
- Database or auth-impacting releases require explicit validation evidence.
- Do not treat release documentation as a substitute for local implementation context.

## Validation

Validate that the release route covers all changed areas and that release notes match the actual changes.
