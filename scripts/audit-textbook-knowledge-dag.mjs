import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const changedOnly = process.argv.includes('--changed-only');
const writeReport = process.argv.includes('--write-report');

const curriculumPath = path.join(root, 'textbook/curriculum.yaml');
const policyPath = path.join(root, 'textbook/knowledge-dag.yaml');
const reportPath = path.join(root, 'textbook/knowledge-dag-report.md');

if (!fs.existsSync(curriculumPath)) fatal('textbook/curriculum.yaml が見つかりません。');
if (!fs.existsSync(policyPath)) fatal('textbook/knowledge-dag.yaml が見つかりません。');

const curriculum = YAML.parse(fs.readFileSync(curriculumPath, 'utf8')) ?? {};
const policy = YAML.parse(fs.readFileSync(policyPath, 'utf8')) ?? {};
const findings = [];

const volumes = new Map();
for (const [rank, volume] of (curriculum.volumes ?? []).entries()) {
  if (!volume?.id || !volume?.directory) continue;
  volumes.set(String(volume.id), { id: String(volume.id), directory: String(volume.directory), rank });
}

const chapters = new Map();
for (const [order, raw] of (curriculum.chapters ?? []).entries()) {
  if (!raw?.id) continue;
  const id = String(raw.id);
  if (chapters.has(id)) {
    findings.push(errorFinding('textbook/curriculum.yaml', 1, `章ID ${id} が重複しています。`));
    continue;
  }
  const volumeId = String(raw.volume ?? '');
  chapters.set(id, {
    id,
    title: String(raw.title ?? id),
    volumeId,
    volumeRank: volumes.get(volumeId)?.rank ?? Number.POSITIVE_INFINITY,
    prerequisites: uniqueStrings(raw.prerequisites),
    order,
    indexPath: null,
    manifestPath: null,
    manifest: null,
    ancestors: new Set(),
  });
}

for (const chapter of chapters.values()) {
  for (const prerequisite of chapter.prerequisites) {
    if (!chapters.has(prerequisite)) {
      findings.push(errorFinding('textbook/curriculum.yaml', 1, `${chapter.id}: 存在しない prerequisite ${prerequisite} があります。`));
    }
  }
}

attachChapterFiles();

const ancestorCache = new Map();
for (const chapter of chapters.values()) chapter.ancestors = collectAncestors(chapter.id, new Set());

const diffBase = changedOnly ? resolveDiffBase() : null;
const changedFiles = changedOnly ? collectChangedFiles(diffBase) : new Set();
const changedCurriculumChapters = changedOnly ? collectChangedCurriculumChapters(diffBase) : new Set();

for (const chapter of chapters.values()) {
  for (const prerequisiteId of chapter.prerequisites) {
    const prerequisite = chapters.get(prerequisiteId);
    if (!prerequisite) continue;
    if (prerequisite.volumeRank <= chapter.volumeRank) continue;
    if (policy.strict?.reject_future_volume_prerequisite === false) continue;

    findings.push({
      severity: shouldBlockChapter(chapter) ? 'ERROR' : 'AUDIT',
      file: chapter.manifestPath ? relative(chapter.manifestPath) : 'textbook/curriculum.yaml',
      line: 1,
      code: 'future-volume-prerequisite',
      message: `${chapter.id}（${chapter.volumeId}）が後続volumeの ${prerequisiteId}（${prerequisite.volumeId}）を prerequisite にしています。通常読順では未来参照です。`,
    });
  }

  if (!chapter.manifest) continue;
  const manifestPrerequisites = uniqueStrings(chapter.manifest.prerequisites);
  const canonical = [...chapter.prerequisites].sort();
  const local = [...manifestPrerequisites].sort();
  if (JSON.stringify(canonical) !== JSON.stringify(local) && policy.strict?.reject_prerequisite_metadata_drift !== false) {
    findings.push({
      severity: shouldBlockChapter(chapter) ? 'ERROR' : 'AUDIT',
      file: relative(chapter.manifestPath),
      line: 1,
      code: 'prerequisite-metadata-drift',
      message: `chapter.yaml prerequisites=[${local.join(', ')}] が curriculum.yaml の正本 [${canonical.join(', ')}] と一致しません。`,
    });
  }
}

