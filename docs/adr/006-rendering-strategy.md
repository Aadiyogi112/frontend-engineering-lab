# ADR-006 — Rendering Strategy

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

The lab needs a preserved naive reference and a distinct rendering experiment for large transaction tables.

## Decision

Maintain two table implementations with identical data and functionality.

**Normal** renders all matching rows. It must not silently reduce the dataset, paginate away the workload, or substitute virtualization. A large-workload warning may explain expected limitations without changing benchmark inputs.

**Optimized** uses the approved `@tanstack/react-virtual` library for row virtualization, rendering visible rows with appropriate overscan. The dependency is selected, not installed by this documentation task. Record relevant viewport and overscan settings with benchmark conditions.

Both implementations expose every matching record through their scrolling experience, with the same order, counts, formatted values, headers, and sort state. Preserve keyboard navigation, meaningful table semantics, visible focus, and access to off-screen records. Virtualized rows leaving the rendered window must not cause unexplained focus loss. Verify behavior with assistive technology and keyboard use; virtualization alone does not guarantee accessibility.

Do not introduce additional performance optimizations without documenting their effects and measurement approach.

## Alternatives considered

- Rendering every row in both versions: no distinct rendering experiment.
- Pagination or a reduced dataset as the optimized comparison: changes the approved scrolling workload.
- A custom virtualizer: adds implementation and maintenance complexity without an approved need.

## Rationale

Virtualization is the approved rendering experiment while the all-row baseline remains available for fair comparison.

## Consequences and trade-offs

Normal can stall the main thread or fail at large sizes; report that outcome honestly. Virtualization adds scroll, sizing, overscan, and focus-management complexity. Browser find, printing, and assistive-technology exposure can differ when rows are not mounted; document observed limitations and resolve MVP accessibility blockers rather than claiming equivalence without validation. Actual gains or regressions must be measured.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): MODE-01, MODE-02; EXP-06; UI-02, UI-03; PAR-07.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-005 — Transaction Processing](005-transaction-processing.md)
- [ADR-007 — Benchmarking Architecture](007-benchmarking.md)
- [ADR-011 — Testing Strategy](011-testing-strategy.md)
