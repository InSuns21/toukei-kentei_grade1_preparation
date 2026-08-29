---
id: data-anova-decomposition
title: 一元配置分散分析の平方和を分解する
category: math-data-analysis
subcategory: math-anova
topic: sums-of-squares
type: expansion
difficulty: 2
priority: S
hashtags: [分散分析, 平方和, 分散分析]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 分散分析 }]
---
## 問題
観測 $y_{ij}$ の全平方和を群間平方和と群内平方和へ分解せよ。
## 答え
$y_{ij}-\overline y=(y_{ij}-\overline y_i)+(\overline y_i-\overline y)$ と分ける。
## 使用公式・定理
一元配置の平方和分解は
$$SS_T=SS_B+SS_W.$$
## 計算例
交差項は各群で $\sum_j(y_{ij}-\overline y_i)=0$ だから消え、
$$\sum_{i,j}(y_{ij}-\overline y)^2=\sum_i n_i(\overline y_i-\overline y)^2+\sum_{i,j}(y_{ij}-\overline y_i)^2.$$
数値例 $y_1=(1,3)$、$y_2=(2,4)$ では $\overline y=2.5$、群平均は $2,3$ である。
$$SS_T=5,\qquad SS_B=1,\qquad SS_W=4,$$
よって $5=1+4$ と確認できる。
## 重要な一手
群平均を足して引く。

<!-- CARD -->
---
id: data-bootstrap-mean
title: ブートストラップで標準誤差を推定する
category: math-data-analysis
subcategory: math-simulation
topic: bootstrap
type: strategy
difficulty: 2
priority: B
hashtags: [ブートストラップ, シミュレーション, 標準誤差]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ブートストラップ }]
---
## 問題
標本 $x=(1,2,3)$ から標本平均の標準誤差をブートストラップで推定する手順は？
## 方針
経験分布からサイズ3の復元抽出を繰り返し、再標本平均の標準偏差を取る。
## 使用公式・定理
ブートストラップ標準誤差は、再標本統計量 $T^{*(1)},\ldots,T^{*(B)}$ の標本標準偏差
$$\widehat{\operatorname{se}}_{\mathrm{boot}}=\sqrt{\frac1{B-1}\sum_{b=1}^B(T^{*(b)}-\overline T^*)^2}.$$
## 計算例
再標本 $(1,1,3),(2,3,3),(1,2,2)$ の平均は $5/3,8/3,5/3$。実際には多数回 $B$ 反復し、
$$\widehat{\mathrm{se}}_{\mathrm{boot}}=\sqrt{\frac1{B-1}\sum_{b=1}^B(\overline x^{*(b)}-\overline{\overline x^*})^2}.$$
この3反復では平均の平均が $2$ だから
$$\begin{aligned}\widehat{\mathrm{se}}_{\mathrm{boot}}&=\sqrt{\frac{(5/3-2)^2+(8/3-2)^2+(5/3-2)^2}{3-1}}\\&=\sqrt{\frac{1/9+4/9+1/9}{2}}\\&=\sqrt{\frac13}.\end{aligned}$$
これは手順確認用の粗い値であり、実用上は十分大きい $B$ を使う。
## 注意
元標本から非復元抽出しない。
