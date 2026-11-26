# Financial Transaction Performance Lab — UI Design Specification

**Status:** Approved — implementation pending

This specification defines the Performance Command Center under the approved [requirements](REQUIREMENTS.md) and [architecture](ARCHITECTURE.md). It specifies presentation and interaction without changing architecture, selecting additional dependencies, or claiming measured performance. Tailwind CSS, selective shadcn/ui components, CSS-variable tokens, and Recharts are approved technology directions; approval does not establish installation or implementation.

## 1. Design goals

- Make dataset, implementation, workload, and measurement context immediately understandable to engineers and portfolio reviewers.
- Provide a premium analytical workspace through restrained blue accents, layered surfaces, precise alignment, and readable data density.
- Give Normal and Optimized equal functional capability and neutral visual standing. An optimization may improve, regress, or leave a metric unchanged.
- Distinguish recorded evidence from current explorer selections, preparation, and benchmark execution. Missing observations are never fabricated or rendered as zero.
- Make every approved transaction field and control accessible across desktop, tablet, and mobile, in both resolved themes.

Financial data is synthetic demonstration content. Avoid account balances, revenue summaries, financial recommendations, decorative performance scores, and other unrelated dashboard features.

## 2. Information architecture

Use one SPA with three in-page navigation destinations, without introducing routes:

| Destination | Content and purpose |
| --- | --- |
| Overview | Product introduction, synthetic-data label, current dataset/mode controls, and contextual performance metric cards. |
| Transaction Explorer | Preserved search, sort, filters, matching counts, and the active table in Normal or Optimized. In Compare, show a compact preserved-selection summary and instructions to choose a table mode. |
| Benchmarks | Workload configuration, execution status, recorded results, methods, environment details, and comparison charts where meaningful. |

Sidebar links target stable section anchors. Activation scrolls to and focuses the destination heading; the active destination uses a visible indicator and `aria-current="location"`. Navigation never changes the dataset or implicitly starts a benchmark. All three sections remain addressable in every mode, including the compact Explorer section in Compare.

The application header contains the full product name, a small “Performance Command Center” descriptor, and theme selection. One shared dataset/mode toolbar follows the Overview heading. Avoid duplicate independently controlled selectors in other sections. A skip link leads to main content.

Overview cards describe the selected implementation's recorded metrics in table modes and paired Normal/Optimized observations in Compare. Each card identifies its recorded workload; explorer edits must not relabel historical observations. When no matching evidence exists, show Not Measured and keep prior observations available in Benchmarks under their original context.

## 3. Responsive layouts

Breakpoints below are design proposals for implementation, expressed in CSS pixels. Validate them with actual content, zoom, and translated or enlarged labels; viewport width alone is not a guarantee of fit.

| Range | Layout and purpose |
| --- | --- |
| Mobile: below 640px | Single-column content, 16px page padding, menu button opening modal navigation, stacked workload controls, full-width mode group, one metric card per row, stacked charts. |
| Tablet: 640–1023px | Collapsible navigation, 24px page padding, two metric columns where labels fit, wrapping explorer toolbar, charts stacked unless each has sufficient readable width. |
| Desktop: 1024px and above | Persistent 224px sidebar, flexible main content with 24–32px padding, up to four metric columns, two chart columns when each plot remains readable. |

Main content is fluid with a suggested 1600px maximum width. Use minimum-width-zero grid/flex children to contain overflow. A two-chart layout needs approximately 400px per chart plus its gap; otherwise stack it regardless of breakpoint. Header height starts at 64px and may grow with content. Navigation and document content must remain independently reachable on short viewports.

Desktop arrangement:

```text
Sidebar              Header: product identity                       Theme
  Overview           Overview / synthetic-data context
  Transaction        Dataset [10K / 50K / 100K]
    Explorer         Mode [Normal / Optimized / Compare]
  Benchmarks         Contextual metric cards
                     Transaction Explorer: controls, counts, active table
                     Benchmarks: workload, run status, charts, results
```

Mobile arrangement:

```text
Menu    Product identity    Theme
Overview / synthetic data
Dataset selector
Normal | Optimized | Compare
Metric cards (stacked)
Explorer controls (stacked)
Counts / horizontal-scroll guidance
Transaction table in its own scroll region
Benchmark controls / status
Charts and results (stacked)
```

