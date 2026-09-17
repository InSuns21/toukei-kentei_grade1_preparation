import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';
import {
  activeLocalOwners,
  aliasAppears,
  buildLocalAliasIntroductions,
  findConceptIntroductionLine,
  normalizeAlias,
  normalizeConcept,
  stripNonReaderContent,
} from './lib/dream-theater-concept-resolution.mjs';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');
const selfTest = process.argv.includes('--self-test');

if (selfTest) {
  process.exit(runSelfTest() ? 0 : 1);
}

const index = JSON.parse(fs.readFileSync(path.join(root, 'textbook/dream-theater-index.json'), 'utf8'));
const policy = YAML.parse(fs.readFileSync(path.join(root, 'textbook/dream-theater-knowledge.yaml'), 'utf8')) ?? {};
const metadataFile = policy.metadata_file || 'knowledge.yaml';
const pagePaths = (index.sections ?? []).flatMap((section) => section.paths ?? []);
const changed = changedOnly ? collectChangedLineNumbers() : { files: new Set(), lines: new Map(), base: null };
const pages = new Map();
const concepts = new Map();
const aliasOwners = new Map();
const findings = [];

for (const relPath of pagePaths) {
  const id = inferPageId(relPath);
  const fullPath = path.join(root, relPath);
  const knowledgePath = path.join(path.dirname(fullPath), metadataFile);
  const knowledgeRel = relative(knowledgePath);
  const page = {
    id,
    path: relPath,
    fullPath,
    knowledgePath,
    knowledgeRel,
    prerequisites: [],
    forwardReferences: new Set(),
    concepts: [],
    ancestors: new Set(),
    source: fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '',
    localAliases: new Map(),
  };
  if (fs.existsSync(knowledgePath)) {
    const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
    page.prerequisites = [...new Set((doc.prerequisites ?? []).map(String))];
    page.forwardReferences = new Set((doc.forward_references ?? []).map(String));
    page.concepts = (doc.concepts ?? []).map((raw, order) => normalizeConcept(raw, id, order));
    page.localAliases = buildLocalAliasIntroductions(page.source, doc, id);
    for (const concept of page.concepts) {
      concept.page = page;
      concept.declarationLine = findConceptIntroductionLine(page.source, concept);
      concepts.set(concept.id, concept);
      for (const alias of concept.aliases) {
        const key = normalizeAlias(alias);
        if (!key) continue;
        const owners = aliasOwners.get(key) ?? [];
        owners.push(concept);
        aliasOwners.set(key, owners);
      }
    }
  }
  pages.set(id, page);
}

const ancestorCache = new Map();
for (const page of pages.values()) page.ancestors = collectAncestors(page.id, new Set());

const baseAliasOwners = changed.base ? loadBaseAliasOwners(changed.base) : new Map();

for (const [alias, owners] of aliasOwners.entries()) {
  const uniqueIds = [...new Set(owners.map((owner) => owner.id))];
  if (uniqueIds.length <= 1) continue;

  const baseIds = baseAliasOwners.get(alias) ?? new Set();
  const currentIds = new Set(uniqueIds);
  const collisionChanged = !sameSet(baseIds, currentIds);
  const touchesOwnerKnowledge = owners.some((owner) => changed.files.has(owner.page.knowledgeRel));
  const mustBlock = strict && changedOnly && collisionChanged && touchesOwnerKnowledge;

  findings.push({
    severity: mustBlock ? 'ERROR' : 'WARN',
    file: 'textbook/dream-theater-knowledge.yaml',
    line: 1,
    message: `${mustBlock ? '新しい' : '既存の'} alias衝突「${alias}」: ${uniqueIds.join(', ')}。同名を維持するなら使用箇所で一意に解決できる設計にしてください。`,
  });
}

