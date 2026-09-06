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

// LA4 proof-pedagogy repair: promote nontrivial auxiliary results to named
// formal lemmas, remove the generic English "chain" token from authored anchor
// IDs, and derive the minimal-polynomial/Jordan-block-size correspondence that
// later prose and exercises rely on.
{
  const path = 'textbook/volumes/00_foundations/LA4/index.md';
  let source = fs.readFileSync(path, 'utf8');

  const replaceOnce = (from, to, label) => {
    if (!source.includes(from)) throw new Error(`LA4 replacement point not found: ${label}`);
    source = source.replace(from, to);
  };

  replaceOnce(
    String.raw`#### 補助事実：余因子行列の恒等式

任意の $n\times n$ 行列 $M=(m_{ij})$ に対し、$(i,j)$ 余因子を $C_{ij}$ と書き
$$
\operatorname{adj}(M)_{kj}=C_{jk}
$$
で余因子行列を定めます。このとき
$$
M\operatorname{adj}(M)=\det(M)I
$$
です。`,
    String.raw`<a id="lem-la4-adjugate-identity"></a>
#### 補題（余因子行列の恒等式）

<!-- formal-statement-start -->
> **補題（余因子行列の恒等式）**  
> 任意の $n\times n$ 行列 $M=(m_{ij})$ に対し、$(i,j)$ 余因子を $C_{ij}$ と書き
$$
\operatorname{adj}(M)_{kj}=C_{jk}
$$
> で余因子行列を定める。このとき
$$
M\operatorname{adj}(M)=\det(M)I.
$$
<!-- formal-statement-end -->`,
    'adjugate lemma'
  );

  replaceOnce(
    String.raw`#### 補助事実1：多項式のBézout等式

多項式 $f,g$ が互いに素なら、ある多項式 $a,b$ が存在して
$$
af+bg=1
$$
と書けます。`,
    String.raw`<a id="lem-la4-polynomial-bezout"></a>
#### 補題（多項式のBézout等式）

<!-- formal-statement-start -->
> **補題（多項式のBézout等式）**  
> 多項式 $f,g$ が互いに素なら、ある多項式 $a,b$ が存在して
$$
af+bg=1
$$
> と書ける。
<!-- formal-statement-end -->`,
    'Bezout lemma'
  );

  replaceOnce(
    String.raw`#### 補助事実2：互いに素な因子をまとめる

$f_1,\dots,f_r$ が2つずつ互いに素で、多項式 $h$ が全ての $f_i$ で割り切れるなら
$$
f_1\cdots f_r\mid h
$$
です。`,
    String.raw`<a id="lem-la4-coprime-product-divisibility"></a>
#### 補題（互いに素な因子の積による整除）

<!-- formal-statement-start -->
> **補題（互いに素な因子の積による整除）**  
> $f_1,\dots,f_r$ が2つずつ互いに素で、多項式 $h$ が全ての $f_i$ で割り切れるなら
$$
f_1\cdots f_r\mid h.
$$
<!-- formal-statement-end -->`,
    'coprime product lemma'
  );

  source = source.replaceAll('def-la4-jordan-chain', 'def-la4-jordan-sequence');

  const blockHeading = '### ブロックサイズから何が読めるか';
  const derivation = String.raw`#### 最小多項式の指数と最大Jordanブロックサイズ

ここまででJordanブロックの存在と一意性は示せました。次に、後で使う
$$
\text{「最小多項式中の }(t-\lambda)\text{ の指数」}
=
\text{「固有値 }\lambda\text{ の最大Jordanブロックサイズ」}
$$
を式から確認します。

まず1個のJordanブロック $J_k(\lambda)$ を考え、
$$
N=J_k(\lambda)-\lambda I
$$
と置きます。Jordan鎖基底を $v_1,\dots,v_k$ とすると
$$
Nv_1=0,
\qquad
Nv_j=v_{j-1}\quad(j=2,\dots,k).
$$
従って
$$
N^kv_j=0\qquad(j=1,\dots,k)
$$
なので $N^k=0$、すなわち
$$
(J_k(\lambda)-\lambda I)^k=0.
$$
一方、鎖の最上段 $v_k$ に作用させると
$$
N^{k-1}v_k=v_1\ne0
$$
なので $N^{k-1}\ne0$ です。したがって $(t-\lambda)^k$ はこのブロックを消しますが、$(t-\lambda)^{k-1}$ では消せません。

ここで「別の形の低次数多項式なら消せるかもしれない」という可能性も潰します。$p(J_k(\lambda))=0$ を満たす任意の多項式 $p$ を、$(t-\lambda)^k$ で割って
$$
p(t)=q(t)(t-\lambda)^k+r(t),
\qquad
\deg r<k
$$
と書きます。すでに $(J_k(\lambda)-\lambda I)^k=0$ なので
$$
0=p(J_k(\lambda))=r(J_k(\lambda)).
$$
$\deg r<k$ だから、$t-\lambda$ の冪を基底にして
$$
r(t)=a_0+a_1(t-\lambda)+\cdots+a_{k-1}(t-\lambda)^{k-1}
$$
と一意に書けます。これを $v_k$ に作用させると
$$
\begin{aligned}
0=r(J_k(\lambda))v_k
&=a_0v_k+a_1Nv_k+\cdots+a_{k-1}N^{k-1}v_k\\
&=a_0v_k+a_1v_{k-1}+\cdots+a_{k-1}v_1.
\end{aligned}
$$
$v_1,\dots,v_k$ は基底なので一次独立です。従って
$$
a_0=a_1=\cdots=a_{k-1}=0,
$$
すなわち $r=0$。よって、このブロックを消す任意の多項式は $(t-\lambda)^k$ で割り切れます。したがって
$$
m_{J_k(\lambda)}(t)=(t-\lambda)^k.
$$

次にJordanブロックの直和
$$
T=J_{k_1}(\lambda_1)\oplus\cdots\oplus J_{k_m}(\lambda_m)
$$
を考えます。作用素多項式もブロックごとに作用するので
$$
p(T)=0
$$
であることと、全ての $i$ について
$$
p(J_{k_i}(\lambda_i))=0
$$
であることは同値です。従って $T$ の最小多項式は、各ブロックの最小多項式の最小公倍多項式です。

固定した固有値 $\lambda$ に属するブロックサイズを $k_1,\dots,k_c$ とすれば、その部分の最小公倍多項式は
$$
\operatorname{lcm}\bigl((t-\lambda)^{k_1},\dots,(t-\lambda)^{k_c}\bigr)
=(t-\lambda)^{\max_i k_i}.
$$
従って、最小多項式中の $(t-\lambda)$ の指数は、固有値 $\lambda$ に対応する最大Jordanブロックのサイズそのものです。

`;
  replaceOnce(blockHeading, `${derivation}${blockHeading}`, 'minimal polynomial/Jordan block derivation');
  fs.writeFileSync(path, source);
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
  'linear.complex-inner-product',
  'measure.lp-space'
]);
addForwardRefs('textbook/volumes/00_foundations/LA2/knowledge.yaml', [
  'linear.dual-basis',
  'linear.annihilator',
  'linear.dual-map',
  'measure.lp-space'
]);
addForwardRefs('textbook/volumes/00_foundations/LA3/knowledge.yaml', [
  'topology.topology',
  'linear.characteristic-polynomial',
  'linear.minimal-polynomial',
  'linear.generalized-eigenspace',
  'measure.lp-space',
  'functional.linear-functional',
  'functional.continuous-linear-functional'
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
  'linear.complex-singular-value-decomposition',
  'functional.norm',
  'functional.l2-inner-product',
  'linear.inner-product-recap-c1'
]);
addForwardRefs('textbook/volumes/00_foundations/LA6/knowledge.yaml', [
  'functional.norm',
  'functional.operator-norm'
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