# Interactive simulation — Phase 0 contracts

Status: Phase 0 reference kernels plus Phase 1 Worker and standalone UI. The
simulation page is assembled under `simulation/index.html` for GitHub Pages.
**Browser end-to-end, cache/offline and performance verification remain open.**
See [the in-progress PLAN](../../textbook/plans_progress/DREAM_THEATER_INTERACTIVE_SIMULATION_PLATFORM_PLAN.md).

## Why separate this from the Python lab?

The existing `pages/numerical-lab-runtime.js` and
`numerical-lab-worker.mjs` implement one-shot student code/tests through
Pyodide. Their input/output format and saved progress are unchanged.
The new runtime owns repeated computation and experiment history, while each
subject owns mathematical units, domain limits, and algorithms.

## Protocol version 1

`pages/simulation/protocol.mjs` exports `validateEnvelope`,
`validateLimits`, `canTransition`, `matchesPendingResponse`, and
`assertJsonSnapshot`. Each request and response carries:

```json
{
  "protocolVersion": 1,
  "type": "runBatch",
  "sessionId": "lesson-1",
  "requestId": "batch-42",
  "generation": 2,
  "engineId": "celev-two-body-verlet-v1",
  "experimentId": "celev-two-body-circular-v1",
  "steps": 100
}
```

An example stale result to **discard**, even if it arrives last:

```json
{
  "protocolVersion": 1,
  "type": "result",
  "sessionId": "lesson-1",
  "requestId": "batch-42",
  "generation": 1,
  "engineId": "celev-two-body-verlet-v1",
  "experimentId": "celev-two-body-circular-v1"
}
```

Pending identity must match all five IDs/version. When resetting or changing
parameters the future Worker host must increase `generation` and invalidate
pending requests. A pause is honored only at a bounded batch boundary. An
unresponsive synchronous Worker must be terminated, not assumed interruptible.
`dispose` is terminal. Error responses need `errorCode`, `message` and
`retryable`. Phase 1 now provides a dedicated Worker host and browser client. The protocol
validator is still a pure function; operation ordering is enforced by the host.

Default upper limits: 1,000 iterations/batch; 100,000 iterations/experiment;
250 ms/batch target; 256 KiB serialized snapshot; 1,000 observations. These are
the initial safety budget, not measured guarantees. Future adapters may request
stricter limits, never larger ones without protocol review. A parent-side
deadline must terminate a blocked Worker. Never interpret sampling count as
simulation time. Reject nonfinite results, invalid parameter distributions,
wrong generation, and unknown protocol versions.

## Acceptance models and independent references

**CELEV, two-body circle:** `m=1, G=1, r=1, dt=0.01`. Initially the masses
are at `(-0.5,0)`, `(+0.5,0)` with velocities `(0,-sqrt(1/2))`,
`(0,+sqrt(1/2))`. Exact energy is `-1/2`, angular momentum `sqrt(1/2)`,
center of mass zero and angular velocity `sqrt(2)`. The
velocity-Verlet numerical scheme must approximately preserve energy on a
finite interval, report `physicalTime` explicitly in time units, and not be
presented as an existence/stability theorem. The eventual CELEV chapter owns
the production Newton/variational kernel; this JS model is an independent
baseline, not a replacement for the planned Python implementation.

**ML1-01, four-cell distribution:** `P(00,01,10,11)=(0.4,0.1,0.1,0.4)`;
the classifier `h(x)=x` is wrong on cells 01 and 10, so the exact population
zero-one risk is `0.1+0.1=0.2`. For a fixed sample count, the empirical risk
is `(count[1]+count[2])/sampleCount`. The xorshift32 algorithm has a
specified replacement state for a seed of zero. This is `computeOnce`, not
time integration: results carry a `sampleCount` but no `physicalTime` or
`epoch`. All computation is client-side and uses no personal data.

The headless test is `npm run validate:simulation-phase0`; the Pages build also
imports this test. It checks message negatives, stale generations, deterministic
seeds, exact risk/energy references, bounded steps and nonfinite snapshots.

## Phase 1 browser acceptance (Chromium on CI)

The `npm run validate:simulation-browser` command launches real Chromium
against a locally assembled Pages build; the Pages validation workflow runs it
as a blocking test. It checks direct-page Service Worker registration, app-shell
precache, network-first refresh of an unchanged URL, offline fetch of the
refreshed content, offline reload with a functioning module Worker, and explicit
failure for a resource not available offline.

It also calculates **100,000 real two-body steps** in bounded Worker batches,
checks that step 100,001 is rejected, and exercises UI pause/resume/cancel/reset.
Responsive/accessibility checks include 360×760 viewport overflow, form labels,
aria-live status, plot description and diagnostic table, distinguishing line
styles, and a real keyboard Enter action.

The CI also emulates **4× CPU throttling**. Example from 2026-10-14,
PR #1390: 100,000 steps took 86 ms in its headless CI environment, and
100 steps under CPU throttling took 4 ms; horizontal overflow was 0 px.
These are **per-run measurements, not published performance guarantees**.
CI runner, browser version and scheduling can change.

**Still open:** physical low-power/mobile device memory and heat, hidden-tab
recovery under actual OS suspension, hands-on NVDA/VoiceOver usability, and
cache migration across separate deployed GitHub Pages releases. The synthetic
cached URL refresh exercises the installed Service Worker, but does not
simulate an actual release update. Never equate a throttle with a real device.

## Phase 1 interactive demo

The [standalone experiment UI](index.html) uses a **real module Worker** to
integrate equal-mass two-body trajectories or sample a finite four-cell
population. Change parameters, initialize, step/batch/auto-run, pause at batch
boundaries, cancel/terminate, zoom the plot, and export/re-import a record.
Imported JSON is re-run with the saved seed and settings; this is not a
promise of identical results across unrelated software versions.

CSV output escapes spreadsheet formula prefixes. JSON is versioned, rejects
nonfinite results and is bounded to 256 KiB. Existing Python numerical labs
remain separate and unchanged.

Tests: `npm run validate:simulation-phase0` and
`npm run validate:simulation-phase1`. Phase 1's Node tests exercise the **real
Worker host dispatch** and the client over an async mock transport, not an
actual browser Worker. An actual-browser acceptance gate now checks navigation, offline fallback,
cache refreshing, keyboard interaction, narrow layout and bounded execution.
Physical-device and screen-reader review remain separate. This prototype's
two-body kernel is JavaScript;
the CELEV PLAN's required independent Python/NumPy engine is a Phase 2 task.
