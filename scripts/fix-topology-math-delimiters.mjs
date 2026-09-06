import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const paths = [
  'textbook/volumes/00_foundations/TOP1/index.md',
  'textbook/volumes/00_foundations/LA4/index.md'
];

for (const path of paths) {
  let source = fs.readFileSync(path, 'utf8');
  const before = (source.match(/^\$$/gm) ?? []).length;
  source = source.replace(/^\$$/gm, '$$$$');
  const after = (source.match(/^\$$/gm) ?? []).length;
  if (before > 0 && after !== 0) throw new Error(`${path}: standalone $ remained`);
  fs.writeFileSync(path, source);
  console.log(`${path}: normalized ${before} standalone display delimiters`);
}

for (const temp of [
  'scripts/fix-topology-math-delimiters.mjs',
  '.github/workflows/fix-topology-math-delimiters.yml'
]) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: normalize display-math delimiters in TOP1 and LA4'], { stdio: 'inherit' });

for (const [cmd, args] of [
  ['npm', ['run', 'validate:math']],
  ['npm', ['run', 'validate:dream-theater-concepts:changed']],
  ['npm', ['run', 'validate:proof-folding']],
  ['npm', ['run', 'validate:formal-statements']],
  ['npm', ['run', 'validate:definition-examples']],
  ['npm', ['run', 'validate:named-formals']]
]) {
  execFileSync(cmd, args, { stdio: 'inherit' });
}

execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
