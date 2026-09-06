import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

function replaceOnce(source, from, to, label) {
  if (!source.includes(from)) throw new Error(`replacement point not found: ${label}`);
  return source.replace(from, to);
}

function replaceRange(source, start, end, replacement, label) {
  const a = source.indexOf(start);
  if (a < 0) throw new Error(`range start not found: ${label}`);
  const b = source.indexOf(end, a + start.length);
  if (b < 0) throw new Error(`range end not found: ${label}`);
  return source.slice(0, a) + replacement + source.slice(b);
}

const simpleReplacements = [
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

for (const { path, from, to } of simpleReplacements) {
  let source = fs.readFileSync(path, 'utf8');
  source = replaceOnce(source, from, to, `${path}: prose`);
  fs.writeFileSync(path, source);
}

{
  const path = 'textbook/volumes/00_foundations/LA4/index.md';
  let source = fs.readFileSync(path, 'utf8');

  const cayleyProofStart = `<!-- proof-start -->\n### 証明\n\n基底を選び $T$ の表現行列を $A$ とします。`;
  const adjugateLemma = String.raw`<a id="lem-la4-adjugate-identity"></a>
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
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

積の $(i,j)$ 成分は
$$
(M\operatorname{adj}(M))_{ij}
=\sum_{k=1}^n m_{ik}C_{jk}
$$
です。$i=j$ なら、これは第 $j$ 行に関するLaplace展開そのものなので
$$
\sum_{k=1}^n m_{jk}C_{jk}=\det M.
$$
一方 $i\ne j$ なら、上の和は「$M$ の第 $j$ 行を第 $i$ 行で置き換えた行列」を第 $j$ 行でLaplace展開した値です。その行列には第 $i$ 行と第 $j$ 行という同じ2行があるため行列式は0です。したがって
$$
(M\operatorname{adj}(M))_{ij}
=
\begin{cases}
\det M,&i=j,\\
0,&i\ne j,
\end{cases}
$$
となり
$$
M\operatorname{adj}(M)=\det(M)I
$$
が示されました。$\square$
<!-- proof-end -->

`;
  source = replaceOnce(source, cayleyProofStart, `${adjugateLemma}${cayleyProofStart}`, 'insert adjugate lemma');

  source = replaceRange(
    source,
    '#### 補助事実：余因子行列の恒等式',
    'そこで多項式行列 $tI-A$ に補助事実を適用すると',
    '上の[余因子行列の恒等式](#lem-la4-adjugate-identity)は、成分が多項式でも同じLaplace展開で成り立つので $M=tI-A$ に使えます。\n\n',
    'remove nested adjugate derivation'
  );
  source = source.replace(
    'そこで多項式行列 $tI-A$ に補助事実を適用すると',
    'そこで多項式行列 $tI-A$ に補題を適用すると'
  );

  const generalizedProofStart = `<!-- proof-start -->\n### 証明\n\n各 $j$ について`;
  const polynomialLemmas = String.raw`<a id="lem-la4-polynomial-bezout"></a>
#### 補題（多項式のBézout等式）

<!-- formal-statement-start -->
> **補題（多項式のBézout等式）**  
> 多項式 $f,g$ が互いに素なら、ある多項式 $a,b$ が存在して
$$
af+bg=1
$$
> と書ける。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Euclidの互除法を
$$
r_{-1}=f,\qquad r_0=g,
$$
$$
r_{k-1}=q_kr_k+r_{k+1},
\qquad \deg r_{k+1}<\deg r_k
$$
と続けます。最後の非零余りは $\gcd(f,g)$ の定数倍です。$f,g$ は互いに素なので、この最後の余りを定数倍して1とできます。

各式を
$$
r_{k+1}=r_{k-1}-q_kr_k
$$
と書き直し、最後の式から順に逆代入します。各余りはその一つ前と二つ前の余りの多項式係数線形結合なので、逆代入を最初まで続けると、最後の1は最初の $f,g$ の多項式係数線形結合になります。従ってある多項式 $a,b$ が存在して
$$
1=af+bg.
$$
$\square$
<!-- proof-end -->

<a id="lem-la4-coprime-product-divisibility"></a>
#### 補題（互いに素な因子の積による整除）

<!-- formal-statement-start -->
> **補題（互いに素な因子の積による整除）**  
> $f_1,\dots,f_r$ が2つずつ互いに素で、多項式 $h$ が全ての $f_i$ で割り切れるなら
$$
f_1\cdots f_r\mid h.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず2因子の場合を示します。$h=f_1c$ かつ $f_2\mid h$ とします。[多項式のBézout等式](#lem-la4-polynomial-bezout)から
$$
af_1+bf_2=1
$$
と書けます。両辺に $c$ を掛けると
$$
c=af_1c+bf_2c=ah+bf_2c.
$$
右辺の2項はいずれも $f_2$ で割り切れるので $f_2\mid c$。従って $c=f_2d$ と書け
$$
h=f_1f_2d.
$$
よって $f_1f_2\mid h$ です。

次にこの2因子の場合を繰り返します。$f_1,\dots,f_r$ が2つずつ互いに素なら、積 $f_1\cdots f_{j-1}$ と $f_j$ も互いに素です。実際、両者に共通する既約因子があれば、その因子は $f_j$ といずれかの $f_i$（$i<j$）の共通因子になり、仮定に反します。従って
$$
f_1f_2\mid h,
$$
次に
$$
f_1f_2f_3\mid h,
$$
と順に進め、最後に
$$
f_1\cdots f_r\mid h
$$
を得ます。$\square$
<!-- proof-end -->

`;
  source = replaceOnce(source, generalizedProofStart, `${polynomialLemmas}${generalizedProofStart}`, 'insert polynomial lemmas');

  source = replaceRange(
    source,
    '#### 補助事実1：多項式のBézout等式',
    '#### 最小多項式の指数と一般化固有空間を結ぶ',
    'この証明では、直前に示した[多項式のBézout等式](#lem-la4-polynomial-bezout)と[互いに素な因子の積による整除](#lem-la4-coprime-product-divisibility)を使います。\n\n',
    'remove nested polynomial lemmas'
  );
  source = source.replaceAll('補助事実1により', '[多項式のBézout等式](#lem-la4-polynomial-bezout)により');
  source = source.replaceAll('補助事実1から', '[多項式のBézout等式](#lem-la4-polynomial-bezout)から');
  source = source.replaceAll('補助事実2から', '[互いに素な因子の積による整除](#lem-la4-coprime-product-divisibility)から');

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
  source = replaceOnce(source, blockHeading, `${derivation}${blockHeading}`, 'insert minimal-polynomial/block-size derivation');

  fs.writeFileSync(path, source);
}

// Insert exact stable-anchor links for named proof dependencies after the new
// lemma anchors and registered knowledge nodes exist.
execFileSync(process.execPath, ['scripts/validate-formal-reference-links.mjs', '--fix'], { stdio: 'inherit' });

// Remove this temporary one-shot machinery from the resulting branch commit.
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