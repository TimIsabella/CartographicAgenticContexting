# Context Cartography

**Context Cartography** is a system for organizing, relating, and resolving agent context in software repositories.

It treats repository instructions not as one large prompt, but as a small set of cooperating cartographic structures:

1. A persistent **Context Tree** that defines the repository's scoped context references.
2. A **Context Route** that describes the ordered path an agent follows through selected references.
3. A generated **Context Map** that selects the references and routes needed for the current operating context.
4. A broader **Context Atlas** that collects available trees, maps, routes, and conventions across a repository or organization.

The Context Tree is the durable structure stored in the repository. The Context Route is the ordered traversal through selected nodes. The Context Map is a separate contextual structure built from the tree for a particular navigation, task, or interpretation need. The Context Atlas is the higher-level collection that makes multiple trees, maps, and common routes discoverable.

The goal is to help agents operate with the **smallest sufficient context**: enough information to interpret or navigate coherently within a given context, without loading unrelated instructions, architectural details, or examples.

## Core Concepts

### Context Tree

A **Context Tree** is the persistent hierarchy of scoped `AGENTS.md` files in a repository.

Each node in the tree defines context for one repository scope:

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
What scoped context references exist in this repository?
How are those references arranged by ownership, scope, and inheritance?
```

The root file should not list every descendant. It should list only major branches. Each branch file should list only its immediate children.

The Context Tree is not the set of context an agent should load. It is the available structure from which a smaller operating context can be selected.

### Context Route

A **Context Route** is the ordered path through selected Context Tree nodes for a particular operating context.

The route is the navigational expression of a selected context. It tells the agent where to go, in what order, and which references should be resolved together.

A route answers:

```text
Which context references should be traversed?
In what order should they be resolved?
Where does the current operating context begin, branch, cross scopes, and stop?
```

Example of a simple route through one branch of the tree:

```text
/AGENTS.md
  → /apps/api/AGENTS.md
    → /apps/api/src/auth/AGENTS.md
```

Example of a route that crosses scopes:

```text
/AGENTS.md
  → /apps/api/AGENTS.md
    → /apps/api/src/auth/AGENTS.md
  ↔ /packages/db/AGENTS.md
  ↔ /packages/observability/AGENTS.md
```

A route is not the whole map. It is the path or set of path segments the map asks the agent to follow.

### Context Map

A **Context Map** is separate from the Context Tree. It is a contextual reference object built for a particular operating context.

The map points to the tree nodes needed to understand, navigate, or act within the current context. It may contain a single Context Route through the tree, or it may contain multiple route segments when the current work crosses repository scopes.

The map answers:

```text
Which context references are needed right now?
Why are those references relevant to the current operating context?
Which route or routes should be followed to resolve them?
```

A Context Map is not a permanent branch, category, or duplicate hierarchy. It is a contextual selection layer over the persistent tree.

Example of a map selecting a single route through the tree:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
```

Example of a map selecting references from multiple parts of the tree:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
/packages/db/AGENTS.md
/packages/observability/AGENTS.md
```

The relation is contextual, not intrinsic. A reference belongs in a map because it helps interpret or navigate the current context, not because it permanently belongs to a fixed task category.

### Context Atlas

A **Context Atlas** is a collection of context structures for a repository, workspace, organization, or ecosystem.

An atlas may include:

- the available Context Tree or trees;
- known or generated Context Maps;
- common Context Routes for recurring tasks;
- conventions for node metadata, inheritance, related references, and validation;
- indexes that help agents discover context without loading all of it.

The atlas answers:

```text
What context structures exist across this codebase or organization?
Which maps and routes are commonly useful?
How can agents discover the right local context without loading the whole territory?
```

A Context Atlas is not loaded wholesale for routine work. It is a discovery and organization layer. Agents use the atlas to find the relevant tree, then build or select a map and follow the route needed for the current operating context.

### How they work together

The **Context Tree** stores the repository's available scoped context references.

The **Context Route** defines the ordered traversal through selected references.

The **Context Map** is generated from the tree for the current operating context and may contain one or more routes.

The **Context Atlas** collects trees, maps, routes, and conventions so agents can discover context structures across a larger territory.

```text
Context Tree
  = durable repository structure
  = scoped AGENTS.md hierarchy
  = inheritance and discoverability

