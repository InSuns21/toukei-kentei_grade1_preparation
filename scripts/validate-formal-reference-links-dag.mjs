import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const ROOT = path.resolve('textbook/volumes');
const REPO = process.cwd();
const DREAM_INDEX = path.resolve('textbook/dream-theater-index.json');
const DREAM_POLICY = path.resolve('textbook/dream-theater-knowledge.yaml');
const FIX = process.argv.includes('--fix');
const STABLE_PREFIX = '(?:def|thm|prop|lem|cor|axiom|principle|ref)';

const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
const anchorRe = new RegExp(`<a\\s+id=["']((${STABLE_PREFIX})-[a-z0-9][a-z0-9-]*)["']\\s*><\\/a>`, 'giu');
const stableFragmentRe = new RegExp(`^${STABLE_PREFIX}-[a-z0-9][a-z0-9-]*$`);
const stableFragmentInHrefRe = new RegExp(`#${STABLE_PREFIX}-[a-z0-9][a-z0-9-]*`);
const formalWord = /(定義|定理|命題|補題|系|公理|原理|不等式|法則|公式|Farkas|KKT|Riesz|Hahn--Banach|Lax--Milgram|Borel--Cantelli|中心極限定理|theorem|lemma|proposition|corollary)/iu;
const dependencyCue = /(証明|導出|出所|由来|遡|参照|詳しく|使(?:う|って|い)|用い|から従|から|より|により|示した|示しました|証明した|導いた)/u;
const formalSource = '(?:定義|定理|命題|補題|系|公理|原理|不等式|法則|公式|Farkas(?:の補題)?|KKT(?:条件)?|Borel--Cantelli(?:第[12]補題)?|中心極限定理|Riesz(?:表現定理)?|Hahn--Banach(?:定理)?|Lax--Milgram(?:定理)?)';
const chapterSource = '(?:F0-[0-9A-Z]+(?:-[0-9A-Z]+)?|P\\d+[A-Z]?|D\\d+[A-Z]?|C\\d+[A-Z]?|E\\d+[A-Z]?|F\\d+[A-Z]?|G\\d+[A-Z]?)';
const priorDependencyRe = new RegExp(`(?:前章|前節|前講義)の.{0,28}${formalSource}.{0,20}(?:から|より|により|を使|を用)`, 'u');
const chapterDependencyRe = new RegExp(`${chapterSource}(?:の|で).{0,18}${formalSource}.{0,20}(?:から|より|により|を使|を用|を証明|で証明|を導出|で導出)`, 'u');
const proofLocationRe = new RegExp(`(?:証明|導出|出所|由来)(?:そのもの)?(?:は|を|が|まで)?\\s*.{0,35}${chapterSource}(?:へ|に|で)`, 'u');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.md' && !full.includes(`${path.sep}review${path.sep}`)) out.push(full);
  }
  return out;
}

function splitHref(href) {
  const [beforeHash, rawFragment = ''] = href.split('#', 2);
  return { pathPart: beforeHash.split('?', 1)[0], fragment: rawFragment.split('?', 1)[0] };
}

function resolveTarget(sourceFile, href) {
  const { pathPart, fragment } = splitHref(href);
  let target;
  if (!pathPart) target = sourceFile;
  else if (pathPart.startsWith('textbook/')) target = path.resolve(REPO, pathPart);
  else target = path.resolve(path.dirname(sourceFile), pathPart);
  return { target, fragment };
}

function explicitAnchors(markdown) {
  return new Set([...markdown.matchAll(anchorRe)].map((m) => m[1]));
}

function preciseDependency(line, label, index, fullMatch) {
  const start = Math.max(0, index - 70);
  const end = Math.min(line.length, index + fullMatch.length + 70);
  const local = line.slice(start, end);
  if (formalWord.test(label) && dependencyCue.test(local)) return true;
  const before = line.slice(Math.max(0, index - 55), index);
  const after = line.slice(index + fullMatch.length, Math.min(line.length, index + fullMatch.length + 70));
  if (/(?:この部分|その部分|ここ|以下|上記).{0,12}(?:の)?(?:証明|導出)(?:は|を)?\s*$/u.test(before)) return true;
  if (/^.{0,30}の「[^」]*(?:定義|定理|補題|証明|導出|Farkas|KKT)[^」]*」を参照/u.test(after)) return true;
  return false;
}

