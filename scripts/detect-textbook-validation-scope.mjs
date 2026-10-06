import fs from 'node:fs';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const indexRel = 'textbook/dream-theater-index.json';

function argValue(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}

const base = argValue('--base') || (process.env.TEXTBOOK_BASE_SHA || '').trim();
if (!base) {
  console.error('Validation-scope detection requires --base <sha> or TEXTBOOK_BASE_SHA.');
  process.exit(2);
}

const diff = spawnSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base + '...HEAD'], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});
if (diff.status !== 0) {
  console.error(diff.stderr || 'git diff failed');
  process.exit(diff.status || 2);
}

const files = diff.stdout.split(/\r?\n/u).map((x) => x.trim()).filter(Boolean);

const fullPatterns = [
  /^\.github\/workflows\//u,
  /^scripts\//u,
  /^references\//u,
  /^agents\//u,
  /^(?:AGENTS|README|CONTENT_GUIDELINES|EXERCISE_GUIDELINES)\.md$/u,
  /^package(?:-lock)?\.json$/u,
  /^pages\//u,
  /^statistical-mathematics\//u,
  /^applied-rikou-80\//u,
  /^anki\//u,
  /^textbook\/(?:curriculum\.yaml|notation\.md|style-guide\.md|dependency-graph\.md|knowledge-dag\.yaml)$/u,
  /^textbook\/dream-theater-(?:knowledge\.yaml|inference-rules\.yaml)$/u,
  /^textbook\/DREAM_THEATER_[^/]+\.md$/u,
  /^textbook\/(?:formal-statement-presentation-guide|proof-presentation-guide)\.md$/u,
];

const fastPatterns = [
  /^textbook\/volumes\//u,
  /^textbook\/plans(?:_progress|_done)?\//u,
  /^textbook\/dream-theater-work\.yaml$/u,
  /^textbook\/dream-theater-series\//u,
  /^textbook\/dream-theater(?:-standard-math-core)?\.md$/u,
  /^textbook\/templates\//u,
  /^textbook\/prompts\//u,
];

if (process.argv.includes('--self-test')) {
  runSelfTests();
  process.exit(0);
}

let full = false;
let reason = 'leaf textbook change';

for (const file of files) {
  if (file === indexRel) {
    const indexChange = classifyCurrentIndexChange();
    if (!indexChange.pureAdd) {
      full = true;
      reason = 'global-impact DREAM THEATER index change: ' + indexChange.reason;
      break;
    }
    reason = 'leaf textbook change + pure-add DREAM THEATER index';
    continue;
  }
  if (fullPatterns.some((re) => re.test(file))) {
    full = true;
    reason = 'global-impact path: ' + file;
    break;
  }
  if (!fastPatterns.some((re) => re.test(file))) {
    full = true;
    reason = 'unclassified path: ' + file;
    break;
  }
}

if (files.length === 0) reason = 'no changed files';

console.log('Textbook validation scope: full=' + full + '; files=' + files.length + '; reason=' + reason);

if (process.argv.includes('--github-output')) {
  const target = process.env.GITHUB_OUTPUT;
  if (!target) {
    console.error('--github-output requested but GITHUB_OUTPUT is not set.');
    process.exit(2);
  }
  fs.appendFileSync(target,
    'full=' + String(full) + '\n' +
    'changed_count=' + String(files.length) + '\n' +
    'reason=' + reason.replace(/[\r\n]/gu, ' ') + '\n'
  );
}