At narrow widths, the mode group occupies the full available width with three equally sized, wrapping labels. Filters and sort controls wrap into full-width rows; no essential action moves into a hover-only menu. Keep page-level content within the viewport at 320px and at 400% browser zoom, allowing the necessary two-dimensional data-table region to scroll independently.

Keep all eight table columns available through horizontal scrolling; do not hide payment method or other fields on mobile. Order columns as ID, Date, Merchant, Category, Type, Amount, Status, Payment method. Use a compact sticky ID column only when it leaves sufficient space for the other columns; on very narrow screens allow it to scroll too. Provide visible horizontal-scroll guidance and a named keyboard-focusable scroll region. Keep counts, filters, and sort controls outside the horizontal scroller.

## 4. Viewing modes

| Mode | Interface behavior |
| --- | --- |
| Normal | Render all matching rows with the intentionally naive implementation. Show explorer controls, counts, measurement context, and a persistent informational note that all rows render. For 50K/100K, show an accessible Continue/Cancel warning before expensive rendering begins: “Normal renders every matching row. This dataset may make the browser unresponsive.” Wait for explicit Continue before mounting or updating the requested large table. This is a caution policy, not a measured safety threshold; 10K can also be slow. |
| Optimized | Render the same ordered records through the approved row virtualizer. Retain the same controls, values, counts, and accessible sort behavior. Explain virtualization briefly without promising a speedup. |
| Compare | Present recorded paired metrics, compatible charts, run status, workload, and environment. Do not mount explorer tables merely to display results. The Explorer section retains a selection summary; choosing Normal or Optimized restores table exploration. |

Never mount both large tables simultaneously. During sequential benchmark execution, the runner may mount one measured implementation at a time, including when launched from Compare, then clean it up before the next implementation. Hold chart updates until measured work has finished.

Mode switching preserves dataset, search, sorting, and filters. Theme changes also preserve these selections. Changing dataset size retains valid selections; zero matches is a valid result. Reset clears search and filters and restores date descending, retaining dataset, mode, and theme. Scroll position is not an explorer selection: table remounts or changes to the ordered set may return to its start, with focus remaining on the initiating control. Benchmark runs explicitly restore their recorded starting scroll state.

Use labeled radio-group semantics for the segmented mode selector. Arrow keys move among modes; Tab enters/leaves the group. Keep Normal's large-dataset caution next to the selector. A selection requesting a 50K/100K Normal workload remains pending until the warning interaction below completes; selecting a radio option alone must not begin expensive rendering. Do not reduce records, paginate, or substitute Optimized to avoid a stall.

The warning is a modal dialog with an accessible title and description identifying the requested dataset size and responsiveness risk, plus visible Continue and Cancel buttons. Move initial focus to Cancel, contain keyboard focus while open, make the background inert, and treat Escape as Cancel. Present the dialog before committing a mode/dataset change or explorer action that requests a new 50K/100K Normal workload; initial entry must also pass this gate. Keep the requested workload pending without rendering it behind the dialog. Continue closes the dialog, returns focus to the initiating control (or the stable mode selector on initial entry), and proceeds with exactly the requested dataset and explorer configuration. Cancel dismisses the request, restores the prior committed control selections and focus, and starts no new workload; if no table was previously active, retain an idle panel. Neither action silently reduces records or changes implementation.

For a benchmark sequence containing a 50K/100K Normal workload, obtain Continue once for the displayed full configuration before any warm-up or measured rendering begins. Keep this interaction outside all measured intervals; do not prompt between samples of that confirmed sequence. Cancelling this pre-run dialog leaves the benchmark unstarted and produces no measurement. Cancellation after execution starts follows the benchmark lifecycle in Section 8 and may be delayed by a blocked main thread.

## 5. Theme and semantic design tokens