function stripLinksAndCode(line) {
  return line.replace(linkRe, '').replace(/`[^`]*`/g, '').replace(/<[^>]+>/g, '');
}

function stableLinksOnLine(line) {
  return [...line.matchAll(linkRe)].filter((m) => stableFragmentInHrefRe.test(m[2]));
}

function loadDreamTheaterKnowledge(contents) {
  if (!fs.existsSync(DREAM_INDEX) || !fs.existsSync(DREAM_POLICY)) return { pagesByFile: new Map(), aliases: [], concepts: [] };
  const index = JSON.parse(fs.readFileSync(DREAM_INDEX, 'utf8'));
  const policy = YAML.parse(fs.readFileSync(DREAM_POLICY, 'utf8')) ?? {};
  const metadataFile = policy.metadata_file || 'knowledge.yaml';
  const pagesByFile = new Map();
  const concepts = [];
  for (const relPath of (index.sections ?? []).flatMap((section) => section.paths ?? [])) {
    const fullPath = path.resolve(REPO, relPath);
    const knowledgePath = path.join(path.dirname(fullPath), metadataFile);
    if (!fs.existsSync(fullPath) || !fs.existsSync(knowledgePath)) continue;
    const doc = YAML.parse(fs.readFileSync(knowledgePath, 'utf8')) ?? {};
    const page = { id: inferPageId(relPath), path: relPath, fullPath, concepts: [] };
    page.concepts = (doc.concepts ?? []).map((raw, order) => normalizeConcept(raw, page, order));
    concepts.push(...page.concepts);
    pagesByFile.set(fullPath, page);
  }
  const aliases = concepts
    .flatMap((concept) => concept.aliases.map((alias) => ({ concept, alias, normalized: normalizeSemantic(alias) })))
    .filter((item) => item.normalized.length >= 2)
    .sort((a, b) => b.normalized.length - a.normalized.length);
  for (const concept of concepts) concept.reference = deriveCanonicalReference(concept, contents);
  return { pagesByFile, aliases, concepts };
}

function normalizeConcept(raw, page, order) {
  const kind = String(raw.kind ?? 'term');
  return {
    id: String(raw.id ?? ''), name: String(raw.name ?? ''), kind,
    introduction: raw.introduction ? String(raw.introduction) : (kind === 'term' ? 'inline' : 'formal'),
    aliases: [...new Set([raw.name, ...(raw.aliases ?? [])].map((value) => String(value).trim()).filter(Boolean))],
    introductionAliases: [...new Set((raw.introduction_aliases ?? []).map((value) => String(value).trim()).filter(Boolean))],
    page, order, reference: null,
  };
}

function anchorCandidates(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i += 1) {
    for (const match of lines[i].matchAll(anchorRe)) {
      const fragment = match[1];
      const prefix = fragment.split('-', 1)[0];
      let declaration = '';
      let declarationLine = null;
      for (let j = i; j < Math.min(lines.length, i + 18); j += 1) {
        if (j > i && [...lines[j].matchAll(anchorRe)].length) break;
        if (isFormalDeclarationLine(lines[j])) { declaration = lines[j].trim(); declarationLine = j + 1; break; }
      }
      const context = lines.slice(i, Math.min(lines.length, i + 22)).join('\n');
      out.push({ fragment, prefix, line: i + 1, declaration, declarationLine, context });
    }
  }
  return out;
}

function deriveCanonicalReference(concept, contents) {
  const markdown = contents.get(concept.page.fullPath) ?? fs.readFileSync(concept.page.fullPath, 'utf8');
  const candidates = anchorCandidates(markdown);
  const aliases = [...new Set([...concept.introductionAliases, concept.name, ...concept.aliases].map((v) => String(v).trim()).filter(Boolean))];
  let best = null;
  let bestScore = -Infinity;
  for (const candidate of candidates) {
    const score = scoreAnchorCandidate(candidate, concept, aliases);
    if (score > bestScore) { best = candidate; bestScore = score; }
  }
  if (best && bestScore > 0) {
    return { target: concept.page.fullPath, targetRel: concept.page.path, fragment: best.fragment, anchorLine: best.line, score: bestScore };
  }
  const readerLines = stripNonReaderContent(markdown).split(/\r?\n/);
  const rawLines = markdown.split(/\r?\n/);
  const intro = findIntroductionLine(readerLines, concept);
  if (intro == null) return null;
  const nearby = [];
  for (let i = Math.max(0, intro - 24); i < Math.min(rawLines.length, intro + 2); i += 1) {
    for (const match of rawLines[i].matchAll(anchorRe)) nearby.push({ fragment: match[1], line: i + 1 });
  }
  const chosen = nearby.filter((item) => item.line <= intro).at(-1) ?? null;
  return chosen ? { target: concept.page.fullPath, targetRel: concept.page.path, fragment: chosen.fragment, anchorLine: chosen.line, score: 1 } : null;
}

function scoreAnchorCandidate(candidate, concept, aliases) {
  const declarationNorm = normalizeSemantic(candidate.declaration);
  const contextNorm = normalizeSemantic(candidate.context);
  let aliasScore = 0;
  for (const alias of aliases) {
    const normalized = normalizeSemantic(alias);
    if (normalized.length < 2) continue;
    const lengthBonus = Math.min(normalized.length, 80) * 12;
    if (declarationNorm.includes(normalized)) aliasScore = Math.max(aliasScore, 10000 + lengthBonus);
    else if (normalized.length >= 3 && contextNorm.includes(normalized)) aliasScore = Math.max(aliasScore, 3000 + lengthBonus);
  }
  if (!aliasScore) return -Infinity;
  let score = aliasScore;
  const expectedPrefix = { definition: 'def', theorem: 'thm', lemma: 'lem', proposition: 'prop', corollary: 'cor' }[concept.kind];
  if (expectedPrefix && candidate.prefix === expectedPrefix) score += 2400;
  else if (candidate.prefix === 'ref') score += 900;
  else if (expectedPrefix && candidate.prefix === 'def') score -= 7000;
  const declarationKind = formalDeclarationKind(candidate.declaration);
  if (declarationKind && declarationKind === concept.kind) score += 1800;
  else if (declarationKind && concept.kind !== 'term' && declarationKind !== concept.kind) score -= 700;
  const nameNorm = normalizeSemantic(concept.name);
  if (nameNorm.length >= 2 && declarationNorm.includes(nameNorm)) score += 1000;
  for (const introAlias of concept.introductionAliases) {
    const needle = normalizeSemantic(introAlias);
    if (needle.length >= 2 && declarationNorm.includes(needle)) score += 1500;
  }
  return score;
}

function formalDeclarationKind(line) {
  const text = String(line).replace(/^\s*#{1,6}\s+/, '').replace(/^\s*>\s*/, '').trim();
  if (/^(?:\*\*)?定義/u.test(text)) return 'definition';
  if (/^(?:\*\*)?定理/u.test(text)) return 'theorem';
  if (/^(?:\*\*)?補題/u.test(text)) return 'lemma';
  if (/^(?:\*\*)?命題/u.test(text)) return 'proposition';
  if (/^(?:\*\*)?系/u.test(text)) return 'corollary';
  return null;
}

function collectDreamDependencyUses(readerLine, rawLine, lineNumber, aliases) {
  const normalizedLine = normalizeSemantic(readerLine);
  const uses = new Map();
  const acceptedAliasTexts = [];
  for (const item of aliases) {
    if (!normalizedLine.includes(item.normalized)) continue;
    if (acceptedAliasTexts.some((longer) => longer.length > item.normalized.length && longer.includes(item.normalized))) continue;
    if (!hasExplicitReasoningUse(normalizedLine, item)) continue;
    acceptedAliasTexts.push(item.normalized);
    if (isResultLike(item.concept, item.alias)) uses.set(item.concept.id, { concept: item.concept, alias: item.alias, line: lineNumber, raw: rawLine });
  }
  for (const candidate of extractNamedDependencyCandidates(readerLine)) {
    if (isGenericDependencyCandidate(candidate)) continue;
    const resolved = resolveCandidate(candidate, aliases);
    if (resolved && isResultLike(resolved, candidate)) uses.set(resolved.id, { concept: resolved, alias: candidate, line: lineNumber, raw: rawLine });
  }
  return [...uses.values()];
}

function validateOrFixKnowledgeDependencyLink(file, rel, use, line, errors) {
  const reference = use.concept.reference;
  if (!reference) {
    errors.push(`${rel}:${use.line}: knowledge dependency ${use.concept.name} (${use.concept.id}) has no resolvable stable source anchor in ${use.concept.page.path}`);
    return { ok: false, line, fixed: false };
  }
  const expectedHref = hrefToReference(file, reference);
  const matchingLinks = [...line.matchAll(linkRe)].filter((match) => linkLabelNamesConcept(match[1], use.concept));
  for (const match of matchingLinks) {
    const href = match[2].trim();
    if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    const actual = resolveTarget(file, href);
    if (actual.target === reference.target && actual.fragment === reference.fragment) return { ok: true, line, fixed: false };
  }
  if (FIX) {
    const rewritten = rewriteKnowledgeLink(line, use, expectedHref, matchingLinks);
    if (rewritten !== line) return { ok: true, line: rewritten, fixed: true };
  }
  if (matchingLinks.length === 0) errors.push(`${rel}:${use.line}: named proof dependency ${use.concept.name} (${use.concept.id}) must be a clickable link to ${reference.targetRel}#${reference.fragment}`);
  else errors.push(`${rel}:${use.line}: ${use.concept.name} (${use.concept.id}) is linked, but not to its knowledge-DAG source ${reference.targetRel}#${reference.fragment}`);
  return { ok: false, line, fixed: false };
}

