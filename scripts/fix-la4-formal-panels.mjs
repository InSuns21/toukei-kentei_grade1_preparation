import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const path = 'textbook/volumes/00_foundations/LA4/index.md';
let source = fs.readFileSync(path, 'utf8');

// These standalone Markdown headings duplicate the actual formal declaration
// already present inside the standard blue-line panel. Remove only the
// duplicate heading; keep the anchor and formal statement itself unchanged.
const fixes = [
  ['#### 補題（余因子行列の恒等式）\n\n<!-- formal-statement-start -->', '<!-- formal-statement-start -->'],
  ['#### 補題（多項式のBézout等式）\n\n<!-- formal-statement-start -->', '<!-- formal-statement-start -->'],
  ['#### 補題（互いに素な因子の積による整除）\n\n<!-- formal-statement-start -->', '<!-- formal-statement-start -->']
];

for (const [from, to] of fixes) {
  if (!source.includes(from)) throw new Error(`replacement point not found: ${from.split('\n')[0]}`);
  source = source.replace(from, to);
}
fs.writeFileSync(path, source);

// Remove temporary one-shot machinery from the resulting branch commit.
for (const temp of [
  'scripts/fix-la4-formal-panels.mjs',
  '.github/workflows/fix-la4-formal-panels.yml'
]) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: remove duplicate LA4 formal headings'], { stdio: 'inherit' });

for (const [cmd, args] of [
  ['npm', ['run', 'validate:formal-statements']],
  ['npm', ['run', 'validate:proof-folding']],
  [process.execPath, ['scripts/validate-formal-reference-links.mjs']],
  [process.execPath, ['scripts/validate-dream-theater-concepts-changed.mjs']],
  ['npm', ['run', 'validate:definition-examples']],
  ['npm', ['run', 'validate:named-formals']]
]) {
  execFileSync(cmd, args, { stdio: 'inherit' });
}

execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-linear-algebra-core'], { stdio: 'inherit' });
