import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');
const indexPath = path.join(root, 'textbook/dream-theater-index.json');
const policyPath = path.join(root, 'textbook/dream-theater-knowledge.yaml');

if (!fs.existsSync(indexPath)) fatal('textbook/dream-theater-index.json が見つかりません。');
if (!fs.existsSync(policyPath)) fatal('textbook/dream-theater-knowledge.yaml が見つかりません。');

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const policy = YAML.parse(fs.readFileSync(policyPath, 'utf8')) ?? {};
const metadataFile = policy.metadata_file || 'knowledge.yaml';
const pagePaths = (index.sections ?? []).flatMap((section) => section.paths ?? []);
const pages = new Map();
const concepts = new Map();
const findings = [];

for (const relPath of pagePaths) {
  const id = inferPageId(relPath);
  const fullPath = path.join(root, relPath);
  const knowledgePath = path.join(path.dirname(fullPath), metadataFile);
  const page = {
    id,
    path: relPath,
    fullPath,
    knowledgePath,
    knowledgeRel: relative(knowledgePath),
    prerequisites: [],
    concepts: [],
  };
  if (fs.existsSync(knowledgePath)) {
    const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
    page.prerequisites = [...new Set((doc.prerequisites ?? []).map(String))];
    page.concepts = (doc.concepts ?? []).map((raw) => normalizeConcept(raw, page));
    for (const concept of page.concepts) {
      if (concepts.has(concept.id)) {
        findings.push(configFinding(page, `概念ID ${concept.id} が重複登録されています。`));
      } else {
        concepts.set(concept.id, concept);
      }
    }
  }
  pages.set(id, page);
}

const ancestorCache = new Map();
for (const page of pages.values()) page.ancestors = collectAncestors(page.id, new Set());

const changed = changedOnly ? collectChangedLineNumbers() : { files: new Set(), lines: new Map() };
let registeredRules = 0;
let matchedUses = 0;

for (const concept of concepts.values()) {
  if (!concept.inferenceAliases.length) continue;
  registeredRules += concept.inferenceAliases.length;
  validateInferenceConcept(concept);
}

for (const page of pages.values()) {
  if (!fs.existsSync(page.fullPath) || !fs.existsSync(page.knowledgePath)) continue;
  const source = fs.readFileSync(page.fullPath, 'utf8');
  const lines = stripNonReaderContent(source).split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    if (!rawLine.trim() || isNavigationOrChecklistLine(rawLine)) continue;
    const lineNumber = i + 1;

    for (const concept of concepts.values()) {
      if (!concept.inferenceAliases.length) continue;
      for (const rule of concept.inferenceAliases) {
        if (!matchesRule(rawLine, rule)) continue;
        matchedUses += 1;
        validateImplicitUse(page, lineNumber, rawLine, concept, rule);
      }
    }
  }
}

const counts = countBySeverity(findings);
console.log(strict ? 'DREAM THEATER 暗黙論証依存検証（strict）' : 'DREAM THEATER 暗黙論証依存監査');
console.log(`対象ページ: ${pagePaths.length} / inference rules: ${registeredRules} / 検出使用: ${matchedUses}`);
if (changedOnly) console.log(`変更ファイル: ${changed.files.size} / 変更本文行または変更knowledgeのページだけをblocking対象に限定`);
console.log(`ERROR: ${counts.ERROR ?? 0} / WARN: ${counts.WARN ?? 0} / AUDIT: ${counts.AUDIT ?? 0}`);
for (const finding of findings.slice(0, 250)) {
  console.log(`- [${finding.severity}] ${finding.file}:${finding.line} ${finding.message}`);
}
if (findings.length > 250) console.log(`  ...ほか ${findings.length - 250} 件`);
if (strict && findings.some((finding) => finding.severity === 'ERROR')) process.exit(1);

function normalizeConcept(raw, page) {
  const inferenceAliases = (raw.inference_aliases ?? []).map((entry, index) => normalizeInferenceRule(entry, page, raw, index));
  return {
    id: String(raw.id ?? ''),
    name: String(raw.name ?? ''),
    kind: String(raw.kind ?? 'term'),
    sourceAnchor: raw.source_anchor ? String(raw.source_anchor).trim() : '',
    inferenceAliases,
    page,
  };
}

