import fs from 'node:fs';

const target = 'textbook/volumes/03_inference/I4_02_欠測_不完全データ_期待値最大化法/index.md';
let text = fs.readFileSync(target, 'utf8');

const fixes = [
  {
    label: 'right-censoring display math',
    bad: '$\n\\boxed{T>100}\n$',
    good: '$$\n\\boxed{T>100}\n$$',
  },
  {
    label: 'truncation display math',
    bad: '$\n\\boxed{\nf(t\\mid T>5)\n=\\frac{f(t)}{P(T>5)},\n\\qquad t>5\n}\n$',
    good: '$$\n\\boxed{\nf(t\\mid T>5)\n=\\frac{f(t)}{P(T>5)},\n\\qquad t>5\n}\n$$',
  },
];

for (const { label, bad, good } of fixes) {
  if (text.includes(bad)) {
    text = text.replace(bad, () => good);
  } else if (!text.includes(good)) {
    throw new Error(`${label}: neither broken nor repaired form found`);
  }
}

fs.writeFileSync(target, text, 'utf8');
