import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const selfTest = args.includes('--self-test');
const delegate = path.join('scripts', 'audit-dream-theater-undefined-terms.mjs');

if (selfTest) {
  const delegated = spawnSync(process.execPath, [delegate, '--self-test'], { encoding: 'utf8' });
  process.stdout.write(delegated.stdout ?? '');
  process.stderr.write(delegated.stderr ?? '');
  if ((delegated.status ?? 1) !== 0) process.exit(delegated.status ?? 1);
  process.exit(runFilterSelfTest() ? 0 : 1);
}

const run = spawnSync(process.execPath, [delegate, ...args], { encoding: 'utf8' });
if (run.error) {
  console.error(`undefined-term audit の起動に失敗しました: ${run.error.message}`);
  process.exit(1);
}

const sourceCache = new Map();
const keptCounts = { ERROR: 0, WARN: 0, AUDIT: 0 };
let suppressed = 0;
let truncated = false;
const outputLines = [];

for (const line of String(run.stdout ?? '').split(/\r?\n/u)) {
  if (/^ERROR: \d+ \/ WARN: \d+ \/ AUDIT: \d+$/u.test(line)) {
    outputLines.push('__FILTERED_COUNT__');
    continue;
  }
  if (/^\s*\.\.\.ほか \d+ 件$/u.test(line)) truncated = true;

  const finding = parseFinding(line);
  if (!finding) {
    outputLines.push(line);
    continue;
  }

  const candidate = undefinedCandidateFromMessage(finding.message);
  if (candidate && shouldSuppressUndefinedCandidate(finding.file, finding.lineNumber, candidate, sourceCache)) {
    suppressed += 1;
    continue;
  }

  keptCounts[finding.severity] += 1;
  outputLines.push(line);
}

const countLine = `ERROR: ${keptCounts.ERROR} / WARN: ${keptCounts.WARN} / AUDIT: ${keptCounts.AUDIT}`;
for (const line of outputLines) {
  console.log(line === '__FILTERED_COUNT__' ? countLine : line);
}
process.stderr.write(run.stderr ?? '');
if (suppressed > 0) {
  console.log(`undefined-term 候補の低信頼な一般語・説明句を ${suppressed} 件抑制しました。knowledge.yaml を偽 concept で埋めず、明示的な技術語コンテキストだけを候補として残します。`);
}

if (!strict) process.exit(run.status ?? 0);
if (keptCounts.ERROR > 0) process.exit(1);
if (truncated && (run.status ?? 0) !== 0) {
  console.error('undefined-term audit の出力が250件を超えて省略されたため、未表示のERRORを安全側に倒してblocking扱いにします。');
  process.exit(run.status ?? 1);
}
process.exit(0);

function parseFinding(line) {
  const match = /^- \[(ERROR|WARN|AUDIT)\] (.+?):(\d+) (.+)$/u.exec(line);
  if (!match) return null;
  return {
    severity: match[1],
    file: match[2],
    lineNumber: Number(match[3]),
    message: match[4],
  };
}

function undefinedCandidateFromMessage(message) {
  return /未定義の専門語候補「(.+?)」を検出しました/u.exec(message)?.[1] ?? null;
}

function shouldSuppressUndefinedCandidate(file, lineNumber, candidate, cache) {
  if (!file.endsWith('.md')) return false;
  const sourceLine = readSourceLine(file, lineNumber, cache);
  if (sourceLine == null) return false;
  return !hasHighConfidenceTechnicalContext(sourceLine, candidate);
}

function readSourceLine(file, lineNumber, cache) {
  let lines = cache.get(file);
  if (lines === undefined) {
    try {
      lines = fs.readFileSync(path.resolve(file), 'utf8').split(/\r?\n/u);
    } catch {
      lines = null;
    }
    cache.set(file, lines);
  }
  if (!lines) return null;
  return lines[lineNumber - 1] ?? '';
}

function hasHighConfidenceTechnicalContext(rawLine, candidate) {
  const line = String(rawLine ?? '');
  const needle = normalizeText(candidate);
  if (!needle) return false;

  const boldSpans = [...line.matchAll(/\*\*([^*]{1,120})\*\*/gu)].map((match) => match[1]);
  if (boldSpans.some((span) => normalizeText(span) === needle)) return true;

  const formalLabels = [...line.matchAll(/(?:公理|定義|定理|補題|命題|系)[（(]([^）)]{1,120})[）)]/gu)]
    .map((match) => match[1]);
  if (formalLabels.some((label) => normalizeText(label) === needle)) return true;

  const compactLine = normalizeText(line);
  const directDefinitionPatterns = [
    `${needle}とは`,
    `${needle}と呼ぶ`,
    `${needle}と呼び`,
    `${needle}とよぶ`,
    `${needle}を定義する`,
    `${needle}を定義し`,
  ];
  if (directDefinitionPatterns.some((pattern) => compactLine.includes(pattern))) return true;

  const heading = /^#{1,6}\s+(.+)$/u.exec(line.trim())?.[1] ?? null;
  if (heading != null) {
    const normalizedHeading = normalizeText(heading);
    if (normalizedHeading === needle) return true;

    const startsWithCandidate = normalizedHeading.startsWith(needle);
    const hasStrongSymbolicMarker = /[A-Za-z0-9]|\p{Script=Greek}/u.test(candidate);
    if (startsWithCandidate && hasStrongSymbolicMarker) return true;
  }

  return false;
}

function normalizeText(value) {
  return String(value ?? '')
    .replace(/[`*_>#]/gu, '')
    .replace(/[「」『』]/gu, '')
    .replace(/\s+/gu, '')
    .trim()
    .toLocaleLowerCase('en-US');
}

function runFilterSelfTest() {
  const failures = [];
  const keepCases = [
    ['## bounded Lipschitz関数で分布収束を判定できる', 'bounded Lipschitz関数'],
    ['ここでは **Sobolev空間** を使う。', 'Sobolev空間'],
    ['> **定義（弱収束）**', '弱収束'],
    ['弱収束とは、すべての試験関数に対して積分が収束することをいう。', '弱収束'],
    ['## 弱収束', '弱収束'],
  ];
  const suppressCases = [
    ['ここで使う関数は積分可能である。', '使う関数'],
    ['一般の滑らかな関数を取る。', '滑らかな関数'],
    ['この証明で必要な条件を確認する。', '必要な条件'],
    ['得られる関数は連続である。', '得られる関数'],
    ['任意の関数に対して同じ議論を使う。', '任意の関数'],
  ];

  for (const [line, candidate] of keepCases) {
    if (!hasHighConfidenceTechnicalContext(line, candidate)) failures.push(`keep: ${candidate}`);
  }
  for (const [line, candidate] of suppressCases) {
    if (hasHighConfidenceTechnicalContext(line, candidate)) failures.push(`suppress: ${candidate}`);
  }

  if (failures.length) {
    console.error(`DREAM THEATER undefined-term filter self-test failed: ${failures.join(', ')}`);
    return false;
  }
  console.log('DREAM THEATER undefined-term false-positive filter self-test passed.');
  return true;
}