function normalizeInferenceRule(entry, page, raw, index) {
  if (typeof entry === 'string') {
    const literal = entry.trim();
    return { type: 'literal', value: literal, label: literal, index };
  }
  if (!entry || typeof entry !== 'object') {
    findings.push(configFinding(page, `${raw.id ?? '(unknown)'} の inference_aliases[${index}] は文字列または {literal|regex: ...} で指定してください。`));
    return { type: 'invalid', value: '', label: '(invalid)', index };
  }
  if (entry.literal != null) {
    const literal = String(entry.literal).trim();
    return { type: 'literal', value: literal, label: literal, index };
  }
  if (entry.regex != null) {
    const value = String(entry.regex);
    try {
      new RegExp(value, 'u');
    } catch (error) {
      findings.push(configFinding(page, `${raw.id ?? '(unknown)'} の inference regex が不正です: ${error.message}`));
      return { type: 'invalid', value: '', label: value, index };
    }
    return { type: 'regex', value, label: value, index };
  }
  findings.push(configFinding(page, `${raw.id ?? '(unknown)'} の inference_aliases[${index}] に literal または regex がありません。`));
  return { type: 'invalid', value: '', label: '(invalid)', index };
}

function validateInferenceConcept(concept) {
  if (!concept.id) {
    findings.push(configFinding(concept.page, 'inference_aliases を持つ概念に id がありません。'));
    return;
  }
  if (!concept.sourceAnchor) {
    findings.push(configFinding(concept.page, `${concept.name} (${concept.id}) は inference_aliases を持つため source_anchor が必要です。`));
    return;
  }
  if (!fs.existsSync(concept.page.fullPath)) return;
  const source = fs.readFileSync(concept.page.fullPath, 'utf8');
  const anchorRe = new RegExp(`<a\\s+id=["']${escapeRegex(concept.sourceAnchor)}["']\\s*><\\/a>`, 'u');
  if (!anchorRe.test(source)) {
    findings.push(configFinding(concept.page, `${concept.name} (${concept.id}) の source_anchor #${concept.sourceAnchor} が導入ページに存在しません。`));
  }
}

function validateImplicitUse(page, lineNumber, rawLine, concept, rule) {
  const severity = severityForLine(page, lineNumber);
  let problem = null;

  if (concept.page.id !== page.id && !page.ancestors.has(concept.page.id)) {
    problem = `暗黙の論証「${rule.label}」は ${concept.name} (${concept.id}) に対応しますが、導入ページ ${concept.page.id} は ${page.id} の prerequisite から到達できません。`;
  } else if (!concept.sourceAnchor) {
    problem = `暗黙の論証「${rule.label}」は ${concept.name} (${concept.id}) に対応しますが source_anchor がありません。`;
  } else if (!hasExpectedLink(rawLine, page.fullPath, concept)) {
    problem = `名前を省略した論証「${rule.label}」を検出しました。${concept.name} (${concept.id}) を明示し、${concept.page.path}#${concept.sourceAnchor} へのクリック可能なリンクを同じ推論行に置いてください。`;
  }

  if (!problem) return;
  findings.push({
    severity,
    file: page.path,
    line: lineNumber,
    message: `${problem} [${compact(rawLine)}]`,
  });
}

function matchesRule(line, rule) {
  if (rule.type === 'invalid' || !rule.value) return false;
  if (rule.type === 'regex') return new RegExp(rule.value, 'u').test(line);
  return normalizeLiteral(line).includes(normalizeLiteral(rule.value));
}

function hasExpectedLink(line, sourceFile, concept) {
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  for (const match of line.matchAll(linkRe)) {
    const href = match[2].trim();
    if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    const [pathPart, fragment = ''] = href.split('#', 2);
    if (fragment !== concept.sourceAnchor) continue;
    let target;
    if (!pathPart) target = sourceFile;
    else if (pathPart.startsWith('textbook/')) target = path.resolve(root, pathPart);
    else target = path.resolve(path.dirname(sourceFile), pathPart);
    if (target === concept.page.fullPath) return true;
  }
  return false;
}

