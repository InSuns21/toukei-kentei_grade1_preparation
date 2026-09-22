import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const indexRel = 'textbook/dream-theater-index.json';
const args = process.argv.slice(2);

if (args.includes('--self-test')) {
  runSelfTests();
  process.exit(0);
}

const base = valueAfter('--base') || process.env.BASE_SHA?.trim() || process.env.DREAM_THEATER_BASE_SHA?.trim();
if (!base || /^0+$/.test(base)) {
  emit(true, '比較基準 SHA を取得できないため安全側で full audit');
  process.exit(0);
}

const changes = collectChanges(base);
const reasons = [];

for (const change of changes) {
  if (isGlobalAuditTrigger(change.path)) {
    reasons.push(`全体監査エンジン/レジストリ変更: ${change.path}`);
  }
}

const indexChange = changes.find((change) => change.path === indexRel);
if (indexChange) {
  try {
    const before = JSON.parse(gitShow(base, indexRel));
    const after = JSON.parse(fs.readFileSync(path.join(root, indexRel), 'utf8'));
    const result = classifyIndexChange(before, after);
    if (!result.pureAdd) reasons.push(`index が pure-add ではありません: ${result.reason}`);
    else console.log(`DREAM THEATER index: pure-add (${result.addedPaths.length} path追加)`);
  } catch (error) {
    reasons.push(`index 差分の意味判定に失敗: ${error.message}`);
  }
}

for (const change of changes) {
  if (!change.path.startsWith('textbook/volumes/00_foundations/')) continue;

  if (change.path.endsWith('/knowledge.yaml')) {
    if (change.status === 'A' && isKnowledgeForNewPage(change.path, changes, base)) continue;
    reasons.push(`既存 knowledge DAG に波及しうる変更: ${change.status} ${change.path}`);
  }

  if (change.path.endsWith('/index.md') && /^(?:D|R)/u.test(change.status)) {
    reasons.push(`既存 DREAM THEATER 本文の削除/移動: ${change.status} ${change.path}`);
  }
}

emit(reasons.length > 0, reasons.length ? reasons.join(' / ') : '通常教材差分または pure-add index: changed-only audit');

