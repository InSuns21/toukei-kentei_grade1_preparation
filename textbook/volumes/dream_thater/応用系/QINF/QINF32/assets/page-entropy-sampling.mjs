// Reproducible Haar sampling and entropy estimates for QINF32.
// Usage: node page-entropy-sampling.mjs m n samples seed
// The smaller subsystem has dimension 1 <= m <= n, and m <= 8.
const [mArg = '2', nArg = '8', samplesArg = '10000', seedArg = '314159'] = process.argv.slice(2);
const m = Number(mArg);
const n = Number(nArg);
const samples = Number(samplesArg);
const inputSeed = Number(seedArg);

if (![m, n, samples, inputSeed].every(Number.isSafeInteger)
    || m < 1 || n < m || m > 8 || m * n > 512
    || samples < 2 || samples > 1000000
    || inputSeed < 0 || inputSeed > 0xffffffff) {
  throw new Error('Require integers 1<=m<=min(n,8), m*n<=512, 2<=samples<=1e6, uint32 seed.');
}

// xorshift32 + Box-Muller: each complex coefficient is CN(0,1).
let seed = (inputSeed >>> 0) || 0x6d2b79f5;
function uniform() {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return ((seed >>> 0) + 0.5) / 0x100000000;
}
function gaussianComplex() {
  const radius = Math.sqrt(-2 * Math.log(uniform())) / Math.SQRT2;
  const angle = 2 * Math.PI * uniform();
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

// A Hermitian m-by-m matrix H = X+iY is represented by the real symmetric
// 2m-by-2m matrix [X -Y; Y X]; each eigenvalue of H occurs twice.
// Classic symmetric Jacobi rotations suffice for the small m used in the lab.
function symmetricEigenvalues(matrix, size) {
  const a = Float64Array.from(matrix);
  const maxSteps = 40 * size * size;
  let converged = false;
  for (let step = 0; step < maxSteps; step += 1) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < size; i += 1) {
      for (let j = i + 1; j < size; j += 1) {
        const magnitude = Math.abs(a[i * size + j]);
        if (magnitude > largest) {
          largest = magnitude;
          p = i;
          q = j;
        }
      }
    }
    if (largest < 1e-13) {
      converged = true;
      break;
    }
    const app = a[p * size + p];
    const aqq = a[q * size + q];
    const apq = a[p * size + q];
    const tau = (aqq - app) / (2 * apq);
    const t = tau >= 0
      ? 1 / (tau + Math.sqrt(1 + tau * tau))
      : -1 / (-tau + Math.sqrt(1 + tau * tau));
    const c = 1 / Math.sqrt(1 + t * t);
    const s = t * c;
    for (let k = 0; k < size; k += 1) {
      if (k === p || k === q) continue;
      const akp = a[k * size + p];
      const akq = a[k * size + q];
      a[k * size + p] = a[p * size + k] = c * akp - s * akq;
      a[k * size + q] = a[q * size + k] = s * akp + c * akq;
    }
    a[p * size + p] = app - t * apq;
    a[q * size + q] = aqq + t * apq;
    a[p * size + q] = a[q * size + p] = 0;
  }
  if (!converged) throw new Error('Jacobi diagonalization did not converge.');
  return Array.from({ length: size }, (_, i) => a[i * size + i]).sort((x, y) => x - y);
}

function sample() {
  const re = new Float64Array(m * n);
  const im = new Float64Array(m * n);
  let norm2 = 0;
  for (let i = 0; i < m * n; i += 1) {
    [re[i], im[i]] = gaussianComplex();
    norm2 += re[i] * re[i] + im[i] * im[i];
  }
  const size = 2 * m;
  const a = new Float64Array(size * size);
  let purity = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < m; j += 1) {
      let real = 0;
      let imaginary = 0;
      for (let k = 0; k < n; k += 1) {
        const x = i * n + k;
        const y = j * n + k;
        real += re[x] * re[y] + im[x] * im[y];
        imaginary += im[x] * re[y] - re[x] * im[y];
      }
      real /= norm2;
      imaginary /= norm2;
      purity += real * real + imaginary * imaginary;
      a[i * size + j] = real;
      a[i * size + j + m] = -imaginary;
      a[(i + m) * size + j] = imaginary;
      a[(i + m) * size + j + m] = real;
    }
  }
  if (!(purity >= 1 / m - 1e-10 && purity <= 1 + 1e-10)) {
    throw new Error('Invalid reduced-state purity.');
  }
  const doubled = symmetricEigenvalues(a, size);
  const eigenvalues = [];
  for (let k = 0; k < m; k += 1) {
    if (Math.abs(doubled[2 * k] - doubled[2 * k + 1]) > 1e-8) {
      throw new Error('Complex eigenvalues were not duplicated in real embedding.');
    }
    const value = (doubled[2 * k] + doubled[2 * k + 1]) / 2;
    if (value < -1e-9) throw new Error('Non-positive reduced density matrix.');
    eigenvalues.push(Math.max(0, value));
  }
  const trace = eigenvalues.reduce((acc, value) => acc + value, 0);
  if (Math.abs(trace - 1) > 1e-9) throw new Error('Reduced state trace is not 1.');
  const entropy = -eigenvalues.reduce(
    (acc, lambda) => acc + (lambda ? lambda * Math.log2(lambda) : 0), 0
  );
  return [purity, -Math.log2(purity), entropy];
}

function stats() {
  return { count: 0, mean: 0, m2: 0 };
}
function add(stat, value) {
  stat.count += 1;
  const difference = value - stat.mean;
  stat.mean += difference / stat.count;
  stat.m2 += difference * (value - stat.mean);
}
function standardError(stat) {
  return Math.sqrt(Math.max(0, stat.m2) / ((stat.count - 1) * stat.count));
}
const variables = [stats(), stats(), stats()];
for (let k = 0; k < samples; k += 1) {
  const values = sample();
  values.forEach((value, i) => add(variables[i], value));
}
const harmonic = (k) => {
  let total = 0;
  for (let i = 1; i <= k; i += 1) total += 1 / i;
  return total;
};
const pageMean = (harmonic(m * n) - harmonic(n) - (m - 1) / (2 * n)) / Math.LN2;
const purityMean = (m + n) / (m * n + 1);
const entropyLower = Math.log2((m * n + 1) / (m + n));
const [p, s2, s] = variables;
console.log(JSON.stringify({
  m, n, samples, seed: inputSeed,
  theoretical_mean_purity: purityMean,
  empirical_mean_purity: p.mean,
  estimated_purity_standard_error: standardError(p),
  empirical_mean_renyi2: s2.mean,
  estimated_renyi2_standard_error: standardError(s2),
  proven_lower_bound_mean_entropy: entropyLower,
  proven_upper_bound_mean_entropy: Math.log2(m),
  literature_exact_page_mean_entropy: pageMean,
  empirical_mean_entropy: s.mean,
  estimated_entropy_standard_error: standardError(s),
  difference_entropy_vs_page: s.mean - pageMean
}, null, 2));
