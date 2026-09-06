import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const root = process.cwd();
const indexPath = path.join(root, 'textbook/dream-theater-index.json');
const minimums = new Map([
  ['A', 4],
  ['B', 3],
  ['C', 1],
]);
const exceptionKey = 'dream_theater_exercise_count_exception';
const auditAll = process.argv.includes('--all');

const dreamPaths = loadDreamTheaterPaths();
const targetPaths = auditAll
  ? [...dreamPaths]
  : collectChangedPaths().filter((relPath) => dreamPaths.has(relPath));

const indexFiles = targetPaths
  .filter((relPath) => relPath.endsWith('/index.md'))
  .filter((relPath) => fs.existsSync(path.join(root, relPath)))
  .sort();

if (indexFiles.length === 0) {
  console.log(auditAll
    ? 'DREAM THEATER の対象 index.md がありません。'
    : '今回の差分に DREAM THEATER の章本文変更はありません。演習量チェックをスキップします。');
  process.exit(0);
}

const errors = [];
const exceptions = [];

for (const relPath of indexFiles) {
  const absolutePath = path.join(root, relPath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const counts = countExercises(source);
  const exception = readException(path.dirname(absolutePath), relPath);

  if (exception.error) {
    errors.push(exception.error);
    continue;
  }

  if (exception.reason) {
    exceptions.push(`${relPath}: ${exception.reason}`);
    continue;
  }

  const shortages = [...minimums]
    .filter(([level, minimum]) => counts.get(level) < minimum)
    .map(([level, minimum]) => `Level ${level}: ${counts.get(level)} < ${minimum}`);

  if (shortages.length > 0) {
    errors.push(
      `${relPath}: DREAM THEATER 演習量不足 (${shortages.join(', ')}). ` +
      `水増しせず例外にする場合は同じ章の chapter.yaml に ` +
      `${exceptionKey}: "理由" を追加してください。`,
    );
  }
}

if (exceptions.length > 0) {
  console.log('DREAM THEATER 演習量の明示例外:');
  for (const item of exceptions) console.log(`- ${item}`);
}

if (errors.length > 0) {
  console.error(`DREAM THEATER 演習量チェックで ${errors.length} 件の問題が見つかりました:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `${indexFiles.length} 個の変更対象 DREAM THEATER 章を検証しました ` +
  `(最低 A>=4, B>=3, C>=1; 例外 ${exceptions.length} 件)。`,
);

function loadDreamTheaterPaths() {
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  return new Set(
    (index.sections ?? [])
      .flatMap((section) => section.paths ?? [])
      .map(normalizePath),
  );
}

function collectChangedPaths() {
  const base = process.env.DREAM_THEATER_BASE_SHA?.trim();
  const validBase = base && !/^0+$/.test(base) ? base : null;
  const args = validBase
    ? ['-c', 'core.quotepath=false', 'diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--', 'textbook/volumes']
    : ['-c', 'core.quotepath=false', 'diff', '--name-only', '--diff-filter=ACMR', 'HEAD^', 'HEAD', '--', 'textbook/volumes'];

  try {
    const output = execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    return output
      .split(/\r?\n/)
      .map((value) => normalizePath(value.trim()))
      .filter(Boolean);
  } catch (error) {
    console.error(`DREAM THEATER の変更ファイル取得に失敗しました: ${error.message}`);
    process.exit(1);
  }
}

function countExercises(source) {
  const counts = new Map([
    ['A', 0],
    ['B', 0],
    ['C', 0],
  ]);

  for (const match of source.matchAll(/^\s*-\s*Level:\s*([A-D])\b/gim)) {
    const level = match[1].toUpperCase();
    if (counts.has(level)) counts.set(level, counts.get(level) + 1);
  }
  return counts;
}

function readException(chapterDir, relPath) {
  const manifestPath = path.join(chapterDir, 'chapter.yaml');
  if (!fs.existsSync(manifestPath)) return { reason: null, error: null };

  let manifest;
  try {
    manifest = YAML.parse(fs.readFileSync(manifestPath, 'utf8')) ?? {};
  } catch (error) {
    return {
      reason: null,
      error: `${relPath}: chapter.yaml を解析できません: ${error.message}`,
    };
  }

  const raw = manifest[exceptionKey];
  if (raw == null || raw === '') return { reason: null, error: null };
  if (typeof raw !== 'string') {
    return {
      reason: null,
      error: `${relPath}: ${exceptionKey} は理由を記した文字列にしてください。`,
    };
  }

  const reason = raw.trim();
  if (!reason) return { reason: null, error: null };
  return { reason, error: null };
}

function normalizePath(value) {
  return value.replaceAll('\\', '/').replace(/^\.\//, '');
}
