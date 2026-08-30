---
id: mv-pca-eigen-numeric
title: 2変量分散共分散行列の主成分を求める
category: applied-common
subcategory: applied-multivariate
topic: pca-eigenproblem
type: calc_step
difficulty: 4
priority: B
hashtags:
  - 主成分分析
  - 固有値
  - 固有ベクトル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 主成分分析と固有値問題
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 2×2分散共分散行列の固有値・固有ベクトル計算を、分散最大化から固有方程式を導くPCA canonicalへ吸収済み。
---
## 問題
$\boldsymbol S=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ の固有値と第1主成分方向を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

主成分方向は分散共分散行列の固有ベクトル。

## 答え
$$|\boldsymbol S-\lambda\boldsymbol I|=(2-\lambda)^2-1=0$$
より固有値は3,1。λ=3では $a_1=a_2$ なので、単位固有ベクトルは
$$\boldsymbol a_1=\frac1{\sqrt2}(1,1)^{\mathsf T}.$$

## 計算例
第2方向は $(1,-1)^{\mathsf T}/\sqrt2$。

## 注意
固有ベクトルの符号は任意。

<!-- CARD -->

---
id: mv-pca-contribution-rate
title: 主成分分析の寄与率と累積寄与率を計算する
category: applied-common
subcategory: applied-multivariate
topic: pca-contribution-rate
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 主成分分析
  - 寄与率
  - 累積寄与率
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 寄与率・累積寄与率
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 固有値総和から寄与率・累積寄与率を求める操作は、PCAソフトウェア出力canonicalで数値計算済み。
---
## 問題
固有値が5,3,1,1のとき、第1・第2主成分の寄与率と第2までの累積寄与率を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

第j寄与率は $\lambda_j/\sum_k\lambda_k$。

## 答え
総分散は10。寄与率は $5/10=0.5$、$3/10=0.3$、累積寄与率は0.8。

## 計算例
第2までで全分散の80%を保持する。

## 注意
寄与率だけで解釈可能性は保証されない。

<!-- CARD -->

---
id: mv-pca-score
title: 主成分得点を計算する
category: applied-common
subcategory: applied-multivariate
topic: pca-score
type: calc_step
difficulty: 2
priority: B
hashtags:
  - 主成分分析
  - 主成分得点
  - 固有ベクトル
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 主成分分析
archive_reason: duplicate
canonical_card: mv-pca-variance-max
archive_note: 主成分得点を固有ベクトルとの内積で求める数値計算は、PCAソフトウェア出力canonicalへ既に統合済み。
---
## 問題
中心化観測が $(2,-1)^{\mathsf T}$、第1主成分方向が $(1,1)^{\mathsf T}/\sqrt2$ のとき得点を求めよ。

## 記号・用語
- PCA：主成分分析（principal component analysis）

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

主成分得点は中心化データの固有ベクトルへの射影。

## 答え
$$z_1=\boldsymbol a_1^{\mathsf T}(\boldsymbol x-\bar{\boldsymbol x})
=\frac{2-1}{\sqrt2}=\frac1{\sqrt2}.$$

## 計算例
全主成分を使えば直交変換で情報を失わない。

## 注意
標準化主成分分析では先に各変数を標準化する。

<!-- CARD -->

---
id: reg-dfbeta-meaning
title: DFBETAの符号と大きさを解釈する
category: applied-common
subcategory: applied-multiple-regression
topic: dfbeta
type: formula
difficulty: 3
priority: B
hashtags:
  - 回帰診断法
  - DFBETA
  - 影響点
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 回帰診断法
archive_reason: duplicate
canonical_card: reg-dffits-numeric
archive_note: DFFITSとDFBETAを同じleave-one-out影響診断として比較し、係数変化の数値例までcanonicalへ吸収済み。
---
## 問題
係数jに対する観測iのDFBETAを定義し、正の値を解釈せよ。

## 記号・用語
- DFBETA：観測を除いたときの回帰係数変化を測る回帰診断量

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

標準誤差で割った尺度化版をDFBETASと呼ぶ。

## 答え
$$\operatorname{DFBETA}_{ij}=\widehat\beta_j-\widehat\beta_{j(i)},$$
ここで $\widehat\beta_{j(i)}$ は観測iを除いた推定値。正なら観測iを含めることで係数jが大きくなる。

## 計算例
$\widehat\beta_j=1.2,\widehat\beta_{j(i)}=0.8$ ならDFBETA=0.4。

## 注意
各係数ごとに影響が異なる。

<!-- CARD -->

---
id: reg-lasso-kkt-zero
title: Lasso係数が0となるKKT条件を判定する
category: applied-common
subcategory: applied-multiple-regression
topic: lasso-kkt
type: calc_step
difficulty: 4
priority: A
hashtags:
  - L1正則化法
  - Lasso
  - KKT条件
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: L1正則化法
archive_reason: duplicate
canonical_card: ms-ridge-lasso-orthogonal-numeric
archive_note: Lasso係数が0となるKKT条件をsoft-thresholdingの数値例と同じcanonicalへ吸収済み。同じ零化操作を別カード化しない。
---
## 問題
$\frac12\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|^2+\lambda\sum_j|\beta_j|$ を最小化するLassoで、係数jが0となり得る条件を書け。現在の部分残差との内積が0.7、$\lambda=1$ なら判定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

絶対値の0における劣勾配は区間 $[-1,1]$。

## 答え
$$|\boldsymbol x_j^{\mathsf T}(\boldsymbol y-\boldsymbol X\widehat{\boldsymbol\beta})|\le\lambda$$
なら $\widehat\beta_j=0$ がKKT条件を満たす。$0.7\le1$ なので0となり得る。

## 計算例
絶対値がλを超えれば非零係数が必要。

## 注意
列の尺度と目的関数の係数規約に依存する。

<!-- CARD -->

---
id: reg-bic-selection
title: BICで回帰モデルを比較する
category: applied-common
subcategory: applied-multiple-regression
topic: bic-selection
type: calc_step
difficulty: 3
priority: B
hashtags:
  - 変数選択
  - BIC
  - モデル比較
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 変数選択
archive_reason: duplicate
canonical_card: ms-bic-numeric-comparison
archive_note: 回帰モデルだけに限定したBIC計算は、同じ最大対数尤度・母数数・標本サイズからBICを比較するモデル選択canonicalと同一操作。
---
## 問題
n=100で、モデル1は最大対数尤度-120・母数5個、モデル2は-116・母数8個である。BICで選べ。$\log100\approx4.605$ とする。

## 記号・用語
- AIC：赤池情報量規準
- BIC：ベイズ情報量規準
- $\ell$：対数尤度

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$BIC=-2\ell(\widehat\theta)+k\log n$。

## 答え
$$BIC_1=240+5(4.605)=263.025,$$
$$BIC_2=232+8(4.605)=268.84.$$
小さいモデル1を選ぶ。

## 計算例
このnでは1母数当たり罰則4.605でAICの2より強い。

## 注意
同じ応答データに対する尤度で比較する。
