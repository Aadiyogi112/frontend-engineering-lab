# ADR-002 — State Management

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

Explorer selections must survive mode changes. Dataset records, theme preferences, and benchmark execution have different owners and lifetimes.

## Decision

Use built-in React state management:

- `useReducer` owns explorer selections: dataset size, Normal/Optimized/Compare mode, search query, sort field and direction, status filters, and type filters.
- Theme Context owns the Light/Dark/System preference and resolved theme.
- Benchmark execution state and recorded results are separate from explorer state and from one another.
- Local `useState` owns isolated UI interactions.

Do not put transaction records into the explorer reducer or duplicate datasets in table state. The explorer controller remains mounted at the ownership boundary needed to retain selections across modes. Reset clears search and filters and restores date-descending sorting, retaining dataset, mode, and theme. Do not introduce Redux Toolkit for the MVP.

## Alternatives considered

- Redux Toolkit: additional global infrastructure is not required for the approved state scope.
- Broad Context-based state management: convenient access, but couples unrelated updates and ownership.

## Rationale

Explicit reducer transitions provide predictable behavior without an unnecessary state-management dependency.

## Consequences and trade-offs

Owners must coordinate dataset changes and benchmark execution explicitly. Context is scoped to theme concerns; it is not a container for every record or every benchmark sample.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): PAR-05, PAR-06; THEME-01 through THEME-07; BENCH-08.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-003 — Data Flow and Component Boundaries](003-data-flow.md)
- [ADR-008 — Benchmark Results and Comparison](008-benchmark-results.md)
- [ADR-009 — Design System and Theming](009-design-system-theming.md)
