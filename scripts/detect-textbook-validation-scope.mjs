import fs from 'node:fs';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

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
  /^textbook\/dream-theater-(?:index\.json|knowledge\.yaml|inference-rules\.yaml)$/u,
  /^textbook\/DREAM_THEATER_[^/]+\.md$/u,
  /^textbook\/(?:formal-statement-presentation-guide|proof-presentation-guide)\.md$/u,
];

const fastPatterns = [
  /^textbook\/volumes\//u,
  /^textbook\/plans(?:_progress|_done)?\//u,
  /^textbook\/dream-theater-work\.yaml$/u,
  /^textbook\/dream-theater-series\//u,
  /^textbook\/templates\//u,
  /^textbook\/prompts\//u,
];

let full = false;
let reason = 'leaf textbook change';

for (const file of files) {
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
