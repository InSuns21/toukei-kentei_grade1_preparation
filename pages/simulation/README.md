# Interactive simulation — Phase 0 contracts

## GEOD geodesy lab (phase-A/B and initial phase-C experiments)

The [GEOD lab](geod.html) is a standalone, read-only/browser-only experiment.
It has no time-stepping session, randomized seed, or imported observation record,
so it uses the same Pages/offline shell but does not impersonate the
simulation Worker protocol. Numerical calculations are pure functions in
geod-core.mjs and the GEOD-specific modules, including geod-survey.mjs,
geod-gnss.mjs and geod-height.mjs;
WebGL2 renders normalized and visibly exaggerated geometry
without feeding drawing coordinates back into the numeric kernel.

* **A**: GRS80 or user-adjusted flattening, ECEF→geodetic inversion, geocentric
  vs geodetic latitude, M/N radii and the orthonormal ENU frame.
* **B**: Karney's sixth-order series ellipsoidal shortest-geodesic inverse
  (GeographicLib 2.2.0, MIT/X11, vendored locally in
  `vendor/geographiclib-geodesic.mjs`), including near- and exact-antipodal
  pairs, plus a numerically stable sampled direct geodesic line for the globe.
  Vincenty's original inverse remains an explicitly labelled comparison:
  it can fail to converge near antipodes even though a shortest geodesic exists.
  The independent Clairaut first-order RK4 acts as a diagnostic where its
  latitude/longitude chart does not cross a pole; it never controls the drawn
  trajectory. Spherical great circles remain a separate reference model.
  The preset (-30°,0°)→(29.9°,179.8°) is checked against the published
  Karney (2013) tables and an Apache SIS independent reproduction. Exact
  antipodal shortest geodesics may have non-unique azimuths.
* **C**: Three switchable, completely synthetic experiments:
  (1) 2D ground surveying with three fixed control stations, three range
  observations, bias and standard deviations, solved by Gauss–Newton weighted
  least squares with residuals, conditional covariance and a 600x-exaggerated
  uncertainty ellipse; (2) local ENU GNSS geometry with 4–6 imaginary satellites
  at adjustable azimuth/elevation, synthetic pseudoranges and receiver clock bias
  B=cΔt in metres. A separate sky plot shows satellite directions and the
  four-unknown nonlinear solver reports B in metres/ns, residuals, GDOP/PDOP/
  HDOP/VDOP/TDOP and formal conditional covariance. The latter uses unit-weight
  Q=(HᵀH)⁻¹ for independent equal-variance pseudorange errors and explicitly
  refuses rank-deficient arrangements. Neither model is real surveying: no
  actual ephemerides, operational satellite/orbit-clock or atmospheric
  corrections, Earth rotation, receiver datum/epoch, integrity or real
  accuracy claims. The GNSS view now
  alternates between a cardinal-direction/elevation sky plot and a rotatable,
  shaded WebGL2 orthographic 3D view of the same **unit sight-line vectors**,
  with lit satellite spheres and soft ground projections to communicate depth.
  Satellite labels are drawn onto an unselectable canvas; a non-selectable SVG
  fallback remains available when WebGL2 is absent. All satellites have an
  artificial equal radius, never actual orbit positions. Staged
  satellite-specific clock offsets, simplified elevation-dependent ionosphere
  and troposphere delays are synthetic additive pseudorange terms. A comparison
  mode subtracts their exact injected values to show an *idealized* upper bound,
  not a viable receiver correction algorithm. DOP remains geometry-only even
  when the estimated position becomes biased.
  (3) A local two-station gravity/height model from GEOD6/GEOD10: choose
  ellipsoidal heights `h` and signed local geoid undulations `N` independently
  at two points 20 km apart, then recover the model's orthometric heights
  `H=h-N`. The 2D section uses distinct vertical/horizontal scales, so its
  geoid/terrain shapes are **not** a physical elevation or gravity grid.
  At each station separately, assume coincident vertical/ellipsoid-normal
  directions and local parallel reference surfaces. Only under those
  assumptions is `h=H+N` exact; elsewhere it is the familiar approximation.
  The independent 1D gravity model is `g(s)=g0-k*s` with upward signed
  distance `s`, hence the geopotential number is
  `C=W0-W(P)=g0*H-k*H²/2`, mean gravity `g0-kH/2`, and dynamic height
  `Hᴰ=C/9.80665`. The stations may have different g0, but the app makes
  **no claim** that their joined section solves a coherent 2D gravity field,
  applies GSI geoid 2024/vertical datum corrections, or yields real heights.
  The SVG section cannot select its text, while the numeric table remains
  accessible independently and needs no WebGL.
