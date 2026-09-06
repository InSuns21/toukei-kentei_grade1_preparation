import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

function replaceRequired(source, from, to, label) {
  if (!source.includes(from)) throw new Error(`replacement point not found: ${label}`);
  return source.replace(from, to);
}

const top1Path = 'textbook/volumes/00_foundations/TOP1/index.md';
let top1 = fs.readFileSync(top1Path, 'utf8');
top1 = replaceRequired(
  top1,
  'したがって有限交差で通常の開区間が作れ、任意和を取れば $\\mathbb R$ の通常位相が得られます。',
  `したがって有限交差で通常の開区間が作れ、任意和を取れば通常の開集合は全て生成位相に入ります。よって通常位相を $\\tau_{\\mathrm{std}}$ と書けば\n$$\n\\tau_{\\mathrm{std}}\\subseteq\\tau(\\mathcal S).\n$$\n逆に、部分基底をなす各半直線 $(-\\infty,b)$ と $(a,\\infty)$ はもともと $\\tau_{\\mathrm{std}}$ の開集合です。$\\tau_{\\mathrm{std}}$ は有限交差と任意和で閉じているので、$\\mathcal S$ から有限交差と任意和で作られる全ての集合も $\\tau_{\\mathrm{std}}$ に属します。従って\n$$\n\\tau(\\mathcal S)\\subseteq\\tau_{\\mathrm{std}}.\n$$\n以上の二つの包含から $\\tau(\\mathcal S)=\\tau_{\\mathrm{std}}$ です。`,
  'subbasis reverse inclusion'
);
top1 = replaceRequired(
  top1,
  'したがって生成位相の最小性から $\\tau(\\mathcal S)\\subseteq\\rho$。',
  'したがって[部分基底から生成される位相の最小性](#thm-top1-subbasis-generates)から $\\tau(\\mathcal S)\\subseteq\\rho$。',
  'named formal link'
);
fs.writeFileSync(top1Path, top1);

// Restore the normal validation workflow from the parent commit, then remove this helper.
execFileSync('git', ['checkout', 'HEAD^', '--', '.github/workflows/validate-pages.yml'], { stdio: 'inherit' });
fs.unlinkSync('scripts/patch-top1-final-review.mjs');
execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: complete TOP1 final proof review'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
