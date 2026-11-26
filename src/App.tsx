import AppShell from './components/layout/AppShell'

function App() {
  return (
    <AppShell>
      <section aria-labelledby="overview" className="space-y-4">
        <h2 id="overview" tabIndex={-1} className="section-heading">Overview</h2>
        <div className="content-panel">
          <p className="mb-3 text-sm font-semibold text-accent">Synthetic data · Engineering lab</p>
          <h3 className="text-xl font-semibold">Explore the cost of rendering at scale</h3>
          <p className="mt-3 max-w-3xl text-muted">
            Compare functionally equivalent Normal and Optimized transaction interfaces
            under the same conditions. This lab will use synthetic financial records
            to investigate frontend performance and explain engineering trade-offs.
          </p>
          <p className="mt-4 text-sm text-muted">
            Application shell only. Dataset preparation and exploration controls are planned.
          </p>
        </div>
      </section>

      <section aria-labelledby="transaction-explorer" className="space-y-4">
        <h2 id="transaction-explorer" tabIndex={-1} className="section-heading">Transaction Explorer</h2>
        <div className="content-panel">
          <h3 className="font-semibold">Transaction exploration is not implemented yet</h3>
          <p className="mt-2 max-w-3xl text-muted">
            This section will provide access to synthetic transactions and equivalent
            exploration controls for both rendering implementations. No dataset is loaded.
          </p>
        </div>
      </section>

      <section aria-labelledby="benchmarks" className="space-y-4">
        <h2 id="benchmarks" tabIndex={-1} className="section-heading">Benchmarks</h2>
        <div className="content-panel">
          <h3 className="font-semibold">Not Measured</h3>
          <p className="mt-2 max-w-3xl text-muted">
            Benchmark execution is not implemented yet. No performance measurements
            have been collected. Future results will include workload context,
            measurement methods, and limitations.
          </p>
        </div>
      </section>
    </AppShell>
  )
}

export default App
