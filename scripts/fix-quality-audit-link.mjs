import fs from 'node:fs';
const path = 'textbook/f0-dream-theater-proof-audit.md';
let text = fs.readFileSync(path, 'utf8');
text = text.replace('(../f0-dream-theater-content-exercise-audit.md)', '(f0-dream-theater-content-exercise-audit.md)');
fs.writeFileSync(path, text);
