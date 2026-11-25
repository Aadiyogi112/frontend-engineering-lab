# Financial Transaction Performance Lab — MVP Requirements

**Status:** Reviewed — approved scope corrections incorporated; revised document ready for developer review.

This document defines the first module of the Frontend Engineering Lab. It refines the scope in [PROJECT.md](PROJECT.md) into observable product requirements. Approval of this document does not select additional libraries, architecture, UI designs, or optimization techniques. Existing repository policies continue to apply.

Requirement IDs identify related obligations for implementation and acceptance-test traceability. Acceptance criteria reference those IDs; the IDs do not prescribe implementation structure.

## 1. Product objective and target users

Build a professional financial transaction explorer that demonstrates the behavior and performance of functionally equivalent naive and optimized implementations using large synthetic datasets.

The product must let users explore transactions, understand the workload being measured, reproduce benchmark runs, and assess results and limitations without assuming that every optimization improves every metric.

Target users are frontend engineers investigating performance trade-offs, technical reviewers evaluating engineering decisions, and hiring audiences reviewing the portfolio demonstration. This is an engineering lab using financial data as its domain, not a financial advice or accounting product.

## 2. MVP scope and transaction explorer

The explorer must provide:

- **EXP-01:** A dataset selector for 10,000, 50,000, and 100,000 transactions, with the active size clearly identified.
- **EXP-02:** A transaction table containing the fields defined in DATA-01.
- **EXP-03:** Merchant or transaction ID search, date or amount sorting, status or type filters, and a reset action, as defined in PAR-01 through PAR-06.
- **EXP-04:** Total and matching record counts, with the active search, sort, and filter state visible or readily inspectable.
- **EXP-05:** Clear empty-result, preparation, benchmark-running, and failure states where applicable. Invalid input must be explained and must not silently change the workload.
- **EXP-06:** Access to every matching record, regardless of how each implementation presents or renders the dataset.

**DATA-01 — Transaction model:** The initial transaction fields are `id`, `date`, `merchant`, `category`, `type`, `amount`, `status`, and `paymentMethod`. IDs must be unique within a dataset. The only transaction types are `credit` (incoming) and `debit` (outgoing). Status and payment-method vocabularies must be documented as part of the dataset definition. Additional transaction fields are future enhancements.

**DATA-02 — Amount and currency:** All MVP transactions use INR. The `amount` field is a non-negative integer number of paise, where 100 paise equals one rupee. Direction is determined by `type`, not by a negative stored amount: credits are incoming and debits are outgoing. Display amounts in INR with two decimal places and an accessible indication of direction. For example, `amount` of 12345 with `type` of `debit` means an outgoing INR 123.45. A per-record currency field and currency conversion are outside the MVP. Dates must use consistent, unambiguous formatting.

**EXP-07:** Preparation and failures must not display stale data or results as if they belong to the newly selected dataset. Data generation must be distinguishable from transaction exploration and benchmark execution.

## 3. Viewing modes

### MODE-01 — Normal

Normal mode exposes the intentionally naive baseline. It must support all explorer functionality and remain available as the reference implementation. Performance limitations are part of the experiment and must not be hidden by silently substituting the optimized implementation or reducing the requested workload.

Correctness and accessibility fixes may apply to the baseline, but optimization work must preserve its intentionally naive characteristics. Those characteristics and any changes affecting measurements must be documented.

### MODE-02 — Optimized

Optimized mode exposes the same transaction data and explorer behavior. Optimization decisions must be justified by measurements and documented with their trade-offs. This document does not prescribe optimization techniques or require a measured improvement before evidence exists.

### MODE-03 — Compare

Compare mode must present actual Normal and Optimized results through numerical summaries and comparison charts where meaningful. It must identify the dataset, workload, environment, and run details associated with each result.

Comparison must support sequential benchmark execution or retained results from compatible runs. It must not require both large table implementations to run simultaneously. The inactive implementation must not contribute background work during a measured run.

Missing results must be labeled as not measured. Incompatible runs must be identified and must not produce an apparently valid improvement calculation. Absolute values and units must remain available alongside any derived difference; percentages require valid, comparable measurements and a nonzero denominator.

## 4. Professional responsive dashboard

**UI-01:** The interface must have a consistent visual hierarchy separating the module identity, dataset and mode controls, explorer controls, transaction results, and benchmark information. Typography, spacing, alignment, monetary formatting, and status treatments must be consistent.

**UI-02:** The dashboard must remain usable on narrow mobile, tablet, and desktop viewports. Controls and summaries must adapt without overlapping or becoming inaccessible. Wide transaction content may scroll within a clearly identifiable region, but must not force unrelated dashboard content off screen. Essential transaction information must remain accessible on narrow screens.

**UI-03:** Users must be able to operate controls and inspect results using a keyboard. Controls need accessible names, tables need understandable headers and sort state, and focus must remain visible and predictable when modes or results change. Status changes must be conveyed accessibly without excessive announcements. Charts must have equivalent textual or tabular results.

## 5. Theme and accessibility

