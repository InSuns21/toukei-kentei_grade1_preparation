import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import YAML from 'yaml';

const base = process.env.DREAM_THEATER_BASE_SHA?.trim() || process.env.TERMINOLOGY_BASE_SHA?.trim();
const env = { ...process.env };
const conceptAliases = loadConceptAliases();

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
const locallyShadowed = [];
const baseSourceCache = new Map();
const currentSourceCache = new Map();
const localAliasCache = new Map();

for (const line of errors) {
  const parsed = parseError(line);
  if (!parsed) {
    blocking.push(line);
    continue;
  }

  const { file, lineNumber, message, conceptId } = parsed;
  const isUnreachable =
    file.endsWith('.md') &&
    conceptId &&
    message.includes('を使用していますが、導入ページ');

  if (!isUnreachable) {
    blocking.push(line);
    continue;
  }

  if (conceptUseIsShadowedByLocalAlias(file, lineNumber, conceptId, currentSourceCache, localAliasCache)) {
    locallyShadowed.push(line);
    continue;
  }

  const untouchedLegacy = !changedMarkdown.has(file);
  const semanticLegacy = conceptWasAlreadyUsedInBase(base, file, conceptId, baseSourceCache);
  if (untouchedLegacy || semanticLegacy) legacy.push(line);
  else blocking.push(line);
}

if (locallyShadowed.length) {
  console.log('');
  console.log('同名aliasは、そのページ自身で導入する概念を優先します:');
  for (const line of locallyShadowed) console.log(`  ${line.replace('- [ERROR] ', '')}`);
  console.log('例: 数列の「単調収束定理 / liminf」と測度論の同名概念を、ローカル定義があるページで二重計上しません。');
}

if (legacy.length) {
  console.log('');
  console.log('既存本文に由来する概念依存違反は今回のPRでは audit 扱いにします:');
  for (const line of legacy) console.log(`  ${line.replace('- [ERROR] ', '')}`);
  console.log('main版の同じページにも同じknowledge conceptのaliasが存在した場合、リンク化や言い換えで行が変わっても新規依存とはみなしません。');
}

if (blocking.length) {
  console.error('');
  console.error('変更内容に起因する DREAM THEATER 概念依存違反が残っています:');
  for (const line of blocking) console.error(`  ${line.replace('- [ERROR] ', '')}`);
  process.exit(run.status ?? 1);
}

process.exit(0);

function parseError(line) {
  const match = /^- \[ERROR\] (.+?):(\d+) (.+)$/u.exec(line);
  if (!match) return null;
  const [, file, rawLineNumber, message] = match;
  const conceptMatch = /概念「[^」]+」\(([^)]+)\) を使用していますが/u.exec(message);
  return {
    file,
    lineNumber: Number(rawLineNumber),
    message,
    conceptId: conceptMatch?.[1] ?? null,
  };
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

function loadConceptAliases() {
  const root = process.cwd();
  const index = JSON.parse(fs.readFileSync(path.join(root, 'textbook/dream-theater-index.json'), 'utf8'));
  const policy = YAML.parse(fs.readFileSync(path.join(root, 'textbook/dream-theater-knowledge.yaml'), 'utf8')) ?? {};
  const metadataFile = policy.metadata_file || 'knowledge.yaml';
  const out = new Map();

  for (const relPath of (index.sections ?? []).flatMap((section) => section.paths ?? [])) {
    const knowledgePath = path.join(root, path.dirname(relPath), metadataFile);
    if (!fs.existsSync(knowledgePath)) continue;
    const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
    for (const raw of doc.concepts ?? []) {
      if (!raw?.id) continue;
      const aliases = [...new Set([raw.name, ...(raw.aliases ?? [])]
        .map((value) => String(value ?? '').trim())
        .filter(Boolean))];
      out.set(String(raw.id), aliases);
    }
  }
  return out;
}

function conceptUseIsShadowedByLocalAlias(file, lineNumber, conceptId, sourceCache, aliasCache) {
  const remoteAliases = conceptAliases.get(conceptId) ?? [];
  if (!remoteAliases.length || !file.endsWith('/index.md')) return false;

  let localAliases = aliasCache.get(file);
  if (localAliases === undefined) {
    const knowledgePath = path.join(process.cwd(), path.dirname(file), 'knowledge.yaml');
    localAliases = new Set();
    if (fs.existsSync(knowledgePath)) {
      const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
      for (const raw of doc.concepts ?? []) {
        for (const alias of [raw?.name, ...(raw?.aliases ?? [])]) {
          const value = String(alias ?? '').trim();
          if (value) localAliases.add(normalizeAlias(value));
        }
      }
    }
    aliasCache.set(file, localAliases);
  }

  let source = sourceCache.get(file);
  if (source === undefined) {
    try {
      source = stripNonReaderContent(fs.readFileSync(path.join(process.cwd(), file), 'utf8'));
    } catch {
      source = null;
    }
    sourceCache.set(file, source);
  }
  if (source == null) return false;

  const sourceLine = source.split(/\r?\n/)[lineNumber - 1] ?? '';
  return remoteAliases.some((alias) => {
    const normalized = normalizeAlias(alias);
    return localAliases.has(normalized) && aliasAppears(sourceLine, alias);
  });
}

function conceptWasAlreadyUsedInBase(baseSha, file, conceptId, cache) {
  if (!baseSha || /^0+$/.test(baseSha)) return false;
  const aliases = conceptAliases.get(conceptId) ?? [];
  if (!aliases.length) return false;

  let source = cache.get(file);
  if (source === undefined) {
    try {
      source = execFileSync(
        'git',
        ['-c', 'core.quotepath=false', 'show', `${baseSha}:${file}`],
        { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
      );
      source = stripNonReaderContent(source);
    } catch {
      source = null;
    }
    cache.set(file, source);
  }
  if (source == null) return false;

  return aliases.some((alias) => aliasAppears(source, alias));
}

function aliasAppears(source, alias) {
  const needle = String(alias).trim();
  if (!needle) return false;
  if (/^[A-Za-z][A-Za-z0-9.^+\-]*$/u.test(needle)) {
    return new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(needle)}(?![A-Za-z0-9_])`, 'iu').test(source);
  }
  return source.includes(needle);
}

function stripNonReaderContent(source) {
  let value = source;
  value = value.replace(/<!--[\s\S]*?-->/g, preserveLines);
  value = value.replace(/```[\s\S]*?```/g, preserveLines);
  value = value.replace(/`[^`\n]*`/g, preserveWidth);
  value = value.replace(/\$\$[\s\S]*?\$\$/g, preserveLines);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/g, preserveWidth);
  value = value.replace(/\]\([^\n)]*\)/g, (text) => ']'.padEnd(text.length, ' '));
  value = value.replace(/https?:\/\/\S+/g, preserveWidth);
  return value;
}

function normalizeAlias(value) {
  return String(value).trim().toLocaleLowerCase('en-US');
}

function preserveLines(value) {
  return '\n'.repeat((value.match(/\n/g) ?? []).length);
}

function preserveWidth(value) {
  return ' '.repeat(value.length);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
