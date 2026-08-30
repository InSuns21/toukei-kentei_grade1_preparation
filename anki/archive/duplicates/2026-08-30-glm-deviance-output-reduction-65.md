---
id: glm-software-deviance-output
title: 一般化線形モデルの逸脱度出力を解釈する
category: applied-common
subcategory: applied-multivariate
topic: glm-software-output
type: calc_step
difficulty: 3
priority: A
hashtags:
  - 一般化線形モデル
  - ソフトウェア出力
  - 逸脱度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: ソフトウェア出力結果の解釈
archive_reason: duplicate
canonical_card: glm-deviance-definition
archive_note: ソフト出力の逸脱度差・自由度差から尤度比検定を行う手順は、逸脱度・Pearson統計量・尤度比・過分散のGLM診断正本に包含済み。
---
## 問題
一般化線形モデルの出力でNull deviance=120（自由度99）、Residual deviance=90（自由度97）だった。追加した2係数の尤度比統計量と解釈を述べよ。

## 記号・用語
- 逸脱度：当てはめモデルと飽和モデルの最大対数尤度差を2倍した適合度指標

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

入れ子モデルの尤度比統計量は逸脱度差 $D_R-D_F$。

## 一手
入れ子な一般化線形モデルを比較するときは、**逸脱度の差**と**自由度の差**を同時に取り、カイ二乗分布と比較する。

## 答え
追加した2係数に対する尤度比統計量は
$$
G^2=30,
\qquad df=2.
$$
$30>\chi^2_{2,0.95}\approx5.991$ なので、追加係数を同時に0とする帰無仮説を5%水準で棄却する。

## 計算例
簡約モデルの逸脱度を $D_R=120$、追加係数を含むモデルを $D_F=90$ とする。まず逸脱度差は
$$
\begin{aligned}
G^2
&=D_R-D_F\\
&=120-90\\
&=30.
\end{aligned}
$$
自由度の差は
$$
\begin{aligned}
q
&=99-97\\
&=2.
\end{aligned}
$$
帰無仮説の下では近似的に
$$
G^2\sim\chi^2_2.
$$
5%上側臨界値は約 $5.991$ なので
$$
30>5.991
$$
となり帰無仮説を棄却する。

なお、当てはめ後の補助診断として
$$
\frac{\text{Residual deviance}}{\text{residual df}}
=\frac{90}{97}\approx0.928
$$
も確認できるが、この比だけで適合の良否を確定しない。

## 注意
分散固定の二項・ポアソンモデルでは近似条件と過分散も確認する。