function classifyCurrentIndexChange() {
  try {
    const beforeResult = spawnSync('git', ['show', base + ':' + indexRel], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (beforeResult.status !== 0) {
      return { pureAdd: false, reason: 'base index could not be read' };
    }
    const before = JSON.parse(beforeResult.stdout);
    const after = JSON.parse(fs.readFileSync(indexRel, 'utf8'));
    return classifyIndexChange(before, after);
  } catch (error) {
    return { pureAdd: false, reason: 'index semantic comparison failed: ' + error.message };
  }
}

function classifyIndexChange(before, after) {
  if (!before || !after || !Array.isArray(before.sections) || !Array.isArray(after.sections)) {
    return { pureAdd: false, reason: 'sections arrays are not comparable', addedPaths: [] };
  }

  if (stableJson(omitKey(before, 'sections')) !== stableJson(omitKey(after, 'sections'))) {
    return { pureAdd: false, reason: 'top-level metadata changed', addedPaths: [] };
  }

  const oldNames = before.sections.map((section) => String(section?.name ?? ''));
  const newNames = after.sections.map((section) => String(section?.name ?? ''));
  if (new Set(oldNames).size !== oldNames.length || new Set(newNames).size !== newNames.length) {
    return { pureAdd: false, reason: 'duplicate section names', addedPaths: [] };
  }
  if (!isSubsequence(oldNames, newNames)) {
    return { pureAdd: false, reason: 'existing sections were removed, renamed, or reordered', addedPaths: [] };
  }

  const afterByName = new Map(after.sections.map((section) => [String(section?.name ?? ''), section]));
  const oldAllPaths = [];
  const newAllPaths = [];
  for (const section of before.sections) oldAllPaths.push(...normalizePaths(section));
  for (const section of after.sections) newAllPaths.push(...normalizePaths(section));

  if (new Set(oldAllPaths).size !== oldAllPaths.length || new Set(newAllPaths).size !== newAllPaths.length) {
    return { pureAdd: false, reason: 'duplicate paths', addedPaths: [] };
  }

  for (const oldSection of before.sections) {
    const name = String(oldSection?.name ?? '');
    const newSection = afterByName.get(name);
    if (!newSection) return { pureAdd: false, reason: 'existing section is missing: ' + name, addedPaths: [] };

    if (stableJson(omitKey(oldSection, 'paths')) !== stableJson(omitKey(newSection, 'paths'))) {
      return { pureAdd: false, reason: 'existing section metadata changed: ' + name, addedPaths: [] };
    }

    const oldPaths = normalizePaths(oldSection);
    const newPaths = normalizePaths(newSection);
    if (!isSubsequence(oldPaths, newPaths)) {
      return { pureAdd: false, reason: 'existing paths changed order or location in section: ' + name, addedPaths: [] };
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
  if (Array.isArray(value)) return '[' + value.map(stableJson).join(',') + ']';
  if (value && typeof value === 'object') {
    return '{' + Object.keys(value).sort().map((key) => JSON.stringify(key) + ':' + stableJson(value[key])).join(',') + '}';
  }
  return JSON.stringify(value);
}

function runSelfTests() {
  const baseIndex = {
    sections: [
      { name: 'A', paths: ['a.md', 'b.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  };

  assertPure(baseIndex, {
    sections: [
      { name: 'A', paths: ['a.md', 'new.md', 'b.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, true, 'path add');

  assertPure(baseIndex, {
    sections: [
      { name: 'A', paths: ['a.md', 'b.md'] },
      { name: 'NEW', paths: ['new.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, true, 'section add');

  assertPure(baseIndex, {
    sections: [
      { name: 'A', paths: ['a.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, false, 'path delete');

  assertPure(baseIndex, {
    sections: [
      { name: 'A', paths: ['b.md', 'a.md'] },
      { name: 'B', paths: ['c.md'] },
    ],
  }, false, 'path reorder');

  assertPure(baseIndex, {
    sections: [
      { name: 'B', paths: ['c.md'] },
      { name: 'A', paths: ['a.md', 'b.md'] },
    ],
  }, false, 'section reorder');

  assertPure({ version: 1, ...baseIndex }, { version: 2, ...baseIndex }, false, 'metadata change');
  assertFastPath('textbook/dream-theater.md', true, 'DREAM THEATER subject routing');
  assertFastPath('textbook/dream-theater-standard-math-core.md', true, 'DREAM THEATER standard math routing');
  assertFastPath('textbook/unknown-global.md', false, 'unknown top-level textbook markdown');
  console.log('Textbook validation scope semantic index/path self-test: OK');
}

function assertPure(before, after, expected, label) {
  const actual = classifyIndexChange(before, after).pureAdd;
  if (actual !== expected) {
    throw new Error(label + ': expected pureAdd=' + expected + ', actual=' + actual);
  }
}

function assertFastPath(file, expected, label) {
  const actual = !fullPatterns.some((re) => re.test(file)) && fastPatterns.some((re) => re.test(file));
  if (actual !== expected) {
    throw new Error(label + ': expected fastPath=' + expected + ', actual=' + actual);
  }
}