function severityForLine(page, lineNumber) {
  if (!changedOnly) return 'AUDIT';
  if (changed.files.has(page.knowledgeRel)) return 'ERROR';
  const changedLines = changed.lines.get(page.path);
  if (changedLines?.has(lineNumber)) return 'ERROR';
  return 'AUDIT';
}

function collectChangedLineNumbers() {
  const files = new Set();
  const lines = new Map();
  const base = resolveDiffBase();
  if (!base) return { files, lines };

  try {
    const names = execFileSync('git', ['-c', 'core.quotepath=false', 'diff', '--name-only', `${base}...HEAD`], { encoding: 'utf8' });
    for (const name of names.split(/\r?\n/).filter(Boolean)) files.add(name);

    const diff = execFileSync('git', ['-c', 'core.quotepath=false', 'diff', '--unified=0', '--no-color', `${base}...HEAD`, '--', 'textbook/volumes/00_foundations/**'], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    let currentFile = null;
    let currentLine = 0;
    for (const line of diff.split(/\r?\n/)) {
      if (line.startsWith('+++ b/')) {
        currentFile = line.slice(6);
        if (!lines.has(currentFile)) lines.set(currentFile, new Set());
        continue;
      }
      const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/u);
      if (hunk) {
        currentLine = Number(hunk[1]);
        continue;
      }
      if (!currentFile || line.startsWith('---')) continue;
      if (line.startsWith('+')) {
        lines.get(currentFile).add(currentLine);
        currentLine += 1;
      } else if (!line.startsWith('-')) {
        currentLine += 1;
      }
    }
  } catch (error) {
    console.warn(`暗黙論証依存 changed-only の git diff に失敗しました: ${error.message}`);
  }
  return { files, lines };
}

function resolveDiffBase() {
  const envBase = process.env.DREAM_THEATER_BASE_SHA?.trim();
  if (envBase) return envBase;
  for (const candidate of ['origin/main', 'main']) {
    try {
      return execFileSync('git', ['merge-base', 'HEAD', candidate], { encoding: 'utf8' }).trim();
    } catch {
      // try next candidate
    }
  }
  return null;
}

function collectAncestors(pageId, visiting) {
  if (ancestorCache.has(pageId)) return ancestorCache.get(pageId);
  if (visiting.has(pageId)) return new Set();
  const page = pages.get(pageId);
  if (!page) return new Set();
  const nextVisiting = new Set(visiting).add(pageId);
  const out = new Set();
  for (const prerequisite of page.prerequisites) {
    out.add(prerequisite);
    for (const ancestor of collectAncestors(prerequisite, nextVisiting)) out.add(ancestor);
  }
  ancestorCache.set(pageId, out);
  return out;
}

function stripNonReaderContent(source) {
  return String(source)
    .replace(/<!-- solution-start -->[\s\S]*?<!-- solution-end -->/gu, '')
    .replace(/<!--[^]*?-->/gu, '');
}

function isNavigationOrChecklistLine(line) {
  const text = String(line).trim();
  if (/へ(?:進んでください|進みます|進む|戻ってください|戻る)/u.test(text)) return true;
  if (/(?:で扱います|で扱う予定|後続章で扱|次章で扱|を予告します|への接続として)/u.test(text)) return true;
  if (/(?:次章|次節|後続章|後続節|この先).*(?:説明|導入|扱|証明|確認|見る|学ぶ)/u.test(text)) return true;
  return false;
}

function normalizeLiteral(value) {
  return String(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/[\s、。；;:：!！?？「」『』（）()]/gu, '')
    .trim();
}

function inferPageId(relPath) {
  return path.basename(path.dirname(relPath)).split('_', 1)[0];
}

function relative(fullPath) {
  return path.relative(root, fullPath).replaceAll(path.sep, '/');
}

function compact(value) {
  return String(value).replace(/\s+/g, ' ').trim().slice(0, 180);
}

function countBySeverity(items) {
  const out = {};
  for (const item of items) out[item.severity] = (out[item.severity] ?? 0) + 1;
  return out;
}

function configFinding(page, message) {
  return {
    severity: strict ? 'ERROR' : 'WARN',
    file: page?.knowledgeRel ?? 'textbook/dream-theater-knowledge.yaml',
    line: 1,
    message,
  };
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function fatal(message) {
  console.error(message);
  process.exit(1);
}
