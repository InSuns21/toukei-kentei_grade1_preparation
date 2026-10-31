import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  discoverDreamTheaterChapters,
  loadDreamTheaterIndex,
  parseDreamTheaterFacade,
} from './lib/dream-theater-public-catalog.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dream-theater-public-catalog-'));
const a = 'textbook/volumes/dream_thater/基礎科目/X/X1/index.md';
const b = 'textbook/volumes/dream_thater/基礎科目/X/X2/index.md';
const c = 'textbook/volumes/dream_thater/解析系/Y/Y1/index.md';
const facade = (links) => `# DREAM THEATER\n\n## 基礎科目\n\n${links}\n\n## 解析系\n\n- [Y1](${c})\n`;
const contentsPath = path.join(root, 'textbook/dream-theater.md');
const write = (relative, content = '') => {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

try {
  for (const target of [a, b, c]) write(target, '# Test\n');
  write('textbook/dream-theater.md', facade(`1. [X2](${b})\n2. [X1](${a})`));
  assert.deepEqual(discoverDreamTheaterChapters(root), [a, b, c]);
  assert.deepEqual(loadDreamTheaterIndex(root), {
    sections: [
      { name: '基礎科目', paths: [b, a] },
      { name: '解析系', paths: [c] },
    ],
  }, 'reader-facing contents order must win over directory order');

  write('textbook/dream-theater.md', facade(`1. [X1](${a})`));
  assert.throws(() => loadDreamTheaterIndex(root), /chapter missing from DREAM THEATER contents/);

  write('textbook/dream-theater.md', facade(`1. [X1](${a})\n2. [X1](${a})\n3. [X2](${b})`));
  assert.throws(() => loadDreamTheaterIndex(root), /duplicate DREAM THEATER chapter link/);

  write('textbook/dream-theater.md', facade(`1. [X1](${a})\n2. [X2](${b})\n3. [X3](textbook/volumes/dream_thater/基礎科目/X/X3/index.md)`));
  assert.throws(() => loadDreamTheaterIndex(root), /contents link has no canonical chapter/);

  assert.throws(() => parseDreamTheaterFacade(
    '# DREAM THEATER\n\n## 基礎科目\n\n1. [Old](textbook/volumes/00_foundations/Old/index.md)',
  ), /noncanonical DREAM THEATER chapter link/);
  console.log('DREAM THEATER public catalog self-test passed');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