for (const page of pages.values()) {
  if (!page.source || !fs.existsSync(page.knowledgePath)) continue;
  const pageTouched = !changedOnly || changed.files.has(page.path) || changed.files.has(page.knowledgeRel);
  if (changedOnly && !pageTouched) continue;

  const readerLines = stripNonReaderContent(page.source).split(/\r?\n/u).map((line) => line.replace(/<a\s+id=[^>]+><\/a>/gu, ''));

  for (const concept of page.concepts) {
    const firstUse = firstAliasUse(readerLines, concept.aliases);
    const intro = concept.declarationLine;
    if (firstUse == null || intro == null || firstUse >= intro) continue;

    const existedInBase = changed.base ? baseHasFirstUseViolation(changed.base, page, concept.id) : false;
    const newlyBlocking = !changedOnly || !existedInBase;
    const mustBlock = strict && pageTouched && newlyBlocking;
    findings.push({
      severity: mustBlock ? 'ERROR' : 'AUDIT',
      file: page.path,
      line: firstUse,
      message: `概念「${concept.name}」(${concept.id}) を ${firstUse} 行目で先に使用していますが、導入は ${intro} 行目です。定義・導入を先行させてください。`,
    });
  }

  for (const [alias, owners] of aliasOwners.entries()) {
    if (owners.length <= 1) continue;
    for (let i = 0; i < readerLines.length; i += 1) {
      const lineNumber = i + 1;
      if (!aliasAppears(readerLines[i], owners[0].aliases.find((value) => normalizeAlias(value) === alias) ?? owners[0].name)) continue;
      if (changedOnly && !changed.lines.get(page.path)?.has(lineNumber)) continue;

      const resolution = resolveAliasOwners(page, alias, owners, lineNumber);
      if (resolution.status !== 'ambiguous') continue;
      findings.push({
        severity: strict ? 'ERROR' : 'AUDIT',
        file: page.path,
        line: lineNumber,
        message: `alias「${alias}」を複数概念へ解決できます: ${resolution.owners.map((owner) => owner.id).join(', ')}。語を修飾するか alias を分離してください。`,
      });
    }
  }

  const candidateLines = changedOnly ? changed.lines.get(page.path) ?? new Set() : new Set(readerLines.map((_, index) => index + 1));
  for (const lineNumber of candidateLines) {
    const rawLine = readerLines[lineNumber - 1] ?? '';
    for (const candidate of extractTechnicalCandidates(rawLine)) {
      const key = normalizeAlias(candidate);
      if (!key || isIgnoredCandidate(key)) continue;
      const owners = aliasOwners.get(key) ?? [];
      if (owners.length) continue;
      findings.push({
        severity: strict ? 'ERROR' : 'AUDIT',
        file: page.path,
        line: lineNumber,
        message: `未定義の専門語候補「${candidate}」を検出しました。prerequisiteで導入済みなら knowledge alias を登録し、この章の新概念なら先に定義・導入してください。`,
      });
    }
  }
}

const counts = countBySeverity(findings);
console.log(strict ? 'DREAM THEATER 未定義語・first-use・alias衝突検証（strict）' : 'DREAM THEATER 未定義語・first-use・alias衝突監査');
console.log(`対象ページ: ${pagePaths.length} / 登録概念: ${concepts.size} / alias: ${aliasOwners.size}`);
if (changedOnly) console.log(`変更ファイル: ${changed.files.size} / 変更本文行を未定義語・曖昧aliasのblocking対象に限定`);
console.log(`ERROR: ${counts.ERROR ?? 0} / WARN: ${counts.WARN ?? 0} / AUDIT: ${counts.AUDIT ?? 0}`);
for (const finding of findings.slice(0, 250)) {
  console.log(`- [${finding.severity}] ${finding.file}:${finding.line} ${finding.message}`);
}
if (findings.length > 250) console.log(`  ...ほか ${findings.length - 250} 件`);
if (strict && findings.some((finding) => finding.severity === 'ERROR')) process.exit(1);

function resolveAliasOwners(page, alias, owners, lineNumber) {
  const activeLocal = activeLocalOwners(page.localAliases, alias, lineNumber).map((entry) => entry.concept);
  if (activeLocal.length === 1) return { status: 'resolved', owners: activeLocal };
  if (activeLocal.length > 1) return { status: 'ambiguous', owners: activeLocal };

  const reachable = owners.filter((owner) => owner.page.id !== page.id && page.ancestors.has(owner.page.id));
  if (reachable.length <= 1) return { status: reachable.length === 1 ? 'resolved' : 'unresolved', owners: reachable };
  return { status: 'ambiguous', owners: reachable };
}

