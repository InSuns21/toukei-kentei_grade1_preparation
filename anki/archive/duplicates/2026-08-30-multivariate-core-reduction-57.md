---
id: mv-ward-increase
title: Ward法の平方和増加を計算する
category: applied-common
subcategory: applied-multivariate
topic: ward-method
type: calc_step
difficulty: 4
priority: B
hashtags:
  - クラスター分析
  - Ward法
  - 群内平方和
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: クラスタリング階層法
archive_reason: duplicate
canonical_card: mv-hierarchical-linkage
archive_note: Ward法のWSS増加式、クラスタサイズ依存性、数値計算を階層クラスタリング正本へ統合済み。
---
## 問題
サイズ $n_A=2,n_B=3$、重心間距離が5の2クラスタを併合する際のWard法の群内平方和増加を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Ward法は併合による群内平方和増加が最小の対を選ぶ。

## 答え
$$\Delta WSS=\frac{n_An_B}{n_A+n_B}\|\bar{\boldsymbol x}_A-\bar{\boldsymbol x}_B\|^2
=\frac{2\cdot3}{5}25=30.$$

## 計算例
距離だけでなくクラスタサイズも影響する。

## 注意
通常は平方Euclid距離を前提とする。

<!-- CARD -->

---
id: mv-lda-direction
title: フィッシャーの線形判別の方向を求める
category: applied-common
subcategory: applied-multivariate
topic: fisher-linear-discriminant
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 判別分析
  - フィッシャーの線形判別
  - 分散共分散行列
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: フィッシャーの線形判別
archive_reason: duplicate
canonical_card: mv-lda-classification-rule
archive_note: Fisher基準からΣ^{-1}(μ1-μ0)を導き、正規モデルのLDA判別得点との一致まで正本へ統合済み。
---
## 問題
2群の平均を $\boldsymbol\mu_1,\boldsymbol\mu_0$、共通群内共分散を $\boldsymbol\Sigma$ とする。フィッシャーの線形判別方向を書け。

## 使用公式・定理
2群の平均差を
$$
\boldsymbol d=\boldsymbol\mu_1-\boldsymbol\mu_0
$$
とし、共通群内分散共分散行列を $\boldsymbol\Sigma$ とする。フィッシャーの基準
$$
J(\boldsymbol w)
=\frac{(\boldsymbol w^{\mathsf T}\boldsymbol d)^2}
{\boldsymbol w^{\mathsf T}\boldsymbol\Sigma\boldsymbol w}
$$
を最大化する方向は
$$
\boldsymbol w\propto\boldsymbol\Sigma^{-1}\boldsymbol d
$$
である。

## 一手
平均差そのものではなく、群内分散の大きい方向を割り引くため $\Sigma^{-1}$ で平均差を重み付けする。

## 答え
$$
\boldsymbol w\propto
\boldsymbol\Sigma^{-1}(\boldsymbol\mu_1-\boldsymbol\mu_0).
$$

## 計算例
$$
\boldsymbol\mu_1=(2,1)^{\mathsf T},
\qquad
\boldsymbol\mu_0=(0,0)^{\mathsf T},
$$
$$
\boldsymbol\Sigma=\operatorname{diag}(2,1)
$$
とする。このとき
$$
\boldsymbol\Sigma^{-1}
=\begin{pmatrix}1/2&0\\0&1\end{pmatrix},
$$
したがって
$$
\begin{aligned}
\boldsymbol w
&\propto
\begin{pmatrix}1/2&0\\0&1\end{pmatrix}
\begin{pmatrix}2\\1\end{pmatrix}\\
&=\begin{pmatrix}1\\1\end{pmatrix}.
\end{aligned}
$$
よって判別得点の方向は $x_1+x_2$。

## 注意
$\boldsymbol w$ の倍率は方向を変えない。実際の分類閾値には群平均だけでなく事前確率や誤分類費用も影響する。

<!-- CARD -->

---
id: mv-factor-rotation
title: 因子回転の目的を説明する
category: applied-common
subcategory: applied-multivariate
topic: factor-rotation
type: recognition
difficulty: 2
priority: B
hashtags:
  - 因子分析
  - 因子回転
  - Varimax回転
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 因子回転の考え方
archive_reason: duplicate
canonical_card: mv-factor-model-covariance
archive_note: 直交回転でΛΛ^Tが不変であること、Varimaxの目的、回転後の解釈上の注意を因子分析正本へ統合済み。
---
## 問題
因子分析で直交回転を行う目的と、共分散再現が変わらない理由を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$\boldsymbol T\boldsymbol T^{\mathsf T}=\boldsymbol I$。

## 答え
各変数が少数因子へ高く負荷する単純構造を得て解釈しやすくする。直交行列Tに対し $\boldsymbol\Lambda^*=\boldsymbol\Lambda\boldsymbol T$ とすると
$$\boldsymbol\Lambda^*\boldsymbol\Lambda^{*\mathsf T}
=\boldsymbol\Lambda\boldsymbol T\boldsymbol T^{\mathsf T}\boldsymbol\Lambda^{\mathsf T}
=\boldsymbol\Lambda\boldsymbol\Lambda^{\mathsf T}.$$

## 計算例
Varimaxは負荷量平方の分散を大きくする直交回転。

## 注意
回転後の因子順序・符号は一意でない。
