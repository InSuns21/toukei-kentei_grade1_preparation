// CELEV acceptance kernel only: two equal masses on a circular orbit.
// This is NOT the variational periodic-orbit solver. G, mass, separation and
// time step are explicit; simulation samples are not existence proofs.
export const engineId = "celev-two-body-verlet-v1";
export const experimentId = "celev-two-body-circular-v1";

export function validateParameters(p) {
  const errors = [];
  for (const name of ["mass", "gravitationalConstant", "separation", "dt"]) {
    if (!Number.isFinite(p?.[name]) || p[name] <= 0) errors.push(name + " must be positive finite");
  }
  if (Number.isFinite(p?.dt) && p.dt > 0.1) errors.push("dt must not exceed 0.1");
  return errors;
}

export function initialize(params, seed = 0) {
  const errors = validateParameters(params);
  if (errors.length) throw new RangeError(errors.join("; "));
  const { mass: m, gravitationalConstant: G, separation: r, dt } = params;
  const speed = Math.sqrt(G * m / (2 * r));
  const state = {
    positions: [[-r / 2, 0], [r / 2, 0]],
    velocities: [[0, -speed], [0, speed]],
    stepIndex: 0,
    physicalTime: 0,
    mass: m, gravitationalConstant: G, dt,
  };
  return { state, diagnostics: diagnostics(state), seedIgnored: seed };
}

function acceleration(positions, mass, G) {
  const dx = positions[1][0] - positions[0][0];
  const dy = positions[1][1] - positions[0][1];
  const dist = Math.hypot(dx, dy);
  if (!(dist > 1e-8) || !Number.isFinite(dist)) {
    throw new RangeError("two-body collision / invalid separation");
  }
  const scale = G * mass / (dist * dist * dist);
  return [[scale * dx, scale * dy], [-scale * dx, -scale * dy]];
}

export function diagnostics(state) {
  const { positions: p, velocities: v, mass: m, gravitationalConstant: G } = state;
  const d = Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]);
  const kinetic = 0.5 * m * v.reduce((sum, a) => sum + a[0] ** 2 + a[1] ** 2, 0);
  const potential = -G * m * m / d;
  const angularMomentum = m * p.reduce(
    (sum, a, i) => sum + a[0] * v[i][1] - a[1] * v[i][0], 0,
  );
  const centerOfMass = [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2];
  const values = [d, kinetic, potential, angularMomentum, ...centerOfMass];
  if (!values.every(Number.isFinite)) throw new RangeError("non-finite two-body diagnostic");
  return { energy: kinetic + potential, angularMomentum, minimumDistance: d, centerOfMass };
}

export function snapshot(state) {
  return {
    stepIndex: state.stepIndex, physicalTime: state.physicalTime,
    positions: state.positions.map((v) => [...v]),
    velocities: state.velocities.map((v) => [...v]),
    diagnostics: diagnostics(state),
  };
}

export function stepBatch(state, steps, limits = { maxBatchSteps: 1000 }) {
  if (!Number.isSafeInteger(steps) || steps <= 0 ||
      steps > limits.maxBatchSteps) throw new RangeError("invalid steps");
  // No in-place mutation: a cancelled/failed batch never corrupts its input.
  const s = {
    ...state,
    positions: state.positions.map((p) => [...p]),
    velocities: state.velocities.map((v) => [...v]),
  };
  const dt = s.dt;
  for (let step = 0; step < steps; step++) {
    const a = acceleration(s.positions, s.mass, s.gravitationalConstant);
    const nextPositions = s.positions.map((p, i) => [
      p[0] + dt * s.velocities[i][0] + 0.5 * dt * dt * a[i][0],
      p[1] + dt * s.velocities[i][1] + 0.5 * dt * dt * a[i][1],
    ]);
    const aNext = acceleration(nextPositions, s.mass, s.gravitationalConstant);
    s.velocities = s.velocities.map((v, i) => [
      v[0] + 0.5 * dt * (a[i][0] + aNext[i][0]),
      v[1] + 0.5 * dt * (a[i][1] + aNext[i][1]),
    ]);
    s.positions = nextPositions;
    s.stepIndex += 1;
    s.physicalTime = s.stepIndex * dt;
  }
  const observation = snapshot(s);
  return { state: s, observations: [observation], diagnostics: observation.diagnostics };
}