Components consume semantic CSS variables mapped into Tailwind and adopted shadcn/ui primitives. Avoid hardcoded theme colors in individual components. The following values are initial design candidates, including the supplied palette; they are not a claim of WCAG compliance.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | `#F7F9FC` | `#10141E` | Application canvas |
| `--surface` | `#FFFFFF` | `#1B2230` | Cards, table, sidebar |
| `--surface-raised` | `#FFFFFF` | `#242D3E` | Menus, tooltips, modal navigation |
| `--surface-muted` | `#EDF1F7` | `#151C28` | Table header, secondary panels |
| `--foreground` | `#182234` | `#F3F5FA` | Primary text |
| `--foreground-muted` | `#65748A` | `#9DA8BD` | Secondary text, units, annotations |
| `--border-subtle` | `#DCE3EE` | `#344056` | Decorative dividers |
| `--border-control` | `#748198` | `#7B8AA5` | Required input/control boundaries |
| `--accent` | `#4365E8` | `#688BFF` | Primary action and selection |
| `--accent-foreground` | `#FFFFFF` | `#10141E` | Text on solid accent surfaces |
| `--selection-background` | `#E8EDFF` | `#28365A` | Selected navigation/control surface |
| `--hover-background` | `#EEF2FA` | `#263145` | Interactive hover surface |
| `--focus-ring` | `#2547C7` | `#A9BBFF` | Keyboard focus outline |
| `--danger-foreground` | `#A32636` | `#FFB0B9` | Failure text/icons |
| `--danger-background` | `#FFF0F2` | `#3A202B` | Failure notice surface |
| `--warning-foreground` | `#795000` | `#F4CF83` | Caution text/icons |
| `--warning-background` | `#FFF5D8` | `#342B1C` | Caution surface |
| `--success-foreground` | `#176448` | `#8CDCB6` | Successful execution status only |
| `--success-background` | `#E9F7EF` | `#19362E` | Successful execution status surface |
| `--chart-normal` | `#596579` | `#AAB5CA` | Normal series |
| `--chart-optimized` | `#4365E8` | `#688BFF` | Optimized series |
| `--chart-grid` | `#DCE3EE` | `#344056` | Nonessential reference grid lines |

Use muted foreground and a text label for neutral status and Not Measured. Do not use reduced opacity as the only disabled-state cue. Transaction badges derive labels from the documented dataset vocabulary; do not invent status values here. Success colors indicate an actual successful outcome, never that Optimized is inherently better. Comparison direction is stated in words alongside signed differences.

Distinguish chart series with direct labels and shapes or patterns as well as color: Normal uses outlined or patterned marks, Optimized uses solid marks; line charts also use different marker shapes and dash styles. Tooltips consume raised-surface, foreground, and border tokens. Selection, hover, and error styles must preserve legible foreground combinations.

Theme behavior:

- Offer System, Light, and Dark with visible text and an accessible group label. System is the default for absent, invalid, or inaccessible saved preferences; show its resolved appearance in supporting text, such as “System · Dark.”
- Persist only the preference in localStorage, using a stable application-scoped key such as `financial-lab.theme`. Catch read/write failures and keep the current-session selector usable. Benchmark results remain session-memory data.
- System follows device preference changes; explicit Light/Dark overrides them. If device preference detection is unavailable, resolve System to Light. Remove device listeners when no longer needed and on cleanup.
- Resolve the initial appearance before first visible content where feasible. Theme controls and rendered charts must agree on the resolved theme.
- Freeze resolved appearance during a benchmark sequence. Disable manual theme changes with an explanation; queue system changes until cleanup. Record the held theme, then apply the current preference after the run.

Before implementation sign-off, calculate actual foreground/background contrast for both themes and all interactive states, including chart labels, badges, focus rings, and selected controls. Require at least 4.5:1 for normal text, 3:1 for large text, and applicable 3:1 non-text contrast for essential UI boundaries and graphical information. Decorative borders need not carry essential boundaries. Adjust tokens when a combination fails and record tested pairs; inspect forced-colors mode as well. No token table alone establishes compliance.

## 6. Typography, spacing, and responsive guidelines

Use a system sans-serif stack without introducing a font dependency. Use tabular numerals for amounts, metric values, and numeric result columns; use monospace sparingly for IDs and revision identifiers.

| Role | Suggested size / line height | Treatment |
| --- | --- | --- |
| Page title | 28px / 36px; 24px / 32px on mobile | Semibold, one primary heading |
| Section heading | 20px / 28px | Semibold |
| Card title | 14px / 20px | Medium, descriptive metric label |
| Body and controls | 14–16px / 20–24px | Regular; input text preferably 16px on mobile |
| Supporting metadata | 12px / 18px | Use only for secondary information |
| Metric value | 28–32px / 36–40px | Semibold, unit adjacent and readable |
| Table cells | 14px / 20px | Amounts right-aligned; text left-aligned |

