export const FORMAL_KINDS = new Set(['axiom', 'definition', 'theorem', 'lemma', 'proposition', 'corollary']);

const normalizedAliasCache = new Map();
const strippedReaderContentCache = new Map();
const rawLinesCache = new Map();
const readerLinesCache = new Map();
const asciiAliasRegexCache = new Map();

export function normalizeAlias(value) {
  const source = String(value ?? '');
  const cached = normalizedAliasCache.get(source);
  if (cached !== undefined) return cached;
  const normalized = source
    .replace(/\$+/gu, '')
    .replace(/\*\*/gu, '')
    .replace(/[`_>#]/gu, '')
    .replace(/\\[,!]/gu, '')
    .replace(/\s+/gu, '')
    .trim()
    .toLocaleLowerCase('en-US');
  normalizedAliasCache.set(source, normalized);
  return normalized;
}

export function aliasAppears(source, alias) {
  const needle = String(alias ?? '').trim();
  if (!needle) return false;
  if (/^[A-Za-z][A-Za-z0-9.^+\- ]*$/u.test(needle)) {
    let regex = asciiAliasRegexCache.get(needle);
    if (!regex) {
      regex = new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(needle).replace(/\\ /g, '\\s+')}(?![A-Za-z0-9_])`, 'iu');
      asciiAliasRegexCache.set(needle, regex);
    }
    return regex.test(source);
  }
  return normalizeAlias(source).includes(normalizeAlias(needle));
}

export function stripNonReaderContent(source) {
  const input = String(source ?? '');
  const cached = strippedReaderContentCache.get(input);
  if (cached !== undefined) return cached;

  let value = input;
  value = value.replace(/<!--[\s\S]*?-->/gu, preserveLines);
  value = value.replace(/```[\s\S]*?```/gu, preserveLines);
  value = value.replace(/`[^`\n]*`/gu, preserveWidth);
  value = value.replace(/\$\$[\s\S]*?\$\$/gu, preserveLines);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/gu, preserveWidth);
  value = value.replace(/\]\([^\n)]*\)/gu, (text) => ']'.padEnd(text.length, ' '));
  value = value.replace(/https?:\/\/\S+/gu, preserveWidth);
  strippedReaderContentCache.set(input, value);
  return value;
}

export function normalizeConcept(raw, pageId = '', order = 0) {
  const kind = String(raw?.kind ?? 'term');
  const aliases = [...new Set([raw?.name, ...(raw?.aliases ?? [])]
    .map((value) => String(value ?? '').trim())
    .filter(Boolean))];
  const introductionAliases = [...new Set((raw?.introduction_aliases ?? [])
    .map((value) => String(value ?? '').trim())
    .filter(Boolean))];
  return {
    id: String(raw?.id ?? ''),
    name: String(raw?.name ?? ''),
    kind,
    introduction: raw?.introduction ? String(raw.introduction) : (kind === 'term' ? 'inline' : 'formal'),
    aliases,
    introductionAliases,
    requires: [...new Set((raw?.requires ?? []).map(String))],
    pageId,
    order,
    declarationLine: null,
  };
}

export function findConceptIntroductionLine(source, rawConcept) {
  const concept = rawConcept?.aliases ? rawConcept : normalizeConcept(rawConcept);
  const rawLines = getRawLines(source);
  const readerLines = getReaderLines(source);
  const markers = concept.introductionAliases.length ? concept.introductionAliases : concept.aliases;

  if (FORMAL_KINDS.has(concept.kind) && concept.introduction !== 'inline' && concept.introduction !== 'prose-math') {
    let inFormal = false;
    for (let i = 0; i < rawLines.length; i += 1) {
      const line = rawLines[i];
      if (line.includes('<!-- formal-statement-start -->')) {
        inFormal = true;
        continue;
      }
      if (line.includes('<!-- formal-statement-end -->')) {
        inFormal = false;
        continue;
      }
      if (!inFormal || !looksLikeFormalHeading(line)) continue;
      if (markers.some((alias) => aliasAppears(line, alias))) return i + 1;
    }
    return null;
  }

  for (let i = 0; i < readerLines.length; i += 1) {
    if (markers.some((alias) => aliasAppears(readerLines[i], alias))) return i + 1;
  }
  return null;
}

export function buildLocalAliasIntroductions(source, knowledgeDoc, pageId = '') {
  const out = new Map();
  const concepts = (knowledgeDoc?.concepts ?? []).map((raw, order) => normalizeConcept(raw, pageId, order));
  for (const concept of concepts) {
    concept.declarationLine = findConceptIntroductionLine(source, concept);
    for (const alias of concept.aliases) {
      const key = normalizeAlias(alias);
      if (!key) continue;
      const entries = out.get(key) ?? [];
      entries.push({ concept, line: concept.declarationLine });
      out.set(key, entries);
    }
  }
  return out;
}

export function activeLocalOwners(localAliasIntroductions, alias, lineNumber) {
  const entries = localAliasIntroductions.get(normalizeAlias(alias)) ?? [];
  return entries.filter((entry) => entry.line != null && entry.line <= lineNumber);
}

function getRawLines(source) {
  const input = String(source ?? '');
  let lines = rawLinesCache.get(input);
  if (!lines) {
    lines = input.split(/\r?\n/u);
    rawLinesCache.set(input, lines);
  }
  return lines;
}

function getReaderLines(source) {
  const input = String(source ?? '');
  let lines = readerLinesCache.get(input);
  if (!lines) {
    lines = stripNonReaderContent(input).split(/\r?\n/u);
    readerLinesCache.set(input, lines);
  }
  return lines;
}

function looksLikeFormalHeading(line) {
  const text = String(line).trim();
  return /^(?:#{1,6}\s+|>\s*)?(?:\*\*)?(?:公理|定義|定理|補題|命題|系)(?:\*\*)?(?:[（(：:\s]|$)/u.test(text)
    || /^(?:#{1,6}\s+|>\s*)(?:\*\*)?.+(?:公理|定理|補題|命題)(?:\*\*)?(?:[（(：:]|$)/u.test(text);
}

function preserveLines(value) {
  return '\n'.repeat((String(value).match(/\n/gu) ?? []).length);
}

function preserveWidth(value) {
  return ' '.repeat(String(value).length);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}
