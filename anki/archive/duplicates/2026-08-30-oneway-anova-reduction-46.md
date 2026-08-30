---
id: anova-oneway-model-assumptions
title: 一元配置分散分析のモデルと仮定を書く
category: math-data-analysis
subcategory: math-anova
topic: oneway-model
type: formula
difficulty: 2
priority: S
hashtags:
  - 一元配置分散分析
  - 正規分布
  - 等分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一元配置分散分析
archive_reason: duplicate
canonical_card: anova-oneway-f-statistic
archive_note: 固定効果モデル、識別制約、独立・正規・等分散の仮定を一元配置の正本へ統合済み。
---
## 問題
処理・群を表す因子が $a$ 個の水準を持ち、群 $i$ に $n_i$ 個の観測 $Y_{ij}$ があるとする。全体平均を $\mu$、群 $i$ の固定された効果を $\alpha_i$、個体差を誤差 $\varepsilon_{ij}$ とするとき、一元配置分散分析のモデルと誤差の仮定を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

帰無仮説は $H_0:\mu_1=\cdots=\mu_a$、すなわち全群効果が0。

## 答え
群 $i=1,\ldots,a$、群内観測 $j=1,\ldots,n_i$ に対し
$$Y_{ij}=\mu+\alpha_i+\varepsilon_{ij},\qquad \sum_{i=1}^a n_i\alpha_i=0,$$
$$\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2).$$
したがって各群は独立な正規分布 $N(\mu_i,\sigma^2)$ に従い、母分散は共通である。

## 計算例
$a=3$ で各群の標本サイズが等しく、$\mu=10$、$(\alpha_1,\alpha_2,\alpha_3)=(-2,0,2)$、$\sigma^2=4$ とする。このとき $\sum_i n_i\alpha_i=0$ であり、
$$E[Y_{1j}]=10-2=8,
\quad E[Y_{2j}]=10,
\quad E[Y_{3j}]=10+2=12.$$
誤差が独立に正規分布 $N(0,4)$ に従うので
$$Y_{1j}\sim N(8,4),
\quad Y_{2j}\sim N(10,4),
\quad Y_{3j}\sim N(12,4).$$
平均は群ごとに異なるが、分散4は全群で共通である。

## 注意
独立性・正規性・等分散性がF分布による正確検定の前提である。

<!-- CARD -->

---
id: anova-oneway-ss-numeric
title: 一元配置の3平方和を計算する
category: math-data-analysis
subcategory: math-anova
topic: oneway-ss-numeric
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 平方和
  - 一元配置分散分析
  - 計算
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一元配置分散分析
archive_reason: duplicate
canonical_card: anova-oneway-f-statistic
archive_note: 全平方和・群間平方和・誤差平方和の定義と数値計算、加法分解を正本へ統合済み。
---
## 問題
3群の観測値が順に $(1,2)$、$(3,4)$、$(5,6)$ である。全平方和 $SS_T$、群間平方和 $SS_A$、群内（誤差）平方和 $SS_E$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

群 $i$ の標本数を $n_i$、群平均を $\overline Y_{i\cdot}$、全平均を $\overline Y_{\cdot\cdot}$ とすると
$$SS_A=\sum_i n_i(\overline Y_{i\cdot}-\overline Y_{\cdot\cdot})^2,$$
$$SS_E=\sum_i\sum_j(Y_{ij}-\overline Y_{i\cdot})^2,$$
$$SS_T=\sum_i\sum_j(Y_{ij}-\overline Y_{\cdot\cdot})^2=SS_A+SS_E.$$
第1式は群間変動、第2式は群内変動を表す。

## 答え
全平均は $\overline Y_{\cdot\cdot}=3.5$、群平均は $1.5,3.5,5.5$。
$$SS_A=2\{(-2)^2+0^2+2^2\}=16.$$
各群の平均との差は $\pm0.5$ なので
$$SS_E=6(0.5)^2=1.5.$$
よって
$$SS_T=SS_A+SS_E=17.5.$$

