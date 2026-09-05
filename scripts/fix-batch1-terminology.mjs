import fs from 'node:fs';

const path = 'textbook/volumes/04_linear_models/L1_03_分散分析/index.md';
const before = fs.readFileSync(path, 'utf8');
const from = '群×共変量交互作用が強ければ共通傾きANCOVAは不適切になりうる。';
const to = '群×共変量交互作用が強ければ、共通傾きを仮定する共分散分析は不適切になりうる。';
if (before.includes(to)) process.exit(0);
const count = before.split(from).length - 1;
if (count !== 1) throw new Error(`expected target once, got ${count}`);
fs.writeFileSync(path, before.replace(from, to), 'utf8');
