import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';

const replacements = [
  {
    path: 'textbook/volumes/00_foundations/LA3/index.md',
    from: '関数解析では連続線形汎関数だけを集めた双対を使いますが、ここでは位相を入れない **代数的双対** を扱います。',
    to: 'ここでは追加の構造を仮定せず、線形写像 $V\\to\\mathbb F$ 全体からなる **代数的双対** を扱います。'
  },
  {
    path: 'textbook/volumes/00_foundations/LA5/index.md',
    from: '実内積空間では転置 $A^{\\mathsf T}$ が自然に現れました。',
    to: '[F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) で実数の場合に扱った内積では、転置 $A^{\\mathsf T}$ が自然に現れました。'
  },
  {
    path: 'textbook/volumes/00_foundations/LA5/index.md',
    from: '実内積空間のCauchy–Schwarz不等式・Gram–Schmidt・直交射影は、共役を正しく入れれば複素内積空間にも拡張できます。',
    to: '[F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) で実数の場合に確認したCauchy–Schwarz不等式・Gram–Schmidt・直交射影は、共役を正しく入れれば複素内積空間にも拡張できます。'
  },
  {
    path: 'textbook/volumes/00_foundations/LA5/index.md',
    from: '特にノルムも保存します。',
    to: '特に内積から定まる長さ $\\sqrt{\\langle x,x\\rangle}$ も保存します。'
  },
  {
    path: 'textbook/volumes/00_foundations/LA5/index.md',
    from: 'ノルムが0なので',
    to: '長さが0なので'
  },
  {
    path: 'textbook/volumes/00_foundations/LA6/index.md',
    from: 'さらに先ほどのノルム等式から',
    to: 'さらに先ほどの長さの等式から'
  },
  {
    path: 'textbook/volumes/00_foundations/LA6/index.md',
    from: 'と定めます。まず $u_i$ のノルムを計算します。',
    to: 'と定めます。まず $u_i$ の長さを計算します。'
  },
  {
    path: 'textbook/volumes/00_foundations/LA6/index.md',
    from: '作用素ノルムはunitary変換で不変なので',
    to: '[行列の作用素ノルム（スペクトルノルム）](../F0_00F2_SVD_特異値_作用素ノルム/index.md#def-f0-00f2-operator-norm) はunitary変換で不変なので'
  }
];

for (const { path, from, to } of replacements) {
  const source = fs.readFileSync(path, 'utf8');
  if (!source.includes(from)) {
    console.error(`Expected text not found in ${path}: ${from}`);
    process.exit(1);
  }
  fs.writeFileSync(path, source.replace(from, to));
}

// Reader-content audit must not treat stable HTML anchor IDs as prose.
{
  const path = 'scripts/audit-dream-theater-concepts.mjs';
  let source = fs.readFileSync(path, 'utf8');
  const from = "  value = value.replace(/<!--[\\s\\S]*?-->/g, preserveLines);\n";
  const to = `${from}  value = value.replace(/<[^>\\n]+>/g, preserveWidth);\n`;
  if (!source.includes(from)) throw new Error('stripNonReaderContent insertion point not found');
  source = source.replace(from, to);

  // If a later general concept and an already reachable concept overlap in the same
  // reader-visible phrase, prefer the reachable/specific owner. This prevents
  // e.g. a future abstract "norm" node from stealing a matrix-norm occurrence.
  const scanFrom = `      const firstUse = firstAliasUse(lines, concept.aliases);\n      if (firstUse == null) continue;\n`;
  const scanTo = `      const firstUse = firstUnshadowedAliasUse(lines, concept, page);\n      if (firstUse == null) continue;\n`;
  if (!source.includes(scanFrom)) throw new Error('concept scan replacement point not found');
  source = source.replace(scanFrom, scanTo);

  const helperPoint = `function firstAliasUse(lines, aliases) {\n  for (let i = 0; i < lines.length; i += 1) {\n    if (aliases.some((alias) => aliasAppears(lines[i], alias))) return i + 1;\n  }\n  return null;\n}\n\n`;
  const helper = `${helperPoint}function conceptIsReachableFrom(page, concept) {\n  return concept.pageId === page.id || page.ancestors.has(concept.pageId) || page.forwardReferences.has(concept.id);\n}\n\nfunction firstUnshadowedAliasUse(lines, concept, page) {\n  for (let i = 0; i < lines.length; i += 1) {\n    const line = lines[i];\n    for (const alias of concept.aliases) {\n      if (!aliasAppears(line, alias)) continue;\n      const needle = normalizeAlias(alias);\n      let shadowed = false;\n      for (const other of conceptById.values()) {\n        if (other.id === concept.id || !conceptIsReachableFrom(page, other)) continue;\n        for (const otherAlias of other.aliases) {\n          const longer = normalizeAlias(otherAlias);\n          if (!aliasAppears(line, otherAlias)) continue;\n          if (longer === needle || (longer.length > needle.length && longer.includes(needle))) {\n            shadowed = true;\n            break;\n          }\n        }\n        if (shadowed) break;\n      }\n      if (!shadowed) return i + 1;\n    }\n  }\n  return null;\n}\n\n`;
  if (!source.includes(helperPoint)) throw new Error('firstAliasUse helper point not found');
  source = source.replace(helperPoint, helper);
  fs.writeFileSync(path, source);
}

