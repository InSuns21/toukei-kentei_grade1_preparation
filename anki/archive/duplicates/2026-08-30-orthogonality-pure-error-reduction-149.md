---
id: engdesign-missing-run-nonorthogonality
title: 欠測実施により要因列の直交性が崩れることを確認する
category: applied-engineering
subcategory: engineering-design
topic: missing-run-orthogonality
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 実験の計画と実施
  - 欠測
  - 直交性
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 直交表
archive_reason: duplicate
canonical_card: design-orthogonal-array-basic
archive_note: 欠測後にA列とB列の内積が0から-1へ変わり直交性が崩れる2^2数値例と、元の直交平方和公式を使わず残存計画行列で一般線形モデルとして解析する判断をcanonical
  cardへ統合済み。
---
## 問題
$2^2$ 計画のA列 $(-1,+1,-1,+1)$、B列 $(-1,-1,+1,+1)$ から最後の実施が欠測した。残る3行で列内積を求めよ。
## 記号・用語
$-1,+1$ は低・高水準で、欠測後の列はA=$(-1,+1,-1)$、B=$(-1,-1,+1)$ である。
## 使用公式・定理
列内積 $\boldsymbol x_A^{\mathsf T}\boldsymbol x_B$ が0なら直交する。
## 一手／方針
残った3行だけで符号積を足す。
## 答え
$(-1)(-1)+(+1)(-1)+(-1)(+1)=1-1-1=-1$ なので直交しない。
## 計算例
完全な4行なら最後の積$+1$が加わって0へ戻る。
## 注意
欠測後は効果平方和を元の直交公式で独立に分解せず、残った計画行列で回帰する。

<!-- CARD -->

---
id: engdesign-factorial-pure-error
title: 反復要因計画から純粋誤差平方和を求める
category: applied-engineering
subcategory: engineering-design
topic: factorial-pure-error
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 実験の計画と実施
  - 純粋誤差
  - 反復
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 実験の計画と実施
archive_reason: duplicate
canonical_card: engdesign-lack-of-fit-decomposition
archive_note: 2^2各セル2反復の観測(10,12),(14,14),(11,13),(19,21)からSS_PE=6、df_PE=4、MS_PE=1.5を直接求める数値例をcanonical
  cardへ統合済み。
---
## 問題
$2^2$ 計画の各セルで2反復し、観測が $(10,12),(14,14),(11,13),(19,21)$ である。純粋誤差平方和と自由度を求めよ。
## 記号・用語
純粋誤差は同じ因子水準組合せ内の反復変動である。
## 使用公式・定理
$$SS_{PE}=\sum_j\sum_{l=1}^{r}(y_{jl}-\overline y_j)^2,\qquad df_{PE}=2^k(r-1).$$
## 一手／方針
各セル平均からの偏差平方をセルごとに足す。
## 答え
各セルの平方和は2、0、2、2なので $SS_{PE}=6$、自由度は $4(2-1)=4$。
## 計算例
$MS_{PE}=6/4=1.5$ を反復に基づく誤差分散推定値として使える。
## 注意
各セル1観測だけでは純粋誤差を直接推定できない。