const concepts = normalizeConcepts(policy.concepts ?? []);
const conceptById = new Map();
const aliases = new Map();

for (const concept of concepts) {
  if (conceptById.has(concept.id)) {
    findings.push(errorFinding('textbook/knowledge-dag.yaml', 1, `概念ID ${concept.id} が重複しています。`));
    continue;
  }
  conceptById.set(concept.id, concept);

  for (const intro of concept.introducedIn) {
    if (!chapters.has(intro)) {
      findings.push(errorFinding('textbook/knowledge-dag.yaml', 1, `${concept.id}: introduced_in に未知の章 ${intro} があります。`));
    }
  }

  for (const alias of concept.aliases) {
    const key = normalizeAlias(alias);
    const owners = aliases.get(key) ?? [];
    owners.push(concept.id);
    aliases.set(key, owners);
  }
}

for (const [alias, owners] of aliases.entries()) {
  if (owners.length > 1) {
    findings.push({ severity: 'WARN', file: 'textbook/knowledge-dag.yaml', line: 1, code: 'duplicate-alias', message: `別概念が同じ alias「${alias}」を共有しています: ${owners.join(', ')}` });
  }
}

for (const concept of concepts) {
  for (const requiredId of concept.requires) {
    if (!conceptById.has(requiredId)) {
      findings.push(errorFinding('textbook/knowledge-dag.yaml', 1, `${concept.id} が未知の依存概念 ${requiredId} を要求しています。`));
      continue;
    }
    const required = conceptById.get(requiredId);
    for (const introId of concept.introducedIn) {
      const intro = chapters.get(introId);
      if (!intro) continue;
      const reachable = required.introducedIn.some((requiredIntro) => requiredIntro === introId || intro.ancestors.has(requiredIntro));
      if (!reachable && policy.strict?.reject_unresolved_concept_dependency !== false) {
        findings.push({
          severity: 'AUDIT',
          file: 'textbook/knowledge-dag.yaml',
          line: 1,
          code: 'unresolved-concept-dependency',
          message: `${concept.id} は ${requiredId} を要求しますが、導入章 ${introId} の prerequisite から依存概念の導入章へ到達できません。`,
        });
      }
    }
  }
}

for (const chapter of chapters.values()) {
  if (!chapter.indexPath || !fs.existsSync(chapter.indexPath)) continue;
  const source = fs.readFileSync(chapter.indexPath, 'utf8');
  const readerSource = stripNonReaderContent(source);
  const lines = readerSource.split(/\r?\n/);
  const forwardReferences = new Set(uniqueStrings(chapter.manifest?.forward_references));

  for (const concept of concepts) {
    const firstUse = firstAliasUse(lines, concept.aliases);
    if (firstUse == null) continue;

    const reachable = concept.introducedIn.some((intro) => intro === chapter.id || chapter.ancestors.has(intro));
    if (reachable) continue;
    if (forwardReferences.has(concept.id)) continue;
    if (policy.strict?.reject_unreachable_registered_concept === false) continue;

    findings.push({
      severity: shouldBlockChapter(chapter) ? 'ERROR' : 'AUDIT',
      file: relative(chapter.indexPath),
      line: firstUse,
      code: 'unreachable-concept',
      message: `概念「${concept.name}」(${concept.id}) を使用していますが、導入章 ${concept.introducedIn.join(' / ')} は ${chapter.id} の prerequisite から到達できません。意図的な予告なら chapter.yaml の forward_references に登録してください。`,
    });
  }
}

const report = buildReport();
if (writeReport) fs.writeFileSync(reportPath, report, 'utf8');

