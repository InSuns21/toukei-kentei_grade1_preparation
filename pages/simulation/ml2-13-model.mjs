// ML2-13: deterministic construction of ReLU hinge networks and tent compositions.
// No optimizer or sampling is hidden in these functions.
export const relu = value => Math.max(0, value);

export function targetValue(kind, x) {
  if (!Number.isFinite(x)) throw new RangeError("x must be finite");
  if (kind === "quadratic") return x * x;
  if (kind === "absolute") return Math.abs(x - 0.5);
  if (kind === "tent") return Math.max(0, 1 - 2 * Math.abs(x - 0.5));
  if (kind === "double-tent") return tentIterate(x, 2);
  throw new RangeError("unknown target");
}

export function interpolationNetwork(kind, segments) {
  if (!Number.isInteger(segments) || segments < 1 || segments > 64) {
    throw new RangeError("segments must be an integer from 1 to 64");
  }
  const knots = Array.from({ length: segments + 1 }, (_, i) => i / segments);
  const values = knots.map(x => targetValue(kind, x));
  const slopes = Array.from({ length: segments }, (_, i) =>
    (values[i + 1] - values[i]) * segments);
  const outputWeights = slopes.map((s, i) => i === 0 ? s : s - slopes[i - 1]);
  function predict(x) {
    if (!Number.isFinite(x)) throw new RangeError("x must be finite");
    return values[0] + outputWeights.reduce((sum, w, i) => sum + w * relu(x - knots[i]), 0);
  }
  return { kind, knots, values, slopes, outputWeights, predict };
}

export function evaluateInterpolation(kind, segments, evaluationCount = 1001) {
  if (!Number.isInteger(evaluationCount) || evaluationCount < 2 || evaluationCount > 10001) {
    throw new RangeError("invalid evaluationCount");
  }
  const net = interpolationNetwork(kind, segments);
  const trainMse = net.knots.reduce((acc, x, i) =>
    acc + (net.predict(x) - net.values[i]) ** 2, 0) / net.knots.length;
  let evaluationSum = 0;
  let evaluationMax = 0;
  const points = [];
  for (let i = 0; i < evaluationCount; i++) {
    const x = i / (evaluationCount - 1);
    const target = targetValue(kind, x);
    const predicted = net.predict(x);
    const error = predicted - target;
    points.push({ x, target, predicted });
    evaluationSum += error * error;
    evaluationMax = Math.max(evaluationMax, Math.abs(error));
  }
  return {
    ...net,
    points,
    trainMse,
    evaluationMse: evaluationSum / evaluationCount,
    sampledMaximumError: evaluationMax,
    quadraticExactMaximum: kind === "quadratic" ? 1 / (4 * segments * segments) : null
  };
}

export function tent(x) {
  if (!Number.isFinite(x)) throw new RangeError("x must be finite");
  return 2 * relu(x) - 4 * relu(x - 0.5) + 2 * relu(x - 1);
}

export function tentIterate(x, depth) {
  if (!Number.isInteger(depth) || depth < 1 || depth > 8) {
    throw new RangeError("depth must be an integer from 1 to 8");
  }
  let y = x;
  for (let i = 0; i < depth; i++) y = tent(y);
  return y;
}

export function foldNetwork(depth, evaluationCount = 1001) {
  if (!Number.isInteger(depth) || depth < 1 || depth > 8) {
    throw new RangeError("depth must be an integer from 1 to 8");
  }
  if (!Number.isInteger(evaluationCount) || evaluationCount < 2 || evaluationCount > 10001) {
    throw new RangeError("invalid evaluationCount");
  }
  return {
    depth,
    pieces: 2 ** depth,
    breakpoints: Array.from({ length: 2 ** depth - 1 }, (_, i) => (i + 1) / (2 ** depth)),
    points: Array.from({ length: evaluationCount }, (_, i) => {
      const x = i / (evaluationCount - 1);
      return { x, predicted: tentIterate(x, depth) };
    })
  };
}
