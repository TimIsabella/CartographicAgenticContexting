Scope:
- Tree, Map, Route, and Atlas artifacts
- AGENTS.md
- AGENTS.map.<name>.md
- AGENTS.route.<name>.md
- AGENTS.atlas.md

Context:
- Use before finalizing cartographic artifact edits

[Artifact]:
- Tree:
  - File: AGENTS.md
  - Use for hierarchy, inheritance, or local scope rules
- Map:
  - File: AGENTS.map.<name>.md
  - Use for grouped references where order is optional
- Route:
  - File: AGENTS.route.<name>.md
  - Use for repeated tasks dependent on reading order
- Atlas:
  - File: AGENTS.atlas.md
  - Use at repository root to expose discoverable maps and routes

[ValidateTree]:
- Each AGENTS.md contains node, scope, parent, children
- node is root, branch, or leaf
- root parent is null
- non-root parent resolves to existing AGENTS.md
- listed children exist
- listed children point back to current file as parent when applicable
- scope path matches current file location

[ValidateMap]:
- Concern is explicit in title and first sentence
- references list is minimal and task-relevant
- each reference path or URL resolves
- full instructions are not embedded when better placed in tree nodes

[ValidateRoute]:
- Purpose states a repeated task or context-state replay target
- Order moves from broad constraints to narrow execution context
- Route entries are numeric step keys under 'route_steps'
- Numeric step key sequence is contiguous and starts at '1'
- Each route step includes 'read:', 'expected_context:', 'step_reason:', and 'task:'
- 'read:' a reference to the target file, resource, url, etc. to read
- 'expected_context:' defines what knowledge should be obtained after reading
- 'step_reason:' defines why this step exists and why it appears at this position in the sequence
- 'task:' defines the concrete action/decision to perform using that step's context
- Every 'read:' reference resolves
- Route replay has no missing prerequisite context

[ValidateAtlas]:
- AGENTS.atlas.md is in repository root
- Each listed map or route exists
- Each entry has a one-line context label
- Deleted or renamed maps/routes are removed

[ValidateEconomy]:
- Duplicate sibling rules removed when ancestor inheritance is sufficient
- Unused references removed
- Maps/routes created only for repeated, concrete workflows
- Artifacts remain small enough to load quickly during task setup

[Output]:
- Files created
- Files updated
- Files deleted
- Why each change improves context resolution
- Unresolved uncertainties:
  - Missing parent file
  - Unknown scope owner
  - Absent external spec

Task:
1. Classify required [Artifact]
2. Confirm validation of [ValidateTree]
3. Confirm validation of [ValidateMap]
4. Confirm validation of [ValidateRoute]
5. Confirm validation of [ValidateAtlas]
6. Confirm validation of [ValidateEconomy]
7. Produce [Output]
