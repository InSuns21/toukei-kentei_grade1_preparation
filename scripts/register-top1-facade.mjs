import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const manifestPath = 'textbook/dream-theater-index.json';
let manifest = fs.readFileSync(manifestPath, 'utf8');
const manifestNeedle = '        "textbook/volumes/00_foundations/F0_00B1_位相空間_近傍_部分空間_収束/index.md",\n';
const manifestInsert = manifestNeedle + '        "textbook/volumes/00_foundations/TOP1/index.md",\n';
if (!manifest.includes(manifestNeedle)) throw new Error('manifest insertion point not found');
if (!manifest.includes('textbook/volumes/00_foundations/TOP1/index.md')) {
  manifest = manifest.replace(manifestNeedle, manifestInsert);
  fs.writeFileSync(manifestPath, manifest);
}

const facadePath = 'textbook/dream-theater.md';
let facade = fs.readFileSync(facadePath, 'utf8');
const facadeNeedle = '11. [F0-00B1 位相空間・近傍・部分空間・収束](textbook/volumes/00_foundations/F0_00B1_位相空間_近傍_部分空間_収束/index.md)\n';
const facadeInsert = facadeNeedle + '12. [TOP1 位相の生成・initial/final topology・積・商](textbook/volumes/00_foundations/TOP1/index.md)\n';
if (!facade.includes(facadeNeedle)) throw new Error('facade insertion point not found');
if (!facade.includes('textbook/volumes/00_foundations/TOP1/index.md')) {
  facade = facade.replace(facadeNeedle, facadeInsert);
  facade = facade.replace(
    '12. [F0-00C 連続写像・連続性の同値条件]',
    '13. [F0-00C 連続写像・連続性の同値条件]'
  ).replace(
    '13. [F0-00C1 点列コンパクト性・Heine–Borel]',
    '14. [F0-00C1 点列コンパクト性・Heine–Borel]'
  ).replace(
    '14. [F0-00C2 最大最小・最近点]',
    '15. [F0-00C2 最大最小・最近点]'
  ).replace(
    '15. [F0-00D Cauchy列・完備性]',
    '16. [F0-00D Cauchy列・完備性]'
  );
  fs.writeFileSync(facadePath, facade);
}

for (const temp of [
  'scripts/register-top1-facade.mjs',
  '.github/workflows/register-top1-facade.yml'
]) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'chore: register TOP1 in DREAM THEATER facade'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
