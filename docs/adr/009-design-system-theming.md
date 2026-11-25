# ADR-009 — Design System and Theming

**Status:** Approved

This record documents a developer-approved decision. Approval does not mean the capability is implemented or its dependencies are installed.

## Context

The lab needs a coherent financial observability dashboard with responsive layouts and accessible Light/Dark/System behavior.

## Decision

Use Tailwind CSS, selectively adopted shadcn/ui components, and CSS variables for reusable design tokens. These technologies are approved but not installed by this task. Do not install an entire dashboard template.

Use original SaaS-style visual design with strong typography, clear hierarchy, clean cards, transaction tables, and analytical charts. Tokens cover reusable semantic colors, spacing, typography, and focus treatments. Support desktop, tablet, and mobile layouts; wide transaction content may scroll in its own region without making unrelated controls inaccessible.

Theme Context owns the selected Light/Dark/System preference separately from its resolved appearance. Default to System when no valid preference exists. Persist the choice in localStorage where available, safely handle invalid or inaccessible storage, and retain session usability on failure. Subscribe to device changes while System is selected and clean up listeners. Explicit Light/Dark choices override the system.

Resolve initial appearance early enough to avoid incorrect-theme flashes where feasible. Theme updates must retain explorer state. Maintain WCAG 2.2 AA requirements applicable to the interface, contrast, keyboard access, visible focus, non-color-only status communication, reduced-motion support, and chart equivalents. Hold theme constant within comparable benchmark runs.

## Alternatives considered

- Entire dashboard templates: unnecessary scope and less original design.
- Entirely custom UI primitives: more accessibility and interaction maintenance.
- A broad component suite: more adoption and styling scope than selective components require.

## Rationale

Shared tokens and selective primitives provide consistency while retaining control over the product design.

## Consequences and trade-offs

Adopted components still need accessibility, theme, and responsive review. Utility styling and component customization require consistent token use. localStorage and system preferences can be unavailable; failure must not block the explorer.

## Related requirements and decisions

- [MVP requirements](../REQUIREMENTS.md): UI-01 through UI-03; THEME-01 through THEME-07.
- [Architecture overview](../ARCHITECTURE.md).
- [ADR-002 — State Management](002-state-management.md)
- [ADR-010 — Chart Visualization](010-chart-visualization.md)
- [ADR-011 — Testing Strategy](011-testing-strategy.md)
