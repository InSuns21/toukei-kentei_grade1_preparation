// ML2-14: a two-unit ReLU network, reverse-mode gradient and independent finite differences.
// The seven scalar parameters are deliberately kept explicit for educational inspection.
export const parameterNames = ["w11", "w12", "b11", "b12", "v1", "v2", "b2"];
export const defaultParameters = Object.freeze({
  w11: 1, w12: -0.5, b11: 0.2, b12: 0.7, v1: 2, v2: -1, b2: 0.1
});
export const defaultInputs = Object.freeze({ x: 1, target: 1.3, h: 0.0001 });
const relu = x => Math.max(0, x);

export function forward(parameters, x, target) {
  const p = parameters;
  if (![...parameterNames.map(name => p[name]), x, target].every(Number.isFinite)) {
    throw new RangeError("parameters, x and target must be finite");
  }
  const z = [p.w11 * x + p.b11, p.w12 * x + p.b12];
  const a = z.map(relu);
  const y = p.v1 * a[0] + p.v2 * a[1] + p.b2;
  const residual = y - target;
  return { z, a, y, residual, loss: residual * residual / 2 };
}

export function reverseGradient(parameters, x, target) {
  const state = forward(parameters, x, target);
  // This is an implementation convention at z=0, not a classical derivative.
  const derivative = state.z.map(z => z > 0 ? 1 : 0);
  const hiddenDeltas = [
    state.residual * parameters.v1 * derivative[0],
    state.residual * parameters.v2 * derivative[1]
  ];
  return {
    ...state, derivative, hiddenDeltas,
    kink: state.z.some(z => z === 0),
    gradient: {
      w11: hiddenDeltas[0] * x, w12: hiddenDeltas[1] * x,
      b11: hiddenDeltas[0], b12: hiddenDeltas[1],
      v1: state.residual * state.a[0], v2: state.residual * state.a[1],
      b2: state.residual
    },
    inputGradient: hiddenDeltas[0] * parameters.w11
      + hiddenDeltas[1] * parameters.w12
  };
}

export function gradientCheck(parameters, x, target, h) {
  if (!Number.isFinite(h) || h <= 0 || h > 1) {
    throw new RangeError("h must be in (0,1]");
  }
  const analytic = reverseGradient(parameters, x, target);
  const rows = parameterNames.map(name => {
    const positive = { ...parameters, [name]: parameters[name] + h };
    const negative = { ...parameters, [name]: parameters[name] - h };
    const plus = forward(positive, x, target);
    const minus = forward(negative, x, target);
    const finiteDifference = (plus.loss - minus.loss) / (2 * h);
    return {
      name, reverse: analytic.gradient[name], finiteDifference,
      absoluteDifference: Math.abs(analytic.gradient[name] - finiteDifference),
      crossedKink: plus.z.some((z, j) => z * minus.z[j] <= 0)
    };
  });
  return {
    ...analytic, rows,
    maxAbsoluteDifference: Math.max(...rows.map(row => row.absoluteDifference))
  };
}