function hrefToReference(sourceFile, reference) {
  if (sourceFile === reference.target) return `#${reference.fragment}`;
  const relPath = path.relative(path.dirname(sourceFile), reference.target).replaceAll(path.sep, '/');
  return `${relPath}#${reference.fragment}`;
}

function rewriteKnowledgeLink(line, use, expectedHref, matchingLinks) {
  if (matchingLinks.length) {
    const match = matchingLinks[0];
    const replacement = `[${match[1]}](${expectedHref})`;
    return line.slice(0, match.index) + replacement + line.slice((match.index ?? 0) + match[0].length);
  }
  const spans = [...line.matchAll(linkRe)].map((match) => [match.index ?? 0, (match.index ?? 0) + match[0].length]);
  const aliases = [...new Set([use.alias, use.concept.name, ...use.concept.aliases])]
    .filter(Boolean).sort((a, b) => normalizeSemantic(b).length - normalizeSemantic(a).length);
  for (const alias of aliases) {
    const matcher = flexibleAliasRegExp(alias);
    for (const match of line.matchAll(matcher)) {
      const start = match.index ?? 0;
      const end = start + match[0].length;
      if (spans.some(([a, b]) => start >= a && end <= b)) continue;
      return line.slice(0, start) + `[${match[0]}](${expectedHref})` + line.slice(end);
    }
  }
  return line;
}

