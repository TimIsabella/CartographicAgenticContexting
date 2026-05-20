# Context Cartography

**Context Cartography** is a system for organizing and resolving agent context in software repositories.

Instead of treating repository instructions as one large prompt, Context Cartography separates context into four related concepts:

```text
Context Tree  = the topography and hierarchy of project context
Context Map   = a collection of reference pointers across the tree
Context Atlas = an index of existing Context Maps
Context Route = a predefined path through project context
```

The goal is to help agents operate with the **smallest sufficient context**: enough information to work coherently in the current context, without loading unrelated instructions, architecture notes, examples, or validation steps.

The following sections explain each concept in order: Tree, Map, Atlas, and Route.

## Context Tree

A **Context Tree** is the topography of the project itself: the hierarchy of context across the repository.

It is represented by the totality of all `AGENTS.md` files that contain the necessary location-aware metadata.

Each `AGENTS.md` file defines context for one repository location:

- the root file defines global project context;
- branch files define local architecture, conventions, and commands;
- leaf files define tactical rules, examples, and validation steps for a specific area.

```text
/AGENTS.md
  → /apps/api/AGENTS.md
    → /apps/api/src/auth/AGENTS.md
```

The Context Tree answers:

```text
What contextual locations exist in this project?
How are those locations arranged by scope, inheritance, and containment?
```

The tree is not a generated artifact. It is the project’s contextual topography as expressed through `AGENTS.md` files.

## Context Map

A **Context Map** is an individual collection of reference pointers.

A map points across the Context Tree. It is not restricted to hierarchy and does not need to follow only parent-child relationships.

A map is not required. It is created only when a particular operating context needs an explicit collection of references.

A Context Map is represented as an individual file named:

```text
AGENTS.map.*.md
```

Examples:

```text
AGENTS.map.auth.md
AGENTS.map.release.md
AGENTS.map.billing-migration.md
```

A map answers:

```text
Which context references are needed for this operating context?
Why are these references grouped together?
What parts of the tree does this context point across?
```

Example map contents:

```text
# AGENTS.map.auth.md

references:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md
  - /packages/observability/AGENTS.md
```

The references may point down one branch, across multiple branches, or into related areas of the project. The map is a contextual collection, not a new hierarchy.

## Context Atlas

A **Context Atlas** is the index of existing Context Maps.

It is represented as an individual file named:

```text
AGENTS.atlas.md
```

The atlas does not replace the Context Tree and does not define context by itself. It exists to make previously defined maps discoverable.

An atlas may index maps by:

- map filename;
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
What is each map for?
When should an existing map be reused, updated, or ignored?
```

Example atlas contents:

```text
# AGENTS.atlas.md

maps:
  - file: AGENTS.map.auth.md
    context: authentication work
    references:
      - /apps/api/src/auth/AGENTS.md
      - /packages/db/AGENTS.md

  - file: AGENTS.map.release.md
    context: release preparation
    references:
      - /AGENTS.md
      - /apps/web/AGENTS.md
      - /apps/api/AGENTS.md
```

The atlas is useful when a repository has multiple maps. A small repository may not need one.

## Context Route

A **Context Route** is a predefined hierarchical or mapped route through the project.

A route may describe a path down the Context Tree, or it may describe a predefined route through references selected by a Context Map.

A route is not required. It is created only when a repeated navigation path should be made explicit.

A Context Route is represented as an individual file named:

```text
AGENTS.route.*.md
```

Examples:

```text
AGENTS.route.auth.md
AGENTS.route.release.md
AGENTS.route.incident-response.md
```

A route answers:

```text
What path should an agent follow through the project?
Which context reference comes first?
Which references come next?
Where does the route end?
```

Example hierarchical route:

```text
# AGENTS.route.auth.md

route:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
```

Example mapped route:

```text
# AGENTS.route.auth-observability.md

route:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md
  - /packages/observability/AGENTS.md
```

The route is about order and navigation. The map is about the collection of references. The atlas is about indexing maps.

## How the concepts work together

A typical resolution flow is:

```text
1. Read the Context Tree from available AGENTS.md files.
2. Check AGENTS.atlas.md if an atlas exists.
3. Reuse an existing AGENTS.map.*.md if it matches the operating context.
4. Create a new Context Map only when an explicit reference collection is needed.
5. Follow an AGENTS.route.*.md file only when a predefined route exists and is relevant.
6. Load only the context references needed for the current operating context.
```

The responsibilities stay separate:

```text
Tree  → project topography and hierarchy
Map   → reference pointer collection
Atlas → index of existing maps
Route → predefined navigation path
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

### Context Tree files

The standard file for tree nodes is:

```text
AGENTS.md
```

This preserves compatibility with existing agent tooling.

Each `AGENTS.md` file should contain location-aware metadata that describes its role in the Context Tree:

```yaml
---
node: root | branch | leaf
scope: path/
extends: path | null
children: [...]
related: [...]
---
```

The metadata describes a tree node and its durable relationships.

`children` lists immediate tree descendants. `extends` identifies the parent context that this node inherits from. `related` exposes durable cross-scope references that may be useful, but those references are loaded only when selected by the current operating context, a Context Map, or a Context Route.

The metadata is for parsing.  
The heading is for humans.

### Context Map files

Context Maps are represented as:

```text
AGENTS.map.*.md
```

The wildcard should identify the operating context or purpose of the map.

```text
AGENTS.map.auth.md
AGENTS.map.release.md
AGENTS.map.billing-migration.md
```

### Context Atlas file

A Context Atlas is represented as:

```text
AGENTS.atlas.md
```

A repository should generally have at most one atlas per indexing scope.

### Context Route files

Context Routes are represented as:

```text
AGENTS.route.*.md
```

The wildcard should identify the route purpose.

```text
AGENTS.route.auth.md
AGENTS.route.release.md
AGENTS.route.incident-response.md
```

## Example

### Root tree node

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

### Branch tree node

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

### Leaf tree node

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

These files define the Context Tree. They do not themselves define a Context Map, Context Atlas, or Context Route.

### Optional map

```md
# AGENTS.map.auth.md

This map collects context references commonly needed for authentication work.

references:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md
  - /packages/observability/AGENTS.md
```

### Optional atlas

```md
# AGENTS.atlas.md

maps:
  - file: AGENTS.map.auth.md
    context: authentication work
  - file: AGENTS.map.release.md
    context: release preparation
```

### Optional route

```md
# AGENTS.route.auth.md

This route defines a common path for authentication work.

route:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md
```

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

Inheritance belongs to the Context Tree. Pointer collection belongs to Context Maps. Map indexing belongs to the Context Atlas. Predefined navigation belongs to Context Routes.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography separates four concerns that are often mixed together:

- project topography and context hierarchy;
- reference pointer collections;
- indexing of existing maps;
- predefined routes through the project.

It is not merely “put instructions near code.” It is a context-resolution model for agentic development.

## Summary

```text
Tree  = the project’s context topography, represented by all AGENTS.md files
Map   = an optional AGENTS.map.*.md file containing reference pointers across the tree
Atlas = an optional AGENTS.atlas.md file indexing existing maps
Route = an optional AGENTS.route.*.md file defining a hierarchical or mapped route
```

Context Cartography reduces context usage, improves contextual relevance, limits instruction noise, and makes agent behavior more predictable across large repositories.
