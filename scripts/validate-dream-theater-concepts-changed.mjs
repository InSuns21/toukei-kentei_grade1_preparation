import { execFileSync, spawnSync } from 'node:child_process';

const base = process.env.DREAM_THEATER_BASE_SHA?.trim() || process.env.TERMINOLOGY_BASE_SHA?.trim();
const env = { ...process.env };

const run = spawnSync(
  process.execPath,
  ['scripts/audit-dream-theater-concepts.mjs', '--strict', '--changed-only'],
  { encoding: 'utf8', env }
);

process.stdout.write(run.stdout ?? '');
process.stderr.write(run.stderr ?? '');
if ((run.status ?? 1) === 0) process.exit(0);

const changedMarkdown = collectChangedMarkdown(base);
const output = `${run.stdout ?? ''}\n${run.stderr ?? ''}`;
const errors = output
  .split(/\r?\n/)
  .filter((line) => line.startsWith('- [ERROR] '));

const blocking = [];
const legacy = [];
for (const line of errors) {
  const match = /^- \[ERROR\] (.+?):\d+ (.+)$/u.exec(line);
  if (!match) {
    blocking.push(line);
    continue;
  }
  const [, file, message] = match;
  const isLegacyUnreachable =
    file.endsWith('.md') &&
    !changedMarkdown.has(file) &&
    message.includes('を使用していますが、導入ページ');

  if (isLegacyUnreachable) legacy.push(line);
  else blocking.push(line);
}

if (legacy.length) {
  console.log('');
  console.log('既存本文に由来する概念依存違反は今回のPRでは audit 扱いにします:');
  for (const line of legacy) console.log(`  ${line.replace('- [ERROR] ', '')}`);
  console.log('本文が変更された時点で blocking に昇格します。');
}

if (blocking.length) {
  console.error('');
  console.error('変更内容に起因する DREAM THEATER 概念依存違反が残っています。');
  process.exit(run.status ?? 1);
}

process.exit(0);

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
