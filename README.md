# Context Cartography

**Context Cartography** is a system for organizing, relating, and resolving agent context in software repositories.

It treats repository instructions not as one large prompt, but as two cooperating structures:

1. A persistent **Context Tree** that defines the repository's scoped context references.
2. A generated **Context Map** that selects the references needed for the current operating context.

The Context Tree is the durable structure stored in the repository. The Context Map is a separate contextual structure built from that tree for a particular navigation, task, or interpretation need.

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

### Context Map

A **Context Map** is separate from the Context Tree. It is a contextual reference object built for a particular operating context.

The map points to the tree nodes needed to understand, navigate, or act within the current context. It may point to a single path through the tree, or it may combine references from multiple branches when the current work crosses repository scopes.

The map answers:

```text
Which context references are needed right now?
Why are those references relevant to the current operating context?
```

A Context Map is not a permanent branch, category, or duplicate hierarchy. It is a selected route over the persistent tree.

Example of a map pointing to a single path through the tree:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
```

Example of a map pointing to multiple parts of the tree:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
/packages/db/AGENTS.md
/packages/observability/AGENTS.md
```

The relation is contextual, not intrinsic. A reference belongs in a map because it helps interpret or navigate the current context, not because it permanently belongs to a fixed task category.

### How they work together

The **Context Tree** stores the repository's available scoped context references.

The **Context Map** is generated from the tree for the current operating context.

The tree gives the agent a stable landscape. The map gives the agent a focused route through that landscape.

```text
Context Tree
  = durable repository structure
  = scoped AGENTS.md hierarchy
  = inheritance and discoverability

Context Map
  = contextual selection layer
  = current route through the tree
  = smallest sufficient set of references to resolve and load
```

An agent should traverse the Context Tree to discover applicable references, then build a Context Map that contains only the references needed for the current work.

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

A map for work inside `apps/api/src/auth/` might select the root, API branch, auth leaf, and database context. A different task in the same repository might produce a different map without changing the tree.

## Routing Model

A context-cartography-aware agent can:

```text
1. Start from the root AGENTS.md.
2. Identify the current operating context.
3. Traverse the Context Tree through relevant child references.
4. Consider durable related references when the operating context crosses scopes.
5. Build a Context Map as a separate contextual selection object.
6. Resolve the map to the referenced tree nodes.
7. Load only the mapped context.
8. Continue with the smallest sufficient context.
```

Inactive branches should not be loaded unless they are selected by the Context Map.

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

Inheritance belongs to the tree. Selection belongs to the map.

A Context Map may include multiple branches, but it does not merge those branches into a new tree. It only identifies which tree references should be resolved together for the current operating context.

## Tree vs. Map

```text
Context Tree = persistent repository context reference structure
Context Map  = separate contextual selection object pointing to needed tree references
```

The tree is the territory of available scoped references.  
The map is the route currently being used through that territory.

This distinction is the heart of Context Cartography. A repository may contain a large Context Tree, but an agent should only resolve and load the references selected by the current Context Map.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography separates durable context structure from contextual context selection:

- the Context Tree describes where repository context lives and how it inherits;
- the Context Map describes which references matter for the current operating context.

It is not merely “put instructions near code.”

It is a **context-relation system** for agentic development.

## Summary

```text
Root = global invariants + major branch references
Branch = local architecture + commands + child references
Leaf = tactical rules + examples + validation

Context Tree = all available scoped context references and inheritance relationships
Context Map = separate contextual selection object pointing to currently relevant tree references
```

Context Cartography reduces context usage, improves contextual relevance, limits instruction noise, and makes agent behavior more predictable across large repositories.
