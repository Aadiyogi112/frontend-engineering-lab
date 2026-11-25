# ADR-005 — Transaction Processing

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

Rendering comparisons are meaningful only if both implementations produce the same matching records, ordering, counts, and displayed values.

## Decision

Share deterministic search, sorting, and filtering logic between Normal and Optimized. Initially use the same processing path to isolate rendering differences:

- Search merchant or transaction ID using case-insensitive substring matching, trimming query edges. An empty query is unrestricted; the complete normalized query must match within either field.
- Filter status and type only. An empty selection is unrestricted; multiple values within one filter combine with OR, while status, type, and search combine with AND.
- Sort chronologically by date or numerically by stored paise magnitude, ascending or descending. Equal values use the same documented transaction-ID tie-break rule. Default to date descending.
- Return matching counts and ordered references without mutating source records.
- Reset controls and preserve selections across mode changes as specified by the explorer reducer.

Display INR with two decimal places and accessible credit/debit direction. No description search, additional sort fields, or date/amount/category filtering belongs in this MVP.

Rendering-only workloads use already processed results; end-to-end interaction workloads include the shared processing and resulting rendering. Label these workload classes separately. Future processing optimizations require separately documented, measurable experiments.

## Alternatives considered

- Independent table-specific logic: risks behavior drift.
- Optimizing processing in only one implementation immediately: confounds the initial rendering comparison.

## Rationale

Shared behavior supplies a common correctness contract and helps attribute differences to rendering strategy.

## Consequences and trade-offs

Shared processing can itself become an interaction bottleneck, so virtualization is not a promise of faster search or sorting. Filtering and sorting may allocate derived collections; their cost belongs in end-to-end measurements, not a rendering-only result.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): DATA-02; PAR-01 through PAR-07; BENCH-02, BENCH-03.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-002 — State Management](002-state-management.md)
- [ADR-003 — Data Flow and Component Boundaries](003-data-flow.md)
- [ADR-006 — Rendering Strategy](006-rendering-strategy.md)
- [ADR-007 — Benchmarking Architecture](007-benchmarking.md)
