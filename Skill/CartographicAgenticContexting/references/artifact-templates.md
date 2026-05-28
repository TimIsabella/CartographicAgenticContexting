Scope:
- Cartographic artifact templates for repository context files
- Files:
  - AGENTS.md
  - AGENTS.atlas.md
  - AGENTS.map.<name>.md
  - AGENTS.route.<name>.md

Context:
- Use templates as starting points
- Replace placeholder paths, names, and context lines with repository-specific values
- Every AGENTS.md file must begin with one combined YAML frontmatter block
- In AGENTS.md frontmatter, place Context Key fields first
- After Context Key fields, place Context Tree location-aware metadata
- Do not split Context Key and Context Tree metadata into separate YAML blocks
- Route references must be written as a numeric sequence under `route:` because route order is semantic

[RootNode]:
```md
---
additional_context_file_types:
  atlas:
    file_name_pattern: "AGENTS.atlas.md"
    purpose: "Indexes available maps and routes"
    when_to_read: "Read when deciding which maps or routes are relevant to the task"
  map:
    file_name_pattern: "AGENTS.map.<name>.md"
    purpose: "Points to context for one area, workflow, or concern"
    when_to_read: "Read when task matches the map name, area, workflow, or concern"
  route:
    file_name_pattern: "AGENTS.route.<name>.md"
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: root
scope: .
parent: null
children:
  - path/to/child/AGENTS.md
---

# /AGENTS.md
Rules: repository-wide constraints.
```

[BranchNode]:
```md
---
additional_context_file_types:
  atlas:
    file_name_pattern: "AGENTS.atlas.md"
    purpose: "Indexes available maps and routes"
    when_to_read: "Read when deciding which maps or routes are relevant to the task"
  map:
    file_name_pattern: "AGENTS.map.<name>.md"
    purpose: "Points to context for one area, workflow, or concern"
    when_to_read: "Read when task matches the map name, area, workflow, or concern"
  route:
    file_name_pattern: "AGENTS.route.<name>.md"
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: branch
scope: path/to/branch/
parent: ../../AGENTS.md
children:
  - deeper/path/AGENTS.md
---

# /path/to/branch/AGENTS.md
Rules: mid-scope constraints.
```

[LeafNode]:
```md
---
additional_context_file_types:
  atlas:
    file_name_pattern: "AGENTS.atlas.md"
    purpose: "Indexes available maps and routes"
    when_to_read: "Read when deciding which maps or routes are relevant to the task"
  map:
    file_name_pattern: "AGENTS.map.<name>.md"
    purpose: "Points to context for one area, workflow, or concern"
    when_to_read: "Read when task matches the map name, area, workflow, or concern"
  route:
    file_name_pattern: "AGENTS.route.<name>.md"
    purpose: "Defines an ordered traversal for context replay to rehydrate the agent’s context to a prior state"
    when_to_read: "Read when task setup depends on reviewing context in a specific sequence"
node: leaf
scope: path/to/leaf/
parent: ../../AGENTS.md
children: []
---

# /path/to/leaf/AGENTS.md
Rules: local constraints only.
Validate: command scoped to this leaf.
```

[MapTemplate]:
```md
# AGENTS.map.<name>.md

This map collects references for <operating concern>.

references:
  - /AGENTS.md
  - /path/to/relevant/AGENTS.md
  - /path/to/related/AGENTS.md
  - https://external-spec.example
```

[RouteTemplate]:
```md
# AGENTS.route.<name>.md

This route rebuilds context state for <repeated task>.

route:
  1. /AGENTS.md
  2. /path/to/broader/context/AGENTS.md
  3. /path/to/local/task/context/AGENTS.md
```

[AtlasTemplate]:
```md
# AGENTS.atlas.md

maps:
  - file: /path/to/AGENTS.map.<name>.md
    context: one-line map purpose

routes:
  - file: /path/to/AGENTS.route.<name>.md
    context: one-line route replay purpose
```

Output:
- Return complete file content for new artifacts when creation is requested
- Return minimal patch-style updates for existing artifacts when edits are requested
- Return a reusable template prompt only when the task is explicitly template-only
- Preserve all literal blocks exactly when generating reusable templates

Constraint:
P0. Preserve AGENTS file naming conventions
P1. Keep internal [Map], [Route], and [Atlas] references repository-absolute (for example `/apps/api/AGENTS.md`) unless an external URL is required
P2. Keep atlas entries short and index-like
P3. Keep map files concern-focused
P4. Keep route files ordered for context replay
P5. Format route entries as numbered steps under `route:` (`1.`, `2.`, `3.`), not unordered bullets
P6. Replace placeholders only when repository-specific values are provided
P7. Preserve literal blocks exactly when generating reusable templates
P8. Use one YAML frontmatter block at the top of each AGENTS.md file
P9. Place Context Key fields before Context Tree metadata in AGENTS.md frontmatter

Task:
1. Select [RootNode], [BranchNode], or [LeafNode] based on repository position
2. Use the selected node template as the complete AGENTS.md starting point
3. Keep Context Key fields and Context Tree metadata in one YAML frontmatter block
4. Use [MapTemplate] for concern-based reference files
5. Use [RouteTemplate] for ordered replay files with numbered route steps
6. Use [AtlasTemplate] to index available maps and routes
7. If repository-specific values are provided, replace placeholders and produce repository-specific artifacts
8. If repository-specific values are not provided, preserve literal blocks and return reusable templates