export const FORMAL_KINDS = new Set(['axiom', 'definition', 'theorem', 'lemma', 'proposition', 'corollary']);

export function normalizeAlias(value) {
  return String(value ?? '')
    .replace(/\$+/gu, '')
    .replace(/[`*_>#]/gu, '')
    .replace(/\\[,!]/gu, '')
    .replace(/\s+/gu, '')
    .trim()
    .toLocaleLowerCase('en-US');
}

export function aliasAppears(source, alias) {
  const needle = String(alias ?? '').trim();
  if (!needle) return false;
  if (/^[A-Za-z][A-Za-z0-9.^+\- ]*$/u.test(needle)) {
    return new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(needle).replace(/\\ /g, '\\s+')}(?![A-Za-z0-9_])`, 'iu').test(source);
  }
  return normalizeAlias(source).includes(normalizeAlias(needle));
}

export function stripNonReaderContent(source) {
  let value = String(source ?? '');
  value = value.replace(/<!--[\s\S]*?-->/gu, preserveLines);
  value = value.replace(/```[\s\S]*?```/gu, preserveLines);
  value = value.replace(/`[^`\n]*`/gu, preserveWidth);
  value = value.replace(/\$\$[\s\S]*?\$\$/gu, preserveLines);
  value = value.replace(/\$(?:\\.|[^$\n])+\$/gu, preserveWidth);
  value = value.replace(/\]\([^\n)]*\)/gu, (text) => ']'.padEnd(text.length, ' '));
  value = value.replace(/https?:\/\/\S+/gu, preserveWidth);
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
  const rawLines = String(source ?? '').split(/\r?\n/u);
  const readerLines = stripNonReaderContent(source).split(/\r?\n/u);
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
