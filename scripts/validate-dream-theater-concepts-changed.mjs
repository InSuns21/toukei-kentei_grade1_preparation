import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const base = process.env.DREAM_THEATER_BASE_SHA?.trim() || process.env.TERMINOLOGY_BASE_SHA?.trim();
const env = { ...process.env };
const auditScript = path.resolve('scripts/audit-dream-theater-concepts.mjs');

const run = spawnSync(
  process.execPath,
  [auditScript, '--strict', '--changed-only'],
  { encoding: 'utf8', env }
);

process.stdout.write(run.stdout ?? '');
process.stderr.write(run.stderr ?? '');
if ((run.status ?? 1) === 0) process.exit(0);

const changedMarkdown = collectChangedMarkdown(base);
const baselineErrors = collectBaselineErrorKeys(base);
const output = `${run.stdout ?? ''}\n${run.stderr ?? ''}`;
const errors = output
  .split(/\r?\n/)
  .filter((line) => line.startsWith('- [ERROR] '));

const blocking = [];
const legacy = [];
for (const line of errors) {
  const parsed = parseError(line);
  if (!parsed) {
    blocking.push(line);
    continue;
  }

  const { file, message, key } = parsed;
  const isUnreachable =
    file.endsWith('.md') &&
    message.includes('を使用していますが、導入ページ');

  if (!isUnreachable) {
    blocking.push(line);
    continue;
  }

  const untouchedLegacy = !changedMarkdown.has(file);
  const semanticLegacy = baselineErrors.has(key);
  if (untouchedLegacy || semanticLegacy) legacy.push(line);
  else blocking.push(line);
}

if (legacy.length) {
  console.log('');
  console.log('既存本文に由来する概念依存違反は今回のPRでは audit 扱いにします:');
  for (const line of legacy) console.log(`  ${line.replace('- [ERROR] ', '')}`);
  console.log('base版にも同じ概念依存が存在する場合は、本文行がリンク化などで変更されても新規違反とはみなしません。');
}

if (blocking.length) {
  console.error('');
  console.error('変更内容に起因する DREAM THEATER 概念依存違反が残っています:');
  for (const line of blocking) console.error(`  ${line.replace('- [ERROR] ', '')}`);
  process.exit(run.status ?? 1);
}

process.exit(0);

function parseError(line) {
  const match = /^- \[ERROR\] (.+?):\d+ (.+)$/u.exec(line);
  if (!match) return null;
  const [, file, message] = match;
  return { file, message, key: `${file}\u0000${message}` };
}

function collectChangedMarkdown(baseSha) {
  if (!baseSha || /^0+$/.test(baseSha)) return new Set();
  try {
    const output = execFileSync('git', [
      '-c', 'core.quotepath=false',
      'diff', '--name-only', '--diff-filter=ACMR', baseSha, 'HEAD', '--',
      'textbook/volumes/00_foundations',
    ], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    return new Set(output.split('\n').map((value) => value.trim()).filter((value) => value.endsWith('.md')));
  } catch (error) {
    console.error(`changed Markdown の取得に失敗しました: ${error.message}`);
    return new Set();
  }
}

function collectBaselineErrorKeys(baseSha) {
  if (!baseSha || /^0+$/.test(baseSha)) return new Set();

  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'dream-theater-base-'));
  const worktree = path.join(tempRoot, 'base');
  try {
    execFileSync('git', ['worktree', 'add', '--detach', worktree, baseSha], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 20 * 1024 * 1024,
    });

    const baseline = spawnSync(
      process.execPath,
      [auditScript, '--strict'],
      { cwd: worktree, encoding: 'utf8', env, maxBuffer: 40 * 1024 * 1024 }
    );
    const text = `${baseline.stdout ?? ''}\n${baseline.stderr ?? ''}`;
    return new Set(
      text
        .split(/\r?\n/)
        .filter((line) => line.startsWith('- [ERROR] '))
        .map(parseError)
        .filter(Boolean)
        .map(({ key }) => key)
    );
  } catch (error) {
    console.error(`base版の概念依存監査に失敗しました: ${error.message}`);
    return new Set();
  } finally {
    try {
      execFileSync('git', ['worktree', 'remove', '--force', worktree], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch {}
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}
