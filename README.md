# Frontend Engineering Lab

A portfolio project demonstrating production-grade React engineering through practical experiments, measurable performance comparisons, and documented engineering decisions.

Built with React, TypeScript, and Vite, with ESLint and GitHub Actions for quality checks. The current application is a minimal foundation displaying the project heading.

## Planned initial module

The React Performance Lab will compare functionally equivalent baseline and optimized interfaces using deterministic datasets of 10,000, 50,000, and 100,000 records. Optimizations will be justified by measurements under comparable conditions, with results and trade-offs documented. These features are not implemented yet.

See [the project vision and scope](docs/PROJECT.md) for measurement goals and future modules.

## Development

With dependencies installed, run:

```sh
npm run dev
```

## Verification

```sh
npm run lint
npx tsc -b
npm run build
```

Use `npm run preview` to preview the production build locally.
