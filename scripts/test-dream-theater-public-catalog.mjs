import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  assembleDreamTheaterContents,
  discoverDreamTheaterChapters,
  loadDreamTheaterIndex,
  parseDreamTheaterFacade,
  readDreamTheaterContents,
} from './lib/dream-theater-public-catalog.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dream-theater-public-catalog-'));
const a = 'textbook/volumes/dream_thater/基礎科目/X/X1/index.md';
const b = 'textbook/volumes/dream_thater/基礎科目/X/X2/index.md';
const c = 'textbook/volumes/dream_thater/解析系/Y/Y1/index.md';
const intro = '# DREAM THEATER 本編\n\n';
const facade = (links) => `${intro}## 基礎科目\n\n<a id="dt-subject-x"></a>\n### X\n\n${links}\n\n## 解析系\n\n<a id="dt-subject-y"></a>\n### Y\n\n- [Y1](${c})\n`;
const write = (relative, content = '') => {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};
const writeFacade = (links) => {
  write('textbook/dream-theater-toc/intro.md', intro);
  write('textbook/dream-theater-toc/010_基礎科目/010_x.md', `<a id="dt-subject-x"></a>\n### X\n\n${links}\n\n`);
  write('textbook/dream-theater-toc/020_解析系/010_y.md', `<a id="dt-subject-y"></a>\n### Y\n\n- [Y1](${c})\n`);
};

try {
  for (const target of [a, b, c]) write(target, '# Test\n');
  writeFacade(`1. [X2](${b})\n2. [X1](${a})`);
  assert.equal(readDreamTheaterContents(root), facade(`1. [X2](${b})\n2. [X1](${a})`));
  assert.deepEqual(discoverDreamTheaterChapters(root), [a, b, c]);
  assert.deepEqual(loadDreamTheaterIndex(root), {
    sections: [
      { name: '基礎科目', paths: [b, a] },
      { name: '解析系', paths: [c] },
    ],
  }, 'reader-facing contents order must win over directory order');

  writeFacade(`1. [X1](${a})`);
  assert.throws(() => loadDreamTheaterIndex(root), /chapter missing from DREAM THEATER contents/);

  writeFacade(`1. [X1](${a})\n2. [X1](${a})\n3. [X2](${b})`);
  assert.throws(() => loadDreamTheaterIndex(root), /duplicate DREAM THEATER chapter link/);

  writeFacade(`1. [X1](${a})\n2. [X2](${b})\n3. [X3](textbook/volumes/dream_thater/基礎科目/X/X3/index.md)`);
  assert.throws(() => loadDreamTheaterIndex(root), /contents link has no canonical chapter/);

  assert.throws(() => parseDreamTheaterFacade(
    '# DREAM THEATER\n\n## 基礎科目\n\n1. [Old](textbook/volumes/00_foundations/Old/index.md)',
  ), /noncanonical DREAM THEATER chapter link/);
  const invalid = new Map([
    ['textbook/dream-theater-toc/intro.md', intro],
    ['textbook/dream-theater-toc/010_基礎科目/010_x.md', '<a id="dt-subject-x"></a>\n### X\n'],
    ['textbook/dream-theater-toc/010_基礎科目/020_x.md', '<a id="dt-subject-x"></a>\n### X again\n'],
  ]);
  assert.throws(() => assembleDreamTheaterContents(invalid), /duplicate DREAM THEATER anchor/);
  invalid.delete('textbook/dream-theater-toc/010_基礎科目/020_x.md');
  invalid.set('textbook/dream-theater-toc/010_基礎科目/010_x.md', '### Missing anchor\n');
  assert.throws(() => assembleDreamTheaterContents(invalid), /invalid DREAM THEATER subject fragment/);
  assert.throws(() => assembleDreamTheaterContents(new Map([
    ['textbook/dream-theater-toc/intro.md', intro],
    ['textbook/dream-theater-toc/010_基礎科目/010_x.md', '<a id="dt-subject-x"></a>\n### X\n'],
    ['textbook/dream-theater-toc/010_基礎科目/010_y.md', '<a id="dt-subject-y"></a>\n### Y\n'],
  ])), /duplicate DREAM THEATER subject order/);
  write('textbook/dream-theater.md', facade(`1. [X2](${b})\n2. [X1](${a})`));
  assert.throws(() => readDreamTheaterContents(root), /generated Pages output/);
  fs.unlinkSync(path.join(root, 'textbook/dream-theater.md'));
  console.log('DREAM THEATER public catalog self-test passed');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