function flexibleAliasRegExp(alias) {
  const pieces = String(alias).split(/([‐‑‒–—−-]+|\s+)/u).filter(Boolean).map((part) => {
    if (/^[‐‑‒–—−-]+$/u.test(part)) return '[‐‑‒–—−-]+';
    if (/^\s+$/u.test(part)) return '\\s*';
    return escapeRegExp(part);
  });
  return new RegExp(pieces.join(''), 'giu');
}

function linkLabelNamesConcept(label, concept) {
  const normalized = normalizeSemantic(label);
  return concept.aliases.some((alias) => {
    const needle = normalizeSemantic(alias);
    return needle.length >= 2 && (normalized === needle || normalized.includes(needle));
  });
}

function hasExplicitReasoningUse(line, item) {
  let offset = 0;
  while (true) {
    const index = line.indexOf(item.normalized, offset);
    if (index < 0) return false;
    const tail = line.slice(index + item.normalized.length);
    if (isResultLike(item.concept, item.alias) && /^(?:(?:の)?(?:定理|補題|命題|系))?(?:により|によれば|より(?!弱|強|大|小|高|低|一般|厳|緩)|から|を用(?:いる|いて|いれば|いた)|を使(?:う|って|えば|い)|を適用(?:する|して)|の系として)/u.test(tail)) return true;
    offset = index + item.normalized.length;
  }
}

function isResultLike(concept, alias) {
  if (['theorem', 'lemma', 'proposition', 'corollary'].includes(concept.kind)) return true;
  return /(?:定理|補題|命題|公式|不等式|原理|法則|恒等式)$/u.test(String(alias).trim());
}