const counts = countBySeverity(findings);
console.log(strict ? '通常教材 知識DAG検証（strict）' : '通常教材 知識DAG監査');
console.log(`対象章: ${chapters.size} / 登録概念: ${concepts.length}`);
if (changedOnly) console.log(`変更ファイル: ${changedFiles.size}`);
console.log(`ERROR: ${counts.ERROR ?? 0} / WARN: ${counts.WARN ?? 0} / AUDIT: ${counts.AUDIT ?? 0}`);
for (const item of findings.slice(0, 250)) console.log(`- [${item.severity}] ${item.file}:${item.line} ${item.code ?? 'validation'}: ${item.message}`);
if (findings.length > 250) console.log(`  ...ほか ${findings.length - 250} 件`);
if (writeReport) console.log(`知識DAGレポートを書き出しました: ${relative(reportPath)}`);

if (!strict) {
  console.log('audit モードでは既存の読順矛盾・metadata drift・登録概念の未到達利用を一覧化します。');
  console.log('changed-only strict では既存負債を直ちに全ブロックせず、変更章で同種の違反を増やすことを止めます。');
}

if (strict && findings.some((item) => item.severity === 'ERROR')) process.exit(1);

function attachChapterFiles() {
  for (const volume of volumes.values()) {
    const volumeDir = path.join(root, 'textbook', volume.directory);
    if (!fs.existsSync(volumeDir)) continue;

    for (const entry of fs.readdirSync(volumeDir, { withFileTypes: true }).filter((item) => item.isDirectory())) {
      const chapterDir = path.join(volumeDir, entry.name);
      const manifestPath = path.join(chapterDir, 'chapter.yaml');
      if (!fs.existsSync(manifestPath)) continue;

      let manifest;
      try {
        manifest = YAML.parse(fs.readFileSync(manifestPath, 'utf8')) ?? {};
      } catch (error) {
        findings.push(errorFinding(relative(manifestPath), 1, `chapter.yaml を解析できません: ${error.message}`));
        continue;
      }
      if (manifest.status === 'supplementary') continue;
      const id = String(manifest.id ?? '');
      const chapter = chapters.get(id);
      if (!chapter) continue;
      if (chapter.manifestPath) {
        findings.push(errorFinding(relative(manifestPath), 1, `章 ${id} の chapter.yaml が複数あります。`));
        continue;
      }
      chapter.manifestPath = manifestPath;
      chapter.indexPath = path.join(chapterDir, 'index.md');
      chapter.manifest = manifest;
    }
  }
}

function collectAncestors(chapterId, visiting) {
  if (ancestorCache.has(chapterId)) return ancestorCache.get(chapterId);
  if (visiting.has(chapterId)) {
    findings.push(errorFinding('textbook/curriculum.yaml', 1, `prerequisite cycle detected at ${chapterId}`));
    return new Set();
  }
  const nextVisiting = new Set(visiting).add(chapterId);
  const out = new Set();
  const chapter = chapters.get(chapterId);
  for (const prerequisite of chapter?.prerequisites ?? []) {
    out.add(prerequisite);
    if (!chapters.has(prerequisite)) continue;
    for (const ancestor of collectAncestors(prerequisite, nextVisiting)) out.add(ancestor);
  }
  ancestorCache.set(chapterId, out);
  return out;
}

function normalizeConcepts(rawConcepts) {
  return rawConcepts.map((raw, index) => {
    if (!raw?.id || !raw?.name || !raw?.introduced_in) {
      findings.push(errorFinding('textbook/knowledge-dag.yaml', 1, `concepts[${index}] は id/name/introduced_in が必須です。`));
    }
    const introducedIn = Array.isArray(raw?.introduced_in) ? uniqueStrings(raw.introduced_in) : uniqueStrings([raw?.introduced_in]);
    return {
      id: String(raw?.id ?? `invalid-${index}`),
      name: String(raw?.name ?? raw?.id ?? `invalid-${index}`),
      aliases: [...new Set([raw?.name, ...(raw?.aliases ?? [])].map((value) => String(value ?? '').trim()).filter(Boolean))],
      introducedIn,
      requires: uniqueStrings(raw?.requires),
    };
  });
}

function shouldBlockChapter(chapter) {
  if (!strict) return false;
  if (!changedOnly) return true;
  if (changedCurriculumChapters.has(chapter.id)) return true;
  const relIndex = chapter.indexPath ? relative(chapter.indexPath) : null;
  const relManifest = chapter.manifestPath ? relative(chapter.manifestPath) : null;
  return (relIndex && changedFiles.has(relIndex)) || (relManifest && changedFiles.has(relManifest));
}

