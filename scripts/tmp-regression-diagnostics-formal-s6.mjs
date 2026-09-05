import fs from 'node:fs';

function replaceOnce(text, oldText, newText, label) {
  const count = text.split(oldText).length - 1;
  if (count === 1) return text.replace(oldText, () => newText);
  if (text.includes(newText)) return text;
  throw new Error(`${label}: expected exactly one target, found ${count}`);
}

function edit(path, edits) {
  let text = fs.readFileSync(path, 'utf8');
  for (const [oldText, newText, label] of edits) {
    text = replaceOnce(text, oldText, newText, label);
  }
  fs.writeFileSync(path, text, 'utf8');
}

edit('textbook/volumes/04_linear_models/L1_02_重回帰_線形モデルの行列表現/index.md', [
  [
`## 7. 線形制約を行列でまとめる

例えば`,
`## 7. 線形制約を行列でまとめる

<a id="def-l1-02-linear-constraint"></a>

<!-- formal-statement-start -->
> **定義（線形制約）**  
> 線形モデルの係数ベクトル $\\boldsymbol\\beta$ に対して
> $\\boldsymbol R\\boldsymbol\\beta=\\boldsymbol r$
> の形で課す等式条件を **線形制約** という。独立な制約の本数は $\\operatorname{rank}(\\boldsymbol R)$ で数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-02-linear-constraint -->
**定義の確認**  
例えば`,
'L1-02 linear constraint definition start'
  ],
  [
`として
$$
\\boldsymbol R\\boldsymbol\\beta=\\boldsymbol r
$$
と書けます。

「両方の傾きが0」は`,
`として
$$
\\boldsymbol R\\boldsymbol\\beta=\\boldsymbol r
$$
と書けます。
<!-- definition-example-end -->

「両方の傾きが0」は`,
'L1-02 linear constraint definition example end'
  ]
]);

edit('textbook/volumes/04_linear_models/L1_04_回帰診断_一般化最小二乗_正則化/index.md', [
  [
`### 6.1 重み付き二次形式を最小化する

一般化最小二乗法では

$$
Q(\\beta)
=(y-X\\beta)^{\\mathsf T}\\Omega^{-1}(y-X\\beta)
$$

を最小化します。`,
`### 6.1 重み付き二次形式を最小化する

<a id="def-l1-04-gls"></a>

<!-- formal-statement-start -->
> **定義（一般化最小二乗推定）**  
> $\\operatorname{Var}(\\varepsilon\\mid X)=\\sigma^2\\Omega$ で $\\Omega$ が正定値のとき、
> $Q(\\beta)=(y-X\\beta)^{\\mathsf T}\\Omega^{-1}(y-X\\beta)$
> を最小化して $\\beta$ を推定する方法を **一般化最小二乗法（GLS）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-04-gls -->
**定義の確認**  
$\\Omega=I_n$ なら $Q(\\beta)=\\|y-X\\beta\\|^2$ となるので、GLS は通常最小二乗法に戻ります。
<!-- definition-example-end -->`,
'L1-04 GLS definition'
  ],
  [
`## 8. 多重共線性: 当てはまるのに係数が決まらない

説明変数 $X_j$ が他の説明変数のほぼ線形結合になっていると、$X_j$ 独自の変動がほとんど残りません。

完全な線形関係なら $X$ は列フルランクでなくなり、$X^{\\mathsf T}X$ は特異です。完全ではないが非常に強い線形関係がある場合、逆行列は存在しても係数分散が大きくなります。`,
`## 8. 多重共線性: 当てはまるのに係数が決まらない

<a id="def-l1-04-multicollinearity"></a>

<!-- formal-statement-start -->
> **定義（多重共線性）**  
> 複数の説明変数の間に完全または非常に強い線形関係があり、各説明変数に固有の変動が乏しくなる状態を **多重共線性** という。完全な線形関係では $X$ が列フルランクでなくなり、強い近似的線形関係では係数推定の分散が大きくなりやすい。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-04-multicollinearity -->
**定義の確認**  
例えば $X_2=2X_1$ なら完全な共線性で $X^{\\mathsf T}X$ は特異です。$X_2\\approx2X_1$ のようにほぼ同じ関係なら逆行列は存在しても、個々の係数を分けて推定する情報が乏しくなります。
<!-- definition-example-end -->`,
'L1-04 multicollinearity definition'
  ],
  [
`## 10. L1正則化法とLASSO

多重共線性が強いとき、あるいは候補変数が多いとき、係数を安定化させるために損失へ罰則を加える方法があります。

LASSOでは、説明変数を中心化・標準化し、切片を罰しない形で

$$
\\boxed{
\\frac1{2n}\\|y-X\\beta\\|^2
+\\lambda\\sum_{j=1}^p|\\beta_j|
}
$$

を最小化します。$\\lambda\\ge0$ は罰則の強さです。

- $\\lambda=0$: 通常の最小二乗法。
- $\\lambda$ を大きくする: 係数を0へ縮める。
- L1罰則: 一部の係数を**厳密に0**へできるため、推定と変数選択を同時に行える。`,
`## 10. L1正則化法とLASSO

多重共線性が強いとき、あるいは候補変数が多いとき、係数を安定化させるために損失へ罰則を加える方法があります。

<a id="def-l1-04-l1-regularization"></a>

<!-- formal-statement-start -->
> **定義（L1正則化法）**  
> 推定する係数に対し、損失関数へ $\\lambda\\|\\beta\\|_1=\\lambda\\sum_j|\\beta_j|$ を加えて最小化する方法を **L1正則化法** という。二乗誤差を損失とする線形回帰では **LASSO** と呼び、切片を罰しない標準的な形は
> $\\dfrac1{2n}\\|y-X\\beta\\|^2+\\lambda\\sum_{j=1}^p|\\beta_j|$
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-04-l1-regularization -->
**定義の確認**  
- $\\lambda=0$: 通常の最小二乗法。
- $\\lambda$ を大きくする: 係数を0へ縮める。
- L1罰則: 一部の係数を**厳密に0**へできるため、推定と変数選択を同時に行える。
<!-- definition-example-end -->`,
'L1-04 L1 regularization definition'
  ]
]);
