# Cartographic Agentic Contexting

**Cartographic Agentic Contexting** is a framework to curate a cascaded contextual topology across evolving software ecosystems, through which both humans and agents sustain clean & navigable context over time.

Instead of treating repository instructions as one large prompt, this framework separates context into four main concepts:

- ***`Context Tree`***  The hierarchy of context across the entire project; the topography of the project itself
- ***`Context Map`***  An individual collection of reference pointers
- ***`Context Atlas`***  The index of existing Context Maps
- ***`Context Route`***  A predefined repeatable traversal used to rebuild a prior context state

The goal is to help agents operate with the **smallest sufficient context**: enough information to work coherently in the current context, without loading unrelated instructions, architecture notes, examples, or validation steps.

## Why this matters

Modern software repositories accumulate context faster than humans or agents can safely consume it. Instructions, architecture notes, validation steps, conventions, examples, exceptions, etc. often end up scattered across files, duplicated across folders, or compressed into one oversized prompt.

By treating the repository as something to be *intentionally* mapped, scoped, indexed, and traversed, this framework helps agents resolve only the context needed for the work at hand.

## Governing Principle

> *"Resolve the smallest sufficient context for the current operating context"*

This solves common token wasting behavior:

- `Context Bloat` placing too much detail in one file
- `Context Overfitting` placing overly narrow detail in one file
- `Context Duplication` repeating the same detail across multiple files

## Context Tree

<img width="845" height="563" alt="ContextTree" src="https://github.com/user-attachments/assets/c601853f-592c-466c-9f6d-e04fe74bd98c" />

A **Context Tree** is the hierarchical totality of all `AGENTS.md` files in the project, and their relation to each other.

Each `AGENTS.md` file contains the necessary location-aware metadata for the folder where it is located. Together, these files define the project’s contextual topography.

Context Tree files are located in each folder as:

```text
AGENTS.md
```

Each `AGENTS.md` file defines context for one repository location:

- The *Root* file defines repository-wide context that applies across the project
- *Branch* files define context for intermediate scopes within narrower subtrees
- *Leaf* files define context for the most specific areas of the project

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

The tree is not a generated artifact, it is the project’s contextual topography as expressed through `AGENTS.md` files.

### Location-aware metadata

Each `AGENTS.md` file must contain metadata that describes its role in the Context Tree:

```yaml
---
node: root | branch | leaf
scope: path/
parent: path | null
children: [...]
---
```

The metadata describes a tree node and its durable relationships.

- `node` defines its overall tree position
- `scope` narrows the context to its folder's locality
- `parent` identifies the parent context that this node inherits from
- `children` lists immediate child tree descendants (if any)

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

Together, these files define the Context Tree.

## Context Map

<img width="845" height="563" alt="ContextMap" src="https://github.com/user-attachments/assets/2e65dc62-60ec-49ba-9277-44ef144070c7" />

A **Context Map** is an individual and optional collection of reference pointers. It is created by necessity when a particular operating context needs an explicit collection of references.

A map links important contexts across the tree or externally, it is not restricted to the tree hierarchy, and does not need to follow parent-child relationships.

A map is represented as an individual file named:

```text
AGENTS.map.<name>.md
```

The `<name>` identifies the operating context or purpose of the map.

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

<img width="845" height="563" alt="ContextAtlas" src="https://github.com/user-attachments/assets/e6ccf2f7-9ca6-453c-85f5-3b1f4b1eaf30" />

A **Context Atlas** is the index of existing Context Maps.

It is represented as an individual file named:

```text
AGENTS.atlas.md
```

The atlas is located at the project root.

The atlas does not replace the tree and does not define context by itself -- it exists to make previously defined maps discoverable.

An atlas may index maps by:

- Map filename
- Repository area
- Task type
- Operating context
- Owning team
- Validation workflow
- Freshness
- Related maps

The atlas answers:

```text
Which maps already exist?
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

The atlas is useful when a repository has multiple maps -- a small repository may not need one.

## Context Route

<img width="845" height="563" alt="ContextRoute" src="https://github.com/user-attachments/assets/3eb274e7-10b3-4a6d-9118-412f56d69496" />

A **Context Route** is an individual and predefined stepped traversal through the project.

A route is meant to rebuild a prior context state that was established by traversing the project. It enables contextual repeatability by making a previously useful traversal explicit and reusable.

Routes are useful when an agent's contextual priming is necessary to performing the same task again. Instead of rediscovering the relevant context each time, an agent can follow the same route to reconstruct the context state needed for that task.

A route is not required; it is created by necessity when a repeated navigation path should be preserved because the order of exposure matters.

A route is represented as an individual file named:

```text
AGENTS.route.<name>.md
```

The `<name>` identifies the route purpose.

Examples:

```text
AGENTS.route.auth.md
AGENTS.route.release.md
AGENTS.route.incident-response.md
```

Routes are located where appropriate.

A route answers:

```text
What stepped route should an agent follow to rebuild a useful context state?
Which context reference comes first?
Which references come next?
Where does the route end?
What task does this route prepare the agent to perform again?
```

Example route content:

```md
# AGENTS.route.auth.md

This route rebuilds the context state needed to perform authentication work again.

route:
  - /AGENTS.md
  - /apps/api/AGENTS.md
  - /apps/api/src/auth/AGENTS.md
  - /packages/db/AGENTS.md
```

A route is about *ordered contextual priming*: replaying a useful traversal so an agent can rebuild the context state needed to perform a repeated task, or to return to the same state at a later time.

### Map vs Route

Context Map answers:

```text
Which references are relevant to this operating context?
```

Context Route answers:

```text
What sequence should an agent follow to rebuild a useful prior context state?
```

A map is useful when the agent needs a collection of related references. A route is useful when the order of exposure matters because the agent is being primed to perform a repeated task.

For example, authentication work may have a map containing references to API, database, logging, and security policy context -- that mapping ***defines what matters***.

A release-preparation route may walk through repository rules, changelog policy, test requirements, deployment steps, and rollback notes in a specific order -- that routing ***rebuilds a prior context state***.

## How the concepts work together

A typical resolution flow is:

```text
1. Read the tree from available AGENTS.md files.
2. Check the root AGENTS.atlas.md if an atlas exists.
3. Reuse an existing AGENTS.map.<name>.md if it matches the operating context.
4. Create a new map only when an explicit reference collection is needed.
5. Follow an AGENTS.route.<name>.md file only when a predefined route exists and is relevant.
6. Load only the context references needed for the current operating context.
```

The responsibilities stay separate:

```text
Tree  → project topography and hierarchy
Map   → reference pointer collection
Atlas → index of existing maps
Route → repeatable contextual priming and context-state reconstruction
```

## Inheritance and Precedence

Context flows downward through the Context Tree.

```text
Root context
  → inherited by branch context
    → specialized by leaf context
```

- Inheritance belongs to the Context Tree
- Pointer collection belongs to Context Maps
- Map indexing belongs to the Context Atlas
- Repeatable contextual priming belongs to Context Routes

## Relationship to existing patterns

This framework resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that the four concerns are separated instead of mixed together:

- Project topography and context hierarchy
- Reference pointer collections
- Indexing of existing maps
- Repeatable contextual priming through predefined routes

It is not merely “put instructions near code.” It is a context-resolution model for agentic development.