function extractNamedDependencyCandidates(line) {
  const text = line.replace(/[*_>#`\[\]]/g, '').replace(/\s+/g, ' ').trim();
  const out = [];
  const marker = /(?:により|によれば|より|から|を用(?:いる|いて|いれば|いた)|を使(?:う|って|えば|い)|を適用(?:する|して)|の系として)/gu;
  for (const match of text.matchAll(marker)) {
    const prefix = text.slice(0, match.index).trimEnd();
    const named = prefix.match(/(?:^|[、。；;:：!！?？「」『』（）()])\s*([^、。；;:：!！?？「」『』（）()]{1,80}?(?:定理|補題|命題|公式|不等式|原理|法則|恒等式|定義))\s*$/u);
    if (!named) continue;
    const candidate = cleanCandidateLead(named[1].trim());
    if (candidate) out.push(candidate);
  }
  return [...new Set(out)];
}

function cleanCandidateLead(value) {
  let candidate = String(value).trim();
  candidate = candidate.replace(/^(?:[-+]\s*)/u, '');
  candidate = candidate.replace(/^(?:また|さらに|ここで|したがって|従って|よって)\s*/u, '');
  candidate = candidate.replace(/^(?:なら|では|について(?:は)?|積分は|積分を|と)\s*/u, '');
  const conjunction = candidate.match(/^.+[、,]\s*([^、,]{2,50}(?:定理|補題|命題|公式|不等式|原理|法則|恒等式|定義))$/u);
  if (conjunction) candidate = conjunction[1].trim();
  return candidate;
}

function resolveCandidate(candidate, aliasItems) {
  const normalized = normalizeSemantic(candidate);
  const base = stripFormalSuffix(normalized);
  const candidateType = formalCandidateType(normalized);
  const compatibleItems = aliasItems.filter((item) => isCandidateCompatible(candidateType, item));
  for (const item of compatibleItems) if (item.normalized === normalized) return item.concept;
  for (const item of compatibleItems) if (item.normalized === base) return item.concept;
  for (const item of compatibleItems) {
    const aliasBase = stripFormalSuffix(item.normalized);
    if (normalized.endsWith(item.normalized) && item.normalized.length >= 4) return item.concept;
    if (base.endsWith(item.normalized) && item.normalized.length >= 4) return item.concept;
    if (aliasBase.length >= 4 && base.endsWith(aliasBase) && isResultLike(item.concept, item.alias)) return item.concept;
    if (candidateType === 'result' && base.length >= 6 && aliasBase.startsWith(`${base}は`) && isResultLike(item.concept, item.alias)) return item.concept;
  }
  return null;
}

function formalCandidateType(value) {
  if (/定義$/u.test(value)) return 'definition';
  if (/(?:定理|補題|命題|系)$/u.test(value)) return 'result';
  if (/(?:公式|不等式|恒等式|原理|法則)$/u.test(value)) return 'formula';
  return 'unknown';
}

function isCandidateCompatible(type, item) {
  if (type === 'unknown') return true;
  if (type === 'definition') return item.concept.kind === 'definition' || /定義$/u.test(item.normalized);
  if (type === 'result') return ['theorem', 'lemma', 'proposition', 'corollary'].includes(item.concept.kind) || /(?:定理|補題|命題|系)$/u.test(item.normalized);
  if (type === 'formula') return /(?:公式|不等式|恒等式|原理|法則)$/u.test(item.normalized) || ['theorem', 'lemma', 'proposition', 'corollary'].includes(item.concept.kind);
  return true;
}

function stripFormalSuffix(value) {
  return String(value).replace(/の(?=定理|補題|命題|公式|不等式|原理|法則|恒等式|定義$)/gu, '').replace(/(?:定理|補題|命題|公式|不等式|原理|法則|恒等式|定義)$/u, '');
}

function isGenericDependencyCandidate(candidate) {
  const value = normalizeSemantic(candidate);
  if (new Set(['定義', 'この定義', '上の定義', '前の定義', '同じ定義', '公式', '上の公式', 'この公式', '前の公式', '不等式', '上の不等式', 'この不等式', '前の不等式', '定理', '上の定理', 'この定理', '前の定理']).has(value)) return true;
  if (/^(?:二つ|2つ|三つ|3つ|複数|いくつか)の/u.test(value)) return true;
  if (/^(?:[A-D]\d+|\d+[.．]|その|これ|それ|同じ|前節の?\s*$)/u.test(value)) return true;
  if (/(?:ことを|を|が|は|なので|なら|について).*(?:定義|定理|補題|命題)$/u.test(value)) return true;
  const base = stripFormalSuffix(value);
  if (!/[A-Za-z0-9πΠλΛα-ωΑ-Ω・\-]/u.test(base) && base.length < 5) return true;
  return false;
}

function findIntroductionLine(lines, concept) {
  const markers = concept.introductionAliases.length ? concept.introductionAliases : concept.aliases;
  if (concept.introduction === 'inline' || concept.introduction === 'prose-math' || concept.kind === 'term') return firstAliasUse(lines, markers);
  for (let i = 0; i < lines.length; i += 1) {
    if (!isFormalDeclarationLine(lines[i])) continue;
    if (markers.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
  }
  return null;
}

function firstAliasUse(lines, aliasesToFind) {
  for (let i = 0; i < lines.length; i += 1) if (aliasesToFind.some((alias) => aliasAppears(lines[i], alias))) return i + 1;
  return null;
}

function aliasAppears(line, alias) {
  const needle = String(alias).trim();
  if (!needle) return false;
  if (/^[A-Za-z][A-Za-z0-9.^+-]*$/u.test(needle)) return new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(needle)}(?![A-Za-z0-9_])`, 'iu').test(line);
  return line.includes(needle);
}

function isFormalDeclarationLine(line) {
  const text = String(line).trim();
  if (!text || /^#(?!#)\s+/u.test(text)) return false;
  if (/^[-*]\s*(?:\*\*)?(?:定義|定理|補題|命題|系)(?:\*\*)?\s*[:：]\s*\d+\s*点(?:\s|$)/u.test(text)) return false;
  return /^(?:#{1,6}\s+|>\s*|[-*]\s*)?(?:\*\*)?(?:定義|定理|補題|命題|系)(?:\*\*)?(?:[（(：:\s]|$)/u.test(text) || /^#{1,6}\s+.+(?:定理|補題|命題)(?:[（(：:]|$)/u.test(text);
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

function inferPageId(relPath) {
  const dir = path.basename(path.dirname(relPath));
  const parts = dir.split('_');
  if (parts.length >= 2 && parts[0] === 'F0') return `F0-${parts[1]}`;
  return dir;
}

function isNavigationOrChecklistLine(line) {
  const text = String(line).trim();
  if (/へ(?:進んでください|進みます|進む|戻ってください|戻る)/u.test(text)) return true;
  if (/(?:で扱います|で扱う予定|後続章で扱|次章で扱|を予告します|への接続として)/u.test(text)) return true;
  if (/(?:次章|次節|後続章|後続節|この先).*(?:説明|導入|扱|証明|確認|見る|学ぶ)/u.test(text)) return true;
  if (/^[-*]\s+.+(?:説明|証明|区別|確認|導出|計算|判断|再現|適用)できる[。.]?$/u.test(text)) return true;
  return false;
}

function normalizeSemantic(value) {
  return String(value).replace(/[‐‑‒–—−]/g, '-').replace(/-+/g, '-').replace(/[\s*_>#`\[\]「」『』]/g, '').replace(/\\,/g, '').replace(/\\!/g, '').toLocaleLowerCase('en-US');
}

