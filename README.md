# Context Cartography

**Context Cartography** is a system for organizing and resolving agent context in software repositories.

Instead of treating repository instructions as one large prompt, Context Cartography separates context into four main concepts:

`Context Tree` The hierarchy of context across the entire project; the topography of the project itself.

`Context Map` An individual collection of reference pointers.

`Context Atlas` The index of existing Context Maps.

`Context Route` An individual and predefined stepped route through the project.

The goal is to help agents operate with the **smallest sufficient context**: enough information to work coherently in the current context, without loading unrelated instructions, architecture notes, examples, or validation steps.

## Context Tree

A **Context Tree** is hierarchical totality of all `AGENTS.md` files in the project, and their relation to eachother.

Each `AGENTS.md` file contains the necessary location-aware metadata for the folder where it is located. Together, these files define the project’s contextual topography.

Context Tree files are located in each folder as:

```text
AGENTS.md
```

Each `AGENTS.md` file defines context for one repository location:

- The root file defines repository-wide context that applies across the project.
- Branch files define context for intermediate scopes within narrower subtrees.
- Leaf files define context for the most specific areas of the project.

Example tree:

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

### Location-aware metadata

Each `AGENTS.md` file should contain metadata that describes its role in the Context Tree:

```yaml
---
node: root | branch | leaf
scope: path/
parent: path | null
children: [...]
---
```

The metadata describes a tree node and its durable relationships.

`node` defines its overall tree position.

`scope` relates the context to its folder's locality.

`parent` identifies the parent context that this node inherits from.

`children` lists immediate child tree descendants (if any).

The metadata is for parsing.  
The heading is for humans.

### Example tree nodes

#### Root tree node

```md
---
node: root
scope: .
parent: null
children:
  - apps/web/AGENTS.md
  - apps/api/AGENTS.md
  - packages/ui/AGENTS.md
---

# /AGENTS.md
Rules: use pnpm, keep changes small, run relevant tests.
```

#### Branch tree node

```md
---
node: branch
scope: apps/api/
parent: ../../AGENTS.md
children:
  - src/auth/AGENTS.md
  - src/billing/AGENTS.md
---

# /apps/api/AGENTS.md
Rules: controllers route requests; services hold business logic.
```

#### Leaf tree node

```md
---
node: leaf
scope: apps/api/src/auth/
parent: ../../AGENTS.md
children: []
---

# /apps/api/src/auth/AGENTS.md
Rules: protect sensitive auth values in logs and examples.
Validate: pnpm --filter api test auth.
```

These files define the Context Tree. They do not themselves define a Context Map, Context Atlas, or Context Route.

## Context Map

A **Context Map** is an individual collection of reference pointers.

A map links important contexts across the Context Tree or externally. It is not restricted to hierarchy and does not need to follow only parent-child relationships.

A map is not required. It is created by necessity when a particular operating context needs an explicit collection of references.

A Context Map is represented as an individual file named:

```text
AGENTS.map.*.md
```

The wildcard should identify the operating context or purpose of the map.

Examples:

```text
AGENTS.map.auth.md
AGENTS.map.release.md
AGENTS.map.billing-migration.md
```

Context Maps are located where appropriate.

A map answers:

```text
Which context references are needed for this operating context?
Why are these references grouped together?
What parts of the tree or external context does this map point to?
```

Example map contents:

```md
# AGENTS.map.auth.md

This map collects context references commonly needed for authentication work.

references:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md
  - /packages/observability/AGENTS.md
  - https://example.com/external-auth-spec
```

The references may point down one branch, across multiple branches, into related areas of the project, or to external context. The map is a contextual collection, not a new hierarchy.

## Context Atlas

A **Context Atlas** is the index of existing Context Maps.

It is represented as an individual file named:

```text
AGENTS.atlas.md
```

The Context Atlas is located at the project root.

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

```md
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

A **Context Route** is an individual and predefined stepped route through the project.

A route is meant to rebuild a prior context that was established by traversing the project. It enables contextual repeatability by making a previously useful traversal explicit and reusable.

A route is not required. It is created by necessity when a repeated navigation path should be preserved.

A Context Route is represented as an individual file named:

```text
AGENTS.route.*.md
```

The wildcard should identify the route purpose.

Examples:

```text
AGENTS.route.auth.md
AGENTS.route.release.md
AGENTS.route.incident-response.md
```

Context Routes are located where appropriate.

A route answers:

```text
What stepped route should an agent follow through the project?
Which context reference comes first?
Which references come next?
Where does the route end?
```

Example route:

```md
# AGENTS.route.auth.md

This route rebuilds a prior context established while working on authentication.

route:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md
```

The route is about ordered traversal and contextual repeatability. The map is about the collection of references. The atlas is about indexing maps.

## How the concepts work together

A typical resolution flow is:

```text
1. Read the Context Tree from available AGENTS.md files.
2. Check the root AGENTS.atlas.md if an atlas exists.
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
Route → predefined stepped route through the project
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

Inheritance belongs to the Context Tree. Pointer collection belongs to Context Maps. Map indexing belongs to the Context Atlas. Predefined stepped navigation belongs to Context Routes.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography separates four concerns that are often mixed together:

- project topography and context hierarchy;
- reference pointer collections;
- indexing of existing maps;
- predefined stepped routes through the project.

It is not merely “put instructions near code.” It is a context-resolution model for agentic development.
