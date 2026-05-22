# /docs/releases/AGENTS.map.release.md

This Context Map collects references commonly needed for release preparation. It defines what matters for release work, but it does not define the order in which those references should be read.

```yaml
context: release preparation and release documentation
references:
  - path: /AGENTS.md
    reason: repository-wide validation and contribution expectations
  - path: /docs/releases/AGENTS.md
    reason: local release documentation rules
  - path: /apps/api/AGENTS.md
    reason: API behavior may need release-note coverage
  - path: /packages/db/AGENTS.md
    reason: database migrations may need release-note and rollback coverage
```

## Use this map when

- Drafting release notes for changes that touch multiple areas.
- Checking whether API or database changes require migration notes.
- Reviewing release documentation completeness.

## Prefer the release route when

Use `/docs/releases/AGENTS.route.release-prep.md` instead when the task is to prepare an actual release and the order of review matters.
