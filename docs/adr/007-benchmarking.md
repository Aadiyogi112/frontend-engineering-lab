# ADR-007 — Benchmarking Architecture

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

Concurrent large tables, inconsistent workloads, or ambiguous timing boundaries would produce misleading comparisons.

## Decision

Use a dedicated benchmark runner for controlled sequential execution. Prepare a dataset first, capture the workload and environment, restore the starting state, apply the documented warm-up policy, and measure one implementation at a time. Tear down measured work and clean up listeners, timers, and instrumentation before the next implementation or repetition. The inactive table must perform no background work.

Record dataset identity, explorer configuration, workload class, execution order, repetitions, warm-up policy, viewport, theme, build configuration, instrumentation, and available environment/revision information. Freeze the workload configuration for the run; user changes must not silently alter an in-flight experiment. Restore the defined starting state for every measured workload, including relevant scroll state.

Separate dataset preparation from rendering and interaction measurements. Rendering-only workloads start from prepared processed results; end-to-end interaction workloads include the search/sort/filter action and processing. Define metric-specific start and completion boundaries consistently for both implementations before collection.

Potential tools are the Browser Performance API, React Profiler, DOM element inspection, DevTools, and supported browser memory APIs. These are collection options, not claims that all metrics are available. Application timings, React render duration, scoped DOM counts, browser paint, and user-perceived completion must remain distinct. A React commit or animation-frame callback alone is not proof of painted pixels or user-perceived completion. Record instrumented versus uninstrumented build conditions; development StrictMode and profiling overhead must not be mistaken for production behavior.

Record successful, interrupted, failed, and incomplete outcomes with reasons. Exclude unsuccessful attempts from successful-sample summaries without hiding them. Missing measurements are not zeros. Report the procedure, individual samples or an inspectable equivalent, sample count, summary statistic, and variability. Do not cherry-pick or promise speedups.

## Alternatives considered

- Simultaneous side-by-side benchmarking: resource contention compromises attribution.
- Ad hoc stopwatch readings: weak boundaries and repeatability.
- Cypress execution duration as primary performance evidence: test-runner overhead is not application performance.

## Rationale

Controlled sequential runs and explicit measurement definitions support repeatable, auditable comparisons.

## Consequences and trade-offs

Browser scheduling, garbage collection, instrumentation, and device conditions introduce variability. A blocked main thread may delay cancellation and status updates; do not promise immediate interruption. Network metrics may be inapplicable to synthetic local workloads. Memory and component metrics depend on support; Core Web Vitals and bundle size have broader scopes than a table interaction. Label unsupported, unavailable, not-applicable, and not-yet-measured metrics with reasons. Exact metric procedures must be documented when instrumentation is implemented; no arbitrary target or universal completion proxy is selected here.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): BENCH-01 through BENCH-10; MODE-03.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-004 — Dataset Generation and Caching](004-dataset-generation-caching.md)
- [ADR-005 — Transaction Processing](005-transaction-processing.md)
- [ADR-006 — Rendering Strategy](006-rendering-strategy.md)
- [ADR-008 — Benchmark Results and Comparison](008-benchmark-results.md)
- [ADR-011 — Testing Strategy](011-testing-strategy.md)