Use a 4px spacing base: 4, 8, 12, 16, 24, 32, and 48px. Prefer 16–24px card padding, 16px card gaps, and 24–32px between sections. Controls target a 44px height; table rows start at 48px, with enough room for labels and focus. Rounded controls use 8px radii and cards 12px. Use 1px borders and restrained elevation only for overlays; avoid excessive shadows or gradients.

Keep measurement viewports comparable between implementations. If row sizing changes because of text zoom or wrapping, both tables must accommodate it, and virtualized row measurements must update accordingly. Long IDs and merchant names must remain fully discoverable through wrapping or an accessible focus-triggered disclosure; a clipped cell with a pointer-only tooltip is insufficient.

Use consistent 16–20px outline icons from existing or approved component assets. Pair unfamiliar icons with text; decorative icons are hidden from assistive technology. Do not select a new icon package in this specification. Nonessential transitions should be short, around 120–180ms; disable them, smooth scrolling, skeleton shimmer, and chart animation under reduced motion. Disable chart animation during benchmark presentation updates to avoid suggesting intermediate values are observations.

## 7. Component inventory

Names describe presentation responsibilities within the approved boundaries, not a new directory structure or state architecture.

| Component | Appearance and interaction | Required states |
| --- | --- | --- |
| AppShell | Canvas, sidebar, header, main sections, skip link; contains table overflow within main content. | Desktop, compact navigation, enlarged text, both themes. |
| Sidebar | Product marker and three labeled section links; accent indicator and text weight for active location. Mobile version is a titled modal drawer. | Active, hover, focus, open/closed. |
| Header | Product identity and theme selector; menu trigger below desktop breakpoint; wraps without concealing controls. | Responsive, theme held during a run. |
| ThemeSelector | Labeled System/Light/Dark choice using a native select or accessible adopted primitive; resolved System hint. | Selected, focus, unavailable persistence, disabled during run. |
| DatasetSelector | Labeled 10K/50K/100K choice with full transaction counts available accessibly. | Selected, preparing, ready, failure, locked during run. |
| ModeSwitcher | Equal-width labeled segmented radio group; clear selected surface plus indicator. | Normal, Optimized, Compare, focus, locked during run. |
| MetricCard | Metric name, recorded implementation, value and unit, sample context, method/details link; balanced paired cards in Compare. | Measured, single observation, Not Measured, unsupported, unavailable, incompatible. |
| BenchmarkControls | Workload selector, exact configuration summary, repetition/protocol details, run/rerun and cancel controls. | Ready, invalid, preparing, warming up, running, cancelling, completed, failed/incomplete. |
| ComparisonChart | Labeled duration or count plots, units, series labels, contextual caption, adjacent data table. | Compatible observations, partial/missing series, incompatible, unsupported, narrow layout. |
| BenchmarkResults | Numerical summaries followed by inspectable samples, outcome labels, metadata, limitations, and exclusion reasons. | Empty, completed, partial, interrupted, failed, incompatible. |
| TransactionExplorer | Search/sort/filter toolbar, reset, counts, preparation notice, active table; selection summary in Compare. | Ready, preparing, empty, invalid, failure, benchmark lock, Compare summary. |
| TransactionTable | Identical headers, cell formatting, and sorted order in both implementations; sticky header within bounded scroll area where usable. | All-row Normal, virtualized Optimized, focus, empty, preparing, error. |
| SearchInput | Persistent “Search merchant or transaction ID” label, optional clear action, concise matching hint. | Empty, entered, focus, disabled during run. |
| SortControls | Date/Amount field and ascending/descending choice, synchronized with sortable headers. | Default date descending, other valid orders, focus, disabled. |
| FilterControls | Labeled Status and Type groups with multi-select checkboxes, active-value summary, clear/reset. | Unrestricted, selected values, expanded/collapsed, focus, disabled. |
| StatusBadge | Compact text plus optional semantic icon; neutral, warning, success, or failure treatment based on meaning. | Every documented dataset status and benchmark outcome; unknown value shown safely as text. |
| Loading | Stable panel with descriptive text and optional nonanimated placeholder; never fake numeric metrics or progress. | Dataset preparation, measured-work status, cancellation pending. |
| Empty | “No transactions match these selections,” current filters, and reset action. | Valid zero matches; separate from missing dataset/results. |
| Error | Plain-language cause, affected operation/dataset, and retry action where appropriate. | Preparation failure, invalid configuration, benchmark failure; retained valid historical results remain labeled. |
| NotMeasured | Literal “Not Measured,” reason, and relevant action or method information. | No successful observation or no observation for selected conditions; never a numeric zero. |