* **D**: Local ellipsoidal transverse Mercator (Krüger n-series through n^6),
  spherical limit, central-meridian origin/scale, physical-metric-normalized
  Jacobian, Tissot principal stretches and the grid-north bearing. A separate
  *inverse* beta-series inverts both forward output and user-entered arbitrary
  projected E/Np inputs with the same ellipsoid/origin/k0; the app reports the
  inverse geodetic location and the independent forward-back residual. The
  regional branch and invalid projected coordinates fail explicitly, rather
  than producing misleading coordinates. Tests include the independent PROJ
  Gauss-Boaga published reference, spherical limits, signed values and points
  near the documented 25° longitude-offset boundary.
* **E**: Side-by-side ellipsoidal Mercator, Equal Earth, and Mollweide world
  graticules with a shared map scale, chosen point and enlarged differential
  Tissot indicatrix. The numerical table compares area Jacobians, principal
  scale factors, maximum angular distortion and projected x/y. **All UI inputs
  are GRS80 geodetic latitudes**, and both equal-area maps first apply the
  authalic latitude β determined by the GRS80 ellipsoid area integral q(φ).
  The Mercator comparison uses ellipsoidal isometric latitude rather than the
  former spherical shortcut. The physical ellipse and Jacobian use the true
  tangent metric (M and r=Ncosφ), not the auxiliary-sphere metric. The table
  additionally compares the same physical 1 km² infinitesimal patch with a
  local Gauss–Krüger projection (nearest 6° central meridian, k0=.9999):
  its area ratio is k², versus 1 in Equal Earth/Mollweide. The local map is
  *not* misrepresented as a global graticule. No source datum/epoch conversion
  or full geographical polygon overlay is implied.
