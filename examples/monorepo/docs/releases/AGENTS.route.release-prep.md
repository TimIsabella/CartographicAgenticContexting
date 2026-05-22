# /docs/releases/AGENTS.route.release-prep.md

This Context Route rebuilds the context state needed to prepare a release. It is ordered because release preparation benefits from reviewing broad policy first, then local release rules, then affected implementation areas.

```yaml
context: release preparation
route:
  - step: 1
    path: /AGENTS.md
    purpose: load repository-wide validation and contribution expectations
  - step: 2
    path: /docs/releases/AGENTS.md
    purpose: load release documentation rules and validation expectations
  - step: 3
    path: /docs/releases/AGENTS.map.release.md
    purpose: identify cross-cutting references that may need release coverage
  - step: 4
    path: /apps/api/AGENTS.md
    purpose: check whether API behavior changes require release-note coverage
  - step: 5
    path: /packages/db/AGENTS.md
    purpose: check whether migrations or persistence changes require release-note or rollback coverage
```

## Route completion criteria

The route is complete when the agent can answer:

- What changed from a user-visible perspective?
- Which validation was run or deferred?
- Are there migration, rollback, or compatibility notes?
- Which areas of the repository supplied the relevant release context?
