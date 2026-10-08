import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

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
function sectionsFrom(body) {
  const found = [...body.matchAll(/^<!-- DT-REVIEW:\s*([A-Z0-9_-]+)\s*-->[ \t]*$/gm)];
  const sections = new Map();
  found.forEach((m, i) => {
    if (sections.has(m[1])) throw new Error('duplicate review section: ' + m[1]);
    sections.set(m[1], body.slice(m.index + m[0].length, found[i + 1]?.index ?? body.length));
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
  for (const field of fields) {
    const v = fieldValue(section, field);
    if (v.length < 6 || /^<[^>]*>$/.test(v)) errors.push('unfilled field: ' + field);
  }
  const tick = String.fromCharCode(96);
  const a = fieldValue(section, '主要結果アンカー');
  const e = fieldValue(section, '全演習ID');
  for (const id of targets.anchors) if (!a.includes(tick + id + tick)) errors.push('missing theorem/proposition: ' + id);
  for (const id of targets.exercises) if (!e.includes(tick + id + tick)) errors.push('missing exercise: ' + id);
  return errors;
}
function selfTest() {
  const src = '<a id="thm-one"></a>\n<a id="prop-two"></a>\n### A1. one\n### B2. two\n### C1. three';
  const expected = {anchors: ['thm-one', 'prop-two'], exercises: ['A1', 'B2', 'C1']};
  assert.deepEqual(inventory(src), expected);
  assert.equal(sectionsFrom('<!-- DT-REVIEW: T1 -->\nabc').get('T1').trim(), 'abc');
  const tick = String.fromCharCode(96);
  const body = fields.map(f => '- **' + f + '**：十分な実査読情報をここに記録した。').join('\n')
    .replace('- **主要結果アンカー**：十分な実査読情報をここに記録した。',
      '- **主要結果アンカー**：' + tick + 'thm-one' + tick + ', ' + tick + 'prop-two' + tick)
    .replace('- **全演習ID**：十分な実査読情報をここに記録した。',
      '- **全演習ID**：' + tick + 'A1' + tick + ', ' + tick + 'B2' + tick + ', ' + tick + 'C1' + tick);
  assert.deepEqual(checkChapter('T1', body, expected), []);
  assert(checkChapter('T1', body.replace(tick + 'C1' + tick, tick + 'D1' + tick), expected).some(x => x.includes('C1')));
  assert(checkChapter('T1', '', expected).length > 0);
  console.log('DREAM THEATER review evidence self-test passed');
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
  const names = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--', 'textbook/volumes/00_foundations'], { encoding: 'utf8' })
    .split('\n')
    .filter(s => /^textbook\/volumes\/00_foundations\/[A-Za-z0-9_-]+\/index\.md$/.test(s));
  if (names.length === 0) {
    console.log('No changed DREAM THEATER chapter index.md: review evidence not required');
    process.exit(0);
  }
  const sections = sectionsFrom(process.env.DREAM_THEATER_PR_BODY || '');
  const problems = [];
  for (const name of names) {
    const id = name.split('/')[3];
    const targets = inventory(fs.readFileSync(name, 'utf8'));
    const violations = checkChapter(id, sections.get(id), targets);
    problems.push(...violations.map(v => id + ': ' + v));
    if (!violations.length) console.log(id + ': review inventory covers ' + targets.anchors.length + ' primary results and ' + targets.exercises.length + ' exercises');
  }
  if (problems.length) {
    console.error('DREAM THEATER review evidence gate failed:\n- ' + problems.join('\n- '));
    console.error('Use textbook/prompts/dream-theater-review-evidence.md; this check cannot prove mathematical validity.');
    process.exit(1);
  }
  console.log('Review record coverage gate passed (mathematical correctness requires actual independent checking)');
}
