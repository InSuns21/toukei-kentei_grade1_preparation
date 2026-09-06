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
const concepts = [];
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
    forwardReferences: new Set(),
    concepts: [],
  };
  if (fs.existsSync(knowledgePath)) {
    const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
    page.prerequisites = [...new Set((doc.prerequisites ?? []).map(String))];
    page.forwardReferences = new Set((doc.forward_references ?? []).map(String));
    page.concepts = (doc.concepts ?? []).map((raw, order) => normalizeConcept(raw, id, order));
    concepts.push(...page.concepts);
  }
  pages.set(id, page);
}

const ancestorCache = new Map();
for (const page of pages.values()) page.ancestors = collectAncestors(page.id, new Set());
const changedFiles = changedOnly ? collectChangedFiles() : new Set();

const aliases = concepts
  .flatMap((concept) => concept.aliases.map((alias) => ({ concept, alias, normalized: normalizeSemantic(alias) })))
  .filter((item) => item.normalized.length >= 2)
  .sort((a, b) => b.normalized.length - a.normalized.length);

for (const page of pages.values()) {
  if (!fs.existsSync(page.fullPath) || !fs.existsSync(page.knowledgePath)) continue;
  const source = fs.readFileSync(page.fullPath, 'utf8');
  const lines = stripNonReaderContent(source).split(/\r?\n/);
  const pageTouched = !changedOnly || changedFiles.has(page.path) || changedFiles.has(page.knowledgeRel);
  if (changedOnly && !pageTouched) continue;

  for (const concept of page.concepts) concept.introductionLine = findIntroductionLine(lines, concept);

  const uses = new Map();
  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    if (!rawLine.trim()) continue;
    const lineNumber = i + 1;
    const normalizedLine = normalizeSemantic(rawLine);

    // 登録済みaliasが「○○より / ○○によれば / ○○を用いる」等の
    // 論証表現に直結している場合を拾う。CLTより、のような略称も対象。
    for (const item of aliases) {
      if (!normalizedLine.includes(item.normalized)) continue;
      if (!hasDependencyMarkerAfterAlias(normalizedLine, item.normalized)) continue;
      uses.set(`${lineNumber}:${item.concept.id}`, { line: lineNumber, concept: item.concept, raw: compact(rawLine) });
    }

    // 未登録の「○○定理より」も見えるよう、formal名を根拠表現の直前から抽出する。
    for (const candidate of extractNamedDependencyCandidates(rawLine)) {
      if (isGenericDependencyCandidate(candidate)) continue;
      const resolved = resolveCandidate(candidate, aliases);
      if (resolved) {
        uses.set(`${lineNumber}:${resolved.id}`, { line: lineNumber, concept: resolved, raw: compact(rawLine) });
        continue;
      }
      findings.push({
        severity: strict && pageTouched ? 'ERROR' : 'AUDIT',
        file: page.path,
        line: lineNumber,
        message: `明示的な論証依存「${candidate}」を検出しましたが、knowledge.yaml の概念aliasへ解決できません。定理・補題・公式等を概念登録してください。`,
      });
    }
  }

  for (const use of uses.values()) validateExplicitUse(page, use, pageTouched);
}

const counts = countBySeverity(findings);
console.log(strict ? 'DREAM THEATER 明示的論証依存検証（strict）' : 'DREAM THEATER 明示的論証依存監査');
console.log(`対象ページ: ${pagePaths.length} / 登録概念: ${concepts.length}`);
if (changedOnly) console.log(`変更ファイル: ${changedFiles.size}`);
console.log(`ERROR: ${counts.ERROR ?? 0} / WARN: ${counts.WARN ?? 0} / AUDIT: ${counts.AUDIT ?? 0}`);
for (const finding of findings.slice(0, 250)) {
  console.log(`- [${finding.severity}] ${finding.file}:${finding.line} ${finding.message}`);
}
if (findings.length > 250) console.log(`  ...ほか ${findings.length - 250} 件`);
if (strict && findings.some((finding) => finding.severity === 'ERROR')) process.exit(1);

function validateExplicitUse(page, use, pageTouched) {
  const concept = use.concept;
  let problem = null;

  if (concept.pageId === page.id) {
    const intro = concept.introductionLine;
    if (intro == null || intro >= use.line) {
      problem = intro == null
        ? `同ページの概念「${concept.name}」(${concept.id}) を論証根拠として使っていますが、先行する導入を確認できません。`
        : `同ページの概念「${concept.name}」(${concept.id}) を ${use.line} 行目で論証根拠として使っていますが、導入は ${intro} 行目で先行していません。`;
    }
  } else if (!page.ancestors.has(concept.pageId)) {
    const forwardOnly = page.forwardReferences.has(concept.id);
    problem = `概念「${concept.name}」(${concept.id}) を論証根拠として使っていますが、導入ページ ${concept.pageId} は ${page.id} の prerequisite から到達できません。`;
    if (forwardOnly) problem += ' forward_references は予告用であり、証明・導出の依存関係を満たしません。';
  }

  if (!problem) return;
  findings.push({
    severity: strict && pageTouched ? 'ERROR' : 'AUDIT',
    file: page.path,
    line: use.line,
    message: problem,
  });
}

function hasDependencyMarkerAfterAlias(line, alias) {
  let offset = 0;
  while (true) {
    const index = line.indexOf(alias, offset);
    if (index < 0) return false;
    const tail = line.slice(index + alias.length);
    if (/^(?:の(?:定理|補題|命題|系|公式|不等式|原理|法則|恒等式|条件))?(?:により|によれば|より|から|を用(?:いる|いて|いれば|いた)|を使(?:う|って|えば|い)|を適用(?:する|して)|の系として)/u.test(tail)) return true;
    offset = index + alias.length;
  }
}

