# ADR-008 — Benchmark Results and Comparison

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

Compare mode must retain the original context of observations even when the user changes the current explorer settings.

## Decision

Keep active benchmark execution state separate from recorded terminal outcomes and completed measurements. Store results in memory for the current session. Records include dataset identity, seed/version/size, implementation, workload class and exact configuration, measurements and units, collection boundaries/method, available browser/environment and build/revision details, order, repetition and warm-up information, run status/failures, and limitations.

Keep per-attempt outcomes so failed or incomplete work remains visible. Results contain metadata and measured values, not copies of the transaction datasets. Current explorer changes must not rewrite prior result context.

Compare only compatible successful observations: dataset identity, workload/starting state, metric definition and units, environment/build/instrumentation, theme/viewport, and warm-up/repetition protocol must align. Missing compatibility information must be disclosed and must not imply verified equivalence. Implementation is the intended differing dimension.

Show absolute measurements and units alongside any percentage. For a lower-is-better metric, a reduction may be calculated as `(Normal - Optimized) / Normal * 100` only with compatible measured values and a nonzero Normal value. Label the direction and metric; negative reductions represent regressions. Do not reuse that interpretation for all metric types. Missing data remains labeled, never converted to zero.

Compare presents numerical summaries and charts without running both large tables simultaneously. Permanent persistence and downloadable benchmark history are outside the MVP.

## Alternatives considered

- Coupling results to current explorer state: causes stale results to appear associated with new inputs.
- Database or localStorage benchmark history: unnecessary persistence and lifecycle scope for the MVP.

## Rationale

Separate session records preserve evidence and allow comparisons without concurrent table execution.

## Consequences and trade-offs

Results disappear on reload and consume session memory as runs accumulate. Metadata does not guarantee controlled conditions; unknowns and incompatibilities must be visible. Summaries must preserve sample counts, variability, and exclusion reasons.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): MODE-03; BENCH-04 through BENCH-09.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-007 — Benchmarking Architecture](007-benchmarking.md)
- [ADR-010 — Chart Visualization](010-chart-visualization.md)