* **F**: All 19 GSI Japanese plane rectangular systems, with official
  longitude/latitude origins, north-positive `X` and east-positive `Y`,
  `k0=0.9999` and zero false coordinates. The output is ellipsoidal GRS80
  Krüger `n^6` forward projection with a linked local planar graticule,
  axes/origin/point, sign/distance/scale/grid-convergence numeric table and
  an official-zone-origin marker on the 3D globe. `JGD2011` shows the matching
  EPSG ID only *if* the input geographic coordinates already belong to that
  datum; `GRS80 only` disables datum/EPSG claims while retaining identical
  mathematics. Switching does not transform coordinates or their epoch. The
  simplified region names and 3° warning do **not** check the legally defined
  area of use. Each zone now provides separately its *condensed legal area
  description* from the notice and an explicitly different 3°-offset local
  projection warning. Exact legal membership needs administrative/island
  boundary geometry and is **not automatically asserted** from the distance
  to the central meridian. Additional independent reference data now include
  the GSI official online calculator's zone IX (X=11573.375, Y=22694.980 m)
  *inverse* output and its scale/grid convergence, besides the two existing
  zone II published examples. Source of all 19 origins and X/Y axis directions:
  [GSI ministerial notice](https://www.gsi.go.jp/LAW/heimencho.html).

The surface sphere and ellipsoid are drawn with a twentyfold visual flattening
factor; numerical results use their displayed **physical** flattening.
The 3D surface has viewpoint-dependent Lambertian shading (plus ambient fill)
even when map tiles are disabled. Optional online OpenStreetMap standard XYZ
tiles (z=2) are painted onto the ellipsoid with Web Mercator latitude mapping:
`y=(1-asinh(tan φ)/π)/2`, clamped at ±85.05112878° near the poles.
Only tiles intersecting the current visible hemisphere are fetched; no
prefetch of hidden hemispheres, no bulk download and no offline tile caching
are performed by the lab. Browser HTTP cache headers are honoured. The tile
source is `https://tile.openstreetmap.org/{z}/{x}/{y}.png` and **© OpenStreetMap
contributors** with a copyright link stays visible in map mode. If remote
tiles/CORS/WebGL2 fail, the numeric lab continues with shaded geometry or a
numeric-only fallback. The site's existing offline shell still caches local
JavaScript/HTML/CSS, but does **not** promise any offline basemap.

Lab A keeps the ellipsoid centre **O** inside the ellipsoid in a separate,
reactive meridional SVG section: the opaque 3D globe only draws the outward
continuation of geocentric direction OP from the surface point P. This prevents
a depth-independent line from making the internal centre look as if it floats
on the globe's visible surface. The section uses the same exaggerated visual
flattening as the globe, never the physical value in the numeric table.
The desktop lab uses a **full-viewport-width, two-column workspace**: the
active experiment's parameters stay on the left and its interactive figures
and calculated results stay on the right. Under 1000 px the columns stack
without horizontal overflow. The globe no longer claims the entire content
width regardless of the experiment: A can show the globe next to its
meridional section on wider monitors, **aligning the two drawings at the top**
with the A globe's checkbox/zoom/coordinate tools immediately below its
canvas. B reserves a generous area for the 3D geodesic. D, E and F place
their **2D projected maps first**, with D/F planar figures capped at 860 px
rather than stretching across an ultrawide screen, and a smaller (at most
520 px wide) supplementary 3D globe below; selecting or editing a coordinate
updates the visible map while its controls remain adjacent. All globe map
checkboxes display the checkbox inline with its label, including in narrow
columns. This supersedes the earlier full-width-globe layout rule.
Labs A/B/D/E retain 60–240% **display-only** zoom via controls, mouse wheel
over the globe, or +/- keys (0 resets; arrows still rotate). Lab F starts
at 400% and supports 60–1200%, with a tighter default focus on the Japanese
study point (the F reset key/button returns to 400%). The base globe keeps
OSM XYZ z=2, while Lab F above 250% loads a **bounded 5×5 current-view
window** of Japan GSI standard-map XYZ tiles: a 5×5 local footprint at
z=4, 5, or 6 as the displayed zoom increases. At 1200%, this covers at
least 28° of longitude, preventing a tiny 5.625° inset caused by the former
4×4 / z=8 selection. The lower XYZ level gives each 256px tile enough
geographical coverage for the visible 520px globe, without stretching map
coordinates or fetching the whole world. GPU textures overlay curved,
tessellated ellipsoid patches, and the in-memory cache holds up to 40 tiles;
off-Japan views use the base globe.
Remote tiles are not pre-cached for offline use; loading failures preserve
the shaded globe and the numeric kernel. Both OSM and GSI credits are shown
when the corresponding imagery is active.
The controls next to the globe also offer a compact city/latitude/
longitude editor, synchronized in both directions with the mode's original
fields. For A the canvas sits immediately below its heading and the controls
follow it to align the two illustrations; the primary parameter controls
remain visible in the left column. For F the selected zone is also available beside the globe and
bidirectionally synchronized with the primary zone picker. For B, the learner chooses the start or end point before editing;
for D, choosing a city also moves the comparison central meridian as in the
original controls. Manual nearby-coordinate edits recentre the globe but do
not alter numerical-model parameters; F region tiles follow the viewpoint.

City dropdowns include London, Paris, New York, Tokyo, Osaka, Sapporo, Moscow
and São Paulo using approximate city centres, not surveyed benchmarks. Choosing
a city updates study latitude/longitude and recentres the 3D view; in lab D
the comparison central meridian follows that city. It does not silently
select a real-world EPSG / Japanese planar coordinate reference system.
The local projection rejects inputs beyond 25° from the central meridian,
latitudes beyond 80°, and nonpositive scales. A and B require non-polar
latitude coordinates. No output claims a datum/epoch conversion, survey
accuracy, or a certified Japanese CRS coordinate. Selecting F in a distant
location may therefore produce an explicit local-domain error.

Run the kernel, including height sign/potential integration references,
and city/XYZ/no-WebGL tests with
`npm run validate:simulation-phase0`. They compare distinct
algorithms, analytical spherical/equatorial limits, a Simpson quadrature of
the meridian arc, the independent published PROJ Gauss-Boaga sample, and
domain failures. The Japanese suite independently transcribes and checks all
19 GSI zone origins, tests axis signs, EPSG IDs, scale at the origin and
datum-identification-only behavior. In addition, two independent, published
[GSI numerical conversion examples](https://www.gsi.go.jp/common/000260486.pdf)
(zone II, printed pp. 51–52) check X/Y at 1 mm, true-north direction and
projection scale. The Pages runtime precaches the local lab assets for offline
revisits; numeric tables remain functional if WebGL2 is unavailable.
The `scripts/validate-geod-browser.mjs` CI acceptance uses real Chromium with
software WebGL2, verifies nonuniform shaded pixels, all A–F tabs and C modes,
desktop and 360px layout, mouse-independent keyboard/touch interaction, lost
context recovery, accessible names and numeric fallbacks, and direct offline
revisits plus network-first cache refresh. Live OSM/GSI tile requests are blocked
in CI, so manual device and live-tile cartographic visual QA remains separate.
All six labs have shareable `#lab-A` through `#lab-F` links, with source/target
checking for the GEOD textbook's stable anchors and back-links in the Node suite.

The *educational* numerical features are implemented, including the independent
inverse-Krüger series, high-precision Karney antipodal geodesics, ellipsoidal
authalic-world-map comparison and official Japanese zone II/IX examples.
Remaining for final accessibility acceptance: a real mobile device, live Japan
map tiles and an actual screen-reader session. Explicitly out of scope are
legal-zone boundary polygons, real GNSS corrections, practical datum/epoch
transforms and actual geoid/gravity grids. See the GEOD plan for the evidence
matrix and the separate 22-chapter/formal-figure review still outstanding.

Status: Phase 0 reference kernels plus Phase 1 Worker and standalone UI. The
simulation page is assembled under `simulation/index.html` for GitHub Pages.
GEOD's automated browser and cache/offline acceptance is provided by CI;
physical-device and screen-reader signoff remain open.
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

## CELEV visual identity and Burrau extension (2026-10-14)

The plotted **trails** are not the particles. Their *current* positions are
numbered, white-outlined symbols drawn on top of the trajectory: circle 1,
square 2 and (in three-body mode) triangle 3. The legend repeats the symbols;
solid/dashed/dotted trail patterns avoid reliance on colors alone. The world
coordinate axes use equal x/y distance scale and retain their initial extent
until trajectories exceed it; display zoom does not change the integration dt.

The optional [Burrau three-body supplement](../../textbook/volumes/dream_thater/物理系/CELEV/CELEV8/supplement-burrau.md)
sets m=(3,4,5), q=((1,3),(-2,-1),(1,-1)), v=0 and G=1. The independent
analytic checks are E0=-769/60, zero total momentum/angular momentum and
center of mass at the origin. A separate, **non-softened** JavaScript
adaptive Dormand–Prince 5(4) kernel now traverses non-collisional close
encounters without force softening. Its public dt is an OUTPUT FRAME INTERVAL
(0.05..0.5), while internal accepted/rejected steps satisfy a componentwise
relative-error estimate (default 1e-12), and stop if internal h is exhausted
or absolute energy drift >5e-5. The diagnostic tracks separation of mass 3
from the center of mass of masses 4/5, and their osculating two-body binding
energy. At t=80 the independent benchmark verifies escaping mass 3 and bound
masses 4/5; a second tolerance (1e-11) must agree qualitatively, even though
chaotic trajectories may differ pointwise. This is not a rigorous existence
proof or a replacement for the CELEV Python project.

The Node integration checks initial energy and step halving; Chromium checks
actual 3-body initialization, markers, and a live step.

## CELEV three-body periodic and choreography gallery (2026-10-15)

`orbit-gallery.mjs` adds eight **computed** Newtonian models on the common
Canvas + Worker platform. The first two are choreographies (three equal masses
on the *same* curve, phase-shifted); the collinear Euler relative equilibrium
has a fixed central body and is not a choreography. The others are
equal-mass, zero-angular-momentum periodic-orbit families, *not* automatically
shared-curve choreographies:

| ID | Classification | Period / initial values |
|---|---|---|
| figure-eight | choreography | approx T=6.32591398; q1=(0.97000436,-0.24308753), q2=-q1, q3=0; v1=v2=(0.466203685,0.43236573), v3=-2v1 |
| lagrange | circular choreography | equilateral radius 1, angular velocity 3^(-1/4), exact relative equilibrium |
| euler | Euler collinear relative equilibrium | q=(-1,0),(0,0),(1,0); outer angular velocity sqrt(5/4), middle stationary |
| butterfly-i | periodic family | v1=v2=(0.306893,0.125507), v3=-2v1; approx T=6.234671 |
| butterfly-ii | periodic family | v1=v2=(0.392955223941802,0.0975792352080344); approx T=7.003707 |
| moth-i | periodic family | v1=v2=(0.464445237398184,0.396059973403921); approx T=14.8939 |
| yin-yang-i | periodic family | v1=v2=(0.51394,0.30474); approx T=17.3284 |
| dragonfly | periodic family | v1=v2=(0.080584,0.588836); approx T=21.2710 |

For the last five, q=(-1,0),(1,0),(0,0) and G=m1=m2=m3=1.
All period values are references, **not runtime-enforced constraints**.
The source decimals, especially for Yin-Yang / Dragonfly, may not satisfy
periodic closure to high precision; small energy drift does not establish
periodic closure. The UI shows distance to the initial configuration, which
must only be interpreted as a closure check at approximately one period.

Sources:
- Chenciner & Montgomery, figure-eight orbit (Annals of Mathematics, 2000).
- Šuvakov & Dmitrašinović, Three classes of Newtonian three-body planar periodic
  orbits, Phys. Rev. Lett. 110, 114301 (2013),
  https://doi.org/10.1103/PhysRevLett.110.114301
- Published extended-precision Butterfly II / Moth I initial conditions in
  Li et al. (2014), *On the stability of the three classes of Newtonian
  three-body planar periodic orbits*.

The shared gallery uses error-controlled Dormand-Prince RK5(4) with
unsoftened 1/r² Newtonian gravity, finite bounds, max 120k internal attempts
per batch, and aborts if energy drift exceeds 5e-5. Outputs are at user
selected intervals 0.02/0.05/0.1, never the internal adaptive step.
Node acceptance checks all 8, momentum conservation and finite t=1 energy;
exact Euler/Lagrange closure at reference T; approximate figure-eight closure;
the actual Worker protocol. Browser acceptance checks selection and an
independently simulated trajectory, including a switch from figure-eight
to Butterfly II.

