import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

// Existing SREL/QFT chapters use +---; a new declaration must not introduce
// that signature again while their mathematical migration is pending.
const root = process.cwd();
const chapterRoot = 'textbook/volumes/dream_thater';
const legacyDeclaration = /(?:\\operatorname\{diag\}\s*\(\s*1\s*,\s*-1\s*,\s*-1\s*,\s*-1\s*\)|(?:\(\+\s*,\s*-\s*,\s*-\s*,\s*-\)|\(\+---\)|\(\+,-,-,-\)))/u;
const signContext = /(?:計量|符号|Minkowski|ミンコフスキー|\\eta|\bη\b|\\eta_|\\eta\s*=|\bg\s*=)/u;
const legacyExposition = /(?:旧規約|旧符号|異なる規約|比較|変換|読み替え|換算|対照|から.*へ|との違い)/u;

function isForbiddenDeclaration(line) {
  return legacyDeclaration.test(line) && signContext.test(line) && !legacyExposition.test(line);
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(result.stderr || `${command} failed (${result.status})`);
    process.exit(result.status || 2);
  }
  return result.stdout;
}

function selfTest() {
  const yes = [
    String.raw`\eta=\operatorname{diag}(1,-1,-1,-1)`,
    String.raw`計量は $(+---)$ に固定する。`,
    String.raw`計量符号 $(+,-,-,-)$ を使う。`,
  ];
  const no = [
    String.raw`\eta=\operatorname{diag}(-1,1,1,1)`,
    String.raw`旧規約 $(+---)$ から $(-+++)$ へ変換する。`,
    String.raw`比較するとQFT1の計量は $(+---)$、本章は $(-+++)$ である。`,
    String.raw`\Box_g=-\partial_t^2+\Delta`,
  ];
  for (const line of yes) if (!isForbiddenDeclaration(line)) throw new Error(`should reject: ${line}`);
  for (const line of no) if (isForbiddenDeclaration(line)) throw new Error(`should allow: ${line}`);
  console.log('Lorentz-signature declaration self-test passed.');
}

if (process.argv.includes('--self-test')) {
  selfTest();
  process.exit(0);
}

const baseIndex = process.argv.indexOf('--base');
const base = baseIndex >= 0 ? process.argv[baseIndex + 1] : process.env.TEXTBOOK_BASE_SHA;
if (!base) {
  console.log('Legacy +--- clauses remain in SREL/QFT; use --base <SHA> to reject new declarations.');
  process.exit(0);
}

const diff = run('git', [
  '-c', 'core.quotePath=false', 'diff', '--unified=0', '--no-ext-diff', '--diff-filter=ACMR',
  `${base}...HEAD`, '--', `${chapterRoot}/`,
]);

const problems = [];
let file = '';
let lineNumber = 0;
for (const line of diff.split('\n')) {
  if (line.startsWith('+++ b/')) {
    file = line.slice(6);
  } else if (line.startsWith('@@ ')) {
    const match = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/u.exec(line);
    if (match) lineNumber = Number(match[1]);
  } else if (line.startsWith('+') && !line.startsWith('+++')) {
    if (file.endsWith('/index.md') && isForbiddenDeclaration(line.slice(1))) {
      problems.push(`${file}:${lineNumber}: newly introduced (+---) metric declaration`);
    }
    lineNumber += 1;
  } else if (line.startsWith(' ') && !line.startsWith(' ' + '@')) {
    lineNumber += 1;
  }
}

if (problems.length) {
  console.error('Lorentz signature convention failed:');
  for (const problem of problems) console.error(`- ${problem}`);
  console.error('Use (-,+,+,+); see textbook/dream-theater-lorentz-conventions.md.');
  process.exit(1);
}

// Also catch newly created files when git returns an empty diff in an unusual
// local setup: this is a report only, never an excuse to silently skip CI.
if (!fs.existsSync(path.join(root, chapterRoot))) {
  console.error(`Missing expected source directory: ${chapterRoot}`);
  process.exit(2);
}
console.log('Lorentz signature convention passed: no new (+---) metric declaration in changed DREAM THEATER chapters.');
