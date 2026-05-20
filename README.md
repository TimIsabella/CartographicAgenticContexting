# Context Cartography

**Context Cartography** is a system for organizing, routing, and selecting agent context in software repositories.

It treats repository instructions not as one large prompt, but as a structured landscape. The repository contains a persistent **context tree**, and each task produces a temporary **context map** through that tree.

The goal is to help agents operate with the **smallest sufficient context**: enough information to complete the task safely and coherently, without loading unnecessary instructions, unrelated architectural details, or irrelevant examples.

## Core concepts

### Context tree

A **context tree** is the persistent hierarchy of scoped `AGENTS.md` files in a repository.

Each `AGENTS.md` file defines the context for its own scope. The root file defines global project context. Branch files define local architecture and conventions. Leaf files define tactical rules, examples, and validation steps for a specific area.

```text
Root AGENTS.md
  → Branch AGENTS.md
    → Leaf AGENTS.md
```

The root file should not list every descendant. It should list only major branches. Each branch file should list only its immediate children.

### Context map

A **context map** is the task-specific selection of context needed for a particular change.

Sometimes the map is a single path through the tree:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
```

Other times, the map may point to multiple parts of the project:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
/packages/db/AGENTS.md
/packages/observability/AGENTS.md
```

The context tree describes what context exists.  
The context map describes what context is needed now.

## Governing principle

The central rule of Context Cartography is:

> Load the smallest sufficient context for the task.

This prevents two common failures:

```text
Root bloat: placing too much detail in the root file.
Leaf overfitting: placing overly narrow or duplicated rules in deep files.
```

Context should be inherited downward, not duplicated downward. Child files should specialize parent context, not restate it.

## File structure

The standard filename should remain:

```text
AGENTS.md
```

This preserves compatibility with existing agent tooling.

The file’s role in the context system should be declared inside the file using metadata:

```yaml
---
node: root | branch | leaf
scope: path/
extends: path | null
children: [...]
related: [...]
---
```

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
Rules: never log tokens, session IDs, or OAuth payloads.
Validate: pnpm --filter api test auth.
```

## Routing model

A context-cartography-aware agent can:

```text
1. Start from the root AGENTS.md.
2. Identify the task scope.
3. Follow relevant child references through the context tree.
4. Add related context links when the task touches multiple scopes.
5. Build a context map.
6. Load only the mapped context.
7. Execute with the smallest sufficient context.
```

Inactive branches should not be loaded unless they are part of the context map.

## Inheritance and precedence

Context flows downward.

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

## Tree vs. map

```text
Context tree = persistent repository context structure
Context map  = temporary task-specific context selection
```

The tree is the territory.  
The map is the route.

This distinction is the heart of Context Cartography. A repository may contain a large context tree, but an agent should only load the map required for the current task.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography treats these mechanics as an intentional architecture pattern.

It is not merely “put instructions near code.”

It is a **context-routing system** for agentic development.

## Summary

```text
Root = global invariants + major branch map
Branch = local architecture + commands + child references
Leaf = tactical rules + examples + validation

Context tree = all available scoped context
Context map = selected context for the task
```

Context Cartography reduces token usage, improves local relevance, limits instruction noise, and makes agent behavior more predictable across large repositories.
