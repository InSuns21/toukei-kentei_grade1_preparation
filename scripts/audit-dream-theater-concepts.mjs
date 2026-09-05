import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');
const writeReport = process.argv.includes('--write-report');

const indexPath = path.join(root, 'textbook/dream-theater-index.json');
const policyPath = path.join(root, 'textbook/dream-theater-knowledge.yaml');
const reportPath = path.join(root, 'textbook/dream-theater-concept-tree.md');

if (!fs.existsSync(indexPath)) fatal('textbook/dream-theater-index.json が見つかりません。');
if (!fs.existsSync(policyPath)) fatal('textbook/dream-theater-knowledge.yaml が見つかりません。');

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const policy = YAML.parse(fs.readFileSync(policyPath, 'utf8')) ?? {};
const metadataFile = policy.metadata_file || 'knowledge.yaml';
const pagePaths = (index.sections ?? []).flatMap((section) => section.paths ?? []);
const pages = new Map();
const missingKnowledge = [];
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
    coverage: 'partial',
    prerequisites: [],
    forwardReferences: new Set(),
    concepts: [],
  };

  if (fs.existsSync(knowledgePath)) {
    const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
    if (doc.chapter && doc.chapter !== id) {
      fatal(`${relative(knowledgePath)}: chapter=${doc.chapter} ですが DREAM THEATER 上のIDは ${id} です。`);
    }
    page.coverage = doc.coverage === 'complete' ? 'complete' : 'partial';
    page.prerequisites = [...new Set((doc.prerequisites ?? []).map(String))];
    page.forwardReferences = new Set((doc.forward_references ?? []).map(String));
    page.concepts = (doc.concepts ?? []).map((concept, order) => normalizeConcept(concept, id, order, knowledgePath));
  } else {
    missingKnowledge.push(id);
  }
  pages.set(id, page);
}

const conceptById = new Map();
const aliasOwners = new Map();
for (const page of pages.values()) {
  for (const concept of page.concepts) {
    if (conceptById.has(concept.id)) {
      findings.push(errorFinding(relative(page.knowledgePath), 1, `概念ID ${concept.id} が重複しています（${conceptById.get(concept.id).pageId} と ${page.id}）。`));
      continue;
    }
    conceptById.set(concept.id, concept);
    for (const alias of concept.aliases) {
      const key = normalizeAlias(alias);
      const owners = aliasOwners.get(key) ?? [];
      owners.push(concept.id);
      aliasOwners.set(key, owners);
    }
  }
}

for (const [alias, owners] of aliasOwners.entries()) {
  if (owners.length <= 1) continue;
  const ownerPages = [...new Set(owners.map((id) => conceptById.get(id)?.pageId).filter(Boolean))];
  if (ownerPages.length > 1) {
    findings.push({ severity: 'WARN', file: 'textbook/dream-theater-knowledge.yaml', line: 1, message: `別ページの概念が同じ別名「${alias}」を共有しています: ${owners.join(', ')}` });
  }
}

const ancestorCache = new Map();
for (const page of pages.values()) page.ancestors = collectAncestors(page.id, new Set());

const changedFiles = changedOnly ? collectChangedFiles() : new Set();

for (const page of pages.values()) {
  if (!fs.existsSync(page.fullPath)) continue;
  const source = fs.readFileSync(page.fullPath, 'utf8');
  const readerSource = stripNonReaderContent(source);
  const lines = readerSource.split(/\r?\n/);
  const knowledgeRel = relative(page.knowledgePath);
  const pageChanged = changedOnly && (changedFiles.has(page.path) || changedFiles.has(knowledgeRel));
  const proseChanged = changedOnly && changedFiles.has(page.path);
  const hasFormal = lines.some(isFormalDeclarationLine);

  if (!fs.existsSync(page.knowledgePath)) {
    if (strict && pageChanged && hasFormal && policy.strict?.require_knowledge_for_changed_formal_page !== false) {
      findings.push(errorFinding(page.path, firstFormalLine(lines), `変更された DREAM THEATER ページに formal statement がありますが ${metadataFile} がありません。`));
    } else if (!changedOnly) {
      findings.push({ severity: 'AUDIT', file: page.path, line: 1, message: `${metadataFile} 未移行` });
    }
    continue;
  }

  for (const refId of page.forwardReferences) {
    if (!conceptById.has(refId)) {
      findings.push(errorFinding(knowledgeRel, 1, `forward_references に未知の概念 ${refId} があります。`));
    }
  }

  const localFormalConcepts = page.concepts.filter((concept) => isFormalKind(concept.kind) && concept.introduction !== 'inline');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!isFormalDeclarationLine(line)) continue;
    const matched = localFormalConcepts.some((concept) => concept.aliases.some((alias) => aliasAppears(line, alias)));
    if (matched) continue;

    const mustBlock = strict && page.coverage === 'complete' && (pageChanged || !changedOnly);
    findings.push({
      severity: mustBlock ? 'ERROR' : 'AUDIT',
      file: page.path,
      line: i + 1,
      message: `未登録の定義・定理・補題・命題・系の宣言候補: ${compact(line)}`,
    });
  }

  for (const concept of page.concepts) {
    concept.declarationLine = findIntroductionLine(lines, concept);
    if (concept.declarationLine != null) continue;
    if (!isFormalKind(concept.kind) && concept.introduction !== 'inline') continue;

    const mustBlock = strict && (pageChanged || !changedOnly);
    findings.push({
      severity: mustBlock ? 'ERROR' : 'AUDIT',
      file: page.path,
      line: 1,
      message: `${concept.kind}「${concept.name}」は ${metadataFile} に登録されていますが、本文中の導入を確認できません。`,
    });
  }

  validateConceptDependencies(page, knowledgeRel);

  if (pageChanged || !changedOnly) {
    for (const concept of conceptById.values()) {
      if (concept.pageId === page.id) continue;
      const firstUse = firstAliasUse(lines, concept.aliases);
      if (firstUse == null) continue;
      if (page.ancestors.has(concept.pageId)) continue;
      if (page.forwardReferences.has(concept.id)) continue;
      if (policy.strict?.reject_unreachable_registered_concept === false) continue;

      const mustBlock = strict && pageChanged;
      findings.push({
        severity: mustBlock ? 'ERROR' : 'AUDIT',
        file: page.path,
        line: firstUse,
        message: `概念「${concept.name}」(${concept.id}) を使用していますが、導入ページ ${concept.pageId} は prerequisite から到達できません。明示的な予告なら forward_references に登録してください。`,
      });
    }
  }

  if (strict && proseChanged && page.coverage !== 'complete' && hasFormal) {
    findings.push(errorFinding(page.path, firstFormalLine(lines), `formal statement を含む本文を変更したため、${metadataFile} の coverage: complete が必要です。`));
  }
}

