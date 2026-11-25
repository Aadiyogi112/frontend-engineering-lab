# ADR-011 — Testing Strategy

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

The lab needs functional confidence, dataset parity, and reproducible performance investigation. The current Vite app has lint/type/build checks but no configured automated test stack.

## Decision

Use the approved stack: Jest for unit tests; React Testing Library with Jest for component/integration tests; Cypress for browser E2E tests. Do not use Vitest or Playwright. No test dependencies or configuration are installed by this documentation task.

**Jest unit tests:** deterministic generation and exact dataset sizes; LRU hits/recency/eviction; explorer reducer transitions; search/sort/filter parity, ties, empty queries and no matches; comparison compatibility and percentage edge cases.

**Jest + React Testing Library:** search/filter controls, mode state continuity, theme changes and persistence including storage failures, empty/error states, and key accessibility behavior. Dataset-manager integration should cover stale responses and lifecycle cleanup.

**Cypress E2E:** application navigation, dataset switching, search/sort/filter workflows, Normal/Optimized/Compare mode switching, Light/Dark/System behavior, and browser integration. Verify observable functional behavior and accessible use; Cypress execution duration must not be primary evidence of application performance improvement.

Jest requires appropriate TypeScript/JSX transformation, jsdom configuration for DOM tests, and compatibility with the project's ESM/Vite environment. Worker and style handling require suitable test-environment configuration. These configuration needs do not select an additional transform library in this ADR.

Use Browser Performance API measurements, React profiling, and DevTools for performance investigation under the benchmark protocol. Retain manual responsive, keyboard, assistive-technology, and visual theme review. Eventually add applicable automated test checks to GitHub Actions alongside lint, type checking, and build; changing CI is outside this task.

## Alternatives considered

- Manual testing alone: insufficient regression coverage for deterministic processing and state transitions.
- Vitest and Playwright: not selected; the developer approved Jest/RTL/Cypress explicitly.
- E2E tests for every assertion: higher execution cost and poorer isolation than layered coverage.

## Rationale

Layered tests assign deterministic logic, UI behavior, and browser workflows to suitable tools while separating correctness evidence from performance evidence.

## Consequences and trade-offs

Jest integration with Vite requires explicit configuration and cannot be assumed to work from dependency installation alone. Large all-row workloads can stall browser tests; do not silently shrink a declared workload or count incomplete runs as successes. Functional tests, manual accessibility review, and controlled benchmarks provide complementary evidence, not substitutes for one another.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): AC-01 through AC-11.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-004 — Dataset Generation and Caching](004-dataset-generation-caching.md)
- [ADR-005 — Transaction Processing](005-transaction-processing.md)
- [ADR-006 — Rendering Strategy](006-rendering-strategy.md)
- [ADR-007 — Benchmarking Architecture](007-benchmarking.md)
- [ADR-009 — Design System and Theming](009-design-system-theming.md)
