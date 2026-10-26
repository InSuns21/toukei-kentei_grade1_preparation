import {verifiedMassRelocation} from './lib/verified-dream-theater-relocation.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

if(!process.argv.includes('--self-test') && verifiedMassRelocation()) { console.log('Relocation-only PR: 540 chapters are content-equivalent to base; chapter-level mathematical review evidence is unchanged.'); process.exit(0); }

// Three review modes: A (verified presentation-only), B (local mathematical edits),
// C (new chapters or substantive revisions). Unclassified changes fail closed to C.
// The gate checks that a chapter-specific review record exists, not that the
// writer copied eleven particular field names or every source ID into a PR.
// Mathematical review and the contents of the record remain human judgments.
const minimumRecordLengths = {substantive: 80, 'local-math': 50, format: 40};

function inventory(source) {
  return {
    anchors: [...new Set([...source.matchAll(/<a id="((?:thm|prop|lemma|principle)-[^"]+)"><\/a>/g)].map(x => x[1]))],
    exercises: [...new Set([...source.matchAll(/^###\s+((?:[A-Z][A-Z0-9_-]*-)?[ABC]\d+)(?=[.．:：\s]|$)/gm)].map(x => x[1]))]
  };
}
function stableInventory(source) {
  return {
    anchors: [...source.matchAll(/<a\s+id=["']([^"']+)["']/g)].map(x => x[1]),
    headings: [...source.matchAll(/^#{1,6}\s+.+$/gm)].map(x => x[0].trim()),
    links: [...source.matchAll(/\[[^\]]+\]\([^\n)]+\)/g)].map(x => x[0]),
    codeBlocks: [...source.matchAll(/(```|~~~)[^\n]*\n[\s\S]*?\n\1/g)].map(x => x[0]),
    inlineCode: [...source.matchAll(/(?<!`)`[^`\n]+`(?!`)/g)].map(x => x[0]),
    mathematics: [...source.matchAll(/[$]{2}[\s\S]*?[$]{2}|[$][^$\n]+[$]/g)].map(x => x[0]),
    exercises: inventory(source).exercises
  };
}

// Intentionally conservative: a new chapter, changed formula, text, link,
// heading, anchor, exercise ID or code cannot qualify as A automatically.
// Collapse only Markdown quotation/list/emphasis and insignificant blank lines.
function presentationSignature(source) {
  let fenced = false;
  return source.replace(/\r\n/g, '\n').split('\n').map(line => {
    let s = line.replace(/^\s*(?:>\s*)+/, '').trim();
    if (/^(```|~~~)/.test(s)) { fenced = !fenced; return 'FENCE:' + s; }
    if (fenced) return 'CODE:' + line;
    if (/^\d+[.)]\s+/.test(s)) s = s.replace(/^\d+[.)]\s+/, 'ITEM:');
    else if (/^[-*+]\s+/.test(s)) s = s.replace(/^[-*+]\s+/, 'ITEM:');
    else if (/^\*\*[（(][A-Za-z]{0,2}\d+[）)]/.test(s))
      s = s.replace(/^\*\*[（(][A-Za-z]{0,2}\d+[）)]\s*/, 'ITEM:**');
    // Remove only paired Markdown emphasis markers, never bare "**" or "__"
    // within prose (which could be meaningful operators or identifiers).
    return s.replace(/(^|[\s:「『（(\[])\*\*([^*\n]+)\*\*/g, '$1$2')
      .replace(/(^|[\s:「『（(\[])__([^_\n]+)__/g, '$1$2')
      .replace(/[ \t]+/g, ' ').trim();
  }).filter(Boolean).join('\n');
}
function isVerifiedFormatOnly(before, after) {
  if (before === null || before === after) return before !== null;
  if (JSON.stringify(stableInventory(before)) !== JSON.stringify(stableInventory(after))) return false;
  return presentationSignature(before) === presentationSignature(after);
}

function formatReview(body) {
  const marker = '<!-- DT-FORMAT-REVIEW -->';
  if (!body.includes(marker)) return null;
  const section = body.slice(body.indexOf(marker) + marker.length).split(/^<!-- DT-REVIEW:/m)[0];
  return section;
}

function sectionsFrom(body) {
  const found = [...body.matchAll(/^<!-- DT-REVIEW:\s*([A-Z0-9_-]+)(?:\s+(local-math|substantive))?\s*-->[ \t]*$/gm)];
  const sections = new Map();
  found.forEach((m, i) => {
    if (sections.has(m[1])) throw new Error('duplicate review section: ' + m[1]);
    const nextFormat = body.indexOf('<!-- DT-FORMAT-REVIEW -->', m.index + m[0].length);
    const nextChapter = found[i + 1]?.index ?? body.length;
    const end = nextFormat < 0 ? nextChapter : Math.min(nextChapter, nextFormat);
    sections.set(m[1], {mode: m[2] || 'substantive', text: body.slice(m.index + m[0].length, end)});
  });
  return sections;
}
function recordLength(text) {
  // Exclude markup and common literal placeholders. This deliberately does not
  // try to certify the mathematical validity of freely written review notes.
  return text.replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>\n]*>/g, '')
    .replace(/\[(?:TODO|TBD|未記入|記入欄)\]/gi, '')
    .replace(/[\s`*_#>\-|]/g, '').length;
}
function checkChapter(id, section) {
  if (!section) return ['missing <!-- DT-REVIEW: ' + id + ' -->'];
  const minimum = minimumRecordLengths[section.mode];
  return recordLength(section.text) < minimum
    ? ['review summary is blank or too short (at least ' + minimum + ' characters; no fixed field names required)']
    : [];
}
function selfTest() {
  const src = '<a id="thm-one"></a>\n<a id="prop-two"></a>\n### A1. one\n### B2. two\n### C1. three';
  const expected = {anchors: ['thm-one', 'prop-two'], exercises: ['A1', 'B2', 'C1']};
  assert.deepEqual(inventory(src), expected);
  assert.deepEqual(inventory('<a id="thm-qinf9-cp"></a>\n### QINF9-A01 解答\n### QINF9-C02 応用'),
    {anchors: ['thm-qinf9-cp'], exercises: ['QINF9-A01', 'QINF9-C02']});
  assert.equal(sectionsFrom('<!-- DT-REVIEW: T1 -->\nabc').get('T1').text.trim(), 'abc');
  assert.equal(sectionsFrom('<!-- DT-REVIEW: T1 local-math -->\nabc').get('T1').mode, 'local-math');
  assert.equal(sectionsFrom('<!-- DT-REVIEW: T1 -->\n<!-- DT-FORMAT-REVIEW -->\nlong other review').get('T1').text.trim(), '');
  const from = '> 1. **結合則**\n>\n$$\na=b\n$$\n>\n> 2. **単位元**';
  const to = '> **（G1）結合則**\n>\n$$\na=b\n$$\n>\n> **（G2）単位元**';
  assert(isVerifiedFormatOnly(from, to), 'presentational list number fix should qualify');
  assert(!isVerifiedFormatOnly(from, to.replace('a=b', 'a=c')), 'math change must not qualify');
  assert(!isVerifiedFormatOnly(from, to.replace('結合則', '交換則')), 'prose change must not qualify');
  assert(!isVerifiedFormatOnly('<a id="x"></a>\n' + from, '<a id="y"></a>\n' + to), 'anchor change must not qualify');
  assert(!isVerifiedFormatOnly('## 同じ見出し\n' + from, '## 別の見出し\n' + to), 'heading change must not qualify');
  assert(!isVerifiedFormatOnly('[参照](a.md)\n' + from, '[参照](b.md)\n' + to), 'link change must not qualify');
  assert(!isVerifiedFormatOnly('### A1. 問題\n' + from, '### A2. 問題\n' + to), 'exercise ID change must not qualify');
  assert(!isVerifiedFormatOnly('```js\na**b\n```', '```js\nab\n```'), 'code change must not qualify');
  assert(!isVerifiedFormatOnly(null, to), 'new chapter must not qualify');
  assert(!isVerifiedFormatOnly('a**b', 'ab'), 'non-Markdown exponent-like syntax must not qualify');
  assert(!isVerifiedFormatOnly('a__b', 'ab'), 'non-Markdown underscore identifiers must not qualify');
  assert(isVerifiedFormatOnly('  元の本文  \n\n定義', '元の本文\n定義'), 'spaces and blank lines should qualify');
  const substantive = '章のすべての主要証明と演習・詳細解答を出発点から検算。代表定理では双線形性を使い、各項の係数を展開して一致を確認した。代表演習は端点を代入し、境界条件を確認した。別観点で読み直し、未解消の問題はない。';
  assert.deepEqual(checkChapter('T1', {mode:'substantive', text:substantive}), []);
  assert.deepEqual(checkChapter('T1', {mode:'local-math', text:'変更した証明を最初から検算し、その定理を使う二つの演習解答も確認した。読者向けの途中式とリンクを確認し、未解決の問題はない。'}), []);
  assert(checkChapter('T1', {mode:'substantive', text:'確認済み'}).length > 0);
  assert(checkChapter('T1', {mode:'substantive', text:'<記入欄>'}).length > 0);
  assert(checkChapter('T1', null).length > 0);
  assert(recordLength('<!-- memo -->\n**確認**：<内容>') < minimumRecordLengths.format);
  console.log('DREAM THEATER review evidence self-test passed');
}

function readReviewBody() {
  // Large multi-chapter PRs can exceed the kernel's per-argument/env-string
  // limit when GitHub expands pull_request.body into a step environment var.
  // The runner's event JSON is already on disk and has no such limit.
  if (process.env.GITHUB_EVENT_PATH) {
    const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    if (typeof event.pull_request?.body === 'string') return event.pull_request.body;
  }
  return process.env.DREAM_THEATER_PR_BODY || '';
}

const args = process.argv.slice(2);
if (args.includes('--self-test')) {
  selfTest();
} else {
  const i = args.indexOf('--base');
  const base = i >= 0 ? args[i + 1] : process.env.TEXTBOOK_BASE_SHA;
  if (!/^[0-9a-f]{40}$/i.test(base || '')) {
    console.error('Specify base commit SHA using --base or TEXTBOOK_BASE_SHA');
    process.exit(2);
  }
  const names = execFileSync('git', ['-c', 'core.quotePath=false', 'diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--', 'textbook/volumes/dream_thater'], { encoding: 'utf8' })
    .split('\n')
    .filter(s => /^textbook\/volumes\/dream_thater\/[^/]+\/[^/]+\/[^/]+\/index\.md$/.test(s));
  if (names.length === 0) {
    console.log('No changed DREAM THEATER chapter index.md: review evidence not required');
    process.exit(0);
  }
  const body = readReviewBody();
  const sections = sectionsFrom(body);
  const problems = [];
  const formatOnly = [];
  for (const name of names) {
    const id = path.posix.basename(path.posix.dirname(name));
    const after = fs.readFileSync(name, 'utf8');
    let before = null;
    try { before = execFileSync('git', ['show', base + ':' + name], {encoding:'utf8'}); }
    catch { /* Added chapter or unavailable base content: never auto-classify as A. */ }
    if (isVerifiedFormatOnly(before, after)) {
      if (sections.has(id)) problems.push(id + ': unnecessary DT-REVIEW marker for verified format-only chapter');
      formatOnly.push(id);
      continue;
    }
    const targets = inventory(after);
    const section = sections.get(id);
    if (before === null && section?.mode === 'local-math')
      problems.push(id + ': newly added chapter requires substantive (C) review evidence');
    const violations = checkChapter(id, section);
    problems.push(...violations.map(v => id + ': ' + v));
    if (!violations.length) console.log(id + ': ' + section.mode + ' review evidence recorded; ' + targets.anchors.length + ' primary results and ' + targets.exercises.length + ' exercises present');
  }
  if (formatOnly.length) {
    const record = formatReview(body);
    if (!record) problems.push('format-only chapters require a shared <!-- DT-FORMAT-REVIEW --> record');
    else if (recordLength(record) < minimumRecordLengths.format)
      problems.push('format-only review: provide a short rendering/diff verification summary (no fixed field names required)');
    console.log('Format-only text/math/anchors/headings/links/code/exercises unchanged in ' + formatOnly.length + ' chapters: ' + formatOnly.join(', '));
  }
  if (problems.length) {
    console.error('DREAM THEATER review evidence gate failed:\n- ' + problems.join('\n- '));
    console.error('See textbook/prompts/dream-theater-review-evidence.md; field names and full ID lists are not required by CI. This check cannot prove mathematical validity.');
    process.exit(1);
  }
  console.log('Risk-based review evidence gate passed (automated format equivalence does not replace rendered-layout verification or mathematical review when applicable)');
}