const report = buildReport();
if (writeReport) fs.writeFileSync(reportPath, report, 'utf8');

const counts = countBySeverity(findings);
console.log(strict ? 'DREAM THEATER 概念依存検証（strict）' : 'DREAM THEATER 概念依存監査');
console.log(`対象ページ: ${pagePaths.length} / knowledge移行済み: ${pagePaths.length - missingKnowledge.length} / 未移行: ${missingKnowledge.length}`);
if (changedOnly) console.log(`変更ファイル: ${changedFiles.size}`);
console.log(`概念登録数: ${conceptById.size}`);
console.log(`ERROR: ${counts.ERROR ?? 0} / WARN: ${counts.WARN ?? 0} / AUDIT: ${counts.AUDIT ?? 0}`);
for (const item of findings.slice(0, 250)) console.log(`- [${item.severity}] ${item.file}:${item.line} ${item.message}`);
if (findings.length > 250) console.log(`  ...ほか ${findings.length - 250} 件`);
if (writeReport) console.log(`概念ツリーを書き出しました: ${relative(reportPath)}`);

if (!strict) {
  console.log('audit モードでは既存の knowledge.yaml 未移行ページと、高信頼の未登録 formal 候補を一覧化します。');
  console.log('自由文の一般名詞はまだ blocking せず、登録概念・formal statement・requires を検査対象にします。');
}

if (strict && findings.some((item) => item.severity === 'ERROR')) process.exit(1);

function validateConceptDependencies(page, knowledgeRel) {
  for (const concept of page.concepts) {
    for (const requiredId of concept.requires) {
      const required = conceptById.get(requiredId);
      if (!required) {
        findings.push(errorFinding(knowledgeRel, 1, `${concept.id} が未知の依存概念 ${requiredId} を要求しています。`));
        continue;
      }
      if (required.pageId === page.id) {
        if (required.order >= concept.order) {
          findings.push(errorFinding(knowledgeRel, 1, `${concept.id} は同ページで後に導入される ${requiredId} に依存しています。knowledge.yaml の順序を教材順に合わせてください。`));
        }
        continue;
      }
      if (!page.ancestors.has(required.pageId) && policy.strict?.reject_unresolved_concept_dependency !== false) {
        findings.push(errorFinding(knowledgeRel, 1, `${concept.id} は ${requiredId}（${required.pageId}）を要求しますが、${required.pageId} は ${page.id} の prerequisite から到達できません。`));
      }
    }
  }
}

function normalizeConcept(raw, pageId, order, knowledgePath) {
  if (!raw?.id || !raw?.name || !raw?.kind) {
    fatal(`${relative(knowledgePath)}: concepts[${order}] は id/name/kind が必須です。`);
  }
  const kind = String(raw.kind);
  const aliases = [...new Set([raw.name, ...(raw.aliases ?? [])].map((value) => String(value).trim()).filter(Boolean))];
  return {
    id: String(raw.id),
    name: String(raw.name),
    kind,
    introduction: raw.introduction ? String(raw.introduction) : (kind === 'term' ? 'inline' : 'formal'),
    aliases,
    requires: [...new Set((raw.requires ?? []).map(String))],
    pageId,
    order,
  };
}

function inferPageId(relPath) {
  const dir = path.basename(path.dirname(relPath));
  const parts = dir.split('_');
  if (parts.length >= 2 && parts[0] === 'F0') return `F0-${parts[1]}`;
  return dir;
}

