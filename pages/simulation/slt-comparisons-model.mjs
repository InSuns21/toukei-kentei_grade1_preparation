// SLT numerical comparisons. All randomness is local and reproducible.
// No theorem is inferred from a Monte Carlo curve.

function assertInteger(name, value, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer in [${min}, ${max}]`);
  }
}

function assertReal(name, value, min, max, includeMin = true) {
  if (!Number.isFinite(value) || (includeMin ? value < min : value <= min) || value > max) {
    throw new RangeError(`${name} must be in ${includeMin ? '[' : '('}${min}, ${max}]`);
  }
}

export function randomGenerator(seed) {
  assertInteger('seed', seed, 0, 4294967295);
  let state = seed >>> 0;
  if (state === 0) state = 0x6d2b79f5;
  let spare = null;
  const uniform = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
  const normal = () => {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return value;
    }
    const u = 1 - uniform();
    const v = uniform();
    const radius = Math.sqrt(-2 * Math.log(u));
    spare = radius * Math.sin(2 * Math.PI * v);
    return radius * Math.cos(2 * Math.PI * v);
  };
  return { uniform, normal };
}

export function meanAndInterval(values) {
  if (!values.length || values.some(value => !Number.isFinite(value))) {
    throw new RangeError('finite nonempty sample required');
  }
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.length > 1
    ? values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1)
    : 0;
  const se = Math.sqrt(variance / values.length);
  return { mean, se, low: mean - 1.96 * se, high: mean + 1.96 * se, count: values.length };
}

export function wilsonInterval(successes, count) {
  assertInteger('count', count, 1, 100000);
  assertInteger('successes', successes, 0, count);
  const z = 1.96;
  const p = successes / count;
  const denominator = 1 + z * z / count;
  const center = (p + z * z / (2 * count)) / denominator;
  const half = z * Math.sqrt(p * (1 - p) / count + z * z / (4 * count * count)) / denominator;
  return { mean: p, low: center - half, high: center + half, count };
}

function bit(mask, x) {
  return (mask >>> x) & 1;
}

export function finiteClassExperiment({ n = 32, classSize = 16, delta = 0.05,
  noise = 0.1, repeats = 100, seed = 42 } = {}) {
  assertInteger('n', n, 1, 3000);
  assertInteger('classSize', classSize, 1, 256);
  assertReal('delta', delta, 0, 1, false);
  assertReal('noise', noise, 0, 0.49);
  assertInteger('repeats', repeats, 2, 1000);
  if (n * classSize * repeats > 20000000) throw new RangeError('simulation budget exceeded: reduce n, M or repeats');
  const rng = randomGenerator(seed);
  const risk = Array.from({ length: classSize }, (_, mask) => {
    let mismatches = 0;
    for (let x = 0; x < 8; x++) mismatches += Number(bit(mask, x) !== Number(x % 3 === 0));
    return noise + (1 - 2 * noise) * mismatches / 8;
  });
  const best = Math.min(...risk);
  const radius = Math.sqrt(Math.log(2 * classSize / delta) / (2 * n));
  const gaps = [], excesses = [], maxDeviations = [];
  let covered = 0;
  for (let repeat = 0; repeat < repeats; repeat++) {
    const counts = new Float64Array(classSize);
    for (let i = 0; i < n; i++) {
      const x = Math.floor(rng.uniform() * 8);
      const target = Number(x % 3 === 0);
      const y = rng.uniform() < noise ? 1 - target : target;
      for (let mask = 0; mask < classSize; mask++) counts[mask] += Number(bit(mask, x) !== y);
    }
    let minimizer = 0, maxDeviation = 0;
    for (let mask = 0; mask < classSize; mask++) {
      counts[mask] /= n;
      if (counts[mask] < counts[minimizer]) minimizer = mask;
      maxDeviation = Math.max(maxDeviation, Math.abs(counts[mask] - risk[mask]));
    }
    covered += Number(maxDeviation <= radius);
    gaps.push(risk[minimizer] - counts[minimizer]);
    excesses.push(risk[minimizer] - best);
    maxDeviations.push(maxDeviation);
  }
  return {
    model: 'uniform X on {0,...,7}; y=1{x mod 3=0} flipped independently with probability noise; H_M = first M eight-bit masks',
    settings: { n, classSize, delta, noise, repeats, seed, test: 'exact population expectation over an independent (X,Y)' },
    assumptions: 'iid samples; finite binary class; 0-1 loss in [0,1]; fixed class independent of sample',
    bound: { radius, guaranteedCoverage: 1 - delta, statement: 'P(sup_h |Rhat(h)-R(h)| <= radius) >= 1-delta' },
    observed: { coverage: wilsonInterval(covered, repeats), maxDeviation: meanAndInterval(maxDeviations),
      ermGeneralizationGap: meanAndInterval(gaps), ermExcessRisk: meanAndInterval(excesses) }
  };
}

export function vcOverfitExperiment({ n = 16, domainSize = 32, repeats = 100,
  testSize = 128, seed = 42 } = {}) {
  assertInteger('n', n, 1, 5000);
  assertInteger('domainSize', domainSize, 2, 2000);
  assertInteger('repeats', repeats, 2, 1000);
  assertInteger('testSize', testSize, 1, 10000);
  const rng = randomGenerator(seed);
  const populationErrors = [], testErrors = [];
  for (let repeat = 0; repeat < repeats; repeat++) {
    const seen = new Uint8Array(domainSize);
    for (let i = 0; i < n; i++) seen[Math.floor(rng.uniform() * domainSize)] = 1;
    let unseen = 0, testErrorsCount = 0;
    for (const flag of seen) unseen += 1 - flag;
    for (let j = 0; j < testSize; j++) testErrorsCount += 1 - seen[Math.floor(rng.uniform() * domainSize)];
    populationErrors.push(unseen / domainSize);
    testErrors.push(testErrorsCount / testSize);
  }
  return {
    model: 'X uniform on D points; Y=1 always; H=all 2^D binary functions; tie-breaking ERM predicts 1 on seen points and 0 on unseen points',
    settings: { n, domainSize, vcDimension: domainSize, repeats, testSize, seed,
      train: 'n iid draws with replacement', test: 'fresh iid testSize draws per replicate' },
    assumptions: 'realizable noiseless binary classification, iid; the displayed memorizing ERM is one possible minimizer, not every ERM',
    theoreticalExpectedRisk: (1 - 1 / domainSize) ** n,
    observed: { trainError: 0, populationRisk: meanAndInterval(populationErrors),
      holdoutTestError: meanAndInterval(testErrors), alwaysOnePopulationRisk: 0 }
  };
}

function solvePositiveDefinite(matrix, rhs, size) {
  const lower = new Float64Array(size * size);
  let maxDiagonal = 0;
  for (let i = 0; i < size; i++) maxDiagonal = Math.max(maxDiagonal, matrix[i * size + i]);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= i; j++) {
      let s = matrix[i * size + j];
      for (let k = 0; k < j; k++) s -= lower[i * size + k] * lower[j * size + k];
      if (i === j) {
        if (!(s > 1e-12 * Math.max(1, maxDiagonal)) || !Number.isFinite(s)) {
          throw new Error('NUMERICAL_UNRESOLVED: near-singular Gram; increase ridge lambda');
        }
        lower[i * size + j] = Math.sqrt(s);
      } else lower[i * size + j] = s / lower[j * size + j];
    }
  }
  const forward = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    let s = rhs[i];
    for (let j = 0; j < i; j++) s -= lower[i * size + j] * forward[j];
    forward[i] = s / lower[i * size + i];
  }
  const result = new Float64Array(size);
  for (let i = size - 1; i >= 0; i--) {
    let s = forward[i];
    for (let j = i + 1; j < size; j++) s -= lower[j * size + i] * result[j];
    result[i] = s / lower[i * size + i];
  }
  return result;
}

export function fitRidge(X, y, n, p, lambda) {
  assertInteger('n', n, 1, 300);
  assertInteger('p', p, 1, 400);
  assertReal('lambda', lambda, 0, 100);
  if (X.length !== n * p || y.length !== n) throw new RangeError('dimension mismatch');
  const primal = p <= n;
  const dimension = primal ? p : n;
  const matrix = new Float64Array(dimension * dimension);
  const rhs = new Float64Array(dimension);
  if (primal) {
    for (let j = 0; j < p; j++) {
      for (let i = 0; i < n; i++) rhs[j] += X[i * p + j] * y[i];
      for (let k = 0; k <= j; k++) {
        let s = 0;
        for (let i = 0; i < n; i++) s += X[i * p + j] * X[i * p + k];
        matrix[j * p + k] = matrix[k * p + j] = s;
      }
    }
  } else {
    rhs.set(y);
    for (let i = 0; i < n; i++) {
      for (let k = 0; k <= i; k++) {
        let s = 0;
        for (let j = 0; j < p; j++) s += X[i * p + j] * X[k * p + j];
        matrix[i * n + k] = matrix[k * n + i] = s;
      }
    }
  }
  for (let i = 0; i < dimension; i++) matrix[i * dimension + i] += n * lambda;
  const coefficients = solvePositiveDefinite(matrix, rhs, dimension);
  if (primal) return coefficients;
  const beta = new Float64Array(p);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < p; j++) beta[j] += X[i * p + j] * coefficients[i];
  }
  return beta;
}

const RATIOS = [0.5, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 2];

export function ridgeSweepExperiment({ n = 30, noise = 0.5, lambda = 0,
  spectrumDecay = 0, repeats = 12, seed = 42 } = {}) {
  assertInteger('n', n, 12, 70);
  assertReal('noise', noise, 0, 3);
  assertReal('lambda', lambda, 0, 5);
  assertReal('spectrumDecay', spectrumDecay, 0, 10);
  assertInteger('repeats', repeats, 2, 100);
  if (n * n * repeats > 250000) throw new RangeError('simulation budget exceeded: reduce n or repeats');
  const rng = randomGenerator(seed);
  const rows = [];
  for (const ratio of RATIOS) {
    const p = Math.max(5, Math.round(ratio * n));
    const eigenvalues = Float64Array.from({ length: p }, (_, j) => 1 / (1 + spectrumDecay * j / 10));
    const signal = Float64Array.from({ length: p }, (_, j) => j < 5 ? 1 / Math.sqrt(5) : 0);
    const training = [], predictive = [];
    let issue = null;
    for (let repeat = 0; repeat < repeats; repeat++) {
      const X = new Float64Array(n * p), y = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        let target = 0;
        for (let j = 0; j < p; j++) {
          const entry = rng.normal() * Math.sqrt(eigenvalues[j]);
          X[i * p + j] = entry;
          target += signal[j] * entry;
        }
        y[i] = target + noise * rng.normal();
      }
      try {
        const beta = fitRidge(X, y, n, p, lambda);
        let train = 0, risk = noise * noise;
        for (let i = 0; i < n; i++) {
          let predicted = 0;
          for (let j = 0; j < p; j++) predicted += X[i * p + j] * beta[j];
          train += (y[i] - predicted) ** 2;
        }
        for (let j = 0; j < p; j++) risk += eigenvalues[j] * (beta[j] - signal[j]) ** 2;
        if (!Number.isFinite(train) || !Number.isFinite(risk)) throw new Error('NUMERICAL_UNRESOLVED: non-finite risk');
        training.push(train / n);
        predictive.push(risk);
      } catch (error) {
        issue = error.message;
        break;
      }
    }
    rows.push({ ratio: p / n, p, requestedRatio: ratio, status: issue ?? 'ok',
      trainingMSE: issue ? null : meanAndInterval(training),
      populationTestMSE: issue ? null : meanAndInterval(predictive) });
  }
  return {
    model: 'X_i iid N(0, diagonal(s_j)); s_j=1/(1+spectrumDecay*j/10); beta*_j=1/sqrt(5) for j<5 else 0; y_i=X_i beta* + N(0,noise^2)',
    settings: { n, ratios: RATIOS, noise, lambda, spectrumDecay, repeats, seed,
      train: 'n iid Gaussian rows', test: 'exact conditional expected squared error on independent Gaussian row and noise' },
    objective: '||X beta - y||^2/n + lambda ||beta||^2; lambda=0 uses OLS for p<=n and minimum-Euclidean-norm interpolation for p>n',
    assumptions: 'independent Gaussian rows/noise, fixed diagonal positive covariance; finite n,p; solver must remain numerically nonsingular',
    rows
  };
}

function networkPredictions(parameters, width, locations) {
  const result = new Float64Array(locations.length);
  const inv = 1 / Math.sqrt(width);
  for (let j = 0; j < width; j++) {
    const a = parameters[3 * j], w = parameters[3 * j + 1], b = parameters[3 * j + 2];
    for (let i = 0; i < locations.length; i++) {
      result[i] += inv * a * Math.tanh(w * locations[i] + b);
    }
  }
  return result;
}

export function tangentKernel(parameters, width, left, right = left) {
  const kernel = new Float64Array(left.length * right.length);
  for (let j = 0; j < width; j++) {
    const a = parameters[3 * j], w = parameters[3 * j + 1], b = parameters[3 * j + 2];
    const phiLeft = left.map(x => Math.tanh(w * x + b));
    const phiRight = right.map(x => Math.tanh(w * x + b));
    for (let i = 0; i < left.length; i++) {
      for (let k = 0; k < right.length; k++) {
        const u = phiLeft[i], v = phiRight[k];
        kernel[i * right.length + k] += (u * v + a * a * (1 - u * u) * (1 - v * v) * (left[i] * right[k] + 1)) / width;
      }
    }
  }
  return kernel;
}

export function trainFiniteNTK({ width, step, iterations, seed }) {
  assertInteger('width', width, 4, 1024);
  assertReal('step', step, 0, 5);
  assertInteger('iterations', iterations, 0, 1000);
  const rng = randomGenerator(seed);
  const trainX = Array.from({ length: 9 }, (_, i) => -1 + i / 4);
  const testX = Array.from({ length: 24 }, (_, i) => -1 + (2 * i + 1) / 24);
  const targets = trainX.map(x => Math.sin(Math.PI * x));
  const testTargets = testX.map(x => Math.sin(Math.PI * x));
  const parameters = Float64Array.from({ length: 3 * width }, () => rng.normal());
  const baseline = parameters.slice();
  const kTrain = tangentKernel(baseline, width, trainX);
  const kTest = tangentKernel(baseline, width, testX, trainX);
  let linearTrain = networkPredictions(baseline, width, trainX);
  let linearTest = networkPredictions(baseline, width, testX);
  const n = trainX.length, invWidth = 1 / Math.sqrt(width);
  for (let iteration = 0; iteration < iterations; iteration++) {
    const predictions = networkPredictions(parameters, width, trainX);
    const errors = predictions.map((value, i) => value - targets[i]);
    const frozenErrors = linearTrain.map((value, i) => value - targets[i]);
    const nextLinearTrain = linearTrain.slice();
    const nextLinearTest = linearTest.slice();
    for (let i = 0; i < n; i++) {
      let update = 0;
      for (let j = 0; j < n; j++) update += kTrain[i * n + j] * frozenErrors[j];
      nextLinearTrain[i] -= step * update / n;
    }
    for (let i = 0; i < testX.length; i++) {
      let update = 0;
      for (let j = 0; j < n; j++) update += kTest[i * n + j] * frozenErrors[j];
      nextLinearTest[i] -= step * update / n;
    }
    linearTrain = nextLinearTrain;
    linearTest = nextLinearTest;
    const changes = new Float64Array(parameters.length);
    for (let j = 0; j < width; j++) {
      const a = parameters[3 * j], w = parameters[3 * j + 1], b = parameters[3 * j + 2];
      let da = 0, dw = 0, db = 0;
      for (let i = 0; i < n; i++) {
        const x = trainX[i], phi = Math.tanh(w * x + b);
        const slope = 1 - phi * phi;
        da += errors[i] * phi;
        dw += errors[i] * a * slope * x;
        db += errors[i] * a * slope;
      }
      changes[3 * j] = step * da * invWidth / n;
      changes[3 * j + 1] = step * dw * invWidth / n;
      changes[3 * j + 2] = step * db * invWidth / n;
    }
    for (let j = 0; j < parameters.length; j++) parameters[j] -= changes[j];
    if (parameters.some(value => !Number.isFinite(value))) throw new Error('NUMERICAL_UNRESOLVED: network diverged');
  }
  const after = networkPredictions(parameters, width, trainX);
  const afterTest = networkPredictions(parameters, width, testX);
  const kAfter = tangentKernel(parameters, width, trainX);
  const mse = (observed, desired) => observed.reduce((total, value, i) => total + (value - desired[i]) ** 2, 0) / observed.length;
  const normInitial = kTrain.reduce((total, value) => total + value * value, 0);
  const normDiff = kTrain.reduce((total, value, i) => total + (kAfter[i] - value) ** 2, 0);
  const drift = Math.sqrt(normDiff / normInitial);
  const discrepancy = Math.sqrt(mse(after, linearTrain));
  const result = { width, step, iterations, seed, drift, linearizationRMSE: discrepancy,
    trainMSE: mse(after, targets), testMSE: mse(afterTest, testTargets),
    frozenKernelTestMSE: mse(linearTest, testTargets) };
  if (Object.values(result).some(value => !Number.isFinite(value))) {
    throw new Error('NUMERICAL_UNRESOLVED: non-finite NTK diagnostics');
  }
  return result;
}

export function ntkSweepExperiment({ width = 16, step = 0.1, iterations = 30,
  repeats = 5, seed = 42 } = {}) {
  assertInteger('width', width, 4, 128);
  assertReal('step', step, 0, 5);
  assertInteger('iterations', iterations, 0, 200);
  assertInteger('repeats', repeats, 2, 20);
  if (width * iterations * repeats > 500000) throw new RangeError('simulation budget exceeded: reduce m, iterations or repeats');
  randomGenerator(seed); // validate seed even before the first run
  const rows = [];
  for (const m of [width, width * 2, width * 4]) {
    const runs = [];
    let issue = null;
    for (let repeat = 0; repeat < repeats; repeat++) {
      try { runs.push(trainFiniteNTK({ width: m, step, iterations, seed: (seed + repeat * 2654435761) >>> 0 })); }
      catch (error) { issue = error.message; break; }
    }
    const summary = metric => issue ? null : meanAndInterval(runs.map(run => run[metric]));
    rows.push({ width: m, status: issue ?? 'ok', drift: summary('drift'),
      linearizationRMSE: summary('linearizationRMSE'), trainMSE: summary('trainMSE'),
      testMSE: summary('testMSE'), frozenKernelTestMSE: summary('frozenKernelTestMSE') });
  }
  return {
    model: 'f_m(x)=sum_j a_j tanh(w_j*x+b_j)/sqrt(m), independent N(0,1) parameters; train x=-1,-.75,...,1; y=sin(pi*x)',
    settings: { width, widths: rows.map(row => row.width), step, iterations, repeats, seed,
      train: '9 fixed nodes in [-1,1]', test: '24 fixed interleaved holdout nodes',
      seeds: Array.from({ length: repeats }, (_, i) => (seed + i * 2654435761) >>> 0) },
    objective: 'L=sum_i(f(x_i)-y_i)^2/(2*n); simultaneous full-batch GD: theta <- theta - step*gradient(L)',
    assumptions: 'two-layer tanh network, finite width and finite steps; frozen empirical NTK from initialization and its discrete-time linearization',
    diagnostics: 'relative Frobenius K_T-K_0 drift; training RMSE between nonlinear f_T and fixed-kernel iteration g_T; independent holdout test MSE',
    rows
  };
}