## 8. Interaction and state specifications

### Transaction display and processing

Expose exactly `id`, `date`, `merchant`, `category`, `type`, `amount`, `status`, and `paymentMethod`. Display a shared, unambiguous date format; use `DD MMM YYYY` for calendar dates and disclose a consistent timezone if the dataset contains timestamps. Date semantics must follow the documented generator, without interpreting a calendar date through a timezone conversion that shifts its day.

Amounts are non-negative integer paise formatted as INR rupees with two decimals, using the same formatter in both tables. Type explicitly says “Credit · Incoming” or “Debit · Outgoing”; direction must not depend on red/green or an amount sign. Category and payment method are display-only fields. Source status/payment-method options from the dataset definition rather than inventing vocabularies in UI code.

Search matches the entire edge-trimmed, case-insensitive query as a substring of merchant or ID. Empty search is unrestricted. Apply the same input-to-result behavior in both implementations; this design introduces no implementation-specific debounce or deferred processing. Search and filters determine the set; sorting orders it. Multiple values within one filter use OR; status, type, and search combine with AND. Empty filter selections mean unrestricted.

Sort chronologically by date or numerically by paise magnitude, regardless of type, in either direction. Both implementations use the same documented ID tie-break rule. Default to date descending. Sort controls and sortable Date/Amount headers reflect one shared state. Show “Matching [count] of [total] transactions” only for the current prepared dataset; Counts are data totals, not the number of mounted virtual rows.

### Dataset and panel transitions

On a committed dataset change, after Continue when the Normal warning applies, immediately identify the requested size and show “Preparing [size] transactions.” Do not leave old rows or counts presented under the new dataset label. Retain controls and selections; replace the table body with a preparation state until the current request succeeds. A stale worker response must not replace the current dataset. On failure, show the requested size, reason, and Retry. Dataset preparation is distinct from running a benchmark and is outside table timing.

After successful search/filter changes, update counts with a polite, coalesced announcement. Do not announce every row or steal focus. Empty results retain controls and show a Reset explorer action. Reject invalid benchmark input inline, preserve entered values, associate the error with the field, and prevent run start; never silently clamp it into a different workload.

### Benchmark configuration and lifecycle

Before Run, show a readable captured-configuration summary covering dataset identity, seed/version/size, implementation sequence, workload class, initial explorer state, exact action and target settings, repetitions, warm-up policy, and method. Offer only initial-display, merchant/ID search, date/amount sort, and status/type filter workloads under the approved scope. Rerun reuses the recorded configuration and captures current environment metadata; it does not assume that an old environment is still identical.

Rendering-only measurements use already prepared and processed records. End-to-end interaction measurements include the action, shared processing, and resulting rendering. Both exclude dataset preparation, reported separately. The UI must expose metric definitions and boundaries before presenting measured values. Do not label React render/commit duration or an animation-frame boundary as browser paint or user-perceived completion.

Lifecycle presentation is Ready → Preparing → Restoring starting state → Warm-up, if applicable → Running one implementation → Recording/cleanup → Next attempt or Completed. Failed, Interrupted, and Incomplete are visible terminal outcomes. A running label identifies the implementation and attempt ordinal when known; it does not invent percent completion or time remaining.

Lock dataset, mode, explorer inputs, workload settings, and manual theme selection during the controlled sequence, with the explanation “Settings are held constant for this benchmark.” Keep section navigation, status inspection, and Cancel available. Capture viewport and other environment conditions; if a viewport change invalidates a run's conditions, mark the affected observation accordingly instead of presenting a compatible comparison. System theme changes are applied after cleanup as specified above.

