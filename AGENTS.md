# Frontend Engineering Lab

## Project Objective

Build a portfolio-quality React application demonstrating
production-grade frontend engineering through measurable
comparisons between naive and optimized implementations.

The initial module focuses on React performance with
10,000 to 100,000 records.

## Technology Stack

- React
- TypeScript
- Vite
- npm
- ESLint
- GitHub Actions

Use existing dependency versions.
Do not install or upgrade packages without approval.

## Coding Standards

- Prefer functional components and composition.
- Use TypeScript with proper type safety.
- Avoid unnecessary useEffect and memoization.
- Separate business logic from presentation.
- Prefer reusable components and custom hooks where justified.
- Avoid premature abstractions and overengineering.
- Follow WCAG accessibility practices.
- Clean up timers, subscriptions and pending requests.

## Architecture

- Follow feature-based architecture once approved.
- Keep responsibilities clearly separated.
- Reuse existing utilities and components.
- Do not introduce new architectural patterns without approval.
- Read relevant project documentation before implementation,
  when those documents exist.

## Performance Engineering

- Measure before optimizing.
- Preserve intentionally unoptimized implementations.
- Use identical datasets and comparable test conditions.
- Never fabricate benchmark results.
- Document optimization decisions and trade-offs.
- Ensure baseline and optimized versions provide
  equivalent functionality.

## Development Workflow

1. Inspect the existing repository.
2. Understand the assigned task.
3. Explain the proposed implementation.
4. Wait for approval before making changes.
5. Implement only the approved scope.
6. Run applicable verification commands.
7. Summarize changes, results and remaining issues.

Do not modify unrelated functionality.

## Git Strategy

- main: production-ready code.
- develop: integration branch.
- feature/\*: feature implementation.
- chore/\*: maintenance and configuration.
- fix/\*: bug fixes.
- release/\*: release preparation.
- hotfix/\*: urgent production fixes.

Never modify protected branches directly.
Do not commit, push, merge or deploy without approval.

## Verification

Run these commands after applicable code changes:

- npm run lint
- npx tsc -b
- npm run build

Run automated tests once configured.

Never disable tests, lint rules or type checks
just to make verification pass.

## Security

- Never expose secrets in frontend code.
- Never commit credentials or sensitive information.
- Treat external data as untrusted.
- Request approval before infrastructure changes.

## Definition of Done

- Acceptance criteria satisfied.
- Relevant verification checks pass.
- No unrelated changes.
- Known limitations documented.
- Changed files and actual test results reported.
- Developer review completed.
