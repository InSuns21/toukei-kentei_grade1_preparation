// Burrau / Pythagorean 3-body reference experiment.
// Initial masses 3,4,5 lie opposite triangle sides 3,4,5, all at rest.
// This is a pedagogical fixed-step integrator, NOT a close-encounter solver.
// No softening or collision regularization; unsafe close approaches stop.
export const engineId = "celev-burrau-verlet-v1";
export const experimentId = "celev-burrau-pythagorean-v1";
export const initialEnergy = -769 / 60;
export const warningDistance = 0.15;
const masses = Object.freeze([3, 4, 5]);
const starting = Object.freeze([[1, 3], [-2, -1], [1, -1]]);

export function validateParameters(params) {
  const dt = params?.dt;
  return Number.isFinite(dt) && dt >= 0.0001 && dt <= 0.01 ?
    [] : ["dt must be finite and in 0.0001..0.01"];
}
function distances(positions) {
  const pairs = [];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    pairs.push(Math.hypot(positions[i][0] - positions[j][0],
      positions[i][1] - positions[j][1]));
  }
  return pairs;
}
function guard(positions) {
  const d = Math.min(...distances(positions));
  if (!Number.isFinite(d) || d <= warningDistance) {
    throw new RangeError("NEAR_ENCOUNTER: minimum separation <= 0.15; fixed-step Verlet cannot reliably resolve the close encounter. Stop and use an adaptive/regularized solver.");
  }
  return d;
}
function acceleration(positions) {
  guard(positions);
  const a = Array.from({length: 3}, () => [0, 0]);
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      const dx = positions[j][0] - positions[i][0];
      const dy = positions[j][1] - positions[i][1];
      const inv = 1 / (Math.hypot(dx, dy) ** 3);
      a[i][0] += masses[j] * dx * inv;
      a[i][1] += masses[j] * dy * inv;
      a[j][0] -= masses[i] * dx * inv;
      a[j][1] -= masses[i] * dy * inv;
    }
  }
  return a;
}
export function diagnostics(s) {
  const min = guard(s.positions);
  let kinetic = 0, potential = 0, angularMomentum = 0;
  const momentum = [0, 0], com = [0, 0];
  for (let i = 0; i < 3; i++) {
    const [x,y] = s.positions[i], [vx,vy] = s.velocities[i], m = masses[i];
    kinetic += 0.5 * m * (vx * vx + vy * vy);
    momentum[0] += m * vx; momentum[1] += m * vy;
    angularMomentum += m * (x * vy - y * vx);
    com[0] += m * x / 12; com[1] += m * y / 12;
    for (let j = i + 1; j < 3; j++) {
      potential -= m * masses[j] / Math.hypot(
        x - s.positions[j][0], y - s.positions[j][1]);
    }
  }
  const energy = kinetic + potential;
  const result = { energy, initialEnergy,
    energyDrift: energy - initialEnergy, minimumDistance: min,
    angularMomentum, momentum, centerOfMass: com };
  if (![energy, result.energyDrift, angularMomentum, ...momentum, ...com]
    .every(Number.isFinite)) throw new RangeError("Nonfinite 3-body diagnostic");
  return result;
}
export function initialize(params) {
  const errors = validateParameters(params);
  if (errors.length) throw new RangeError(errors.join("; "));
  const state = {
    positions: starting.map(p => [...p]),
    velocities: [[0,0],[0,0],[0,0]],
    masses: [...masses], dt: params.dt, stepIndex: 0, physicalTime: 0,
  };
  return { state, diagnostics: diagnostics(state) };
}
export function snapshot(s) {
  return { positions: s.positions.map(p=>[...p]),
    velocities: s.velocities.map(v=>[...v]),
    masses: [...masses], stepIndex: s.stepIndex,
    physicalTime: s.physicalTime, diagnostics: diagnostics(s) };
}
export function stepBatch(state, steps, limits = { maxBatchSteps: 1000 }) {
  if (!Number.isSafeInteger(steps) || steps < 1 || steps > limits.maxBatchSteps) {
    throw new RangeError("Invalid steps");
  }
  const s = { ...state, positions: state.positions.map(p=>[...p]),
    velocities: state.velocities.map(v=>[...v]) };
  const dt = s.dt;
  for (let step = 0; step < steps; step++) {
    const a = acceleration(s.positions);
    const nextPositions = s.positions.map((p,i)=>[
      p[0] + dt * s.velocities[i][0] + 0.5 * dt * dt * a[i][0],
      p[1] + dt * s.velocities[i][1] + 0.5 * dt * dt * a[i][1],
    ]);
    const nextA = acceleration(nextPositions);
    s.velocities = s.velocities.map((v,i)=>[
      v[0] + 0.5 * dt * (a[i][0] + nextA[i][0]),
      v[1] + 0.5 * dt * (a[i][1] + nextA[i][1]),
    ]);
    s.positions = nextPositions;
    s.stepIndex++;
    s.physicalTime = s.stepIndex * dt;
    // Reject clear unresolved energy changes, but do not claim small drift
    // proves a trajectory accurate in a chaotic close encounter.
    if (Math.abs(diagnostics(s).energyDrift) > 0.05) {
      throw new RangeError("ENERGY_DRIFT: |E(t)-E(0)| exceeds 0.05; stop and reduce dt");
    }
  }
  const observation = snapshot(s);
  return { state: s, diagnostics: observation.diagnostics,
    observations: [observation] };
}
