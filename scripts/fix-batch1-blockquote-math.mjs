import fs from 'node:fs';
const path = 'textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md';
let text = fs.readFileSync(path, 'utf8');
const before = (text.match(/^> \$$/gm) || []).length;
text = text.replace(/^> \$$/gm, '> $$$$');
const after = (text.match(/^> \$$/gm) || []).length;
fs.writeFileSync(path, text);
console.log(`blockquote single-dollar delimiters ${before} -> ${after}`);
