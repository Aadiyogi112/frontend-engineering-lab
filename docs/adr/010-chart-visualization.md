# ADR-010 — Chart Visualization

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

Benchmark results need understandable visual comparison without disguising missing observations or adding work to measured table intervals.

## Decision

Use Recharts for benchmark comparison charts; it is approved, not installed by this task. Present KPI metric cards, Normal/Optimized duration comparisons, trends across dataset sizes, DOM node-count comparisons, and run/sample details when the required compatible measurements exist. Cards and tables accompany charts; not every display element needs a chart.

Only plot actual measurements with units, meaningful labels, sample context, and visible limitations. A trend may vary dataset size intentionally while holding the other comparison conditions consistent; each plotted point must retain its dataset identity. Do not invent points for unmeasured sizes or connect incompatible observations as a valid trend.

Provide textual or tabular equivalents, accessible non-color-only distinctions, and Light/Dark styles. Missing or incompatible data must show an explanatory state. Keep chart rendering and updates outside the measured table workload; publish chart updates after the measured interval rather than during it.

## Alternatives considered

- Tables alone: accessible numerical detail but less effective visual comparison.
- Custom chart rendering: additional implementation and accessibility effort without an approved need.

## Rationale

Recharts is the approved visualization tool, supported by numerical evidence and accessible alternatives.

## Consequences and trade-offs

Chart code contributes bundle weight and rendering work. Measure and document those costs separately when applicable. Charts cannot fix incompatible measurements, and a visual difference is not proof of a causal improvement.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): MODE-03; UI-03; THEME-04 through THEME-06; BENCH-01, BENCH-09.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-007 — Benchmarking Architecture](007-benchmarking.md)
- [ADR-008 — Benchmark Results and Comparison](008-benchmark-results.md)
- [ADR-009 — Design System and Theming](009-design-system-theming.md)
