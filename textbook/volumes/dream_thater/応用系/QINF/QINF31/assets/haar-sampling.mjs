// Reproducible finite-dimensional Haar pure-state sampling.
// Usage: node assets/haar-sampling.mjs dA dB samples seed
// Example from repository root:
// node textbook/volumes/dream_thater/応用系/QINF/QINF31/assets/haar-sampling.mjs 2 8 10000 314159
const [aArg = '2', bArg = '8', countArg = '10000', seedArg = '314159'] = process.argv.slice(2);
const dA = Number(aArg);
const dB = Number(bArg);
const samples = Number(countArg);
const seedInput = Number(seedArg);

if (![dA, dB, samples, seedInput].every(Number.isSafeInteger)
    || dA < 1 || dB < 1 || samples < 2 || seedInput < 0 || seedInput > 0xffffffff
    || dA * dB > 100000) {
  throw new Error('Use positive integer dA,dB, samples>=2, uint32 seed; dA*dB<=100000.');
}

// Seeded xorshift32. Box-Muller uses uniforms in (0,1) to avoid log(0).
let state = (seedInput >>> 0) || 0x6d2b79f5;
const uniform = () => {
  state ^= state << 13;
  state ^= state >>> 17;
  state ^= state << 5;
  return ((state >>> 0) + 0.5) / 0x100000000;
};
const gaussianPair = () => {
  const r = Math.sqrt(-2 * Math.log(uniform()));
  const theta = 2 * Math.PI * uniform();
  return [r * Math.cos(theta) / Math.SQRT2, r * Math.sin(theta) / Math.SQRT2];
};

let sum = 0;
let sumSquares = 0;
const D = dA * dB;
for (let s = 0; s < samples; s += 1) {
  const re = new Float64Array(D);
  const im = new Float64Array(D);
  let norm2 = 0;
  for (let i = 0; i < D; i += 1) {
    [re[i], im[i]] = gaussianPair();
    norm2 += re[i] ** 2 + im[i] ** 2;
  }
  const norm = Math.sqrt(norm2);
  for (let i = 0; i < D; i += 1) {
    re[i] /= norm;
    im[i] /= norm;
  }

  // rho_A[i,j] = sum_alpha c[i,alpha] conjugate(c[j,alpha]).
  // For Hermitian rho_A, Tr(rho_A^2) = sum_{ij} |rho_A[i,j]|^2.
  let purity = 0;
  for (let i = 0; i < dA; i += 1) {
    for (let j = 0; j < dA; j += 1) {
      let real = 0;
      let imag = 0;
      for (let alpha = 0; alpha < dB; alpha += 1) {
        const x = i * dB + alpha;
        const y = j * dB + alpha;
        real += re[x] * re[y] + im[x] * im[y];
        imag += im[x] * re[y] - re[x] * im[y];
      }
      purity += real ** 2 + imag ** 2;
    }
  }
  if (!Number.isFinite(purity) || purity < 1 / Math.min(dA, dB) - 1e-9 || purity > 1 + 1e-9) {
    throw new Error('Purity outside the finite-dimensional rank bound.');
  }
  sum += purity;
  sumSquares += purity ** 2;
}

const mean = sum / samples;
const sampleVariance = Math.max(0, (sumSquares - samples * mean ** 2) / (samples - 1));
const standardError = Math.sqrt(sampleVariance / samples);
const theory = (dA + dB) / (dA * dB + 1);
console.log(JSON.stringify({
  dA, dB, samples, seed: seedInput,
  theoretical_mean_purity: theory,
  sample_mean_purity: mean,
  sample_standard_error: standardError,
  absolute_difference: Math.abs(mean - theory)
}, null, 2));
