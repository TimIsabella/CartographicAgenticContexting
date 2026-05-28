---
name: cartographic-agentic-contexting
description: Design, audit, and maintain Cartographic Agentic Contexting artifacts in code repositories. Use when creating or updating hierarchical AGENTS.md context trees, AGENTS.map.<name>.md reference collections, AGENTS.route.<name>.md ordered context-rebuild traversals, AGENTS.atlas.md indexes, or when reducing instruction bloat and duplicated context across agent guidance files.
---

# Cartographic Agentic Contexting

Scope:
- Build and maintain repository context topology
- Resolve the smallest sufficient context for each task
- Keep topology, reference collections, ordered traversals, and indexes as separate artifact types

[Tree]:
- Hierarchical AGENTS.md files
- Node types: root, branch, leaf
- Metadata fields: node, scope, parent, children

[Map]:
- AGENTS.map.<name>.md
- Context references for one operating concern
- Reference order does not matter

[Route]:
- AGENTS.route.<name>.md
- Ordered references for rebuilding a prior context state
- Reference order matters
- Route steps use an explicit numeric sequence under `route:`

[Atlas]:
- Root AGENTS.atlas.md
- Index of available [Map] and [Route] files

[Artifacts]:
- [Tree]
- [Map]
- [Route]
- [Atlas]

Reference:
- Use canonical templates in references/artifact-templates.md
- Use the review checklist in references/audit-checklist.md

Rule:
P0. Resolve the smallest sufficient context for the current operating context
P1. Prevent context bloat
P2. Prevent context overfitting
P3. Prevent context duplication

Decision:
- Use [Tree] edits for scope and inheritance changes
- Use [Map] edits for grouped references where order does not matter
- Use [Route] edits for repeated tasks where order matters
- Use [Atlas] edits to centralize [Map] and [Route] discovery
- Use both [Map] and [Route] when a concern needs a reference set and one known replay order

Standard:
- Place durable shared rules at the nearest common ancestor node
- Place local rules only in the smallest stable subtree that needs them
- Avoid copying the same rule into sibling files
- Keep map and route names tied to stable operating concerns
- Prefer repository-absolute paths in [Map] and [Route] references
- Include external references only when internal artifacts are insufficient

Constraint:
- Keep AGENTS.md metadata valid: node, scope, parent, children
- Keep [Map] files minimal to one concern
- Keep [Route] files numerically ordered from broad constraints to narrow task context
- Keep [Atlas] entries short with explicit purpose labels
- Remove broken, stale, missing, duplicate, or obsolete references

Gate:
- Metadata integrity: tree metadata fields are present and internally consistent
- Topology integrity: parent-child relationships are resolvable and reciprocal
- Atlas integrity: AGENTS.atlas.md is in repository root, and indexed [Map] and [Route] files exist with clear purpose labels
- Context economy: each artifact contributes directly to its declared scope
- Replay utility: modified [Route] files still prime the intended repeated task in numeric sequence

Output:
- Complete file content for new artifacts
- Minimal patch-style updates for existing artifacts
- Short rationale per modified file
- Delta summary grouped by artifact type
- Explanation of how each change reduces irrelevant context loading or duplication
- Open assumptions where repository structure is ambiguous

Task:
1. Inventory existing [Artifacts]
2. Find all AGENTS.md, AGENTS.map.<name>.md, AGENTS.route.<name>.md, and AGENTS.atlas.md files
3. Extract parent and child links
4. Identify stale, missing, broken, duplicate, or obsolete references
5. Classify the requested change using [Decision]
6. Apply focused updates using [Standard] and [Constraint]
7. Reconcile cross-file integrity
8. Confirm every parent-listed child exists
9. Confirm every child-listed parent is reciprocal
10. Confirm each non-root AGENTS.md parent path resolves
11. Confirm each [Atlas] entry points to an existing [Map] or [Route]
12. Replay each modified [Route] in numeric order
13. Verify each [Route] reconstructs enough context to repeat the target task
14. Remove route steps that do not materially contribute to the outcome
15. Audit with references/audit-checklist.md
