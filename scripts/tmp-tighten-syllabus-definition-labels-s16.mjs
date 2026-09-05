import fs from 'node:fs';

const path = 'scripts/audit-textbook-syllabus-coverage.mjs';
let text = fs.readFileSync(path, 'utf8');

const oldBlock = `function labelMentions(term, label) {\n  if (!label) return false;\n  const parts = label\n    .split(/(?:・|、|，|,|\\/|／|および|及び|または|又は|\\s+と\\s+)/u)\n    .map((x) => x.trim())\n    .filter(Boolean);\n  for (const c of candidates(term)) {\n    if (label === c || parts.includes(c)) return true;\n    for (const p of parts) {\n      if (!p.startsWith(c)) continue;\n      const suffix = p.slice(c.length);\n      if (/^(?:量|関数|法|分析|モデル|過程|検定|係数|統計量)(?:[（(].*)?$/u.test(suffix)) return true;\n    }\n  }\n  return false;\n}\n`;

const newBlock = `function labelMentions(term, label) {\n  if (!label) return false;\n  const parts = label\n    .split(/(?:・|、|，|,|\\/|／|および|及び|または|又は|\\s+と\\s+)/u)\n    .map((x) => x.trim())\n    .filter(Boolean);\n  for (const c of candidates(term)) {\n    if (label === c || parts.includes(c)) return true;\n  }\n  return false;\n}\n\nconst definitionLabelMatchChecks = [\n  ['モーメント', 'モーメント法', false],\n  ['共分散', '共分散分析', false],\n  ['分散', '分散・標準偏差', true],\n  ['共分散', '共分散・相関係数', true],\n  ['モーメント母関数（積率母関数）', 'モーメント母関数・積率母関数', true],\n  ['欠測（欠損）', '欠測', true],\n];\nfor (const [term, label, expected] of definitionLabelMatchChecks) {\n  const actual = labelMentions(term, label);\n  if (actual !== expected) {\n    throw new Error(\`definition-label matcher regression: term=\${term}, label=\${label}, expected=\${expected}, actual=\${actual}\`);\n  }\n}\n`;

if (text.includes(newBlock)) process.exit(0);
if (!text.includes(oldBlock)) throw new Error('S16 labelMentions target not found');
text = text.replace(oldBlock, () => newBlock);
fs.writeFileSync(path, text);
