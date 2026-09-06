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
  'subbasis example reverse inclusion'
);

top1 = replaceRequired(
  top1,
  'したがって生成位相の最小性から $\\tau(\\mathcal S)\\subseteq\\rho$。',
  'したがって[部分基底から生成される位相の最小性](#thm-top1-subbasis-generates)から $\\tau(\\mathcal S)\\subseteq\\rho$。',
  'named formal link for generated topology minimality'
);

fs.writeFileSync(top1Path, top1);

const auditPath = 'scripts/audit-dream-theater-concepts.mjs';
let audit = fs.readFileSync(auditPath, 'utf8');
audit = replaceRequired(
  audit,
  `  if (pageChanged || !changedOnly) {\n    for (const concept of conceptById.values()) {\n      if (concept.pageId === page.id) continue;\n      const firstUse = firstAliasUse(lines, concept.aliases);`,
  `  if (pageChanged || !changedOnly) {\n    // 同じ語が複数分野で使われる場合（例: 「基底」「連続写像」）、\n    // 現ページまたは prerequisite から到達できる概念がその alias を所有していれば、\n    // その語だけを根拠に到達不能な別分野概念への依存とは判定しない。\n    // 一方、到達可能概念と共有されていない固有 alias は従来どおり検査する。\n    const reachablePageIds = new Set([page.id, ...page.ancestors]);\n    const reachableAliases = new Set();\n    for (const reachablePageId of reachablePageIds) {\n      const reachablePage = pages.get(reachablePageId);\n      for (const reachableConcept of reachablePage?.concepts ?? []) {\n        for (const alias of reachableConcept.aliases) reachableAliases.add(normalizeAlias(alias));\n      }\n    }\n\n    for (const concept of conceptById.values()) {\n      if (concept.pageId === page.id) continue;\n      const unresolvedAliases = concept.aliases.filter((alias) => !reachableAliases.has(normalizeAlias(alias)));\n      const firstUse = firstAliasUse(lines, unresolvedAliases);`,
  'reachable alias disambiguation'
);
fs.writeFileSync(auditPath, audit);

for (const temp of [
  'scripts/patch-top1-final-review.mjs',
  '.github/workflows/patch-top1-final-review.yml'
]) {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: complete TOP1 final proof review'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-topology-core'], { stdio: 'inherit' });