function preserveLines(value) { return '\n'.repeat((value.match(/\n/g) ?? []).length); }
function preserveWidth(value) { return ' '.repeat(value.length); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

const files = walk(ROOT);
const contents = new Map(files.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const anchors = new Map([...contents].map(([file, text]) => [file, explicitAnchors(text)]));
const { pagesByFile: dreamPages, aliases: dreamAliases } = loadDreamTheaterKnowledge(contents);
const errors = [];
let checkedPreciseLinks = 0;
let checkedAnchors = 0;
let checkedKnowledgeUses = 0;
let checkedKnowledgeLinks = 0;
let fixedKnowledgeLinks = 0;
let changedFiles = 0;

for (const [file, markdown] of contents) {
  const rel = path.relative(REPO, file).replaceAll(path.sep, '/');
  const lines = markdown.split(/\r?\n/);
  const readerLines = dreamPages.has(file) ? stripNonReaderContent(markdown).split(/\r?\n/) : null;
  let inFence = false;
  let fileChanged = false;
  const seen = new Set();

  for (let i = 0; i < lines.length; i += 1) {
    for (const m of lines[i].matchAll(anchorRe)) {
      const id = m[1];
      checkedAnchors += 1;
      if (seen.has(id)) errors.push(`${rel}:${i + 1}: duplicate formal reference anchor #${id}`);
      seen.add(id);
      const nearby = lines.slice(i, i + 10).join(' ');
      if (!id.startsWith('ref-') && !formalWord.test(nearby)) errors.push(`${rel}:${i + 1}: formal anchor #${id} is not adjacent to a definition/theorem/lemma/formal result`);
      if (id.startsWith('ref-') && !/^\s*#{2,6}\s+/m.test(lines.slice(i, i + 9).join('\n'))) errors.push(`${rel}:${i + 1}: reference anchor #${id} is not adjacent to a Markdown section heading`);
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i];
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence || /^\s*#/.test(line) || /^\s*<!--/.test(line)) continue;

    for (const m of line.matchAll(linkRe)) {
      const label = m[1].trim();
      const href = m[2].trim();
      if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
      if (!preciseDependency(line, label, m.index ?? 0, m[0])) continue;
      checkedPreciseLinks += 1;
      const { target, fragment } = resolveTarget(file, href);
      if (!fragment) { errors.push(`${rel}:${i + 1}: formal dependency link must jump to the exact definition/theorem/derivation, not only the chapter: [${label}](${href})`); continue; }
      if (!stableFragmentRe.test(fragment)) { errors.push(`${rel}:${i + 1}: formal dependency fragment must use a stable def-/thm-/prop-/lem-/cor-/axiom-/principle-/ref- anchor: #${fragment}`); continue; }
      if (!contents.has(target)) { errors.push(`${rel}:${i + 1}: formal dependency target is not a user-facing textbook index.md: ${href}`); continue; }
      if (!anchors.get(target).has(fragment)) {
        const targetRel = path.relative(REPO, target).replaceAll(path.sep, '/');
        errors.push(`${rel}:${i + 1}: fragment #${fragment} does not exist as an explicit anchor in ${targetRel}`);
      }
    }

    if (readerLines) {
      const readerLine = readerLines[i] ?? '';
      if (readerLine.trim() && !isNavigationOrChecklistLine(readerLine)) {
        for (const use of collectDreamDependencyUses(readerLine, line, i + 1, dreamAliases)) {
          checkedKnowledgeUses += 1;
          const result = validateOrFixKnowledgeDependencyLink(file, rel, use, line, errors);
          if (result.fixed) { line = result.line; lines[i] = line; fileChanged = true; fixedKnowledgeLinks += 1; }
          if (result.ok) checkedKnowledgeLinks += 1;
        }
      }
    }

    const unlinked = stripLinksAndCode(line);
    if (stableLinksOnLine(line).length > 0) continue;
    if (!formalWord.test(unlinked) || !dependencyCue.test(unlinked)) continue;
    if (priorDependencyRe.test(unlinked)) { errors.push(`${rel}:${i + 1}: prior formal result is referenced in prose but is not linked to a stable anchor: ${unlinked.trim()}`); continue; }
    if (chapterDependencyRe.test(unlinked)) { errors.push(`${rel}:${i + 1}: chapter-qualified formal result is referenced without a link: ${unlinked.trim()}`); continue; }
    if (proofLocationRe.test(unlinked)) errors.push(`${rel}:${i + 1}: proof/derivation location names another chapter but is not linked: ${unlinked.trim()}`);
  }

  if (FIX && fileChanged) { fs.writeFileSync(file, lines.join('\n')); changedFiles += 1; }
}

if (errors.length) {
  console.error(`Formal reference validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  if (FIX && fixedKnowledgeLinks) console.error(`Applied ${fixedKnowledgeLinks} knowledge-DAG link fix(es) across ${changedFiles} file(s) before encountering unresolved issue(s).`);
  process.exit(1);
}

if (FIX) console.log(`Formal reference migration complete: ${fixedKnowledgeLinks} link fix(es) across ${changedFiles} file(s).`);
else console.log(`Formal reference validation passed: ${checkedPreciseLinks} precise dependency link(s), ${checkedAnchors} stable formal anchor(s), ${checkedKnowledgeLinks}/${checkedKnowledgeUses} knowledge-DAG proof dependency link(s), ${files.length} user-facing textbook page(s).`);
