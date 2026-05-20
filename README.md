# Context Cartography

**Context Cartography** is a system for organizing and resolving agent context in software repositories.

Instead of treating repository instructions as one large prompt, Context Cartography separates context into four distinct concepts:

```text
Context Tree  = where context exists
Context Route = how to move downward through the tree
Context Map   = what context is needed for a specific operating context
Context Atlas = where existing maps are indexed
```

The goal is to help agents operate with the **smallest sufficient context**: enough information to work coherently in the current context, without loading unrelated instructions, architecture notes, examples, or validation steps.

## Concept boundaries

Each concept has one job.

| Concept | Job | Does not do |
| --- | --- | --- |
| **Context Tree** | Defines the durable hierarchy of scoped context files. | Does not decide what to load for a task. |
| **Context Route** | Defines directions down the tree from broader context to narrower context. | Does not select unrelated cross-scope references. |
| **Context Map** | Selects the references needed for one operating context. | Does not define the permanent repository hierarchy. |
| **Context Atlas** | Indexes existing Context Maps. | Does not replace the tree or generate maps by itself. |

## Core Concepts

### Context Tree

A **Context Tree** is the persistent hierarchy of scoped `AGENTS.md` files in a repository.

Each node defines context for one repository scope:

- the root node defines global project context;
- branch nodes define local architecture, conventions, and commands;
- leaf nodes define tactical rules, examples, and validation steps for a specific area.

```text
Root AGENTS.md
  → Branch AGENTS.md
    → Leaf AGENTS.md
```

The tree answers:

```text
What scoped context references exist?
How are those references arranged by scope and inheritance?
```

The tree is the durable structure. It is not the set of context an agent should load for every task.

### Context Route

A **Context Route** is a defined set of directions down the Context Tree.

A route starts at a broader node and follows child references toward a narrower node. It describes descent through the tree.

A route answers:

```text
Where does traversal start?
Which child reference is followed next?
Where does traversal stop?
```

Example:

```text
/AGENTS.md
  → /apps/api/AGENTS.md
    → /apps/api/src/auth/AGENTS.md
```

A route is not a Context Map. It only defines how to move down the tree. Cross-scope references can be selected by a map, but they are not part of a single downward route unless they are reached through child references in the tree.

### Context Map

A **Context Map** is a contextual selection of references needed for one operating context.

A map may include:

- one route down the tree;
- multiple routes down different branches;
- related references that are needed because the current work crosses scopes.

The map answers:

```text
Which context references are needed right now?
Why are they relevant?
Which route or routes lead to them?
Which related references should also be loaded?
```

A map is contextual. It can change from task to task without changing the tree.

Example of a map for work in `apps/api/src/auth/`:

```text
selected:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md

routes:
  - /AGENTS.md → /apps/api/AGENTS.md → /apps/api/src/auth/AGENTS.md

related:
  - /packages/db/AGENTS.md
```

The route explains how the agent reaches the auth context. The related database reference is included because the current operating context needs it, not because it belongs to the auth branch.

### Context Atlas

A **Context Atlas** is an index of existing Context Maps.

The atlas helps agents discover maps that have already been defined or generated. It does not define tree structure and does not decide context by itself.

An atlas may index maps by:

- repository area;
- task type;
- operating context;
- owning team;
- validation workflow;
- freshness;
- related maps.

The atlas answers:

```text
Which Context Maps already exist?
What operating context is each map for?
When should an existing map be reused, updated, or ignored?
```

An agent consults the atlas when it wants to reuse an existing map instead of generating a new one.

## How the concepts work together

A typical resolution flow is:

```text
1. Check the Context Atlas for an existing map.
2. If a sufficient map exists, use it.
3. If not, inspect the Context Tree.
4. Follow Context Routes down the tree toward the relevant scope.
5. Add related references only when the operating context requires them.
6. Produce a Context Map.
7. Load only the references selected by that map.
```

The responsibilities stay separate:

```text
Tree  → structure
Route → directions
Map   → task-specific selection
Atlas → map index
```

## Governing Principle

The central rule of Context Cartography is:

> Resolve the smallest sufficient context for the current operating context.

This prevents two common failures:

```text
Root bloat: placing too much detail in the root file.
Leaf overfitting: placing overly narrow or duplicated rules in deep files.
```

Context should be inherited downward, not duplicated downward. Child files should specialize parent context, not restate it.

## File Structure

The standard filename should remain:

```text
AGENTS.md
```

This preserves compatibility with existing agent tooling.

The file's role in the Context Tree should be declared inside the file using metadata:

```yaml
---
node: root | branch | leaf
scope: path/
extends: path | null
children: [...]
related: [...]
---
```

The metadata describes a tree node and its durable relationships. It does not define a Context Map.

`children` lists immediate tree descendants. `extends` identifies the parent context that this node inherits from. `related` exposes durable cross-scope references that may be useful, but those references are loaded only when a Context Map selects them for the current operating context.

The metadata is for parsing.  
The heading is for humans.

## Example

### Root file

```md
---
node: root
scope: .
extends: null
children:
  - apps/web/AGENTS.md
  - apps/api/AGENTS.md
  - packages/ui/AGENTS.md
related: []
---

# /AGENTS.md
Rules: use pnpm, keep changes small, run relevant tests.
```

### Branch file

```md
---
node: branch
scope: apps/api/
extends: ../../AGENTS.md
children:
  - src/auth/AGENTS.md
  - src/billing/AGENTS.md
related:
  - ../../packages/db/AGENTS.md
  - ../../packages/observability/AGENTS.md
---

# /apps/api/AGENTS.md
Rules: controllers route requests; services hold business logic.
```

### Leaf file

```md
---
node: leaf
scope: apps/api/src/auth/
extends: ../../AGENTS.md
children: []
related:
  - ../../../../packages/db/AGENTS.md
---

# /apps/api/src/auth/AGENTS.md
Rules: protect sensitive auth values in logs and examples.
Validate: pnpm --filter api test auth.
```

These files define the Context Tree. They do not themselves define a Context Map.

For work inside `apps/api/src/auth/`, a generated map might select:

```text
selected:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md

routes:
  - /AGENTS.md → /apps/api/AGENTS.md → /apps/api/src/auth/AGENTS.md

related:
  - /packages/db/AGENTS.md
```

The route gives directions down the tree. The map selects the final working set. The database reference is included as related context because the operating context requires it.

## Inheritance and precedence

Context flows downward through the Context Tree.

```text
Root context
  → inherited by branch context
    → specialized by leaf context
```

More specific context overrides broader context unless it conflicts with a global invariant.

```text
nearest applicable AGENTS.md wins,
except for non-overridable root rules.
```

Inheritance belongs to the tree. Direction belongs to the route. Selection belongs to the map. Indexing belongs to the atlas.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography separates four concerns that are often mixed together:

- durable context structure;
- downward navigation through that structure;
- task-specific context selection;
- indexing of existing selections.

It is not merely “put instructions near code.” It is a context-resolution model for agentic development.

## Summary

```text
Root   = global invariants + major branch references
Branch = local architecture + commands + child references
Leaf   = tactical rules + examples + validation

Tree  = durable hierarchy of scoped context references
Route = defined directions down the tree
Map   = selected references for one operating context
Atlas = index of existing maps
```

Context Cartography reduces context usage, improves contextual relevance, limits instruction noise, and makes agent behavior more predictable across large repositories.
