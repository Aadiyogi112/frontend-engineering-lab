# ADR-001 — Application Architecture

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

The lab needs clear ownership for exploration and measurement without making deployment or maintenance unnecessarily complex. The current application is a minimal React + TypeScript SPA built with Vite.

## Decision

Use one React + TypeScript SPA with feature-based architecture, preserving the existing infrastructure. Separate transaction exploration, benchmarking, shared transaction domain logic, dataset management, and reusable UI. The application shell composes these responsibilities; features must not depend on another feature's internal presentation components.

These are logical boundaries for future implementation, not a source-tree migration performed by this ADR. Avoid microfrontends and unnecessary architectural layers.

## Alternatives considered

- A flat component structure: simple initially, but weak ownership as the experiment grows.
- Microfrontends: independent deployment is unnecessary for this single lab and adds coordination overhead.

## Rationale

Feature ownership makes the system understandable while keeping a straightforward build and deployment model.

## Consequences and trade-offs

Module boundaries require discipline, but do not justify generic frameworks or premature abstractions. Shared domain behavior belongs outside either table so the baseline and optimized versions remain comparable.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): EXP-01 through EXP-07; PAR-07.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-002 — State Management](002-state-management.md)
- [ADR-003 — Data Flow and Component Boundaries](003-data-flow.md)
