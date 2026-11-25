# ADR-003 — Data Flow and Component Boundaries

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

Two rendering implementations must consume identical records and behavior. Copying large datasets into multiple component states would obscure ownership and add memory costs.

## Decision

Use unidirectional data flow with explicit ownership:

- Explorer controller: current selections and user actions.
- Dataset manager: immutable generated records and cache identity.
- Shared domain functions: deterministic search, sorting, filtering, and consistent displayed-value semantics.
- Normal and Optimized tables: their respective rendering strategies.
- Benchmark controller: workload execution and measurement.
- Comparison dashboard: read-only presentation of recorded results.

Controls dispatch selections to the controller. The selected dataset and selections feed shared processing; processed records and counts feed only the active table. Compare reads result records and does not mount both tables merely to display results. During a benchmark the runner supplies the recorded workload configuration to one implementation at a time.

Pass dataset references rather than copying 100,000 transaction objects into component state. Derived ordered collections may reference the original records; they must not mutate or sort the cached source in place.

## Alternatives considered

- Each table owning data generation and processing: risks divergent semantics and duplicate records.
- A single global store owning all concerns: unnecessary coupling for the MVP.

## Rationale

Explicit boundaries make data parity, lifecycle cleanup, and measurement attribution reviewable.

## Consequences and trade-offs

Derived collections and worker delivery can still allocate memory; shared references do not imply zero allocation. Avoid hidden side effects in processing or rendering that could contaminate sequential runs.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): DATA-06; PAR-01 through PAR-07; MODE-03.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-002 — State Management](002-state-management.md)
- [ADR-004 — Dataset Generation and Caching](004-dataset-generation-caching.md)
- [ADR-005 — Transaction Processing](005-transaction-processing.md)
- [ADR-007 — Benchmarking Architecture](007-benchmarking.md)
