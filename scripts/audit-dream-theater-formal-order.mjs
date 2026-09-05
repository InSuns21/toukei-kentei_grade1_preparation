import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');
const index = JSON.parse(fs.readFileSync(path.join(root, 'textbook/dream-theater-index.json'), 'utf8'));
const policy = YAML.parse(fs.readFileSync(path.join(root, 'textbook/dream-theater-knowledge.yaml'), 'utf8')) ?? {};
const metadataFile = policy.metadata_file || 'knowledge.yaml';
const pagePaths = (index.sections ?? []).flatMap((section) => section.paths ?? []);
const changedFiles = changedOnly ? collectChangedFiles() : new Set();
const pages = new Map();
const conceptById = new Map();
const findings = [];

for (const relPath of pagePaths) {
  const pageId = inferPageId(relPath);
  const fullPath = path.join(root, relPath);
  const knowledgePath = path.join(path.dirname(fullPath), metadataFile);
  if (!fs.existsSync(knowledgePath)) continue;

  const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
  const page = {
    id: pageId,
    path: relPath,
    fullPath,
    knowledgePath,
    knowledgeRel: relative(knowledgePath),
    coverage: doc.coverage === 'complete' ? 'complete' : 'partial',
    concepts: (doc.concepts ?? []).map((raw, order) => normalizeConcept(raw, pageId, order)),
  };
  pages.set(pageId, page);
  for (const concept of page.concepts) conceptById.set(concept.id, concept);
}

for (const page of pages.values()) {
  if (!fs.existsSync(page.fullPath)) continue;
  const source = fs.readFileSync(page.fullPath, 'utf8');
  const declarations = collectFormalDeclarations(source);
  const readerLines = stripStructuralNoise(source).split(/\r?\n/);
  const proseChanged = changedOnly && changedFiles.has(page.path);
  const metadataChanged = changedOnly && changedFiles.has(page.knowledgeRel);
  const pageTouched = proseChanged || metadataChanged || !changedOnly;

  for (const concept of page.concepts) {
    concept.declarationLine = findIntroductionLine(declarations, readerLines, concept);
  }

  for (const decl of declarations) {
    const matched = page.concepts.some((concept) =>
      isFormalKind(concept.kind) && concept.aliases.some((alias) => semanticIncludes(decl.text, alias))
    );
    if (matched) continue;
    const mustBlock = strict && page.coverage === 'complete' && pageTouched;
    findings.push({
      severity: mustBlock ? 'ERROR' : 'AUDIT',
      file: page.path,
      line: decl.line,
      message: `raw formal 未登録候補: ${compact(decl.text)}`,
    });
  }

  for (const concept of page.concepts) {
    if (!isFormalKind(concept.kind)) continue;
    if (concept.declarationLine != null) continue;
    const mustBlock = strict && pageTouched;
    findings.push({
      severity: mustBlock ? 'ERROR' : 'AUDIT',
      file: page.path,
      line: 1,
      message: `${concept.kind}「${concept.name}」を raw Markdown の formal-statement 内で確認できません。`,
    });
  }

  for (const concept of page.concepts) {
    for (const requiredId of concept.requires) {
      const required = conceptById.get(requiredId);
      if (!required || required.pageId !== page.id) continue;
      if (concept.declarationLine == null || required.declarationLine == null) continue;
      if (required.declarationLine <= concept.declarationLine) continue;

      // 本文の説明順そのものは、既存ページではまず audit に残し、本文を触ったPRから blocking にする。
      const mustBlock = strict && proseChanged;
      findings.push({
        severity: mustBlock ? 'ERROR' : 'AUDIT',
        file: page.path,
        line: concept.declarationLine,
        message: `${concept.id} は ${requiredId} を必要としますが、本文では依存概念が後（${required.declarationLine}行目）に導入されています。`,
      });
    }
  }
}

const counts = countBySeverity(findings);
console.log(strict ? 'DREAM THEATER raw formal/導入順検証（strict）' : 'DREAM THEATER raw formal/導入順監査');
console.log(`raw formal 対象ページ: ${pages.size}`);
if (changedOnly) console.log(`変更ファイル: ${changedFiles.size}`);
console.log(`ERROR: ${counts.ERROR ?? 0} / WARN: ${counts.WARN ?? 0} / AUDIT: ${counts.AUDIT ?? 0}`);
for (const finding of findings.slice(0, 250)) {
  console.log(`- [${finding.severity}] ${finding.file}:${finding.line} ${finding.message}`);
}
if (findings.length > 250) console.log(`  ...ほか ${findings.length - 250} 件`);

if (strict && findings.some((finding) => finding.severity === 'ERROR')) process.exit(1);

