import {verifiedMassRelocation} from './lib/verified-dream-theater-relocation.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';
import { loadDreamTheaterIndex } from './lib/dream-theater-public-catalog.mjs';

const root = process.cwd();
const minimums = new Map([
  ['A', 4],
  ['B', 3],
  ['C', 1],
]);
const exceptionKey = 'dream_theater_exercise_count_exception';
const auditAll = process.argv.includes('--all');

selfTestSolutionFolding();
if (process.argv.includes('--self-test')) process.exit(0);

if(!auditAll && verifiedMassRelocation()) { console.log('Relocation-only PR: proof/exercises preserved byte-for-byte except URLs, existing baseline applies.'); process.exit(0); }

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
  errors.push(...validateChangedSolutionFolding(source, relPath));
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
  const index = loadDreamTheaterIndex(root);
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
    const diffBase = validBase ?? 'HEAD^';
    const changed = output
      .split(/\r?\n/)
      .map((value) => normalizePath(value.trim()))
      .filter(Boolean);

    const filtered = [];
    let titleOnlyCount = 0;
    for (const relPath of changed) {
      if (relPath.endsWith('/index.md') && markdownChangeIsH1Only(diffBase, relPath)) {
        titleOnlyCount += 1;
        continue;
      }
      filtered.push(relPath);
    }
    if (titleOnlyCount > 0) {
      console.log(`DREAM THEATER 演習量チェック: H1タイトルのみの変更 ${titleOnlyCount} 件を本文変更対象から除外しました。`);
    }
    return filtered;
  } catch (error) {
    console.error(`DREAM THEATER の変更ファイル取得に失敗しました: ${error.message}`);
    process.exit(1);
  }
}