Cancel requests interruption and shows “Cancellation requested; waiting for the current browser task.” Main-thread stalls can delay the action and status rendering. Do not promise immediate interruption. Record unsuccessful attempts and reasons, clean up instrumentation and measured tables, restore the user's explorer selections, and then publish charts/results. No chart rendering or updates belong inside measured table intervals.

### Recorded evidence and charts

Keep execution status separate from recorded outcomes. Results are retained only in memory for the current session; show “Results are cleared on reload.” Each result exposes dataset identity, workload/starting state, metric definition/method/boundaries/units, browser and available device context, build/revision, instrumentation, viewport/theme, run order, repetitions, warm-up/cold/warm assumptions, outcome, and limitations. Missing metadata is labeled Unknown or Unavailable with a reason when known.

Compare only compatible successful observations. Dataset identity, workload, starting state, measurement definition and units, environment/build/instrumentation, theme/viewport, and protocol must align. Unknown compatibility information is unverified, not presumed equivalent. Incompatible records may be inspected with explicit reasons, but receive no improvement calculation or grouped chart implying a controlled comparison.

Always show absolute values and units. For lower-is-better metrics only, label reduction as `(Normal - Optimized) / Normal × 100`, requiring compatible values and a nonzero Normal value. Negative reduction is a regression. A zero denominator leaves the percentage unavailable while preserving valid absolute measurements. Do not apply this interpretation indiscriminately to every metric.

Repeated results show all samples or an inspectable sample table, successful/attempted sample counts, the declared summary statistic, variability, and exclusion reasons. Use the benchmark method's documented statistic consistently; if a presentation default is needed, propose median with min–max range and label both explicitly. A single success is labeled “Single observation,” with variability not established. Failed/interrupted/incomplete attempts are excluded from successful summaries but remain visible.

| Visualization | Conditions and presentation |
| --- | --- |
| Duration comparison | Grouped horizontal bars for compatible Normal/Optimized observations of the same metric and workload; axis begins at zero, unit in axis/title, sample context adjacent. Never combine different timing definitions into one series. |
| DOM node comparison | Separate count chart with explicit DOM scope and sampling boundary; distinguish DOM nodes from matching transaction count. |
| Dataset-size trend | Only actual observations at 10K/50K/100K, labeled with dataset identities; other conditions held comparable. Leave missing points absent and disclose them; do not interpolate or connect across missing/incompatible observations. |
| Run/sample detail | Accessible results table is authoritative; optional plots only when sample data and interpretation justify them. |

Provide coverage labels for every candidate: rendering duration, DOM node count, component re-renders, search/filter/sort responsiveness, memory, network, Core Web Vitals, and bundle size. Distinguish Measured, Separately measured, Not Measured, Unsupported, Unavailable, and Not applicable. Give reasons and reproducible method references where applicable. Core Web Vitals and bundle size have broader scopes than table interactions; no network request in a local synthetic workload is not a measured network improvement.

Missing chart data produces a text state and available numerical evidence, not fabricated bars, decorative sample points, or a zero-valued series. Partial results show the measured side and explicitly label the missing side, without a calculated comparison.

## 9. Accessibility requirements

Design and validate against applicable WCAG 2.2 AA requirements; adopted primitives and a virtualizer do not establish conformance.