function collectFormalDeclarations(source) {
  const lines = source.split(/\r?\n/);
  const out = [];
  let inFormal = false;
  let foundHeading = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.includes('<!-- formal-statement-start -->')) {
      inFormal = true;
      foundHeading = false;
      continue;
    }
    if (line.includes('<!-- formal-statement-end -->')) {
      inFormal = false;
      foundHeading = false;
      continue;
    }
    if (!inFormal || foundHeading) continue;
    if (!looksLikeFormalHeading(line)) continue;
    out.push({ line: i + 1, text: line });
    foundHeading = true;
  }
  return out;
}

function looksLikeFormalHeading(line) {
  const text = line.trim();
  return /^(?:#{1,6}\s+|>\s*)?(?:\*\*)?(?:公理|定義|定理|補題|命題|系)(?:\*\*)?(?:[（(：:\s]|$)/u.test(text) ||
    /^(?:#{1,6}\s+|>\s*)(?:\*\*)?.+(?:公理|定理|補題|命題)(?:\*\*)?(?:[（(：:]|$)/u.test(text);
}

function findIntroductionLine(declarations, readerLines, concept) {
  if (isFormalKind(concept.kind) && concept.introduction !== 'inline' && concept.introduction !== 'prose-math') {
    const match = declarations.find((decl) => concept.aliases.some((alias) => semanticIncludes(decl.text, alias)));
    return match?.line ?? null;
  }
  for (let i = 0; i < readerLines.length; i += 1) {
    if (concept.aliases.some((alias) => semanticIncludes(readerLines[i], alias))) return i + 1;
  }
  return null;
}

function semanticIncludes(text, alias) {
  const haystack = normalizeSemantic(text);
  const needle = normalizeSemantic(alias);
  return Boolean(needle) && haystack.includes(needle);
}

function normalizeSemantic(value) {
  return String(value)
    .replace(/\$+/g, '')
    .replace(/[`*_>#]/g, '')
    .replace(/\\,/g, '')
    .replace(/\\!/g, '')
    .replace(/\s+/g, '')
    .toLocaleLowerCase('en-US');
}

function stripStructuralNoise(source) {
  let value = source;
  value = value.replace(/<!--[\s\S]*?-->/g, preserveLines);
  value = value.replace(/```[\s\S]*?```/g, preserveLines);
  value = value.replace(/\$\$[\s\S]*?\$\$/g, preserveLines);
  value = value.replace(/\]\([^\n)]*\)/g, (text) => ']'.padEnd(text.length, ' '));
  value = value.replace(/https?:\/\/\S+/g, preserveWidth);
  return value;
}

function collectChangedFiles() {
  const base = resolveDiffBase();
  if (!base) return new Set();
  try {
    const output = execFileSync('git', [
      '-c', 'core.quotepath=false',
      'diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--',
      'textbook/volumes/00_foundations',
      'textbook/dream-theater-index.json',
      'textbook/dream-theater-knowledge.yaml',
      'scripts/audit-dream-theater-formal-order.mjs',
    ], { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    return new Set(output.split('\n').map((value) => value.trim()).filter(Boolean));
  } catch (error) {
    console.warn(`raw formal changed-only の git diff に失敗しました: ${error.message}`);
    return new Set();
  }
}

function resolveDiffBase() {
  const explicit = process.env.DREAM_THEATER_BASE_SHA?.trim() || process.env.TERMINOLOGY_BASE_SHA?.trim();
  if (explicit && !/^0+$/.test(explicit)) return explicit;
  try {
    return execFileSync('git', ['rev-parse', 'HEAD^'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function normalizeConcept(raw, pageId, order) {
  const kind = String(raw.kind ?? 'term');
  return {
    id: String(raw.id ?? ''),
    name: String(raw.name ?? ''),
    kind,
    introduction: raw.introduction ? String(raw.introduction) : (kind === 'term' ? 'inline' : 'formal'),
    aliases: [...new Set([raw.name, ...(raw.aliases ?? [])].map((value) => String(value).trim()).filter(Boolean))],
    requires: [...new Set((raw.requires ?? []).map(String))],
    pageId,
    order,
    declarationLine: null,
  };
}

function inferPageId(relPath) {
  const dir = path.basename(path.dirname(relPath));
  const parts = dir.split('_');
  if (parts.length >= 2 && parts[0] === 'F0') return `F0-${parts[1]}`;
  return dir;
}

function isFormalKind(kind) {
  return ['axiom', 'definition', 'theorem', 'lemma', 'proposition', 'corollary'].includes(kind);
}

function countBySeverity(items) {
  return items.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] ?? 0) + 1;
    return acc;
  }, {});
}

function compact(value) { return String(value).replace(/\s+/g, ' ').trim().slice(0, 180); }
function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }