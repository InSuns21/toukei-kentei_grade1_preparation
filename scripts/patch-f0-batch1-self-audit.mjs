import fs from 'node:fs';

function replaceOnce(path, from, to) {
  let text = fs.readFileSync(path, 'utf8');
  if (!text.includes(from)) throw new Error(`marker not found: ${path}`);
  text = text.replace(from, to);
  fs.writeFileSync(path, text);
}

const b = 'textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md';
replaceOnce(b,
`一方、離散距離では $x_n\\to x$ なら、$\\varepsilon=1/2$ を取ることで十分大きい $n$ について

$$
d(x_n,x)<1/2
$$

となるため、実は

$$
x_n=x
$$

でなければなりません。つまり離散距離で収束する列は、最終的に定数列になります。
`,
`一方、離散距離では $x_n\\to x$ なら、$\\varepsilon=1/2$ を取ることで十分大きい $n$ について

$$
d(x_n,x)<1/2
$$

となるため、実は

$$
x_n=x
$$

でなければなりません。つまり離散距離で収束する列は、最終的に定数列になります。

### 4.1 極限は一意である

> **命題（距離空間における極限の一意性）**  
> 距離空間 $(X,d)$ の点列 $(x_n)$ が $x,y\\in X$ の両方に収束するなら
> $$
> x=y
> $$
> である。

#### 証明

$x\\ne y$ と仮定し、$r=d(x,y)>0$ と置きます。$x_n\\to x$ かつ $x_n\\to y$ なので、十分大きい $n$ では

$$
d(x_n,x)<r/3,
\\qquad
d(x_n,y)<r/3.
$$

三角不等式より

$$
r=d(x,y)
\\le d(x,x_n)+d(x_n,y)
<2r/3,
$$

となり矛盾します。したがって $x=y$ です。$\\square$

### 4.2 有界集合と収束列の有界性

> **定義（有界集合）**  
> 距離空間 $(X,d)$ の部分集合 $A\\subset X$ が **有界** であるとは、ある点 $x_0\\in X$ とある $R>0$ が存在して
> $$
> A\\subset B(x_0,R)
> $$
> となることをいう。

> **命題（収束列は有界）**  
> 距離空間 $(X,d)$ の収束列 $(x_n)$ に対して、集合
> $$
> \\{x_n:n\\ge1\\}
> $$
> は有界である。

#### 証明

$x_n\\to x$ とします。$\\varepsilon=1$ とすれば、ある $N$ が存在して $n\\ge N$ なら

$$
d(x_n,x)<1.
$$

有限個の初項 $x_1,\\ldots,x_{N-1}$ について

$$
R
=
1+\\max\\{d(x_1,x),\\ldots,d(x_{N-1},x)\\}
$$

と置けば、全ての $n$ について $d(x_n,x)<R$ です。したがって点列の値の集合は $B(x,R)$ に含まれ、有界です。$\\square$
`);

const c = 'textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md';
replaceOnce(c,
`すると $m\\ne n$ なら

$$
d(x_m,x_n)\\ge\\varepsilon.
$$

この列のどの部分列もCauchy列にならないので、収束部分列も持ちません。点列コンパクト性に矛盾します。したがって $K$ は全有界です。`,
`すると $m\\ne n$ なら

$$
d(x_m,x_n)\\ge\\varepsilon.
$$

もしある部分列 $x_{n_k}$ が $x$ に収束するなら、十分大きい $k,\\ell$ について

$$
d(x_{n_k},x)<\\varepsilon/3,
\\qquad
d(x_{n_\\ell},x)<\\varepsilon/3
$$

となるので、三角不等式から

$$
d(x_{n_k},x_{n_\\ell})<2\\varepsilon/3,
$$

となり $d(x_{n_k},x_{n_\\ell})\\ge\\varepsilon$ に矛盾します。したがって収束部分列は存在せず、点列コンパクト性に矛盾します。よって $K$ は全有界です。`);
replaceOnce(c,
`各球 $B(a_j,\\delta/2)\\cap K$ は直径が $\\delta$ 未満なので、Lebesgue数の性質より、ある $U_j\\in\\mathcal U$ に含まれます。`,
`Lebesgue数の性質を中心 $a_j$ に適用すると、ある $U_j\\in\\mathcal U$ が存在して

$$
B(a_j,\\delta)\\cap K\\subset U_j.
$$

したがって特に

$$
B(a_j,\\delta/2)\\cap K\\subset U_j
$$

です。`);

const d = 'textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md';
replaceOnce(d,
`Cauchy–Schwarzより

$$
\\sum_{j=1}^p|\\xi_j|
\\le
\\sqrt p\\,\\|\\xi\\|_2.
$$

したがって

$$
\\|x\\|
\\le
M\\sqrt p\\,\\|\\xi\\|_2.
$$`,
`各 $j$ について $|\\xi_j|\\le\\|\\xi\\|_2$ なので

$$
\\sum_{j=1}^p|\\xi_j|
\\le
p\\,\\|\\xi\\|_2.
$$

したがって

$$
\\|x\\|
\\le
Mp\\,\\|\\xi\\|_2.
$$`);
replaceOnce(d, `M\\sqrt p\\,\\|\\xi-\\eta\\|_2`, `Mp\\,\\|\\xi-\\eta\\|_2`);
replaceOnce(d,
`### F0-00D-B02 $\\ell^1,\\ell^2,\\ell^\\infty$ 型ノルムの比較

- Level: B
- 目安時間: 15分
- 主題: ノルム同値性
- 使用技術: Cauchy–Schwarz、最大値評価

$x=(x_1,\\ldots,x_p)\\in\\mathbb R^p$ に対して

$$
\\|x\\|_1=\\sum_{j=1}^p|x_j|,
\\qquad
\\|x\\|_2=\\left(\\sum_{j=1}^p|x_j|^2\\right)^{1/2},
\\qquad
\\|x\\|_\\infty=\\max_j|x_j|
$$

とする。次を示せ。

$$
\\boxed{
\\|x\\|_\\infty
\\le
\\|x\\|_2
\\le
\\|x\\|_1
\\le
\\sqrt p\\,\\|x\\|_2
\\le
p\\,\\|x\\|_\\infty
}
$$`,
`### F0-00D-B02 $\\ell^1,\\ell^2,\\ell^\\infty$ 型ノルムの比較

- Level: B
- 目安時間: 15分
- 主題: ノルム同値性
- 使用技術: 和と最大値の評価

$x=(x_1,\\ldots,x_p)\\in\\mathbb R^p$ に対して

$$
\\|x\\|_1=\\sum_{j=1}^p|x_j|,
\\qquad
\\|x\\|_2=\\left(\\sum_{j=1}^p|x_j|^2\\right)^{1/2},
\\qquad
\\|x\\|_\\infty=\\max_j|x_j|
$$

とする。次を示せ。

$$
\\boxed{
\\|x\\|_\\infty
\\le
\\|x\\|_2
\\le
\\|x\\|_1
\\le
p\\,\\|x\\|_\\infty
\\le
p\\,\\|x\\|_2
}
$$`);
replaceOnce(d,
`Cauchy–Schwarzを $(|x_1|,\\ldots,|x_p|)$ と $(1,\\ldots,1)$ に使うと

$$
\\|x\\|_1
=
\\sum_j|x_j|
\\le
\\left(\\sum_j|x_j|^2\\right)^{1/2}
\\left(\\sum_j1^2\\right)^{1/2}
=
\\sqrt p\\,\\|x\\|_2.
$$

さらに

$$
\\|x\\|_2^2
=
\\sum_j|x_j|^2
\\le
p\\|x\\|_\\infty^2,
$$

なので

$$
\\sqrt p\\,\\|x\\|_2
\\le
p\\|x\\|_\\infty.
$$`,
`各 $j$ について $|x_j|\\le\\|x\\|_\\infty$ なので

$$
\\|x\\|_1
=
\\sum_j|x_j|
\\le
p\\,\\|x\\|_\\infty.
$$

また既に $\\|x\\|_\\infty\\le\\|x\\|_2$ を示したので

$$
p\\,\\|x\\|_\\infty
\\le
p\\,\\|x\\|_2.
$$`);
replaceOnce(d,
`Cauchy–Schwarzより

$$
\\|x\\|_1\\le\\sqrt p\\,\\|x\\|_2.
$$

また

$$
\\|x\\|_2^2\\le p\\|x\\|_\\infty^2.
$$

したがって

$$
\\boxed{
\\|x\\|_\\infty
\\le\\|x\\|_2
\\le\\|x\\|_1
\\le\\sqrt p\\|x\\|_2
\\le p\\|x\\|_\\infty
}.
$$`,
`各成分が $\\|x\\|_\\infty$ 以下なので

$$
\\|x\\|_1\\le p\\|x\\|_\\infty.
$$

さらに $\\|x\\|_\\infty\\le\\|x\\|_2$ より

$$
p\\|x\\|_\\infty\\le p\\|x\\|_2.
$$

したがって

$$
\\boxed{
\\|x\\|_\\infty
\\le\\|x\\|_2
\\le\\|x\\|_1
\\le p\\|x\\|_\\infty
\\le p\\|x\\|_2
}.
$$`);
replaceOnce(d, `- Cauchy–Schwarz: 6点\n- 2と$\\infty$の上側評価: 4点`, `- $\\|x\\|_1\\le p\\|x\\|_\\infty$ の評価: 6点\n- 最後の比較: 4点`);