function collectChangedFiles(base) {
  if (!base) {
    console.warn('CI差分の基準コミットを取得できないため changed-only 検査対象は0件です。');
    return new Set();
  }
  try {
    const output = execFileSync('git', [
      '-c', 'core.quotepath=false',
      'diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--',
      'textbook/volumes',
      'textbook/curriculum.yaml',
      'textbook/knowledge-dag.yaml',
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

function collectChangedCurriculumChapters(base) {
  if (!base || !changedFiles.has('textbook/curriculum.yaml')) return new Set();
  try {
    const previousSource = execFileSync('git', ['show', `${base}:textbook/curriculum.yaml`], { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    const previous = YAML.parse(previousSource) ?? {};
    const previousById = new Map((previous.chapters ?? []).filter((item) => item?.id).map((item) => [String(item.id), stableChapterShape(item)]));
    const currentById = new Map((curriculum.chapters ?? []).filter((item) => item?.id).map((item) => [String(item.id), stableChapterShape(item)]));
    const ids = new Set([...previousById.keys(), ...currentById.keys()]);
    return new Set([...ids].filter((id) => JSON.stringify(previousById.get(id) ?? null) !== JSON.stringify(currentById.get(id) ?? null)));
  } catch (error) {
    console.warn(`curriculum.yaml の章差分を解析できません: ${error.message}`);
    return new Set();
  }
}

function stableChapterShape(raw) {
  return {
    id: String(raw.id ?? ''),
    title: String(raw.title ?? ''),
    volume: String(raw.volume ?? ''),
    prerequisites: uniqueStrings(raw.prerequisites).sort(),
    official_scope: uniqueStrings(raw.official_scope),
  };
}

function resolveDiffBase() {
  const explicit = process.env.TEXTBOOK_KNOWLEDGE_BASE_SHA?.trim() || process.env.TERMINOLOGY_BASE_SHA?.trim();
  if (explicit && !/^0+$/.test(explicit)) return explicit;
  try {
    return execFileSync('git', ['rev-parse', 'HEAD^'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function firstAliasUse(lines, conceptAliases) {
  for (let i = 0; i < lines.length; i += 1) {
    if (conceptAliases.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
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
  lines.push('# 通常教材 知識DAG監査');
  lines.push('');
  lines.push('`scripts/audit-textbook-knowledge-dag.mjs --write-report` で生成する。');
  lines.push('章DAGの正本は `curriculum.yaml`、概念の高信頼な別名と導入位置は `knowledge-dag.yaml` とする。');
  lines.push('');
  lines.push(`対象章: **${chapters.size}** / 登録概念: **${concepts.length}**`);
  lines.push('');
  lines.push('## 登録概念');
  lines.push('');
  for (const concept of concepts) {
    const deps = concept.requires.length ? ` / requires: ${concept.requires.join(', ')}` : '';
    lines.push(`- **${concept.name}** (${concept.id}) — introduced: ${concept.introducedIn.join(', ')}${deps}`);
  }
  lines.push('');
  lines.push('## Findings');
  lines.push('');
  if (!findings.length) lines.push('- なし');
  for (const item of findings) lines.push(`- [${item.severity}] \`${item.file}:${item.line}\` **${item.code ?? 'validation'}** — ${item.message}`);
  lines.push('');
  return `${lines.join('\n')}\n`;
}

function uniqueStrings(values) {
  return [...new Set((values ?? []).filter((value) => value != null).map((value) => String(value).trim()).filter(Boolean))];
}

function countBySeverity(items) {
  return items.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] ?? 0) + 1;
    return acc;
  }, {});
}

function errorFinding(file, line, message) { return { severity: 'ERROR', file, line, code: 'metadata-error', message }; }
function normalizeAlias(value) { return String(value).trim().toLocaleLowerCase('en-US'); }
function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function relative(file) { return path.relative(root, file).replaceAll('\\', '/'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function fatal(message) { console.error(message); process.exit(1); }
