# ADR-004 — Dataset Generation and Caching

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

Preparing 10K, 50K, and 100K synthetic transactions should be deterministic and separate from table measurements. Retaining every dataset indefinitely would create avoidable memory pressure.

## Decision

Generate records in a Web Worker using a seeded deterministic generator. Cache completed datasets in a bounded in-memory LRU cache with capacity **2 datasets**. Keys include generation version, seed, and dataset size. A hit reuses the existing dataset reference and updates recency; a miss requests worker generation and inserts a successful current result, evicting the least recently used cached entry when necessary.

The dataset manager owns worker requests and responses. Associate each request with its dataset identity and request identity; only the response matching the current request may replace the active dataset. Stale or disposed-owner responses must not overwrite current data. Report preparation failures without relabeling old data as the new selection. Release listeners and terminate workers when their owning lifecycle ends; invalidate pending responses during cleanup.

Use the approved fields: `id`, `date`, `merchant`, `category`, `type`, `amount`, `status`, and `paymentMethod`. Types are credit/debit; amount is a non-negative integer number of paise in INR, with direction carried by type. Document seed, fixed date range, generation version, vocabularies, ranges, and distributions. Do not use uncontrolled `Math.random()` or the current date.

Preserve immutable dataset identity. Record preparation duration separately, including clearly identified generation and delivery boundaries, and complete preparation before table benchmarks. No Redux store or external caching library is required.

## Alternatives considered

- Main-thread generation: simpler delivery but can block interaction during preparation.
- Unbounded cache: more hits at the cost of uncontrolled retained memory.
- Regeneration on every selection: less retained memory but repeats preparation work.

## Rationale

A worker separates generation work from interaction, while a two-entry LRU provides bounded reuse across the three approved sizes.

## Consequences and trade-offs

Worker messages containing ordinary record objects can incur serialization/structured-clone costs and transient duplicate memory. A worker does not imply zero-cost transfer or zero main-thread work. Eviction removes a cache reference; active consumers may still retain a dataset, and garbage collection is not immediate. Capacity bounds cached datasets, not total process memory, derived arrays, or in-flight worker allocations. Stale work may consume resources even when its response is ignored; cleanup and preparation reporting must disclose this limitation.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): DATA-01 through DATA-06; EXP-07; BENCH-03.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-003 — Data Flow and Component Boundaries](003-data-flow.md)
- [ADR-007 — Benchmarking Architecture](007-benchmarking.md)
