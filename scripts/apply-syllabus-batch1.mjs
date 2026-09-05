import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const dir = path.join(root, 'scripts', '.syllabus-batch1');
const chunks = fs.readdirSync(dir)
  .filter((name) => /^gz\d+\.b64$/.test(name))
  .sort();

if (!chunks.length) throw new Error('No gzip payload chunks found.');

// The staged applicator predates the repository-wide YAML spacing cleanup and
// expects compact inline exercise_counts maps. Normalize only the Batch 1
// target chapter metadata before running it; these files are intentionally
// modified by this batch anyway.
const targets = [
  'textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/chapter.yaml',
  'textbook/volumes/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/chapter.yaml',
  'textbook/volumes/02_distributions/P4_03_経験分布_乱数生成_monte_carlo/chapter.yaml',
  'textbook/volumes/03_inference/I1_02_推定法と推定量の評価/chapter.yaml',
  'textbook/volumes/03_inference/I3_01_検定の基礎とネイマン_ピアソン理論/chapter.yaml',
  'textbook/volumes/03_inference/I3_03_正規母集団_適合度_ノンパラメトリック検定/chapter.yaml',
  'textbook/volumes/03_inference/I4_01_ベイズ推定_事後分布_予測分布/chapter.yaml',
  'textbook/volumes/04_linear_models/L1_01_単回帰と最小二乗法/chapter.yaml',
  'textbook/volumes/04_linear_models/L1_02_重回帰_線形モデルの行列表現/chapter.yaml',
  'textbook/volumes/04_linear_models/L1_03_分散分析/chapter.yaml',
  'textbook/volumes/05_engineering/E1_04_プロビット_非線形回帰_SVM/chapter.yaml',
];
for (const rel of targets) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) continue;
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(/^exercise_counts:\s*\{\s*(.*?)\s*\}\s*$/m, 'exercise_counts: {$1}');
  if (after !== before) fs.writeFileSync(p, after, 'utf8');
}

const b64 = chunks.map((name) => fs.readFileSync(path.join(dir, name), 'utf8').trim()).join('');
const source = zlib.gunzipSync(Buffer.from(b64, 'base64')).toString('utf8');
const generated = path.join(dir, 'apply.generated.mjs');
fs.writeFileSync(generated, source, 'utf8');

const result = spawnSync(process.execPath, [generated], {
  cwd: root,
  stdio: 'inherit',
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