function extractNamedDependencyCandidates(line) {
  const text = line
    .replace(/[*_>#`\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const out = [];
  const marker = /(?:により|によれば|より|から|を用(?:いる|いて|いれば|いた)|を使(?:う|って|えば|い)|を適用(?:する|して)|の系として)/gu;
  for (const match of text.matchAll(marker)) {
    const prefix = text.slice(0, match.index).trimEnd();
    const named = prefix.match(/(?:^|[、。；;:：!！?？「」『』（）()])\s*([^、。；;:：!！?？「」『』（）()]{1,80}?(?:定理|補題|命題|公式|不等式|原理|法則|恒等式|条件|定義))\s*$/u);
    if (!named) continue;
    const candidate = named[1].trim().replace(/^(?:また|さらに|ここで|したがって|よって)\s*/u, '');
    if (candidate) out.push(candidate);
  }
  return [...new Set(out)];
}

function resolveCandidate(candidate, aliasItems) {
  const normalized = normalizeSemantic(candidate);
  for (const item of aliasItems) {
    if (item.normalized === normalized) return item.concept;
  }
  // 「Slutskyの定理」対「Slutsky定理」のような軽微な表記差だけを許す。
  const relaxed = normalized.replace(/の(?=定理|補題|命題|公式|不等式|原理|法則|恒等式|条件)/gu, '');
  for (const item of aliasItems) {
    const aliasRelaxed = item.normalized.replace(/の(?=定理|補題|命題|公式|不等式|原理|法則|恒等式|条件)/gu, '');
    if (aliasRelaxed === relaxed) return item.concept;
  }
  return null;
}

function isGenericDependencyCandidate(candidate) {
  const value = normalizeSemantic(candidate);
  return new Set([
    '定義', 'この定義', '上の定義', '前の定義', '同じ定義',
    '条件', 'この条件', '上の条件', '前の条件', '仮定の条件',
    '公式', '上の公式', 'この公式', '前の公式',
    '不等式', '上の不等式', 'この不等式', '前の不等式',
    '定理', '上の定理', 'この定理', '前の定理',
  ]).has(value);
}

function findIntroductionLine(lines, concept) {
  const markers = concept.introductionAliases.length ? concept.introductionAliases : concept.aliases;
  if (concept.introduction === 'inline' || concept.introduction === 'prose-math' || concept.kind === 'term') {
    return firstAliasUse(lines, markers);
  }
  for (let i = 0; i < lines.length; i += 1) {
    if (!isFormalDeclarationLine(lines[i])) continue;
    if (markers.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
  }
  return null;
}

function firstAliasUse(lines, aliasesToFind) {
  for (let i = 0; i < lines.length; i += 1) {
    if (aliasesToFind.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
  }
  return null;
}

function aliasAppears(line, alias) {
  const needle = String(alias).trim();
  if (!needle) return false;
  if (/^[A-Za-z][A-Za-z0-9.^+-]*$/u.test(needle)) {
    return new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(needle)}(?![A-Za-z0-9_])`, 'iu').test(line);
  }
  return line.includes(needle);
}

function isFormalDeclarationLine(line) {
  const text = line.trim();
  if (!text || /^#(?!#)\s+/u.test(text)) return false;
  if (/^[-*]\s*(?:\*\*)?(?:定義|定理|補題|命題|系)(?:\*\*)?\s*[:：]\s*\d+\s*点(?:\s|$)/u.test(text)) return false;
  return /^(?:#{1,6}\s+|>\s*|[-*]\s*)?(?:\*\*)?(?:定義|定理|補題|命題|系)(?:\*\*)?(?:[（(：:\s]|$)/u.test(text)
    || /^#{1,6}\s+.+(?:定理|補題|命題)(?:[（(：:]|$)/u.test(text);
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

function normalizeConcept(raw, pageId, order) {
  const kind = String(raw.kind ?? 'term');
  return {
    id: String(raw.id ?? ''),
    name: String(raw.name ?? ''),
    kind,
    introduction: raw.introduction ? String(raw.introduction) : (kind === 'term' ? 'inline' : 'formal'),
    aliases: [...new Set([raw.name, ...(raw.aliases ?? [])].map((value) => String(value).trim()).filter(Boolean))],
    introductionAliases: [...new Set((raw.introduction_aliases ?? []).map((value) => String(value).trim()).filter(Boolean))],
    pageId,
    order,
    introductionLine: null,
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
  if (visiting.has(pageId)) return new Set();
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
  if (!base) return new Set();
  try {
    const output = execFileSync('git', [
      '-c', 'core.quotepath=false',
      'diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--',
      'textbook/volumes/00_foundations',
      'textbook/dream-theater-index.json',
      'textbook/dream-theater-knowledge.yaml',
    ], { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    return new Set(output.split('\n').map((value) => value.trim()).filter(Boolean));
  } catch (error) {
    console.warn(`明示的論証依存 changed-only の git diff に失敗しました: ${error.message}`);
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

function normalizeSemantic(value) {
  return String(value)
    .replace(/[\s*_>#`\[\]「」『』]/g, '')
    .replace(/\\,/g, '')
    .replace(/\\!/g, '')
    .toLocaleLowerCase('en-US');
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
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function fatal(message) { console.error(message); process.exit(1); }
