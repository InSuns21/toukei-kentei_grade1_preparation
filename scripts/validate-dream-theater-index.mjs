import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const facadePath = path.join(repoRoot, 'textbook', 'dream-theater.md');
const manifestPath = path.join(repoRoot, 'textbook', 'dream-theater-index.json');
const foundationsDir = path.join(repoRoot, 'textbook', 'volumes', '00_foundations');
const calculationReaderSupportPrefix = 'F0_00CALC_';
const calculationReaderSupportMarker = `/00_foundations/${calculationReaderSupportPrefix}`;
const nonDreamTheaterDirs = new Set([
  'F0_00_統計検定1級のための数学速習',
  'F0_00R_基礎論ロードマップ',
]);
const deprecatedCompatibilityDirs = new Set([
  'F0_01_統計のための微積分_線形代数_答案記法',
  'F0_00H1_常微分方程式_線形系_行列指数',
  'F0_00FA1_Fourier級数_直交展開',
  'F0_00FA2_Fourier変換_畳み込み_反転',
  'F0_00FA3_Plancherel_L2_特性関数',
  'F0_00PDE1_熱方程式_Fourier変換',
  'F0_00PDE2_波動方程式_Laplace方程式_変数分離',
  'F0_00PDE3_Sturm_Liouville_スペクトル展開',
  'F0_00DS1_Schwartz超関数_テスト関数',
  'F0_00DS2_超関数微分_弱微分',
  'F0_00SOB1_Sobolev空間_Wkp_Hk',
  'F0_00SOB2_H01_Poincare_trace',
  'F0_00WK1_弱形式_変分形式',
  'F0_00WK2_Lax_Milgram_存在一意性',
  'F0_00WK3_楕円型PDE_Galerkin_FEM',
  'F0_00SP1_確率過程_filtration_stopping',
  'F0_00SP2_martingale_optional_stopping',
  'F0_00SP3_Brown運動_Gaussian過程_二次変分',
  'F0_00SP4_Ito積分_Ito公式_SDE',
  'F0_00SP5_generator_Kolmogorov_Fokker_Planck',
  'F0_00TS1_定常過程_Hilbert予測_Wold',
  'F0_00TS2_Herglotz_spectral_measure_density',
  'F0_00TS2A_spectral_representation_theorem',
  'F0_00TS3_ARMA_transfer_filter_spectrum',
]);

const toPosix = (p) => p.split(path.sep).join('/');
const fail = (messages) => {
  console.error('DREAM THEATER index validation failed:');
  for (const message of messages) console.error(`- ${message}`);
  process.exit(1);
};

for (const required of [facadePath, manifestPath, foundationsDir]) {
  if (!fs.existsSync(required)) fail([`required path does not exist: ${toPosix(path.relative(repoRoot, required))}`]);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (!Array.isArray(manifest.sections)) fail(['manifest.sections must be an array']);

const expected = [];
const seenManifest = new Set();
const errors = [];

for (const section of manifest.sections) {
  if (!section || typeof section.name !== 'string' || !Array.isArray(section.paths)) {
    errors.push('each manifest section must have string name and array paths');
    continue;
  }
  for (const p of section.paths) {
    if (typeof p !== 'string') {
      errors.push(`non-string path in section ${section.name}`);
      continue;
    }
    if (seenManifest.has(p)) errors.push(`duplicate manifest entry: ${p}`);
    seenManifest.add(p);
    expected.push(p);
  }
}

// Direct foundation chapters normally belong in the DREAM THEATER facade.
// The statistics-exam math crash course and the retired foundations roadmap are
// normal/supplementary textbook pages rather than current DREAM THEATER entries.
// F0_00CALC_* is calculation-only reader support. Deprecated compatibility
// directories remain on disk for old URLs and are intentionally outside the
// current reader-facing manifest.
const discovered = fs.readdirSync(foundationsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) => !entry.name.startsWith(calculationReaderSupportPrefix))
  .filter((entry) => !nonDreamTheaterDirs.has(entry.name))
  .filter((entry) => !deprecatedCompatibilityDirs.has(entry.name))
  .map((entry) => path.join(foundationsDir, entry.name, 'index.md'))
  .filter((p) => fs.existsSync(p))
  .map((p) => toPosix(path.relative(repoRoot, p)))
  .sort();

const expectedSet = new Set(expected);
const discoveredSet = new Set(discovered);

for (const p of expected) {
  if (!fs.existsSync(path.join(repoRoot, p))) errors.push(`manifest target does not exist: ${p}`);
}
for (const p of discovered) {
  if (!expectedSet.has(p)) errors.push(`foundation chapter missing from manifest/facade scope: ${p}`);
}
for (const p of expected) {
  if (!discoveredSet.has(p)) errors.push(`manifest entry is not a direct foundation chapter: ${p}`);
}

const facade = fs.readFileSync(facadePath, 'utf8');
const chapterLinkPattern = /\]\((textbook\/volumes\/00_foundations\/[^)]+\/index\.md)\)/g;
const actual = [...facade.matchAll(chapterLinkPattern)]
  .map((m) => m[1])
  .filter((p) => !p.includes(calculationReaderSupportMarker));
const counts = new Map();
for (const p of actual) counts.set(p, (counts.get(p) ?? 0) + 1);

for (const p of expected) {
  const count = counts.get(p) ?? 0;
  if (count === 0) errors.push(`facade is missing chapter link: ${p}`);
  if (count > 1) errors.push(`facade contains duplicate chapter link (${count}x): ${p}`);
}
for (const p of actual) {
  if (!expectedSet.has(p)) errors.push(`facade contains extra foundation chapter link: ${p}`);
}

if (actual.length === expected.length) {
  for (let i = 0; i < expected.length; i += 1) {
    if (actual[i] !== expected[i]) {
      errors.push(`facade order mismatch at position ${i + 1}: expected ${expected[i]}, got ${actual[i] ?? '<missing>'}`);
      break;
    }
  }
} else {
  errors.push(`facade chapter-link count mismatch: expected ${expected.length}, got ${actual.length}`);
}

if (errors.length) fail(errors);

console.log(`DREAM THEATER index OK: ${expected.length} chapters/roadmaps, no omissions, extras, duplicates, broken targets, or order drift.`);
