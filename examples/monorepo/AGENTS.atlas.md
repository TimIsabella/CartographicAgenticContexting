# /AGENTS.atlas.md

This atlas indexes Context Maps available in the sample monorepo. It makes maps discoverable; it does not replace the Context Tree.

```yaml
maps:
  - file: /apps/api/AGENTS.map.auth.md
    context: authentication work across API and database boundaries
    use_when:
      - changing login, logout, token, session, password, or identity flows
      - reviewing authorization behavior that touches API handlers and persisted user data

  - file: /docs/releases/AGENTS.map.release.md
    context: release preparation and release documentation
    use_when:
      - preparing release notes
      - checking release validation requirements
      - coordinating release documentation with API and database changes
```
