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

edit('textbook/volumes/04_linear_models/L1_01_単回帰と最小二乗法/index.md', [
  [
`最小二乗推定量での残差を
$$
e_i=y_i-\\hat y_i,
\\qquad
\\hat y_i=\\hat\\beta_0+\\hat\\beta_1x_i
$$
とします。正規方程式から`,
`<a id="def-l1-01-residual"></a>

<!-- formal-statement-start -->
> **定義（残差）**  
> 観測値 $y_i$ と、その観測点での当てはめ値 $\\hat y_i=\\hat\\beta_0+\\hat\\beta_1x_i$ の差
> $e_i=y_i-\\hat y_i$
> を **残差** という。
<!-- formal-statement-end -->

正規方程式から`,
'L1-01 residual definition'
  ],
  [
`決定係数を
$$
R^2=\\frac{SSR}{SST}=1-\\frac{SSE}{SST}
$$
と定めます。切片を含む通常の最小二乗回帰では $0\\le R^2\\le1$ です。`,
`<a id="def-l1-01-coefficient-of-determination"></a>

<!-- formal-statement-start -->
> **定義（決定係数）**  
> $SST>0$ のとき、全平方和に対して当てはめで説明された平方和が占める割合
> $R^2=\\dfrac{SSR}{SST}$
> を **決定係数** という。切片を含む最小二乗回帰では $SST=SSR+SSE$ なので
> $R^2=1-\\dfrac{SSE}{SST}$
> とも書ける。
<!-- formal-statement-end -->

切片を含む通常の最小二乗回帰では $0\\le R^2\\le1$ です。`,
'L1-01 coefficient of determination definition'
  ]
]);

edit('textbook/volumes/04_linear_models/L1_02_重回帰_線形モデルの行列表現/index.md', [
  [
`一般に群平均の線形結合
$$
L=\\sum_{i=1}^a c_i\\mu_i
$$
で
$$
\\sum_{i=1}^a c_i=0
$$
を満たすものを線形対比と呼びます。全ての群平均に同じ定数を加えても対比値が変わらないため、「水準そのもの」ではなく「差」を測る量になっています。`,
`<a id="def-l1-02-linear-contrast"></a>

<!-- formal-statement-start -->
> **定義（線形対比）**  
> 群平均 $\\mu_1,\\ldots,\\mu_a$ の線形結合
> $L=\\sum_{i=1}^a c_i\\mu_i$
> のうち、係数が $\\sum_{i=1}^a c_i=0$ を満たすものを **線形対比** という。
<!-- formal-statement-end -->

全ての群平均に同じ定数を加えても対比値が変わらないため、「水準そのもの」ではなく「差」を測る量になっています。`,
'L1-02 linear contrast definition'
  ]
]);

edit('textbook/volumes/04_linear_models/L1_03_分散分析/index.md', [
  [
`Aの効果がBによって2から8へ変わっています。これが**交互作用**です。

> 主効果だけを見ると「Aを変えると平均5増える」ですが、実際には弱日照では2、強日照では8増えています。交互作用が大きいとき、主効果だけでは現象を言い表せません。`,
`<a id="def-l1-03-interaction"></a>

<!-- formal-statement-start -->
> **定義（交互作用）**  
> 多因子実験で、ある因子の効果が他の因子の水準によって変化するとき、因子間に **交互作用** があるという。$2\\times2$ 配置では、一方の因子の効果の「差の差」が0でないことに対応する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-03-interaction -->
**定義の確認**  
この例ではAの効果が $B_1$ で2、$B_2$ で8なので、差の差は $8-2=6$ です。Aの効果がBの水準によって変わっているため、交互作用があります。
<!-- definition-example-end -->

> 主効果だけを見ると「Aを変えると平均5増える」ですが、実際には弱日照では2、強日照では8増えています。交互作用が大きいとき、主効果だけでは現象を言い表せません。`,
'L1-03 interaction definition'
  ],
  [
`## 6. 多重比較：比較を増やすと偶然の有意差も増える

1個の検定を有意水準 $\\alpha$ で行う場合と、同じデータで多数の比較を行う場合では「少なくとも1回誤って棄却する確率」が異なります。複数の比較を一つの家族として扱い、この確率を家族内第一種過誤確率と呼びます。`,
`## 6. 多重比較：比較を増やすと偶然の有意差も増える

<a id="def-l1-03-multiple-comparisons"></a>

<!-- formal-statement-start -->
> **定義（多重比較）**  
> 同じデータから複数の群平均差や線形対比を同時に検討し、それらを一つの推測の家族として第一種過誤を管理する手続きを **多重比較** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-l1-03-multiple-comparisons -->
**定義の確認**  
1個の検定を有意水準 $\\alpha$ で行う場合と、同じデータで多数の比較を行う場合では「少なくとも1回誤って棄却する確率」が異なります。複数の比較を一つの家族として扱い、この確率を家族内第一種過誤確率と呼びます。
<!-- definition-example-end -->`,
'L1-03 multiple comparisons definition'
  ]
]);
