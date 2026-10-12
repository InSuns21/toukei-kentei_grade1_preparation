import {verifiedMassRelocation} from './lib/verified-dream-theater-relocation.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

if(!process.argv.includes('--self-test') && verifiedMassRelocation()) { console.log('Relocation-only PR: 540 chapters are content-equivalent to base; chapter-level mathematical review evidence is unchanged.'); process.exit(0); }

// Three review modes: A (verified presentation-only), B (local mathematical edits),
// C (new chapters or substantive revisions). Unclassified changes fail closed to C.
const localFields = [
  '変更箇所と影響範囲', '変更部分の再計算根拠', '波及先の証明・演習確認',
  '読者粒度・参照リンク', '未確認・未解消', '最終差分と検証', '結論'
];
const formatFields = ['変更範囲', '表示検証', '未確認・未解消', '最終差分と検証'];

const fields = [
  '本文確認範囲', 'learning objectives 対応', '主要結果アンカー',
  '全演習ID', '主要結果の再計算根拠', '演習の再計算根拠',
  '読者粒度の重点箇所', '未確認・未解消', '査読の実施主体',
  '最終差分と検証', '結論'
];

function inventory(source) {
  return {
    anchors: [...new Set([...source.matchAll(/<a id="((?:thm|prop|lemma|principle)-[^"]+)"><\/a>/g)].map(x => x[1]))],
    exercises: [...new Set([...source.matchAll(/^###\s+([ABC]\d+)(?=[.．:：\s]|$)/gm)].map(x => x[1]))]
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
    sections.set(m[1], {mode: m[2] || 'substantive', text: body.slice(m.index + m[0].length, found[i + 1]?.index ?? body.length)});
  });
  return sections;
}
function fieldValue(section, label) {
  const prefix = '- **' + label + '**：';
  return section.split('\n').find(line => line.startsWith(prefix))?.slice(prefix.length).trim() ?? '';
}
function checkChapter(id, section, targets) {
  if (!section) return ['missing <!-- DT-REVIEW: ' + id + ' -->'];
  const errors = [];
  const required = section.mode === 'local-math' ? localFields : fields;
  for (const field of required) {
    const v = fieldValue(section.text, field);
    if (v.length < 6 || /^<[^>]*>$/.test(v)) errors.push('unfilled field: ' + field);
  }
  if (section.mode === 'local-math') return errors;
  const tick = String.fromCharCode(96);
  const a = fieldValue(section.text, '主要結果アンカー');
  const e = fieldValue(section.text, '全演習ID');
  for (const id of targets.anchors) if (!a.includes(tick + id + tick)) errors.push('missing theorem/proposition: ' + id);
  for (const id of targets.exercises) if (!e.includes(tick + id + tick)) errors.push('missing exercise: ' + id);
  return errors;
}
function selfTest() {
  const src = '<a id="thm-one"></a>\n<a id="prop-two"></a>\n### A1. one\n### B2. two\n### C1. three';
  const expected = {anchors: ['thm-one', 'prop-two'], exercises: ['A1', 'B2', 'C1']};
  assert.deepEqual(inventory(src), expected);
  assert.equal(sectionsFrom('<!-- DT-REVIEW: T1 -->\nabc').get('T1').text.trim(), 'abc');
  assert.equal(sectionsFrom('<!-- DT-REVIEW: T1 local-math -->\nabc').get('T1').mode, 'local-math');
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
  const tick = String.fromCharCode(96);
  const body = fields.map(f => '- **' + f + '**：十分な実査読情報をここに記録した。').join('\n')
    .replace('- **主要結果アンカー**：十分な実査読情報をここに記録した。',
      '- **主要結果アンカー**：' + tick + 'thm-one' + tick + ', ' + tick + 'prop-two' + tick)
    .replace('- **全演習ID**：十分な実査読情報をここに記録した。',
      '- **全演習ID**：' + tick + 'A1' + tick + ', ' + tick + 'B2' + tick + ', ' + tick + 'C1' + tick);
  assert.deepEqual(checkChapter('T1', {mode: 'substantive', text: body}, expected), []);
  assert(checkChapter('T1', {mode:'substantive', text:body.replace(tick + 'C1' + tick, tick + 'D1' + tick)}, expected).some(x => x.includes('C1')));
  const local = localFields.map(f => '- **' + f + '**：変更した証明を出発点から検算し、関連箇所を確認した。').join('\n');
  assert.deepEqual(checkChapter('T1', {mode:'local-math', text:local}, expected), []);
  assert(checkChapter('T1', {mode:'local-math', text:local.replace('波及先の証明・演習確認', '未確認の項目')}, expected).length > 0);
  assert(checkChapter('T1', {mode:'substantive', text:''}, expected).length > 0);
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
    const violations = checkChapter(id, section, targets);
    problems.push(...violations.map(v => id + ': ' + v));
    if (!violations.length) console.log(id + ': ' + section.mode + ' review evidence recorded; ' + targets.anchors.length + ' primary results and ' + targets.exercises.length + ' exercises present');
  }
  if (formatOnly.length) {
    const record = formatReview(body);
    if (!record) problems.push('format-only chapters require a shared <!-- DT-FORMAT-REVIEW --> record');
    else for (const field of formatFields) {
      const v = fieldValue(record, field);
      if (v.length < 6 || /^<[^>]*>$/.test(v)) problems.push('format-only review: unfilled field ' + field);
    }
    console.log('Format-only text/math/anchors/headings/links/code/exercises unchanged in ' + formatOnly.length + ' chapters: ' + formatOnly.join(', '));
  }
  if (problems.length) {
    console.error('DREAM THEATER review evidence gate failed:\n- ' + problems.join('\n- '));
    console.error('Use textbook/prompts/dream-theater-review-evidence.md; this check cannot prove mathematical validity.');
    process.exit(1);
  }
  console.log('Risk-based review evidence gate passed (automated format equivalence does not replace rendered-layout verification or mathematical review when applicable)');
}
