# Interactive simulation — Phase 0 contracts

Status: Phase 0 reference kernels and headless contract tests only. **No public
simulation UI, active Worker host, or integration into lessons is available yet.**
See [the in-progress PLAN](../../textbook/plans_progress/DREAM_THEATER_INTERACTIVE_SIMULATION_PLATFORM_PLAN.md).

## Why separate this from the Python lab?

The existing `pages/numerical-lab-runtime.js` and
`numerical-lab-worker.mjs` implement one-shot student code/tests through
Pyodide. Their input/output format and saved progress are unchanged.
The new protocol owns repeated computation and experiment history, while each
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
`retryable`. UI and a real Worker state machine are **Phase 1**, not asserted
to exist by these pure validators.

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

## Phase 1 browser/operational acceptance to measure (not yet measured)

Record test device/browser/version, CPU and available memory, network status,
worker boot duration (DOMContentLoaded → initial ready), first actionable
render latency, parameter-edit → correct generation/render latency, peak heap
where exposed, transferred bytes, frame rate and tab-hidden recovery.
Exercise online cold load, warmed cache, version migration, offline explanatory
failure, repeated navigation and low-memory worker termination. Set actual
thresholds based on baseline measurements rather than claiming a speedup now.
