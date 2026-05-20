# Context Cartography

**Context Cartography** is a system for organizing, relating, and resolving agent context in software repositories.

It treats repository instructions not as one large prompt, but as a structured landscape of references. The repository contains a persistent **Context Tree**, while a **Context Map** is a separate reference object: a self-contained repository of context-relevant references that points to other references as needed by the current operating context.

The goal is to help agents operate with the **smallest sufficient context**: enough information to interpret or navigate coherently within a given context, without loading unrelated instructions, architectural details, or examples.

## Core Concepts

### Context Tree

A **Context Tree** is the persistent hierarchy of scoped `AGENTS.md` files in a repository.

Each `AGENTS.md` file defines the context for its own scope. The root file defines global project context. Branch files define local architecture and conventions. Leaf files define tactical rules, examples, and validation steps for a specific area.

```text
Root AGENTS.md
  → Branch AGENTS.md
    → Leaf AGENTS.md
```

The root file should not list every descendant. It should list only major branches. Each branch file should list only its immediate children.

### Context Map

A **Context Map** is separate from the Context Tree. It is a self-contained repository of references relevant to a given operating context, pointing to other references in the tree as needed by that context.

The relation is contextual, not intrinsic. A reference belongs in a map because it helps interpret or navigate the current context, not because it permanently belongs to a fixed task category.

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

The Context Tree describes what context references exist.  
The Context Map is a separate contextual reference layer that points to the references needed for interpretation or navigation within the current context.

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
Rules: protect sensitive auth values in logs and examples.
Validate: pnpm --filter api test auth.
```

## Routing Model

A context-cartography-aware agent can:

```text
1. Start from the root AGENTS.md.
2. Identify the current operating context.
3. Follow relevant child references through the Context Tree.
4. Add related context links when the operating context crosses scopes.
5. Build a Context Map as a separate reference object.
6. Resolve the map to the referenced context.
7. Load only the mapped context.
8. Continue with the smallest sufficient context.
```

Inactive branches should not be loaded unless they are referenced by the Context Map.

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
Context Tree = persistent repository context reference structure
Context Map  = separate contextual reference object pointing to needed references
```

The tree is the territory of available references.  
The map is a separate contextual route reference that points into that territory.

This distinction is the heart of Context Cartography. A repository may contain a large Context Tree, but an agent should only resolve and load the references made relevant by the current Context Map.

## Relationship to existing patterns

Context Cartography resembles nested `AGENTS.md`, `CLAUDE.md`, Copilot instructions, Cursor rules, cascading configuration files, and hierarchical retrieval systems.

The distinction is that Context Cartography treats these mechanics as an intentional architecture pattern.

It is not merely “put instructions near code.”

It is a **context-relation system** for agentic development.

## Summary

```text
Root = global invariants + major branch references
Branch = local architecture + commands + child references
Leaf = tactical rules + examples + validation

Context Tree = all available scoped context references
Context Map = separate contextual reference object pointing to currently relevant references
```

Context Cartography reduces context usage, improves contextual relevance, limits instruction noise, and makes agent behavior more predictable across large repositories.
