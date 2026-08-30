---
id: engmv-classical-mds-three-points
title: 3点の距離から1次元配置を復元する
category: applied-engineering
subcategory: engineering-multivariate
topic: multidimensional-scaling
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 多次元尺度構成法
  - 距離行列
  - 配置
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多次元尺度構成法
archive_reason: duplicate
canonical_card: mv-mds-double-centering
archive_note: 3点距離からの1次元配置を、二重中心化・固有分解・座標復元まで含むMDS正本の数値例へ統合済み。
---
## 問題
3点間の距離が $d_{12}=1,d_{23}=1,d_{13}=2$ である。中心を0とする1次元配置を一つ求めよ。
## 記号・用語
多次元尺度構成法は点間距離をできるだけ保つ低次元配置を求める。
## 使用公式・定理
3距離が一直線上で $d_{13}=d_{12}+d_{23}$ を満たすなら、点2は点1と点3の間に置ける。
## 一手／方針
間隔1で3点を並べ、座標平均が0になるよう平行移動する。
## 答え
$$x_1=-1,\qquad x_2=0,\qquad x_3=1$$
と置けば、距離は順に $1,1,2$ で条件を満たす。
## 計算例
全座標の符号を反転しても同じ距離を与える。
## 注意
距離から得る配置は平行移動・回転・鏡映の違いまでは一意でない。

<!-- CARD -->

---
id: engmv-mds-stress
title: MDS配置のstressを計算する
category: applied-engineering
subcategory: engineering-multivariate
topic: mds-stress
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 多次元尺度構成法
  - stress
  - 適合度
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 多次元尺度構成法
archive_reason: duplicate
canonical_card: mv-mds-double-centering
archive_note: 配置距離の再現誤差を測る正規化stressを、古典的MDSの座標復元後の評価として正本へ統合済み。
---
## 問題
3つの対象距離が $(d_{12},d_{13},d_{23})=(1,2,3)$、配置上の距離が $(\widehat d_{12},\widehat d_{13},\widehat d_{23})=(1,2,2)$ のとき、正規化stressを求めよ。
## 記号・用語
stressは元の非類似度と配置上の距離のずれを測る。
## 使用公式・定理
$$\operatorname{Stress}=\sqrt{\frac{\sum_{i<j}(d_{ij}-\widehat d_{ij})^2}{\sum_{i<j}d_{ij}^2}}.$$
## 一手／方針
距離誤差の平方和を元距離の平方和で標準化する。
## 答え
分子は $0^2+0^2+1^2=1$、分母は $1^2+2^2+3^2=14$ だから
$$\operatorname{Stress}=\frac1{\sqrt{14}}\approx0.267.$$
## 計算例
stressは0に近いほど距離再現がよい。
## 注意
stressの定義には複数の正規化規約があるため問題文に従う。

<!-- CARD -->

---
id: mv-canonical-correlation
title: 正準相関を固有値問題で表す
category: applied-common
subcategory: applied-multivariate
topic: canonical-correlation
type: formula
difficulty: 4
priority: C
hashtags:
  - 正準相関分析
  - 固有値
  - 多変量解析
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 正準相関分析
archive_reason: duplicate
canonical_card: engmv-canonical-eigenvalue
archive_note: 正準相関の一般固有値問題を、白色化・特異値・非対角数値例まで備えた工学側正本へ統合する。
---
## 問題
変数群X,Yの第1正準相関を共分散ブロックから表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

両線形結合の分散を1と制約したLagrange最適化。

## 答え
$\boldsymbol a^{\mathsf T}\boldsymbol X$ と $\boldsymbol b^{\mathsf T}\boldsymbol Y$ の相関を最大化する。正準相関の二乗 $\rho^2$ は
$$\boldsymbol\Sigma_{XX}^{-1}\boldsymbol\Sigma_{XY}
\boldsymbol\Sigma_{YY}^{-1}\boldsymbol\Sigma_{YX}$$
の最大固有値。

## 計算例
各群が1変数なら通常の相関係数の絶対値。

## 注意
共分散ブロックの可逆性が必要。
