---
node: branch
scope: docs/releases/
parent: ../../AGENTS.md
children: []
---

# /docs/releases/AGENTS.md

This branch node defines context for release documentation and release-preparation work.

## Release documentation rules

- Release notes should describe user-visible behavior, migration impact, and validation status.
- Mention breaking changes explicitly.
- Link related API and database context when release notes describe cross-cutting behavior.
- Keep rollback notes close to risky deployment steps.

## Validation expectations

Before finalizing release notes, confirm that affected area tests and migration checks have been run or intentionally deferred.

## Related context

- Use `/docs/releases/AGENTS.map.release.md` to collect release-related references.
- Use `/docs/releases/AGENTS.route.release-prep.md` when preparing a release in a repeatable order.