- **THEME-01:** Provide Light, Dark, and System theme choices. System is the default when no valid saved choice exists.
- **THEME-02:** System mode must follow the current device preference and respond when that preference changes. Explicit Light or Dark choices must override the system preference.
- **THEME-03:** Persist the user's selected choice across reloads and subsequent visits where local persistence is available. A storage failure must leave theme controls usable for the current session.
- **THEME-04:** Apply the resolved theme consistently to controls, transaction content, charts, tooltips, focus indicators, and state messages. Avoid a distracting incorrect-theme flash during initial display where feasible.
- **THEME-05:** Meet WCAG 2.2 AA requirements applicable to the interface, including text and non-text contrast, keyboard access, focus visibility, and accessible names in both themes.
- **THEME-06:** Do not rely on color alone to communicate transaction status, direction, errors, or comparison outcomes. Respect reduced-motion preferences for nonessential animation.
- **THEME-07:** Theme changes must preserve the dataset and explorer state. Theme and other visual conditions must remain consistent within a benchmark comparison.

## 6. Deterministic synthetic datasets

**DATA-03:** Provide datasets containing exactly 10,000, 50,000, and 100,000 records. All records must be synthetic and must not include real financial or personal information.

**DATA-04:** Document the seed, generation version, field definitions, value ranges, category, status, and payment-method vocabularies, date range, INR/paise rules, and distributions. The same seed, size, and generation version must reproduce the same records, values, and initial ordering. Generation must not depend on the current date or unrecorded randomness.

**DATA-05:** Data must contain varied merchants, categories, transaction types, amounts, dates, statuses, and payment methods suitable for representative search, sorting, and filter workloads, including ties and searches with no matches.

**DATA-06:** Normal and Optimized must receive identical data for a given dataset configuration. Exploration must not mutate the underlying dataset. Benchmark records must include enough dataset identity information to verify comparability. If generation changes, results from different versions must remain distinguishable.

## 7. Functional parity

Both implementations must obey the same user-visible rules:

- **PAR-01 — Search:** case-insensitive substring matching across merchant or transaction ID only. Trim leading and trailing whitespace; an empty query applies no search restriction. Match the complete normalized query within any one searchable field.
- **PAR-02 — Sort:** allow ascending and descending ordering by date or amount only. Dates must sort chronologically by their underlying values; amounts must sort numerically by the stored paise magnitude, regardless of transaction type. Equal values must use transaction ID as a deterministic tie-breaker, with an identical documented ID ordering rule in both implementations. The default order must be transaction date descending, with the same tie-breaker.
- **PAR-03 — Filters:** support status and type only. An empty selection applies no restriction. Multiple selected values within one filter match any selected value; status, type, and search combine using AND.
- **PAR-04 — Composition:** search and filters determine the matching set; sorting determines its order. Counts must reflect that same matching set.
- **PAR-05 — Reset:** clear search and filters and restore the default sort while retaining the selected dataset, viewing mode, and theme.
- **PAR-06 — State continuity:** switching between Normal, Optimized, and Compare must retain dataset and explorer selections. Changing dataset size must retain valid explorer selections and recalculate results, including valid empty results.

**PAR-07:** For the same dataset and explorer state, both implementations must return identical matching transaction IDs, ordering, counts, and displayed values. Internal execution and rendering approaches may differ; silently dropping records or simplifying functionality to improve measurements is not allowed.

## 8. Performance benchmarking

### Measurement integrity

**BENCH-01:** Only actual observations may be presented as measured results. Do not ship fabricated benchmark values, promised speedups, or unsupported performance targets. Illustrative content, if used outside measured results, must be clearly identified and must not be mixed into comparisons.

**BENCH-02:** Every reported metric must have a documented definition, unit, collection method, start and end boundaries, and relevant limitations. Distinguish application timings from rendering, paint, and user-perceived completion; one must not be presented as another without supporting measurement.

**BENCH-03:** The benchmark must measure applicable initial transaction-display work and merchant/ID search, date/amount sort, and status/type filter interactions. Define completion consistently for both implementations. Dataset generation, setup, and instrumentation overhead must be identified and either consistently included or separately reported.

### Equivalent workloads

**BENCH-04:** Each comparison must use the same dataset identity, initial explorer state, action sequence, search query, filter values, sort settings, and completion criteria. Record build configuration, application revision when available, browser/version, device or hardware context, viewport, theme, instrumentation, and other known conditions affecting comparability. Missing environment information must be identified rather than invented.

**BENCH-05:** Run the implementations sequentially in comparable conditions. Do not change dataset size, skip work, or alter completion criteria when one implementation is slow. Interrupted, failed, or incomplete runs must be labeled and excluded from successful-run summaries; they must never appear as zero-duration successes.

### Repeatability and reporting

**BENCH-06:** Provide a documented procedure for rerunning a workload and repeating a comparison. Record run order, repetitions, warm-up policy, and any cold or warm state assumptions. Restore the defined starting state before each measured workload and prevent leftover work from contaminating subsequent runs.

**BENCH-07:** Show sample count and individual results or an inspectable equivalent, alongside a documented summary statistic and a measure of variability when multiple samples exist. Do not select only favorable samples. If exclusions occur, record their reasons. Single-run results must be labeled as single observations.