function collectAncestors(pageId, visiting) {
  if (ancestorCache.has(pageId)) return ancestorCache.get(pageId);
  if (visiting.has(pageId)) {
    findings.push(errorFinding('textbook/dream-theater-knowledge.yaml', 1, `prerequisite cycle detected at ${pageId}`));
    return new Set();
  }
  const nextVisiting = new Set(visiting).add(pageId);
  const out = new Set();
  const page = pages.get(pageId);
  for (const prereq of page?.prerequisites ?? []) {
    out.add(prereq);
    if (!pages.has(prereq)) continue;
    for (const ancestor of collectAncestors(prereq, nextVisiting)) out.add(ancestor);
  }
  ancestorCache.set(pageId, out);
  return out;
}

function collectChangedFiles() {
  const base = resolveDiffBase();
  if (!base) {
    console.warn('CI差分の基準コミットを取得できないため changed-only 検査対象は0件です。');
    return new Set();
  }
  try {
    const output = execFileSync('git', [
      '-c', 'core.quotepath=false',
      'diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--',
      'textbook/volumes/00_foundations',
      'textbook/dream-theater-index.json',
      'textbook/dream-theater-knowledge.yaml',
    ], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    return new Set(output.split('\n').map((value) => value.trim()).filter(Boolean));
  } catch (error) {
    console.warn(`git diff に失敗したため changed-only 検査対象は0件です: ${error.message}`);
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

function isFormalKind(kind) {
  return ['definition', 'theorem', 'lemma', 'proposition', 'corollary'].includes(kind);
}

function isFormalDeclarationLine(line) {
  const text = line.trim();
  if (!text) return false;
  if (/^(?:#{1,6}\s+|>\s*|[-*]\s*)?(?:\*\*)?(?:定義|定理|補題|命題|系)(?:\*\*)?(?:[（(：:\s]|$)/u.test(text)) return true;
  if (/^#{1,6}\s+.+(?:定理|補題|命題)(?:[（(：:]|$)/u.test(text)) return true;
  return false;
}

function firstFormalLine(lines) {
  const index = lines.findIndex(isFormalDeclarationLine);
  return index >= 0 ? index + 1 : 1;
}

function findIntroductionLine(lines, concept) {
  if (concept.introduction === 'inline') return firstAliasUse(lines, concept.aliases);
  for (let i = 0; i < lines.length; i += 1) {
    if (!isFormalDeclarationLine(lines[i])) continue;
    if (concept.aliases.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
  }
  return null;
}

function firstAliasUse(lines, aliases) {
  for (let i = 0; i < lines.length; i += 1) {
    if (aliases.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
  }
  return null;
}

function aliasAppears(line, alias) {
  const needle = String(alias).trim();
  if (!needle) return false;
  if (/^[A-Za-z][A-Za-z0-9.^+-]*$/u.test(needle)) {
    return new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(needle)}(?![A-Za-z0-9_])`, 'u').test(line);
  }
  return line.includes(needle);
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

function buildReport() {
  const lines = [];
  lines.push('# DREAM THEATER 概念依存ツリー');
  lines.push('');
  lines.push('`scripts/audit-dream-theater-concepts.mjs --write-report` で生成する。');
  lines.push('通常教材の `chapter.yaml / glossary.yaml` とは独立し、各 DREAM THEATER ページ直下の `knowledge.yaml` を正本とする。');
  lines.push('');
  lines.push(`移行状況: **${pagePaths.length - missingKnowledge.length} / ${pagePaths.length} ページ**`);
  lines.push('');

  for (const section of index.sections ?? []) {
    lines.push(`## ${section.name}`);
    lines.push('');
    for (const relPath of section.paths ?? []) {
      const id = inferPageId(relPath);
      const page = pages.get(id);
      lines.push(`- **${id}** — \`${relPath}\``);
      if (!page || !fs.existsSync(page.knowledgePath)) {
        lines.push('  - knowledge: 未移行');
        continue;
      }
      lines.push(`  - coverage: ${page.coverage}`);
      lines.push(`  - prerequisites: ${page.prerequisites.length ? page.prerequisites.join(', ') : 'なし'}`);
      if (page.forwardReferences.size) lines.push(`  - forward references: ${[...page.forwardReferences].join(', ')}`);
      for (const concept of page.concepts) {
        const deps = concept.requires.length ? ` ← ${concept.requires.join(', ')}` : '';
        lines.push(`  - ${kindLabel(concept.kind)} **${concept.name}** (${concept.id})${deps}`);
      }
    }
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function kindLabel(kind) {
  return ({ definition: '定義', theorem: '定理', lemma: '補題', proposition: '命題', corollary: '系', term: '用語' })[kind] ?? kind;
}

function countBySeverity(items) {
  return items.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] ?? 0) + 1;
    return acc;
  }, {});
}

function errorFinding(file, line, message) { return { severity: 'ERROR', file, line, message }; }
function normalizeAlias(value) { return String(value).trim().toLocaleLowerCase('en-US'); }
function compact(value) { return value.replace(/\s+/g, ' ').trim().slice(0, 180); }
function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function fatal(message) { console.error(message); process.exit(1); }
