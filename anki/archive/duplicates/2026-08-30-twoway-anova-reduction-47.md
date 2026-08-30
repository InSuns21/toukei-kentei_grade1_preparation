---
id: anova-twoway-model
title: 反復あり二元配置モデルを書く
category: math-data-analysis
subcategory: math-anova
topic: twoway-model
type: formula
difficulty: 3
priority: S
hashtags:
  - 二元配置分散分析
  - 交互作用
  - 固定効果
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二元配置分散分析
archive_reason: duplicate
canonical_card: anova-twoway-f-tests
archive_note: 交互作用を含む固定効果モデル、識別制約、独立・正規・等分散の誤差仮定を正本へ統合済み。
---
## 問題
因子Aの水準を $i=1,\ldots,a$、因子Bの水準を $j=1,\ldots,b$、各水準組合せ（セル）内の反復を $k=1,\ldots,n$ とする。観測 $Y_{ijk}$ の固定効果モデル、誤差の仮定、識別制約を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

交互作用なしは $H_{0,AB}:(\alpha\beta)_{ij}=0\ (\forall i,j)$。

## 答え
$$Y_{ijk}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{ij}+\varepsilon_{ijk},$$
$$\varepsilon_{ijk}\overset{\mathrm{iid}}\sim N(0,\sigma^2).$$
識別制約は
$$\sum_i\alpha_i=0,
\qquad\sum_j\beta_j=0,$$
$$\sum_i(\alpha\beta)_{ij}=0\quad(j=1,\ldots,b),
\qquad\sum_j(\alpha\beta)_{ij}=0\quad(i=1,\ldots,a)$$
とする。

## 計算例
$a=2,b=3$、$\mu=10$、$\alpha=(-1,1)$、$\beta=(-2,0,2)$、交互作用が全て0とする。例えばAの第2水準、Bの第3水準の平均は
$$E[Y_{23k}]=10+1+2+0=13.$$
誤差が独立に $N(0,4)$ に従うなら $Y_{23k}\sim N(13,4)$ であり、全セルで同じ誤差分散4を持つ。

## 注意
交互作用が有意なら主効果だけの一律な解釈を避ける。

<!-- CARD -->

---
id: anova-twoway-ss-balanced
title: 釣合い二元配置の平方和分解を書く
category: math-data-analysis
subcategory: math-anova
topic: twoway-ss
type: formula
difficulty: 4
priority: S
hashtags:
  - 二元配置分散分析
  - 平方和分解
  - 釣合いデータ
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二元配置分散分析
archive_reason: duplicate
canonical_card: anova-twoway-f-tests
archive_note: 釣合い二元配置のA・B・交互作用・誤差平方和と平方和分解を数値例付き正本へ統合済み。
---
## 問題
因子Aの水準を $i=1,\ldots,a$、因子Bの水準を $j=1,\ldots,b$、反復を $k=1,\ldots,n$ とし、観測を $Y_{ijk}$ とする。$\overline Y_{ij\cdot}$ はセル $(i,j)$ の平均、$\overline Y_{i\cdot\cdot}$ と $\overline Y_{\cdot j\cdot}$ はA・B各水準の周辺平均、$\overline Y_{\cdot\cdot\cdot}$ は全平均を表す。釣合い二元配置の $SS_A,SS_B,SS_{AB},SS_E$ を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

釣合い配置では各効果成分が直交する。

## 答え
$$SS_A=bn\sum_i(\overline Y_{i\cdot\cdot}-\overline Y_{\cdot\cdot\cdot})^2,$$
$$SS_B=an\sum_j(\overline Y_{\cdot j\cdot}-\overline Y_{\cdot\cdot\cdot})^2,$$
$$SS_{AB}=n\sum_{i,j}(\overline Y_{ij\cdot}-\overline Y_{i\cdot\cdot}-\overline Y_{\cdot j\cdot}+\overline Y_{\cdot\cdot\cdot})^2,$$
$$SS_E=\sum_{i,j,k}(Y_{ijk}-\overline Y_{ij\cdot})^2,$$
かつ $SS_T=SS_A+SS_B+SS_{AB}+SS_E$。

## 計算例
$a=b=2,n=2$ で、行をA、列をBとして4セルの観測を
$$Y_{11\cdot}=(1,3),\quad Y_{12\cdot}=(3,5),$$
$$Y_{21\cdot}=(5,7),\quad Y_{22\cdot}=(11,13)$$
とする。セル平均は $(2,4,6,12)$、Aの周辺平均は $(3,9)$、Bの周辺平均は $(4,8)$、全平均は6である。したがって
$$SS_A=2\cdot2\{(3-6)^2+(9-6)^2\}=72,$$
$$SS_B=2\cdot2\{(4-6)^2+(8-6)^2\}=32.$$
交互作用偏差は $(1,-1,-1,1)$ なので
$$SS_{AB}=2(1^2+(-1)^2+(-1)^2+1^2)=8.$$
各セル内偏差は $(-1,1)$ だから
$$SS_E=4\{(-1)^2+1^2\}=8.$$
よって $SS_T=72+32+8+8=120$ である。

## 注意
不均衡配置では平方和の型と投入順序で結果が変わり得る。

<!-- CARD -->

---
id: anova-twoway-degrees-freedom
title: 反復あり二元配置の自由度を配分する
category: math-data-analysis
subcategory: math-anova
topic: twoway-df
type: recognition
difficulty: 2
priority: S
hashtags:
  - 二元配置分散分析
  - 自由度
  - 交互作用
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 二元配置分散分析
archive_reason: duplicate
canonical_card: anova-twoway-f-tests
archive_note: A・B・交互作用・誤差・全体の自由度と加法分解を正本へ統合済み。
---
## 問題
$a\times b$ セル、各セル $n$ 反復の二元配置で各自由度を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

各セル平均の残差自由度は $n-1$、セルが $ab$ 個。

## 答え
$$\nu_A=a-1,\quad \nu_B=b-1,\quad \nu_{AB}=(a-1)(b-1),$$
$$\nu_E=ab(n-1),\quad \nu_T=abn-1.$$
これらは
$$abn-1=(a-1)+(b-1)+(a-1)(b-1)+ab(n-1)$$
を満たす。

## 計算例
$a=2,b=3,n=4$ なら
$$\nu_A=2-1=1,
\quad\nu_B=3-1=2,
\quad\nu_{AB}=(2-1)(3-1)=2,$$
$$\nu_E=2\cdot3(4-1)=18,
\quad\nu_T=2\cdot3\cdot4-1=23.$$
$1+2+2+18=23$ と自由度の加法性も確認できる。

## 注意
反復なし $n=1$ では純粋誤差自由度が0になる。
