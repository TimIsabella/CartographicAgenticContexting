# Context Cartography

**Context Cartography** is a system for organizing, routing, and selecting agent context in software repositories.

It treats repository instructions not as one large prompt, but as a structured landscape. The repository contains a persistent **Context Tree**, while each task produces a separate **context map**: a reference object that points to the relevant references in that tree.

The goal is to help agents operate with the **smallest sufficient context**: enough information to complete the task safely and coherently, without loading unnecessary instructions, unrelated architectural details, or irrelevant examples.

## Core Concepts

### Context tree

A **context tree** is the persistent hierarchy of scoped `AGENTS.md` files in a repository.

Each `AGENTS.md` file defines the context for its own scope. The root file defines global project context. Branch files define local architecture and conventions. Leaf files define tactical rules, examples, and validation steps for a specific area.

```text
Root AGENTS.md
  → Branch AGENTS.md
    → Leaf AGENTS.md
```

The root file should not list every descendant. It should list only major branches. Each branch file should list only its immediate children.

### Context Mapping

A **context map** is separate from the context tree. It is a self-contained repository of references relevant to a given context, pointing to other references in the tree as needed by that context.

Example of a map pointing to a single path through the tree:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
```

Example of the map pointing to multiple parts of the tree:

```text
/AGENTS.md
/apps/api/AGENTS.md
/apps/api/src/auth/AGENTS.md
/packages/db/AGENTS.md
/packages/observability/AGENTS.md
```

The context tree describes what context references exist.  
The context map is a separate reference layer that points to the context references unrelated to tree context traversal.

## Governing Principle

The central rule of Context Cartography is:

> Load the smallest sufficient context for the task scope.

This prevents two common failures:

```text
Root bloat: placing too much detail in the root file.
Leaf overfitting: placing overly narrow or duplicated rules in deep files.
```

Context should be inherited downward, not duplicated downward -- child files should specialize parent context, not restate it.

## File Structure

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
Rules: never log tokens, session IDs, or OAuth payloads.
Validate: pnpm --filter api test auth.
```

## Routing Model

A context-cartography-aware agent can:

```text
1. Start from the root AGENTS.md.
2. Identify the task scope.
3. Follow relevant child references through the context tree.
4. Add related context links when the task touches multiple scopes.
5. Build a context map as a separate reference object.
6. Resolve the map to the referenced context.
7. Load only the mapped context.
8. Execute with the smallest sufficient context.
```

Inactive branches should not be loaded unless they are referenced by the context map.

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

## Tree vs. Map

```text
Context tree = persistent repository context reference structure
Context map  = separate task-specific reference that points to needed references
```

The tree is the territory of available references.  
The map is a separate route reference that points into that territory.

This distinction is the heart of Context Cartography. A repository may contain a large context tree, but an agent should only resolve and load the minimally necessary contextual references.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography treats these mechanics as an intentional architecture pattern.

It is not merely “put instructions near code.”

It is a **context-routing system** for agentic development.

## Summary

```text
Root = global invariants + major branch references
Branch = local architecture + commands + child references
Leaf = tactical rules + examples + validation

Context tree = all available scoped context references
Context map = separate reference pointing to the references needed for the task
```

Context Cartography reduces token usage, improves local relevance, limits instruction noise, and makes agent behavior more predictable across large repositories.