Context Route
  = ordered traversal
  = path or path segments through selected tree nodes
  = resolution order for the current operating context

Context Map
  = contextual selection layer
  = selected references plus route rationale
  = smallest sufficient set of references to resolve and load

Context Atlas
  = collection and discovery layer
  = known trees, maps, routes, and conventions
  = broader guide to the repository or organization territory
```

An agent should use the Context Atlas to discover available structures when needed, traverse the Context Tree to discover applicable references, build a Context Map that contains only the references needed for the current work, then follow the Context Route to resolve them in order.

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

The metadata describes a tree node and its durable relationships. It does not define the Context Map.

`children` lists immediate tree descendants. `extends` identifies the parent context that this node inherits from. `related` may expose durable cross-scope references that are often useful, but those references are only loaded when a Context Map selects them for the current operating context.

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

### Branch File

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

### Leaf File

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

The files above define Context Tree nodes. They do not themselves define a Context Map.

A map for work inside `apps/api/src/auth/` might select the root, API branch, auth leaf, and database context. Its route would describe the order in which those references should be resolved. A different task in the same repository might produce a different map and route without changing the tree.

## Routing Model

A context-cartography-aware agent can:

```text
1. Start from the root AGENTS.md or from an atlas index.
2. Identify the current operating context.
3. Traverse the Context Tree through relevant child references.
4. Consider durable related references when the operating context crosses scopes.
5. Build a Context Map as a separate contextual selection object.
6. Derive a Context Route that orders the selected references.
7. Resolve the route to the referenced tree nodes.
8. Load only the mapped context.
9. Continue with the smallest sufficient context.
```

Inactive branches should not be loaded unless they are selected by the Context Map and placed on the Context Route.

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

Inheritance belongs to the tree. Selection belongs to the map. Ordering belongs to the route. Discovery across many structures belongs to the atlas.

A Context Map may include multiple branches, but it does not merge those branches into a new tree. It only identifies which tree references should be resolved together for the current operating context. The Context Route describes how those references are traversed.

## Tree, Route, Map, and Atlas

```text
Context Tree  = persistent repository context reference structure
Context Route = ordered traversal through selected context references
Context Map   = separate contextual selection object pointing to needed tree references
Context Atlas = collection of available trees, maps, routes, and conventions
```

The tree is the territory of available scoped references.  
The route is the path currently followed through that territory.  
The map is the contextual selection and rationale for that path.  
The atlas is the broader collection that helps agents discover which territory, maps, and routes exist.

This distinction is the heart of Context Cartography. A repository may contain a large Context Tree, and an organization may maintain a broad Context Atlas, but an agent should only resolve and load the references selected by the current Context Map and ordered by the current Context Route.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography separates durable context structure from contextual context selection and ordered context traversal:

- the Context Tree describes where repository context lives and how it inherits;
- the Context Map describes which references matter for the current operating context;
- the Context Route describes the order in which selected references should be resolved;
- the Context Atlas describes how trees, maps, routes, and conventions are collected and discovered across a larger territory.

It is not merely “put instructions near code.”

It is a **context-relation system** for agentic development.

## Summary

```text
Root = global invariants + major branch references
Branch = local architecture + commands + child references
Leaf = tactical rules + examples + validation

Context Tree = all available scoped context references and inheritance relationships
Context Route = ordered traversal through selected context references
Context Map = separate contextual selection object pointing to currently relevant tree references
Context Atlas = collection and discovery layer for trees, maps, routes, and conventions
```

Context Cartography reduces context usage, improves contextual relevance, limits instruction noise, and makes agent behavior more predictable across large repositories.