## 計算例
全平均との差を各観測について計算すると
$$1-3.5=-2.5, 2-3.5=-1.5, 3-3.5=-0.5,$$
$$4-3.5=0.5, 5-3.5=1.5, 6-3.5=2.5.$$
したがって
$$SS_T=(-2.5)^2+(-1.5)^2+(-0.5)^2+0.5^2+1.5^2+2.5^2$$
$$=6.25+2.25+0.25+0.25+2.25+6.25=17.5,$$
群平均は $(1.5,3.5,5.5)$ なので
$$SS_A=2\{(1.5-3.5)^2+(3.5-3.5)^2+(5.5-3.5)^2\}=16.$$
各群内では平均からの偏差が $(-0.5,0.5)$ だから
$$SS_E=3\{(-0.5)^2+0.5^2\}=1.5.$$
よって $SS_A+SS_E=16+1.5=17.5=SS_T$ と一致する。

## 注意
群間平方和では各群平均の偏差を群サイズ倍する。

<!-- CARD -->

---
id: anova-oneway-degrees-freedom
title: 一元配置分散分析の自由度を配分する
category: math-data-analysis
subcategory: math-anova
topic: oneway-df
type: recognition
difficulty: 2
priority: S
hashtags:
  - 自由度
  - 一元配置分散分析
  - 分散分析表
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一元配置分散分析
archive_reason: duplicate
canonical_card: anova-oneway-f-statistic
archive_note: 全体・群間・誤差の自由度と加法分解を正本へ統合済み。
---
## 問題
$a$ 群、総標本数 $N=\sum_i n_i$ の一元配置分散分析で、全体・群間・誤差の自由度を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

全平均の推定で1自由度、各群平均の推定で合計 $a$ 自由度を消費する。

## 答え
$$\nu_T=N-1,\qquad \nu_A=a-1,\qquad \nu_E=N-a,$$
かつ
$$N-1=(a-1)+(N-a).$$

## 計算例
3群各4個なら $N=12$ なので、全体11、群間2、誤差9。

## 注意
平方和だけでなく自由度も加法分解を確認する。

<!-- CARD -->

---
id: anova-oneway-table-numeric
title: 一元配置分散分析表を完成して判定する
category: math-data-analysis
subcategory: math-anova
topic: oneway-table
type: calc_step
difficulty: 3
priority: S
hashtags:
  - 分散分析表
  - F検定
  - 棄却判断
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 一元配置分散分析
archive_reason: duplicate
canonical_card: anova-oneway-f-statistic
archive_note: 平均平方、F統計量、分散分析表、臨界値による判定を同じ正本の実数例へ統合済み。
---
## 問題
各観測が独立な正規分布に従い、全群で分散が共通である一元配置分散分析で、群数 $a=3$、総標本数 $N=15$、群間平方和 $SS_A=36$、群内平方和 $SS_E=24$ を得た。自由度 $(2,12)$ のF分布の5%上側臨界値が3.89であるとして、$H_0:\mu_1=\mu_2=\mu_3$ を検定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$F=\{SS_A/(a-1)\}/\{SS_E/(N-a)\}$。

## 答え
$$MS_A=36/2=18,\qquad MS_E=24/12=2,$$
$$F=18/2=9.$$
$9>3.89$ なので $H_0$ を棄却し、少なくとも1群の母平均が異なると判断する。

## 計算例
群間・誤差の自由度は
$$\nu_A=a-1=2,
\qquad \nu_E=N-a=12.$$
したがって
$$MS_A=\frac{36}{2}=18,
\qquad MS_E=\frac{24}{12}=2,
\qquad F=\frac{18}{2}=9.$$
$9>3.89$ なので帰無仮説を棄却する。また
$$SS_T=36+24=60,
\qquad \nu_T=2+12=14$$
と平方和・自由度の加法性も確認できる。

## 注意
棄却しても、どの群対が異なるかまでは分からない。