function markdownChangeIsH1Only(baseRef, relPath) {
  try {
    const before = execFileSync('git', ['show', `${baseRef}:${relPath}`], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    const after = fs.readFileSync(path.join(root, relPath), 'utf8');
    if (before === after) return false;
    return normalizeH1ForDiff(before) === normalizeH1ForDiff(after);
  } catch {
    return false;
  }
}

function normalizeH1ForDiff(source) {
  let replaced = false;
  return String(source)
    .split(/\r?\n/u)
    .map((line) => {
      if (!replaced && /^#\s+\S/u.test(line)) {
        replaced = true;
        return '# <PAGE_TITLE>';
      }
      return line;
    })
    .join('\n');
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

function validateChangedSolutionFolding(source, relPath) {
  const lines = source.split(/\r?\n/u);
  const issues = [], questions = [], blocks = [];
  let seen = false, answerSection = false, start = null, fence = null;
  let anchor = null, group = null, exerciseEnd = lines.length;
  const issue = (i, message) => issues.push(relPath + ':' + (i + 1) + ': ' + message);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const code = /^ {0,3}(\x60{3,}|~{3,})(.*)$/u.exec(lines[i]);
    if (fence) {
      if (code && code[1][0] === fence[0] && code[1].length >= fence.length && !code[2].trim()) fence = null;
      continue;
    }
    if (code) { fence = code[1]; continue; }
    const heading = /^(#{1,6})\s+(.+?)\s*$/u.exec(line);
    const title = heading?.[2].replace(/^\d+(?:\.\d+)*[.．、]?\s+/u, '');
    if (heading && heading[1].length <= 2 && /^演習(?:\s|$)/u.test(title)) {
      seen = true;
      answerSection = false;
    } else if (heading && heading[1].length <= 2 && seen && start === null) {
      if (exerciseEnd === lines.length) exerciseEnd = i;
      answerSection = /^(?:詳細)?解答(?:\s|$)/u.test(title);
      group = null;
    }
    if (line === '<!-- solution-start -->') {
      if (start !== null) issue(i, 'solution-start の入れ子は禁止です。');
      else start = i;
      continue;
    }
    if (line === '<!-- solution-end -->') {
      if (start === null) issue(i, '対応する solution-start がありません。');
      else {
        if (!lines.slice(start + 1, i).some(s => s.trim() && !s.trim().startsWith('<!--'))) issue(start, '空の解答ブロックです。');
        blocks.push({ start, end: i, group, answerSection });
        start = null;
      }
      continue;
    }
    // A problem heading must remain visible even in older chapters without
    // an explicit exercise anchor. Do not confuse A1 解答 with a question.
    if (seen && heading && heading[1].length >= 3 &&
      /^(?:[A-Z0-9_-]+-)?[A-D]\d+(?:[.．:：\s]|$)/u.test(title) &&
      !/^(?:[A-Z0-9_-]+-)?[A-D]\d+\s*(?:詳細)?解答(?:\s|$)/u.test(title)) {
      if (anchor === null) anchor = i;
      if (start !== null) issue(i, '次の演習見出しが解答ブロック内にあります。');
    }
    if (seen && heading && heading[1].length <= 2 && start !== null) {
      issue(i, '後続の節見出しが解答ブロック内にあります。');
    }
    if (/^<a\s+id=["']ex-[^"']+["']\s*><\/a>$/u.test(line)) {
      anchor = i;
      if (start !== null) issue(i, '次の演習 anchor が解答ブロック内にあります。');
    }
    const levelHeading = heading && /^Level\s+([A-D])\b/iu.exec(title);
    if (levelHeading) group = levelHeading[1].toUpperCase();
    const level = /^-\s*Level:\s*([A-D])\b/iu.exec(line);
    if (level) {
      seen = true;
      if (start !== null) issue(i, '問題文の Level が解答ブロック内にあります。');
      questions.push({ line: i, boundary: anchor ?? i, level: level[1].toUpperCase() });
      anchor = null;
    }
    if (seen && start === null && (
      (heading && heading[1].length >= 3 && /^(?:詳細解答|(?:[A-D]\d+|[A-Z0-9_-]+-[A-D]\d+)\s*(?:詳細)?解答)(?:\s|$)/u.test(title)) ||
      /^\*\*(?:詳細)?解答(?:[:：]\*\*|\*\*[:：]?)\s*/u.test(line)
    )) issue(i, '詳細解答が折りたたみ marker 外にあります。');
  }
  if (start !== null) issue(start, '対応する solution-end がありません。');

  // The documented legacy exception allows separately folded Level groups.
  const levels = new Set(questions.map(q => q.level));
  const grouped = levels.size > 0 && [...levels].every(level =>
    blocks.some(b => b.answerSection && b.group === level));
  if (!grouped) {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const next = questions[i + 1]?.boundary ?? lines.length;
      const limit = exerciseEnd > q.line ? Math.min(next, exerciseEnd) : next;
      const matches = blocks.filter(b => !b.answerSection && b.start > q.line && b.end < limit);
      if (matches.length !== 1) issue(q.line, '各演習の直下に一組の solution-start / solution-end が必要です。');
    }
  }
  return issues;
}

function selfTestSolutionFolding() {
  const start = '<!-- solution-start -->', end = '<!-- solution-end -->';
  const first = [start, '### A1 解答', '計算', end].join('\n');
  const good = ['## 10. 演習', '### Level A', '<a id="ex-test-a1"></a>',
    '#### TEST-A01 問題', '- Level: A', '問題文', first,
    '<a id="ex-test-a2"></a>', '#### TEST-A02 問題', '- Level: A', '問題文',
    start, '**解答**：', '計算', end, '## 11. まとめ'].join('\n');
  const check = (src, expected, label) => {
    const result = validateChangedSolutionFolding(src, 'fixture.md');
    if ((result.length === 0) !== expected) throw new Error(label + ': ' + result.join('\n'));
  };
  check(good, true, 'per-exercise folds');
  check(good.replace('## 10. 演習', '## 演習'), true, 'unnumbered section');
  check(good.replace(first, ''), false, 'missing first fold');
  check(good.replace(end + '\n<a id="ex-test-a2"></a>', '<a id="ex-test-a2"></a>\n' + end), false, 'hidden next anchor');
  check(good.replace('### A1 解答', start + '\n### A1 解答'), false, 'nested fold');
  check(good.replace(first, '### A1 解答\n計算'), false, 'visible numbered answer');
  check('## 11. 演習\n- Level: A\n問題\n## 12. 詳細解答\n### A1 解答\n計算', false, 'CA11/CA12 regression');
  check('## 演習\n- Level: A\n問題\n## 詳細解答\n### Level A\n' + first, true, 'explicit Level-grouped legacy format');
  check(good + '\n~~~md\n' + start + '\n- Level: A\n~~~', true, 'fenced example');
  check(good.replace(first, start + '\n' + end), false, 'empty fold');
  check(good.replace(end + '\n<a id="ex-test-a2"></a>\n#### TEST-A02 問題', '#### TEST-A02 問題\n' + end), false, 'hidden question heading without anchor');
  check(good.replace(end + '\n## 11. まとめ', '## 11. まとめ\n' + end), false, 'hidden following section');

  console.log('DREAM THEATER solution folding self-test passed');
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