function collectChanges(baseSha) {
  const output = execFileSync(
    'git',
    ['-c', 'core.quotepath=false', 'diff', '--name-status', '--find-renames', `${baseSha}...HEAD`],
    { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
  );
  const out = [];
  for (const raw of output.split(/\r?\n/u)) {
    if (!raw.trim()) continue;
    const parts = raw.split('\t');
    const status = parts[0];
    if (/^[RC]/u.test(status)) {
      out.push({ status, oldPath: parts[1], path: parts[2] });
    } else {
      out.push({ status, path: parts[1] });
    }
  }
  return out;
}

function isGlobalAuditTrigger(relPath) {
  if (relPath === indexRel) return false;
  if (relPath === 'textbook/dream-theater-knowledge.yaml') return true;
  if (relPath === 'textbook/dream-theater-inference-rules.yaml') return true;
  if (relPath === 'package.json' || relPath === 'package-lock.json') return true;
  if (relPath === '.github/workflows/validate-dream-theater-concepts.yml') return true;
  if (relPath === 'scripts/lib/dream-theater-concept-resolution.mjs') return true;
  if (relPath === 'scripts/validate-dream-theater-concepts-changed.mjs') return true;
  if (relPath === 'scripts/detect-dream-theater-concept-audit-scope.mjs') return true;
  return /^scripts\/audit-dream-theater-(?:concepts|formal-order|explicit-dependencies|implicit-dependencies|undefined-terms|undefined-terms-filtered)\.mjs$/u.test(relPath);
}

function isKnowledgeForNewPage(knowledgePath, allChanges, baseSha) {
  const pagePath = `${path.posix.dirname(knowledgePath)}/index.md`;
  if (allChanges.some((change) => change.path === pagePath && change.status === 'A')) return true;
  try {
    execFileSync('git', ['cat-file', '-e', `${baseSha}:${pagePath}`], {
      cwd: root,
      stdio: 'ignore',
    });
    return false;
  } catch {
    return true;
  }
}

function classifyIndexChange(before, after) {
  if (!before || !after || !Array.isArray(before.sections) || !Array.isArray(after.sections)) {
    return { pureAdd: false, reason: 'sections 配列を比較できません', addedPaths: [] };
  }

  if (stableJson(omitKey(before, 'sections')) !== stableJson(omitKey(after, 'sections'))) {
    return { pureAdd: false, reason: 'index の sections 以外の metadata が変更されています', addedPaths: [] };
  }

  const oldNames = before.sections.map((section) => String(section?.name ?? ''));
  const newNames = after.sections.map((section) => String(section?.name ?? ''));
  if (new Set(oldNames).size !== oldNames.length || new Set(newNames).size !== newNames.length) {
    return { pureAdd: false, reason: 'section name が重複しています', addedPaths: [] };
  }
  if (!isSubsequence(oldNames, newNames)) {
    return { pureAdd: false, reason: '既存 section の削除・改名・並べ替えがあります', addedPaths: [] };
  }

  const afterByName = new Map(after.sections.map((section) => [String(section?.name ?? ''), section]));
  const oldAllPaths = [];
  const newAllPaths = [];
  for (const section of before.sections) oldAllPaths.push(...normalizePaths(section));
  for (const section of after.sections) newAllPaths.push(...normalizePaths(section));

  if (new Set(oldAllPaths).size !== oldAllPaths.length || new Set(newAllPaths).size !== newAllPaths.length) {
    return { pureAdd: false, reason: 'path が重複しています', addedPaths: [] };
  }

  for (const oldSection of before.sections) {
    const name = String(oldSection?.name ?? '');
    const newSection = afterByName.get(name);
    if (!newSection) return { pureAdd: false, reason: `既存 section ${name} がありません`, addedPaths: [] };

    if (stableJson(omitKey(oldSection, 'paths')) !== stableJson(omitKey(newSection, 'paths'))) {
      return { pureAdd: false, reason: `既存 section ${name} の metadata が変更されています`, addedPaths: [] };
    }

    const oldPaths = normalizePaths(oldSection);
    const newPaths = normalizePaths(newSection);
    if (!isSubsequence(oldPaths, newPaths)) {
      return { pureAdd: false, reason: `section ${name} で既存 path の削除・移動・並べ替えがあります`, addedPaths: [] };
    }
  }

  const oldSet = new Set(oldAllPaths);
  return {
    pureAdd: true,
    reason: '',
    addedPaths: newAllPaths.filter((value) => !oldSet.has(value)),
  };
}

function normalizePaths(section) {
  if (!Array.isArray(section?.paths)) return [];
  return section.paths.map((value) => String(value));
}

function isSubsequence(needles, haystack) {
  let i = 0;
  for (const value of haystack) {
    if (value === needles[i]) i += 1;
  }
  return i === needles.length;
}

function omitKey(value, key) {
  const out = { ...value };
  delete out[key];
  return out;
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function gitShow(baseSha, relPath) {
  return execFileSync('git', ['show', `${baseSha}:${relPath}`], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
}

function valueAfter(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}

function emit(full, reason) {
  console.log(full
    ? `full audit を実行します: ${reason}`
    : `PR は changed-only audit のみ実行します: ${reason}`);
  const outputPath = process.env.GITHUB_OUTPUT?.trim();
  if (outputPath) {
    fs.appendFileSync(outputPath, `full=${full ? 'true' : 'false'}\nreason=${reason.replace(/[\r\n]+/gu, ' ')}\n`);
  }
}

function runSelfTests() {
  const base = {
    sections: [
      { name: 'A', paths: ['a.md', 'b.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  };

  assertPure(base, {
    sections: [
      { name: 'A', paths: ['a.md', 'new.md', 'b.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, true, '既存 section への path 追加');

  assertPure(base, {
    sections: [
      { name: 'A', paths: ['a.md', 'b.md'] },
      { name: 'NEW', paths: ['new.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, true, '新 section 追加');

  assertPure(base, {
    sections: [
      { name: 'A', paths: ['a.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, false, 'path 削除');

  assertPure(base, {
    sections: [
      { name: 'A', paths: ['b.md', 'a.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, false, 'path 並べ替え');

  assertPure(base, {
    sections: [
      { name: 'B', paths: ['c.md'] },
      { name: 'A', paths: ['a.md', 'b.md'] },
    ],
  }, false, 'section 並べ替え');

  assertPure(base, {
    sections: [
      { name: 'A', paths: ['a.md'] },
      { name: 'B', paths: ['c.md', 'b.md'] },
    ],
  }, false, 'path の section 間移動');

  assertPure(
    { version: 1, ...base },
    { version: 2, ...base },
    false,
    'top-level metadata 変更'
  );

  console.log('DREAM THEATER concept audit scope self-test: OK');
}

function assertPure(before, after, expected, label) {
  const actual = classifyIndexChange(before, after).pureAdd;
  if (actual !== expected) {
    throw new Error(`${label}: expected pureAdd=${expected}, actual=${actual}`);
  }
}