**BENCH-08:** Retained results must preserve their run metadata and remain visibly associated with their original workload when current explorer settings change. Retention within the current session is sufficient for the MVP; permanent benchmark history is not required.

### Metric coverage and limitations

The broader project identifies rendering duration, DOM node count, component re-renders, search/filter responsiveness, memory consumption, network performance, Core Web Vitals, and bundle size as measurement candidates.

**BENCH-09:** For each candidate, document whether it is measured in the lab, collected through a separate reproducible procedure, unsupported in the current environment, not applicable to the workload, or not yet measured. Sorting responsiveness must also be covered by the interaction workloads.

In particular:

- Memory and component-level observations must disclose collection support and instrumentation requirements.
- Network metrics may be not applicable to locally generated transaction workloads; absence of a request is not a measured network improvement.
- Core Web Vitals and bundle size must not be presented as per-table interaction measurements. Any comparison must explain its scope and attribution limits.
- Unsupported or unavailable metrics must display a clear label and reason, never a fabricated value or misleading zero.

**BENCH-10:** Document optimization decisions, measured outcomes, regressions, and trade-offs. A valid result may show no improvement or a regression; accuracy and reproducibility determine acceptance, not a predetermined speedup.

## 9. MVP acceptance criteria

The MVP is ready for developer review when all of the following are demonstrated with recorded verification evidence:

- **AC-01 (DATA-03 through DATA-06):** All three dataset sizes produce the exact required record counts. Repeated generation with identical configuration reproduces the same data and ordering.
- **AC-02 (DATA-01, DATA-02, EXP-01 through EXP-07, PAR-01 through PAR-05):** The explorer exposes exactly the approved transaction fields, including payment method, and uses only credit/debit types and non-negative integer paise amounts displayed in INR with two decimal places and clear direction. Counts, merchant/ID search, date/amount sorting, status/type filters, reset, validation, and empty-result behavior work as specified.
- **AC-03 (PAR-01 through PAR-04, PAR-07):** Normal and Optimized return identical IDs, ordering, counts, and values for representative searches, each filter, combined filters, both date and amount sort directions, ties, and no-match cases across all three sizes.
- **AC-04 (MODE-01, MODE-02, BENCH-10):** Normal retains its documented naive behavior. Optimized decisions and trade-offs are documented with actual supporting measurements.
- **AC-05 (MODE-03, PAR-06):** Mode switching preserves explorer state. Compare can display compatible sequential-run results without requiring simultaneous execution of both large tables.
- **AC-06 (UI-01 through UI-03, THEME-05, THEME-06):** The dashboard is usable at representative mobile, tablet, and desktop widths, with no inaccessible controls or overlapping essential content. Keyboard and accessibility review covers the explorer, mode controls, benchmark results, and both themes.
- **AC-07 (THEME-01 through THEME-07):** Light, Dark, and System work as specified, including system preference changes, reload persistence, unavailable storage, and accessible chart and status communication.
- **AC-08 (BENCH-03 through BENCH-07):** Benchmark evidence covers the defined initial-display, search, sort, and filter workloads for both implementations at all three sizes. Repeated attempts follow the documented procedure; failures or incomplete runs remain visible and are not represented as successful measurements.
- **AC-09 (MODE-03, BENCH-02, BENCH-07 through BENCH-09):** Every displayed result includes units and traceable workload/run context. Repeated results disclose sample count and variability; unsupported, missing, incompatible, and not-applicable metrics are clearly distinguished.
- **AC-10 (BENCH-01, BENCH-10):** No performance improvement is claimed without comparable measurements. There is no invented time, memory, frame-rate, or percentage-improvement threshold for acceptance.
- **AC-11 (Repository verification and review policies):** Applicable repository verification checks pass, known limitations are documented, no unrelated functionality is changed, and developer review is completed before the MVP is declared done.

## 10. Explicit exclusions and future enhancements

The following are outside this MVP:

- Additional transaction fields, including descriptions and per-record currency, and multi-currency support.
- Advanced search beyond merchant/ID substring matching, including additional searchable fields and query operators.
- Sorting by fields other than date or amount.
- Date-range, amount-range, category, or payment-method filtering.
- Real bank, payment-provider, or financial-account integrations and live financial data.
- Authentication, authorization, user accounts, and multi-user collaboration.
- Creating, editing, deleting, reconciling, or submitting transactions.
- Backend data persistence, server-side transaction processing, and permanent benchmark history.
- Import/export workflows, downloadable reports, and user-provided datasets.
- Currency conversion, budgeting, forecasting, fraud detection, accounting, and advanced financial analytics.
- Custom dataset sizes beyond the three required sizes and a user-facing dataset-generation editor.
- Automated cross-device benchmark infrastructure, production telemetry, or performance regression thresholds before a supported measurement baseline exists.
- The future project modules: large-scale API orchestration, a dedicated memory leak detection and cleanup lab, application resilience, enterprise security, and reusable component architecture.

These exclusions do not remove the obligation to handle errors, clean up ongoing work, protect data, or provide accessible behavior within the MVP. Deployment and broader portfolio publication remain separate deliverables requiring their own authorization.