function firstAliasUse(lines, aliases) {
  for (let i = 0; i < lines.length; i += 1) {
    if (aliases.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
  }
  return null;
}

function extractTechnicalCandidates(line) {
  const text = String(line ?? '');
  const highConfidence = [];
  const isHeading = /^#{1,6}\s+/u.test(text.trim());
  const isFormalTitle = /(?:定義|定理|補題|命題|系)[（(]/u.test(text);
  const isExerciseHeading = /^#{1,6}\s+(?:[A-Z][A-Z0-9]*\d*-[ABC]\d{2}\b|[A-Z][A-Z0-9]*-\d+\b)/u.test(text.trim());
  if (isExerciseHeading) return [];
  const boldSpans = [...text.matchAll(/\*\*([^*]{2,80})\*\*/gu)]
    .map((match) => match[1])
    .filter((span) => !/^(?:定義の確認|例|演習|補足)[：:。]?/u.test(span.trim()));
  const definitionLike = /(?:とは|と呼(?:ぶ|び)|を(?:いう|定義する)|任意の|各|すべての)/u.test(text);
  if (!(isHeading || isFormalTitle || boldSpans.length || definitionLike)) return [];

  // In ordinary prose, bold spans are intentional technical labels. Scanning the
  // entire sentence turns phrases such as 「使う関数」「一般の関数」 into false terms.
  const sources = isHeading || isFormalTitle ? [text, ...boldSpans] : boldSpans.length ? boldSpans : [text];
  const suffix = '(?:関数(?!解析)|連続性|収束|条件|空間|位相|測度|作用素|不等式|原理|法則|変換|分布|確率変数|可測性|コンパクト性|完備性|独立性|正則性|稠密性)';
  const re = new RegExp(`[A-Za-z0-9一-龯ぁ-んァ-ヶ・^+\\-\\s]{2,48}?${suffix}`, 'gu');
  for (const source of sources) {
    for (const match of source.matchAll(re)) {
      const cleaned = cleanCandidate(match[0]);
      if (cleaned) highConfidence.push(cleaned);
    }
  }
  return [...new Set(highConfidence)];
}

function cleanCandidate(value) {
  let candidate = String(value)
    .replace(/^[-*+]\s*/u, '')
    .replace(/^(?:任意の|各|すべての|ある|この|その|上の|次の|ここで|さらに|また|まず|実|複素)+/u, '')
    .trim();
  const particle = candidate.match(/(?:^|.*(?:は|を|が|に|で|と|へ|から|より|なら|として|について))([^はをがにでとへ]{2,48})$/u);
  if (particle) candidate = particle[1].trim();
  candidate = candidate
    .replace(/^(?:の|も|ただし|つまり|前節の|一般の|元の|良い|使う|なる|得られる|持つ|必要な|代表的な|従来の|古典|一意性も|支配して|積分可能だから|周波数から)+/u, '')
    .trim();
  return candidate;
}

function isIgnoredCandidate(value) {
  return new Set([
    '関数', '条件', '空間', '位相', '測度', '変換', '分布', '収束', '確率変数',
    '連続関数', '実関数', '複素関数', '分布関数', '定数関数', '一次関数',
    '連続性', '完備性', '稠密性', '絶対収束', '各点収束', '被積分関数', '平行移動・尺度変換',
  ]).has(value);
}

function baseHasFirstUseViolation(baseSha, page, conceptId) {
  try {
    const baseSource = execFileSync('git', ['show', `${baseSha}:${page.path}`], { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    const baseKnowledge = YAML.parse(execFileSync('git', ['show', `${baseSha}:${page.knowledgeRel}`], { cwd: root, encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 })) ?? {};
    const raw = (baseKnowledge.concepts ?? []).find((entry) => String(entry?.id ?? '') === conceptId);
    if (!raw) return false;
    const concept = normalizeConcept(raw, page.id, 0);
    const lines = stripNonReaderContent(baseSource).split(/\r?\n/u);
    const firstUse = firstAliasUse(lines, concept.aliases);
    const intro = findConceptIntroductionLine(baseSource, concept);
    return firstUse != null && intro != null && firstUse < intro;
  } catch {
    return false;
  }
}

function loadBaseAliasOwners(baseSha) {
  const out = new Map();
  if (!baseSha) return out;
  for (const relPath of pagePaths) {
    const knowledgeRel = path.join(path.dirname(relPath), metadataFile).replaceAll(path.sep, '/');
    try {
      const doc = YAML.parse(execFileSync('git', ['show', `${baseSha}:${knowledgeRel}`], { cwd: root, encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 })) ?? {};
      for (const raw of doc.concepts ?? []) {
        const id = String(raw?.id ?? '');
        for (const alias of [raw?.name, ...(raw?.aliases ?? [])]) {
          const key = normalizeAlias(alias);
          if (!key) continue;
          const ids = out.get(key) ?? new Set();
          ids.add(id);
          out.set(key, ids);
        }
      }
    } catch {
      // Baseに存在しない新規ページは無視。
    }
  }
  return out;
}

function collectChangedLineNumbers() {
  const files = new Set();
  const lines = new Map();
  const base = resolveDiffBase();
  if (!base) return { files, lines, base: null };
  try {
    const names = execFileSync('git', ['-c', 'core.quotepath=false', 'diff', '--name-only', '--diff-filter=ACMR', `${base}...HEAD`], { cwd: root, encoding: 'utf8' });
    for (const name of names.split(/\r?\n/u).filter(Boolean)) files.add(name);

    const diff = execFileSync('git', ['-c', 'core.quotepath=false', 'diff', '--unified=0', '--no-color', `${base}...HEAD`, '--', 'textbook/volumes/00_foundations/**'], { cwd: root, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    let currentFile = null;
    let currentLine = 0;
    for (const line of diff.split(/\r?\n/u)) {
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
    console.warn(`undefined-term changed-only の git diff に失敗しました: ${error.message}`);
  }
  return { files, lines, base };
}

function resolveDiffBase() {
  const explicit = process.env.DREAM_THEATER_BASE_SHA?.trim() || process.env.TERMINOLOGY_BASE_SHA?.trim();
  if (explicit && !/^0+$/u.test(explicit)) return explicit;
  for (const candidate of ['origin/main', 'main']) {
    try {
      return execFileSync('git', ['merge-base', 'HEAD', candidate], { cwd: root, encoding: 'utf8' }).trim();
    } catch {
      // try next
    }
  }
  return null;
}

function collectAncestors(pageId, visiting) {
  if (ancestorCache.has(pageId)) return ancestorCache.get(pageId);
  if (visiting.has(pageId)) return new Set();
  const page = pages.get(pageId);
  if (!page) return new Set();
  const next = new Set(visiting).add(pageId);
  const out = new Set();
  for (const prerequisite of page.prerequisites) {
    out.add(prerequisite);
    for (const ancestor of collectAncestors(prerequisite, next)) out.add(ancestor);
  }
  ancestorCache.set(pageId, out);
  return out;
}

function sameSet(a, b) {
  if (a.size !== b.size) return false;
  for (const value of a) if (!b.has(value)) return false;
  return true;
}

function inferPageId(relPath) {
  const dir = path.basename(path.dirname(relPath));
  const parts = dir.split('_');
  if (parts.length >= 2 && parts[0] === 'F0') return `F0-${parts[1]}`;
  return dir;
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function countBySeverity(items) {
  return items.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] ?? 0) + 1;
    return acc;
  }, {});
}

function runSelfTest() {
  const failures = [];
  const candidates = extractTechnicalCandidates('## bounded Lipschitz関数で分布収束を判定できる');
  if (!candidates.some((value) => normalizeAlias(value) === 'boundedlipschitz関数')) failures.push('undefined technical term extraction');

  const source = [
    '# test',
    'Lipschitz連続を先に使う。',
    '<!-- formal-statement-start -->',
    '> **定義（Lipschitz連続）**',
    '<!-- formal-statement-end -->',
  ].join('\n');
  const concept = normalizeConcept({ id: 'x', name: 'Lipschitz連続', kind: 'definition', aliases: ['Lipschitz連続'] });
  const intro = findConceptIntroductionLine(source, concept);
  const use = firstAliasUse(stripNonReaderContent(source).split(/\r?\n/u), concept.aliases);
  if (!(use === 2 && intro === 4 && use < intro)) failures.push('first-use chronology');

  const doc = { concepts: [{ id: 'local', name: 'Lipschitz連続', kind: 'definition', aliases: ['Lipschitz連続'] }] };
  const local = buildLocalAliasIntroductions(source, doc, 'P');
  if (activeLocalOwners(local, 'Lipschitz連続', 2).length !== 0) failures.push('local shadow before introduction');
  if (activeLocalOwners(local, 'Lipschitz連続', 4).length !== 1) failures.push('local shadow after introduction');

  if (failures.length) {
    console.error(`DREAM THEATER concept audit self-test failed: ${failures.join(', ')}`);
    return false;
  }
  console.log('DREAM THEATER concept audit self-test passed.');
  return true;
}