function addForwardRefs(path, ids) {
  const doc = YAML.parse(fs.readFileSync(path, 'utf8')) ?? {};
  doc.forward_references = [...new Set([...(doc.forward_references ?? []), ...ids])];
  fs.writeFileSync(path, YAML.stringify(doc), 'utf8');
}

addForwardRefs('textbook/volumes/00_foundations/LA1/knowledge.yaml', [
  'linear.complementary-subspace',
  'linear.quotient-space',
  'linear.canonical-quotient-map',
  'linear.first-isomorphism-theorem',
  'linear.complex-inner-product'
]);
addForwardRefs('textbook/volumes/00_foundations/LA2/knowledge.yaml', [
  'linear.dual-basis',
  'linear.annihilator',
  'linear.dual-map'
]);
addForwardRefs('textbook/volumes/00_foundations/LA3/knowledge.yaml', [
  'linear.characteristic-polynomial',
  'linear.minimal-polynomial',
  'linear.generalized-eigenspace'
]);
addForwardRefs('textbook/volumes/00_foundations/LA4/knowledge.yaml', [
  'linear.complex-inner-product',
  'linear.normal-operator'
]);
addForwardRefs('textbook/volumes/00_foundations/LA5/knowledge.yaml', [
  'linear.singular-value',
  'linear.singular-value-decomposition',
  'linear.hermitian-quadratic-form',
  'linear.polar-decomposition',
  'linear.complex-singular-value-decomposition'
]);

// Let the knowledge-DAG aware fixer insert exact stable-anchor links for named proof dependencies.
execFileSync(process.execPath, ['scripts/validate-formal-reference-links.mjs', '--fix'], { stdio: 'inherit' });

// Remove this one-shot machinery from the resulting commit.
for (const path of [
  'scripts/fix-la-pedagogy-ci.mjs',
  '.github/workflows/fix-la-pedagogy-ci.yml'
]) {
  if (fs.existsSync(path)) fs.unlinkSync(path);
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', '-A']);
execFileSync('git', ['commit', '-m', 'fix: close LA proof and DAG review gaps'], { stdio: 'inherit' });

for (const [cmd, args] of [
  [process.execPath, ['scripts/validate-formal-reference-links.mjs']],
  [process.execPath, ['scripts/validate-dream-theater-concepts-changed.mjs']],
  ['npm', ['run', 'validate:proof-folding']],
  ['npm', ['run', 'validate:definition-examples']],
  ['npm', ['run', 'validate:named-formals']]
]) {
  execFileSync(cmd, args, { stdio: 'inherit' });
}

execFileSync('git', ['push', 'origin', 'HEAD:feature/dream-theater-linear-algebra-core'], { stdio: 'inherit' });
