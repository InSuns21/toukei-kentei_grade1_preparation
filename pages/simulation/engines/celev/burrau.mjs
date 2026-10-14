// Burrau / Pythagorean 3-body: Newton equations, G=1, no softening.
// Adaptive Dormand-Prince RK5(4). Each public "step" advances a *physical*
// output interval dt, not one arbitrary internal solver step. Near encounters
// are resolved with many independently error-controlled internal steps.
// Sensitive long-time trajectories are illustrative, never rigorous orbits.
export const engineId = "celev-burrau-adaptive-dopri5-v2";
export const experimentId = "celev-burrau-pythagorean-v1";
export const initialEnergy = -769 / 60;
export const warningDistance = 1e-10; // true numerical singularity guard, NOT a softening length
const masses = Object.freeze([3, 4, 5]);
const initialPositions = [[1, 3], [-2, -1], [1, -1]];
const DEFAULT_REL_TOL = 1e-12, MIN_H = 1e-13, MAX_H = 0.1;
const MAX_INTERNAL_ATTEMPTS = 120000; // across one Worker batch; no indefinite blocking
const ENERGY_ERROR_STOP = 5e-5; // absolute invariant discrepancy, not guaranteed global accuracy
// Dormand-Prince embedded 5(4) tableau.
const A = [
  [],
  [1 / 5],
  [3 / 40, 9 / 40],
  [44 / 45, -56 / 15, 32 / 9],
  [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
  [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
  [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84],
];
const B = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
const E = [
  B[0] - 5179 / 57600, 0, B[2] - 7571 / 16695,
  B[3] - 393 / 640, B[4] + 92097 / 339200,
  B[5] - 187 / 2100, -1 / 40,
];

export function validateParameters(p) {
  const errors = [];
  if (!(Number.isFinite(p?.dt) && p.dt >= 0.05 && p.dt <= 0.5)) {
    errors.push("Burrauの表示時間間隔 Δt は0.05以上0.5以下で指定してください");
  }
  if (p?.rtol !== undefined && ![1e-10, 1e-11, 1e-12].includes(p.rtol)) {
    errors.push("許容相対誤差は1e-10、1e-11、1e-12から選んでください");
  }
  return errors;
}
function minimumSeparation(y) {
  let min = Infinity;
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    min = Math.min(min, Math.hypot(y[i * 2] - y[j * 2],
      y[i * 2 + 1] - y[j * 2 + 1]));
  }
  if (!(min > warningDistance) || !Number.isFinite(min)) {
    throw new RangeError("NEAR_ENCOUNTER: singular Newton force (distance <= 1e-10); no regularization is applied");
  }
  return min;
}
function derivative(y) {
  const d = new Float64Array(12);
  for (let i = 0; i < 6; i++) d[i] = y[i + 6];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    const dx = y[j * 2] - y[i * 2], dy = y[j * 2 + 1] - y[i * 2 + 1];
    const r2 = dx * dx + dy * dy;
    if (!(r2 > warningDistance ** 2) || !Number.isFinite(r2)) {
      throw new RangeError("NEAR_ENCOUNTER: unresolved Newton singularity");
    }
    const factor = 1 / (r2 * Math.sqrt(r2));
    const vx = dx * factor, vy = dy * factor;
    d[6 + i * 2] += masses[j] * vx;
    d[7 + i * 2] += masses[j] * vy;
    d[6 + j * 2] -= masses[i] * vx;
    d[7 + j * 2] -= masses[i] * vy;
  }
  return d;
}
function embeddedStep(y, h, rtol) {
  const k = [derivative(y)];
  for (let stage = 1; stage < 7; stage++) {
    const trial = new Float64Array(12);
    for (let component = 0; component < 12; component++) {
      let slope = 0;
      for (let j = 0; j < stage; j++) slope += A[stage][j] * k[j][component];
      trial[component] = y[component] + h * slope;
    }
    k.push(derivative(trial));
  }
  const next = new Float64Array(12);
  let scaledError = 0;
  for (let component = 0; component < 12; component++) {
    let slope = 0, diff = 0;
    for (let j = 0; j < 7; j++) {
      slope += B[j] * k[j][component];
      diff += E[j] * k[j][component];
    }
    next[component] = y[component] + h * slope;
    const allowed = rtol * 0.01 + rtol * Math.max(
      Math.abs(y[component]), Math.abs(next[component]));
    scaledError = Math.max(scaledError, Math.abs(h * diff) / allowed);
  }
  if (![...next, scaledError].every(Number.isFinite)) {
    throw new RangeError("NEAR_ENCOUNTER: nonfinite integrator state");
  }
  return { next, scaledError };
}
function stateVector(s) {
  return Float64Array.from([...s.positions.flat(), ...s.velocities.flat()]);
}
function fromVector(y, s) {
  return {
    ...s,
    positions: Array.from({ length: 3 }, (_, i) => [y[2 * i], y[2 * i + 1]]),
    velocities: Array.from({ length: 3 }, (_, i) => [y[6 + 2 * i], y[7 + 2 * i]]),
  };
}
export function diagnostics(s) {
  const y = stateVector(s);
  const d = minimumSeparation(y);
  let kinetic = 0, potential = 0, angularMomentum = 0;
  const momentum = [0, 0], com = [0, 0];
  for (let i = 0; i < 3; i++) {
    const [x, yy] = s.positions[i], [vx, vy] = s.velocities[i], m = masses[i];
    kinetic += 0.5 * m * (vx * vx + vy * vy);
    angularMomentum += m * (x * vy - yy * vx);
    momentum[0] += m * vx; momentum[1] += m * vy;
    com[0] += m * x / 12; com[1] += m * yy / 12;
    for (let j = i + 1; j < 3; j++) {
      potential -= m * masses[j] /
        Math.hypot(x - s.positions[j][0], yy - s.positions[j][1]);
    }
  }
  const energy = kinetic + potential;
  const binaryDistance45 = Math.hypot(
    s.positions[1][0] - s.positions[2][0],
    s.positions[1][1] - s.positions[2][1]);
  const binaryCenter45 = [
    (4 * s.positions[1][0] + 5 * s.positions[2][0]) / 9,
    (4 * s.positions[1][1] + 5 * s.positions[2][1]) / 9,
  ];
  const escapeDistance3 = Math.hypot(
    s.positions[0][0] - binaryCenter45[0],
    s.positions[0][1] - binaryCenter45[1]);
  // Binding specific energy per reduced mass for masses 4 and 5.
  const dvx = s.velocities[1][0] - s.velocities[2][0];
  const dvy = s.velocities[1][1] - s.velocities[2][1];
  const binarySpecificEnergy45 = (dvx * dvx + dvy * dvy) / 2 -
    (masses[1] + masses[2]) / binaryDistance45;
  const result = {
    energy, initialEnergy, energyDrift: energy - initialEnergy,
    minimumDistance: d, momentum, centerOfMass: com, angularMomentum,
    acceptedSubsteps: s.acceptedSubsteps ?? 0, rejectedSubsteps: s.rejectedSubsteps ?? 0,
    lastInternalDt: s.internalDt ?? s.dt,
    closestEncounter: s.closestEncounter ?? d,
    binaryDistance45, binarySpecificEnergy45, escapeDistance3,
  };
  if (Object.values(result).some(value => typeof value === "number" &&
      !Number.isFinite(value))) {
    throw new RangeError("NEAR_ENCOUNTER: nonfinite diagnostics");
  }
  return result;
}
export function initialize(params) {
  const errors = validateParameters(params);
  if (errors.length) throw new RangeError(errors.join("; "));
  const state = {
    positions: initialPositions.map(p => [...p]),
    velocities: [[0, 0], [0, 0], [0, 0]],
    masses: [...masses], dt: params.dt,
    rtol: params.rtol ?? DEFAULT_REL_TOL,
    stepIndex: 0, physicalTime: 0,
    internalDt: Math.min(params.dt, 0.02),
    closestEncounter: 3, acceptedSubsteps: 0, rejectedSubsteps: 0,
  };
  return { state, diagnostics: diagnostics(state) };
}
export function snapshot(s) {
  return {
    positions: s.positions.map(p => [...p]),
    velocities: s.velocities.map(v => [...v]), masses: [...masses],
    stepIndex: s.stepIndex, physicalTime: s.physicalTime,
    diagnostics: diagnostics(s),
  };
}
export function stepBatch(state, steps, limits = { maxBatchSteps: 1000 }) {
  if (!Number.isSafeInteger(steps) || steps < 1 || steps > limits.maxBatchSteps) {
    throw new RangeError("invalid output frame count");
  }
  const next = {
    ...state, positions: state.positions.map(p => [...p]),
    velocities: state.velocities.map(v => [...v]),
  };
  let y = stateVector(next), t = next.physicalTime;
  let h = next.internalDt, attempts = 0;
  let accepted = next.acceptedSubsteps, rejected = next.rejectedSubsteps;
  let closest = next.closestEncounter;
  const observations = [];
  for (let frame = 0; frame < steps; frame++) {
    const target = (state.stepIndex + frame + 1) * next.dt;
    while (t < target - 1e-12 * Math.max(1, target)) {
      if (++attempts > MAX_INTERNAL_ATTEMPTS) {
        throw new RangeError("RESOURCE_LIMIT: too many adaptive substeps in one batch; request fewer output frames");
      }
      const trialH = Math.min(h, target - t);
      if (trialH < MIN_H) {
        throw new RangeError("NEAR_ENCOUNTER: internal timestep exhausted; trajectory unresolved");
      }
      const { next: candidate, scaledError } = embeddedStep(y, trialH, next.rtol);
      const factor = Math.min(4, Math.max(0.2,
        scaledError === 0 ? 4 : 0.9 * scaledError ** -0.2));
      if (scaledError <= 1) {
        y = candidate;
        t += trialH;
        closest = Math.min(closest, minimumSeparation(y));
        accepted++;
      } else {
        rejected++;
      }
      h = Math.min(MAX_H, Math.max(MIN_H, trialH * factor));
      // The next attempt is still checked against MIN_H; don't silently
      // accept a step that violates the estimated local error tolerance.
      if (h <= MIN_H && scaledError > 1) {
        throw new RangeError("NEAR_ENCOUNTER: cannot resolve local error at minimum step");
      }
    }
    t = target; // within roundoff of the frame target
    next.stepIndex++;
    next.physicalTime = target;
    next.acceptedSubsteps = accepted;
    next.rejectedSubsteps = rejected;
    next.internalDt = h;
    next.closestEncounter = closest;
    const physical = fromVector(y, next);
    next.positions = physical.positions;
    next.velocities = physical.velocities;
    const reading = snapshot(next);
    if (Math.abs(reading.diagnostics.energyDrift) > ENERGY_ERROR_STOP) {
      throw new RangeError("ENERGY_DRIFT: adaptive solver lost invariant accuracy (|ΔE| > 5e-5)");
    }
    observations.push(reading);
  }
  return { state: next, diagnostics: diagnostics(next), observations };
}