- Use header, navigation, and main landmarks; one page heading and logically nested section headings. Every input has a persistent accessible label, and related controls use a fieldset/legend or equivalent group labeling.
- Follow visual reading order in keyboard navigation. All controls work without a pointer. Use a visible 2px focus outline with a 2px offset and a contrasting surrounding surface; it must not be clipped or obscured by sticky content. Maintain at least applicable 24px target sizing/spacing, with 44px control targets preferred.
- Modal mobile navigation has a name, trapped focus while open, Escape dismissal, inert background, and focus return to its trigger. Close it after a destination is chosen and move focus to that heading. A desktop resize removes modal behavior without losing focus.
- Use real table headers and cells where possible, with a caption identifying dataset and implementation. Date/Amount header buttons communicate the next action; `aria-sort` on the active column header communicates ascending or descending state. Display-only headers must not look sortable.
- Preserve meaningful table semantics in the virtualized implementation, with accurate logical row count/index information where required by its accessibility structure. Keep spacer elements out of the accessibility tree. Validate the chosen structure with assistive technology rather than assuming ARIA attributes solve virtualization.
- Provide a named, focusable scroll region and keyboard scrolling to every matching record, including first and last. Do not turn every cell into a Tab stop or introduce a spreadsheet-style grid unnecessarily. Retain any focused row element while needed, or deliberately restore focus to the stable scroll region with context before recycling it. No unexplained focus loss is acceptable.
- Validate virtualized access with keyboard and screen-reader use, including scrolling beyond the initially mounted window. Document observed browser-find/printing limitations; resolve blockers to required record access rather than claiming full equivalence without evidence.
- Charts have descriptive captions, series labels, units, and adjacent numerical tables. All information in a pointer tooltip is available without hover. Any interactive chart elements need keyboard operation and accessible names; decorative marks need not create excessive Tab stops.
- Use polite live regions for preparation completion, result-count changes, and benchmark stage transitions. Coalesce rapid changes and avoid per-sample chatter during measured work. Use an alert for an actionable failure once, associate inline errors with fields, and never move focus merely because a result loaded.
- Apply `aria-busy` to the affected region during loading while retaining access to surrounding navigation and controls. Use text for loading when no meaningful progress fraction exists.
- Validate contrast as described in Section 5, non-color-only status/direction, 200% text resize, 400% zoom/reflow, text-spacing overrides, forced colors, and reduced motion in both themes. Screen-reader names must include visible control text.

## 10. UI acceptance criteria

These are future implementation checks, not assertions that the current application passes. Record evidence under the approved testing strategy and obtain developer review before declaring the UI done.

| Check | Observable acceptance evidence | Requirement mapping |
| --- | --- | --- |
| UI-D01 | Overview, Explorer, and Benchmarks are reachable through in-page navigation and keyboard focus without new routes or selection loss. | UI-01, UI-03, PAR-06 |
| UI-D02 | At representative 320px, 640px, 1024px, and 1440px widths, controls do not overlap; navigation is usable; charts/cards adapt; only the wide table region needs horizontal scrolling. Zoom and text-spacing review remains usable. | UI-02, UI-03, AC-06 |
| UI-D03 | All eight fields, INR two-decimal formatting, explicit credit/debit direction, and unambiguous dates are present in both tables, including mobile access to payment method. | DATA-01, DATA-02, EXP-02, AC-02 |
| UI-D04 | Search, both sort fields/directions, ties, status/type combinations, counts, empty results, and Reset behave identically across all three dataset sizes. | PAR-01, PAR-02, PAR-03, PAR-04, PAR-05, PAR-07, AC-03 |
| UI-D05 | Dataset/mode/theme transitions preserve required selections; preparation/errors never display stale rows or relabel old results; stale responses cannot replace the current request. | EXP-05, EXP-07, PAR-06, THEME-07 |
| UI-D06 | Before any requested 50K/100K Normal workload renders, an accessible Continue/Cancel dialog is operable by keyboard and announced with its risk and dataset size. Continue runs the unchanged workload; Cancel/Escape restores prior selections and starts no new work. Benchmark confirmation precedes warm-up/timing and is not repeated between samples. Normal renders all matches; Optimized exposes every match through virtualization; Compare does not mount tables for historical display; benchmark implementations run sequentially. | EXP-06, MODE-01, MODE-02, MODE-03, BENCH-05, AC-05 |
| UI-D07 | System defaults, device updates, explicit overrides, persistence, invalid storage, blocked storage, and held benchmark theme work in both themes without explorer resets. | THEME-01, THEME-02, THEME-03, THEME-04, THEME-07, AC-07 |
| UI-D08 | Keyboard and screen-reader review covers mode selection, drawer, all explorer controls, virtualized scrolling/focus, sort announcements, and chart alternatives; tested token pairs meet applicable contrast targets. | UI-03, THEME-05, THEME-06, AC-06 |
| UI-D09 | Run settings and environment are inspectable; running controls hold conditions constant; cancellations/failures remain visible; preparation and chart work stay outside table timing. | BENCH-02, BENCH-03, BENCH-04, BENCH-05, BENCH-06 |
| UI-D10 | Missing/unsupported/unavailable/not-applicable/incompatible states are distinct, no placeholder performance numbers appear, and percentages require compatible evidence and a nonzero denominator. | MODE-03, BENCH-01, BENCH-09, BENCH-10, AC-09, AC-10 |
| UI-D11 | Recorded workload context survives explorer edits; summaries expose samples, counts, statistic, variability, excluded outcomes and reasons; reload loss is disclosed. | BENCH-07, BENCH-08, AC-08, AC-09 |
| UI-D12 | Charts use real measurements, valid units and non-color distinctions; trends retain dataset identity and do not bridge missing evidence; broader metrics are not mislabeled as table timings. | BENCH-02, BENCH-09, THEME-04, THEME-06, AC-10 |
| UI-D13 | Implementation verification, observed limitations, and developer review are recorded without claiming that documentation-only checks prove UI behavior or performance. | AC-11 |

Use Jest/React Testing Library for configured component/state checks, Cypress for browser functional workflows, and manual keyboard, screen-reader, responsive, and visual review per ADR-011. Controlled performance investigation supplies benchmark evidence; functional-test execution duration does not. Run applicable repository lint, TypeScript, build, and configured tests when application changes are implemented.

## 11. MVP exclusions and implementation dependencies

Exclude additional transaction fields/currencies, search operators or searchable fields beyond merchant/ID, sorting beyond date/amount, and date-range, amount-range, category, or payment-method filtering. Also exclude transaction editing, account/balance views, authentication, real financial integrations, imports/exports, downloads, custom dataset sizes, generation editors, backend persistence, permanent benchmark history, financial analytics, automated cross-device infrastructure, and unsupported speedup targets. Future lab modules remain outside this design.

No new routes, dashboard template, global state framework, dependency installation, application code, infrastructure changes, or deployment are part of this documentation deliverable. Preserve the approved worker/cache, state ownership, shared processing, rendering, benchmark, and testing decisions.

Implementation must document the generator's vocabularies/date semantics and ID tie-break rule; choose and record viewport/overscan settings; implement metric-specific instrumentation and completion boundaries; and validate concrete contrast pairs, responsive fit, and virtualized accessibility. These are pending implementation details under existing decisions, not fabricated benchmark findings. Additional architecture or package choices require the repository's approval process.

## 12. References

- [Project vision](PROJECT.md) — intended audience, portfolio goals, broader metric candidates, and future modules.
- [MVP requirements](REQUIREMENTS.md) — authoritative fields, behavior, themes, benchmark integrity, exclusions, and acceptance criteria.
- [Architecture](ARCHITECTURE.md) — approved boundaries, data flow, lifecycle, technology direction, and trade-offs.
- [Repository instructions](../AGENTS.md) — scope, approval, verification, and Git policies.
- [ADR-001 — Application Architecture](adr/001-feature-based-spa.md) — single feature-based SPA.
- [ADR-002 — State Management](adr/002-state-management.md) — explorer continuity, theme ownership, and separate benchmark state.
- [ADR-003 — Data Flow and Component Boundaries](adr/003-data-flow.md) — responsibility separation.
- [ADR-004 — Dataset Generation and Caching](adr/004-dataset-generation-caching.md) — preparation, identity, worker lifecycle, and stale responses.
- [ADR-005 — Transaction Processing](adr/005-transaction-processing.md) — shared search, sort, filters, and display semantics.
- [ADR-006 — Rendering Strategy](adr/006-rendering-strategy.md) — all-row baseline, virtualization, parity, and accessibility.
- [ADR-007 — Benchmarking Architecture](adr/007-benchmarking.md) — sequential execution, measurement boundaries, outcomes, and repeatability.
- [ADR-008 — Benchmark Results and Comparison](adr/008-benchmark-results.md) — session retention, compatibility, and valid calculations.
- [ADR-009 — Design System and Theming](adr/009-design-system-theming.md) — approved styling technology and theme behavior.
- [ADR-010 — Chart Visualization](adr/010-chart-visualization.md) — Recharts, measured evidence, accessible alternatives, and chart isolation.
- [ADR-011 — Testing Strategy](adr/011-testing-strategy.md) — approved verification tools and manual review responsibilities.
